import { defineStore } from 'pinia'

export default defineStore('counter', {
	state() {
		return {
			taskItemData: null,
			taskItemConfig: {
				width: 120,
				height: 60,
				sopWidth: 200,
				sopHeight: 60,
			},
		}
	},
	actions: {
		setTaskItemData(payload) {
			this.taskItemData = null
			this.taskItemData = payload
		},
	},
	persist: true,
})
