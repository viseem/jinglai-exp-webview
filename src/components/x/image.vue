<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
	src: {
		type: String,
		default: '',
	},
	mode: {
		type: String,
		default: String as PropType<
			'contain' | 'fill' | 'cover' | 'none' | 'scale-down'
		>,
	},
	size: {
		type: String,
		default: '2.5rem',
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
	<a-image :src="src" :fit="mode" :style="computedStyle"></a-image>
</template>

<style scoped></style>
