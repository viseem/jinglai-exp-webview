<script setup lang="ts">
import { PropType } from 'vue'
import { IExper } from '~/api/biz/types/exptypes'
const modalStore = useModalStore()
defineProps({
	item: {
		type: Object as PropType<IExper>,
		default: () => {},
	},
})

function cardClickHandler() {
	console.log(9999)
}

function loginHandler() {
	modalStore.setLoginModalVisible(true)
}
</script>

<template>
	<div class="exp-card-container relative" wfull p2 @click="cardClickHandler">
		<div absolute right-2 top-2 @click.stop="loginHandler">登录</div>

		<div wfull flex items-center justify-start>
			<div>
				<x-image circle :src="item.user?.avatar" />
			</div>
			<div ml-2 flex-1>
				<x-title class="text-base fw700" :title="item.user?.nickname"></x-title>
				<x-text class="h-2rem text-xs !lh-3.6" rows="2" :text="item.mark" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.exp-card-container {
	box-shadow: 0 0 3px #ccc;
	border-radius: theme('borderRadius.sm');
}
</style>
