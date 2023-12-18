export interface IQuotation {
	id: number
	code: string
	mark?: string | null
	planText?: string | null
	projectId: number
	customerId: number
	discount: number
}
