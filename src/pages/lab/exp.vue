<script setup lang="ts"></script>

<template>
	<div hfull wfull flex>
		<div w-full flex flex-1 items-center justify-center>
			<div border="2px solid black" hfull wfull flex gap-4 p-4>
				<div v-for="i in 5" :key="i" hfull wfull border="1px solid green;">
					12121
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
