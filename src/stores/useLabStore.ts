import { defineStore } from 'pinia'
import { ILab } from '~/api/biz/types/exptypes'

export default defineStore('lab', {
	state() {
		return {
			currentLab: {} as ILab,
			refreshLab: 0,
		}
	},
	actions: {
		setCurrentLab(data: ILab) {
			this.refreshLab++
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
