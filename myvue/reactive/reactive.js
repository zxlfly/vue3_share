// 存储着每个响应式对象关联的依赖（depsMap）
const targetMap = new WeakMap()
// 存储着响应式对象每个属性的依赖，属性名作为key，值就是对应的dep，存储着对应的更新函数，是一个effects集，这些effect在值发生变化时重新运行。
const depsMap = new Map();
// 避免重复确认依赖搜集。activeEffect也会添加dep的依赖，它们是双向添加依赖关系,所以一个effect可以有多个dep，同样的dep作为订阅者也可以有多个effect。原因和vue2一样，方便做清理工作。
let activeEffect = null
function effect(fn) {
    activeEffect = fn
    fn()
    activeEffect = null
}
// 为了收集依赖,将更新函数存起来
// 存在activeEffect时才会执行
function track(target, key) {
    if (activeEffect) {
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        let dep = depsMap.get(key)
        if (!dep) {
            depsMap.set(key, (dep = new Set()))
        }
        dep.add(activeEffect)
        // 它们是双向添加依赖关系，方便做清理工作，这里只是简单实现，没有后续相关实现
        // activeEffect.options.onTrack({
        //     effect:activeEffect,
        //     target,
        //     type,
        //     key
        // })
    }
}
// 更新
function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) { return }
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => {
            effect()
        });
    }
}
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            track(target, key)
            return result
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            if (oldValue != result) {
                trigger(target, key)
            }
            return result
        },
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            if (res) {
                trigger(target, key)
            }
        }
    }
    return new Proxy(target, handler)
}
// 处理单值响应式
// 非单值情况还是走的reactive
function ref(raw) {
    const r = {
        get value() {
            track(r, 'value')
            return raw
        },
        set value(newVal) {
            raw = newVal
            trigger(r, 'value')
        }
    }
    return r
}

function computed(getter) {
    // 接受一个 getter 函数，返回一个只读的响应式 ref 对象。
    // 也可以可写入，需要传入一个包含get、set的对象
    let res = ref()
    effect(() => (res.value = getter()))
    return res
}