<template>
	<div border="10px solid green" flex flex-1 flex-col w="screen">
		<x-title class="mt-4 text-center text-4xl" title="选择实验室"></x-title>
		<div w-full flex flex-1 items-center justify-center>
			<a-spin :loading="loading">
				<div border="2px solid black" w-90rem p24px>
					<a-row :gutter="[24, 24]">
						<a-col v-for="item in labRes?.list" :key="item" :span="6">
							<biz-lab-card
								:title="item.name"
								class="h10rem w-full"
								border="1px solid red"
							/>
						</a-col>
					</a-row>
				</div>
			</a-spin>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getLabPage } from '~/api/biz/exp'
import { useRequest } from 'vue-request'
const { data: labRes, loading } = useRequest(getLabPage)
</script>

<style></style>
