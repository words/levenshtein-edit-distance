# levenshtein-edit-distance [![Build Status](https://travis-ci.org/wooorm/levenshtein-edit-distance.svg?branch=master)](https://travis-ci.org/wooorm/levenshtein-edit-distance) [![Coverage Status](https://img.shields.io/coveralls/wooorm/levenshtein-edit-distance.svg)](https://coveralls.io/r/wooorm/levenshtein-edit-distance?branch=master)

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

- [sindresorhus/leven](https://github.com/sindresorhus/leven) — Supports a CLI, currently the fastest (I'll push an improvement soon);
- [hiddentao/fast-levenshtein](http://github.com/hiddentao/fast-levenshtein) — Supports async functionality;
- [NaturalNode/natural](http://github.com/NaturalNode/natural) — Supports settings weight of substitutions, insertions, and deletions.
- [gf3/Levenshtein](http://github.com/gf3/Levenshtein) — Supports inspecting the matrix.
- [levenshtein-component](https://www.npmjs.org/package/levenshtein-component);
- [chrisdew/levenshtein-deltas](https://github.com/chrisdew/levenshtein-deltas);

## Benchmark

On a MacBook Air, it runs about 1,915,000 op/s.

Run the benchmark yourself:

```sh
$ npm run benchmark
```

```
             Levenshtein — to be fair, it lets you inspect a matrix
    129 op/s » op/s * 1,000

             natural — to be fair, it offers more options
    212 op/s » op/s * 1,000

             levenshtein-deltas
    252 op/s » op/s * 1,000

             levenshtein-component
    335 op/s » op/s * 1,000

             fast-levenshtein
  1,251 op/s » op/s * 1,000

             Leven — fast.
  1,541 op/s » op/s * 1,000

             levenshtein-edit-distance — this module
  1,915 op/s » op/s * 1,000
```

## License

MIT © Titus Wormer
