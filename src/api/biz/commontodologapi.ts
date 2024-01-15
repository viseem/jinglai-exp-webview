export const updateCommonTodoLogStatus = (params: {
	id: number
	status: string
}): Promise<any> =>
	request.post('/open-api/lab/common-todo-log/update-status', params)

export const saveCommonTodoLogStatus = (params: {
	status: string
	type: string
	refId: number
	todoId: number
}): Promise<any> =>
	request.post('/open-api/lab/common-todo-log/save-status', params)
