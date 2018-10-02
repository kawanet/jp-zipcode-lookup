"use strict";
// update
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const japanpost_zipcode_1 = require("japanpost-zipcode");
const WARN = (message) => console.warn(message);
function CLI(outDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const kenAll = yield japanpost_zipcode_1.KenAll.readAll();
        const prefMaster = {};
        const cityMaster = {};
        const zip5Master = {};
        const zip7Master = {};
        const lastCity = {};
        const zip5To7 = {};
        for (const row of kenAll) {
            const city = row[0 /* 全国地方公共団体コード */];
            const zip7 = row[2 /* 郵便番号 */];
            const name = row[8 /* 町域名 */];
            const postal = zip7Master[zip7] || (zip7Master[zip7] = []);
            // 市区町村コード
            if (lastCity[zip7] !== city) {
                postal.push(+city);
                lastCity[zip7] = city;
            }
            // 町域名
            postal.push(name);
            // 先頭５文字
            const zip5 = zip7.substr(0, 5);
            const idx5 = zip5To7[zip5] || (zip5To7[zip5] = {});
            idx5[zip7] = postal;
            // 市区町村名
            if (cityMaster[city])
                continue;
            cityMaster[city] = [row[7 /* 市区町村名 */], row[4 /* 市区町村名カナ */]];
            // 都道府県名
            const pref = city.substr(0, 2);
            if (prefMaster[pref])
                continue;
            prefMaster[pref] = [row[6 /* 都道府県名 */], row[3 /* 都道府県名カナ */]];
        }
        // 正規化
        for (const zip5 in zip5To7) {
            const idx5 = zip5To7[zip5];
            const zip7list = Object.keys(idx5);
            if (zip7list.length === 1)
                continue;
            const rows = zip7list.map(v => idx5[v]);
            const city = rows[0][0];
            const name = rows[0][1];
            // すべて同じ市区町村名
            const sameCity = rows.every(row => row[0] === city);
            if (!sameCity)
                continue;
            rows.forEach(item => item.shift());
            const row = zip5Master[zip5] = [city];
            // すべて同じ町域名
            const sameName = rows.every(row => row[0] === name);
            if (!sameName)
                continue;
            rows.forEach(item => item.shift());
            row.push(name);
            // 空になった要素を削除する
            zip7list.forEach(zip7 => {
                if (zip7Master[zip7].length === 0)
                    delete zip7Master[zip7];
            });
        }
        // pref.json
        {
            let json = JSON.stringify({ pref: prefMaster });
            json = json.replace(/("\d{2}":)/g, "\n$1");
            write("pref.json", json);
        }
        // city.json
        {
            let json = JSON.stringify({ city: cityMaster });
            json = json.replace(/("\d{5}":)/g, "\n$1");
            write("city.json", json);
        }
        // zip5.json
        {
            let json = JSON.stringify({ zip5: zip5Master });
            json = json.replace(/("\d{5,7}":)/g, "\n$1");
            write("zip5.json", json);
        }
        // zip7.json
        {
            let json = JSON.stringify({ zip7: zip7Master });
            json = json.replace(/("\d{5,7}":)/g, "\n$1");
            write("zip7.json", json);
        }
        function write(file, json) {
            if (outDir) {
                file = outDir.replace(/\/?$/, "/" + file);
                WARN("writing: " + file);
                fs.createWriteStream(file).write(json);
            }
            else {
                process.stdout.write(json);
            }
        }
    });
}
CLI.apply(null, process.argv.slice(2));
