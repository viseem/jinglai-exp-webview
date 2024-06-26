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
	pageNo: number
	pageSize: number
	total: number
	list: IExp[]
	cateIndex: number
	loading: boolean
}

/*
 * store
 * */
const userStore = useUserStore()
const _expStatusList = [
	{
		name: '筹备待开展',
		cateIndex: 0,
		status: ['0'],
		colors: [EXP_STATUS_MAP['E'].color],
		icon: EXP_STATUS_MAP['E'].icon,
		pageNo: 1,
		pageSize: 10,
		list: [],
		loading: false,
	},
	{
		name: '开展中',
		cateIndex: 1,
		loading: false,
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
		pageNo: 1,
		pageSize: 10,
		list: [],
	},
	{
		name: '已完成、已出库',
		cateIndex: 2,
		loading: false,
		status: [EXP_STATUS_MAP.V_DONE.status, EXP_STATUS_MAP.Z_COMPLETE.status],
		colors: [EXP_STATUS_MAP.V_DONE.color, EXP_STATUS_MAP.Z_COMPLETE.color],
		icon: EXP_STATUS_MAP.Z_COMPLETE.icon,
		pageNo: 1,
		pageSize: 10,
		list: [],
	},
]
const expStatusList = ref<IStatusItem[]>(
	JSON.parse(JSON.stringify(_expStatusList)),
)
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
		// expStatusList.value[item.cateIndex][item.index].stage = dropResult.status
		loadAllExpPage()
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

/*
 * 加载任务列表
 * */
const expParams = ref({
	labId: null as null | number,
	operatorId: null as null | number,
})
async function loadAllExpPage(reset: boolean = true) {
	if (!currentLab.value.id) {
		return
	}
	expParams.value.labId = currentLab.value.id
	for (const item of expStatusList.value) {
		loadExpPageByItem(item, reset)
	}
}

async function loadExpPageByItem(item: IStatusItem, reset: boolean = false) {
	item.list = []
	if (reset) {
		item.pageNo = 1
		item.pageSize = 10
		item.total = 0
		item.loading = false
	}
	item.loading = true
	const res = await getExpPage({
		...expParams.value,
		pageNo: item.pageNo,
		pageSize: item.pageSize,
		stageArr: item.status,
	}).finally(() => (item.loading = false))
	res?.list?.forEach((_item, index) => {
		_item.index = index
		_item.cateIndex = item.cateIndex
	})
	item.list = res?.list || []
	item.total = res?.total
}

function initExpParams() {
	lookSelf.value = false
	currentExperIndex.value = -1
	expParams.value = {
		labId: null,
		operatorId: null,
	}
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
	loadAllExpPage()
}

/*
 * 只看自己
 * */
const lookSelf = ref(false)
function lookSelfClickHandler(e: boolean) {
	currentExperIndex.value = e ? computedLoginUserIndex.value : -1
	expParams.value.operatorId = e ? computedUserinfo.value.id : null
	loadAllExpPage()
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
		loadAllExpPage()
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
	loadAllExpPage()
	return
	/*	if (
		item?.index !== undefined &&
		item?.index > -1 &&
		item?.cateIndex !== undefined &&
		item?.cateIndex > -1
	) {
		expStatusList.value[item.cateIndex][item.index] = {
			...expStatusList.value[item.cateIndex][item.index],
			...item,
		}
	}*/
}

/*
 * 饼图状态改变
 * */
function pieStatusChangeHandler(
	item: {
		status: string
		color: string
		groupIndex: number
	},
	groupIndex: number,
) {
	console.log('item----', item)
	if (item) {
		expStatusList.value[groupIndex].name = EXP_STATUS_MAP?.[item.status]?.name
		expStatusList.value[groupIndex].status = [item.status]
		expStatusList.value[groupIndex].colors = [item.color]
		console.log('expStatusList.value[1]--===', expStatusList.value[1])
	} else {
		expStatusList.value[groupIndex].name = _expStatusList[groupIndex].name
		expStatusList.value[groupIndex].status = _expStatusList[groupIndex].status
		expStatusList.value[groupIndex].colors = _expStatusList[groupIndex].colors
	}
	loadExpPageByItem(expStatusList.value[groupIndex], true)
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
				<div wfull flex flex-col>
					<div class="exp-card-wrapper">
						<biz-lab-info />
					</div>
					<x-title py-4>实验开展统计</x-title>
					<div class="exp-card-wrapper">
						<echart-exp-pie
							:stats="expCountStats"
							@status-change="pieStatusChangeHandler"
						/>
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

				<div
					v-for="(item, index) in expStatusList"
					:key="index"
					class="box-border hfull"
					min-w="20%"
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
						<div ml-2rem wfull flex-1 text-xl>
							{{ item.name }}
						</div>
						<a-spin v-if="item.loading" dot />
					</div>

					<div
						:ref="computeDropRef(index)"
						class="exp-task-wrapper p-6 pb-4"
						relative
						flex
						flex-1
						flex-col
					>
						<x-flex-y-overflow p-5px class="hfull -m-5px">
							<div v-for="expItem in item.list" :key="expItem" mb6 wfull>
								<biz-exp-card
									:index="expItem.index"
									:item="expItem"
									@click="cardClickHandler(expItem.id, expItem.index)"
									@drop="expCardDropHandler"
								></biz-exp-card>
							</div>
						</x-flex-y-overflow>
						<div ml-3 wfull flex justify-center pt-6>
							<a-pagination
								v-model:current="item.pageNo"
								v-model:page-size="item.pageSize"
								size="large"
								:total="item.total"
								show-total
								@change="loadExpPageByItem(item)"
							/>
						</div>
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
