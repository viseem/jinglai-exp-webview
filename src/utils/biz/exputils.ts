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
