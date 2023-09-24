<template>
	<view class="page">
		<view class="page-header">
			<view class="calendar-header"  >
				校园日历
			</view>
			<view class="list-icon" @click="goToList()">
				<uni-icons type="list" size="20" color="#fff" ></uni-icons>
			</view>
			<view class="calendar-wrapper">
				<uni-calendar
				class="uni-calendar--hook" 
				:selected="selected"
				@change="changeDate" 
				 @monthSwitch="monthSwitch"	
				/>
			</view>
		</view>
		
			<view class="my-list-wrapper">
				<uni-list class="my-list">
					<uni-list-item  direction="column" v-for="item in selected" :key="item.id" 
					 thumb-size="lg"  clickable @click="showDetail(item)"  >
					<!-- 通过header插槽定义列表的标题 -->
						<template v-slot:header>
							<view class="uni-header">
								<view class="uni-title">{{item.title}}</view>
								<text class="uni-footer-position">{{item.position}}</text>
							</view>
						</template>
							<!-- 同步footer插槽定义列表底部的显示效果 -->
						<template v-slot:footer>
							<view class="uni-footer">
								<text class="uni-footer-time">{{item.time}}</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		
	</view>
	
	
</template>

<script setup>
	import { ref, nextTick,reactive } from 'vue'
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
	const selected = reactive([])
	const showCalendar = ref(false)
	nextTick(() => {
	  showCalendar.value = true
	})
	const showDetail = (item) => {
		console.log('555');
		item.viewNum++
		uni.navigateTo({
			url: '/pages/activityDetail/activityDetail?id=' + item.id // 通过查询参数传递项目ID
		})
	}
	function changeDate(e) {
		// 清空数组
	  selected.splice(0);
	  console.log('change 返回:', e)
	  activities.forEach(activity => {
	     if (activity.date === e.fulldate) {
	       selected.push(activity)
		   console.log('selected',selected);
	     }
	   })
	  // console.log(selected);
	}
	function monthSwitch() {
		selected.splice(0);
	}
	// 跳转到列表
	const goToList = () => {		
		console.log('66666');
		uni.navigateTo({
			url:'/pages/activityList/activityList',
		})
	}
</script>


<style lang="scss" scoped>
	.list-icon {
		z-index: 10000;
		position: fixed;
		top: 30rpx;
		right: 120rpx;
		// 奇怪  莫名其妙要加一个z-index  否则就会被覆盖
		z-index: 99 
	}
	.uni-title {
		font-weight: 550;
		width: 80%;
	}
	.uni-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uni-footer-time {
		color: #333;
		font-size: 30rpx;
	}
	.uni-footer-position {
		color: #d65858;
		font-weight: 550;
		font-size: 35rpx;
	}
	.page {
	  display: flex;
	  flex-direction: column;
	}
	.calendar-wrapper {
	  flex-shrink: 0;
	}
	.my-list-wrapper {
	  height: 45vh;
	  overflow-y: scroll; /* 内容超出自动滚动 */
	  border-top-left-radius: 20rpx;
	  border-top-right-radius: 20rpx;
	  
	}
	.my-list ::v-deep .uni-list {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}
    .uni-calendar--hook ::v-deep .uni-calendar__content  {
		
		background-color: #e85353;
		color: #fff;
	}
	.uni-calendar--hook ::v-deep .uni-calendar__box-bg-text {
		color: #fff;
	}
	.uni-calendar--hook ::v-deep .uni-calendar-item--disable {
		background-color: #e85353;;
	}
		
	.uni-calendar--hook ::v-deep .uni-calendar-item__weeks-box-text {
		color: #fff;
	}
	.uni-calendar--hook ::v-deep .uni-calendar-item--isDay {
		background-color: #fff;
		color: #e85353;
	}
	.uni-calendar--hook ::v-deep .uni-calendar-item--checked {
		background-color: #fff;
		color: #e85353;
	}
	// .uni-calendar--hook ::v-deep .uni-calendar-item--isDay-text {
	// 	color: #e85353;
	// }
	.uni-calendar--hook ::v-deep .uni-calendar-item--hook {
		border-radius: 50%;
	}
	.uni-calendar--hook ::v-deep .uni-calendar__header-text {
		color: #fff;
	}
		
	.calendar-header {
		position: fixed;
		top: 25rpx;
		left: 20rpx;
		color: #fff;
		font-size: 40rpx;
	}
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}
</style>
