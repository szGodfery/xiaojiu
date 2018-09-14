//这里是本地存储操作的方法文件

const key = 'goods' //localStorage中的可以设置为goods

//获取本地存储的方法
const getLocalGoods = () => {
    return JSON.parse(localStorage.getItem(key) || '{}')
}


//统计最新的购买数
const conutBuy = () => {
    const localGoodsInfo = getLocalGoods()
    let totalCount = 0
    for (let key in localGoodsInfo) {
        totalCount += localGoodsInfo[key]
    }
    return totalCount
}










/**
 * 添加本地存储的方法
 * @param {*} goods 产品信息 
 */
const addLocalGoods = (goods) => {
    // console.log(goods)
    //{goodsid: "90", goodsCount: 1}
    //1先获取出来本地loacalStorage
    const localGoodsInfo = getLocalGoods()
        // console.log(goods)
        //{goodsid: "88", goodsCount: 1}
        // console.log(localGoodsInfo)
        //{87: 6, 88: 1, 89: 5, 90: 1}
    if (localGoodsInfo[goods.goodsid]) {
        //如果对象中的这个key有值,那么值就+=
        localGoodsInfo[goods.goodsid] += goods.goodsCount
    } else {
        // 否则就是对象中没有这个key,那么就key=这个值
        localGoodsInfo[goods.goodsid] = goods.goodsCount
    }
    //2,把添加好的信息重新存储到本地localStorage
    localStorage.setItem(key, JSON.stringify(localGoodsInfo))

    //3,存储完毕之后,把最新的数量统计返回   用于赋值给$store.state.conutBuy
    return conutBuy()

}

//修改localStorage
const altLocalgoods = (goods) => {
    //goods==={goodsid: 89, goodsCount: 11}

    //1,获取本地存储
    const localGoodsInfo = getLocalGoods()

    //localGoodsInfo==={89: 10}
    //2,把获取到的值进行修改保持与 传递过来的值一致
    localGoodsInfo[goods.goodsid] = goods.goodsCount

    //3,重新存入到本地存储
    localStorage.setItem(key, JSON.stringify(localGoodsInfo))

    //4,存储完毕之后,把最新的数量统计返回
    return conutBuy()


}

//删除localStorage 
const delLocalgoods = (goods) => {
    //goods==={goodsid: 87}

    //1,获取本地存储
    const localGoodsInfo = getLocalGoods()

    //console.log(localGoodsInfo)

    //localGoodsInfo==={87: 6, 89: 22}


    //2, 在获取到的本地存储对象中 删除传递过来的属性goods.goodsid
    delete localGoodsInfo[goods.goodsid]

    //3,重新存到本地存储
    localStorage.setItem(key, JSON.stringify(localGoodsInfo))

    //4,存储完毕之后,把最新的数量统计返回
    return conutBuy()

}

















// 按需导出本地添加，可以导出多个成员，默认导出只能导出一个
export { addLocalGoods, conutBuy, getLocalGoods, altLocalgoods, delLocalgoods }