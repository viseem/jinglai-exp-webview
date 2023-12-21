import { IDevice } from '~/api/biz/types/devicetypes'

export const getDevicePage = (params: {
	labId: number
}): Promise<{ list: IDevice[] }> =>
	request.get('/open-api/lab/asset-device/page', params)
