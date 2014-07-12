'use strict';

function levenshtein(value, alternative) {
    var previousRow, previousRowIterator, columnIterator,
        character, next, current, length, alternativeLength, temporary;

    /* Convert both values to string. */
    value = String(value);
    alternative = String(alternative);

    /* Basic cases. */
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

    /* Initialise the previous row, this just creates an array from 0..N */
    previousRow = [];
    previousRowIterator = -1;

    while (++previousRowIterator <= alternativeLength) {
        previousRow[previousRowIterator] = previousRowIterator;
    }

    previousRowIterator = -1;

    while (++previousRowIterator < length) {
        character = value.charAt(previousRowIterator);
        next = previousRowIterator + 1;
        columnIterator = -1;

        while (++columnIterator < alternativeLength) {
            current = next;

            next = previousRow[columnIterator];

            if (character !== alternative.charAt(columnIterator)) {
                next += 1;
            }

            temporary = current + 1;

            if (next > temporary) {
                next = temporary;
            }

            temporary = previousRow[columnIterator + 1] + 1;

            if (next > temporary) {
                next = temporary;
            }

            previousRow[columnIterator] = current;
        }

        previousRow[alternativeLength] = next;
    }

    return next;
}

module.exports = levenshtein;
