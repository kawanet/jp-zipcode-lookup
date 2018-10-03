import "mocha";
import {City, Oaza, Pref} from "../lib/jp-zipcode-lookup";

const assert = require("assert");
const FILENAME = __filename.split("/").pop() as string;

describe(FILENAME, () => {

    it('Pref.byCode()', () => {
        assert(!Pref.byCode(undefined!));
    });

    it('Pref.byCode("XX")', () => {
        assert(!Pref.byCode("XX"!));
    });

    it('Pref.byCode(99)', () => {
        assert(!Pref.byCode(99!));
    });

    it('City.byCode()', () => {
        assert(!City.byCode(undefined!));
    });

    it('City.byCode("XXXXX")', () => {
        assert(!City.byCode("XXXXX"!));
    });

    it('City.byCode(99999)', () => {
        assert(!City.byCode(99999!));
    });

    it('Oaza.byCode()', () => {
        assert.strictEqual(Oaza.byZipcode(undefined!).length, 0);
    });

    it('Oaza.byCode("XXXXXXX")', () => {
        assert.strictEqual(Oaza.byZipcode("XXXXXXX"!).length, 0);
    });

    it('Oaza.byCode(9999999)', () => {
        assert.strictEqual(Oaza.byZipcode(9999999!).length, 0);
    });
});
