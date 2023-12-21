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
	<div
		relative
		wfull
		overflow-hidden
		rounded-2
		bg-white
		p2
		@click="cardClickHandler"
	>
		<div wfull>
			<!--顶部-->
			<div flex items-center justify-between class="text-sm">
				<div flex items-center>
					<x-image size="2rem" circle :src="item.user?.avatar" />
					<x-title
						ml-2
						text-sm
						class="fw-700"
						w="4rem"
						:title="item.user?.nickname"
					></x-title>
				</div>
				<div flex items-center>
					<span>在做：</span>
					<span>10</span>
				</div>
				<div flex items-center>
					<span>未做：</span>
					<span>10</span>
				</div>
				<div
					rounded-4
					px-2.5
					py-0.5
					text-white
					class="card-btn"
					@click.stop="loginHandler"
				>
					登录
				</div>
			</div>
			<div flex-1 p-2 pb-0>
				<x-text class="h-2rem text-sm !lh-3.6" rows="2" :text="item.mark" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.card-btn {
	background: linear-gradient(to right, #2a59f6, #0879f5);
}
</style>
