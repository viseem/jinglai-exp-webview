<script setup lang="ts">
// eslint-disabled
const imgUrl = '/public/test.jpg'
clipPoster(imgUrl)
async function clipPoster(url) {
	await nextTick()
	// 获取Canvas元素和2D上下文
	let canvas = document.getElementById('posterCanvas')
	let context = canvas.getContext('2d')

	// SVG路径数据
	let svgPathData =
		'm895.161,380.452a5.553,5.553 0 0 1 -5.081,-1.565c-33.691,-34.834 -122.485,-62.926 -162.851,-66.828c-25.992,-2.513 -40.093,-8.984 -46.969,-13.426a10.247,10.247 0 0 0 -11.159,0c-6.875,4.442 -20.976,10.913 -46.969,13.426c-40.028,3.869 -127.673,31.523 -161.991,65.952a8.027,8.027 0 0 1 -7.146,2.21c-31.554,-5.7 -133.721,1.7 -194.706,53.909a49.812,49.812 0 0 0 -17.306,37.87l0,1304.09a106.779,106.779 0 0 0 106.839,106.72l653.718,0a106.784,106.784 0 0 0 106.84,-106.72l0,-1304.09a49.8,49.8 0 0 0 -17.31,-37.865c-61.78,-52.901 -165.84,-59.798 -195.909,-53.683z'

	// 创建SVG元素
	let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	svgElement.setAttribute('width', '1344')
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

		miaobiao(true)

		setTimeout(() => {
			// 清除画布
			context.clearRect(0, 0, canvas.width, canvas.height)
			miaobiao()
			// 开始裁剪
			context.clip(new Path2D(svgPathData))
			// 绘制图片
			context.drawImage(img, 0, 0, canvas.width, canvas.height)
		}, 3000)
	}

	function miaobiao(first) {
		// 设置路径样式
		context.lineWidth = 10
		context.strokeStyle = 'red'
		context.fillStyle = 'rgba(0,0,0,0)'
		// 缩放SVG路径以适应Canvas尺寸
		if (first) {
			let scaleX = canvas.width / parseFloat(svgElement.getAttribute('width'))
			let scaleY = canvas.height / parseFloat(svgElement.getAttribute('height'))
			context.scale(scaleX, scaleY)
		}
		// 绘制路径
		context.stroke(path)
		context.fill(path)
	}
}
</script>

<template>
	<div relative h525px w300px border="1px solid red">
		<canvas
			id="posterCanvas"
			style="image-rendering: auto"
			absolute
			left-0
			top-0
			hfull
			wfull
			border="1px solid green"
		></canvas>
	</div>
</template>

<style scoped></style>
