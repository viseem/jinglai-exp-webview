import type { IUser } from '~/api/biz/types/basetypes'

export interface ILab {
	id: number
	name: string
	user: IUser
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
	index?: number
	id: number
	quotationId?: number
	name: string
	content: string
	sopDone: number
	sopTotal: number
	sopList: ISop[]
	stage: string
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
	attachmentList: any[]
	color: string
}

export interface IExpAttachment {
	fileUrl: string
	fileName: string
	mark: string
	expType: string
	createTime: number
}

export interface IExpLog {
	id: number
	projectId: number
	projectCategoryId: number
	categoryId: number
	operatorId: number
	operator: IUser
	mark: string
	score: string
	attachments: IExpAttachment[]
}

export interface IExper {
	notDoCount: number
	doingCount: number
	labId: 20
	userId: 139
	mark: null
	rank: '高级'
	id: 29
	createTime: 1692923017000
	user: {
		createTime: 1692857784000
		updateTime: 1692950428000
		creator: 1
		updater: null
		deleted: true
		tenantId: 0
		id: 139
		username: 'wangming'
		password: '$2a$04$FVOuPP3RgNTd5NL73YLudONWTY6kVn1hfq8sVwoDJ4mnBKsHCTqBC'
		nickname: '张晨'
		remark: ''
		deptId: 113
		postIds: '[]'
		email: ''
		mobile: '13029878782'
		sex: 0
		avatar: ''
		status: 0
		loginIp: '192.168.18.213'
		loginDate: 1692945433000
	}
	lab: {
		createTime: 1688632441000
		updateTime: 1701072428000
		creator: 126
		updater: 126
		deleted: false
		tenantId: 0
		id: 20
		name: '北京实验室'
		userId: 132
		user: {
			createTime: 1685959802000
			updateTime: 1699856251000
			creator: 1
			updater: 132
			deleted: false
			tenantId: 0
			id: 132
			username: string
			password: string
			nickname: string
			remark: ''
			deptId: 112
			postIds: '[]'
			email: 'jiameng@jinglaishengwu.com'
			mobile: '17710037381'
			sex: 1
			avatar: ''
			status: 0
			loginIp: '123.120.2.116'
			loginDate: 1699856030000
		}
		mark: '动物实验室的备注'
	}
}
