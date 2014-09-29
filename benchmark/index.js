'use strict';

/* eslint-disable no-cond-assign */
/* eslint-disable no-new */

var distance, source, fastLevenshtein, natural, Levenshtein,
    LevenshteinDeltas, levenshteinComponent, leven;

distance = require('..');

try {
    fastLevenshtein = require('fast-levenshtein').get;
    Levenshtein = require('levenshtein');
    natural = require('natural').LevenshteinDistance;
    LevenshteinDeltas = require('levenshtein-deltas').Lev;
    levenshteinComponent = require('levenshtein-component');
    leven = require('leven');
} catch (error) {
    throw new Error(
        '\u001B[0;31m' +
        'The libraries needed by this benchmark could not be found. ' +
        'Please execute:\n' +
        '\tnpm run install-benchmark\n\n' +
        '\u001B[0m'
    );
}

/* The first 100 words from Letterpress: https://github.com/atebits/Words */
source = Array(11).join([
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

function benchAll(callback) {
    var index,
        prev,
        value;

    index = source.length;
    value = source[0];

    while (index--) {
        prev = value;
        value = source[index];
        callback(value, prev);
    }
}

suite('Levenshtein — to be fair, it lets you inspect a matrix', function () {
    bench('op/s * 1,000', function () {
        benchAll(function (value, other) {
            new Levenshtein(value, other);
        });
    });
});

suite('natural — to be fair, it offers more options', function () {
    bench('op/s * 1,000', function () {
        benchAll(function (value, other) {
            natural(value, other);
        });
    });
});

suite('levenshtein-deltas', function () {
    bench('op/s * 1,000', function () {
        benchAll(function (value, other) {
            new LevenshteinDeltas(value, other).distance();
        });
    });
});

suite('levenshtein-component', function () {
    bench('op/s * 1,000', function () {
        benchAll(function (value, other) {
            levenshteinComponent(value, other);
        });
    });
});

suite('fast-levenshtein', function () {
    bench('op/s * 1,000', function () {
        benchAll(function (value, other) {
            fastLevenshtein(value, other);
        });
    });
});

suite('Leven — fast.', function () {
    bench('op/s * 1,000', function () {
        benchAll(function (value, other) {
            leven(value, other);
        });
    });
});

suite('levenshtein-edit-distance — this module', function () {
    bench('op/s * 1,000', function () {
        benchAll(function (value, other) {
            distance(value, other);
        });
    });
});
