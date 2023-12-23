import { IQuotation } from '~/api/biz/types/quotationtypes'

export const getQuotationDetail = (id: number): Promise<IQuotation> =>
	request.get('/open-api/lab/project-quotation/get', { id })
