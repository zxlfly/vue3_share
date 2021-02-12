<template>
    <h1>emits示例</h1>
    <div @click="$emit('click')">
        自定义事件
    </div>
</template>

<script>
import { } from "vue";
export default {
    name: "EmitsApi",
    props: {},
    // 最好不要和原生对象重名
    emits:['click']
};
</script>
