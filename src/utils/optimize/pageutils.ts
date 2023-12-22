import { onBeforeUnmount, onMounted } from 'vue'

export const useScaleToFitScreen = (
	viewID = 'layoutContainer',
	baseWidth: number,
	baseHeight: number,
) => {
	if (!baseWidth || !baseHeight) {
		return
	}
	// * 默认缩放值
	const scale = {
		width: '1',
		height: '1',
	}

	// * 设计稿尺寸（px）

	// * 需保持的比例（默认1.77778）
	const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))

	let drawTiming: any = null

	const calcRate = () => {
		const appRef = document.getElementById(viewID)
		if (!appRef) return
		// 当前宽高比
		const currentRate = parseFloat(
			(window.innerWidth / window.innerHeight).toFixed(5),
		)
		console.log(currentRate)
		if (appRef) {
			if (currentRate > baseProportion) {
				// 表示更宽
				scale.width = (
					(window.innerHeight * baseProportion) /
					baseWidth
				).toFixed(5)
				scale.height = (window.innerHeight / baseHeight).toFixed(5)

				// translate(-50%, -50%)
				appRef.style.transform = `scale(${scale.width}, ${scale.height})`
			} else {
				// 表示更高
				// translate(-50%, -50%)
				scale.height = (
					window.innerWidth /
					baseProportion /
					baseHeight
				).toFixed(5)
				scale.width = (window.innerWidth / baseWidth).toFixed(5)

				appRef.style.transform = `scale(${scale.width}, ${scale.height})`
			}
		}
	}

	const resize = () => {
		clearTimeout(drawTiming)
		drawTiming = setTimeout(() => {
			calcRate()
		}, 200)
	}

	onMounted(() => {
		calcRate()
		window.addEventListener('resize', resize)
	})

	onBeforeUnmount(() => {
		window.removeEventListener('resize', resize)
	})
}
