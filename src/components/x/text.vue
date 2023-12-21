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
	<a-typography-text
		class="!mb-0"
		text-base
		:ellipsis="{ rows, showTooltip: true }"
	>
		<p v-if="text">{{ text }}</p>
		<slot></slot>
	</a-typography-text>
</template>

<style scoped></style>
