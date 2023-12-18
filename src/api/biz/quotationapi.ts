import { IQuotation } from '~/api/biz/types/quotationtypes'

export const getQuotationDetail = (id: number): Promise<IQuotation> =>
	request.get('/lab/project-quotation/get', { id })
