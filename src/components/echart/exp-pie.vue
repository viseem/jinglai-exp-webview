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
	{ value: 0, name: '未做' },
	{ value: 0, name: '在做' },
])
watch(
	() => props.stats,
	async (v) => {
		if (v) {
			await nextTick()
			chartData.value[0].value = v?.notDoCount || 0
			chartData.value[1].value = v?.doingCount || 0
			chartRef.value.setOptions(option)
		}
	},
)

const option = ref<EChartsOption>({
	title: {
		text: '',
		left: 'center',
	},
	color: ['#214DDE', '#4FD7BD'],
	tooltip: {
		trigger: 'item',
		formatter: '{b} : {c} ({d}%)',
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		data: ['未做', '在做'],
		formatter: (name) => {
			return (
				name + ' ' + chartData.value.find((item) => item.name === name)?.value
			)
		},
	},
	series: [
		{
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
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
</script>

<template>
	<div>
		<!-- @vue-ignore -->
		<div h10rem wfull>
			<v-chart ref="chartRef" class="wfull" :option="option" autoresize />
		</div>
	</div>
</template>

<style></style>
