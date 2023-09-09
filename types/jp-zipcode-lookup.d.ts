/**
 * Japan Postal Zip Code Lookup
 *
 * @see https://github.com/kawanet/jp-zipcode-lookup
 */

/**
 * 都道府県
 */
export declare class Pref {
    code: string;
    name: string;
    kana: string;

    static byCode(code: string | number): Pref | undefined;

    static byZipcode(zipcode: string | number): Pref[];
}

/**
 * 市区町村
 */
export declare class City {
    code: string;
    name: string;
    kana: string;
    pref: Pref;

    static byCode(code: string | number): City | undefined;

    static byPref(code: string | number): City[] | undefined;

    static byZipcode(zipcode: string | number): City[];
}

/**
 * 大字
 */
export declare class Oaza {
    pref: Pref;
    city: City;
    code: string;
    name: string;

    static byZipcode(zipcode: string | number): Oaza[];
}
