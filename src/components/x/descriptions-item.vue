<script setup lang="ts">
defineProps({
	label: {
		type: String,
		default: '',
	},
	labelWidth: {
		type: String,
		default: '',
	},
	marginBottom: {
		type: String,
		default: '0.5rem',
	},
	color: {
		type: String,
		default: '#333',
	},
})
</script>

<template>
	<div class="flex items-center" :style="{ marginBottom }">
		<div
			class="desc-item-label flex items-center text-base font-bold op-70"
			:style="{ color }"
			style="white-space: nowrap"
		>
			{{ label }}:
		</div>
		<div
			class="ml-1 text-base font-bold"
			:style="{ color }"
			hfull
			flex
			items-center
		>
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="less">
.desc-item-label {
	//text-align-last: justify;
	//text-align: justify;
	//text-justify: distribute-all-lines;
}
</style>
