import "mocha";
import {City} from "../lib/jp-zipcode-lookup";

const assert = require("assert");
const FILENAME = __filename.split("/").pop() as string;

describe(FILENAME, () => {
    it('City.byCode("01214")', () => {
        const city = City.byCode("01214");
        assert.strictEqual(city.code, "01214");
        assert.strictEqual(city.pref.name, "北海道");
        assert.strictEqual(city.name, "稚内市");
        assert.strictEqual(city.kana, "ﾜｯｶﾅｲｼ");
    });

    it('City.byCode("13101")', () => {
        const city = City.byCode("13101");
        assert.strictEqual(city.code, "13101");
        assert.strictEqual(city.pref.name, "東京都");
        assert.strictEqual(city.name, "千代田区");
        assert.strictEqual(city.kana, "ﾁﾖﾀﾞｸ");
    });

    it('City.byCode("47382")', () => {
        const city = City.byCode("47382");
        assert.strictEqual(city.code, "47382");
        assert.strictEqual(city.pref.name, "沖縄県");
        assert.strictEqual(city.name, "八重山郡与那国町");
        assert.strictEqual(city.kana, "ﾔｴﾔﾏｸﾞﾝﾖﾅｸﾞﾆﾁｮｳ");
    });

    it('City.byZipcode("1040061")', () => {
        const city = City.byZipcode("1040061").pop() as City;
        assert(city, "1040061 should exist");
        assert.strictEqual(city.name, "中央区");
    });

    // 6360000,奈良県,生駒郡平群町,生駒郡三郷町,北葛城郡王寺町,北葛城郡河合町
    // 9850000,宮城県,塩竈市,多賀城市,宮城郡七ヶ浜町
    // 6360300,奈良県,磯城郡川西町,磯城郡三宅町,磯城郡田原本町
    it('City.byZipcode("6360000")', () => {
        const list = City.byZipcode("6360000");
        assert(list, "6360000 should exist");
        assert.strictEqual(list.length, 4);
    });
});
