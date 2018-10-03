/**
 * 都道府県
 */
export declare class Pref {
    code: string;
    name: string;
    kana: string;
    private constructor();
    private static master;
    private static cache;
    static byCode(code: string): Pref;
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
    private constructor();
    private static master;
    private static cache;
    static byCode(code: string): City;
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
    private constructor();
    private static master5;
    private static master7;
    static byZipcode(zipcode: string): Oaza[];
}
