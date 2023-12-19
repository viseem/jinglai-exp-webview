<script setup lang="ts">
import { IExp, ISop } from '~/api/biz/types/exptypes'
import { IQuotation } from '~/api/biz/types/quotationtypes'
import { booleanToSopStatus } from '~/utils/biz/exputils'

const expDialogRef = ref()
const formData = ref({} as IExp)
const quotationData = ref({} as IQuotation)
async function open(params: { id: number }) {
	if (params.id) {
		expDialogRef.value.open()
		formData.value.id = params.id
		// 获取任务详情
		await loadExpDetail()
		loadQuotationDetail()
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
		// res.sopList?.forEach((item) => {
		// 	item.status = sopStatusToBoolean(item.status)
		// })
		formData.value = res
	}
}

async function loadQuotationDetail() {
	if (formData.value.quotationId) {
		const res = await getQuotationDetail(formData.value.quotationId)
		quotationData.value = res
	}
}

async function sopStatusChange(item: ISop, _status: boolean) {
	const status = booleanToSopStatus(_status)
	await updateSopStatus({ id: item.id, status })
	toast.success('修改成功')
	item.status = status
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
							<x-title>实验方案</x-title>
							<div border="1px solid red" flex-1 overflow-y-auto p-2>
								<div h0>
									<div overflow-y-auto v-html="quotationData.planText"></div>
								</div>
							</div>
							<div min-h-10rem>
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
								<div flex flex-col>
									<a-checkbox
										v-for="item in formData?.sopList"
										:key="item"
										:model-value="sopStatusToBoolean(item.status)"
										@update:model-value="
											(v) => {
												sopStatusChange(item, v)
											}
										"
									>
										{{ item.status }}<span v-html="item.content"></span>
									</a-checkbox>
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
