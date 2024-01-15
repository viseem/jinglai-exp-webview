import { defineStore } from 'pinia'
import { ICheckboxItem } from '~/components/x/checkbox/checkbox'

export default defineStore('modal', {
	state() {
		return {
			labModalVisible: true,
			loginModalVisible: false,
			fileModalVisible: false,
			fileModalConfig: {} as IFileConfig,
			expPreCheckModalVisible: false,
			expPreCheckModalConfig: {} as {
				list: ICheckboxItem[]
				exp: { id: number }
			},
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
		setExpPreCheckModalVisible(visible: boolean) {
			this.expPreCheckModalVisible = visible
		},
		setExpPreCheckModalConfig(config: {
			list: ICheckboxItem[]
			exp: { id: number }
		}) {
			this.expPreCheckModalConfig = config
		},
	},
	persist: false,
})

export interface IFileConfig {
	fileName: string
	fileUrl: string
}
