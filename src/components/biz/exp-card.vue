<script setup lang="ts">
import { PropType } from 'vue'
import { IExp } from '~/api/biz/types/exptypes'

defineProps({
	item: {
		type: Object as PropType<IExp>,
		default: () => {},
	},
})
</script>

<template>
	<div class="exp-card-container" p2>
		<x-title class="text-base fw700" :title="item.name"></x-title>
		<x-progress :total="item.sopTotal" :done="item.sopDone" />
		<div style="zoom: 0.8">
			<x-text class="pt-1">
				<p>
					<x-descriptions class="">
						<x-descriptions-item margin-bottom="" label="负责人">{{
							item?.operator?.nickname
						}}</x-descriptions-item>
						<x-descriptions-item margin-bottom="" label="客户">{{
							item?.project?.customer?.name
						}}</x-descriptions-item>
					</x-descriptions>
				</p>
			</x-text>
			<x-text pt1 :text="item?.project?.name" />
		</div>
	</div>
</template>

<style scoped>
.exp-card-container {
	box-shadow: 0 0 3px #ccc;
	border-radius: theme('borderRadius.sm');
}
</style>
