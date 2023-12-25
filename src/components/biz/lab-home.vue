<script setup lang="ts">
// ----静态数据
import { computed } from 'vue'
import { IExp, IExper } from '~/api/biz/types/exptypes'
import { IDevice } from '~/api/biz/types/devicetypes'
import { getDevicePage } from '~/api/biz/deviceapi'
import { IExpCountStats } from '~/api/biz/types/statstypes'

interface IStatusItem {
	name: string
	status: string[]
	colors: string[]
	icon: string
}

const expStatusList: IStatusItem[] = [
	{
		name: '待开展',
		status: ['0'],
		colors: ['#878C9F'],
		icon: 'images/expstatus/not-do.png',
	},
	{
		name: '进行中',
		status: ['DOING', 'PAUSE', 'DATA_CHECK'],
		colors: ['#2E55F6', '#E2611F', '#E88B00'],
		icon: 'images/expstatus/doing.png',
	},
	{
		name: '已出库',
		status: ['COMPLETE'],
		colors: ['#20CB42'],
		icon: 'images/expstatus/outed.png',
	},
]

// 属性
const labStore = useLabStore()
const currentLab = computed(() => labStore.getCurrentLab)

const expParams = ref({
	labId: null as null | number,
	operatorId: null as null | number,
})
const expRes = ref([] as IExp[])
async function loadExpPage() {
	expRes.value = []
	expParams.value.labId = currentLab.value.id
	const res = await getExpPage(expParams.value)
	expRes.value = res?.list
}

watch(
	() => currentLab.value,
	(v) => {
		console.log('currentLab.value changed--', v)
		if (v?.id) {
			loadExpPage()
			loadExperPage()
			loadDevicePage()
			loadExpStats()
		}
	},
	{
		deep: true,
		immediate: true,
	},
)

const filterExpListByStatus = (statusItem: IStatusItem) => {
	const resultList: IExp[] = []
	if (expRes.value) {
		expRes.value.forEach((item) => {
			const statusIndex = statusItem.status.indexOf(item?.stage?.toString())
			if (statusIndex > -1) {
				item.color = statusItem.colors[statusIndex]
				resultList.push(item)
			}
		})
	}
	return resultList
}

/*
 * userstore
 * */

const userStore = useUserStore()
const computedUserinfo = computed(() => userStore.userinfo)
const computedLoginUserIndex = computed(
	() =>
		experList.value?.findIndex(
			(item) => item.userId == computedUserinfo.value.id,
		),
)
/*
 * 加载 实验室人员列表
 * */
const experList = ref([] as IExper[])
const currentExperIndex = ref(-1)
async function loadExperPage() {
	const res = await getLabExperPage({ labId: currentLab.value.id })
	experList.value = res?.list
}

/*
 * 加载 实验室设备列表
 * */
const deviceList = ref([] as IDevice[])
async function loadDevicePage() {
	const res = await getDevicePage({ labId: currentLab.value.id })
	deviceList.value = res?.list
}

/*
 * 加载 实验室任务数量统计
 * */
const expCountStats = ref({} as IExpCountStats)
const expCountLoading = ref(true)
async function loadExpStats() {
	expCountLoading.value = true
	const res = await getLabExpCountStats({ labId: currentLab.value.id }).finally(
		() => {
			expCountLoading.value = false
		},
	)
	expCountStats.value = res
}

/*
 *
 * 实验人员点击事件
 * */
function experClickHandler(experIndex: number, experItem: IExper) {
	currentExperIndex.value =
		experIndex == currentExperIndex.value ? -1 : experIndex
	lookSelf.value = currentExperIndex.value == computedLoginUserIndex.value
	const operatorId = currentExperIndex.value == -1 ? null : experItem.userId
	expParams.value.operatorId = operatorId
	loadExpPage()
}

/*
 * 只看自己
 * */
const lookSelf = ref(false)
function lookSelfClickHandler(e: boolean) {
	currentExperIndex.value = e ? computedLoginUserIndex.value : -1
	expParams.value.operatorId = e ? computedUserinfo.value.id : null
	loadExpPage()
}
</script>

<template>
	<div wfull flex flex-1 flex-col p-4 bg="#EBEDF1">
		<div w-full flex flex-1 items-center justify-center>
			<div hfull wfull flex gap-6>
				<!--左侧实验室信息-->
				<div class="wfull" flex flex-col>
					<div class="exp-card-wrapper">
						<biz-lab-info />
					</div>
					<x-title py-4>实验开展统计</x-title>
					<div class="exp-card-wrapper">
						<echart-exp-pie :stats="expCountStats" />
					</div>
					<x-title py-4>设备列表</x-title>
					<div class="exp-card-wrapper !p-6" flex-1>
						<x-flex-y-overflow class="hfull">
							<biz-device-card
								v-for="item in deviceList"
								:key="item"
								:item="item"
								mb6
							/>
						</x-flex-y-overflow>
					</div>
				</div>
				<!--实验列表 三列-->
				<div
					v-for="(item, index) in expStatusList"
					:key="index"
					class="hfull wfull"
					flex
					flex-col
				>
					<div relative mb-4 flex items-center>
						<div absolute flex items-center justify-center>
							<x-image absolute size="3.5rem" :src="item.icon"></x-image>
						</div>
						<x-title ml-4rem wfull flex-1>{{ item.name }}</x-title>
					</div>
					<div class="exp-task-wrapper p-6" flex-1>
						<x-flex-y-overflow p-5px class="hfull -m-5px">
							<div
								v-for="expItem in filterExpListByStatus(item)"
								:key="expItem"
								mb6
								wfull
							>
								<biz-exp-card :item="expItem"></biz-exp-card>
							</div>
						</x-flex-y-overflow>
					</div>
				</div>
				<!--右侧 人员列表-->
				<div hfull wfull flex flex-col>
					<div flex items-center justify-between pb-4>
						<x-title flex-1>人员负载</x-title>
						<div v-if="computedUserinfo.id" flex items-center>
							<span mr-4>只看自己</span>
							<a-switch v-model="lookSelf" @change="lookSelfClickHandler" />
						</div>
					</div>
					<div class="hfull wfull" flex flex-col>
						<x-flex-y-overflow class="-m-5px" flex-1 p-5px>
							<div
								v-for="(experItem, experIndex) in experList"
								:key="experItem"
								mb6
								@click="experClickHandler(experIndex, experItem)"
							>
								<biz-exper-card
									:logined="experItem.userId == computedUserinfo.id"
									:selected="currentExperIndex == experIndex"
									:item="experItem"
								/>
							</div>
						</x-flex-y-overflow>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.exp-card-wrapper {
	border-radius: theme('borderRadius.lg');
	padding: theme('spacing.xs') theme('spacing.DEFAULT');
	box-shadow: 0 0 4px #e9eaef;
	background: white;
}
.exp-task-wrapper {
	border-radius: theme('borderRadius.lg');
	background: #dbdde7;
}
</style>
