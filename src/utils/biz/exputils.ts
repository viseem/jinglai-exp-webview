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
	COMPLETE: {
		name: '已出库',
		status: 'COMPLETE',
		color: '#20CB42',
		icon: 'images/expstatus/outed.png',
	},
}
