# levenshtein-edit-distance [![Build Status](https://travis-ci.org/wooorm/levenshtein-edit-distance.svg?branch=master)](https://travis-ci.org/wooorm/levenshtein-edit-distance) [![Coverage Status](https://img.shields.io/coveralls/wooorm/levenshtein-edit-distance.svg)](https://coveralls.io/r/wooorm/levenshtein-edit-distance?branch=master)

[![browser support](https://ci.testling.com/wooorm/levenshtein-edit-distance.png) ](https://ci.testling.com/wooorm/levenshtein-edit-distance)

---

[Levenshtein edit distance](http://en.wikipedia.org/wiki/Levenshtein_distance) (by [Vladimir Levenshtein](http://en.wikipedia.org/wiki/Vladimir_Levenshtein)). No cruft. Real fast.

## Installation

NPM:
```sh
$ npm install levenshtein-edit-distance
```

Component.js:
```sh
$ component install wooorm/levenshtein-edit-distance
```

## Usage

```js
var levenshteinDistance = require('levenshtein-edit-distance');

levenshteinDistance('levenshtein', 'levenshtein'); // 0
levenshteinDistance('sitting', 'kitten'); // 3
levenshteinDistance('gumbo', 'gambol'); // 2
levenshteinDistance('saturday', 'sunday'); // 3

/* Case sensitive! */
levenshteinDistance('DwAyNE', 'DUANE') !== levenshteinDistance('dwayne', 'DuAnE'); // true

/* Order insensitive */
levenshteinDistance("aarrgh", "aargh") === levenshteinDistance("aargh", "aarrgh"); // true
```

## Other Levenshtein libraries

- [hiddentao/fast-levenshtein](http://github.com/hiddentao/fast-levenshtein) — Supports async functionality;
- [NaturalNode/natural](http://github.com/NaturalNode/natural) — Supports settings weight of substitutions, insertions, and deletions.
- [gf3/Levenshtein](http://github.com/gf3/Levenshtein) — Supports inspecting the matrix.

## Benchmark

On a MacBook Air, it runs about 313,000 op/s, which is faster than the competition.

Run the benchmark yourself:

```sh
$ npm run install-benchmark # Just once of course.
$ npm run benchmark
```

```
         levenshtein-edit-distance — this module
313 op/s » op/s * 1,000

         fast-levenshtein — “fast”... pff ;)
268 op/s » op/s * 1,000

         natural — to be fair, it offers more options
213 op/s » op/s * 1,000

         Levenshtein — to be fair, it lets you inspect a matrix
141 op/s » op/s * 1,000
```

## License

  MIT
