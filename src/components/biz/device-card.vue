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
	<div relative h4.5rem wfull flex bg="#F6F7FF" rounded-2>
		<div
			w="35%"
			min-w="35%"
			m-2
			flex
			items-center
			justify-center
			overflow-hidden
			rounded-2
		>
			<x-image flex class="hfull" mode="contain" :src="item.fileUrl" />
		</div>
		<div wfull flex flex-col items-start justify-center pr-6>
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
