<script setup lang="ts">
import { goExpPage } from '~/utils/routerutils'
import { ILab } from '~/api/biz/types/exptypes'

defineProps({
	item: {
		type: Object as PropType<ILab>,
		required: true,
	},
})

function cardClickHandler() {
	goExpPage()
}
</script>

<template>
	<div
		flex
		cursor-pointer
		items-center
		justify-center
		style="border: 2px solid var(--color-border-2)"
		@click="cardClickHandler"
	>
		<div flex flex-col text-center>
			<x-title :title="item.name"></x-title>
			<x-text :text="item.mark"></x-text>
		</div>
	</div>
</template>

<style scoped></style>
