<script setup lang="ts">
import { ILab } from '~/api/biz/types/exptypes'

defineProps({
	item: {
		type: Object as PropType<ILab>,
		required: true,
	},
})
</script>

<template>
	<div bg="white" hfull wfull flex flex-1 items-center text-center>
		<div wfull flex items-center>
			<p w-10rem>{{ item.name }}</p>
			<x-text
				wfull
				flex-1
				text-left
				class="!text-#666"
				:rows="2"
				:text="item.mark"
			></x-text>
		</div>
	</div>
</template>

<style scoped></style>
