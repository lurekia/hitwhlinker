import uviewPlus from '@/uni_modules/uview-plus'
import GoEasy from '@/uni_modules/GOEASY-IM/js_sdk/goeasy-2.8.3.esm.min.js'
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
const goEasy = GoEasy.getInstance({
    host: 'hangzhou.goeasy.io',	//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
    appkey: 'BC-860039e9ab3a48fa8c56e051c190cedc',	// common key,
    modules: ['im'],
    // true表示支持通知栏提醒，false则表示不需要通知栏提醒
    allowNotification: true //仅有效于app,小程序和H5将会被自动忽略
});
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  app.config.globalProperties.GoEasy = GoEasy;
  app.config.globalProperties.goEasy = goEasy;
  return {
    app
  }
}

// #endif

