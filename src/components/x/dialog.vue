<script setup lang="ts">
const visible = ref(false)
defineProps({
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
})
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
