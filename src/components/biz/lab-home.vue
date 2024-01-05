<script setup lang="ts">
// ----静态数据
import { computed } from 'vue'
import { IExp, IExper } from '~/api/biz/types/exptypes'
import { IDevice } from '~/api/biz/types/devicetypes'
import { getDevicePage } from '~/api/biz/deviceapi'
import { IExpCountStats } from '~/api/biz/types/statstypes'
import { useDrop } from 'vue3-dnd'
import { updateExpStage } from '~/api/biz/expapi'
import { EXP_STATUS_MAP } from '~/utils/biz/exputils'

interface IStatusItem {
	name: string
	status: string[]
	colors: string[]
	icon: string
}

/*
 * store
 * */
const userStore = useUserStore()

const expStatusList: IStatusItem[] = [
	{
		name: '待开展',
		status: ['0'],
		colors: [EXP_STATUS_MAP['0'].color],
		icon: EXP_STATUS_MAP['0'].icon,
	},
	{
		name: '进行中',
		status: [
			EXP_STATUS_MAP.DOING.status,
			EXP_STATUS_MAP.PAUSE.status,
			EXP_STATUS_MAP.DATA_CHECK.status,
			EXP_STATUS_MAP.DATA_ACCEPT.status,
			EXP_STATUS_MAP.DATA_REJECT.status,
		],
		colors: [
			EXP_STATUS_MAP.DOING.color,
			EXP_STATUS_MAP.PAUSE.color,
			EXP_STATUS_MAP.DATA_CHECK.color,
			EXP_STATUS_MAP.DATA_ACCEPT.color,
			EXP_STATUS_MAP.DATA_REJECT.color,
		],
		icon: EXP_STATUS_MAP.DOING.icon,
	},
	{
		name: '已完成',
		status: [EXP_STATUS_MAP.COMPLETE.status],
		colors: [EXP_STATUS_MAP.COMPLETE.color],
		icon: EXP_STATUS_MAP.COMPLETE.icon,
	},
]
const [, drop1] = useDrop(() => ({
	accept: ['BOX'],
	drop: () => ({ index: 0, status: '0' }),
	canDrop: (item) => {
		return (
			item?.item?.operatorId == userStore.userinfo.id &&
			item?.item?.stage !== '0'
		)
	},
}))
const [, drop2] = useDrop(() => ({
	accept: ['BOX'],
	drop: () => ({ index: 1, status: 'DOING' }),
	canDrop: (item) => {
		return (
			item?.item?.operatorId == userStore.userinfo.id &&
			item?.item?.stage !== 'DOING'
		)
	},
}))
const [, drop3] = useDrop(() => ({
	accept: ['BOX'],
	drop: () => ({ index: 2, status: 'COMPLETE' }),
	canDrop: (item) => {
		return (
			item?.item?.operatorId == userStore.userinfo.id &&
			item?.item?.stage !== 'COMPLETE'
		)
	},
}))
async function expCardDropHandler(item, dropResult) {
	if (item?.index > -1 && item?.item?.id && dropResult?.status) {
		await updateExpStage({ id: item.item.id, stage: dropResult.status })
		expRes.value[item.index].stage = dropResult.status
		toast.success('操作成功')
		loadExpStats()
		loadExperPage()
	}
}

function computeDropRef(index: number) {
	switch (index) {
		case 0:
			return drop1
		case 1:
			return drop2
		case 2:
			return drop3
		default:
			return null
	}
}

// 属性
const labStore = useLabStore()
const currentLab = computed(() => labStore.getCurrentLab)

const expParams = ref({
	labId: null as null | number,
	operatorId: null as null | number,
})

/*
 * 加载任务列表
 * */
const expRes = ref([] as IExp[])
async function loadExpPage() {
	expRes.value = []
	if (!currentLab.value.id) {
		return
	}
	expParams.value.labId = currentLab.value.id
	const res = await getExpPage(expParams.value)
	res?.list?.forEach((item, index) => {
		item.index = index
	})
	expRes.value = res?.list
}

function initExpParams() {
	lookSelf.value = false
	currentExperIndex.value = -1
	expParams.value = {
		labId: null,
		operatorId: null,
	}
}

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
 * user
 * */
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
	expCountStats.value = {} as any
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
const currentExperIndex = ref(-1)
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

/*
 *如果重新登录了，重置点击状态和只看自己
 * */
watch(
	() => computedUserinfo.value,
	(v) => {
		lookSelf.value = !!v?.id
		lookSelfClickHandler(lookSelf.value)
	},
	{
		deep: true,
	},
)

watch(
	() => labStore.refreshLab,
	(v) => {
		console.log('currentLab.value changed--', v)
		initExpParams()
		loadExpPage()
		loadExperPage()
		loadDevicePage()
		loadExpStats()
	},
	{},
)
const expModalRef = ref<any>(null)
function cardClickHandler(id: number, index: number) {
	expModalRef.value.open({ id, index })
}

/*
 * 修改exp时的emit
 * */
async function expChangeHandler(item: IExp) {
	console.log('item---====', item)
	if (item?.index !== undefined && item?.index > -1) {
		expRes.value[item.index] = { ...expRes.value[item.index], ...item }
	}
}
</script>

<template>
	<biz-exp-modal
		ref="expModalRef"
		@sop-change="expChangeHandler"
		@exp-change="expChangeHandler"
	/>
	<biz-custom-drag-layer />
	<div wfull flex flex-1 flex-col p-4 bg="#EBEDF1">
		<!--<div v-if="collectedProps.isDragging" :ref="dragPreview">dragPreview</div>-->
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
						<x-image
							h1.5rem
							w1.5rem
							:src="item.icon"
							style="filter: drop-shadow(0 0 0.8rem #999)"
						></x-image>
						<x-title ml-2rem wfull flex-1>{{ item.name }}</x-title>
					</div>
					<div :ref="computeDropRef(index)" class="exp-task-wrapper p-6" flex-1>
						<x-flex-y-overflow p-5px class="hfull -m-5px">
							<div
								v-for="expItem in filterExpListByStatus(item)"
								:key="expItem"
								mb6
								wfull
							>
								<biz-exp-card
									:index="expItem.index"
									:item="expItem"
									@click="cardClickHandler(expItem.id, expItem.index)"
									@drop="expCardDropHandler"
								></biz-exp-card>
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
