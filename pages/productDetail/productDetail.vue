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
				<view class="header-content">
				    <view class="user">
				    	<image :src="avatarSrc" mode="aspectFill" class="avatar"></image>
				    	<view class="more">
				    		<text style="color: red;">{{name}}</text>
				    		<text style="color: gray;font-size: 8px;margin-top: 4px;">{{date}}</text>
				    	</view>
				    </view>
				    <view class="head-right">
				        <view class="info-by">
				        	可配送
				        </view>
						<view class="view-nums">
							<uni-icons type="eye" size="15" color="#333" class="view-num" ></uni-icons>
							<text>666</text>
						</view>
				    </view>
				</view>
				<view class="head-bottom">
					<view class="item-title">
						出大物实验报告
					</view>
				</view>
			</view>
			<view class="info-body">
				<view class="info-money">
					<cn-money :money="9168.45" :size="48"></cn-money>
					<view class="info-count">
						库存:<text class="info-count-value" >888</text>
					</view>
				</view>
				<view class="info-detail">
					出大物实验报告，目前有的种类：无线电力传输，电表改装 <br/>
					可以发到微信电子版 <br/>
					材质：电子版<br/>
					质量：高<br/>
					<view class="detail-content">
					      <p class="detail-text">{{ baseFormData.content }}</p>
					</view>
					
				</view>
				<view class="info-images">
					<text style="color:#999">图片展示</text>
					<view>
					    <view v-for="image in imageList" :key="image.id" class="image-item" >
					      <image :src="image.url" mode="widthFix" ></image>
					    </view>
					</view>
				</view>
				<view class="info-contact">
					联系方式： TEL:13668676731
				</view>
			</view>
			
		</scroll-view> 
		<view class="bottom-bar">
			<uni-fav :checked="is_fav" class="favBtn" :circle="true" bg-color="#dd524d"
								bg-color-checked="#007aff" fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick()" />
			<button class="my-want">我想要</button>
		</view>
	</view>
</template>

<script setup>
	import cnMoney from '@/components/cn-money/cn-money.vue';
	import {
		reactive,
		ref
	} from 'vue'
	const is_fav = ref(false);
	function favClick() {
	  is_fav.value = !is_fav.value ;
	}
	const imageList= [
        { id: 1, url: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png' },
        { id: 2, url: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png' },
        { id: 3, url: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png' },
      ]
	const goBack = ()=>{
		uni.navigateBack({
			delta:1
		})
	}
	const show = ref(true);
	const avatarSrc = ref("../.././static/images/img5.jpg")
	const src = ref("../.././static/images/product.webp")
	const name = ref("123鼠鼠")
	const money = ref(100)
	const detail = ref("这是一个手表这是一个手表")
	const date = ref("8分钟前")
</script>

<style lang="scss" scoped>
	.detail-content {
	  margin-top: 10px;
	}
	
	.detail-text {
	  white-space: pre-wrap;
	}
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
		align-items: center;
		border-bottom: 1px solid rgb(216, 216, 216);
		.header-content{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
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
			.info-by {
				font-weight: 710;
			}
			.view-nums{
			  // opacity: 0.;
			  font-size: 15rpx;
			  color: #333;
			  display: flex;
			  .view-num {
				  margin-right: 5rpx;
			  }
			}
		}
	.head-bottom {
		display: flex;
		justify-content: center;
		margin: 20rpx 0;
		.item-title {
			font-weight: 710;
			font-size: 35rpx;
		}
		}	
	}
.info-body {
	.info-money {
		padding: 10rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		.info-count{
			font-size: 20rpx;
				
			.info-count-value {
				font-size: 30rpx;
				color: #e62e28;
			}
		}
	}
	.info-detail {
		font-size: 30rpx;
	}
	.info-images {
		margin: 30rpx 0;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
	}
}
</style>
