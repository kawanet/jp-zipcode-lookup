// update

import {cdate} from "cdate";
import * as fs from "fs";
import {KenAll, KenAllColumns as C} from "japanpost-zipcode";

const WARN = (message: string) => console.warn(message);

async function CLI(outDir: string) {
    const kenAll = await new KenAll({logger: console});
    await kenAll.clean();
    const modified = await kenAll.modifiedAt();
    console.warn("modified: " + cdate(modified).utcOffset(9).text("%Y/%m/%d %H:%M"));
    const allRows = await kenAll.readAll();

    type PostalRow = (number | string)[];
    type PostalMaster = { [zip: string]: PostalRow };
    type CompactMaster = { [zip: string]: (number | string | PostalRow) };

    type NameKanaPair = [string, string];
    type PrefMaster = { [code: string]: NameKanaPair };
    type CityMaster = { [code: string]: NameKanaPair };

    const prefMaster = {} as PrefMaster;
    const cityMaster = {} as CityMaster;
    const zip5Master = {} as PostalMaster;
    const zip7Master = {} as PostalMaster;

    const lastCity = {} as { [zipcode: string]: string };
    const zip5To7 = {} as { [zip5: string]: PostalMaster };

    for (const row of allRows) {
        const city = row[C.全国地方公共団体コード];
        const zip7 = row[C.郵便番号];
        const name = row[C.町域名];

        const postal = zip7Master[zip7] || (zip7Master[zip7] = [] as PostalRow);

        // 市区町村コード
        if (lastCity[zip7] !== city) {
            postal.push(+city);
            lastCity[zip7] = city;
        }

        // 町域名
        postal.push(name);

        // 先頭５文字
        const zip5 = zip7.substr(0, 5);
        const idx5 = zip5To7[zip5] || (zip5To7[zip5] = {} as PostalMaster);
        idx5[zip7] = postal;

        // 市区町村名
        if (cityMaster[city]) continue;
        cityMaster[city] = [row[C.市区町村名], row[C.市区町村名カナ]];

        // 都道府県名
        const pref = city.substr(0, 2);
        if (prefMaster[pref]) continue;
        prefMaster[pref] = [row[C.都道府県名], row[C.都道府県名カナ]];
    }

    // 正規化
    for (const zip5 in zip5To7) {
        const idx5 = zip5To7[zip5];
        const zip7list = Object.keys(idx5);
        if (zip7list.length === 1) continue;

        const rows = zip7list.map(v => idx5[v]);
        const city = rows[0][0];
        const name = rows[0][1];

        // すべて同じ市区町村名
        const sameCity = rows.every(row => row[0] === city);
        if (!sameCity) continue;
        rows.forEach(item => item.shift());
        const row = zip5Master[zip5] = [city] as PostalRow;

        // すべて同じ町域名
        const sameName = rows.every(row => row[0] === name);
        if (!sameName) continue;
        rows.forEach(item => item.shift());
        row.push(name);

        // 空になった要素を削除する
        zip7list.forEach(zip7 => {
            if (zip7Master[zip7].length === 0) delete zip7Master[zip7];
        });
    }

    // pref.json
    {
        let json = JSON.stringify({pref: prefMaster});
        json = json.replace(/("\d{2}":)/g, "\n$1");
        write("pref.json", json);
    }

    // city.json
    {
        let json = JSON.stringify({city: cityMaster});
        json = json.replace(/("\d{5}":)/g, "\n$1");
        write("city.json", json);
    }

    // zip5.json
    {
        let json = JSON.stringify({zip5: compact(zip5Master)});
        json = json.replace(/("\d{5,7}":)/g, "\n$1");
        write("zip5.json", json);
    }
    // zip7.json
    {
        let json = JSON.stringify({zip7: compact(zip7Master)});
        json = json.replace(/("\d{5,7}":)/g, "\n$1");
        write("zip7.json", json);
    }

    function write(file: string, json: string) {
        if (outDir) {
            file = outDir.replace(/\/?$/, "/" + file);
            WARN("writing: " + file);
            fs.createWriteStream(file).write(json);
        } else {
            process.stdout.write(json);
        }
    }

    function compact(master: PostalMaster): CompactMaster {
        const flex = {} as CompactMaster;
        Object.keys(master).sort().forEach(key => {
            const row = master[key];
            flex[key] = (row.length === 1) ? row[0] : row;
        });
        return flex;
    }
}

CLI.apply(null, process.argv.slice(2));
