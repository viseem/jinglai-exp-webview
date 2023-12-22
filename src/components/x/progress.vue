<script setup lang="ts">
const props = defineProps({
	percent: {
		type: Number,
		default: 0,
	},
	total: {
		type: Number,
		default: 0,
	},
	done: {
		type: Number,
		default: 0,
	},
})
const computedPercent = computed(() => {
	const percent = (props.percent || props.done / props.total)?.toFixed(2)
	return isNaN(percent) ? 0 : percent
})

const computedPercentStr = computed(() => {
	return props.percent
		? computedPercent.value * 100 + '%'
		: `${props.done || 0} / ${props.total || 0}`
})
</script>

<template>
	<a-progress
		:color="{
			'0%': '#2D56F6',
			'50%': '#0E73F6',
			'100%': '#2D56F6',
		}"
		:stroke-width="24"
		:show-text="false"
		:percent="computedPercent"
	>
		<template #text>{{ computedPercentStr }}</template>
	</a-progress>
</template>

<style scoped></style>
