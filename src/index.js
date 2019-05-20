'use strict'

/* eslint-env browser */

var levenshtein = require('levenshtein-edit-distance')

var $inputs = document.querySelectorAll('input')
var $input = $inputs[0]
var $reference = $inputs[1]
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)
$reference.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = levenshtein($input.value, $reference.value)
}
