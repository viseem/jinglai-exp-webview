import { defineStore } from 'pinia'
import { ILab } from '~/api/biz/types/exptypes'

export default defineStore('lab', {
	state() {
		return {
			currentLab: {} as ILab,
		}
	},
	actions: {
		setCurrentLab(data: ILab) {
			console.log('data----', data)
			this.currentLab = data
		},
	},
	getters: {
		getCurrentLab(): ILab {
			return this.currentLab
		},
	},
	persist: false,
})
