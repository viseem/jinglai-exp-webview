<script setup lang="ts">
const props = defineProps({
	percent: {
		type: Number,
		default: 0,
	},
	total: {
		type: Number,
	},
	done: {
		type: Number,
	},
	startDate: {
		type: Number,
	},
	endDate: {
		type: Number,
	},
	strokeWidth: {
		type: Number,
		default: 20,
	},
})

const total = computed<number>(() => {
	if (props.total !== undefined) {
		return props.total
	}
	if (
		props.startDate &&
		props.startDate > 0 &&
		props.endDate &&
		props.endDate > 0
	) {
		return props.endDate - props.startDate
	}
	return 0
})
const done = computed<number>(() => {
	if (props.done !== undefined) {
		return props.done
	}
	if (
		props.startDate &&
		props.startDate > 0 &&
		props.endDate &&
		props.endDate > 0
	) {
		return Date.now() - props.startDate
	}
	return 0
})

const computedPercent = computed<number>(() => {
	const percent = parseFloat(
		(props.percent || done.value / total.value)?.toFixed(2),
	)
	return !isNaN(percent) ? percent : 0 // Parse the result to a float if not 0
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
		:stroke-width="strokeWidth"
		:show-text="false"
		:percent="computedPercent"
	>
		<template #text>{{ computedPercentStr }}</template>
	</a-progress>
</template>

<style scoped></style>
