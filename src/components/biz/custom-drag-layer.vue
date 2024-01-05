<script setup lang="ts">
import { useDragLayer, XYCoord } from 'vue3-dnd'
import { toRefs } from '@vueuse/core'
function snapToGrid(x: number, y: number): [number, number] {
	const snappedX = Math.round(x / 32) * 32
	const snappedY = Math.round(y / 32) * 32
	return [snappedX, snappedY]
}
function getItemStyles(
	initialOffset: XYCoord | null,
	currentOffset: XYCoord | null,
	isSnapToGrid: boolean = false,
) {
	if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		}
	}
	console.log('2222')

	let { x, y } = currentOffset

	if (isSnapToGrid) {
		x -= initialOffset.x
		y -= initialOffset.y
		;[x, y] = snapToGrid(x, y)
		x += initialOffset.x
		y += initialOffset.y
	}

	const transform = `translate(${x}px, ${y}px)`
	return {
		transform,
	}
}
const collect = useDragLayer((monitor) => ({
	item: monitor.getItem(),
	itemType: monitor.getItemType(),
	initialOffset: monitor.getInitialSourceClientOffset(),
	currentOffset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging(),
}))
const { item, initialOffset, currentOffset } = toRefs(collect)
const userStore = useUserStore()
</script>

<template>
	<div class="pointer-events-none fixed left-0 top-0 z-100 hfull wfull">
		<div :style="getItemStyles(initialOffset, currentOffset)">
			<biz-exp-card
				v-if="item?.item?.id && item.item.operatorId == userStore.userinfo?.id"
				w22rem
				:item="item.item"
			/>
		</div>
	</div>
</template>
