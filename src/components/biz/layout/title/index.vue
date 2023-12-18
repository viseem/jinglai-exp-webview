<script setup lang="ts">
const modalStore = useModalStore()
const labStore = useLabStore()
const currentLab = computed(() => labStore.getCurrentLab)

function test() {
	console.log('test')
	modalStore.openLabModal()
}
</script>

<template>
	<div relative flex items-center justify-between border="1px solid yellow;">
		<span>时间</span>
		<div absolute left-0 top-0 hfull wfull flex items-center justify-center>
			<x-title :title="currentLab?.name" text-center></x-title>
		</div>
		<a-button @click="test">选择实验室</a-button>
	</div>
</template>

<style scoped></style>
