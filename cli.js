#!/usr/bin/env node
/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module levenshtein-edit-distance
 * @fileoverview CLI for `levenshtein-edit-distance`.
 */

'use strict';

/* Dependencies. */
var pack = require('./package.json');
var levenshtein = require('./');

/* Arguments. */
var argv = process.argv.slice(2);
var insensitive = false;

['--insensitive', '-i'].forEach(function (flag) {
  var pos = argv.indexOf(flag);
  if (pos !== -1) {
    argv.splice(pos, 1);
    insensitive = true;
  }
});

/* Program. */
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
} else {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (data) {
    getDistance(data.trim());
  });
}

/**
 * Help.
 *
 * @return {string}
 */
function help() {
  return [
    '',
    'Usage: ' + pack.name + ' [options] <word> <word>',
    '',
    pack.description,
    '',
    'Options:',
    '',
    '  -h, --help           output usage information',
    '  -v, --version        output version number',
    '  -i, --insensitive    ignore casing',
    '',
    'Usage:',
    '',
    '# output distance',
    '$ ' + pack.name + ' sitting kitten',
    '# ' + distance(['sitting', 'kitten']),
    '',
    '# output distance from stdin',
    '$ echo "saturday,sunday" | ' + pack.name,
    '# ' + distance(['saturday', 'sunday'])
  ].join('\n  ') + '\n';
}

/**
 * Get the edit distance for a list containing two word.
 *
 * @param {string?} value
 */
function getDistance(value) {
  var values = value.split(',').join(' ').split(/\s+/);

  if (values.length === 2) {
    console.log(distance(values));
  } else {
    process.stderr.write(help());
    process.exit(1);
  }
}

/**
 * Get the distance for words.
 *
 * @param {Array.<string>} values
 * @return {number}
 */
function distance(values) {
  return levenshtein(values[0], values[1], insensitive);
}
