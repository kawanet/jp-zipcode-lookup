"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const jp_zipcode_lookup_1 = require("../lib/jp-zipcode-lookup");
const assert = require("assert");
const FILENAME = __filename.split("/").pop();
describe(FILENAME, () => {
    it('Pref.byCode()', () => {
        assert(!jp_zipcode_lookup_1.Pref.byCode(undefined));
    });
    it('Pref.byCode("XX")', () => {
        assert(!jp_zipcode_lookup_1.Pref.byCode("XX"));
    });
    it('Pref.byCode(99)', () => {
        assert(!jp_zipcode_lookup_1.Pref.byCode(99));
    });
    it('City.byCode()', () => {
        assert(!jp_zipcode_lookup_1.City.byCode(undefined));
    });
    it('City.byCode("XXXXX")', () => {
        assert(!jp_zipcode_lookup_1.City.byCode("XXXXX"));
    });
    it('City.byCode(99999)', () => {
        assert(!jp_zipcode_lookup_1.City.byCode(99999));
    });
    it('Pref.byCode()', () => {
        assert.strictEqual(jp_zipcode_lookup_1.Pref.byZipcode(undefined).length, 0);
    });
    it('Pref.byCode("XXXXXXX")', () => {
        assert.strictEqual(jp_zipcode_lookup_1.Pref.byZipcode("XXXXXXX").length, 0);
    });
    it('Pref.byCode(9999999)', () => {
        assert.strictEqual(jp_zipcode_lookup_1.Pref.byZipcode(9999999).length, 0);
    });
    it('City.byCode()', () => {
        assert.strictEqual(jp_zipcode_lookup_1.City.byZipcode(undefined).length, 0);
    });
    it('City.byCode("XXXXXXX")', () => {
        assert.strictEqual(jp_zipcode_lookup_1.City.byZipcode("XXXXXXX").length, 0);
    });
    it('City.byCode(9999999)', () => {
        assert.strictEqual(jp_zipcode_lookup_1.City.byZipcode(9999999).length, 0);
    });
    it('Oaza.byCode()', () => {
        assert.strictEqual(jp_zipcode_lookup_1.Oaza.byZipcode(undefined).length, 0);
    });
    it('Oaza.byCode("XXXXXXX")', () => {
        assert.strictEqual(jp_zipcode_lookup_1.Oaza.byZipcode("XXXXXXX").length, 0);
    });
    it('Oaza.byCode(9999999)', () => {
        assert.strictEqual(jp_zipcode_lookup_1.Oaza.byZipcode(9999999).length, 0);
    });
});
