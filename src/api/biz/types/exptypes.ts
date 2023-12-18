import type { IUser } from '~/api/biz/types/basetypes'

export interface ILab {
	id: number
	name: string
	user: { nickname: string }
	mark: string
}

export interface ISop {
	content: string
}

export interface IExp {
	id?: number
	quotationId?: number
	name: string
	content: string
	sopDone: number
	sopTotal: number
	sopList: ISop[]
	status: string
	project: {
		manager: IUser
		sales: IUser
		name: string
		customer: { name: string }
	}
	operator: IUser
	focusList: IUser[]
	startDate: Date
	deadline: Date
	createTime: Date
}
