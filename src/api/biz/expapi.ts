import {
	IExp,
	IExpAttachment,
	IExper,
	IExpLog,
	ILab,
} from '~/api/biz/types/exptypes'

export const getExpPage = (
	params: {
		labId?: null | number
		quotationId?: number
		pageNo: number
		pageSize: number
		stageArr: string[]
	} = {} as any,
): Promise<{ list: IExp[]; total: number }> =>
	request.post('/open-api/lab/project-category/page', params)
export const getLabPage = (): Promise<{ list: ILab[] }> =>
	request.get('/open-api/lab/laboratory-lab/page')

export const getExpDetail = (id: number): Promise<IExp> =>
	request.get('/open-api/lab/project-category/get', { id })

export const getLabExperPage = (params: {
	labId: number
}): Promise<{ list: IExper[] }> =>
	request.get('/open-api/lab/laboratory-user/page', params)

export const getExpLogPage = (
	params: { projectCategoryId: number } = { projectCategoryId: -1 },
): Promise<{ list: IExpLog[] }> =>
	request.get('/open-api/lab/exp-log/page', params)

export const getExpAttachmentPage = (
	params: { projectCategoryId: number; type?: string } = {
		projectCategoryId: -1,
	},
): Promise<{ list: IExpAttachment[] }> => {
	params.type = 'EXP'
	return request.get('/open-api/lab/exp-attachment/page', params)
}

export const updateExpStage = (params: {
	id: number
	stage: string
}): Promise<any> =>
	request.post('/open-api/lab/project-category/update-stage', params)
