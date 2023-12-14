import { ILab } from '~/api/biz/types/exptypes'

export const getExpPage = () => http.get('/lab/project-category/page')
export const getLabPage = (): Promise<{ list: ILab[] }> =>
	http.get('/lab/laboratory-lab/page')
