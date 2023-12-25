<script setup lang="ts">
import { PropType } from 'vue'
import { IExpLog } from '~/api/biz/types/exptypes'

defineProps({
	item: {
		type: Object as PropType<IExpLog>,
		required: true,
	},
})
</script>

<template>
	<div border-b="1px solid #ccc" pb-1>
		<span text-xs>2023-09-09</span>
		<div>
			<x-text class="text-sm !text-[#666]" rows="1">{{ item?.mark }}</x-text>
			<div>
				<x-file-link
					v-for="attachment in item.attachments"
					:key="attachment"
					width="6rem"
					:name="attachment.fileName"
					:url="attachment.fileUrl"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
