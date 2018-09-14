// 此处时间过滤使用了moment
//引入包
import Vue from "vue"
import moment from 'moment'

Vue.filter('dataFm', (input, parames = 'YYYY-MM-DD HH:mm') => {
        return moment(input).format(parames)
    }

)