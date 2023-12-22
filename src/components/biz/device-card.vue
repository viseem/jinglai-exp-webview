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
			<x-text wfull :text="item.mark" rows="1" />
		</div>
		<div absolute right-2 top-2 flex items-center>
			<x-image size="1rem"></x-image>
			<div ml-1 text-3>{{ item.status }}</div>
		</div>
	</div>
</template>

<style scoped></style>
