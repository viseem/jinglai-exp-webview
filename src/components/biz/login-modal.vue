<script setup lang="ts">
const modalStore = useModalStore()
const modalVisible = computed({
	get: () => modalStore.loginModalVisible,
	set: (v) => modalStore.setLoginModalVisible(v),
})

const userStore = useUserStore()
const formData = ref({
	password: '',
})
async function loginClickHandler() {
	const userid = userStore.clickLoginUserid
	await login({ userid, password: formData.value.password })
}
</script>

<template>
	<x-dialog v-model="modalVisible">
		<div wfull flex flex-col items-center justify-center>
			<x-title title="我是登录弹窗" text-center />
			<div class="mt-6">
				<a-input
					v-model="formData.password"
					placeholder="请输入用户密码"
				></a-input>
			</div>
			<a-button type="primary" mt-10 @click="loginClickHandler">登录</a-button>
		</div>
	</x-dialog>
</template>

<style scoped></style>
