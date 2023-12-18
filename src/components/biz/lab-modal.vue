<script setup lang="ts">
import { useRequest } from 'vue-request'
import { ILab } from '~/api/biz/types/exptypes'
const { data: labRes } = useRequest(getLabPage)

const modalStore = useModalStore()
const labStore = useLabStore()
// computed set get语法
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
	<x-dialog v-model="modalVisible" background="white" width="90%">
		<div hfull wfull flex items-center justify-center rounded-2xl>
			<div wfull pxl>
				<a-row :gutter="[48, 48]">
					<a-col
						v-for="item in labRes?.list"
						:key="item"
						:span="6"
						@click="labClickHandler(item)"
					>
						<biz-lab-card :item="item" class="h10rem w-full rounded-5" />
					</a-col>
				</a-row>
			</div>
		</div>
	</x-dialog>
</template>

<style scoped></style>
