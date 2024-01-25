export const SOP_STATUS = {
	未做: 'NOT_DONE',
	已做: 'DONE',
}
export function sopStatusToBoolean(status: string) {
	return status === SOP_STATUS.已做
}

export function booleanToSopStatus(status: boolean) {
	return status ? SOP_STATUS.已做 : SOP_STATUS.未做
}

export const EXP_STATUS_MAP = {
	'0': {
		name: '待开展',
		status: '0',
		color: '#878C9F',
		icon: 'images/expstatus/not-do.png',
	},
	DOING: {
		name: '进行中',
		status: 'DOING',
		color: '#2E55F6',
		icon: 'images/expstatus/doing.png',
	},
	PAUSE: {
		name: '已暂停',
		status: 'PAUSE',
		color: '#E2611F',
		icon: 'images/expstatus/doing.png',
	},
	DATA_CHECK: {
		name: '数据审核',
		status: 'DATA_CHECK',
		color: '#E88B00',
		icon: 'images/expstatus/doing.png',
	},
	DATA_ACCEPT: {
		name: '数据审核通过',
		status: 'DATA_ACCEPT',
		color: '#20CB42',
		icon: 'images/expstatus/doing.png',
	},
	DATA_REJECT: {
		name: '数据审核驳回',
		status: 'DATA_REJECT',
		color: '#E21F1F',
		icon: 'images/expstatus/doing.png',
	},
	DONE: {
		name: '已完成',
		status: 'DONE',
		color: '#00495e',
		icon: 'images/expstatus/outed.png',
	},
	Z_COMPLETE: {
		name: '已出库',
		status: 'Z_COMPLETE',
		color: '#01C3F5',
		icon: 'images/expstatus/outed.png',
	},
}

export const convertScheduleData2GraphDependData = (data) => {
	return data?.map((item) => {
		item.uid = '2-' + item.id
		item.oid = item.id
		delete item.id
		return {
			...item,
			dependIds: [],
			name: item.name,
			child: item?.sopList?.map((sop) => {
				sop.uid = '3-' + sop.id
				sop.oid = sop.id
				delete sop?.id
				return {
					...sop,
					name: sop.content,
					level: 3,
					dependIds: [],
				}
			}),
			level: 2,
		}
	})
}

export const convertApiData2GraphDependData = (data, rootName) => {
	if (!rootName) {
		rootName = '根节点'
	}
	return {
		root: { name: rootName },
		child: convertScheduleData2GraphDependData(data),
	}
}
