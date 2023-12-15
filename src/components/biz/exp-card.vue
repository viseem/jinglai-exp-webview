<script setup lang="ts">
import { PropType } from 'vue'
import { IExp } from '~/api/biz/types/exptypes'

defineProps({
	item: {
		type: Object as PropType<IExp>,
		default: () => {},
	},
})
</script>

<template>
	<div>
		<x-title :title="item.name"></x-title>
	</div>
</template>

<style scoped></style>
