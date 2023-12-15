<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	col: {
		type: Boolean,
		default: false,
	},
	labelWidth: {
		type: String,
		default: '',
	},
})
</script>

<template>
	<div>
		<div class="text-sm font-bold">{{ title }}</div>
		<div class="flex flex-wrap" :class="props.col ? 'flex-col' : 'gap-1rem'">
			<slot :label-width="labelWidth"></slot>
		</div>
	</div>
</template>

<style scoped lang="less"></style>
