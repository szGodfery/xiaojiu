import Vue from 'vue'
import App from './App.vue'
// 防止启动产生的错误信息
Vue.config.productionTip = false

// 导入路由组件
import router from './router/index.js'

//导入时间过滤组件
import './filters/dataFm.js'

//导入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//基于Vue的组件组成
Vue.use(ElementUI)

//导入iview组件样式
import 'iview/dist/styles/iview.css'


//导入vue-lazyload  图片懒加载组件
//注意:loading: require('common/image/default.png')

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: require('./statics/site/images/01.gif'),
})



//导入vuex仓库,放入到根实例中
import store from './store/index'





//根实例,根组件
new Vue({
        router, //路由注入 用于$route 获取参数  $router 编程式跳转
        store, //仓库注入
        render: h => h(App)
    }).$mount('#app') //相当于el:'#app'