<template>
	<view class="page">
		<scroll-view class="prompt-list" scroll-y="true" :scroll-with-animation="true">
			<prompt-item class="prompt-item">
			</prompt-item>
		</scroll-view> 
	</view>
</template>

<script setup>
	import promptItem from '@/components/prompt/promptItem.vue'
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
	display: flex;
}
.page {
	width: 100vw;
	height: 100vh;
	
}
.prompt-list {
	flex-direction: column;
	width: 100vw;
	height: 100%;
	padding: 0 20px;
	.prompt-item {
		width: 100%;
		margin-top: 10px;
	}	/* background-color: pink; */
}
</style>
