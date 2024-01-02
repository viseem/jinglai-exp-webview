<template>
	<DndProvider :backend="TouchBackend">
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
</style>
