/** @type {Array.<number>} */
var codes = []
/** @type {Array.<number>} */
var cache = []

/**
 * @param {string} value
 * @param {string} other
 * @param {boolean} [insensitive]
 * @returns {number}
 */
export function levenshteinEditDistance(value, other, insensitive) {
  /** @type {number} */
  var code
  /** @type {number} */
  var result
  /** @type {number} */
  var distance
  /** @type {number} */
  var distanceOther
  /** @type {number} */
  var index
  /** @type {number} */
  var indexOther

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

  index = 0

  while (index < value.length) {
    codes[index] = value.charCodeAt(index)
    cache[index] = ++index
  }

  indexOther = 0

  while (indexOther < other.length) {
    code = other.charCodeAt(indexOther)
    result = distance = indexOther++
    index = -1

    while (++index < value.length) {
      distanceOther = code === codes[index] ? distance : distance + 1
      distance = cache[index]
      cache[index] = result =
        distance > result
          ? distanceOther > result
            ? result + 1
            : distanceOther
          : distanceOther > distance
          ? distance + 1
          : distanceOther
    }
  }

  return result
}
