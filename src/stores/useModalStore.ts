import { defineStore } from 'pinia'

export default defineStore('modal', {
	state() {
		return {
			labModalVisible: true,
		}
	},
	actions: {
		openLabModal() {
			this.labModalVisible = true
		},
		closeLabModal() {
			this.labModalVisible = false
		},
		setLabModalVisible(visible: boolean) {
			this.labModalVisible = visible
		},
	},
	persist: false,
})
