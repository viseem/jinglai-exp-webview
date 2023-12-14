<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
	<div flex items-center justify-between>
		<span>时间</span>
		<x-title title="细胞实验室" text-center></x-title>
		<a-button @click="modalStore.openLabModal">选择实验室</a-button>
	</div>
</template>

<style scoped></style>
