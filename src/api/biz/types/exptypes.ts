import type { IUser } from '~/api/biz/types/basetypes'

export interface ILab {
	id: number
	name: string
	user: { nickname: string }
	mark: string
}

export interface ISop {
	createTime: 1702884490000
	updateTime: 1702884490000
	creator: 145
	updater: 145
	deleted: false
	tenantId: 0
	id: 1431
	projectCategoryId: 920
	categoryId: null
	content: '<p>超长的关键节点，超长的关键节点，超长的关键节点，超长的关键节点，超长的关键节点，非常的长的关键节点，非常的长的关键节点，非常的长的关键节点</p>'
	step: 1
	mark: string
	status: string
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
