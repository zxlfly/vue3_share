<template>
    <h1>ComppsitionApi示例</h1>
    <h1>counter:{{ counter }}</h1>
    <h2>doubleCounter:{{ doubleCounter }}</h2>
    <h3>{{ msg }}</h3>
    <p ref="desc">desc</p>
    <button @click="addCounter">add</button>
</template>

<script>
import { computed, reactive, onMounted, watch, ref, toRefs } from "vue";
export default {
    name: "ComppsitionApi",
    props: {},
    //   不同的业务逻辑代码可以单独的抽离出去（可以是函数，也可以是js文件），用起来有点像react的自定义hooks
    //  如果觉得想直接使用counter通用data.counter的方式可以使用toRefs方法处理data
    // 如果觉得这样要return的方式不喜欢，还可以是使用组合api语法糖，这个示例完成的时候这个方案还仅仅是实验阶段 
    // 如下：
    // 不知道什么原因这里如果把完成的script代码放在这注释掉不可以，会报错。初步判断是编译出错
    // 用法是在script上加setup="props, { emit }"
    // 就不需要写setup方法和return了
    
    //接受props和context两个参数
    setup() {
        //  创建响应式数据
        //  const data = reactive({
        //      counter:1,
        //     //  计算属性
        //      doubleCounter:computed(()=>data.counter*2)
        //  })
        //  function addCounter(){
        //      data.counter++
        //  }
        //  watch()
        //  onMounted(()=>{
        //      console.log('counter onMounted');
        //  })

        const { counter, doubleCounter, addCounter, desc } = useCounter();

        //  单值
        const msg = ref("单值响应式数据");
        onMounted(() => {
            console.log("msg onMounted");
        });
        return { counter, doubleCounter, addCounter, msg, desc };
    },
};
function useCounter() {
    const data = reactive({
        counter: 1,
        //  计算属性
        doubleCounter: computed(() => data.counter * 2),
    });
    function addCounter() {
        data.counter++;
    }
    onMounted(() => {
        console.log("counter onMounted");
    });
    const res = toRefs(data);

    //  ref 使用元素引用
    const desc = ref(null);
    // watch
    watch(
        () => data.counter,
        (newval, oldval) => {
            console.log("change");
            const p = desc.value;
            console.log(desc);
            p.textContent = `ref:${newval}`;
        }
    );
    return { ...res, addCounter, desc };
}
</script>
