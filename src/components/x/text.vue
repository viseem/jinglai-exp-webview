<script setup lang="ts">
defineProps({
	text: {
		type: String,
		default: '',
	},
})
</script>

<template>
	<a-typography-text>{{ text }}</a-typography-text>
</template>

<style scoped></style>
