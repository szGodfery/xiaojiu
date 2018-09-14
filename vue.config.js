module.exports = {
    // 关闭掉整个eslint的代码检查功能  false
    lintOnSave: false,
    //设置页面baseurl路径
    baseUrl: './',
    //将 lint 错误输出为编译错误,到页面显示
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        }
    }
}