/**
 * 都道府県
 */
export declare class Pref {
    code: string;
    name: string;
    kana: string;
    constructor(code: number);
    private static master;
    private static cache;
    static byCode(code: number): Pref;
    static byZipcode(zipcode: string): Pref[];
}
/**
 * 市区町村
 */
export declare class City {
    code: string;
    name: string;
    kana: string;
    pref: Pref;
    constructor(code: number);
    private static master;
    private static cache;
    static byCode(code: number): City;
    static byZipcode(zipcode: string): City[];
}
/**
 * 大字
 */
export declare class Oaza {
    pref: Pref;
    city: City;
    code: string;
    name: string;
    constructor(cityCode: number, zipcode: string, name: string);
    private static master5;
    private static master7;
    static byZipcode(zipcode: string): Oaza[];
}
