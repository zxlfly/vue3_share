<template>
    <h1>v-model示例</h1>
    <h2 @click="$emit('update:counter',counter+1)">counter:{{counter}}</h2>
</template>

<script>
import { } from "vue";
export default {
    name: "ModelTest",
    props: {
        // 默认是modelvalue 一般我们都会自定义字段名
        counter:{
            type:Number,
            default:0
        }
    },
    // 最好不要和原生对象重名
    emits:['click']
};
</script>
