# Japan Postal Zip Code Lookup

[![Build Status](https://travis-ci.org/kawanet/jp-zipcode-lookup.svg?branch=master)](https://travis-ci.org/kawanet/jp-zipcode-lookup) [![npm version](https://badge.fury.io/js/jp-zipcode-lookup.svg)](https://badge.fury.io/js/jp-zipcode-lookup)

### Synopsis

```js
const Oaza = require("jp-zipcode-lookup").Oaza;

const oaza = Oaza.byZipcode("1040061")[0];

console.warn(oaza.pref.code, oaza.pref.name); // => 13 東京都
console.warn(oaza.city.code, oaza.city.name); // => 13102 中央区
console.warn(oaza.code, oaza.name); // => 1040061 銀座
```

```js
const City = require("jp-zipcode-lookup").City;

const city = City.byCode("13103");

console.warn(city.code, city.pref.name, city.name); // => 13103 東京都 港区
```

```js
const Pref = require("jp-zipcode-lookup").Pref;

const pref = Pref.byCode("13");

console.warn(pref.code, pref.name); // => 13 東京都
```

### TypeScript

- [jp-zipcode-lookup.d.ts](https://github.com/kawanet/jp-zipcode-lookup/blob/master/types/jp-zipcode-lookup.d.ts)

```typescript
import {City, Oaza, Pref} from "jp-zipcode-lookup";

const pref = Pref.byCode("13")!;
console.warn(pref.code, pref.name); // => 13 東京都

const city = City.byCode("13103")!;
console.warn(city.code, city.pref.name, city.name); // => 13103 東京都 港区

const oaza = Oaza.byZipcode("1040061")[0]!;
console.warn(oaza.code, oaza.name); // => 1040061 銀座
```

### GitHub

- [https://github.com/kawanet/jp-zipcode-lookup](https://github.com/kawanet/jp-zipcode-lookup)

### See Also

- [https://github.com/kawanet/jp-pref-lookup](https://github.com/kawanet/jp-pref-lookup)
- [https://github.com/kawanet/jp-city-lookup](https://github.com/kawanet/jp-city-lookup)
- [https://github.com/kawanet/japanpost-zipcode](https://github.com/kawanet/japanpost-zipcode)

### The MIT License (MIT)

Copyright (c) 2018 Yusuke Kawasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
