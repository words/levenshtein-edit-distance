'use strict';

/* eslint-disable no-new */
/* globals suite,bench */

/**
 * Dependencies.
 */

var distance,
    fastLevenshtein,
    natural,
    Levenshtein,
    LevenshteinDeltas,
    levenshteinComponent,
    leven;

distance = require('./');

try {
    fastLevenshtein = require('fast-levenshtein').get;
    Levenshtein = require('levenshtein');
    natural = require('natural').LevenshteinDistance;
    LevenshteinDeltas = require('levenshtein-deltas').Lev;
    levenshteinComponent = require('levenshtein-component');
    leven = require('leven');
} catch (error) {
    console.log(
        '\u001B[0;31m' +
        'The libraries needed by this benchmark could not be found. ' +
        'Please execute:\n' +
        '\tnpm run install-benchmark\n\n' +
        '\u001B[0m'
    );
}

/**
 * Fixtures: 1000 words.
 *
 * Source:
 *   https://github.com/atebits/Words
 */

var fixtures;

/* The first 100 words from Letterpress:  */
fixtures = Array(11).join([
    'aa',
    'aah',
    'aahed',
    'aahing',
    'aahs',
    'aal',
    'aalii',
    'aaliis',
    'aals',
    'aardvark',
    'aardvarks',
    'aardwolf',
    'aardwolves',
    'aargh',
    'aarrgh',
    'aarrghh',
    'aarti',
    'aartis',
    'aas',
    'aasvogel',
    'aasvogels',
    'ab',
    'aba',
    'abac',
    'abaca',
    'abacas',
    'abaci',
    'aback',
    'abacs',
    'abacterial',
    'abactinal',
    'abactinally',
    'abactor',
    'abactors',
    'abacus',
    'abacuses',
    'abaft',
    'abaka',
    'abakas',
    'abalone',
    'abalones',
    'abamp',
    'abampere',
    'abamperes',
    'abamps',
    'aband',
    'abanded',
    'abanding',
    'abandon',
    'abandoned',
    'abandonedly',
    'abandonee',
    'abandonees',
    'abandoner',
    'abandoners',
    'abandoning',
    'abandonment',
    'abandonments',
    'abandons',
    'abandonware',
    'abandonwares',
    'abands',
    'abapical',
    'abas',
    'abase',
    'abased',
    'abasedly',
    'abasement',
    'abasements',
    'abaser',
    'abasers',
    'abases',
    'abash',
    'abashed',
    'abashedly',
    'abashes',
    'abashing',
    'abashless',
    'abashment',
    'abashments',
    'abasia',
    'abasias',
    'abasing',
    'abask',
    'abatable',
    'abate',
    'abated',
    'abatement',
    'abatements',
    'abater',
    'abaters',
    'abates',
    'abating',
    'abatis',
    'abatises',
    'abator',
    'abators',
    'abattis',
    'abattises',
    'abattoir',
    'abattoirs'
].join('|')).split('|');

/**
 * Benchmark all fixtures.
 *
 * @param {function (string, string)} callback
 */
function benchAll(callback) {
    var index,
        prev,
        value;

    index = fixtures.length;
    value = fixtures[0];

    while (index--) {
        prev = value;
        value = fixtures[index];
        callback(value, prev);
    }
}

if (Levenshtein) {
    suite('Levenshtein — to be fair, it lets you inspect a matrix',
        function () {
            bench('op/s * 1,000', function () {
                benchAll(function (value, other) {
                    new Levenshtein(value, other);
                });
            });
        }
    );
}

if (natural) {
    suite('natural — to be fair, it offers more options', function () {
        bench('op/s * 1,000', function () {
            benchAll(function (value, other) {
                natural(value, other);
            });
        });
    });
}

if (LevenshteinDeltas) {
    suite('levenshtein-deltas', function () {
        bench('op/s * 1,000', function () {
            benchAll(function (value, other) {
                new LevenshteinDeltas(value, other).distance();
            });
        });
    });
}

if (levenshteinComponent) {
    suite('levenshtein-component', function () {
        bench('op/s * 1,000', function () {
            benchAll(function (value, other) {
                levenshteinComponent(value, other);
            });
        });
    });
}

if (fastLevenshtein) {
    suite('fast-levenshtein', function () {
        bench('op/s * 1,000', function () {
            benchAll(function (value, other) {
                fastLevenshtein(value, other);
            });
        });
    });
}

if (leven) {
    suite('Leven — fast.', function () {
        bench('op/s * 1,000', function () {
            benchAll(function (value, other) {
                leven(value, other);
            });
        });
    });
}

suite('levenshtein-edit-distance — this module', function () {
    bench('op/s * 1,000', function () {
        benchAll(function (value, other) {
            distance(value, other);
        });
    });
});
