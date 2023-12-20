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
			<div ml-2 flex-1>
				<x-title class="text-base fw700" :title="item.user?.nickname"></x-title>
				<x-text class="text-xs !lh-3.6" rows="3">
					<p>
						{{
							item.mark
						}}大所发生的发阿斯顿发送到发送阿斯顿发斯蒂芬阿打发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬
					</p>
				</x-text>
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
