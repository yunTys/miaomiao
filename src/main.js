import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.axios = axios

Vue.config.productionTip = false

// 定义多个全局过滤器
var dfilters = {
  actorToString: function (actorArr) {
    var newArr = actorArr.map(item => item.name)
    return newArr.join(' ')
  },
  dateFormat: function (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return year + '-' + month + '-' + day
  }
}

for(let key in dfilters){
  Vue.filter(key, dfilters[key])
}

// 注册全局组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
