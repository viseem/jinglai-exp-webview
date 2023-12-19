export const updateSopStatus = (params: {
	id: number
	status: string
}): Promise<any> => request.post('/lab/project-sop/update-status', params)
