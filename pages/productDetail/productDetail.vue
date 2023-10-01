<template>
	<view>
		<view class="topbar">
			<view class="topbar-content">
				需求详情
			</view>
			<uni-icons type="back" size="30" color="#fff" class="go-back" @click="goBack"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	
	
</script>

<style lang="scss">
	
	.topbar {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
		background-color: #e85353;
		display: flex;
		position: relative;
		top: 0;
		left: 0;
		justify-content: center;
		.go-back {
			position: absolute;
			top: 0rpx;
			left: 20rpx;
			z-index: 99;
		}
	}
</style>
