<script setup lang="ts">
// ----静态数据
import { useRequest } from 'vue-request'
import { computed } from 'vue'

const expStatusList = [
	{ name: '待开展', status: '0' },
	{ name: '已暂停', status: 'PAUSE' },
	{ name: '进行中', status: 'DOING' },
	{ name: '数据审核', status: 'DATA_CHECK' },
	{ name: '已出库', status: 'COMPLETE' },
]

// 属性
const labStore = useLabStore()
const currentLab = computed(() => labStore.getCurrentLab)

const { data: expRes, run } = useRequest(getExpPage, {
	manual: true,
})
watch(
	() => currentLab.value,
	(v) => {
		if (v) {
			console.log('v---', v)
			run({ labId: currentLab.value.id })
		}
	},
	{
		deep: true,
	},
)
const filterExpListByStatus = (status) => {
	return expRes.value?.list?.filter((item) => item.stage == status)
}
</script>

<template>
	<div hfull wfull flex flex-col>
		<div w-full flex flex-1 items-center justify-center>
			<div hfull wfull flex gap-4>
				<div
					v-for="(item, index) in expStatusList"
					:key="index"
					mt-4
					hfull
					wfull
					rounded-2
					px-4
					py-2
					style="box-shadow: 0 0 3px #ccc"
				>
					<x-title text-base :title="item.name" />
					<div
						v-for="expItem in filterExpListByStatus(item.status)"
						:key="expItem"
					>
						<biz-exp-card mt4 :item="expItem"></biz-exp-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
