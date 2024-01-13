import { defineStore } from 'pinia'

export default defineStore('counter', {
	state() {
		return {
			taskItemData: null as any,
			taskItemConfig: {
				width: 120,
				height: 60,
				sopWidth: 200,
				sopHeight: 60,
			},
			refreshExpListCount: 0,
		}
	},
	actions: {
		setTaskItemData(payload: any) {
			this.taskItemData = null
			this.taskItemData = payload
		},
		refreshExpList() {
			this.refreshExpListCount++
		},
	},
	persist: true,
})
