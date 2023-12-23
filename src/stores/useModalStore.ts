import { defineStore } from 'pinia'

export default defineStore('modal', {
	state() {
		return {
			labModalVisible: true,
			loginModalVisible: false,
			fileModalVisible: false,
			fileModalConfig: {} as IFileConfig,
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
		setFileModalVisible(visible: boolean) {
			this.fileModalVisible = visible
		},
		setFileModalConfig(config: IFileConfig) {
			this.fileModalConfig = config
		},
	},
	persist: false,
})

export interface IFileConfig {
	fileName: string
	fileUrl: string
}
