import { getters } from '../../src/store/index'

describe('vuex getters with common state', () => {
    const state = {
        possibleDates: {
            2021: [9, 10, 11],
            2020: [1, 2, 3],
        },
        yearlyData: {
            2020: {
                1: [1, 10, 2, 9],
                2: [1, 2, 3, 4],
                3: [5, 6, 7, 8],
            }
        },
        currentYear: 2020,
        currentWeek: 1
    }

    it('getPossibleYears', () => {
        const result = getters.getPossibleYears(state);
        expect(result).toEqual(['2020', '2021']);
    });

    it('getPossibleWeeks', () => {
        const result = getters.getPossibleWeeksForYear(state);
        expect(result).toEqual([1, 2, 3]);
    });

    it('getAnnualAverageForYear', () => {
        const result = getters.getAnnualAverageForYear(state);
        expect(result).toBe(4.83);
    })

    it('getNumberOfVotesInWeek', () => {
        const result = getters.getNumberOfVotesInWeek(state);
        expect(result).toBe(4);
    })

    it('getWeeklyAverage', () => {
        const result = getters.getWeeklyAverage(state);
        expect(result).toBe(5.5);
    })

    it('getWeeklyOneToThree', () => {
        const result = getters.getWeeklyOneToThree(state);
        expect(result).toBe(2);
    })

    it('getWeeklyFourToSeven', () => {
        const result = getters.getWeeklyFourToSeven(state);
        expect(result).toBe(0);
    })

    it('getWeeklyEightToTen', () => {
        const result = getters.getWeeklyEightToTen(state);
        expect(result).toBe(2);
    })

    it('getChartSeries', () => {
        const result = getters.getChartSeries(state);
        expect(result).toEqual([5.5, 2.5, 6.5]);
    })
})
