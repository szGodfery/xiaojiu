//Promise的使用
//主要解决,异步函数回调地狱问题

//1,创建promise实例,语法如下   函数内部有两个形参,,resolve是一个成功的回调函数,reject是一个失败的回调函数
/**
const promise = new Promise((resolve, reject) => {

    setTimeout(() => {
        //定义一个随机数
        const random = Math.random()
        console.log(random)
        if (random > 0.5) {
            resolve({ status: 0, message: "获取数据成功" })
        } else {
            reject('失败')
        }
    }, 2000)
})
 */

//2,使用promise 
/**
promise.then((success) => {
    console.log(success)
}, (err) => {
    console.log(err)
})
 */
//或者
/** 
promise.then(success => {
    console.log(success)
}).catch(err => {
    console.log(err)
})
*/





/** 
setTimeout(() => {
    console.log("---第一层----")
    setTimeout(() => {
        console.log("---第二层----")
        setTimeout(() => {
            console.log("---第三层----")
            setTimeout(() => {
                console.log("---第四层----")
            }, 2000);
        }, 1000);
    }, 3000);
}, 2000);
*/


//使用promise实现上面的四次打印
//思路:使用函数封装promise, 每次调用都产生一个新的promise实例,
//,每一个实例中都执行一个耗时操作,把创建好的promise实例返回出去

function dalay(timeout, str) {

    const promise = new Promise((resolve, reject) => {
        //setTimeout()耗时操作放到了promise中来执行
        setTimeout(() => {
            resolve(str)
        }, timeout)

    })
    return promise
}

// dalay(2000, '--第一次--').then(res1 => { //第一次调用函数,产生一个新的promise实例,并使用then方法调用获取到成功结果
//     console.log(res1)
//     return dalay(3000, '--第二次--') //返回再次调用,创建一个新的promise实例,再用then
// }).then(res2 => {
//     console.log(res2)
//     return dalay(1000, '--第三次--') //返回再次调用,创建一个新的promise实例,再用then
// }).then(res3 => {
//     console.log(res3)
//     return dalay(2000, '--第四次--') //返回再次调用,创建一个新的promise实例,再用then
// }).then(res4 => {
//     console.log(res4)
// })


//或者使用异步函数执行四次打印

async function execDalay() {
    const res1 = await dalay(3000, '--第1次----')
    console.log(res1)
    const res2 = await dalay(1000, '--第2次----')
    console.log(res2)
    const res3 = await dalay(2000, '--第3次----')
    console.log(res3)
    const res4 = await dalay(5000, '--第4次----')
    console.log(res4)

}
execDalay()