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
})

const computedStyle = computed(() => {
	return {
		width: props.size || '',
		height: props.size || '',
		borderRadius: props.circle ? '50%' : '',
		overflow: props.circle ? 'hidden' : '',
	}
})
</script>

<template>
	<a-image
		class="!flex"
		:src="src"
		:fit="mode"
		:style="computedStyle"
	></a-image>
</template>

<style scoped></style>
