<script setup lang="ts">
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	width: {
		type: String,
		default: '100%',
	},
	flag: {
		type: Boolean,
		default: true,
	},
	picStyle: {
		type: Object,
		default: () => ({
			size: '30px',
		}),
	},
})

const modalStore = useModalStore()
// const fileViewRef = ref()
function handleFileClick() {
	// fileViewRef.value?.open(props)
	modalStore.setFileModalConfig({ fileName: props.name, fileUrl: props.url })
	modalStore.setFileModalVisible(true)
}
let picFlag = false
const determineFile = () => {
	if (props?.url) {
		if (
			/\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(props?.url) &&
			props?.flag
		) {
			picFlag = true
		}
	}
}
determineFile()
</script>

<template>
	<div class="inline-flex flex-col justify-start" text-sm>
		<div
			v-if="!picFlag"
			class="file-name"
			:style="{ width: props.width }"
			style="font-size: inherit"
		>
			<span class="m-text-ellipsis-1" style="font-size: inherit">
				{{
					props.name?.includes('.')
						? props.name.substring(0, props.name.lastIndexOf('.'))
						: props.name
				}}
			</span>
			<span style="word-break: normal; font-size: inherit">
				{{
					props.name?.includes('.')
						? '.' + props.name.substring(props.name.lastIndexOf('.') + 1)
						: ''
				}}
			</span>
		</div>
		<div v-else class="m-0 flex p-0 !relative">
			<x-image
				class="relative cursor-pointer"
				:size="props.picStyle.size"
				:src="props.url"
				fit="cover"
				@click="handleFileClick"
			/>
		</div>
	</div>
</template>

<style scoped>
.file-name {
	display: flex;
	max-width: 100%;
	padding: 0;
	line-height: 1;
	color: #2e55f6;
	cursor: pointer;
	align-items: center;
}

.m-text-ellipsis-1 {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin: 0;
}
</style>
