'use strict';

/**
 * Dependencies.
 */

var levenshteinDistance,
    assert;

levenshteinDistance = require('./');
assert = require('assert');

/**
 * Tests.
 */

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

/**
 * Tests from fast-levenshtein, just to make sure thing
 * are interoperable.
 *
 * Source:
 *   https://github.com/hiddentao/fast-levenshtein
 */

describe('Compatibility with `fast-levenshtein`', function () {
    it('should work', function () {
        assert(levenshteinDistance('a', 'b') === 1);

        assert(levenshteinDistance('ab', 'ac') === 1);

        assert(levenshteinDistance('ac', 'bc') === 1);

        assert(levenshteinDistance('abc', 'axc') === 1);

        assert(levenshteinDistance('xabxcdxxefxgx', '1ab2cd34ef5g6') === 6);

        assert(levenshteinDistance('xabxcdxxefxgx', 'abcdefg') === 6);

        assert(levenshteinDistance('javawasneat', 'scalaisgreat') === 7);

        assert(levenshteinDistance('example', 'samples') === 3);

        assert(levenshteinDistance('sturgeon', 'urgently') === 6);

        assert(levenshteinDistance('levenshtein', 'frankenstein') === 6);

        assert(levenshteinDistance('distance', 'difference') === 5);

        assert(levenshteinDistance('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文') === 2);

        assert(levenshteinDistance(
                'Morbi interdum ultricies neque varius condimentum. Donec ' +
                'volutpat turpis interdum metus ultricies vulputate. Duis ' +
                'ultricies rhoncus sapien, sit amet fermentum risus ' +
                'imperdiet vitae. Ut et lectus',
                'Duis erat dolor, cursus in tincidunt a, lobortis in odio. ' +
                'Cras magna sem, pharetra et iaculis quis, faucibus quis ' +
                'tellus. Suspendisse dapibus sapien in justo cursus'
            ) === 143
        );
    });
});
