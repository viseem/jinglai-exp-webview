<script setup lang="ts">
import dayjs from 'dayjs'
import { IWeather } from '~/api/biz/thirdapi'
import { computed } from 'vue'

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
const computedUserinfo = computed(() => userStore.userinfo)
async function logoutClickHandler() {
	await toast.confirm('确认退出吗？')
	userStore.logout()
}
</script>

<template>
	<div
		class="title-container"
		relative
		h4.5rem
		flex
		items-center
		justify-between
		px-8
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
			<span class="text-6" style="letter-spacing: 0.1rem">{{
				currentLab?.name
			}}</span>
		</div>
		<div flex items-center>
			<a-dropdown>
				<div v-if="computedUserinfo?.id" flex items-center>
					<x-image
						border="2px solid white"
						circle
						h2.5rem
						w2.5rem
						:src="computedUserinfo.avatar"
						:preview="false"
					></x-image>
					<span relative z-10 ml-2 text-base>{{
						computedUserinfo.nickname
					}}</span>
				</div>
				<template #content>
					<a-doption>
						<div w4rem text-center @click="logoutClickHandler">退出</div>
					</a-doption>
				</template>
			</a-dropdown>
			<a-button size="small" class="ml-10 !rounded-4" @click="test"
				>选择实验室</a-button
			>
		</div>
	</div>
</template>

<style scoped>
.title-container {
	background: linear-gradient(to right, #017ef5, #2e54f6 65%);
}
</style>
