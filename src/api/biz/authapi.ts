export const login = async (
	params: {
		userid: number
		password: string
	} = { userid: 146, password: '123456' },
): Promise<any> => {
	const res = (await http.post('/admin-api/system/auth/lab-login', params)) as {
		refreshToken: string
	}
	if (res?.refreshToken) {
		const userStore = useUserStore()
		userStore.setToken(res.refreshToken)
		return res
	}
	return Promise.reject()
}
