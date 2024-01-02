<template>
	<DndProvider :backend="TouchBackend">
		<DndPreview />
		<router-view />
	</DndProvider>
</template>
<script setup lang="ts">
import { DndProvider } from 'vue3-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
</script>
<style>
.arco-modal-body {
	overflow: visible !important;
}
.arco-btn-disabled {
	opacity: 0.3;
}
</style>
