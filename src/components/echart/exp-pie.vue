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

use([
	CanvasRenderer,
	PieChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
])

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
	},
	series: [
		{
			name: '',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: [
				{ value: 335, name: '未做' },
				{ value: 310, name: '在做' },
			],
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
			<v-chart class="wfull" :option="option" autoresize />
		</div>
	</div>
</template>

<style></style>
