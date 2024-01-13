export const updateCommonTodoLogStatus = (params: {
	id: number
	status: string
}): Promise<any> =>
	request.post('/open-api/lab/common-todo-log/update-status', params)
