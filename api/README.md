# [基于vue2的变动具体细节产看官方文档](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E6%A6%82%E8%A7%88)
### 新特性（一部分）
- Fragments
  - vue3中可以有多个根，不再是单根的形式
- ComppsitionApi.vue
  - ComppsitionApi示例
  - 便于逻辑复用和代码组织
- TeleportCom.vue
  - 传送门
  - 可以指定里面内容的父元素
- Emits.vue
  - 组件发送的自定义事件需要定义在emits选项中
    - 当在 ``emits`` 选项中定义了原生事件 (如 click) 时，将使用组件中的事件替代原生事件侦听器。
    - 建议定义所有发出的事件，以便更好地记录组件应该如何工作。
  - 验证抛出的事件
    - 可以做一些校验，如参数检验等
- CustomRender.vue
  - 自定义渲染器
    - 例如可以用来实现跨端开发，类似uniapp这种框架据需要针对不同的平台实现对应的渲染
    - 这个api就可以提供很好的入口，不需要去改源码


### 在 Vue 3 中，全局和内部 API 都经过了重构，并考虑到了 tree-shaking 的支持。因此，全局 API 现在只能作为 ES 模块构建的命名导出进行访问。

### model选项和v-bind的sync修饰符被移除，统一为v-model的参数形式
ModelTest.vue

### 渲染函数API修改
RenderApi.vue
- 不在传入h函数，需要手动导入。  
- 拍平props结构
- $scopedSlots property 已删除，所有插槽都通过 $slots 作为函数暴露
- $listeners 被移除或整合到 $attrs
- $attrs 现在包含 class and style attribute

### 函数式组件
funtional.vue
- 带来的性能提升可以忽略不计，一般开发不需要使用
- 只能通过纯函数的形式声明，接受props和context两个参数
- 以前的template添加functional特性声明移除
- 配置项functional：true也移除了

### 异步组件
[defineAsyncComponent](https://v3.cn.vuejs.org/api/global-api.html#definecomponent)创建一个只有在需要时才会加载的异步组件。

### 一些注意项
- data选项统一改为函数形式
- 如果我们想添加在 Vue 外部定义的自定义元素 (例如使用 Web 组件 API)，我们需要“指示”Vue 将其视为自定义元素。
  - 需要在编译器选项中设置``isCustomElement``
- is
  - <component> tag 上使用时，它的行为将与 2.x 中完全相同
  - 普通组件上使用时，它的行为将类似于普通 prop
  - 使用``v-is``来解决 DOM 内模板解析问题 代替以前直接使用``is``的方式
- 自定义指令
  - 指令api和组件保持一致
    - bind → beforeMount
    - inserted → mounted
    - beforeUpdate：新的！这是在元素本身更新之前调用的，很像组件生命周期钩子。
    - update → 移除！有太多的相似之处要更新，所以这是多余的，请改用 updated。
    - componentUpdated → updated
    - eforeUnmount：新的！与组件生命周期钩子类似，它将在卸载元素之前调用。
    -  unbind -> unmounted
 - transition
   - ``v-enter``->``v-enter-from``
   - ``v-leave``->``v-leave-from``
 - watch不再支持点字符串分隔符路径
   - 侦听一个单一源
     - 第一个参数为一个函数，以函数的形式返回对应的值
   - 侦听多个源
     - 侦听器还可以使用数组同时侦听多个源
     - ```watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
        /* ... */
        })```
 - watchEffect
   - 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
 - keycode作为v-on的修饰符被移除
   - 只能使用别名
 - ``$on、$off、$once``被移除
   - 可以使用第三方库实现
