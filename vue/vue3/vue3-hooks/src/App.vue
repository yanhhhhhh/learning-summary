<script setup lang="ts">
import useCounter from "@/hooks/useCounter";
import useMouse from "@/hooks/useMouse";
import { getCurrentInstance } from "vue";

const { number, add } = useCounter();
const { x, y } = useMouse();
/**
 * 1.
 */
const instance = getCurrentInstance();
console.log("instance", instance);
const proxy = instance?.proxy;
console.log(proxy);
</script>

<template>
	x:{{ x }}
	<br />
	y:{{ y }}
	<br />

	{{ number }}
	<button @click="add">addNumber</button>
</template>
<style></style>
