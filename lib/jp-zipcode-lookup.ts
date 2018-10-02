// jp-zipcode-lookup

type PostalRow = (number | string)[];
type PostalMaster = { [zip: string]: PostalRow };

type NameKanaRow = [string, string];
type PrefMaster = { [code: string]: NameKanaRow };
type CityMaster = { [code: string]: NameKanaRow };

const prefLoader = () => require("../master/pref.json").pref as PrefMaster;
const cityLoader = () => require("../master/city.json").city as CityMaster;
const zip5Loader = () => require("../master/zip5.json").zip5 as PostalMaster;
const zip7Loader = () => require("../master/zip7.json").zip7 as PostalMaster;

/**
 * 都道府県
 */

export class Pref {
    code: string;
    name: string;
    kana: string;

    constructor(code: number) {
        this.code = "" + code;

        const master = Pref.master || (Pref.master = prefLoader());
        const row = master[code];
        if (row) {
            this.name = row[0];
            this.kana = row[1];
        }
    }

    private static master: PrefMaster;
    private static cache = {} as { [code: string]: Pref };

    static byCode(code: number): Pref {
        return Pref.cache[code] || (Pref.cache[code] = new Pref(code));
    }

    static byZipcode(zipcode: string): Pref[] {
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

    constructor(code: number) {
        this.code = "" + code;

        const master = City.master || (City.master = cityLoader());

        const row = master[code];
        if (row) {
            this.name = row[0];
            this.kana = row[1];
        }

        this.pref = Pref.byCode(Math.floor(code / 1000));
    }

    private static master: CityMaster;
    private static cache = {} as { [code: string]: City };

    static byCode(code: number): City {
        return City.cache[code] || (City.cache[code] = new City(code));
    }

    static byZipcode(zipcode: string): City[] {
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

    constructor(cityCode: number, zipcode: string, name: string) {
        const city = this.city = City.byCode(cityCode);
        this.pref = city.pref;
        this.code = zipcode;
        this.name = name;
    }

    private static master5: PostalMaster;
    private static master7: PostalMaster;

    static byZipcode(zipcode: string): Oaza[] {
        const master5 = Oaza.master5 || (Oaza.master5 = zip5Loader());
        const master7 = Oaza.master7 || (Oaza.master7 = zip7Loader());

        const zip7 = zipcode;
        const zip5 = zip7.substr(0, 5);
        const row5 = master5[zip5];
        const row7 = master7[zip7];

        const list = [] as Oaza[];
        let city: number;

        const parse = (v: string | number) => {
            if ("number" === typeof v) {
                // 市区町村コード
                city = v;
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
