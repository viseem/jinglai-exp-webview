import { IExp, ILab } from '~/api/biz/types/exptypes'

export const getExpPage = (
	params: { labId?: number } = {},
): Promise<{ list: IExp }> => request.get('/lab/project-category/page', params)
export const getLabPage = (): Promise<{ list: ILab[] }> =>
	request.get('/lab/laboratory-lab/page')

export const getExpDetail = (id: number): Promise<IExp> =>
	request.get('/lab/project-category/get', { id })
