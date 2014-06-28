'use strict';

var levenshteinDistance, assert;

levenshteinDistance = require('..');
assert = require('assert');

describe('levenshteinDistance()', function () {
    it('should work', function () {
        assert(levenshteinDistance('', 'a') === 1);
        assert(levenshteinDistance('a', '') === 1);
        assert(levenshteinDistance('', '') === 0);
        assert(levenshteinDistance('levenshtein', 'levenshtein') === 0);
        assert(levenshteinDistance('sitting', 'kitten') === 3);
        assert(levenshteinDistance('gumbo', 'gambol') === 2);
        assert(levenshteinDistance('saturday', 'sunday') === 3);
    });

    it('should not match case insensitive', function () {
        assert(
            levenshteinDistance('DwAyNE', 'DUANE') !==
            levenshteinDistance('dwayne', 'DuAnE')
        );
    });

    it('should not care about parameter order', function () {
        assert(
            levenshteinDistance('aarrgh', 'aargh') ===
            levenshteinDistance('aargh', 'aarrgh')
        );
    });
});
