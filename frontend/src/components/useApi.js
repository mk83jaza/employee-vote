import { useStore } from "vuex";
import axios from "axios";
import currentDates from "./currentDates";

export default function () {
    const store = useStore();
    const { currentYear } = currentDates();
    const fetchPossibleDates = () => {
        axios.get('/possibleDates')
            .then((response) => {
                store.commit('setPossibleDates', response.data.possibleDates);
            })
            .catch(() => {
                console.log('error');
            })
    }
    const fetchYearlyData = () => {
        let params = {};
        if (currentYear.value != null) {
            params = { year: currentYear.value };
        }
        axios.get('/yearlyData', { params })
            .then((response) => {
                store.commit('setYearlyData', response.data.currentYear);
            })
            .catch(() => {
                console.log('error');
            })
    }
    return {
        fetchPossibleDates,
        fetchYearlyData
    }
}