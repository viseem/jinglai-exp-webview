<script setup lang="ts">
const props = defineProps({
	fileUrl: {
		type: String,
		default: null,
	},
	fileName: {
		type: String,
		default: null,
	},
	height: {
		type: String,
		default: '100%',
	},
	noDownload: {
		type: Boolean,
		default: false,
	},
})

const modalStore = useModalStore()
const modalVisible = computed({
	get: () => modalStore.fileModalVisible,
	set: (v) => modalStore.setFileModalVisible(v),
})

const currentFileConfig = computed(() => modalStore.fileModalConfig)
const currentFileName = computed(() =>
	props.fileName ? props.fileName : currentFileConfig.value.fileName,
)

const currentFileUrl = computed(() =>
	props.fileUrl ? props.fileUrl : currentFileConfig.value.fileUrl,
)

const computeFileExtension = computed(() =>
	getFileExtension(currentFileUrl.value),
)
onMounted(() => {})
</script>

<template>
	<x-dialog v-model="modalVisible" background="white" width="90%">
		<div hfull wfull flex items-center justify-center rounded-2xl>
			<div wfull pxl>
				<div
					v-if="!noDownload"
					class="relative mb-0.5rem flex justify-between bg-[white]"
				>
					<div>{{ currentFileName }}</div>
					{{ currentFileUrl }}
				</div>
				<!--https://view.officeapps.live.com/op/view.aspx-->
				<web-view
					v-if="
						modalVisible &&
						(isWordFile(computeFileExtension) ||
							isExcelFile(computeFileExtension) ||
							isPPTFile(computeFileExtension))
					"
					border="1px solid #ccc"
					style="width: 100%; min-height: 70vh"
					:style="{ height }"
					:src="`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
						currentFileUrl,
					)}&id=${getUUID()}`"
					frameborder="0"
				></web-view>
				<div v-if="isImgFile(currentFileUrl)" class="flex justify-center">
					<x-image :src="fileUrl" />
				</div>
				<div v-if="modalVisible && isPDFFile(computeFileExtension)">
					<web-view
						v-if="isPDFFile(computeFileExtension)"
						border="1px solid green"
						style="width: 100%; min-height: 65vh"
						:style="{ height }"
						:src="currentFileUrl"
						frameborder="0"
					></web-view>
				</div>
				<div v-if="isNotKnowFile(currentFileUrl)">
					暂不支持此文件预览，请点击下载查看
				</div>
			</div>
		</div>
	</x-dialog>
</template>

<style scoped></style>
