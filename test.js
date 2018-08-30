'use strict';

var PassThrough = require('stream').PassThrough;
var test = require('tape');
var execa = require('execa');
var version = require('./package').version;
var levenshtein = require('.');

test('api', function (t) {
  t.test('should work', function (st) {
    st.equal(levenshtein('', 'a'), 1);
    st.equal(levenshtein('a', ''), 1);
    st.equal(levenshtein('', ''), 0);
    st.equal(levenshtein('levenshtein', 'levenshtein'), 0);
    st.equal(levenshtein('sitting', 'kitten'), 3);
    st.equal(levenshtein('gumbo', 'gambol'), 2);
    st.equal(levenshtein('saturday', 'sunday'), 3);

    st.notEqual(
      levenshtein('DwAyNE', 'DUANE'),
      levenshtein('dwayne', 'DuAnE'),
      'should not match case insensitive'
    );

    st.equal(
      levenshtein('DwAyNE', 'DUANE', true),
      levenshtein('dwayne', 'DuAnE', true),
      'should match case if `insensitive` is given'
    );

    st.equal(
      levenshtein('aarrgh', 'aargh'),
      levenshtein('aargh', 'aarrgh'),
      'should not care about parameter order'
    );

    st.end();
  });

  t.test('Compatibility with `fast-levenshtein`', function (st) {
    st.equal(levenshtein('a', 'b'), 1);
    st.equal(levenshtein('ab', 'ac'), 1);
    st.equal(levenshtein('ac', 'bc'), 1);
    st.equal(levenshtein('abc', 'axc'), 1);
    st.equal(levenshtein('xabxcdxxefxgx', '1ab2cd34ef5g6'), 6);
    st.equal(levenshtein('xabxcdxxefxgx', 'abcdefg'), 6);
    st.equal(levenshtein('javawasneat', 'scalaisgreat'), 7);
    st.equal(levenshtein('example', 'samples'), 3);
    st.equal(levenshtein('sturgeon', 'urgently'), 6);
    st.equal(levenshtein('levenshtein', 'frankenstein'), 6);
    st.equal(levenshtein('distance', 'difference'), 5);
    st.equal(levenshtein('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文'), 2);
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
    );

    st.end();
  });

  t.end();
});

test('cli', function (t) {
  var input = new PassThrough();

  t.plan(12);

  execa.stdout('./cli.js', ['sitting', 'kitten']).then(function (result) {
    t.equal(result, '3', 'space seperated values');
  });

  execa.stdout('./cli.js', ['sitting']).then(null, function (err) {
    t.ok(/\s+Usage: levenshtein-edit-distance/.test(err.stderr), 'stdin (one value)');
  });

  execa.stdout('./cli.js', ['sitting, kitten']).then(function (result) {
    t.equal(result, '3', 'comma- and space seperated values');
  });

  execa.stdout('./cli.js', ['A', 'a']).then(function (result) {
    t.equal(result, '1', 'case-sensitive by default');
  });

  ['-i', '--insensitive'].forEach(function (flag) {
    execa.stdout('./cli.js', [flag, 'A', 'a']).then(function (result) {
      t.equal(result, '0', 'optionally case-insensitive with ' + flag);
    });
  });

  execa.stdout('./cli.js', {input: input}).then(function (result) {
    t.equal(result, '6', 'stdin');
  });

  input.write('sturgeon');

  setImmediate(function () {
    input.end(' urgently');

    input = new PassThrough();

    execa('./cli.js', {input: input}).then(null, function (err) {
      t.ok(/\s+Usage: levenshtein-edit-distance/.test(err.stderr), 'stdin (one value)');
    });

    input.end('sturgeon');
  });

  ['-h', '--help'].forEach(function (flag) {
    execa.stdout('./cli.js', [flag]).then(function (result) {
      t.ok(/\s+Usage: levenshtein-edit-distance/.test(result), flag);
    });
  });

  ['-v', '--version'].forEach(function (flag) {
    execa.stdout('./cli.js', [flag]).then(function (result) {
      t.equal(result, version, flag);
    });
  });
});
