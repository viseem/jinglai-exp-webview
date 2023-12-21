<script setup lang="ts">
const labStore = useLabStore()
const currentLab = computed(() => labStore.getCurrentLab)
</script>

<template>
	<div>
		<x-descriptions-item label="负责人">
			<div ml-4 flex items-center>
				<x-image circle :src="currentLab.user?.avatar" size="2rem"></x-image>
				<span ml-2>{{ currentLab.user?.nickname }}</span>
			</div>
		</x-descriptions-item>
		<x-text h5rem rows="5" :text="currentLab.mark"></x-text>
	</div>
</template>

<style scoped></style>
