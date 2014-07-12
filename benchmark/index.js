'use strict';

/* eslint-disable no-cond-assign */

var distance, source, fastLevenshtein, natural, Levenshtein, LevenshteinDeltas, levenshteinComponent;

distance = require('..');

try {
    fastLevenshtein = require('fast-levenshtein').get;
    Levenshtein = require('levenshtein');
    natural = require('natural').LevenshteinDistance;
    LevenshteinDeltas = require('levenshtein-deltas').Lev;
    levenshteinComponent = require('levenshtein-component');
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

suite('levenshtein-distance — this module', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            previousValue = '',
            value;

        while (value = source[++iterator]) {
            distance(previousValue, value);
            previousValue = value;
        }

        next();
    });
});

suite('fast-levenshtein', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            previousValue = '',
            value;

        while (value = source[++iterator]) {
            fastLevenshtein(previousValue, value);
            previousValue = value;
        }

        next();
    });
});

suite('levenshtein-component', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            previousValue = '',
            value;

        while (value = source[++iterator]) {
            levenshteinComponent(previousValue, value);
            previousValue = value;
        }

        next();
    });
});

suite('levenshtein-deltas', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            previousValue = '',
            value;

        while (value = source[++iterator]) {
            new LevenshteinDeltas(previousValue, value).distance()
            previousValue = value;
        }

        next();
    });
});

suite('natural — to be fair, it offers more options', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            previousValue = '',
            value;

        while (value = source[++iterator]) {
            natural(previousValue, value);
            previousValue = value;
        }

        next();
    });
});

/* eslint-disable no-new */

suite('Levenshtein — to be fair, it lets you inspect a matrix', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            previousValue = '',
            value;

        while (value = source[++iterator]) {
            new Levenshtein(previousValue, value);
            previousValue = value;
        }

        next();
    });
});
