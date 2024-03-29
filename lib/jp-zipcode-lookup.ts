/**
 * Japan Postal Zip Code Lookup
 *
 * @see https://github.com/kawanet/jp-zipcode-lookup
 */

import type * as types from "../";

type PostalRow = (number | string)[];
type PostalMaster = { [zip: string]: (PostalRow | number | string) };

type NameKanaPair = [string, string];
type PrefMaster = { [code: string]: NameKanaPair };
type CityMaster = { [code: string]: NameKanaPair };

const lazy = <T>(fn: () => T): (() => T) => {
    let v: T;
    return () => (v || (v = fn()));
};

const cache = <T>(fn: (code: string | number) => T | undefined): ((code: string | number) => T | undefined) => {
    const cached = {} as { [code: string]: T | undefined };
    return (code) => ((code in cached) ? cached[code] : (cached[code] = fn(code)));
};

const loadPref = lazy(() => require("../master/pref.json").pref as PrefMaster);
const loadCity = lazy(() => require("../master/city.json").city as CityMaster);
const loadZip5 = lazy(() => require("../master/zip5.json").zip5 as PostalMaster);
const loadZip7 = lazy(() => require("../master/zip7.json").zip7 as PostalMaster);

const c2 = fixedString(2);
const c5 = fixedString(5);
const c7 = fixedString(7);

/**
 * 都道府県
 */

export class Pref implements types.Pref {
    code: string;
    name: string;
    kana: string;

    private constructor(code: string, name: string, kana: string) {
        this.code = code;
        this.name = name;
        this.kana = kana;
    }

    static byCode = cache((code) => {
        code = c2(code);
        const master = loadPref();
        const pair = master[code];
        return pair && new Pref(code, pair[0], pair[1]);
    });

    static byZipcode(zipcode: string | number): Pref[] {
        return Oaza.byZipcode(zipcode).map(oaza => oaza.pref).filter(uniqByCode());
    }
}

/**
 * 市区町村
 */

export class City implements types.City {
    code: string;
    name: string;
    kana: string;
    pref: Pref;

    private constructor(code: string, name: string, kana: string) {
        this.code = code;
        this.name = name;
        this.kana = kana;
        this.pref = Pref.byCode(code.slice(0, 2))!;
    }

    static byCode = cache((code) => {
        code = c5(code);
        const master = loadCity();
        const pair = master[code];
        return pair && new City(code, pair[0], pair[1]);
    });

    static byPref = cache((code) => {
        code = +code;
        const master = loadCity();
        const list = Object.keys(master).filter(city => (+city.slice(0, 2) === code)).map(City.byCode) as City[];
        return list.length ? list : undefined;
    });

    static byZipcode(zipcode: string | number): City[] {
        return Oaza.byZipcode(zipcode).map(oaza => oaza.city).filter(uniqByCode());
    }
}

/**
 * 大字
 */

export class Oaza implements types.Oaza {
    pref: Pref;
    city: City;
    code: string;
    name: string;

    private constructor(cityCode: string, zipcode: string, name: string) {
        const city = this.city = City.byCode(cityCode)!;
        this.pref = city.pref;
        this.code = zipcode;
        this.name = name;
    }

    static byZipcode(zipcode: string | number): Oaza[] {
        const master5 = loadZip5();
        const master7 = loadZip7();

        const zip7 = c7(zipcode);
        const zip5 = zip7.slice(0, 5);
        const row5 = master5[zip5];
        const row7 = master7[zip7];

        const list = [] as Oaza[];
        let city: string;

        const parse = (v: string | number) => {
            if ("number" === typeof v) {
                // 市区町村コード
                city = c5(v);
            } else {
                // 町域名
                list.push(new Oaza(city, zip7, v));
            }
        };

        const parseRow = (row: string | number | PostalRow) => {
            if ("object" === typeof row) {
                row.forEach(parse);
            } else if (row != null) {
                parse(row);
            }
        };

        parseRow(row5);
        parseRow(row7);

        return list;
    }
}

/**
 * @private
 */

function uniqByCode() {
    const index = {} as { [code: string]: boolean };
    return (item: { code: string }) => ((!index[item.code]) && (index[item.code] = true));
}

function fixedString(length: number) {
    return (number: number | string) => (number && (number as string).length === length) ?
        (number as string) : ("0000000" + (+number | 0)).slice(-length);
}
