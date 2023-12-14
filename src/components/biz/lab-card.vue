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
		<a-typography-text text-4xl> {{ title }} </a-typography-text>
	</div>
</template>

<style scoped></style>
