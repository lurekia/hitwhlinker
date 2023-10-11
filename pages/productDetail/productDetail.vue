<template>
	<view class="page">
		<view class="topbar">
			<view class="topbar-content">
				需求详情
			</view>
			<uni-icons type="back" size="30" color="#fff" class="go-back" @click="goBack"></uni-icons>
		</view>
		<scroll-view class="product-list" scroll-y="true" :scroll-with-animation="true">
			<view class="info-head">
				<view class="user">
					<image :src="avatarSrc" mode="aspectFill" class="avatar"></image>
					<view class="more">
						<text style="color: red;">{{name}}</text>
						<text style="color: gray;font-size: 8px;margin-top: 4px;">{{date}}</text>
					</view>
				</view>
				<view class="head-bottom">
					<view class="info-by">
						可配送
					</view>
					<view class="view-nums">
						<uni-icons type="eye" size="15" color="#333" class="view-num" ></uni-icons>
						<text>666</text>
					</view>
				</view>
			</view>
			<view class="info-detail">
				商品文字详情
			</view>
			<view class="info-images">
				图片展示区
			</view>
			666  66666666666666666666666666666666666666666666666666666
			
    <u-button type="primary" shape="circle" text="按钮形状"></u-button>
	<u-upload
			:fileList="fileList1"
			@afterRead="afterRead"
			@delete="deletePic"
			name="1"
			multiple
			:maxCount="10"
		></u-upload>
		</scroll-view> 
		<view class="bottom-bar">
			<uni-fav :checked="is_fav" class="favBtn" :circle="true" bg-color="#dd524d"
								bg-color-checked="#007aff" fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick()" />
			<button class="my-want">我想要</button>
		</view>
	</view>
</template>

<script setup>
	
	import {
		reactive,
		ref
	} from 'vue'
	const is_fav = ref(false);
	function favClick() {
	  is_fav.value = !is_fav.value ;
	}
		
	const goBack = ()=>{
		uni.navigateBack({
			delta:1
		})
	}
	
	
	const list = ref([
	  {
	    text: '点赞',
	    color: 'blue',
	    fontSize: 28
	  },
	  {
	    text: '分享'
	  },
	  {
	    text: '评论'
	  }
	]);
	
	const show = ref(true);
	const avatarSrc = ref("../.././static/images/img5.jpg")
	const src = ref("../.././static/images/product.webp")
	const name = ref("123鼠鼠")
	const money = ref(100)
	const detail = ref("这是一个手表这是一个手表")
	const date = ref("8分钟前")
	
</script>

<style lang="scss">
	.page{
		position: relative;
		width: 100vw;
		height: 100vh;
	}
	.bottom-bar {
		height:100rpx;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: pink;
		.favBtn{
			position: absolute;
			top: 30rpx;
			left: 40rpx;
		}
		.my-want {
			color: white;
			letter-spacing: 4rpx;
			position: absolute;
			top: 20rpx;
			right: 40rpx;
			width: 200rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background-color: crimson;
			border-radius: 30rpx;
		}
	}
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
	.product-list {
		width: 94%;
		height: calc(100vh - 200rpx);
		background-color: transparent;
		margin: 20rpx auto;
		margin-bottom: 0;
		display: flex;
		flex-direction: column;
	}
	.info-head {
		width: 100%;
		height: 8%;
		align-items: center;
		border-bottom: 1px solid rgb(216, 216, 216);
	}
	.user {
		display: flex;
		align-items: flex-start;
		.avatar {
			height: 30px;
			width: 30px;
			border-radius: 30px;
		}
		.more {
			display: flex;
			flex-direction: column;
			align-self: flex-start;
			font-size: 12px;
			margin-left: 5px;
		}
	}
	.head-bottom {
		display: flex;
		align-items: flex-end;
		.view-nums{
		  // opacity: 0.;
		  font-size: 15rpx;
		  color: #333;
		  display: flex;
		  .view-num {
			  margin-right: 5rpx;
		  }
		}
		.info-by {
			font-weight: 710;
		}
	}
		
</style>
