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
})
</script>

<template>
	<div class="flex items-center" :style="{ marginBottom }">
		<div
			class="desc-item-label flex items-center text-base text-[#666] font-bold"
			style="white-space: nowrap"
		>
			{{ label }}:
		</div>
		<div class="ml-1 text-base text-[#555]" hfull flex items-center>
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
