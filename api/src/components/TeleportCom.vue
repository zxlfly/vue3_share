<template>
    <h1>Teleport示例</h1>
    <button @click="show=true">弹出一个model</button>
    <teleport to='body'>
        <div v-if="show" class="model">
            这是一个弹出框
            <button @click="show=false">关闭model</button>
        </div>
    </teleport>
</template>

<script>
import { computed, reactive, onMounted, watch, ref, toRefs } from "vue";
export default {
    name: "TeleportCom",
    props: {},
    data() {
        return {
            show: false
        }
    },
};
</script>

<style>
    .model{
        position: fixed;
        z-index: 999;
        background: #000;
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
    }
</style>