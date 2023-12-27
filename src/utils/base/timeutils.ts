import dayjs from 'dayjs'

export function formatDate(
	date: Date | number | undefined,
	format?: string,
): string {
	// 日期不存在，则返回空
	if (!date) {
		return ''
	}
	// 日期存在，则进行格式化
	if (format === undefined) {
		format = 'YYYY-MM-DD'
	}
	return dayjs(date).format(format)
}

export function formatDateTime(
	date: Date | undefined,
	format?: string,
): string {
	// 日期不存在，则返回空
	if (!date) {
		return ''
	}
	// 日期存在，则进行格式化
	if (format === undefined) {
		format = 'YYYY-MM-DD HH:mm'
	}
	return dayjs(date).format(format)
}
