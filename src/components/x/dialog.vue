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
		default: 'linear-gradient(to right,#2e54f6 70%, #017ef5)',
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
// #2F54F6 #017FF5
</script>

<template>
	<a-modal
		v-model:visible="visible"
		:modal-style="{
			background,
			padding: '0',
			width,
			borderRadius: '0.5rem',
		}"
		simple
		hide-title
		:footer="null"
	>
		<div :style="{ height }" flex flex-col>
			<div absolute z-9000 wfull flex justify-end class="-right-1rem -top-1rem">
				<div bg="#255DF6" p-3 rounded="50%" @click="close">
					<img h2rem w2rem src="/images/common/close.png" alt="" />
				</div>
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
