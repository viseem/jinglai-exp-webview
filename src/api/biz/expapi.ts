import { IExp, IExper, IExpLog, ILab } from '~/api/biz/types/exptypes'

export const getExpPage = (
	params: { labId?: null | number; quotationId?: number } = {},
): Promise<{ list: IExp[] }> =>
	request.get('/open-api/lab/project-category/page', params)
export const getLabPage = (): Promise<{ list: ILab[] }> =>
	request.get('/open-api/lab/laboratory-lab/page')

export const getExpDetail = (id: number): Promise<IExp> =>
	request.get('/open-api/lab/project-category/get', { id })

export const getLabExperPage = (params: {
	labId: number
}): Promise<{ list: IExper[] }> =>
	request.get('/open-api/lab/laboratory-user/page', params)

export const getExpLogPage = (
	params: { projectCategoryId: number } = {},
): Promise<{ list: IExpLog[] }> =>
	request.get('/open-api/lab/exp-log/page', params)

export const updateExpStage = (params: {
	id: number
	stage: string
}): Promise<any> =>
	request.post('/open-api/lab/project-category/update-stage', params)
