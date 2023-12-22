<script setup lang="ts">
import { IExp, ISop } from '~/api/biz/types/exptypes'
import { IQuotation } from '~/api/biz/types/quotationtypes'
import { booleanToSopStatus } from '~/utils/biz/exputils'
import { formatDate } from '../../utils/base/timeutils'

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
	<x-dialog ref="expDialogRef" width="70%">
		<div class="wfull" flex flex-col p-6>
			<div flex items-center>
				<span class="text-nowrap fw700" mr-10 text-xl>{{ formData.name }}</span>
				<x-descriptions>
					<x-descriptions-item margin-bottom="" label="客户">{{
						formData.project?.customer?.name
					}}</x-descriptions-item>
					<x-descriptions-item margin-bottom="" label="项目">{{
						formData.project?.name
					}}</x-descriptions-item>
					<x-descriptions-item margin-bottom="" label="责任人">{{
						formData.operator?.nickname
					}}</x-descriptions-item>
					<x-descriptions-item margin-bottom="" label="实验员">{{
						formData.focusList?.map((item) => item.nickname).join(',')
					}}</x-descriptions-item>
				</x-descriptions>
			</div>
			<div mb-4 mt-2>
				<div flex items-center gap-4>
					<span text-sm>{{ formatDate(formData.startDate) }}</span>
					<div class="w15rem" flex>
						<x-progress :stroke-width="8" />
					</div>
					<span text-sm>{{ formatDate(formData.deadline) }}</span>
				</div>
			</div>
			<div box-border flex-1>
				<a-row box-border :gutter="[20]" hfull>
					<a-col hfull :span="10">
						<div hfull flex flex-col>
							<p pb-4>实验方案</p>
							<div class="content-card" flex-1 overflow-y-auto p-2>
								<div h0>
									<div overflow-y-auto v-html="quotationData.planText"></div>
								</div>
							</div>
						</div>
					</a-col>
					<a-col hfull :span="7">
						<div hfull flex flex-col>
							<div class="h-[30%]" flex flex-col>
								<p pb-4>实验内容</p>
								<div class="content-card" hfull>
									<x-flex-y-overflow hfull flex-1>
										<div class="" v-html="formData.content"></div>
									</x-flex-y-overflow>
								</div>
							</div>
							<div flex flex-1 flex-col>
								<p py-4>关键节点</p>
								<div class="content-card" hfull>
									<x-flex-y-overflow hfull flex-1>
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
												<span v-html="item.content"></span>
											</a-checkbox>
										</div>
									</x-flex-y-overflow>
								</div>
							</div>
							<div min-h="8rem" flex flex-col>
								<span py-4>参考资料</span>
								<div flex-1 class="content-card">这是参考资料</div>
							</div>
						</div>
					</a-col>
					<a-col hfull :span="7">
						<div hfull flex flex-col>
							<div flex flex-1 flex-col>
								<p pb-4>实验总览</p>
								<div class="content-card" flex-1>这里是实验总览</div>
							</div>
							<div class="h-[30%]" flex flex-col>
								<p py-4>实验记录</p>
								<div class="content-card" hfull>
									<x-flex-y-overflow hfull flex-1>
										<div class="" v-html="formData.content"></div>
									</x-flex-y-overflow>
								</div>
							</div>
							<div class="h-[30%]" flex flex-col>
								<p py-4>实验数据</p>
								<div class="content-card" hfull>
									<x-flex-y-overflow hfull flex-1>
										<div class="" v-html="formData.content"></div>
									</x-flex-y-overflow>
								</div>
							</div>
						</div>
					</a-col>
				</a-row>
			</div>
		</div>
	</x-dialog>
</template>

<style scoped>
.content-card {
	box-shadow: 0 0 10px #e3e6e9;
	background: white;
	position: relative;
	border-radius: theme('borderRadius.DEFAULT');
	padding: 1rem;
}
</style>
