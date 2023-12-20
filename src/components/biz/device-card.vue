<script setup lang="ts"></script>

<template>
	<div relative h5rem wfull flex border="1px solid green">
		<div flex items-center justify-center w="40%" p-2>
			<x-image wfull src="/logo.png" />
		</div>
		<div flex flex-col items-start justify-center>
			<x-title title="设备的名称" />
			<x-text text="设备的功能描述阿打发斯蒂芬阿斯顿发斯蒂芬" rows="2" />
		</div>
		<div absolute right-2 top-2 flex items-center>
			<div h0.5rem w0.5rem rounded="50%" bg="red"></div>
			<div ml-1 text-3>忙碌</div>
		</div>
	</div>
</template>

<style scoped></style>
