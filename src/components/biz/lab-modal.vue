<script setup lang="ts">
import { useRequest } from 'vue-request'
import { ILab } from '~/api/biz/types/exptypes'
const { data: labRes } = useRequest(getLabPage)

const modalStore = useModalStore()
const labStore = useLabStore()
const modalVisible = computed(() => modalStore.labModalVisible)
function labClickHandler(data: ILab) {
	labStore.setCurrentLab(data)
	modalStore.closeLabModal()
}
</script>

<template>
	<div
		v-if="modalVisible"
		absolute
		left-0
		top-0
		z-100
		hscreen
		wscreen
		flex
		items-center
		justify-center
		p-2xl
	>
		<div
			hfull
			wfull
			flex
			items-center
			justify-center
			rounded-2xl
			bg-white
			class="lab-modal-container"
		>
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
	</div>
</template>

<style scoped>
.lab-modal-container {
	//border-radius: theme('borderRadius.2xl');
	box-shadow: 0 0 10px #ccc;
}
</style>
