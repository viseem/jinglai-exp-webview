<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: '标题',
	},
})
</script>

<template>
	<a-typography-text text-2xl> {{ title }} </a-typography-text>
</template>

<style scoped></style>
