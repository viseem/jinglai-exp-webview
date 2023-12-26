<script setup lang="ts">
import { PropType } from 'vue'
import ExpModal from '~/components/biz/exp-modal.vue'
import { IExp } from '~/api/biz/types/exptypes'
import { useDrag } from 'vue3-dnd'
import { toRefs } from '@vueuse/core'

const props = defineProps({
	item: {
		type: Object as PropType<IExp>,
		default: () => {},
	},
	index: {
		type: Number,
		required: true,
	},
})
const emit = defineEmits(['drop'])
const [collect, dragSource] = useDrag({
	type: 'BOX',
	item: { index: props.index, item: props.item },
	end: (item, monitor) => {
		const dropResult = monitor.getDropResult()
		if (item && dropResult) {
			emit('drop', item, dropResult)
			// alert(`You dropped ${item.name} into ${dropResult.name}!`)
		}
	},
	collect: (monitor) => ({ isDragging: monitor.isDragging() }),
})

const { isDragging } = toRefs(collect)
const opacity = computed(() => (unref(isDragging) ? 0.4 : 1))

const expModalRef = ref<any>(null)
function cardClickHandler() {
	expModalRef.value.open({ id: props.item.id })
}
</script>

<template>
	<!---->
	<div
		:ref="dragSource"
		class="exp-card-container"
		relative
		h10rem
		flex
		flex-col
		justify-between
		px-8
		py-6
		:style="{ opacity }"
		@click="cardClickHandler"
	>
		<exp-modal ref="expModalRef" />
		<div absolute left-0 top-0 hfull flex items-center w="0.48rem">
			<div
				wfull
				h="60%"
				class="exp-card-bar"
				:style="{ background: item.color }"
				rounded-1
			></div>
		</div>
		<div flex items-center justify-between gap-2>
			<x-text mr-4 flex-1 :text="item.project?.name"></x-text>
			<x-descriptions-item margin-bottom="" label="客户">{{
				item?.project?.customer?.name
			}}</x-descriptions-item>
		</div>
		<div flex items-center justify-between>
			<x-text class="text-black !text-2xl" flex-1>{{ item.name }}</x-text>
			<div ml-4 text-2xl text="#187CEE">1/4</div>
		</div>
		<div>
			<div wfull flex items-center justify-between>
				<div>
					<x-descriptions-item margin-bottom="" w-8rem label="负责人"
						><span text-nowrap>{{
							item?.operator?.nickname
						}}</span></x-descriptions-item
					>
				</div>
				<div relative flex flex-1 ml="10%" items-center>
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
						pl-2
						text-white
					>
						<div wfull text-center text-sm>
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
	box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5);
}
</style>
