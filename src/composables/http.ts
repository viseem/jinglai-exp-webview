import axios from 'axios'
import { API_BASE_URL } from '~/config/server'

export const http = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		// 'Content-Type': 'application/json',
		//添加token
	},
})
const userStore = useUserStore()
const modalStore = useModalStore()
// 添加请求拦截器
http.interceptors.request.use(
	function (config) {
		// 添加token
		if (userStore.token) {
			config.headers['Authorization'] = 'Bearer ' + userStore.token
		}

		return config
	},
	function (error) {
		toast.warning(error.message ?? '未知请求错误')
		// 对请求错误做些什么
		return Promise.reject(error)
	},
)

// 添加响应拦截器
http.interceptors.response.use(
	function (response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据进行格式化
		if (response.data?.data) {
			return response.data.data
		}
		if (response.data?.code != 0) {
			switch (response.data?.code) {
				case 401:
					modalStore.setLoginModalVisible(true)
					break
				default:
					toast.warning(response.data?.msg || '未知错误')
			}
			return Promise.reject()
		}
		return response
	},
	function (error) {
		const status = error.response?.status
		let { msg, message } = error.response?.data ?? {}

		if (!msg && message) {
			msg = message
		}

		if (!msg) {
			switch (status) {
				case 400:
					msg = '参数错误'
					break
				case 500:
					msg = '服务端错误'
					break
				case 404:
					msg = '路由未找到'
					break
				default:
					msg = error.message ?? '未知响应错误'
					break
			}
		}

		toast.warning(msg)
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error)
	},
)

export const request = {
	get(url: string, params = {}): Promise<any> {
		return http.get(url, {
			params,
		})
	},
	post(url: string, data = {} as any): Promise<any> {
		return http.post(url, data)
	},
}
