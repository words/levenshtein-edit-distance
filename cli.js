#!/usr/bin/env node
'use strict';

/*
 * Dependencies.
 */

var levenshteinEditDistance,
    pack;

levenshteinEditDistance = require('./');
pack = require('./package.json');

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
 * Help.
 */
function help() {
    return [
        '',
        'Usage: ' + command + ' [options] words...',
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
        '# output distance between values',
        '$ ' + command + ' sitting kitten',
        '# 3',
        '',
        '# output distance between values from stdin',
        '$ echo "saturday,sunday" | ' + command,
        '# 3'
    ].join('\n  ') + '\n';
}

/**
 * Get the levenshtein distance of an array of strings.
 *
 * @param {Array.<string>} values
 */
function getDistance(values) {
    if (values.length === 2) {
        console.log(levenshteinEditDistance(values[0], values[1]));
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
} else if (argv[0]) {
    if (argv[0].indexOf(',') !== -1) {
        argv = argv[0].split(',');
    }

    getDistance(argv);
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        getDistance(data.trim().split(/ |,/g));
    });
}
