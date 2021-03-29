<template>
  <div class="chart-wrapper">
    <apexchart height="400" width="800" :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default {
  name: "VotesChart",
  setup() {
    const store = useStore();
    const { t } = useI18n();

    const chartOptions = computed(() => {
      return {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: t('ratingPerWeek'),
          align: 'center'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: store.getters.getPossibleWeeksForYear,
        },
        yaxis: {
          min: 0,
          max: 10
        }
      }
    });

    const chartSeries = computed(() => {
      return [{
        name: t('weeklyAverage'),
        data: store.getters.getChartSeries
      }];
    });
    return {
      chartOptions,
      chartSeries,
    }
  }
}
</script>

<style scoped>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>