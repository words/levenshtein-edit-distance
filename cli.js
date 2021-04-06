#!/usr/bin/env node
import fs from 'fs'
import {URL} from 'url'
import {levenshteinEditDistance} from './index.js'

var pack = JSON.parse(
  String(fs.readFileSync(new URL('./package.json', import.meta.url)))
)

var argv = process.argv.slice(2)
var insensitive = false
var pos = argv.indexOf('--insensitive')

if (pos !== -1) {
  argv.splice(pos, 1)
  insensitive = true
}

pos = argv.indexOf('-i')
if (pos !== -1) {
  argv.splice(pos, 1)
  insensitive = true
}

if (argv.includes('--help') || argv.includes('-h')) {
  console.log(help())
} else if (argv.includes('--version') || argv.includes('-v')) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function (data) {
    getDistance(data.trim())
  })
} else {
  getDistance(argv.join(' '))
}

function help() {
  return [
    '',
    '  Usage: ' + pack.name + ' [options] <word> <word>',
    '',
    '  ' + pack.description,
    '',
    '  Options:',
    '',
    '    -h, --help           output usage information',
    '    -v, --version        output version number',
    '    -i, --insensitive    ignore casing',
    '',
    '  Usage:',
    '',
    '  # output distance',
    '  $ ' + pack.name + ' sitting kitten',
    '  ' + distance(['sitting', 'kitten']),
    '',
    '  # output distance from stdin',
    '  $ echo "saturday,sunday" | ' + pack.name,
    '  ' + distance(['saturday', 'sunday'])
  ].join('\n')
}

function getDistance(value) {
  var values = value.split(',').join(' ').split(/\s+/)

  if (values.length === 2) {
    console.log(distance(values))
  } else {
    process.stderr.write(help())
    process.exit(1)
  }
}

function distance(values) {
  return levenshteinEditDistance(values[0], values[1], insensitive)
}
