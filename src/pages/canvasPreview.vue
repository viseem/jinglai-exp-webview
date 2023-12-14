<script setup lang="ts">
const imgUrl = '/public/test.jpg'
clipPoster(imgUrl)
async function clipPoster(url) {
	await nextTick()
	// 获取Canvas元素和2D上下文
	let canvas = document.getElementById('posterCanvas')
	let ctx = canvas.getContext('2d')

	// 创建一个新的Image对象
	let img = new Image()
	img.src = url // 替换成你的图片路径

	// 当图片加载完成后执行
	img.onload = function () {
		// 在Canvas上绘制图片
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

		// 创建一个SVG元素
		let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		svg.setAttribute('width', canvas.width)
		svg.setAttribute('height', canvas.height)

		// 创建一个clipPath元素并添加路径
		let clipPath = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'clipPath',
		)
		clipPath.setAttribute('id', 'myClipPath')

		let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		path.setAttribute(
			'd',
			'm42.49999,237.35898l82.12328,0l25.37673,-81.35898l25.37674,81.35898l82.12327,0l-66.43901,50.28204l25.37804,81.35898l-66.43904,-50.28341l-66.43902,50.28341l25.37805,-81.35898l-66.43903,-50.28204z',
		) // 替换成你的SVG路径
		clipPath.appendChild(path)

		// 将clipPath添加到SVG元素中
		svg.appendChild(clipPath)

		// 将SVG元素绘制到Canvas上
		ctx.save()
		ctx.clip = clipPath
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
		ctx.restore()
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
