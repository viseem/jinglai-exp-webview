<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: '标题',
	},
	rows: {
		type: Number,
		default: 1,
	},
})
</script>

<template>
	<a-typography-text
		:ellipsis="{
			rows,
		}"
		text-lg
		fw500
		class="!mb-0 !text-#333"
	>
		{{ title }}
	</a-typography-text>
</template>

<style scoped></style>
