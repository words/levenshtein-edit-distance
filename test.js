import {exec} from 'node:child_process'
import fs from 'node:fs'
import {URL} from 'node:url'
import {PassThrough} from 'node:stream'
import test from 'tape'
import {levenshteinEditDistance as levenshtein} from './index.js'

/** @type {Object.<string, unknown>} */
var pack = JSON.parse(
  String(fs.readFileSync(new URL('package.json', import.meta.url)))
)

test('api', function (t) {
  t.test('should work', function (st) {
    st.equal(levenshtein('', 'a'), 1)
    st.equal(levenshtein('a', ''), 1)
    st.equal(levenshtein('', ''), 0)
    st.equal(levenshtein('levenshtein', 'levenshtein'), 0)
    st.equal(levenshtein('sitting', 'kitten'), 3)
    st.equal(levenshtein('gumbo', 'gambol'), 2)
    st.equal(levenshtein('saturday', 'sunday'), 3)

    st.notEqual(
      levenshtein('DwAyNE', 'DUANE'),
      levenshtein('dwayne', 'DuAnE'),
      'should not match case insensitive'
    )

    st.equal(
      levenshtein('DwAyNE', 'DUANE', true),
      levenshtein('dwayne', 'DuAnE', true),
      'should match case if `insensitive` is given'
    )

    st.equal(
      levenshtein('aarrgh', 'aargh'),
      levenshtein('aargh', 'aarrgh'),
      'should not care about parameter order'
    )

    st.end()
  })

  t.test('Compatibility with `fast-levenshtein`', function (st) {
    st.equal(levenshtein('a', 'b'), 1)
    st.equal(levenshtein('ab', 'ac'), 1)
    st.equal(levenshtein('ac', 'bc'), 1)
    st.equal(levenshtein('abc', 'axc'), 1)
    st.equal(levenshtein('xabxcdxxefxgx', '1ab2cd34ef5g6'), 6)
    st.equal(levenshtein('xabxcdxxefxgx', 'abcdefg'), 6)
    st.equal(levenshtein('javawasneat', 'scalaisgreat'), 7)
    st.equal(levenshtein('example', 'samples'), 3)
    st.equal(levenshtein('sturgeon', 'urgently'), 6)
    st.equal(levenshtein('levenshtein', 'frankenstein'), 6)
    st.equal(levenshtein('distance', 'difference'), 5)
    st.equal(
      levenshtein(
        '因為我是中國人所以我會說中文',
        '因為我是英國人所以我會說英文'
      ),
      2
    )
    st.equal(
      levenshtein(
        'Morbi interdum ultricies neque varius condimentum. Donec ' +
          'volutpat turpis interdum metus ultricies vulputate. Duis ' +
          'ultricies rhoncus sapien, sit amet fermentum risus ' +
          'imperdiet vitae. Ut et lectus',
        'Duis erat dolor, cursus in tincidunt a, lobortis in odio. ' +
          'Cras magna sem, pharetra et iaculis quis, faucibus quis ' +
          'tellus. Suspendisse dapibus sapien in justo cursus'
      ),
      143
    )

    st.end()
  })

  t.end()
})

test('cli', function (t) {
  var input = new PassThrough()

  t.plan(13)

  exec('./cli.js sitting', function (error, stdout, stderr) {
    t.deepEqual(
      [
        Boolean(error),
        stdout,
        /\s+Usage: levenshtein-edit-distance/.test(stderr)
      ],
      [true, '', true],
      'not enough arguments'
    )
  })

  exec('./cli.js sitting kitten', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '3\n', ''], 'spaces')
  })

  exec('./cli.js sitting,kitten', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '3\n', ''], 'commas')
  })

  exec('./cli.js sitting, kitten', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '3\n', ''], 'commas & spaces')
  })

  exec('./cli.js a A', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '1\n', ''], 'case-sensitive')
  })

  exec('./cli.js a A -i', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '0\n', ''], '-i')
  })
  exec('./cli.js a A --insensitive', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '0\n', ''], '--insensitive')
  })

  var subprocess = exec('./cli.js', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, '6\n', ''], 'stdin')
  })

  input.pipe(subprocess.stdin)
  input.write('sturgeon')
  setImmediate(function () {
    input.end(' urgently')

    input = new PassThrough()
    subprocess = exec('./cli.js', function (error, stdout, stderr) {
      t.deepEqual(
        [
          Boolean(error),
          stdout,
          /\s+Usage: levenshtein-edit-distance/.test(stderr)
        ],
        [true, '', true],
        'stdin (not enough arguments)'
      )
    })

    input.pipe(subprocess.stdin)
    input.end('sturgeon')
  })

  exec('./cli.js -h', function (error, stdout, stderr) {
    t.deepEqual(
      [error, /\sUsage: levenshtein-edit-distance/.test(stdout), stderr],
      [null, true, ''],
      '-h'
    )
  })

  exec('./cli.js --help', function (error, stdout, stderr) {
    t.deepEqual(
      [error, /\sUsage: levenshtein-edit-distance/.test(stdout), stderr],
      [null, true, ''],
      '--help'
    )
  })

  exec('./cli.js -v', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, pack.version + '\n', ''], '-v')
  })

  exec('./cli.js --version', function (error, stdout, stderr) {
    t.deepEqual(
      [error, stdout, stderr],
      [null, pack.version + '\n', ''],
      '--version'
    )
  })
})
