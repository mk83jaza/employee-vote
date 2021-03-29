<template>
  <div>
    <alert-message v-if="failureMessage" :alert-message="failureMessage" alert-type="error"></alert-message>
    <date-selects></date-selects>
    <votes-chart></votes-chart>
    <votes-table></votes-table>
    <button class="btn btn-success" @click="fetchPossibleDates(); fetchYearlyData();">{{ $t('refresh') }}</button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n';
import axios from "axios";
import VotesTable from "../components/statistics/VotesTable";
import VotesChart from "../components/statistics/VotesChart";
import DateSelects from "../components/statistics/DateSelects";
import AlertMessage from "../components/AlertMessage";

export default {
  name: "Statistics",
  components: {
    AlertMessage,
    VotesTable,
    VotesChart,
    DateSelects
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const failureMessage = ref(null);

    const currentWeek = computed({
      get: () => store.state.currentWeek,
      set: (week) => store.commit('setCurrentWeek', week)
    });
    const currentYear = computed({
      get: () => store.state.currentYear,
      set: (year) => store.dispatch('yearChanged', year)
    });

    const fetchPossibleDates = () => {
      axios.get('/possibleDates')
          .then((response) => {
            store.commit('setPossibleDates', response.data.possibleDates);
          })
          .catch(() => {
            failureMessage.value = t('apiFailureMessage');
            setTimeout(() => failureMessage.value = null, 5000);
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
            failureMessage.value = t('apiFailureMessage');
            setTimeout(() => failureMessage.value = null, 5000);
          })
    }

    onMounted(() => {
      fetchPossibleDates();
    });

    return {
      failureMessage,
      currentYear,
      currentWeek,
      fetchPossibleDates,
      fetchYearlyData,
    }
  }
}
</script>

<style scoped>

</style>