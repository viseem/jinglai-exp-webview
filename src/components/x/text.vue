<script setup lang="ts">
defineProps({
	text: {
		type: String,
		default: '',
	},
	rows: {
		type: Number,
		default: 1,
	},
})
</script>

<template>
	<a-typography-text :ellipsis="{ rows }">{{ text }}</a-typography-text>
</template>

<style scoped></style>
