var cache,
    codes;

cache = [];
codes = [];

function levenshtein(value, other) {
    var length,
        lengthOther,
        code,
        result,
        distance,
        distanceOther,
        index,
        indexOther;

    if (value === other) {
        return 0;
    }

    length = value.length;
    lengthOther = other.length;

    if (length === 0) {
        return lengthOther;
    }

    if (lengthOther === 0) {
        return length;
    }

    index = 0;

    while (index < length) {
        codes[index] = value.charCodeAt(index);
        cache[index] = ++index;
    }

    indexOther = 0;

    while (indexOther < lengthOther) {
        code = other.charCodeAt(indexOther);

        result = distance = indexOther++;

        index = -1;

        while (++index < length) {
            distanceOther = code === codes[index] ? distance : distance + 1;

            distance = cache[index];

            cache[index] = result = distance > result
                ? distanceOther > result
                    ? result + 1
                    : distanceOther
                : distanceOther > distance
                    ? distance + 1
                    : distanceOther;
        }
    }

    return result;
}

module.exports = levenshtein;
