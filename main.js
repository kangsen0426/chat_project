import App from './App'

// #ifndef VUE3
import Vue from 'vue'



// 引入全局组件
import divider from './components/common/divider.vue';
Vue.component('divider', divider)
import noThing from './components/common/nothing.vue';
Vue.component('no-thing', noThing)
import $C from "./common/config.js"
Vue.prototype.$C = $C
// 挂在助手函数库
import $U from './common/utils.js';
Vue.prototype.$U = $U


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
