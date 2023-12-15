<script setup lang="ts">
defineProps({
	link: {
		type: String,
		default: '',
	},
})
</script>

<template>
	<x-text class="!text-[#0078D7]"> {{ link }}<slot></slot> </x-text>
</template>

<style scoped></style>
