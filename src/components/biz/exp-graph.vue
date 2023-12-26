<template>
	<div class="relative h-full w-full flex border">
		<div id="graphContainer" style="width: 100%; height: 100%"></div>
	</div>
</template>
<script lang="ts" setup>
import { register } from '@antv/x6-vue-shape'
import dagre from 'dagre' //第三方
import TaskItem from '~/components/biz/task-item.vue'
import { Edge, Graph, Node, Shape } from '@antv/x6'

const message = toast

let graph: Graph = null
/*eslint-disable-next-line*/
const props = defineProps({
	list: {
		type: Object,
		required: true,
	},
})

// 定义节点

const projectStore = useExpStore()
const taskItemConfig = projectStore.taskItemConfig

const ports = {
	items: [
		{
			group: 'out',
		},
	],
	groups: {
		in: {
			position: {
				name: 'right',
			},
			attrs: {
				portBody: {
					magnet: 'passive',
					r: 6,
					stroke: '#5F95FF',
					fill: '#fff',
					strokeWidth: 1,
				},
			},
		},
		out: {
			position: {
				name: 'left',
			},
			attrs: {
				portBody: {
					magnet: true,
					r: 6,
					fill: '#fff',
					stroke: '#5F95FF',
					strokeWidth: 1,
				},
			},
		},
	},
}
const portMarkup = [
	{
		tagName: 'circle',
		selector: 'portBody',
	},
]

//这里宽高需要传入 并且与组件一致
register({
	shape: 'TaskNode',
	width: taskItemConfig.width,
	height: taskItemConfig.height,
	component: TaskItem,
})
register({
	shape: 'TaskNode-2',
	width: taskItemConfig.width,
	height: taskItemConfig.height,
	component: TaskItem,
	ports,
	portMarkup,
})

register({
	shape: 'TaskNode-3',
	width: taskItemConfig.sopWidth,
	height: taskItemConfig.sopHeight,
	component: TaskItem,
	ports,
	portMarkup,
})

let data = [
	{
		uid: '0-1',
		name: '任务0',
		level: 2,
	},
	{
		uid: '1-2',
		name: '任务22',
		level: 2,
		child: [
			{
				uid: '1-12-1',
				name: '步骤1',
				level: 3,
				dependIds: [],
			},
		],
	},
	{
		uid: '1-4',
		name: '任务4',
		level: 2,
		dependIds: ['0-1', '1-2'],
	},
]
const rootId = '0'
let rootNode = { name: '根', level: 0, id: rootId, shape: `TaskNode` }

watch(
	() => props.list,
	async (nv) => {
		if (nv) {
			data = nv?.child
			rootNode = { ...rootNode, ...nv?.root }
			await nextTick()
			painGraph()
		}
	},
	{
		immediate: true,
	},
)

function convertToGraphData(datas) {
	const nodeList = [rootNode]
	const edgeList = []
	const traverse = (node, parent) => {
		const id = node.uid
		if (id === undefined) {
			message.warning('任务图-数据异常，缺少id')
			return
		}
		node.level = node.level ?? 1

		nodeList.push({ ...node, id, shape: `TaskNode-${node.level}` })

		const parentId = parent?.id
		if (parentId) {
			edgeList.push({ source: parentId, target: id, ...node })
		}
		if (node.level == 2) {
			edgeList.push({ source: rootNode?.id, target: id, ...node })
		}

		if (Array.isArray(node.child) && node.child.length > 0) {
			node.child.forEach((child) => traverse(child, { id }))
		}
	}

	datas?.map((data) => {
		traverse(data, {})
	})

	return {
		nodeList,
		edgeList,
	}
}
/* eslint-disable-next-line */
const layout = () => {
	const dir = 'LR'
	const nodes = graph.getNodes()
	const edges = graph.getEdges()
	const g = new dagre.graphlib.Graph()
	g.setGraph({ rankdir: dir, nodesep: 10, ranksep: 30 })
	g.setDefaultEdgeLabel(() => ({}))

	nodes.forEach((node) => {
		const size = node.getSize()
		g.setNode(node.id, { width: size.width, height: size.height }) // 设置节点的宽度和高度
	})

	edges.forEach((edge) => {
		const source = edge.getSource()
		const target = edge.getTarget()
		g.setEdge(source.cell, target.cell)
	})

	dagre.layout(g)

	g.nodes().forEach((id) => {
		const node = graph.getCellById(id) as Node
		if (node) {
			const pos = g.node(id)
			node.position(pos.x, pos.y)
		}
	})
	edges.forEach((edge) => {
		const source = edge.getSourceNode()!
		const target = edge.getTargetNode()!
		const sourceBBox = source.getBBox()
		const targetBBox = target.getBBox()

		if ((dir === 'LR' || dir === 'RL') && sourceBBox.y !== targetBBox.y) {
			const gap =
				dir === 'LR'
					? targetBBox.x - sourceBBox.x - sourceBBox.width
					: -sourceBBox.x + targetBBox.x + targetBBox.width
			const fix = dir === 'LR' ? sourceBBox.width : 0
			const x = sourceBBox.x + fix + gap / 2
			edge.setVertices([
				{ x, y: sourceBBox.center.y },
				{ x, y: targetBBox.center.y },
			])
		} else if (
			(dir === 'TB' || dir === 'BT') &&
			sourceBBox.x !== targetBBox.x
		) {
			const gap =
				dir === 'TB'
					? targetBBox.y - sourceBBox.y - sourceBBox.height
					: -sourceBBox.y + targetBBox.y + targetBBox.height
			const fix = dir === 'TB' ? sourceBBox.height : 0
			const y = sourceBBox.y + fix + gap / 2
			edge.setVertices([
				{ x: sourceBBox.center.x, y },
				{ x: targetBBox.center.x, y },
			])
		} else {
			edge.setVertices([])
		}
	})
}

// 自动布局

const createNode = (item) => {
	return graph.createNode({ ...item, data: { ...item } })
}

// 自定义边
Graph.registerEdge(
	'org-edge',
	{
		zIndex: -1,
		attrs: {
			line: {
				strokeWidth: 1,
				stroke: '#A2B1C3',
				sourceMarker: null,
				targetMarker: null,
			},
		},
		router: {
			name: 'normal',
			args: {},
		},
		connector: 'rounded',
	},
	true,
)

Graph.registerEdge(
	'depend-edge',
	{
		router: {
			name: 'manhattan',
			args: {},
		},
		attrs: {
			line: {
				stroke: '#0096C7',
				strokeWidth: 2,
				targetMarker: {
					name: 'classic',
					size: 7,
				},
			},
		},
		connector: 'rounded',
	},
	true,
)

function getInPorts(node) {
	return node.getPortsByGroup('in')
}

function getUsedInPorts(node) {
	const incomingEdges = graph.getIncomingEdges(node) || []
	return incomingEdges.map((edge: Edge) => {
		const portId = edge.getTargetPortId()
		return node.getPort(portId!)
	})
}

function getNewInPorts(length: number) {
	return Array.from(
		{
			length,
		},
		() => {
			return {
				group: 'in',
			}
		},
	)
}

function updateInPorts(node) {
	const minNumberOfPorts = 1
	const ports = getInPorts(node)
	const usedPorts = getUsedInPorts(node)
	const newPorts = getNewInPorts(
		Math.max(minNumberOfPorts - usedPorts.length, 1),
	)
	if (
		ports.length === minNumberOfPorts &&
		ports.length - usedPorts.length > 0
	) {
		// noop
	} else if (
		ports.length === 0 &&
		usedPorts.length === 0 &&
		node.id != rootId
	) {
		node.addPorts(newPorts)
	} else if (ports.length + 1 > usedPorts.length) {
		// this.prop(
		//   ['ports', 'items'],
		//   this.getOutPorts().concat(usedPorts).concat(newPorts),
		//   {
		//     rewrite: true,
		//   },
		// )
	}

	return node
}

const painGraph = () => {
	try {
		const { nodeList, edgeList } = convertToGraphData(data)
		// edgeList.splice(0, 1)
		let nodes = []
		let nodeItem = {}
		let edges = []
		let edgeItem = null
		// let index = 0
		graph.scale(0.75, 0.75)
		nodeList.forEach((item) => {
			/*if (parseJson?.filter((jsonNode) => jsonNode?.id == item?.uid)?.length > 0) {
        return
      }*/
			nodeItem = createNode({
				...item,
				// position: { x: -cWidth * 0.4, y: (taskItemConfig.height + 10) * index }
			})
			updateInPorts(nodeItem)
			nodes.push(nodeItem)
		})
		edgeList.forEach((item) => {
			//得切掉最后一个
			// edgeItem.value = createEdge(item.source, item.target)
			edgeItem = graph.createEdge({
				source: item.source,
				target: item.target,
				shape: 'org-edge',
			})
			edges.push(edgeItem)
		})
		graph.resetCells([...nodes, ...edges])
		layout()
	} catch (e) {
		console.log('e--', e)
	}
	// graph.fromJSON(graphJson)
	graph.centerContent()
}
// 高亮
const magnetAvailabilityHighlighter = {
	name: 'stroke',
	args: {
		attrs: {
			fill: '#fff',
			stroke: '#47C769',
		},
	},
}

onMounted(() => {
	graph = new Graph({
		container: document.getElementById('graphContainer')!,
		highlighting: {
			magnetAvailable: magnetAvailabilityHighlighter,
			magnetAdsorbed: {
				name: 'stroke',
				args: {
					attrs: {
						fill: '#fff',
						stroke: '#31d0c6',
					},
				},
			},
		},
		mousewheel: {
			enabled: true,
			modifiers: ['ctrl', 'meta'],
		},
		connecting: {
			snap: true,
			allowBlank: false,
			allowLoop: false,
			highlight: true,
			connector: 'rounded',
			connectionPoint: 'boundary',
			router: {
				name: 'manhattan',
				args: {},
			},
			createEdge() {
				return new Shape.Edge({
					attrs: {
						line: {
							stroke: '#0096C7',
							strokeWidth: 1,
							targetMarker: {
								name: 'classic',
								size: 7,
							},
						},
					},
					router: {
						name: 'manhattan',
						args: {},
					},
				})
			},
			validateConnection({ targetMagnet, sourceCell, targetCell }) {
				if (!targetMagnet) {
					return false
				}

				if (targetMagnet.getAttribute('port-group') !== 'in') {
					return false
				}

				if (
					sourceCell?.store?.data?.dependIds?.includes(targetCell?.id) ||
					targetCell?.store?.data?.dependIds?.includes(sourceCell?.id)
				) {
					return false
				}

				return true
			},
		},
		grid: {
			size: 10, // 网格大小 10px
			visible: true, // 渲染网格背景
		},
		background: {
			color: '#fff',
		},
		translating: {
			restrict: true,
		},
		interacting: true,
		panning: true,
		// width: 1000,
		// height: 450
	} as any)

	graph.on('node:click', (e) => {
		const data = e?.node?.store?.data?.data
		if (data) {
			projectStore.setTaskItemData(data)
		}
	})

	//注意：测试假数据可以打开，通过watch获取的数据，需要关闭；一开始不渲染，有数据才渲染
	// painGraph()
})
</script>
<style>
.home {
	position: relative;
}
</style>
