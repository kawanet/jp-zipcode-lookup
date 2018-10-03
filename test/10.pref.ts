import "mocha";
import {Pref} from "../lib/jp-zipcode-lookup";

const assert = require("assert");
const FILENAME = __filename.split("/").pop() as string;

describe(FILENAME, () => {
    it('Pref.byCode("01")', () => {
        const pref = Pref.byCode("01");
        assert.strictEqual(pref.code, "01");
        assert.strictEqual(pref.name, "北海道");
        assert.strictEqual(pref.kana, "ﾎｯｶｲﾄﾞｳ");
    });

    it('Pref.byCode("13")', () => {
        const pref = Pref.byCode("13");
        assert.strictEqual(pref.code, "13");
        assert.strictEqual(pref.name, "東京都");
        assert.strictEqual(pref.kana, "ﾄｳｷｮｳﾄ");
    });

    it('Pref.byCode("47")', () => {
        const pref = Pref.byCode("47");
        assert.strictEqual(pref.code, "47");
        assert.strictEqual(pref.name, "沖縄県");
        assert.strictEqual(pref.kana, "ｵｷﾅﾜｹﾝ");
    });

    it('Pref.byZipcode("1040061")', () => {
        const pref = Pref.byZipcode("1040061").pop() as Pref;
        assert(pref, "1040061 should exist");
        assert.strictEqual(pref.name, "東京都");
    });

    // 4980000,愛知県,弥富市,三重県,桑名郡木曽岬町
    // 6180000,京都府,乙訓郡大山崎町,大阪府,三島郡島本町
    // 8710000,福岡県,築上郡吉富町,大分県,中津市
    it('Pref.byZipcode("4980000")', () => {
        const list = Pref.byZipcode("4980000");
        assert.strictEqual(list.length, 2);
    });
});
