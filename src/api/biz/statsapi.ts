import { IExpCountStats } from '~/api/biz/types/statstypes'

export const getLabExpCountStats = (params: {
	labId: number
}): Promise<IExpCountStats> =>
	request.get('/open-api/lab/stats/exp-count', params)
