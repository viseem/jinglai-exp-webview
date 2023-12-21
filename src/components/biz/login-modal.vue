<script setup lang="ts">
const modalStore = useModalStore()
const modalVisible = computed({
	get: () => modalStore.loginModalVisible,
	set: (v) => modalStore.setLoginModalVisible(v),
})
</script>

<template>
	<x-dialog v-model="modalVisible">
		<div wfull flex flex-col items-center justify-center>
			<x-title title="我是登录弹窗" text-center />
			<div class="mt-6">
				<a-input placeholder="请输入用户密码"></a-input>
			</div>
			<a-button type="primary" mt-10>登录</a-button>
		</div>
	</x-dialog>
</template>

<style scoped></style>
