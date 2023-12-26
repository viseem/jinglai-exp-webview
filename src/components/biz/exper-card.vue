<script setup lang="ts">
import { PropType } from 'vue'
import { IExper } from '~/api/biz/types/exptypes'
const modalStore = useModalStore()
const userStore = useUserStore()
const props = defineProps({
	item: {
		type: Object as PropType<IExper>,
		default: () => {},
	},
	selected: {
		type: Boolean,
		default: false,
	},
	logined: {
		type: Boolean,
		default: false,
	},
})

const computedSelected = computed(() => {
	return props.selected
})

const computedLogined = computed(() => {
	return props.logined
})

function cardClickHandler() {
	console.log(9999)
}

function loginHandler(item: IExper) {
	userStore.setClickLoginUserid(item.userId)
	userStore.setClickLoginExper(item)
	modalStore.setLoginModalVisible(true)
}
</script>

<template>
	<div
		relative
		wfull
		cursor-pointer
		overflow-hidden
		rounded-2
		bg-white
		p4
		transition="all 0.3s ease"
		:class="computedSelected ? 'card-active' : 'card-inactive'"
		@click="cardClickHandler"
	>
		<div wfull flex items-center justify-between>
			<!--顶部-->
			<x-image circle h3rem w3rem :src="item.user?.avatar" @click.stop />
			<div mx-6 flex flex-1 flex-col justify-between>
				<div flex items-center justify-between class="text-sm">
					<div flex items-center>
						<x-text
							text-sm
							w="6rem"
							:class="computedSelected ? 'text-active' : ''"
							:text="item.user?.nickname"
						></x-text>
					</div>
					<div flex items-center>
						<span>在做：</span>
						<span>{{ item.doingCount }}</span>
					</div>
					<div flex items-center>
						<span>未做：</span>
						<span>{{ item.notDoCount }}</span>
					</div>
				</div>
				<div>
					<x-text
						:class="computedSelected ? 'text-active' : ''"
						text-sm
						class="!text-[#666]"
						rows="1"
						:text="item.mark"
					/>
				</div>
			</div>
			<div
				:style="computedLogined ? 'opacity:0;z-index:-1;' : ''"
				:class="computedSelected ? 'btn-active' : ''"
				relative
				cursor-pointer
				rounded-4
				px-4
				py-0.8
				text-sm
				text-white
				class="card-btn"
				@click.stop="loginHandler(item)"
			>
				登录
			</div>
		</div>
	</div>
</template>

<style scoped>
.card-btn {
	background: linear-gradient(to right, #2a59f6, #0879f5);
}
.btn-active {
	background: white;
	color: #2a59f6;
}
.card-active {
	background: linear-gradient(to right, #2a59f6, #0879f5);
	color: white;
}
.text-active {
	color: white;
}
.card-inactive {
}
</style>
