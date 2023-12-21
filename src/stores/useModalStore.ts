import { defineStore } from 'pinia'

export default defineStore('modal', {
	state() {
		return {
			labModalVisible: true,
			loginModalVisible: false,
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
		setLoginModalVisible(visible: boolean) {
			this.loginModalVisible = visible
		},
	},
	persist: false,
})
