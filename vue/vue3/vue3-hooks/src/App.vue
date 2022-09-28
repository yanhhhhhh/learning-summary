<script setup lang="ts">
import useCounter from "@/hooks/useCounter";
import useMouse from "@/hooks/useMouse";

const { number, add } = useCounter();
const { x, y } = useMouse();
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
