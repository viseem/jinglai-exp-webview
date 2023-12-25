import { IUser } from '~/api/biz/types/basetypes'

export const login = async (
	params: {
		userid: number
		password: string
	} = { userid: 146, password: '123456' },
): Promise<any> => {
	const res = (await http.post('/admin-api/system/auth/lab-login', params)) as {
		accessToken: string
		user: IUser
	}
	console.log('res-----', res)
	if (res?.accessToken && res?.user?.id) {
		const userStore = useUserStore()
		userStore.setToken(res.accessToken)
		userStore.setUserinfo(res.user)
		return res
	}
	return Promise.reject()
}
