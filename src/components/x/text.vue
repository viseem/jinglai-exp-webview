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
		copy-tooltip-props="1111"
		text-base
		class="!mb-0"
		:ellipsis="{ rows, showTooltip: true }"
	>
		<span v-if="text">{{ text }}</span>
		<span text-base><slot></slot></span>
	</a-typography-text>
</template>

<style scoped></style>
