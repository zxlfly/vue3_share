<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-link to="/">首页</router-link> |
    <router-link to="/about">about</router-link> |
    <router-link to="hello">hello</router-link>
    <router-view></router-view>
    <h2>vuex</h2>
    <!-- 传统写法 -->
    <div>{{ $store.state.count }}</div>
    <button @click="$store.commit('add')">add</button>
    <!-- composition写法 -->
    <div>{{ count }}</div>
    <button @click="add">add</button>
    <hr />
    <ComTs></ComTs>
</template>

<script>
import ComTs from "./pages/ComTs.vue";
import { useStore } from "vuex";
import { toRefs } from "vue";
export default {
    name: "App",
    components: {
        ComTs
    },
    setup() {
        const store = useStore();
        return {
            // count:store.state.count,这样访问的代理对象里面的某个属性，初始化的时候可以取到值，但是不是响应式的
            ...toRefs(store.state),
            add() {
                store.commit("add");
            },
        };
    },
};
</script>
