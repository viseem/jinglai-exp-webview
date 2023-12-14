<script setup lang="ts">
// eslint-disabled
const imgUrl = '/public/test.jpg'
const testPoster = ref('')
clipPoster(imgUrl)
async function clipPoster(url) {
	await nextTick()
	// 获取Canvas元素和2D上下文
	let canvas = document.getElementById('posterCanvas')
	canvas.width = 300 * 4 // 实际大小的两倍
	canvas.height = 525 * 4

	// 使用CSS样式将Canvas缩小
	canvas.style.width = '300px' // 实际大小的一半
	canvas.style.height = '525px'
	let context = canvas.getContext('2d')
	context.imageSmoothingEnabled = true
	// SVG路径数据
	let svgPathData =
		'm956.938,125.426a8.1,8.1 0 0 1 -7.412,-2.283c-49.146,-50.813 -178.672,-91.791 -237.555,-97.483c-37.916,-3.665 -58.486,-13.106 -68.516,-19.586a14.949,14.949 0 0 0 -16.278,0c-10.029,6.48 -30.6,15.92 -68.515,19.586c-58.39,5.644 -186.241,45.984 -236.3,96.206a11.71,11.71 0 0 1 -10.424,3.223c-46.028,-8.311 -195.063,2.478 -284.024,78.64a72.659,72.659 0 0 0 -25.247,55.234l0,1902.327c0,85.98 69.777,155.68 155.85,155.68l953.6,0c86.07,0 155.85,-69.7 155.85,-155.68l0,-1902.327a72.671,72.671 0 0 0 -25.25,-55.234c-90.127,-77.161 -241.917,-87.223 -285.779,-78.303z'

	// 创建SVG元素
	let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	svgElement.setAttribute('width', '1271')
	svgElement.setAttribute('height', '2320')

	// 创建SVG路径元素
	let pathElement = document.createElementNS(
		'http://www.w3.org/2000/svg',
		'path',
	)
	pathElement.setAttribute('d', svgPathData)

	// 将SVG路径数据转换为Canvas路径
	let path = new Path2D(pathElement.getAttribute('d'))

	// 创建一个新的Image对象
	let img = new Image()
	img.src = url // 替换成你的图片路径

	// 当图片加载完成后执行
	img.onload = function () {
		// 在Canvas上绘制图片
		context.drawImage(img, 0, 0, canvas.width, canvas.height)

		miaobiao()

		setTimeout(() => {
			// 恢复缩放状态
			context.setTransform(1, 0, 0, 1, 0, 0)
			// 清除画布
			context.clearRect(0, 0, canvas.width, canvas.height)
			miaobiao()
			// 开始裁剪
			context.clip(new Path2D(svgPathData))
			context.fillStyle = 'red'
			context.fillRect(0, 0, canvas.width, canvas.height)
			context.setTransform(1, 0, 0, 1, 0, 0)
			context.drawImage(img, 0, 0, canvas.width, canvas.height)

			testPoster.value = canvas.toDataURL('image/png')
		}, 2000)
	}

	function miaobiao() {
		// 设置路径样式
		context.lineWidth = 20
		context.strokeStyle = 'red'
		context.fillStyle = 'rgba(0,0,0,0)'
		// 缩放SVG路径以适应Canvas尺寸
		let scaleX = canvas.width / parseFloat(svgElement.getAttribute('width'))
		let scaleY = canvas.height / parseFloat(svgElement.getAttribute('height'))
		context.scale(scaleX, scaleY)
		// 绘制路径
		context.stroke(path)
		context.fill(path)
	}
}
</script>

<template>
	<img :src="testPoster" alt="" w350px class="poster-img" />
	<div relative h525px w300px>
		<canvas
			id="posterCanvas"
			style="image-rendering: auto"
			absolute
			left-0
			top-0
			hfull
			wfull
		></canvas>
	</div>
</template>

<style scoped>
.poster-img {
	filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.8));
}
</style>
