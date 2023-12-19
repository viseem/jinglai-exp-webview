<script setup lang="ts">
import { PropType } from 'vue'
import { IExper } from '~/api/biz/types/exptypes'

defineProps({
	item: {
		type: Object as PropType<IExper>,
		default: () => {},
	},
})

function cardClickHandler() {}
</script>

<template>
	<div wfull class="exp-card-container" p2 @click="cardClickHandler">
		<div wfull flex items-center justify-start>
			<div>
				<x-image circle :src="item.user?.avatar" />
			</div>
			<div flex-1>
				<x-title class="text-base fw700" :title="item.user?.nickname"></x-title>
				<x-text h-4 :text="item.mark" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.exp-card-container {
	box-shadow: 0 0 3px #ccc;
	border-radius: theme('borderRadius.sm');
}
</style>
