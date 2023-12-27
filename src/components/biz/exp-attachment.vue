<script setup lang="ts">
import { IExpAttachment } from '~/api/biz/types/exptypes'
import { EXP_ATTACHMENT_TYPE_MAP } from '~/utils/biz/expattachmentutils'

defineProps({
	item: {
		type: Object as PropType<IExpAttachment>,
		default: () => ({}) as IExpAttachment,
	},
})
</script>

<template>
	<div
		bg="white"
		class="exp-attachment-container"
		flex
		items-center
		justify-between
		overflow-hidden
		rounded-1
		p-1.5
	>
		<div
			:style="{ background: EXP_ATTACHMENT_TYPE_MAP?.[item.expType]?.color }"
			w5rem
			rounded-1
			py-0.5
			text-center
			text-sm
			text="#eee"
			class="exp-attachment-tag"
		>
			{{ EXP_ATTACHMENT_TYPE_MAP?.[item.expType]?.name }}
		</div>
		<x-file-link ml-8 :name="item.fileName" :url="item.fileUrl" w9rem />
		<x-text flex-1>{{ item.mark }}</x-text>
		<div text="#666" ml-4 w6rem text-sm>
			{{ formatDate(item.createTime) }}
		</div>
	</div>
</template>

<style scoped>
.exp-attachment-container {
	border: 1px solid #7abbf8;
	box-shadow: 0 0 3px #ccc;
}
.exp-attachment-tag {
	box-shadow: 0 0 3px #666;
}
</style>
