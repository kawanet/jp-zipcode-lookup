import "mocha";
import {Oaza} from "../lib/jp-zipcode-lookup";

const assert = require("assert");
const FILENAME = __filename.split("/").pop() as string;

describe(FILENAME, () => {

    it('Oaza.byZipcode("0970000")', () => {
        const oaza = Oaza.byZipcode("0970000").pop() as Oaza;
        assert(oaza, "0970000 should exist");
        assert.strictEqual(oaza.code, "0970000");
        assert.strictEqual(oaza.pref.name, "北海道");
        assert.strictEqual(oaza.city.name, "稚内市");
        assert.strictEqual(oaza.name, ""); // 以下に掲載がない場合
    });

    it('Oaza.byZipcode("1040061")', () => {
        const oaza = Oaza.byZipcode("1040061").pop() as Oaza;
        assert(oaza, "1040061 should exist");
        assert.strictEqual(oaza.code, "1040061");
        assert.strictEqual(oaza.pref.name, "東京都");
        assert.strictEqual(oaza.city.name, "中央区");
        assert.strictEqual(oaza.name, "銀座");
    });

    it('Oaza.byZipcode("1006640")', () => {
        const oaza = Oaza.byZipcode("1006640").pop() as Oaza;
        assert(oaza, "1006640 should exist");
        assert.strictEqual(oaza.code, "1006640");
        assert.strictEqual(oaza.pref.name, "東京都");
        assert.strictEqual(oaza.city.name, "千代田区");
        // assert.strictEqual(oaza.name, "丸の内グラントウキョウサウスタワー");
    });

    it('Oaza.byZipcode("9071800")', () => {
        const oaza = Oaza.byZipcode("9071800").pop() as Oaza;
        assert(oaza, "9071800 should exist");
        assert.strictEqual(oaza.code, "9071800");
        assert.strictEqual(oaza.pref.name, "沖縄県");
        assert.strictEqual(oaza.city.name, "八重山郡与那国町");
        assert.strictEqual(oaza.name, ""); // 以下に掲載がない場合
    });
});
