# init
实现简版vue初始化过程
# reactive
实现简版响应式
# min-vue
实现简版响应式
# 使用到的es6特性方法
## Proxy
Proxy 用于修改某些操作的默认行为，可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截
- get()
  - 用于拦截某个属性的读取操作
  - 可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
  - get() 方法可以继承。
- set()
  - 用来拦截某个属性的赋值操作
  - 可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
- apply()
  - 拦截函数的调用、call和apply操作。
  - 可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
- has() 
  - 用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
  - 可以接受两个参数，分别是目标对象、需查询的属性名。
- ...
## Reflect
ES6 中将 Object 的一些明显属于语言内部的方法移植到了 Reflect 对象上（当前某些方法会同时存在于 Object 和 Reflect 对象上），未来的新方法会只部署在 Reflect 对象上。  
它保证了当我们的对象有继承自其它对象的值或函数时，this指针能正确的指向使用(的对象）。  
Reflect 对象对某些方法的返回结果进行了修改，使其更合理。  
Reflect 对象使用函数的方式实现了 Object 的命令式操作。
- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)
**上面这些方法的作用，大部分与Object对象的同名方法的作用都是相同的**
## Map
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。  
为了解决这个问题，ES6 提供了 Map 数据结构。  
它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
- Map 的迭代
  - for...of
  - forEach()
  - keys()
  - values()
  - entries()
- Map 的属性方法
  - get()
  - set()
  - delect()
  - has()
  - clear()
  - size
## WeakMap
与Map结构类似，也是用于生成键值对的集合。  
**WeakMap与Map的区别有两点。**
- WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
- WeakMap的键名所指向的对象，不计入垃圾回收机制。
  - 它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
  - 因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
  - 也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
**WeakMap 与 Map 在 API 上的区别主要是两个**
- 没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。
  - 因为某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。
- 无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。
## Set
类似于数组，但是成员的值都是唯一的，没有重复的值。允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
- +0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复；
- undefined 与 undefined 是恒等的，所以不重复；
- NaN 与 NaN 是不恒等的，但是在 Set 中只能存一个，不重复。
**Set 结构的实例有以下属性。**
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。
**Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）**
- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。
- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
- Set.prototype.entries()：返回键值对的遍历器
- Set.prototype.forEach()：使用回调函数遍历每个成员
- for of
## WeakSet
结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
- 成员只能是对象，而不能是其他类型的值。
- 都是弱引用（和WeakMap一样）
**WeakSet 结构有以下三个方法。**
- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

# proxy响应式体验
proxy.js

# 实现响应式功能
源码出现了变化，基本原理不变``effectStack``去掉了，新增了activeEffect
- effect(fn)
  - 接受副作用函数
  - 会保存一份到activeEffect中备用
  - 执行一次触发里面的响应式数据的getter，触发依赖收集
- track
  - getter中调用，依赖搜集
  -     把存储更新函数的activeEffect和当前的target，key之间建立映射关系，未来如果目标发生变化，直接找到对应的副作用函数执行就可以完成更新
  - 结构：``{target:{key(Map类型):[fn1,...](Set类型)}}(WeakMap类型)``
- trigger
  - setter中调用
  - 把target，key对应的函数都执行一遍

**理解响应式原理首先要理解targetMap、depsMap、dep之间的关系。targetMap存储着每个响应式对象关联的依赖，存的就是depsMap；depsMap存储着响应式对象每个属性的依赖，属性名作为key，值就是对应的dep，是一个集合，存储着对应的更新函数（实际就是activeEffect）。属性key和对应的dep之间是双向添加依赖关系，方便做清理工作。**  
- **当初始化时，会触发get，从而设置activeEffect为当前渲染副作用effect。getter中调用track实现依赖搜集。**  
  - 初始化挂载时调用mountComponent，通过createComponentInstance创建组件实例
  - 通过setupComponent初始化组件实例（提供组件初始化需要的状态数据方法）,
    - 调用setupStatefulComponent，给组件设置代理PublicInstanceProxyHandlers，get、set就是这里处理
    - 如果设置了setup函数，则执行setup函数，并判断其返回值的类型。若返回值类型为函数时，则设置组件实例render的值为setupResult，否则作为组件实例setupState的值；
    - 这个时候组件实例instance的data、proxy、render、setupState已经绑定上了初始值。
    - 组件实例的render方法分三种
      - setup返回的函数
      - 组件存在render方法
      - 组件存在template模板，将其编译得来
  - 调用setupRenderEffect安装渲染副作用函数，首先调用effect接收组件更新函数为参数，完成依赖收集，接着将effect.run()以箭头函数的形式当做更新函数赋值给组件实例的update属性，并且自行一次，触发首次更新，完成初始化渲染。
- **当更新执行时，会触发set，执行即trigger，把target，key对应的更新函数都执行一遍。**
  - 设置组件实例setupComponent阶段会创建渲染上下文代理，而在调用渲染副作用函数过程中，会执行组件的render方法，同时会触发渲染上下文代理的PublicInstanceProxyHandlers的set，里面会调用trigger从而实现触发更新。因为render函数接受的第一个参数是_ctx即渲染组件的代理,此时调用set的时候就会触发之前设置代理时通过PublicInstanceProxyHandlers设置的set，从而实现更新。