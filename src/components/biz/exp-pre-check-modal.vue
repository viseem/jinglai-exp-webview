<script setup lang="ts">
const modalStore = useModalStore()
const modalVisible = computed({
	get: () => modalStore.expPreCheckModalVisible,
	set: (v) => modalStore.setExpPreCheckModalVisible(v),
})

const computedExpPreCheckModalConfig = computed(
	() => modalStore.expPreCheckModalConfig,
)
const loading = ref(false)
const emit = defineEmits(['success'])
async function updateHandler(checked: boolean, item: any, index: number) {
	if (!item.id || !computedExpPreCheckModalConfig.value.exp?.id) {
		return
	}
	loading.value = true
	await saveCommonTodoLogStatus({
		status: booleanToSopStatus(checked),
		refId: computedExpPreCheckModalConfig.value.exp.id,
		type: 'PROJECT_CATEGORY',
		todoId: item?.id,
	}).finally(() => {
		loading.value = false
	})
	emit('success', checked, index)
}
</script>

<template>
	<x-dialog v-model="modalVisible" width="70rem">
		<div hfull wfull p-3>
			<div bg="white" hfull wfull flex items-center justify-center rounded-2>
				<a-spin dot max-w="80%" :loading="loading" flex flex-col>
					<div wfull flex flex-col>
						<x-checkbox
							:list="computedExpPreCheckModalConfig?.list"
							@update="updateHandler"
						>
							<template #content="{ item }">
								{{ item.content }}
							</template>
						</x-checkbox>
					</div>
				</a-spin>
			</div>
		</div>
	</x-dialog>
</template>

<style scoped></style>
