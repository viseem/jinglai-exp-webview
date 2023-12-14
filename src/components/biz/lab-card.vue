<script setup lang="ts">
import { goExpPage } from '~/utils/routerutils'

defineProps({
	title: {
		type: String,
		required: true,
	},
})

function cardClickHandler() {
	goExpPage()
}
</script>

<template>
	<div
		flex
		cursor-pointer
		items-center
		justify-center
		@click="cardClickHandler"
	>
		<x-title :title="title"></x-title>
	</div>
</template>

<style scoped></style>
