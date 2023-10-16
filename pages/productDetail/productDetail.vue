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
				    	<image :src="item.avatar" mode="aspectFill" class="avatar"></image>
				    	<view class="more">
				    		<text style="color: red;">{{item.nickName}}</text>
				    		<!-- <text style="color: gray;font-size: 8px;margin-top: 4px;">{{date}}</text> -->
				    	</view>
				    </view>
				    <view class="head-right">
				        <view v-if="item.getMethod !== undefined && item.getMethod !== null">
							<view class="info-by" v-if="item.getMethod==1">
								可配送
							</view>
							<view class="info-by" v-else-if="item.getMethod==0">
								需自提
							</view>
						</view>
						<view class="view-nums">
							<uni-icons type="eye" size="15" color="#333" class="view-num" ></uni-icons>
							<text>666</text>
						</view>
				    </view>
				</view>
				<view class="head-bottom">
					<view class="item-title">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="info-body">
				<view class="info-money">
					<cn-money :money="item.price" :size="48"></cn-money>
					<view class="info-count">
						库存:<text class="info-count-value" >{{item.count}}</text>
					</view>
				</view>
				<view class="info-detail">
					出大物实验报告，目前有的种类：无线电力传输，电表改装 <br/>
					可以发到微信电子版 <br/>
					材质：电子版<br/>
					质量：高<br/>
					<view class="detail-content">
					      <p class="detail-text">{{item.content}}</p>
					</view>
				</view>
				<view class="info-images" v-if="imageList">
					<text style="color:#999">图片展示</text>
					<view>
					    <view v-for="image in imageList" :key="image.id" class="image-item" >
					      <image :src="image.url" mode="widthFix" ></image>
					    </view>
					</view>
				</view>
				<view class="info-contact">
					联系方式：{{item.contactInfo}}
				</view>
			</view>
			
		</scroll-view> 
		<view class="bottom-bar">
			<uni-fav :checked="is_fav" class="favBtn" :circle="true" bg-color="#dd524d"
								bg-color-checked="#007aff" fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick()" />
			<button class="my-want" @click="GotoChat">我想要</button>
		</view>
	</view>
</template>

<script setup>
	import cnMoney from '@/components/cn-money/cn-money.vue';
	import {
		reactive,
		ref, watchEffect
	} from 'vue'
	import {
		onLoad,onInit,onUnload,onShow,onReady
	} from '@dcloudio/uni-app'
	const is_fav = ref(false);
	let token = null;
	function favClick() {
	  is_fav.value = !is_fav.value ;
	  uni.request({
	  	url: "http://94.74.87.251:8080/school/goods/star/" + goodsId.value,
	  	method: "GET",
	  	header: {
	  		"Authorization": token
	  	},
	  	success: (res) => {
	  		// console.log(res);
	  		if (res.data.code == 200) {
	  			console.log(res);
	  		} else {
	  			uni.showToast({
	  				title: '收藏失败，请检查网络',
	  				icon: 'none'
	  			})
	  		}
	  	},
	  	fail: (err) => {
	  		uni.showToast({
	  			title: err,
	  			icon: 'none'
	  		})
	  	}
	  })
	}
// const imageList= [
 //        { id: 1, url: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png' },
 //        { id: 2, url: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png' },
 //        { id: 3, url: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png' },
 //      ]
	const goBack = ()=>{
		uni.navigateBack({
			delta:1
		})
	}
	const GotoChat = ()=>{
		uni.navigateTo({
			url: '/pages/privateChat/privateChat',
			animationDuration: 300,
			events:{
				initMsgs: function(data) {
					  console.log(data)
				},
			},
			success: (res) => {
				// const friend_info = 
				// console.log("看看：",friend_info);
				res.eventChannel.emit("initMsgs",{
					id: item.value.userId,
					name: item.value.nickName,
					avatar: item.value.avatar
				})
			}
		})
	}
	// const avatarSrc = ref("../.././static/images/img5.jpg")
	const name = ref("123鼠鼠")
	const date = ref("8分钟前")
	let item = ref({})
	// let imageList = ref([])
	// imageList.value = item.value.picture.split(',')
	// console.log(imageList);
	let pictureArray = ref([]);
	let imageList = ref([]);
	let goodsId = ref(null)
	onLoad((options) => {
		//  item = options.data;
		// console.log('item',item);
		uni.$on('productListToDetail', (res) => {
		  // console.log('res',res); // 为 B 页面传过来的值
		  item.value = res
		  console.log('item.value',item.value);
		  console.log('item.value.picture',item.value.picture);
		  // 将item.value.picture以逗号分隔成数组，并赋值给全局变量 pictureArray
		  pictureArray.value = item.value.picture.split(',');
		  goodsId.value = item.value.id
		  console.log('id',goodsId.value);
		  // 构建imageList数组
		  imageList.value = pictureArray.value.map((url, index) => {
			return { id: index + 1, url: url };
		  });
		  //解决打开界面默认还是为收藏问题
		  if(item.value.isStar===1){
			  is_fav.value =true
		  }
		  console.log('imageList',imageList.value);
		})
	})
	onShow(() => {
		uni.getStorage({
			key: 'token',
			success: (res) => {
				// console.log(res.data);
				token = res.data;
	
			},
			fail: (err) => {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
			}
		});
	
	})
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
