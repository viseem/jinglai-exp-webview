<script setup lang="ts">
import { IDevice } from '~/api/biz/types/devicetypes'

defineProps({
	item: {
		type: Object as PropType<IDevice>,
		default: () => ({}),
	},
})
</script>

<template>
	<div bg="#F6F7FF" relative h7.5rem wfull flex rounded-2 px-4 py-3>
		<div
			w="35%"
			min-w="35%"
			flex
			items-center
			justify-center
			overflow-hidden
			rounded-2
		>
			<x-image mode="cover" :src="item.fileUrl" />
		</div>
		<div wfull flex flex-col items-start justify-center pl-6 pr-6>
			<x-text wfull :text="item.name" rows="1" />
			<x-text class="!text-[#666]" ptf-4 wfull :text="item.mark" rows="1" />
		</div>
		<div absolute right-4 top-4 flex items-center>
			<div ml-1 text-3.5 :class="item.busy ? 'device-busy' : 'device-leisure'">
				{{ item.busy ? '忙碌' : '空闲' }}
			</div>
		</div>
	</div>
</template>

<style scoped>
.device-busy {
	color: #e88b00 !important;
	text-shadow: 0 0 2px #e88b00;
}
.device-leisure {
	color: #20cb42 !important;
	text-shadow: 0 0 2px #20cb42;
}
</style>
