<script setup lang="ts">
defineProps({
	title: {
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
		:ellipsis="{
			rows,
		}"
		fw500
		class="text-xl !mb-0 !text-#333"
	>
		<span>{{ title }}</span>
		<!--如果有slot-->
		<slot></slot>
		<span v-if="!$slots.default || !title">&nbsp;</span>
	</a-typography-text>
</template>

<style scoped></style>
