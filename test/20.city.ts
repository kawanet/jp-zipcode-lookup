import "mocha";
import {City} from "../lib/jp-zipcode-lookup";

const assert = require("assert");
const FILENAME = __filename.split("/").pop() as string;

describe(FILENAME, () => {

    it('City.byCode("01214")', () => {
        const city = City.byCode("01214")!;
        assert.strictEqual(city.code, "01214");
        assert.strictEqual(city.pref.name, "北海道");
        assert.strictEqual(city.name, "稚内市");
        assert.strictEqual(city.kana, "ﾜｯｶﾅｲｼ");
    });

    it('City.byCode("13101")', () => {
        const city = City.byCode("13101")!;
        assert.strictEqual(city.code, "13101");
        assert.strictEqual(city.pref.name, "東京都");
        assert.strictEqual(city.name, "千代田区");
        assert.strictEqual(city.kana, "ﾁﾖﾀﾞｸ");
    });

    it('City.byCode("47382")', () => {
        const city = City.byCode("47382")!;
        assert.strictEqual(city.code, "47382");
        assert.strictEqual(city.pref.name, "沖縄県");
        assert.strictEqual(city.name, "八重山郡与那国町");
        assert.strictEqual(city.kana, "ﾔｴﾔﾏｸﾞﾝﾖﾅｸﾞﾆﾁｮｳ");
    });

    it('City.byCode(4101)', () => {
        const city = City.byCode(4101)!;
        assert.strictEqual(city.code, "04101");
        assert.strictEqual(city.pref.name, "宮城県");
        assert.strictEqual(city.name, "仙台市青葉区");
        assert.strictEqual(city.kana, "ｾﾝﾀﾞｲｼｱｵﾊﾞｸ");
    });
});
