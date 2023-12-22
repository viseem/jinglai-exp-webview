import { defineStore } from 'pinia'

export default defineStore('user', {
	state() {
		return {
			token: '',
			clickLoginUserid: 0,
		}
	},
	actions: {
		setToken(token: string) {
			this.token = token
		},
		setClickLoginUserid(id: number) {
			this.clickLoginUserid = id
		},
	},
	persist: true,
})
