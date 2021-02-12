<template>
    <h1>{{ msg }}</h1>
    <ComppsitionApi ComppsitionApi></ComppsitionApi>
    <hr />
    <TeleportCom></TeleportCom>
    <hr />
    <Emits @click="onClick"></Emits>
    <hr />
    <ModelTest v-model:counter="counter"></ModelTest>
    <!-- 等效于 -->
    <ModelTest
        :counter="counter"
        @update:counter="counter = $event"
    ></ModelTest>
    <hr />
    <RenderApi v-model:counter="counter">
        <template v-slot:default>默认插槽</template>
        <template v-slot:counter="a">具名插槽{{a}}</template>
    </RenderApi>
    <hr>
  <functional level="2">这是一个函数式组件</functional>
  <hr>
  <AsyncPage></AsyncPage>
</template>

<script>
import ComppsitionApi from "./ComppsitionApi.vue";
import TeleportCom from "./TeleportCom.vue";
import ModelTest from "./ModelTest.vue";
import Emits from "./Emits.vue";
import functional from "./functional.vue";
import { defineAsyncComponent, h } from "vue";
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    components: {
        ComppsitionApi,
        TeleportCom,
        Emits,
        ModelTest,
        RenderApi: {
            props: {
                counter: {
                    type: Number,
                    default: 0,
                },
            },
            render() {
                const { counter, $emit } = this;
                const defslot = this.$slots.default();
                const counterslot = this.$slots.counter(counter);
                return h("div", [
                    h(
                        "div",
                        {
                            onClick: () => {
                                $emit("update:counter", counter + 1);
                            },
                        },
                        [`render:${counter}`, defslot, counterslot]
                    ),
                ]);
            },
        },
        functional,
        AsyncPage:defineAsyncComponent(()=>import("./NextPage.vue"))
    },
    data() {
        return {
            counter: 0,
        };
    },
    methods: {
        onClick() {
            console.log("click me");
        },
    },
};
</script>
