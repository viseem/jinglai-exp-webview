<template>
	<DndProvider :backend="TouchBackend">
		<router-view />
	</DndProvider>
</template>
<script setup lang="ts">
import { DndProvider } from 'vue3-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
// import { HTML5Backend } from 'react-dnd-html5-backend'
</script>
<style>
.arco-modal-body {
	overflow: visible !important;
}
.arco-btn-disabled {
	opacity: 0.3;
}
</style>
