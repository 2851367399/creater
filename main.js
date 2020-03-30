import Vue from 'vue'
import App from './App'
import store from './store'
import {API} from './common/index.js'
Vue.config.productionTip = false

Vue.prototype.$api = API
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
		store,
    ...App
})
app.$mount()
