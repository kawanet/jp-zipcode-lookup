"use strict";
// jp-zipcode-lookup
Object.defineProperty(exports, "__esModule", { value: true });
const prefLoader = () => require("../master/pref.json").pref;
const cityLoader = () => require("../master/city.json").city;
const zip5Loader = () => require("../master/zip5.json").zip5;
const zip7Loader = () => require("../master/zip7.json").zip7;
const c2 = fixedString(2);
const c5 = fixedString(5);
const c7 = fixedString(7);
/**
 * 都道府県
 */
class Pref {
    constructor(code, name, kana) {
        this.code = code;
        this.name = name;
        this.kana = kana;
    }
    static byCode(code) {
        const cache = Pref.cache;
        if (code in cache)
            return cache[code];
        code = c2(code);
        const master = Pref.master || (Pref.master = prefLoader());
        const pair = master[code];
        return pair && (cache[code] = new Pref(code, pair[0], pair[1]));
    }
    static byZipcode(zipcode) {
        return Oaza.byZipcode(zipcode).map(oaza => oaza.pref).filter(uniqByCode());
    }
}
Pref.cache = {};
exports.Pref = Pref;
/**
 * 市区町村
 */
class City {
    constructor(code, name, kana) {
        this.code = code;
        this.name = name;
        this.kana = kana;
        this.pref = Pref.byCode(code.substr(0, 2));
    }
    static byCode(code) {
        const cache = City.cache;
        if (code in cache)
            return cache[code];
        code = c5(code);
        const master = City.master || (City.master = cityLoader());
        const pair = master[code];
        return pair && (cache[code] = new City(code, pair[0], pair[1]));
    }
    static byZipcode(zipcode) {
        return Oaza.byZipcode(zipcode).map(oaza => oaza.city).filter(uniqByCode());
    }
}
City.cache = {};
exports.City = City;
/**
 * 大字
 */
class Oaza {
    constructor(cityCode, zipcode, name) {
        const city = this.city = City.byCode(cityCode);
        this.pref = city.pref;
        this.code = zipcode;
        this.name = name;
    }
    static byZipcode(zipcode) {
        const master5 = Oaza.master5 || (Oaza.master5 = zip5Loader());
        const master7 = Oaza.master7 || (Oaza.master7 = zip7Loader());
        const zip7 = c7(zipcode);
        const zip5 = zip7.substr(0, 5);
        const row5 = master5[zip5];
        const row7 = master7[zip7];
        const list = [];
        let city;
        const parse = (v) => {
            if ("number" === typeof v) {
                // 市区町村コード
                city = c5(v);
            }
            else {
                // 町域名
                list.push(new Oaza(city, zip7, v));
            }
        };
        if (row5)
            row5.forEach(parse);
        if (row7)
            row7.forEach(parse);
        return list;
    }
}
exports.Oaza = Oaza;
/**
 * @private
 */
function uniqByCode() {
    const index = {};
    return (item) => ((!index[item.code]) && (index[item.code] = true));
}
function fixedString(length) {
    return (number) => (number && number.length === length) ?
        number : ("0000000" + (+number | 0)).substr(-length);
}
