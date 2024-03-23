<script setup lang="ts">
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { IExpCountStats } from '~/api/biz/types/statstypes'
import { PropType } from 'vue'
import { EXP_STATUS_MAP } from '~/utils/biz/exputils'

use([
	CanvasRenderer,
	PieChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
])

const props = defineProps({
	stats: {
		type: Object as PropType<IExpCountStats>,
	},
})
const chartRef = ref()
const chartData = ref([
	{
		value: 0,
		name: '待开展',
		color: EXP_STATUS_MAP['E'].color,
		status: EXP_STATUS_MAP['E'].status,
	},
	{
		value: 0,
		name: '进行中',
		color: EXP_STATUS_MAP.DOING.color,
		status: EXP_STATUS_MAP.DOING.status,
		groupIndex: 1,
	},
	{
		value: 0,
		name: '暂停',
		color: EXP_STATUS_MAP.PAUSE.color,
		status: EXP_STATUS_MAP.PAUSE.status,
		groupIndex: 1,
	},
	{
		value: 0,
		name: '审核中',
		color: EXP_STATUS_MAP.DATA_CHECK.color,
		status: EXP_STATUS_MAP.DATA_CHECK.status,
		groupIndex: 1,
	},
	{
		value: 0,
		name: '审核通过',
		color: EXP_STATUS_MAP.DATA_ACCEPT.color,
		status: EXP_STATUS_MAP.DATA_ACCEPT.status,
		groupIndex: 1,
	},
	{
		value: 0,
		name: '审核驳回',
		color: EXP_STATUS_MAP.DATA_REJECT.color,
		status: EXP_STATUS_MAP.DATA_REJECT.status,
		groupIndex: 1,
	},
	{
		value: 0,
		name: '已完成',
		color: EXP_STATUS_MAP.V_DONE.color,
		status: EXP_STATUS_MAP.V_DONE.status,
		groupIndex: 2,
	},
	{
		value: 0,
		name: '已出库',
		color: EXP_STATUS_MAP.Z_COMPLETE.color,
		status: EXP_STATUS_MAP.Z_COMPLETE.status,
		groupIndex: 2,
	},
])
watch(
	() => props.stats,
	async (v: IExpCountStats) => {
		if (v) {
			await nextTick()
			chartData.value[0].value = v?.notDoCount || 0
			chartData.value[1].value = v?.doingCount || 0
			chartData.value[2].value = v?.pauseCount || 0
			chartData.value[3].value = v?.dataCheckCount || 0
			chartData.value[4].value = v?.dataAcceptCount || 0
			chartData.value[5].value = v?.dataRejectCount || 0
			chartData.value[6].value = v?.doneCount || 0
			chartData.value[7].value = v?.completeCount || 0

			// chartRef.value.setOptions(option)
		}
	},
)

const option = ref<EChartsOption>({
	title: {
		text: '',
		left: 'center',
	},
	color: [
		EXP_STATUS_MAP['E'].color,
		EXP_STATUS_MAP.DOING.color,
		EXP_STATUS_MAP.PAUSE.color,
		EXP_STATUS_MAP.DATA_CHECK.color,
		EXP_STATUS_MAP.DATA_ACCEPT.color,
		EXP_STATUS_MAP.DATA_REJECT.color,
		EXP_STATUS_MAP.V_DONE.color,
		EXP_STATUS_MAP.Z_COMPLETE.color,
	],
	tooltip: {
		trigger: 'item',
		formatter: '{b} : {c} ({d}%)',
	},
	series: [
		{
			type: 'pie',
			radius: '70%',
			center: ['55%', '50%'],
			data: chartData.value,
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
		},
	],
})
const emit = defineEmits(['status-change'])
const currentTagIndex = ref(-1)
function tagClickHandler(index: number) {
	if (index === currentTagIndex.value) {
		currentTagIndex.value = -1
	} else {
		currentTagIndex.value = index
	}
	if (![0].includes(index)) {
		emit(
			'status-change',
			chartData.value[currentTagIndex.value],
			chartData.value[index]?.groupIndex,
		)
	}
}
</script>

<template>
	<div h23rem flex>
		<div hfull min-w-8rem flex-1>
			<div
				v-for="(item, index) in chartData"
				:key="item"
				border="2px solid transparent"
				rounded="1"
				mt-2
				flex
				cursor-pointer
				items-center
				gap-1
				px-1
				py-1
				text-nowrap
				:class="index == currentTagIndex ? 'tag-active' : 'tag-inactive'"
				@click="tagClickHandler(index)"
			>
				<div
					min-h-1.2rem
					min-w-1.2rem
					rounded="50%"
					:style="{ background: item.color }"
				></div>
				<span text-base>{{ item.name }}</span>
				<span text-base>{{ item.value }}</span>
			</div>
		</div>
		<!-- @vue-ignore -->
		<div hfull wfull>
			<v-chart ref="chartRef" class="wfull" :option="option" autoresize />
		</div>
	</div>
</template>

<style scoped>
.tag-active {
	border-color: #0078d4;
}
</style>
