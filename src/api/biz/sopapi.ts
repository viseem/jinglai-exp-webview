export const updateSopStatus = (params: {
	id: number
	status: string
	projectCategoryId: number
}): Promise<any> =>
	request.post('/open-api/lab/project-sop/update-status', params)
