#!/usr/bin/env node
'use strict';

/* eslint-disable no-process-exit */

/*
 * Dependencies.
 */

var levenshtein,
    pack;

levenshtein = require('./');
pack = require('./package.json');

/*
 * Detect if a value is expected to be piped in.
 */

var expextPipeIn;

expextPipeIn = !process.stdin.isTTY;

/*
 * Arguments.
 */

var argv;

argv = process.argv.slice(2);

/*
 * Command.
 */

var command;

command = Object.keys(pack.bin)[0];

/**
 * Get the distance for words.
 *
 * @param {Array.<string>} values
 * @return {number}
 */
function distance(values) {
    return levenshtein(values[0], values[1]);
}

/**
 * Help.
 *
 * @return {string}
 */
function help() {
    return [
        '',
        'Usage: ' + command + ' [options] word word',
        '',
        pack.description,
        '',
        'Options:',
        '',
        '  -h, --help           output usage information',
        '  -v, --version        output version number',
        '',
        'Usage:',
        '',
        '# output distance',
        '$ ' + command + ' sitting kitten',
        '# ' + distance(['sitting', 'kitten']),
        '',
        '# output distance from stdin',
        '$ echo "saturday,sunday" | ' + command,
        '# ' + distance(['saturday', 'sunday']),
        ''
    ].join('\n  ') + '\n';
}

/**
 * Get the edit distance for a list containing two word.
 *
 * @param {string?} value
 */
function getDistance(value) {
    var values;

    if (value) {
        values = value.split(',').join(' ').split(/\s+/);
    }

    if (values && values.length === 2) {
        console.log(distance(values));
    } else {
        process.stderr.write(help());
        process.exit(1);
    }
}

/*
 * Program.
 */

if (
    argv.indexOf('--help') !== -1 ||
    argv.indexOf('-h') !== -1
) {
    console.log(help());
} else if (
    argv.indexOf('--version') !== -1 ||
    argv.indexOf('-v') !== -1
) {
    console.log(pack.version);
} else if (argv.length) {
    getDistance(argv.join(' '));
} else if (!expextPipeIn) {
    getDistance();
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        getDistance(data.trim());
    });
}
