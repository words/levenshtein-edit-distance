import assert from 'node:assert'
import util from 'node:util'
import cp from 'node:child_process'
import fs from 'node:fs'
import {URL} from 'node:url'
import {PassThrough} from 'node:stream'
import test from 'node:test'
import {levenshteinEditDistance as levenshtein} from './index.js'

const exec = util.promisify(cp.exec)

/** @type {Object.<string, unknown>} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('package.json', import.meta.url)))
)

test('api', async function (t) {
  await t.test('should work', function () {
    assert.equal(levenshtein('', 'a'), 1)
    assert.equal(levenshtein('a', ''), 1)
    assert.equal(levenshtein('', ''), 0)
    assert.equal(levenshtein('levenshtein', 'levenshtein'), 0)
    assert.equal(levenshtein('sitting', 'kitten'), 3)
    assert.equal(levenshtein('gumbo', 'gambol'), 2)
    assert.equal(levenshtein('saturday', 'sunday'), 3)

    assert.notEqual(
      levenshtein('DwAyNE', 'DUANE'),
      levenshtein('dwayne', 'DuAnE'),
      'should not match case insensitive'
    )

    assert.equal(
      levenshtein('DwAyNE', 'DUANE', true),
      levenshtein('dwayne', 'DuAnE', true),
      'should match case if `insensitive` is given'
    )

    assert.equal(
      levenshtein('aarrgh', 'aargh'),
      levenshtein('aargh', 'aarrgh'),
      'should not care about parameter order'
    )
  })

  await t.test('Compatibility with `fast-levenshtein`', function () {
    assert.equal(levenshtein('a', 'b'), 1)
    assert.equal(levenshtein('ab', 'ac'), 1)
    assert.equal(levenshtein('ac', 'bc'), 1)
    assert.equal(levenshtein('abc', 'axc'), 1)
    assert.equal(levenshtein('xabxcdxxefxgx', '1ab2cd34ef5g6'), 6)
    assert.equal(levenshtein('xabxcdxxefxgx', 'abcdefg'), 6)
    assert.equal(levenshtein('javawasneat', 'scalaisgreat'), 7)
    assert.equal(levenshtein('example', 'samples'), 3)
    assert.equal(levenshtein('sturgeon', 'urgently'), 6)
    assert.equal(levenshtein('levenshtein', 'frankenstein'), 6)
    assert.equal(levenshtein('distance', 'difference'), 5)
    assert.equal(
      levenshtein(
        '因為我是中國人所以我會說中文',
        '因為我是英國人所以我會說英文'
      ),
      2
    )
    assert.equal(
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
  })
})

test('cli', async function () {
  try {
    await exec('./cli.js sitting')
    assert.fail('should not pass')
  } catch (error) {
    assert.ok(
      /Usage: levenshtein-edit-distance/.test(String(error)),
      'not enough arguments'
    )
  }

  assert.deepEqual(
    await exec('./cli.js sitting kitten'),
    {stdout: '3\n', stderr: ''},
    'spaces'
  )

  assert.deepEqual(
    await exec('./cli.js sitting,kitten'),
    {stdout: '3\n', stderr: ''},
    'commas'
  )

  assert.deepEqual(
    await exec('./cli.js sitting, kitten'),
    {stdout: '3\n', stderr: ''},
    'commas and spaces'
  )

  assert.deepEqual(
    await exec('./cli.js a A'),
    {stdout: '1\n', stderr: ''},
    'case-sensitive: default'
  )

  assert.deepEqual(
    await exec('./cli.js a A -i'),
    {stdout: '0\n', stderr: ''},
    'case-sensitive: -i'
  )

  assert.deepEqual(
    await exec('./cli.js a A --insensitive'),
    {stdout: '0\n', stderr: ''},
    'case-sensitive: --insensitive'
  )

  await new Promise(function (resolve) {
    const input = new PassThrough()
    const subprocess = cp.exec('./cli.js', function (error, stdout, stderr) {
      assert.deepEqual([error, stdout, stderr], [null, '6\n', ''], 'stdin')
      setImmediate(resolve)
    })
    assert(subprocess.stdin, 'expected stdin on `subprocess`')
    input.pipe(subprocess.stdin)
    input.write('sturgeon')
    setImmediate(function () {
      input.end(' urgently')
    })
  })

  await new Promise(function (resolve) {
    const input = new PassThrough()
    const subprocess = cp.exec('./cli.js', function (error, stdout, stderr) {
      assert.deepEqual(
        [
          Boolean(error),
          stdout,
          /Usage: levenshtein-edit-distance/.test(stderr)
        ],
        [true, '', true],
        'stdin (not enough arguments)'
      )
      setImmediate(resolve)
    })

    assert(subprocess.stdin, 'expected stdin on `subprocess`')
    input.pipe(subprocess.stdin)
    input.end('sturgeon')
  })

  const h = await exec('./cli.js -h')
  assert.ok(/\sUsage: levenshtein-edit-distance/.test(h.stdout), '-h')

  const help = await exec('./cli.js --help')
  assert.ok(/\sUsage: levenshtein-edit-distance/.test(help.stdout), '-h')

  assert.deepEqual(
    await exec('./cli.js -v'),
    {stdout: pack.version + '\n', stderr: ''},
    '-v'
  )

  assert.deepEqual(
    await exec('./cli.js --version'),
    {stdout: pack.version + '\n', stderr: ''},
    '--version'
  )
})
