import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from './http'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dayjs from 'dayjs'
//引入v-charts
import VCharts from 'v-charts'
//引入JsonExcel
import JsonExcel from 'vue-json-excel'
//引入markdown
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'default-passive-events'
Vue.use(VCharts)
Vue.use(mavonEditor)
Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')