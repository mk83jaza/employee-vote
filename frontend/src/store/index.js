import { createStore } from 'vuex';
import { numberOfValuesInRange, roundedAverageOfArray } from '@/helper/helper'

export const state = {
    voteValue: null,
    alreadyVoted: false,
    possibleDates: null,
    yearlyData: null,
    currentYear: null,
    currentWeek: null,
}

export const getters = {
    getPossibleYears: (state) => {
        if (state.possibleDates != null) {
            return Object.keys(state.possibleDates);
        }
    },
    getPossibleWeeksForYear: (state) => {
        if (state.possibleDates != null && state.currentYear != null) {
            return state.possibleDates[state.currentYear];
        }
    },
    getAnnualAverageForYear: (state) => {
        let resultList = [];
        if (state.yearlyData != null && state.currentYear != null) {
            for (const key in state.yearlyData[state.currentYear]) {
                resultList.push(...state.yearlyData[state.currentYear][key]);
            }
            return roundedAverageOfArray(resultList);
        }
    },
    getNumberOfVotesInWeek: (state) => {
        if (state.yearlyData != null && state.currentYear != null && state.currentWeek != null) {
            return state.yearlyData[state.currentYear][state.currentWeek].length;
        }
    },
    getWeeklyAverage: (state) => {
        if (state.yearlyData != null && state.currentYear != null && state.currentWeek != null) {
            return roundedAverageOfArray(state.yearlyData[state.currentYear][state.currentWeek]);
        }
    },
    getWeeklyOneToThree: (state) => {
        if (state.yearlyData != null && state.currentYear != null && state.currentWeek != null) {
            return numberOfValuesInRange(state.yearlyData[state.currentYear][state.currentWeek], 1, 3);
        }
    },
    getWeeklyFourToSeven: (state) => {
        if (state.yearlyData != null && state.currentYear != null && state.currentWeek != null) {
            return numberOfValuesInRange(state.yearlyData[state.currentYear][state.currentWeek], 4, 7);
        }
    },
    getWeeklyEightToTen: (state) => {
        if (state.yearlyData != null && state.currentYear != null && state.currentWeek != null) {
            return numberOfValuesInRange(state.yearlyData[state.currentYear][state.currentWeek], 8, 10);
        }
    },
    getChartSeries: (state) => {
        let result = [];
        if (state.yearlyData != null && state.currentYear != null) {
            for (const key in state.yearlyData[state.currentYear]) {
                result.push(roundedAverageOfArray(state.yearlyData[state.currentYear][key]))
            }
        }
        return result;
    }
}

export const mutations = {
    setVoteValue(state, voteValue) {
        state.voteValue = voteValue;
    },
    setAlreadyVoted(state, alreadyVoted) {
        state.alreadyVoted = alreadyVoted;
    },
    setPossibleDates(state, possibleDates) {
        state.possibleDates = possibleDates;
    },
    setYearlyData(state, yearlyData) {
        state.yearlyData = yearlyData;
    },
    setCurrentYear(state, currentYear) {
        state.currentYear = currentYear;
    },
    setCurrentWeek(state, currentWeek) {
        state.currentWeek = currentWeek;
    }
}

export const actions = {
    submit(context, voteValue) {
        context.commit('setVoteValue', voteValue);
        context.commit('setAlreadyVoted', true);
    },
    yearChanged(context, year) {
        context.commit('setCurrentYear', year);
        context.commit('setCurrentWeek', null);
    }
}

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {}
})
