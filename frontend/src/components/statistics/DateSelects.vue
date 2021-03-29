<template>
  <div class="select-div row">
    <div class="select-container">
      <label for="yearSelect">{{ $t('chooseYear') }}</label>
      <select class="form-control" id="yearSelect" v-model="currentYear" @change="fetchYearlyData">
        <option v-for="year in possibleYears" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <div class="select-container">
      <label for="weekSelect">{{ $t('chooseWeek') }}</label>
      <select class="form-control" id="weekSelect" v-model="currentWeek">
        <option v-for="week in possibleWeeksForYear" :key="week" :value="week">{{ week }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import useApi from "@/components/useApi";
import currentDates from "@/components/currentDates";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "DateSelects",
  setup() {
    const store = useStore();
    const { currentYear, currentWeek } = currentDates();
    const { fetchPossibleDates, fetchYearlyData } = useApi();

    return {
      currentYear,
      currentWeek,
      fetchPossibleDates,
      fetchYearlyData,
      possibleYears: computed(() => store.getters.getPossibleYears),
      possibleWeeksForYear: computed(() => store.getters.getPossibleWeeksForYear),
    }
  }
}
</script>

<style scoped>
select {
  margin: auto;
  width: 10%;
}

div.select-div {
  align-items: center;
  justify-content: center;
}

div.select-container {
  margin: 10px;
}

select {
  width: 150px;
}
</style>