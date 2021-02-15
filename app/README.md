# vue-router安装
``npm install vue-router@4``

## vue-router基本使用步骤
main.js

## 动态路由[addRoute](https://next.router.vuejs.org/zh/api/#addroute)
main.js

## vue-router结合Composition API
- **onBeforeRouteLeave**
  - 添加一个导航守卫，在当前位置的组件将要离开时触发。类似于 beforeRouteLeave，但它可以在任何组件中使用。当组件被卸载时，导航守卫将被移除。
- **onBeforeRouteUpdate**
  - 添加一个导航守卫，在当前位置即将更新时触发。类似于 beforeRouteUpdate，但它可以在任何组件中使用。当组件被卸载时，导航守卫将被移除。
- **useLink**
  - 返回 v-slot API 暴露的所有内容。
- **useRoute**
  - 返回当前路由地址。相当于在模板中使用 $route。必须在 setup() 中调用。
- **useRouter**
  - 返回 router 实例。相当于在模板中使用 $router。必须在 setup() 中调用。

## vue-router变化
- 实例创建的方式
- history替代了mode
- base移至history对应的方法中，以参数的形式传递，string类型
- *通配符被移除了
  - 404页面的处理，得通过路径参数的形式传进来
  - ``/:suibianxie(.*)*``
- ``isReady()``替代``onReady``
  - 路由导航是异步的，返回promise
- scrollBehavior变化
  - x->left   y->top
- keep-alive和transition必须用在router-view内部  
  - ```
  <!-- 以前 -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <!-- 现在 -->
  <router-view v-slot='{Component}'>
    <keep-alive>
      <Component :is="Component" />
    </keep-alive>
  </router-view>
  ```
- router-link
  - append移除
  - tag/eventy移除
    - ```
  <!-- 以前 -->
  <router-link to='/xx' tag='span' event='clickToPage'></router-link>
  <!-- 现在 -->
  <router-link to='/xx' custom v-slot='{naviate}'>
    <span event='clickToPage'>
      xxx
    </span>
  </router-link>
  ```
  - exact
    - 匹配逻辑简化，用户输入路径和路由路径需要完全相同才匹配
    - 其他需求需要自己实现
- 目前mixins中的路由守卫将被忽略（后续可能会有变化，官方解决中）
- match移除，会用resolve代替 
- 所有的导航均为异步
  - 如果需要做首屏动画
  - 可以在isReady的成功回调里面执行mount
  - 如果首屏存在路由守卫，可以不需要等待直接挂载
- route的parent移除
  - ``const parent = this.$route.matched[this.$route.matched.length-2]``
- pathToRegexpOptions选项被移除
  - pathToRegexpOptions=>strict
  - caseSensitive =>sensitive
  - 可以在createRouter的时候配置值为Boolean
-  使用history.state
   -  ```
  <!-- 之前 -->
  history.pushState(myState,'',url)
  <!-- 现在 -->
  router.push(url)
  history.replaceState({...history.state,...myState},'')

  <!-- 之前 -->
  history.replaceState({},'',url)
  <!-- 现在 -->
  history.replaceState(history.state,'',url)
   ```
- routes选项必填
  - ``createRouter({routes:[]})``
- 跳转到不存在的路由会报错
- 缺少必填参数会抛出异常
- 命名子路由的时候如果path为空，不会自动追加/了
- $route属性编码行为
  - query、params、hash
    - path/fullpath不再解码
    - hash会被解码
    - params /会被解码
    - push、resolve、replace字符串或者对象参数path属性必须编码
    - query中的+不处理，可以使用stringifyQuery方法对query处理


# vuex安装
``npm install vuex@next --save``

## vuex基本使用
store  
main.js
*vuex的变化不大*

# vite
### typescript整合
vite可直接导入.ts 文件，在SFC中通过<script lang="ts">使用
### css module
style加上module，组件中以绑定class属性的形式使用``$styles.xxxx``  
js中导入将css文件命名为*.module.css即可，然后使用计算属性绑定即可
### CSS预处理器
默认支持，但是需要手动安装 
### PostCSS
vite自动对 *.vue 文件和导入的.css 文件应用PostCSS配置，我们只需要安装必要的插件和添加 postcss.config.js 文件即可。需要npm安装
```
module.exports = {
  plugins: [
    require('autoprefixer'),
  ]
}
```
### 引用静态资源
我们可以在*.vue 文件的template, style和纯.css文件中以相对和绝对路径方式引用静态资源。
### public目录
public 目录下可以存放未在源码中引用的资源，它们会被留下且文件名不会有哈希处理。  
这些文件会被原封不动拷贝到发布目录的根目录下。  
注意引用放置在 public 下的文件需要使用绝对路径，例如 public/icon.png 应该使用 /icon.png引用
### 代码规范：eslint
我们借助eslint规范项目代码，通过prettier做代码格式化。
```
{
  "scripts": {
    "lint": "eslint \"src/**/*.{js,vue}\""
  },
  "devDependencies": {
    "@vue/eslint-config-prettier": "^6.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.1.3",
    "eslint-plugin-vue": "^7.0.0-0",
    "prettier": "^1.19.1"
  }
}
```
配置lint规则，.eslintrc.js
```
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "warn",
      {
        // singleQuote: none,
        // semi: false,
        trailingComma: "es5",
      },
    ],
  },
};
```
如果有必要还可以配置prettier.config.js修改prettier的默认格式化规则
```
module.exports = {
  printWidth: 80, // 每行代码长度（默认80）
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  singleQuote: false, // 使用单引号（默认false）
  semi: true, // 声明结尾使用分号(默认true)
  trailingComma: 'es5', // 多行使用拖尾逗号（默认none）
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  arrowParens: "avoid", // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
};
```

### 测试环境
利用jest和@vue/test-utils测试组件  
安装依赖  
``jest @vue/test-utils vue-jest babel-jest babel-preset-env``
配置babel.config.js  
```
module.exports = {
  presets: [
    [
      "@babel/preset-env", { 
        targets: { 
          node: "current" 
        } 
      }
    ]
  ],
};
```
配置jest.config.js  
```
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/tests/**/*.spec.js", "**/__tests__/**/*.spec.js"],
  moduleNameMapper: {
    "^main(.*)$": "<rootDir>/src$1",
  },
};
```
启动脚本``"test": "jest"``
测试代码``tests/example.spec.js``
单vue文件测试可以查看[@vue/test-utils](https://vue-test-utils.vuejs.org/zh/guides/#%E8%B5%B7%E6%AD%A5)
lint配置添加jest环境，要不然会有错误提示：
```
module.exports = {
  env: {
    jest: true
  },
}
```
将lint、test和git挂钩  
``npm i lint-staged yorkie -D``
```
"gitHooks": {
  "pre-commit": "lint-staged",
  "pre-push": "npm run test"
},
"lint-staged": {
  "*.{js,vue}": "eslint"
},
```

### 项目配置
项目根目录创建vite.config.js，可以对vite项目进行深度配置。
- 定义别名
- 代理
- 数据mock
- 模式
  - 使用模式做多环境配置，vite serve时模式默认是development，vite build时是production。
- 环境变量
  - 创建配置文件.env.development
  - ``VITE_TOKEN=this is token``
  - ``import.meta.env.VITE_TOKEN``

### vite创建react项目
``npm init vite-app --template react``