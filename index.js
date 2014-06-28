'use strict';

function levenshtein(value, alternative) {
    var row, rowIterator, columnIterator,
        character, previous, current, length, alternativeLength;

    value = String(value);
    alternative = String(alternative);

    if (value === alternative) {
        return 0;
    }

    length = value.length;
    alternativeLength = alternative.length;

    if (!length) {
        return alternativeLength;
    }

    if (!alternativeLength) {
        return length;
    }

    row = [];

    rowIterator = -1;

    while (++rowIterator <= alternativeLength) {
        row[rowIterator] = rowIterator;
    }

    rowIterator = -1;

    while (++rowIterator < length) {
        character = value.charAt(rowIterator);
        previous = rowIterator + 1;
        columnIterator = -1;

        while (++columnIterator < alternativeLength) {
            current = Math.min(
                row[columnIterator] + (
                    character === alternative.charAt(columnIterator) ? 0 : 1
                ),
                previous + 1,
                row[columnIterator + 1] + 1
            );

            row[columnIterator] = previous;
            previous = current;
        }

        row[alternativeLength] = previous;
    }

    return previous;
}

module.exports = levenshtein;
