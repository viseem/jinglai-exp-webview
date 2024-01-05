/*
import 'vue-toastification/dist/index.css'
import { createToastInterface } from 'vue-toastification'

export default createToastInterface({
	timeout: 2000,
	hideProgressBar: true,
})
*/
import Swal from 'sweetalert2'

export default {
	warning(title: string) {
		Swal.fire({
			position: 'center',
			icon: 'warning',
			title,
			showConfirmButton: false,
			timer: 2000,
		})
	},
	success(title: string) {
		Swal.fire({
			position: 'center',
			icon: 'success',
			title,
			showConfirmButton: false,
			timer: 2000,
		})
	},
	async confirm(title: string, text?: string) {
		const res = await Swal.fire({
			title,
			text,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: 'orange',
			confirmButtonText: '确认',
			cancelButtonText: '取消',
		})
		if (res.isConfirmed) {
			return true
		}
		return Promise.reject('取消')
	},
}
