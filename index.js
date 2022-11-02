/** @type {Array.<number>} */
const codes = []
/** @type {Array.<number>} */
const cache = []

/**
 * @param {string} value
 * @param {string} other
 * @param {boolean} [insensitive]
 * @returns {number}
 */
export function levenshteinEditDistance(value, other, insensitive) {
  if (value === other) {
    return 0
  }

  if (value.length === 0) {
    return other.length
  }

  if (other.length === 0) {
    return value.length
  }

  if (insensitive) {
    value = value.toLowerCase()
    other = other.toLowerCase()
  }

  let index = 0

  while (index < value.length) {
    codes[index] = value.codePointAt(index)
    cache[index] = ++index
  }

  let indexOther = 0
  /** @type {number} */
  let result

  while (indexOther < other.length) {
    const code = other.codePointAt(indexOther)
    let index = -1
    let distance = indexOther++
    result = distance

    while (++index < value.length) {
      const distanceOther = code === codes[index] ? distance : distance + 1
      distance = cache[index]
      result =
        distance > result
          ? distanceOther > result
            ? result + 1
            : distanceOther
          : distanceOther > distance
          ? distance + 1
          : distanceOther
      cache[index] = result
    }
  }

  return result
}
