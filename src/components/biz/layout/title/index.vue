<script setup lang="ts">
import dayjs from 'dayjs'
import { IWeather } from '~/api/biz/thirdapi'

const modalStore = useModalStore()
const labStore = useLabStore()
const currentLab = computed(() => labStore.getCurrentLab)

function test() {
	modalStore.openLabModal()
}

/*
 * 系统时间
 * */
const systemTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const sysTimeInterval = setInterval(() => {
	systemTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000)

/*
 * 系统天气
 * */
const systemWeather = ref({} as IWeather)

async function loadWeather() {
	const res = await getWeather()
	systemWeather.value = res
}

loadWeather()
onUnmounted(() => {
	clearInterval(sysTimeInterval)
})
const userStore = useUserStore()
const comutedUserinfo = computed(() => userStore.userinfo)
</script>

<template>
	<div
		class="title-container"
		relative
		h4.5rem
		flex
		items-center
		justify-between
		px-4
		text-white
	>
		<div flex items-center text-base>
			<span>{{ systemTime }}</span>
			<div ml-6 flex items-center>
				<img w1.5rem :src="getWeatherIcon(systemWeather.dayweather)" alt="" />
				<div ml-1 mr-2>{{ systemWeather.dayweather }}</div>
				<div>{{ systemWeather.nighttemp }} - {{ systemWeather.daytemp }} ℃</div>
			</div>
		</div>
		<div absolute left-0 top-0 hfull wfull flex items-center justify-center>
			<x-title
				w="40%"
				:title="currentLab?.name"
				text-center
				class="!text-white"
				style="letter-spacing: 0.2rem"
			></x-title>
		</div>
		<div flex items-center>
			<a-button class="mr-4 !rounded-4" @click="test">选择实验室</a-button>
			<div flex items-center>
				<span mr-4 text-base>{{ comutedUserinfo.nickname }}</span>
				<x-image size="2.5rem" circle :src="comutedUserinfo.avatar"></x-image>
			</div>
		</div>
	</div>
</template>

<style scoped>
.title-container {
	background: linear-gradient(to right, #017ef5, #2e54f6 65%);
}
</style>
