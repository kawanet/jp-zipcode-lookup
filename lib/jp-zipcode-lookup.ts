// jp-zipcode-lookup

type PostalRow = (number | string)[];
type PostalMaster = { [zip: string]: PostalRow };

type NameKanaPair = [string, string];
type PrefMaster = { [code: string]: NameKanaPair };
type CityMaster = { [code: string]: NameKanaPair };

const prefLoader = () => require("../master/pref.json").pref as PrefMaster;
const cityLoader = () => require("../master/city.json").city as CityMaster;
const zip5Loader = () => require("../master/zip5.json").zip5 as PostalMaster;
const zip7Loader = () => require("../master/zip7.json").zip7 as PostalMaster;

const c2 = fixedString(2);
const c5 = fixedString(5);
const c7 = fixedString(7);

/**
 * 都道府県
 */

export class Pref {
    code: string;
    name: string;
    kana: string;

    private constructor(code: string, name: string, kana: string) {
        this.code = code;
        this.name = name;
        this.kana = kana;
    }

    private static master: PrefMaster;

    private static cache = {} as { [code: string]: Pref };

    static byCode(code: string | number): Pref | undefined {
        const cache = Pref.cache;
        if (code in cache) return cache[code];

        code = c2(code);
        const master = Pref.master || (Pref.master = prefLoader());
        const pair = master[code];
        return pair && (cache[code] = new Pref(code, pair[0], pair[1]));
    }

    static byZipcode(zipcode: string | number): Pref[] {
        return City.byZipcode(zipcode).map(city => city.pref).filter(uniqueFilter());
    }
}

/**
 * 市区町村
 */

export class City {
    code: string;
    name: string;
    kana: string;
    pref: Pref;

    private constructor(code: string, name: string, kana: string) {
        this.code = code;
        this.name = name;
        this.kana = kana;
        this.pref = Pref.byCode(code.substr(0, 2))!;
    }

    private static master: CityMaster;

    private static cache = {} as { [code: string]: City };

    static byCode(code: string | number): City | undefined {
        const cache = City.cache;
        if (code in cache) return cache[code];

        code = c5(code);
        const master = City.master || (City.master = cityLoader());
        const pair = master[code];
        return pair && (cache[code] = new City(code, pair[0], pair[1]));
    }

    static byZipcode(zipcode: string | number): City[] {
        return Oaza.byZipcode(zipcode).map(oaza => oaza.city).filter(uniqueFilter());
    }
}

/**
 * 大字
 */

export class Oaza {
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

    private static master5: PostalMaster;
    private static master7: PostalMaster;

    static byZipcode(zipcode: string | number): Oaza[] {
        const master5 = Oaza.master5 || (Oaza.master5 = zip5Loader());
        const master7 = Oaza.master7 || (Oaza.master7 = zip7Loader());

        const zip7 = c7(zipcode);
        const zip5 = zip7.substr(0, 5);
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

        if (row5) row5.forEach(parse);
        if (row7) row7.forEach(parse);

        return list;
    }
}

/**
 * @private
 */

function uniqueFilter() {
    const index = {} as { [code: string]: boolean };
    return (item: { code: string }) => ((!index[item.code]) && (index[item.code] = true));
}

function fixedString(length: number) {
    return (number: number | string) => (number && (number as string).length === length) ?
        (number as string) : ("0000000" + (+number | 0)).substr(-length);
}
