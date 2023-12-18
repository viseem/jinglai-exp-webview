<script setup lang="ts">
import { PropType } from 'vue'
import ExpModal from '~/components/biz/exp-modal.vue'
import { IExp } from '~/api/biz/types/exptypes'

const props = defineProps({
	item: {
		type: Object as PropType<IExp>,
		default: () => {},
	},
})

const expModalRef = ref<any>(null)
function cardClickHandler() {
	expModalRef.value.open({ id: props.item.id })
}
</script>

<template>
	<div class="exp-card-container" p2 @click="cardClickHandler">
		<exp-modal ref="expModalRef" />
		<x-title class="text-base fw700" :title="item.name"></x-title>
		<x-progress :total="item.sopTotal" :done="item.sopDone" />
		<div style="zoom: 0.8">
			<x-text class="pt-1">
				<p>
					<x-descriptions>
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
			<x-text pt1>
				<p>
					{{ formatDate(item?.startDate) }} - {{ formatDate(item?.deadline) }}
				</p>
			</x-text>
			<x-text text-right opacity-80 :text="formatDate(item.createTime)" />
		</div>
	</div>
</template>

<style scoped>
.exp-card-container {
	box-shadow: 0 0 3px #ccc;
	border-radius: theme('borderRadius.sm');
}
</style>
