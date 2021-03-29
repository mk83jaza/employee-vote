const helper = require('../../src/helper/helper')

describe('helper.js', () => {
    it('average of common array', () => {
        const inputArray = [4, 5, 10, 4, 2, 6, 8, 1, 1, 5, 1];
        expect(helper.roundedAverageOfArray(inputArray)).toBe(4.27);
    })
});
