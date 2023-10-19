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
				    		<text style="color: #2c7bfe;font-size: 30rpx;font-weight: 500;">{{item.nickName}}</text>
				    		<text style="color: gray;font-size: 25rpx;margin-top: 4px;">{{formattedTime(item.createTime)}}</text>
				    	</view>
				    </view>
				    <view class="head-right">
				        <view v-if="item.getMethod !== undefined && item.getMethod !== null">
							<!-- <view class="info-by" v-if="item.getMethod==1"> -->
								<uni-tag :text="getMethodType[item.getMethod]" type="success" class="method"></uni-tag>
							<!-- </view> -->
							<!-- <view class="info-by" v-else-if="item.getMethod==0">
								需自提
							</view> -->
						</view>
						<!-- <view class="view-nums">
							<uni-icons type="eye" size="15" color="#333" class="view-num" ></uni-icons>
							<text>666</text>
						</view> -->
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
					<view class="detail-content">
					      <p class="detail-text">{{item.content}}</p>
					</view>
				</view>
				<view class="info-images" v-if="imageList||imageList[0].url">
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
			<uni-fav :checked="is_fav" class="favBtn" :circle="true" bg-color="#e85353"
								bg-color-checked="#ffcd42" fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick()" />
			<button class="my-want" @click="GotoChat">我想要</button>
		</view>
	</view>
	<dragball :x='100' :y='50' image='http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg'></dragball>
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
	import dragball from '@/components/drag-ball/drag-ball.vue'
	const is_fav = ref(false);
	let token = null;
	const getMethodType = ["需自取","可配送"];
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
				loadData()
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

	const goBack = ()=>{
		uni.navigateBack({
			delta:1
		})
	}
	const GotoChat = ()=>{
		uni.navigateTo({
			url: '/pages/privateChat/privateChat?id=' + item.value.userId + '&name='+item.value.nickName + '&avatar=' + item.value.avatar,
			animationDuration: 300,
		})
	}
	let item = ref({})
	let pictureArray = ref([]);
	let imageList = ref([]);
	function formattedTime(createTime) {
      const now = new Date();
      const publishDate = new Date(createTime);

      // 获取年月日时分秒
      const publishYear = publishDate.getFullYear();
      const publishMonth = publishDate.getMonth() + 1;
      const publishDay = publishDate.getDate();
      const publishHour = publishDate.getHours();
      const publishMinute = publishDate.getMinutes();

      // 判断是否是昨天或今天
      const isToday =
        publishDate.toDateString() === now.toDateString();
      const isYesterday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
      ).toDateString() === publishDate.toDateString();

      if (isToday) {
        return `${publishHour}:${publishMinute}`;
      } else if (isYesterday) {
        return `昨天${publishHour}:${publishMinute}`;
      } else {
        return `${publishMonth}-${publishDay} ${publishHour}:${publishMinute}`;
      }
    }
	const loadData = (id)=>{
		goodsId.value = id
		console.log(goodsId.value);
		uni.request({
			url:"http://94.74.87.251:8080/school/goods/" + goodsId.value,
			method: "GET",
			header: {
				"Authorization": token
			},
			success: (res) => {
				console.log('res',res);
				if (res.data.code == 200) {
					item.value = res.data.data
					console.log('item.value',item.value);
					// console.log('item.value.picture',item.value.picture);
					// 将item.value.picture以逗号分隔成数组，并赋值给全局变量 pictureArray
					pictureArray.value = item.value.picture.split(',');
					goodsId.value = item.value.id
					// console.log('id',goodsId.value);
					// 构建imageList数组
					imageList.value = pictureArray.value.map((url, index) => {
								return { id: index + 1, url: url };
					});
					console.log('item.value修改前的',item.value.avatar);
					item.value.avatar = 'http://94.74.87.251:8080' + item.value.avatar;
					console.log('item.value修改后的',item.value.avatar);
					//解决打开界面默认还是为收藏问题
					if(item.value.isStar===1){
								  is_fav.value =true
					}
					console.log('imageList',imageList.value);
				} else {
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
	let goodsId = ref(null)
	onLoad((option) => {
		uni.getStorage({
				key: 'token',
				success: (res) => {
					token = res.data;
					loadData(option.id)
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
	  font-size: 35rpx;
	}
	.method {
		margin-right: 5px;
		font-size: 14px;
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
		background-color: #f8f8f8;
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
			background-color: #e85353;
			// background-color: crimson;
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
		padding-bottom: 100rpx;
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
					height: 40px;
					width: 40px;
					border-radius: 40px;
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
			  font-size: 25rpx;
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
			font-size: 45rpx;
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
