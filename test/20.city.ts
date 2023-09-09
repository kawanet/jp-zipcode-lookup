#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";
import {City} from "../";

const FILENAME = __filename.split("/").pop() as string;

describe(FILENAME, () => {

    it('City.byCode("01214")', () => {
        const city = City.byCode("01214")!;
        assert.equal(city.code, "01214");
        assert.equal(city.pref.name, "北海道");
        assert.equal(city.name, "稚内市");
        assert.equal(city.kana, "ﾜｯｶﾅｲｼ");
    });

    it('City.byCode("13101")', () => {
        const city = City.byCode("13101")!;
        assert.equal(city.code, "13101");
        assert.equal(city.pref.name, "東京都");
        assert.equal(city.name, "千代田区");
        assert.equal(city.kana, "ﾁﾖﾀﾞｸ");
    });

    it('City.byCode("47382")', () => {
        const city = City.byCode("47382")!;
        assert.equal(city.code, "47382");
        assert.equal(city.pref.name, "沖縄県");
        assert.equal(city.name, "八重山郡与那国町");
        assert.equal(city.kana, "ﾔｴﾔﾏｸﾞﾝﾖﾅｸﾞﾆﾁｮｳ");
    });

    it('City.byCode(4101)', () => {
        const city = City.byCode(4101)!;
        assert.equal(city.code, "04101");
        assert.equal(city.pref.name, "宮城県");
        assert.equal(city.name, "仙台市青葉区");
        assert.equal(city.kana, "ｾﾝﾀﾞｲｼｱｵﾊﾞｸ");
    });

    it('City.byPref(2)', () => {
        const cities = City.byPref(2)!;
        assert.notEqual(cities.length, 0);
        assert.ok(cities.every(city => city.pref.code === "02"));
    });

    it('City.byPref("03")', () => {
        const cities = City.byPref("03")!;
        assert.notEqual(cities.length, 0);
        assert.ok(cities.every(city => city.pref.code === "03"));
    });
});
