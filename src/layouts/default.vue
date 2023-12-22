<template>
	<!--<Navigation />-->
	<div class="h-screen w-screen flex flex-col items-center justify-center">
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>

	<!--	<div class="layout-container" relative>
		<div
			id="layoutBG"
			class="layout-bg"
			absolute
			box-border
			:style="{ height: baseHeight + 'px', width: baseWidth + 'px' }"
		>
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>-->
</template>

<script lang="ts" setup>
/*import { useScaleToFitScreen } from '~/utils/optimize/pageutils'
const baseWidth = 1920
const baseHeight = 1080
useScaleToFitScreen('layoutBG', baseWidth, baseHeight)*/
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.layout-container {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: red;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
}
.layout-bg {
	border: 1px solid green;
}
</style>
