/* eslint-env browser */

import {levenshteinEditDistance} from 'levenshtein-edit-distance'

const $inputs = document.querySelectorAll('input')
const $input = $inputs[0]
const $reference = $inputs[1]
const $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)
$reference.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = levenshteinEditDistance($input.value, $reference.value)
}
