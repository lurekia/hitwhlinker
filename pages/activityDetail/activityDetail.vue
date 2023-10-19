<template>
	<view class="status">
	</view>
	<view>
		<view class="page-header" :style="{'background-image': `url('${item.cover}')`}" >
			<!-- -->
			<view class="back">
				<uni-icons type="back" size="22" color="black" class="go-back" @click="goBack"></uni-icons>
				<text style="color: black;">返回</text>
			</view>
			
			
		</view>
		<view class="page-info">
			<view class="act-title">
				<text class="act-title-text">{{item.title}}</text>
			</view>
			<view class="title-bottom">
				<view class="act-person">
					<view>
					  <image :src="item.avatar" mode="aspectFill" class="radius" style="height: 40rpx;width: 40rpx;"></image>
					</view>
					<text class="person-name">{{item.nickName}}</text>
				</view>
				<view class="act-date" style="color: #2c7bfe;">
					{{item.startDate}} {{getFormattedTime(item.startTime)}}
				</view>
			</view>
		</view>
		<view class="page-body">
			<!-- 不需要引入，可直接使用 -->
			<mp-html :content="item.detail" />
			
			
		</view>
		<view class="page-bottom">
			<!-- <view class="like-orNot">
				<uni-icons type="hand-down" size="22" @click="toggleRecommend()" v-if="!recommendMore"></uni-icons>
				<uni-icons type="hand-down-filled" size="22"  @click="toggleRecommend()"  v-else="recommendMore"></uni-icons>
			</view> -->
			<view class="view-nums">
				<uni-icons type="eye" size="20" color="#191919" class="view-num" ></uni-icons>
				<text>{{item.viewNum}}</text>
			</view>
			<view class="like-count">
				<uni-icons type="heart" size="22" color="#ef5656" @click="toggleLike()" v-if="!is_fav"></uni-icons>
				<uni-icons type="heart-filled" size="22" color="#ef5656" @click="toggleLike()" v-else="is_fav"></uni-icons>
				    <text>{{ item.likeCount }}</text>
			</view>
		</view>
		<dragball :x='100' :y='50' image='http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg'></dragball>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		computed,
		watch
	} from 'vue'
	import {
		onLoad,onInit,onUnload,onShow,onReady
	} from '@dcloudio/uni-app'

	import dragball from '@/components/drag-ball/drag-ball.vue'
	// import { sortBy } from 'lodash'
	// 返回标志
	let token = null;
	let item = ref({})
	function getFormattedTime(time) {
      const [hour, minute] = time.split(':'); // 将时间字符串拆分为小时和分钟
      const formattedTime = `${hour}:${minute}`; // 格式化为小时:分钟
      return formattedTime;
    }
	const loadData = (id)=>{
		activityId.value = id
		console.log(activityId.value);
		uni.request({
			url:"http://94.74.87.251:8080/school/activity/" + activityId.value,
			method: "GET",
			header: {
				"Authorization": token
			},
			success: (res) => {
				console.log('res',res);
				if (res.data.code == 200) {
					item.value = res.data.data
					console.log('item.value',item.value);
					activityId.value = item.value.id
					console.log('id',activityId.value);
					//处理图片路径
					const regex = /<img[^>]+src="\/dev-api([^">]+)"/g;
					const detailWithModifiedSrc = item.value.detail.replace(regex, '<img src="http://94.74.87.251:8080$1"');
					item.value.detail = detailWithModifiedSrc;
					item.value.avatar = 'http://94.74.87.251:8080' + item.value.avatar;
					item.value.cover = 'http://94.74.87.251:8080' + item.value.cover;
					console.log('item.cover',item.value.cover);
					//解决打开界面默认还是为收藏问题
					if(item.value.isLike===1){
								  is_fav.value =true
					}
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
	let activityId = ref(null)
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
	
	const goBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	// var item.value.isLike = ref(false)
	// var recommendMore = ref(false)
	// const toggleLike = ()=> {
	//   item.value.isLike.value = !item.value.isLike.value;
	// }
	// const toggleRecommend = ()=>{
	// 	recommendMore.value = !recommendMore.value;
	// }
	const is_fav = ref(false);
	function toggleLike() {
	  is_fav.value = !is_fav.value ;
	  uni.request({
	  	url: "http://94.74.87.251:8080/school/activity/like/" + item.value.id,
	  	method: "GET",
	  	header: {
	  		"Authorization": token
	  	},
	  	success: (res) => {
	  		// console.log(res);
	  		if (res.data.code == 200) {
	  			console.log(res);
				console.log(item.value);
				loadData()
				item.value.likeCount = res.data.data
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
	function updateLikeCount() {
	      // 发送异步请求获取最新的点赞数量
	      fetch(`http://94.74.87.251:8080/school/activity/like/${item.value.id}`)
	        .then(response => response.json())
	        .then(data => {
	          // 将最新的点赞数量赋值给响应式数据属性
			  console.log('异步data',data);
	          item.value.likeCount = data.likeCount;
	        })
	        .catch(error => {
	          // 处理请求错误
	          console.error('Error:', error);
	        });
	    }
	// const activities = reactive()
	// const item = ref({})
	// onLoad((options) => {
	// 	const itemId = options.id;
	// 	 item.value = activities.find(activity => activity.id === itemId)
	// 	console.log(item);
	// })
</script>

<style lang="scss">
	.page-bottom {
		position: fixed;
		bottom: 0;
		width:100%;
		height:50rpx;
		line-height: 50rpx;
		background-color: #f1f3f4;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		.view-nums{
				  opacity: 0.9;
				  font-size: 30rpx;
				  color: #191919;
				  display: flex;
				  .view-num {
					  margin-right: 5rpx;
				  }
		}
	}
	.page-info {
		width: 96%;
		
		margin: 20rpx 0;
		.act-title-text {
			display: flex;
			justify-content: center;
			font-weight: 710;
			font-size: 50rpx;
		}
		.title-bottom {
			width: 80%;
			margin: 20rpx auto;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 0.5px solid #d3eaf5;
			.act-person {
					  display: flex;
					  .radius {
						  border-radius: 100%;
						  margin-right: 5rpx;
					  }
					  .person-name{
						  color: #2c7bfe;
					  }
			}
		}
	}
	.page-body {
		width: 95%;
		margin: 20rpx auto;
	}
	.page-header {
	  width: 100%;
	  height: 400rpx;
	  // background-size: 100% ;
	  // background-position: center center; /* 或者根据需要进行调整 */
	   background-size: cover;
	    background-repeat: no-repeat;
	    background-position: center center;
		// background-image: url('http://94.74.87.251:8080/profile/upload/2023/10/17/屏幕截图 2023-03-02 210818_20231017202919A009.png');
	  position: relative;
	  .back{
		  position: absolute;
		  display: flex;
		  top: 20rpx;
		  left: 20rpx;
		  color: #fff;
		  font-size: 30rpx;
	  }
	  .act-title {
		  position: absolute;
		  display: flex;
		  top: 200rpx;
		  left: 30rpx;
		  color: #333;
		  font-size: 45rpx;
		  font-weight: 500;
	  }
	  
	  
	}
</style>
