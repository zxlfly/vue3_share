<template>
    <div>
        <h1>{{ msg }}</h1>
        <button @click="count++">count is: {{ count }}</button>
        <p>
            Edit <code>components/HelloWorld.vue</code> to test hot module
            replacement.
        </p>
        <button @click="backHome">回到首页</button>
    </div>
</template>
<script>
import {ref} from "vue"
import {onBeforeRouteLeave, useRouter} from "vue-router"
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    setup() {
        const count = ref(0)
        // 获取路由实例
        const router = useRouter()
        const backHome = () => {
            router.push("/")
        }
        // 守卫
        onBeforeRouteLeave((to, form) => {
            console.log(to, form)
            let answer = window.confirm("你确定离开当前页面？")
            if (!answer) {
                return false
            }
        })
        return {count, backHome}
    },
}
</script>
