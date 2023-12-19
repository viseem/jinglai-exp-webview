import { defineStore } from 'pinia'

export default defineStore('user', {
	state() {
		return {
			token: '',
		}
	},
	actions: {
		setToken(token: string) {
			this.token = token
		},
	},
	persist: true,
})
