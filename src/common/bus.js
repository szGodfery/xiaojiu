//导入vue 
import Vue from 'vue'
//创建一个vue实例 用bus做为公共名,来处理一些兄弟组件  无法传值修改数据的问题
const bus = new Vue({})



//导出

export { bus }