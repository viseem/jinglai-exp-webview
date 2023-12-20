import { IExp, IExper, ILab } from '~/api/biz/types/exptypes'

export const getExpPage = (
	params: { labId?: number } = {},
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

export const getLabDevicePage = (params: {
	labId: number
}): Promise<{ list: IExper[] }> =>
	request.get('/open-api/lab/laboratory-user/page', params)
