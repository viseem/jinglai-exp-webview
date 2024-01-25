<script setup lang="ts">
import { IExp, IExpAttachment, IExpLog, ISop } from '~/api/biz/types/exptypes'
import { IQuotation } from '~/api/biz/types/quotationtypes'
import { booleanToSopStatus, sopStatusToBoolean } from '~/utils/biz/exputils'
import { updateExpStage } from '~/api/biz/expapi'
import dayjs from 'dayjs'

const modalStore = useModalStore()

const emit = defineEmits(['sop-change', 'exp-change'])
const userStore = useUserStore()
const expDialogRef = ref()
const isLoadDetail = ref(false)
const formData = ref({} as IExp)
const computedSopList = computed(() => {
	return formData.value?.sopList?.map((item) => {
		item.checked = sopStatusToBoolean(item.status)
		item.disabled = formData.value.operatorId !== userStore?.userinfo?.id
		return item
	})
})
const computedPreTodoList = computed(() => {
	return formData.value?.preTodoList?.map((item) => {
		item.checked = sopStatusToBoolean(item.status)
		item.disabled = formData.value.operatorId !== userStore?.userinfo?.id
		return item
	})
})
const computedExpStatusConfig = computed(
	() => EXP_STATUS_MAP?.[formData.value.stage],
)
const quotationData = ref({} as IQuotation)
async function open(params: { id: number; index: number }) {
	if (params.id) {
		expDialogRef.value.open()
		formData.value = {}
		quotationData.value = {}
		expLogs.value = []
		graphDatas.value = null
		referList.value = []

		formData.value.id = params.id
		setTimeout(async () => {
			loadExpLogs()
			loadExpAttachments()
			// 获取任务详情
			loadExpDetail().then(() => {
				isLoadDetail.value = true
				formData.value.index = params.index
				loadQuotationDetail()
				loadGrapDatas()
			})
		})
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
		processReferFiles()
	}
}

async function loadQuotationDetail() {
	quotationData.value = {}
	if (formData.value.quotationId) {
		const res = await getQuotationDetail(formData.value.quotationId)
		quotationData.value = res
	}
}

/*
 * 参考资料
 * */
const referList = ref([])
const processReferFiles = () => {
	referList.value = []
	const dicts = [
		{
			sort: 1,
			label: '需求快照',
			value: '4',
			dictType: 'name_item_reference_type',
			status: 0,
			colorType: '',
			cssClass: '',
			remark: '',
			id: 1403,
			createTime: 1689232497000,
		},
		{
			sort: 2,
			label: '结果参考',
			value: '2',
			dictType: 'name_item_reference_type',
			status: 0,
			colorType: '',
			cssClass: '',
			remark: '',
			id: 1323,
			createTime: 1685672266000,
		},
		{
			sort: 3,
			label: '交付标准',
			value: '3',
			dictType: 'name_item_reference_type',
			status: 0,
			colorType: '',
			cssClass: '',
			remark: '',
			id: 1324,
			createTime: 1685672277000,
		},
		{
			sort: 4,
			label: '参考文献',
			value: '1',
			dictType: 'name_item_reference_type',
			status: 0,
			colorType: '',
			cssClass: '',
			remark: '',
			id: 1322,
			createTime: 1685672246000,
		},
	]
	processAttachmentsByType(formData.value?.attachmentList, dicts)
	referList.value = dicts
}
const processAttachmentsByType = (list, referDicts) => {
	list?.forEach((attachment) => {
		referDicts?.forEach((item) => {
			if (!item.files) {
				item.files = []
			}
			if (item.value == attachment?.type) {
				item.files.push(attachment)
			}
		})
	})
}

/*
 * 处理实验脑图
 * */
const graphDatas = ref(null)
async function loadGrapDatas() {
	graphDatas.value = null
	const res = await getExpPage({
		quotationId: formData.value?.quotationId,
	})
	graphDatas.value = convertApiData2GraphDependData(
		JSON.parse(JSON.stringify(res?.list)),
		formData.value.project?.name,
	) as any
}

/*
 * 实验内容tab切换
 * */
const demandTab = ref(1)

/*
 * 加载 实验记录
 * */
const expLogs = ref([] as IExpLog[])
async function loadExpLogs() {
	expLogs.value = []
	if (formData.value.id) {
		const res = await getExpLogPage({ projectCategoryId: formData.value.id })
		expLogs.value = res?.list
	}
}

/*
 * 加载 实验数据
 * */
const expAttachments = ref([] as IExpAttachment[])
async function loadExpAttachments() {
	expAttachments.value = []
	if (formData.value.id) {
		const res = await getExpAttachmentPage({
			projectCategoryId: formData.value.id,
		})
		expAttachments.value = res?.list
	}
}

/*
 * 更改实验状态
 * */
const statusLoading = ref(false)
async function changeStatusHandler(stage: string) {
	statusLoading.value = true
	await updateExpStage({ id: formData.value.id, stage }).finally(() => {
		statusLoading.value = false
	})
	formData.value.stage = stage
	emit('exp-change', formData.value)
	toast.success('操作成功')
}

/*
 * 实验sop状态更改
 * */
const sopStatusLoading = ref(false)
async function sopStatusChange(_status: boolean, item: ISop) {
	sopStatusLoading.value = true
	const status = booleanToSopStatus(_status)
	await updateSopStatus({
		id: item.id,
		status,
		projectCategoryId: formData.value.id,
	}).finally(() => {
		sopStatusLoading.value = false
	})
	// toast.success('修改成功')
	item.status = status
	formData.value.sopDone += _status ? 1 : -1
	emit('sop-change', formData.value)
}

/*
 * 预检项相关
 * */
function preCheckClickHandler() {
	modalStore.setExpPreCheckModalConfig({
		list: computedPreTodoList,
		exp: { id: formData.value.id },
	})
	modalStore.setExpPreCheckModalVisible(true)
}
function preCheckUpdateHandler(checked: boolean, index?: number) {
	if (formData.value?.preTodoList?.[index] === undefined) {
		return
	}

	formData.value.preTodoList[index].status = booleanToSopStatus(checked)
	modalStore.setExpPreCheckModalConfig({
		list: computedPreTodoList,
		exp: { id: formData.value.id },
	})
	formData.value.preTodoDone += checked ? 1 : -1
	emit('exp-change', formData.value)
}
</script>

<template>
	<biz-exp-pre-check-modal @success="preCheckUpdateHandler" />
	<x-dialog ref="expDialogRef" width="95%" height="95vh">
		<div class="wfull" m-3 flex flex-col rounded-2 p-5 bg="#EAEDF0">
			<div flex items-center justify-between>
				<div h3rem flex items-center>
					<span class="text-nowrap fw700" mr-10 text-xl>{{
						formData.name
					}}</span>
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
				<div v-if="computedExpStatusConfig?.name" mr-8 flex items-center>
					<div
						mr-12
						:style="{
							color: computedExpStatusConfig?.color,
						}"
					>
						{{ computedExpStatusConfig?.name }}
					</div>
					<div flex gap-6>
						<a-button
							:disabled="
								computedExpStatusConfig?.status === EXP_STATUS_MAP.DOING.status
							"
							rounded="!4"
							px="!6"
							style="background: linear-gradient(to right, #2b58f6, #0779f5)"
							text="!white"
							:loading="statusLoading"
							@click="changeStatusHandler(EXP_STATUS_MAP.DOING.status)"
							>启动</a-button
						>
						<a-button
							:loading="statusLoading"
							:disabled="
								computedExpStatusConfig?.status === EXP_STATUS_MAP.PAUSE.status
							"
							rounded="!4"
							px="!6"
							style="background: linear-gradient(to right, #f19406, #e3a61e)"
							text="!white"
							@click="changeStatusHandler(EXP_STATUS_MAP.PAUSE.status)"
							>暂停</a-button
						>
					</div>
				</div>
			</div>
			<div h1rem flex items-center>
				<div flex items-center gap-4>
					<span text-sm>{{ formatDate(formData.startDate) }}</span>
					<div class="w15rem" flex>
						<!--						<x-progress
							v-if="formData.startDate || formData.deadline"
							:stroke-width="8"
						/>-->
						<x-progress
							:stroke-width="8"
							:start-date="dayjs(formData.startDate).valueOf()"
							:end-date="dayjs(formData.deadline).valueOf()"
						/>
					</div>
					<span text-sm>{{ formatDate(formData.deadline) }}</span>
				</div>
			</div>
			<div box-border flex-1>
				<a-row box-border :gutter="[20]" hfull>
					<a-col hfull :span="8">
						<div hfull flex flex-col>
							<div class="content-card-title">实验方案</div>
							<div class="content-card" flex-1 overflow-y-auto p-2>
								<div h0>
									<div
										overflow-y-auto
										pb-4
										v-html="quotationData.planText"
									></div>
								</div>
							</div>
						</div>
					</a-col>
					<a-col hfull :span="8">
						<div hfull flex flex-col>
							<div class="h-[30%]" flex flex-col>
								<div class="content-card-title" flex justify-between>
									<span>实验内容</span>
									<div>
										<a-radio-group v-model="demandTab" type="button">
											<a-radio :value="1">客户需求</a-radio>
											<a-radio :value="2">实验内容</a-radio>
										</a-radio-group>
									</div>
								</div>
								<div class="content-card !p-2" hfull>
									<x-flex-y-overflow hfull flex-1>
										<div
											v-show="demandTab == 1"
											class=""
											p-2
											v-html="formData.demand"
										></div>
										<div
											v-show="demandTab == 2"
											class=""
											p-2
											v-html="formData.content"
										></div>
									</x-flex-y-overflow>
								</div>
							</div>
							<div flex flex-1 flex-col>
								<div class="content-card-title">关键节点</div>
								<div class="content-card" hfull>
									<a-spin dot hfull wfull :loading="sopStatusLoading">
										<x-flex-y-overflow hfull flex-1>
											<div flex flex-col ml="-1">
												<x-checkbox
													:list="computedSopList"
													@update="sopStatusChange"
												>
													<template #content="{ item }">
														<span v-html="item.content"></span>
													</template>
												</x-checkbox>
											</div>
										</x-flex-y-overflow>
									</a-spin>
								</div>
							</div>
							<div min-h="12rem" flex flex-col>
								<div class="content-card-title">参考资料</div>
								<div flex-1 class="content-card">
									<div>
										<a-descriptions column>
											<a-descriptions-item
												v-for="refer in referList"
												:key="refer"
												:label="refer.label"
											>
												<div flex gap-2>
													<template
														v-for="file in refer?.files || []"
														:key="file"
													>
														<x-file-link
															width="8rem"
															:url="file.fileUrl"
															:name="file.fileName"
														></x-file-link>
													</template>
												</div>
											</a-descriptions-item>
										</a-descriptions>
									</div>
								</div>
							</div>
						</div>
					</a-col>
					<a-col hfull :span="8">
						<div hfull flex flex-col>
							<div flex flex-1 flex-col>
								<div class="content-card-title" flex justify-between>
									<span>实验总览</span>
									<div
										v-if="isLoadDetail"
										text="#017FF5"
										flex
										cursor-pointer
										items-center
										@click="preCheckClickHandler()"
									>
										<span>预检项：</span>
										<div>
											{{ formData.preTodoDone }}/{{ formData.preTodoTotal }}
										</div>
									</div>
								</div>
								<div class="content-card" flex-1>
									<biz-exp-graph v-if="graphDatas" :list="graphDatas" />
								</div>
							</div>
							<div class="h-[30%]" flex flex-col>
								<div class="content-card-title">实验记录</div>
								<div class="content-card" hfull>
									<x-flex-y-overflow hfull flex-1>
										<div class="">
											<biz-exp-log
												v-for="item in expLogs"
												:key="item"
												:item="item"
												mb="0.5rem"
											></biz-exp-log>
										</div>
									</x-flex-y-overflow>
								</div>
							</div>
							<div class="h-[30%]" flex flex-col>
								<div class="content-card-title">实验数据</div>
								<div class="content-card" hfull>
									<x-flex-y-overflow hfull flex-1 m="-5px" p-5px>
										<div>
											<biz-exp-attachment
												v-for="item in expAttachments"
												:key="item"
												:item="item"
												mb4
											/>
										</div>
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
	box-shadow: 0 0 20px #e3e6e9;
	background: white;
	position: relative;
	border-radius: theme('borderRadius.DEFAULT');
	padding: 1rem;
}
.content-card-title {
	height: 3.5rem;
	min-height: 3.5rem;
	margin: 0 !important;
	padding: 0 !important;
	overflow: hidden;
	display: flex;
	align-items: center;
	font-weight: 900;
}
</style>
