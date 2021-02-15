<template>
    <div v-for="x in state" :key="x.id">{{ x.name }}</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
interface MyList {
    id: Number;
    name: String;
}
export default defineComponent({
    setup() {
        const state = ref<MyList[]>([]);
        onMounted(() => {
            state.value.push({ id: 1, name: "xiu" });
        });
        return { state };
    },
});
</script>

<style scoped>
</style>