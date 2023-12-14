<script setup lang="ts">
import { ILab } from '~/api/biz/types/exptypes'

defineProps({
	item: {
		type: Object as PropType<ILab>,
		required: true,
	},
})
</script>

<template>
	<!--	<div
		flex
		cursor-pointer
		items-center
		justify-center
		style="border: 2px solid var(&#45;&#45;color-border-2)"
		@click="cardClickHandler"
	>
		<div flex flex-col text-center>
			<x-title :title="item.name"></x-title>
			<x-text :text="item.mark"></x-text>
		</div>
	</div>-->
	<a-card hoverable :title="item.name" cursor-pointer>
		<div hfull flex flex-1 flex-col items-center text-center>
			<x-text :rows="3" :text="item.mark"></x-text>
		</div>
	</a-card>
</template>

<style scoped></style>
