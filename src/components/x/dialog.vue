<script setup lang="ts">
const props = defineProps({
	width: {
		type: String,
		default: '50%',
	},
	height: {
		type: String,
		default: '80vh',
	},
	background: {
		type: String,
		default: 'red',
	},
	modelValue: {
		type: Boolean,
		default: false,
	},
})
const emit = defineEmits(['update:modelValue'])
const visible = ref(props.modelValue)
watch(
	() => props.modelValue,
	(v) => {
		visible.value = v
	},
	{
		immediate: true,
	},
)

watch(
	() => visible.value,
	(v) => {
		emit('update:modelValue', v)
	},
	{
		immediate: true,
	},
)

function open() {
	visible.value = true
}
function close() {
	visible.value = false
}

defineExpose({
	open,
	close,
})
</script>

<template>
	<a-modal
		v-model:visible="visible"
		:modal-style="{ background, padding: '1rem', width }"
		simple
		hide-title
		:footer="null"
	>
		<div :style="{ height }" flex flex-col>
			<div absolute wfull flex justify-end>
				<a-button @click="close">关闭</a-button>
			</div>
			<div flex flex-1 flex-col items-center justify-center>
				<div wfull flex flex-1>
					<div flex flex-1>
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</a-modal>
</template>

<style scoped></style>
