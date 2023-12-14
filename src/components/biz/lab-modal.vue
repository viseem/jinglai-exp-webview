<script setup lang="ts">
import { useRequest } from 'vue-request'
const { data: labRes } = useRequest(getLabPage)
console.log(1111)
</script>

<template>
	<div
		hfull
		wfull
		flex
		items-center
		justify-center
		p-2xl
		class="lab-modal-container"
	>
		<div wfull pxl>
			<a-row :gutter="[48, 48]">
				<a-col v-for="item in labRes?.list" :key="item" :span="6">
					<biz-lab-card :item="item" class="h10rem w-full rounded-5" />
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<style scoped>
.lab-modal-container {
	border-radius: theme('borderRadius.2xl');
	box-shadow: 0 0 10px #ccc;
}
</style>
