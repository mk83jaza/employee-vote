import { computed } from "vue";
import { useStore } from "vuex";

export default function () {
    const store = useStore();
    const currentYear = computed({
        get: () => store.state.currentYear,
        set: (year) => store.dispatch('yearChanged', year)
    });
    const currentWeek = computed({
        get: () => store.state.currentWeek,
        set: (week) => store.commit('setCurrentWeek', week)
    });
    return {
        currentYear,
        currentWeek
    }
}
