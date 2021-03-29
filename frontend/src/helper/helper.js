function roundedAverageOfArray(array) {
    if (array != null && array.length !== 0) {
        return Math.round((array.reduce((accumulator, currentValue) => accumulator + currentValue) / array.length) * 100) / 100;
    }
}

function numberOfValuesInRange(array, min, max) {
    let result = 0;
    if (array != null) {
        array.forEach((vote) => {
            if (vote >= min && vote <= max) {
                result++;
            }
        });
    }
    return result;
}

export {
    roundedAverageOfArray,
    numberOfValuesInRange
}