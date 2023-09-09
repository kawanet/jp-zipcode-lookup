#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";
import {City, Oaza, Pref} from "../";

const FILENAME = __filename.split("/").pop() as string;

describe(FILENAME, () => {

    it('City.byZipcode("1040061")', () => {
        const city = City.byZipcode("1040061").pop() as City;
        assert(city, "1040061 should exist");
        assert.equal(city.name, "中央区");
        assert.equal(city.pref.name, "東京都");
    });

    it('Pref.byZipcode("1040061")', () => {
        const pref = Pref.byZipcode("1040061").pop() as Pref;
        assert(pref, "1040061 should exist");
        assert.equal(pref.name, "東京都");
    });

    // 1980000,東京都,青梅市,西多摩郡奥多摩町
    it('Oaza.byZipcode("1980000")', () => {
        const list = Oaza.byZipcode("1980000");
        assert.equal(list.length, 2);
    });

    // 6360000,奈良県,生駒郡平群町,生駒郡三郷町,北葛城郡王寺町,北葛城郡河合町
    // 9850000,宮城県,塩竈市,多賀城市,宮城郡七ヶ浜町
    // 6360300,奈良県,磯城郡川西町,磯城郡三宅町,磯城郡田原本町
    it('City.byZipcode("6360000")', () => {
        const list = City.byZipcode("6360000");
        assert(list, "6360000 should exist");
        assert.equal(list.length, 4);
    });

    // 4980000,愛知県,弥富市,三重県,桑名郡木曽岬町
    // 6180000,京都府,乙訓郡大山崎町,大阪府,三島郡島本町
    // 8710000,福岡県,築上郡吉富町,大分県,中津市
    it('Pref.byZipcode("4980000")', () => {
        const list = Pref.byZipcode("4980000");
        assert.equal(list.length, 2);
    });

    it('Oaza.byZipcode(10000)', () => {
        const oaza = Oaza.byZipcode(10000).pop() as Oaza;
        assert(oaza, "0010000 should exist");
        assert.equal(oaza.code, "0010000");
        assert.equal(oaza.city.name, "札幌市北区");
        assert.equal(oaza.pref.name, "北海道");
    });

    it('City.byZipcode(10000)', () => {
        const city = City.byZipcode(10000).pop() as City;
        assert(city, "0010000 should exist");
        assert.equal(city.name, "札幌市北区");
        assert.equal(city.pref.name, "北海道");
    });

    it('Pref.byZipcode(10000)', () => {
        const pref = Pref.byZipcode(10000).pop() as Pref;
        assert(pref, "0010000 should exist");
        assert.equal(pref.name, "北海道");
    });

    it('Oaza.byZipcode(9900000)', () => {
        const oaza = Oaza.byZipcode(9900000).pop() as Oaza;
        assert(oaza, "9900000 should exist");
        assert.equal(oaza.code, "9900000");
        assert.equal(oaza.city.name, "山形市");
        assert.equal(oaza.pref.name, "山形県");
    });

    it('City.byZipcode(9900000)', () => {
        const city = City.byZipcode(9900000).pop() as City;
        assert(city, "9900000 should exist");
        assert.equal(city.name, "山形市");
        assert.equal(city.pref.name, "山形県");
    });

    it('Pref.byZipcode(9900000)', () => {
        const pref = Pref.byZipcode(9900000).pop() as Pref;
        assert(pref, "9900000 should exist");
        assert.equal(pref.name, "山形県");
    });
});
