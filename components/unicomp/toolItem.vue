<template>
	<view class="card">
		<view class="tool-icon">
			<uni-icons type="image" size="50" color="#000"></uni-icons>
		</view>
		<view class="tool-title">
			<text>{{title}}</text>
		</view>
	</view>
</template>

<script setup>
import {
		ref,
		reactive,
		computed,
		onMounted
	} from 'vue'
const title = ref("相册")	
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
		display: flex;
	}
	.card {
		flex-direction: column;
		width: 15vw;
		margin: 0 5vw;
		.tool-icon {
			width: 15vw;
			height: 15vw;
			padding-top: 5px;
			border-radius: 10px;
			background-color: #fff;
			text-align: center;
			
		}
		.tool-title {
			width: 15vw;
			justify-content: space-around;
			margin-top: 10px;
			font-size: 12px;
			color: #333;
		}
	}
</style>