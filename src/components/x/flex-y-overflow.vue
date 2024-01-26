<script setup lang="ts"></script>

<template>
	<div flex-1 overflow-y-auto>
		<div h0>
			<div>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
::-webkit-scrollbar {
	width: 10px;
	height: 4px;
	background-color: rgb(246, 247, 248);
	border-radius: 10px;
}

::-webkit-scrollbar-thumb {
	background-color: rgb(233, 236, 239, 0.8);
	border-radius: 10px;
}

::-webkit-scrollbar-track {
	background-color: rgb(246, 247, 248);
	border-radius: 10px;
}
</style>
