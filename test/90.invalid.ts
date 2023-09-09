#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";
import {City, Oaza, Pref} from "../";

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

    it('Pref.byZipcode()', () => {
        assert.equal(Pref.byZipcode(undefined!).length, 0);
    });

    it('Pref.byZipcode("XXXXXXX")', () => {
        assert.equal(Pref.byZipcode("XXXXXXX"!).length, 0);
    });

    it('Pref.byZipcode(9999999)', () => {
        assert.equal(Pref.byZipcode(9999999!).length, 0);
    });

    it('City.byZipcode()', () => {
        assert.equal(City.byZipcode(undefined!).length, 0);
    });

    it('City.byZipcode("XXXXXXX")', () => {
        assert.equal(City.byZipcode("XXXXXXX"!).length, 0);
    });

    it('City.byZipcode(9999999)', () => {
        assert.equal(City.byZipcode(9999999!).length, 0);
    });

    it('Oaza.byZipcode()', () => {
        assert.equal(Oaza.byZipcode(undefined!).length, 0);
    });

    it('Oaza.byZipcode("XXXXXXX")', () => {
        assert.equal(Oaza.byZipcode("XXXXXXX"!).length, 0);
    });

    it('Oaza.byZipcode(9999999)', () => {
        assert.equal(Oaza.byZipcode(9999999!).length, 0);
    });
});
