<script setup lang="ts">
// ----静态数据
const expStatusList = [
	{ name: '待开展', status: 'UNDO' },
	{ name: '已暂停', status: 'PAUSE' },
	{ name: '进行中', status: 'DOING' },
	{ name: '数据审核', status: 'DATA_CHECK' },
	{ name: '已出库', status: 'DONE' },
]
</script>

<template>
	<div hfull wfull flex flex-col>
		<div w-full flex flex-1 items-center justify-center>
			<div border="2px solid black" hfull wfull flex gap-4 p-4>
				<div
					v-for="item in expStatusList"
					:key="item"
					hfull
					wfull
					border="1px solid green;"
				>
					<x-title :title="item.name" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
