var o = (() => {
    var obj = {
        a: 1,
        b: 2
    };
    return {
        get: (key) => obj[key],
    }
})()

// 如何在不修改原代码的情况下，修改闭包中的obj对象？

// 方法一：
// 能不能通过原型 valueOf，获取这个对象？

console.log(o.get('valueOf')) // 输出：[Function: valueOf]

// let obj2 = o.get("valueOf")() // 输出：TypeError: Cannot convert undefined or null to object
// 原因：valueOf 函数的 this 指向发生了错误，这里 this 指向的是 o 而不是 obj

// 方法二：
// 利用 Object.defineProperty 给原型添加一个属性，来获取它的 this

Object.defineProperty(Object.prototype, 'test', {
    get() {
        return this;
    }
})

console.log(o.get('test')) // 输出：{ a: 1, b: 2 }

// 这样我们就可以随意修改闭包中的 obj 对象了
let obj = o.get('test');

obj.a = 100;
obj.c = "11111"

console.log(o.get('a')) // 输出：100

// 解决方法：
// 判断访问的属性是否来自对象本身

var o = (() => {
    var obj = {
        a: 1,
        b: 2,
    };
    return {
        get: (n) => {
            if (!obj.hasOwnProperty(n)) {
                return `${n}属性不存在`
            }
            return obj[n]
        }
    }
})()