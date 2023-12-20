<script setup lang="ts">
// ----静态数据
import { useRequest } from 'vue-request'
import { computed } from 'vue'
import { IExper } from '~/api/biz/types/exptypes'

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
const filterExpListByStatus = (status: string) => {
	if (expRes.value?.list) {
		return expRes.value?.list?.filter((item) => item.stage == status)
	}
}

const experList = ref([] as IExper[])
async function loadExperPage() {
	const res = await getLabExperPage({ labId: currentLab.value.id })
	experList.value = res?.list
}
loadExperPage()
</script>

<template>
	<div hfull wfull flex flex-col>
		<div mt-4 w-full flex flex-1 items-center justify-center>
			<div hfull wfull flex gap-4>
				<div class="exp-card-wrapper" flex flex-col>
					<biz-lab-info />
					<echart-exp-pie />
					<x-title title="设备列表" />
					<x-flex-y-overflow>
						<biz-device-card v-for="item in 8" :key="item" mt-4 />
					</x-flex-y-overflow>
				</div>
				<div
					v-for="(item, index) in expStatusList"
					:key="index"
					class="exp-card-wrapper"
					flex
					flex-col
				>
					<x-title text-base :title="item.name" />
					<x-flex-y-overflow p-5px class="-m-5px">
						<div
							v-for="expItem in filterExpListByStatus(item.status)"
							:key="expItem"
							mt4
							wfull
						>
							<biz-exp-card :item="expItem"></biz-exp-card>
						</div>
					</x-flex-y-overflow>
				</div>
				<div class="exp-card-wrapper">
					<x-title text-base title="人员负载" />
					<div v-for="experItem in experList" :key="experItem" mt4>
						<biz-exper-card :item="experItem" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.exp-card-wrapper {
	height: 100%;
	width: 100%;
	border-radius: theme('borderRadius.lg');
	padding: theme('spacing.xs') theme('spacing.DEFAULT');
	box-shadow: 0 0 3px #ccc;
}
</style>
