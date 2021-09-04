const isObject = v =>v!=null&&typeof v=== 'object'
// vue3中的响应式实现基于Proxy
// 如果处理的是数组，执行push等操作会多次触发
// 源码中针对集合类型的数据和普通的数据处理方式不一样，这里没有考虑集合类型的
function reactive(obj){
    // 如果不是对象直接返回
    if(!isObject(obj)){
        return obj
    }
    return new Proxy(obj,{
        get(target,key){
            console.log('get:',key)
            const res = Reflect.get(target,key)
            // 依赖收集
            track(target,key)
            // 递归处理嵌套问题
            return isObject(res)?reactive(res):res
        },
        set(target,key,val){
            console.log('set:',key)
            const res = Reflect.set(target,key,val)
            // 触发更新
            trigger(target,key)
            return res
        },
        deleteProperty(target,key){
            console.log('deleteProperty:',key)
            const res = Reflect.deleteProperty(target,key)
            // 触发更新
            trigger(target,key)
            return res
        },
    })
}
// 临时保存副作用函数
const effectStack=[]
// 副作用函数
function effect(fn){
    const e = createReactiveEffect(fn)
    e()
    return e
}
function createReactiveEffect(fn){
    const effect = function(...args){
        try{
            // 入栈
            effectStack.push(effect)
            // 执行，触发getter
            return fn(...args)
        }finally{
            // 出栈
            effectStack.pop()
        }
    }
    return effect
}
// 存放依赖关系的数据结构
const targetMap = new WeakMap()
// 依赖跟踪收集函数
function track(target,key){
    // 获取副作用函数
    const effect = effectStack[effectStack.length-1]
    if(effect){
        let depsMap = targetMap.get(target)
        // 首次不存在需要创建
        if(!depsMap){
            depsMap=new Map()
            targetMap.set(target,depsMap)
        }
        // 获取对应key的副作用函数
        let deps = depsMap.get(key)
        // 首次不存在需要创建
        if(!deps){
            deps = new Set()
            depsMap.set(key,deps)
        }
        // 将副作用函数添加进去
        deps.add(effect)
    }
}
// 触发对应的更新函数
function trigger(target,key){
    // 根据传入的target,key获取对应的副作用函数，调用他们
    const depsMap = targetMap.get(target)
    if(!depsMap){
        return
    }
    const deps = depsMap.get(key)
    if(deps){
        deps.forEach(dep => dep());
    }
}

const obj= reactive({
    foo:'foo',
    a:{
        b:1
    }
})
effect(()=>{
    console.log('foo变了',obj.foo);
})
effect(()=>{
    console.log('a变了',obj.a);
})
effect(()=>{
    console.log('b变了',obj.a.b);
})
obj.a.b=2