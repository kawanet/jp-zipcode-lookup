#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";
import {Pref} from "../";

const FILENAME = __filename.split("/").pop() as string;

describe(FILENAME, () => {

    it('Pref.byCode("01")', () => {
        const pref = Pref.byCode("01")!;
        assert.strictEqual(pref.code, "01");
        assert.strictEqual(pref.name, "北海道");
        assert.strictEqual(pref.kana, "ﾎｯｶｲﾄﾞｳ");
    });

    it('Pref.byCode("13")', () => {
        const pref = Pref.byCode("13")!;
        assert.strictEqual(pref.code, "13");
        assert.strictEqual(pref.name, "東京都");
        assert.strictEqual(pref.kana, "ﾄｳｷｮｳﾄ");
    });

    it('Pref.byCode("47")', () => {
        const pref = Pref.byCode("47")!;
        assert.strictEqual(pref.code, "47");
        assert.strictEqual(pref.name, "沖縄県");
        assert.strictEqual(pref.kana, "ｵｷﾅﾜｹﾝ");
    });

    it('Pref.byCode(4)', () => {
        const pref = Pref.byCode(4)!;
        assert.strictEqual(pref.code, "04");
        assert.strictEqual(pref.name, "宮城県");
        assert.strictEqual(pref.kana, "ﾐﾔｷﾞｹﾝ");
    });
});
