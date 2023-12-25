<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
	src: {
		type: String,
		default: '',
	},
	mode: {
		type: String as PropType<
			'contain' | 'fill' | 'cover' | 'none' | 'scale-down'
		>,
		default: 'contain',
	},
	size: {
		type: String,
		default: '',
	},
	circle: {
		type: Boolean,
		default: false,
	},
	preview: {
		type: Boolean,
		default: true,
	},
})

const computedStyle = computed(() => {
	return {
		borderRadius: props.circle ? '50%' : '',
		overflow: props.circle ? 'hidden' : '',
	}
})
</script>

<template>
	<a-image
		:preview="preview"
		class="!flex"
		:src="src"
		:fit="mode"
		:width="size || ''"
		:height="size || ''"
		:style="computedStyle"
	></a-image>
</template>

<style scoped></style>
