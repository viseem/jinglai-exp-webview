<script setup lang="ts">
import { ILab } from '~/api/biz/types/exptypes'
const labList = ref([] as ILab[])

async function loadLabPage() {
	const res = await getLabPage()
	labList.value = res?.list
}
loadLabPage()

const modalStore = useModalStore()
const labStore = useLabStore()
const modalVisible = computed({
	get: () => modalStore.labModalVisible,
	set: (v) => modalStore.setLabModalVisible(v),
})

function labClickHandler(data: ILab) {
	labStore.setCurrentLab(data)
	modalStore.closeLabModal()
}
</script>

<template>
	<x-dialog v-model="modalVisible" width="70rem">
		<div hfull wfull flex items-center justify-center rounded-2xl>
			<div wfull flex flex-col items-center justify-center pxl>
				<div text-xl text-white fw900>选择实验室</div>
				<div w="60%" mt-10>
					<biz-lab-card
						v-for="item in labList"
						:key="item"
						cursor-pointer
						:item="item"
						class="mb-4 h6rem w-full rounded-1"
						@click="labClickHandler(item)"
					/>
				</div>
			</div>
		</div>
	</x-dialog>
</template>

<style scoped></style>
