<template>
	<view>
		<view class="page-header"  :style = "'backgroundImage:url('+item.src +')'">
			<view class="back">
				<uni-icons type="back" size="22" color="#fff" class="go-back" @click="goBack"></uni-icons>
				<text>返回</text>
			</view>
			<text class="act-title">{{item.title}}</text>
			<view class="view-nums">
				<uni-icons type="eye" size="15" color="#fff" class="view-num" ></uni-icons>
				<text>{{item.viewNum}}</text>
			</view>
			<view class="act-person">
				<view>
				  <image :src="item.authorSrc" mode="aspectFill" class="radius" style="height: 40rpx;width: 40rpx;"></image>
				</view>
				<text class="person-name">{{item.authorName}}</text>
			</view>
		</view>
		<view class="page-body">
			<!-- <view class="img-like" @click="commentLike(item)">
				<image src="../../static/aixin.png" v-if="item.isLike == 0 || item.isLike == null"></image>
				<image src="../../static/aixin3.png" v-else></image>
				<text class="comment-like-num">{{ item.likeNums == 0 || item.likeNums == null ? '' : item.likeNums }}</text>
			</view> -->
			<!-- <view class="fa" :class="{'fa-heart': liked, 'fa-heart-o': !liked}" @click="toggleLike"></view>-->
			<!-- <view class="heart-icon" :class="liked ? 'liked' : ''" @tap="toggleLike"></view> -->
			
			
		</view>
		<view class="page-bottom">
			<view class="like-orNot">
				<uni-icons type="hand-down" size="22" @click="toggleRecommend()" v-if="!recommendMore"></uni-icons>
				<uni-icons type="hand-down-filled" size="22"  @click="toggleRecommend()"  v-else="recommendMore"></uni-icons>
			</view>
			<view class="like-count">
				<uni-icons type="heart" size="22" color="#ef5656" @click="toggleLike()" v-if="!liked"></uni-icons>
				<uni-icons type="heart-filled" size="22" color="#ef5656" @click="toggleLike()" v-else="liked"></uni-icons>
				    <text>{{ item.likeCount }}</text>
			</view>
		</view>
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
		onLoad,onInit
	} from '@dcloudio/uni-app'
	// import { sortBy } from 'lodash'
	// 返回标志
	const goBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	var liked = ref(false)
	var recommendMore = ref(false)
	var likeCount = ref(0)
	const toggleLike = ()=> {
	  liked.value = !liked.value;
	  likeCount.value += liked.value ? 1 : -1;
	  console.log('liked',liked,'likeCount',likeCount);
	}
	const toggleRecommend = ()=>{
		recommendMore.value = !recommendMore.value;
	}
	const activities = reactive([
		{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'1',
			detail:'56656556',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'2',
			detail:'56656556',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'3',
			detail:'56656556',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'4',
			detail:'56656556',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'5',
			detail:'56656556',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'6',
			detail:'56656556',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'7',
			detail:'56656556',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'8',
			detail:'56656556',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},
	])
	const item = ref({})
	onLoad((options) => {
		const itemId = options.id;
		 item.value = activities.find(activity => activity.id === itemId)
		console.log(item);
	})
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
	}
	.page-header {
	  width: 100%;
	  height: 400rpx;
	  background-image: url("https://cdn.pixabay.com/photo/2020/05/19/13/35/cartoon-5190860_1280.jpg");
	  background-size: 100% ;
	  background-position: center center; /* 或者根据需要进行调整 */
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
		  color: #fff;
		  font-size: 45rpx;
		  font-weight: 500;
	  }
	  .view-nums{
		  opacity: 0.9;
		  font-size: 15rpx;
		  color: #fff;
		  position: absolute;
		  display: flex;
		  right: 40rpx;
		  bottom: 30rpx;
		  .view-num {
			  margin-right: 5rpx;
		  }
	  }
	  .act-person {
		  position: absolute;
		  display: flex;
		  left: 40rpx;
		  bottom: 30rpx;
		  .radius {
			  border-radius: 100%;
			  margin-right: 5rpx;
		  }
		  .person-name{
			  color: #fff;
			  opacity: 0.8;
		  }
	  }
	}
</style>
