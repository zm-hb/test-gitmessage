
<template>
    <h1>{{ msg }}</h1>
    <p @click="count++">count: {{ count }}</p>
    <p v-for="item in arrs">
        {{ item }}
    </p>
    <input type="number" v-model="numInt" name="digit" min="0" max="100" step="1" @input="handleInput" placeholder="请输入整数（天）"/>
    <!-- onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" placeholder="请输入整数（天）"/> -->
    <!-- <input type="tel" name="tel"> -->
</template>
<script setup lang="ts">
import { ref, reactive, readonly, watch, watchEffect, toRefs, toRef } from 'vue'

// defineProps({
//     msg: {
//         type: String,
//         default: '23',
//     },
//     arrs: {
//         type: Array,
//         default: () => [1,2,3]
//     }
// })
interface props {
    arrs?: Array<string>,
    msg?: string,
}
withDefaults(defineProps<props>(), {
    arrs: () => ['item0', 'item1'],
    msg: '测试代码'
})
const count = ref(0);
const stats = reactive({ a: 1, b: 2 });
const imStats = readonly(stats);
const statsRef = ref(stats)
statsRef.value.a = 3;
console.log(imStats);
// console.log(stats);
// console.log([...new Set('1,1,1,1,1,1'.split(','))]);
watch(
    () => stats.a,
    (newValue, oldValue) => {
        console.log('stats.a', newValue, oldValue);
    },
)
const numInt = ref<number>()
const handleInput = (e: any) => {
    // if (!/[\d]/.test(String.fromCharCode(e.keyCode))) return;
    console.log();
    numInt.value = e.target.value.replace(/[^0-9]/g, '')
    // 将输入转换为整数
    const value = parseInt(e.target.value, 10);
    if (!Number.isNaN(value)) {
        numInt.value = value;
    }
}

watchEffect(() => {
    console.log('stats:', stats, 'count:', count.value);
})
const obj = toRefs(stats)
console.log(obj);
const aa = toRef(stats.a)
console.log(aa.value);


</script>

<style scoped>
h1 {
    font-size: 30px;
}
input {
    width: 300px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>
