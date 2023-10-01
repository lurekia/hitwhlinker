<template>
	<view class="status">
	</view>
	<view>
		<view class="header">
			<view class="title">
				需求市场
			</view>
			<view @click = "goToPostForm">
				<uni-icons type="compose" size="30" color="#fff" ></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
		
	const goToPostForm = ()=>{
		uni.navigateTo({
			url:'/pages/postShopForm/postShopForm'
		})
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 30rpx;
		border-bottom: 1px solid rgb(244, 244, 244);
		background-color: rgb(213,79,79);
		color: white;
		.title {
			font-size: 22px;
			font-weight: 500;
		}
	}
</style>
