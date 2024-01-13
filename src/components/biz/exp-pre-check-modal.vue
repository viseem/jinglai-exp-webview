<script setup lang="ts">
const modalStore = useModalStore()
const modalVisible = computed({
	get: () => modalStore.expPreCheckModalVisible,
	set: (v) => modalStore.setExpPreCheckModalVisible(v),
})

const computedList = computed(() => modalStore.expPreCheckModalConfig?.list)
const loading = ref(false)
const emit = defineEmits(['success'])
async function updateHandler(checked: boolean, item: any, index: number) {
	if (!item.id) {
		return
	}
	loading.value = true
	await updateCommonTodoLogStatus({
		id: item.id,
		status: booleanToSopStatus(checked),
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
						<x-checkbox :list="computedList" @update="updateHandler">
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
