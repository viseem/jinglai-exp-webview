<script setup lang="ts">
import { inject, ref } from 'vue'
import { removeHTMLTags } from '../../utils/base/stringutils'

let data = ref({})
const message = toast
const projectStore = useExpStore()
const getNode = inject('getNode') as any
const node = getNode()
data.value = node.getData()
const sopStatusIsDone = computed(() => data.value?.status === SOP_STATUS.已做)
const sopStatusIsUnDone = computed(
	() => data.value?.status === SOP_STATUS.未做 || data.value?.status === null,
)

const taskItemConfig = projectStore.taskItemConfig

const taskWidth = computed(() => {
	if (data.value?.level == 3) {
		return taskItemConfig.sopWidth
	}
	return taskItemConfig.width
})
const taskHeight = computed(() => {
	if (data.value?.level == 3) {
		return taskItemConfig.sopHeight
	}
	return taskItemConfig.height
})
const isCategoryLevel = computed(() => {
	return data.value?.level == 2
})
const isCategorySopLevel = computed(() => {
	return data.value?.level == 3
})
const showOperationIcon = ref(false)
const handleDeleteClick = async () => {
	if (isCategoryLevel.value) {
		await message.confirm('确认删除吗？')
		// await deleteProjectCategory(data.value?.oid || -1)
		message.success('删除成功')
		// projectStore.setRefreshGraph()
		return
	}
	if (isCategorySopLevel.value) {
		await message.confirm('确认删除吗？')
		// await deleteProjectSop(data.value?.oid || -1)
		message.success('删除成功')
		// projectStore.setRefreshGraph()
	}
}
const handleItemMouse = () => {
	showOperationIcon.value = !showOperationIcon.value
}
const categoryLoading = ref(false)
const categoryVisible = ref(false)

const sopLoading = ref(false)
const sopVisible = ref(false)
const handleEditClick = async () => {
	if (isCategoryLevel.value && data.value?.oid > 0) {
		categoryVisible.value = true
		categoryLoading.value = true

		/*		const res = await getProjectCategory(data.value.oid).finally(() => {
			categoryLoading.value = false
		})*/
		// categoryForm.value = res
		categoryVisible.value = true
		return
	}
	if (isCategorySopLevel.value && data.value?.oid > 0) {
		sopVisible.value = true
		sopLoading.value = true
		/*		const res = await getProjectSop(data.value.oid).finally(() => {
			sopLoading.value = false
		})*/
		// sopForm.value = res
		sopVisible.value = true
		return
	}
}

const computeTaskContainerClass = computed(() => {
	if (isCategoryLevel.value) {
		return 'category-container-class'
	}
})
const computeCategorySopProgress = computed(() => {
	if (isCategoryLevel.value) {
		if (!(data.value?.sopList?.length > 0)) {
			return
		}
		const sopList = data.value?.sopList
		const doneSopCount =
			sopList?.filter((item) => item.status === SOP_STATUS.DONE).length || 0
		const progress = doneSopCount
			? Math.floor((doneSopCount / sopList.length) * 100)
			: 0
		return {
			percentage: Number.isNaN(progress) ? 0 : progress,
			countStr: `${doneSopCount} / ${sopList.length}`,
		}
	}
})
function test() {
	console.log('test---')
}
defineExpose({ test })
</script>

<template>
	<!--:style="{ width: taskItemConfig.width + 'px', height: taskItemConfig.height + 'px' }"-->
	<!--  todo 自定义指令 文本溢出-->
	<div
		border="1px solid red"
		class="cursor-pointer container"
		style="box-sizing: border-box"
		absolute
		z-1000
		:class="computeTaskContainerClass"
		:style="`width: ${taskWidth}px; height: ${taskHeight}px;`"
		@mouseenter="handleItemMouse"
		@mouseleave="handleItemMouse"
	>
		<div
			v-show="showOperationIcon && isCategorySopLevel"
			class="item-operation-icon"
		>
			<x-image icon="ep:delete" @mousedown.stop="handleDeleteClick" />
			<x-image icon="ep:edit" @mousedown.stop="handleEditClick" />
		</div>

		<div
			v-if="sopStatusIsDone"
			class="task-sop-status"
			style="color: green; border-color: green"
		>
			<x-image icon="ep:check" />
		</div>
		<div v-if="sopStatusIsUnDone" class="task-sop-status"></div>

		<a-tooltip>
			<template #content>
				<div v-if="isCategoryLevel" v-html="data?.content"></div>
				<div v-else><span v-html="data?.name"></span></div>
			</template>
			<div
				v-if="isCategoryLevel"
				class="items-left h-full w-full flex flex-col justify-center border pl-[20%] pr-[12%]"
			>
				<div class="relative w-full flex items-center">
					<div class="task-stage-tag"></div>
					<p class="category-name-class text-ellipsis-1 w-[90%]">
						{{ removeHTMLTags(data?.name) }}
					</p>
				</div>
				<p
					style="font-size: 12px; line-height: 1; color: #666; text-align: left"
				>
					{{ data?.operator?.nickname }}
				</p>
				<div class="w-full flex justify-center">
					<a-progress
						:color="[
							{ color: '#f56c6c', percentage: 20 },
							{ color: '#d7ae72', percentage: 40 },
							{ color: '#1989fa', percentage: 60 },
							{ color: '#6ccc6c', percentage: 100 },
						]"
						style="width: 100%"
						stroke-width="6"
						:percentage="computeCategorySopProgress?.percentage"
					>
						<template #default>
							<div class="items-center text-[12px] !p-0">
								{{ computeCategorySopProgress?.countStr }}
							</div>
						</template>
					</a-progress>
				</div>
			</div>
			<div v-else class="text-ellipsis-1 w-[80%] text-center">
				{{ removeHTMLTags(data?.name) }}
			</div>
		</a-tooltip>
	</div>
</template>

<style scoped>
.container {
	position: relative;
	z-index: 1;
	display: flex;
	overflow: hidden;
	font-weight: 400;
	background: #eff4ff;
	border: 2px solid #5f95ff;
	border-radius: 5px;
	align-items: center;
	justify-content: center;
}

.task-stage-tag {
	position: absolute;
	top: 5px;
	left: -16px;
	width: 13px;
	height: 13px;
	font-size: 14px;
	font-weight: 300;
	color: white;
	border-radius: 50%;
}

.task-sop-status {
	@extend .text-xs;

	position: absolute;
	top: 0.2rem;
	left: 0.2rem;
	display: flex;
	width: 18px;
	height: 18px;
	border: 2px solid #666;
	border-radius: 50%;
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
}

.item-operation-icon {
	position: absolute;
	top: 0.2rem;
	right: 0.2rem;
	line-height: 1;
}

.category-name-class {
	font-size: 13px;
	font-weight: 900;
}

.category-container-class {
	//border: 2px solid #666;
}
</style>
