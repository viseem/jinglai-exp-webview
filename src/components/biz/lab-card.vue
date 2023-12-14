<script setup lang="ts">
defineProps({
	title: {
		type: String,
	},
})
</script>

<template>
	<div flex items-center justify-center>
		<a-typography-text text-4xl> {{ title }} </a-typography-text>
	</div>
</template>

<style scoped></style>
