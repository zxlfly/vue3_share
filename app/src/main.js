import App from "./App.vue"
import Home from "./pages/Home.vue"
import NotFound from "./pages/NotFound.vue"
import HelloWorld from "./components/HelloWorld.vue"
// 1. 定义路由组件.
// 也可以从其他文件导入
import { createApp, h } from "vue"
import { createRouter, createWebHashHistory } from "vue-router"
import store from "./store/index.js"
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Home },
  { path: '/hello', component: HelloWorld },
  //   404
  { path: '/:suibianxie(.*)*', name: "notFound", component: NotFound },
]
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 动态路由addRoute
router.addRoute({
  path: "/about",
  name: "about",
  component: () => import('./pages/About.vue')
})
// 添加子路由
router.addRoute('about', {
  path: '/about/info',
  name: 'info',
  component: {
    render() {
      return h('div', 'info page')
    }
  }
})
// 5. 创建并挂载根实例
const app = createApp(App)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
app.use(store)

app.mount('#app')
