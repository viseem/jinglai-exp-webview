<script setup lang="ts">
import { ICheckboxItem } from '~/components/x/checkbox/checkbox'

const props = defineProps({
	list: {
		type: Array as PropType<ICheckboxItem[]>,
		default: () => [],
	},
})
const computedList = computed(() => props.list)
const emit = defineEmits(['update'])
function updateHandler(v: boolean, item: any, index: number) {
	emit('update', v, item, index)
}
</script>

<template>
	<a-checkbox
		v-for="(item, index) in computedList"
		:key="item"
		mb-2
		style="zoom: 1.25"
		:disabled="item.disabled"
		:model-value="item.checked"
		@update:model-value="
			(v: boolean) => {
				updateHandler(v, item, index)
			}
		"
	>
		<template #checkbox="{ checked }">
			<div flex>
				<div
					rounded="50%"
					relative
					mr-2
					mt="2%"
					h1.3rem
					min-h-1.3rem
					min-w-1.3rem
					w1.3rem
					flex
					items-center
					justify-center
				>
					<div
						v-show="checked"
						absolute
						hfull
						wfull
						class="i-bi:check-circle-fill"
						:style="item.disabled ? 'color: #ccc' : 'color: #017FF5'"
					></div>
					<div
						v-show="!checked"
						absolute
						hfull
						wfull
						rounded="50%"
						border="3px solid #017FF5"
						:style="
							item.disabled
								? 'border:3px solid #ccc'
								: 'border:3px solid #017FF5'
						"
					></div>
				</div>
				<div>
					<slot name="content" :item="item"></slot>
				</div>
			</div>
		</template>
	</a-checkbox>
</template>

<style scoped></style>
