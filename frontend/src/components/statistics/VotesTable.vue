<template>
  <div class="container">
    <table class="table table-sm table-bordered table-striped">
      <tbody>
      <tr>
        <th scope="row">{{ $t('annualAverage') }}</th>
        <td>{{ annualAverage != null ? annualAverage : 'N/A' }}</td>
      </tr>
      <tr>
        <th scope="row">{{ $t('weeklyAverage') }}</th>
        <td>{{ weeklyAverage != null ? weeklyAverage : 'N/A' }}</td>
      </tr>
      <tr>
        <th scope="row">{{ $t('numberOfVotesThisWeek') }}</th>
        <td>{{ numberOfVotes != null ? numberOfVotes : 'N/A' }}</td>
      </tr>
      <tr>
        <th scope="row">{{ $t('votesFromTo', { from: 1, to: 3 }) }}</th>
        <td>{{ weeklyOneToThree != null ? weeklyOneToThree : 'N/A' }}</td>
      </tr>
      <tr>
        <th scope="row">{{ $t('votesFromTo', { from: 4, to: 7 }) }}</th>
        <td>{{ weeklyFourToSeven != null ? weeklyFourToSeven : 'N/A' }}</td>
      </tr>
      <tr>
        <th scope="row">{{ $t('votesFromTo', { from: 8, to: 10 }) }}</th>
        <td>{{ weeklyEightToTen != null ? weeklyEightToTen : 'N/A' }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <br>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "VotesTable",
  setup() {
    const store = useStore();
    return {
      annualAverage: computed(() => store.getters.getAnnualAverageForYear),
      numberOfVotes: computed(() => store.getters.getNumberOfVotesInWeek),
      weeklyAverage: computed(() => store.getters.getWeeklyAverage),
      weeklyOneToThree: computed(() => store.getters.getWeeklyOneToThree),
      weeklyFourToSeven: computed(() => store.getters.getWeeklyFourToSeven),
      weeklyEightToTen: computed(() => store.getters.getWeeklyEightToTen),
    }
  }
}
</script>

<style scoped>
.table {
  margin: auto;
  width: 50%;
}
</style>