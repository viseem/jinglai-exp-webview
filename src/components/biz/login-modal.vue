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
	<x-dialog v-model="modalVisible" height="50rem">
		<div
			bg="#E9EEFC"
			m-4
			box-border
			wfull
			flex
			items-center
			justify-center
			rounded-2
		>
			<div>
				<img w35rem src="/images/login/bg.png" alt="" />
			</div>
			<div ml-10>
				<div class="login-form" h30rem w30rem rounded-2 p-16>
					<p text-2xl text-white>账号登录</p>
					<p mb-5 mt-10 text-white>账号</p>
					<a-input
						v-model="formData.password"
						disabled
						placeholder="请输入用户密码"
					></a-input>
					<p my-5 text-white>密码</p>
					<a-input
						v-model="formData.password"
						placeholder="请输入用户密码"
					></a-input>
					<a-button class="wfull" mt-10 @click="loginClickHandler"
						>登录</a-button
					>
				</div>
			</div>
		</div>
	</x-dialog>
</template>

<style scoped>
.login-form {
	background: linear-gradient(to right bottom, #1c7bd6, #2444d2);
	box-shadow: 0 0 1rem #777;
}
</style>
