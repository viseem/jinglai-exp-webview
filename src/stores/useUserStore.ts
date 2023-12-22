import { defineStore } from 'pinia'
import { IExper } from '~/api/biz/types/exptypes'

export default defineStore('user', {
	state() {
		return {
			token: '',
			clickLoginUserid: 0,
			clickLoginExper: {} as IExper,
		}
	},
	actions: {
		setToken(token: string) {
			this.token = token
		},
		setClickLoginUserid(id: number) {
			this.clickLoginUserid = id
		},
		setClickLoginExper(user: IExper) {
			this.clickLoginExper = user
		},
	},
	persist: true,
})
