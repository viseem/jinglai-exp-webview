<script setup lang="ts"></script>

<template>
	<div relative h5rem wfull flex bg="#F6F7FF" rounded-2>
		<div flex items-center justify-center w="40%" min-w="40%" p-2>
			<x-image wfull rounded-2 src="/logo.png" />
		</div>
		<div flex flex-col items-start justify-center>
			<x-text text="设备的名称" rows="1" />
			<x-text text="设备的功能描述阿打发斯蒂芬阿斯顿发斯蒂芬" rows="1" />
		</div>
		<div absolute right-2 top-2 flex items-center>
			<x-image size="1rem"></x-image>
			<div ml-1 text-3>忙碌</div>
		</div>
	</div>
</template>

<style scoped></style>
