const isObject = v =>v!=null&&typeof v=== 'object'
const baseHandle = {
    get(target,key){
        const res = Reflect.get(target,key)
        // 搜集依赖track
        // 建立响应式数据key和更新函数之间的对应关系
        track(target,key)
        // 递归处理
        if(isObject(res)){
            reactive(res)
        }
        return res
    },
    set(target,key,val){
        const info = {
            olderValue:target[key],
            newValue:val
        }
        const res = Reflect.set(target,key,val)
        // 触发更新trigger
        trigger(target,key,info)
        return res 
    },
    deleteProperty(target,key){
        const res = Reflect.deleteProperty(target,key)
        const info = {
            olderValue:target[key],
            newValue:''
        }
        if(res){
            trigger(target,key,info)
        }

    }
}
//  根据原始的数据查询相应处理后的数据
let toProxy=new WeakMap()
//  根据响应后的数据查询原始的相应数据
let toRaw=new WeakMap()
function reactive(target){
    if(!target){
        return null
    }
    let observe = toProxy.get(target)
    // 查询缓存
    // 先从toProxy中查找是否存在，如果有就返回
    if(observe){
        return observe
    }
    // 如果是响应处理过的直接通过toRaw返回
    if(toRaw.get(target)){
        return target
    }
    // 否则就new proxy处理
    observe = new Proxy(target,baseHandle)
    // 设置缓存
    toProxy.set(target,observe)
    toRaw.set(observe,target)
    // 返回
    return observe 
}
// 暂时存储cb
let effectStack=[]
let targetMap = new WeakMap()
// targetMap:
// {
//     target:{
//         name:[effect] (set),
//         ...
//     }
// }
// 建立target，key和cb的映射关系
function track(target,key){
    // 获取最后一个effect
    const effect = effectStack[effectStack.length-1]
    // 如果存在
    if(effect){
        // 即有一个变更需要查询它到底修改哪个依赖
        // 获取下修改的那个依赖
        let depsMap = targetMap.get(target)
        // 没有 初始化一个
        if(depsMap===undefined){
            // 新增
            depsMap = new Map()
            targetMap.set(target,depsMap)
        }
        // 是否有key相关操作
        let dep = depsMap.get(key)
        // 没有
        if(dep===undefined){
            // 新增
            dep = new Set()
            // 到这里一个空的targetMap值初始化完成
            depsMap.set(key,dep)
        }
        // 当前key有没有effect依赖
        if(!dep.has(effect)){
            // 添加依赖
            dep.add(effect) 
            effect.deps.push(dep)
        }
    }
}
// 临时储存fn，调用fn触发内部的响应式数据的getter
function effect(fn,options={}){
    let e = createReactiveEffect(fn,options)
    if(!options.lazy){
        e()
    }
    return e
}
function createReactiveEffect(fn,options){
    const effect = function effect(...args){
        return run(effect,fn,args)
    }
    effect.deps=[]
    effect.computed=options.computed
    effect.lazy=options.lazy
    return effect
}
function run(effect,fn,args){
    // 判断栈里面有没有
    if(effectStack.indexOf(effect)===-1){
        try{
            // 添加进去
            effectStack.push(effect)
            // 这个时候会访问响应式的对象
            return fn(...args)
        }finally{
            // 最后清空
            effectStack.pop()
        }
    }
}
// 获取target.key相关的cb集合并且执行它们
function trigger(target,key,info){
    // 触发更新
    // 获取依赖
    const depsMap = targetMap.get(target)
    if(depsMap===undefined){
        return
    }
    const effects = new Set()
    // computed相关
    const computedRunners = new Set()
    if(key){
        let deps = depsMap.get(key)
        deps.forEach(effect=>{
            // 存到对应的
            if(effect.computed){
                computedRunners.add(effect)
            }else{
                effects.add(effect)
            }
        })
    }
    // 执行
    const run = effect=>effect()
    effects.forEach(effect=>run(effect))
    computedRunners.forEach(effect=>run(effect))
}
// 一个特殊effect
function computed(fn){
    const getter = fn
    const runner = effect(getter,{computed:true,lazy:true})
    return{
        effect:runner,
        get value(){
            return runner()
        }
    }
}