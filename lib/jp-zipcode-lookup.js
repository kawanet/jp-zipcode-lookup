"use strict";
// jp-zipcode-lookup
Object.defineProperty(exports, "__esModule", { value: true });
const prefLoader = () => require("../master/pref.json").pref;
const cityLoader = () => require("../master/city.json").city;
const zip5Loader = () => require("../master/zip5.json").zip5;
const zip7Loader = () => require("../master/zip7.json").zip7;
/**
 * 都道府県
 */
class Pref {
    constructor(code) {
        this.code = code;
        const master = Pref.master || (Pref.master = prefLoader());
        const row = master[code];
        if (row) {
            this.name = row[0];
            this.kana = row[1];
        }
    }
    static byCode(code) {
        return Pref.cache[code] || (Pref.cache[code] = new Pref(num2str(2, code)));
    }
    static byZipcode(zipcode) {
        return City.byZipcode(zipcode).map(city => city.pref).filter(uniqueFilter());
    }
}
Pref.cache = {};
exports.Pref = Pref;
/**
 * 市区町村
 */
class City {
    constructor(code) {
        this.code = code;
        const master = City.master || (City.master = cityLoader());
        const row = master[code];
        if (row) {
            this.name = row[0];
            this.kana = row[1];
        }
        this.pref = Pref.byCode(code.substr(0, 2));
    }
    static byCode(code) {
        return City.cache[code] || (City.cache[code] = new City(num2str(5, code)));
    }
    static byZipcode(zipcode) {
        return Oaza.byZipcode(zipcode).map(oaza => oaza.city).filter(uniqueFilter());
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
        const zip7 = num2str(7, zipcode);
        const zip5 = zip7.substr(0, 5);
        const row5 = master5[zip5];
        const row7 = master7[zip7];
        const list = [];
        let city;
        const parse = (v) => {
            if ("number" === typeof v) {
                // 市区町村コード
                city = num2str(5, v);
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
function uniqueFilter() {
    const index = {};
    return (item) => ((!index[item.code]) && (index[item.code] = true));
}
function num2str(length, number) {
    if (number && number.length === length)
        return number;
    return ("0000000" + number).substr(-length);
}
