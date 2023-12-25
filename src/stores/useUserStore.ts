import { defineStore } from 'pinia'
import { IExper } from '~/api/biz/types/exptypes'
import { IUser } from '~/api/biz/types/basetypes'

export default defineStore('user', {
	state() {
		return {
			token: '',
			userinfo: {} as IUser,
			clickLoginUserid: 0,
			clickLoginExper: {} as IExper,
		}
	},
	actions: {
		setToken(token: string) {
			this.token = token
		},
		setUserinfo(userinfo: IUser) {
			this.userinfo = userinfo
		},
		setClickLoginUserid(id: number) {
			this.clickLoginUserid = id
		},
		setClickLoginExper(user: IExper) {
			this.clickLoginExper = user
		},
		logout() {
			this.token = ''
			this.userinfo = {} as IUser
			this.clickLoginUserid = 0
			this.clickLoginExper = {} as IExper
		},
	},
	persist: true,
})
