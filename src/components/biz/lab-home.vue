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
function test() {
	console.log(123123)
}
</script>

<template>
	<div wfull flex flex-1 flex-col p-4>
		<div w-full flex flex-1 items-center justify-center>
			<div hfull wfull flex gap-4>
				<div class="wfull" flex flex-col>
					<div class="exp-card-wrapper">
						<biz-lab-info />
					</div>
					<x-title py-4 title="实验开展统计" />
					<div class="exp-card-wrapper">
						<echart-exp-pie />
					</div>
					<x-title py-4 title="设备列表" @click="test" />
					<div class="exp-card-wrapper" flex-1>
						<x-flex-y-overflow class="hfull">
							<biz-device-card v-for="item in 8" :key="item" mb-4 />
						</x-flex-y-overflow>
					</div>
				</div>
				<div
					v-for="(item, index) in expStatusList"
					:key="index"
					class="exp-card-wrapper hfull wfull"
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
				<div class="exp-card-wrapper hfull wfull" flex flex-col>
					<x-title text-base title="人员负载" />
					<x-flex-y-overflow p-5px class="-m-5px">
						<div v-for="experItem in experList" :key="experItem" mt4>
							<biz-exper-card :item="experItem" />
						</div>
					</x-flex-y-overflow>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.exp-card-wrapper {
	border-radius: theme('borderRadius.lg');
	padding: theme('spacing.xs') theme('spacing.DEFAULT');
	box-shadow: 0 0 3px #ccc;
}
</style>
