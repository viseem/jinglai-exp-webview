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
	<div
		class="exp-card-container"
		relative
		h8rem
		flex
		flex-col
		justify-between
		px-6
		py-3
		@click="cardClickHandler"
	>
		<exp-modal ref="expModalRef" />
		<div absolute left-0 top-0 hfull flex items-center w="2%">
			<div wfull h="60%" :style="{ background: item.color }" rounded-1></div>
		</div>
		<div flex items-center justify-between gap-2>
			<x-title class="text-base fw700" :title="item.project?.name"></x-title>
			<x-descriptions-item margin-bottom="" label="客户">{{
				item?.project?.customer?.name
			}}</x-descriptions-item>
		</div>
		<div flex items-center justify-between>
			<x-title flex-1>{{ item.name }}</x-title>
			<div ml-4 text-2xl>1/4</div>
		</div>
		<div style="zoom: 0.8">
			<div wfull flex items-center justify-between>
				<div>
					<x-descriptions-item margin-bottom="" label="负责人">{{
						item?.operator?.nickname
					}}</x-descriptions-item>
				</div>
				<div w="50%" relative min-w-13rem flex items-center>
					<x-progress :total="item.sopTotal" :done="item.sopDone" />
					<div
						absolute
						left-0
						top-0
						hfull
						wfull
						flex
						items-center
						justify-start
						pl-4
						text-white
					>
						<div>
							{{ formatDate(item?.startDate) }} -
							{{ formatDate(item?.deadline) }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.exp-card-container {
	border-radius: theme('borderRadius.lg');
	background: white;
}
.exp-card-bar {
}
</style>
