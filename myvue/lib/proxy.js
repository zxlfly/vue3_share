let obj = {
    name:'vue3'
}
let o = new Proxy(obj,{
    get(target,key){
        console.log(`获取${key}`);
        return Reflect.get(target,key)
    },
    set(target,key,val){
        console.log(`修改值${key}--${val}`);
        return Reflect.set(target,key,val)
    }
})
o.name=666
console.log(o.name);
// 如果处理的是数组，执行push等操作会多次触发
// 对象如果有嵌套，深层的无法代理
