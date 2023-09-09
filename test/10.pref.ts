#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";
import {Pref} from "../";

const FILENAME = __filename.split("/").pop() as string;

describe(FILENAME, () => {

    it('Pref.byCode("01")', () => {
        const pref = Pref.byCode("01")!;
        assert.equal(pref.code, "01");
        assert.equal(pref.name, "北海道");
        assert.equal(pref.kana, "ﾎｯｶｲﾄﾞｳ");
    });

    it('Pref.byCode("13")', () => {
        const pref = Pref.byCode("13")!;
        assert.equal(pref.code, "13");
        assert.equal(pref.name, "東京都");
        assert.equal(pref.kana, "ﾄｳｷｮｳﾄ");
    });

    it('Pref.byCode("47")', () => {
        const pref = Pref.byCode("47")!;
        assert.equal(pref.code, "47");
        assert.equal(pref.name, "沖縄県");
        assert.equal(pref.kana, "ｵｷﾅﾜｹﾝ");
    });

    it('Pref.byCode(4)', () => {
        const pref = Pref.byCode(4)!;
        assert.equal(pref.code, "04");
        assert.equal(pref.name, "宮城県");
        assert.equal(pref.kana, "ﾐﾔｷﾞｹﾝ");
    });
});
