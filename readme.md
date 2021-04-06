# levenshtein-edit-distance

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Levenshtein edit distance][wiki] (by [Vladimir Levenshtein][vlad]).
No cruft.
Real fast.

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install levenshtein-edit-distance
```

## API

This package exports the following identifiers: `levenshteinEditDistance`.
There is no default export.

```js
import {levenshteinEditDistance} from 'levenshtein-edit-distance'

levenshteinEditDistance('levenshtein', 'levenshtein') // => 0
levenshteinEditDistance('sitting', 'kitten') // => 3
levenshteinEditDistance('gumbo', 'gambol') // => 2
levenshteinEditDistance('saturday', 'sunday') // => 3

// Case sensitive!
levenshteinEditDistance('DwAyNE', 'DUANE') !== levenshtein('dwayne', 'DuAnE') // => true

// Insensitive
levenshteinEditDistance('DwAyNE', 'DUANE', true) === levenshtein('dwayne', 'DuAnE', true) // => true

// Order insensitive
levenshteinEditDistance('aarrgh', 'aargh') === levenshtein('aargh', 'aarrgh') // => true
```

## CLI

```txt
Usage: levenshtein-edit-distance [options] word word

Levenshtein edit distance. No cruft. Real fast.

Options:

  -h, --help           output usage information
  -v, --version        output version number
  -i, --insensitive    ignore casing

Usage:

# output distance
$ levenshtein-edit-distance sitting kitten
# 3

# output distance from stdin
$ echo "saturday,sunday" | levenshtein-edit-distance
# 3
```

## Related

*   [`levenshtein.c`](https://github.com/wooorm/levenshtein.c)
    — C API
*   [`levenshtein`](https://github.com/wooorm/levenshtein)
    — C CLI
*   [`levenshtein-rs`](https://github.com/wooorm/levenshtein-rs)
    — Rust API
*   [`stemmer`](https://github.com/words/stemmer)
    — Porter stemming algorithm
*   [`lancaster-stemmer`](https://github.com/words/lancaster-stemmer)
    — Lancaster stemming algorithm
*   [`double-metaphone`](https://github.com/words/double-metaphone)
    — Double Metaphone implementation
*   [`soundex-code`](https://github.com/words/soundex-code)
    — Fast Soundex implementation
*   [`dice-coefficient`](https://github.com/words/dice-coefficient)
    — Sørensen–Dice coefficient
*   [`syllable`](https://github.com/words/syllable)
    — Syllable count in an English word

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/words/levenshtein-edit-distance/workflows/main/badge.svg

[build]: https://github.com/words/levenshtein-edit-distance/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/words/levenshtein-edit-distance.svg

[coverage]: https://codecov.io/github/words/levenshtein-edit-distance

[downloads-badge]: https://img.shields.io/npm/dm/levenshtein-edit-distance.svg

[downloads]: https://www.npmjs.com/package/levenshtein-edit-distance

[size-badge]: https://img.shields.io/bundlephobia/minzip/levenshtein-edit-distance.svg

[size]: https://bundlephobia.com/result?p=levenshtein-edit-distance

[npm]: https://www.npmjs.com

[license]: license

[author]: https://wooorm.com

[wiki]: https://en.wikipedia.org/wiki/Levenshtein_distance

[vlad]: https://en.wikipedia.org/wiki/Vladimir_Levenshtein
