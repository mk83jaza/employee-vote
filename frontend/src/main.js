import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import i18n from "./plugins/i18n";
import VueApexCharts from "vue3-apexcharts";

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

const app = createApp(App);
app.use(store)
app.use(router)
app.use(i18n)
app.use(VueApexCharts)
app.mount('#app');
