<script setup lang="ts">
import { IExp } from '~/api/biz/types/exptypes'

const expDialogRef = ref()
const formData = ref({} as IExp)
function open(params: { id: number }) {
	if (params.id) {
		expDialogRef.value.open()
		formData.value.id = params.id
		// 获取任务详情
		loadExpDetail()
	}
}
function close() {
	expDialogRef.value.close()
}

defineExpose({
	open,
	close,
})

async function loadExpDetail() {
	if (formData.value.id) {
		const res = await getExpDetail(formData.value.id)
		formData.value = res
	}
}
</script>

<template>
	<x-dialog ref="expDialogRef" width="70%" background="lightgreen">
		<div class="wfull" flex flex-col>
			<x-title :title="formData.name" text-xl class="fw700" />
			<x-descriptions>
				<x-descriptions-item label="客户">{{
					formData.project?.customer?.name
				}}</x-descriptions-item>
				<x-descriptions-item label="项目">{{
					formData.project?.name
				}}</x-descriptions-item>
				<x-descriptions-item label="责任人">{{
					formData.operator?.nickname
				}}</x-descriptions-item>
				<x-descriptions-item label="实验员">{{
					formData.focusList?.map((item) => item.nickname).join(',')
				}}</x-descriptions-item>
			</x-descriptions>
			<div box-border flex-1 border="1px solid green">
				<a-row box-border :gutter="[20]" hfull>
					<a-col hfull :span="10">
						<div hfull flex flex-col>
							<div flex-1 p-2 border="1px solid red">
								<x-title>实验方案</x-title>
								<div>这里是实验方案</div>
							</div>
							<div>
								<x-title>客户需求</x-title>
								<div>这是客户需求</div>
							</div>
						</div>
					</a-col>
					<a-col hfull :span="7">
						<div hfull flex flex-col p-2 border="1px solid red">
							<div class="h-[30%]">
								<x-title title="实验内容" />
								<div v-html="formData.content"></div>
							</div>
							<div flex-1 border="1px solid purple">
								<x-title title="关键节点" />
								<div>
									<p>这是关键节点1</p>
									<p>这是关键节点2</p>
								</div>
							</div>
							<div>
								<x-title>参考资料</x-title>
								<div>这是参考资料</div>
							</div>
						</div>
					</a-col>
					<a-col hfull :span="7">
						<div hfull flex flex-col p-2 border="1px solid red">
							<div flex-1 border="1px solid blue">
								<x-title>实验总览</x-title>
								<div>这里是实验总览</div>
							</div>
							<div class="h-[30%]" border="1px solid yellow">
								<x-title>实验记录</x-title>
								<div>这里是实验记录</div>
							</div>
							<div class="h-[30%]">
								<x-title>实验数据</x-title>
								<div>这里是实验数据</div>
							</div>
						</div>
					</a-col>
				</a-row>
			</div>
		</div>
	</x-dialog>
</template>

<style scoped></style>
