<template>
	<view class="status">
	</view>
	<view>
		<view class="topbar">
			<view class="topbar-content">
				活动列表
			</view>
			<uni-icons type="back" size="30" color="#fff" class="go-back" @click="goBack"></uni-icons>
		</view>
		<view class="schedule-list">
			<!-- 头部 -->
			<view class="schedule-list-header">
				<view class="schedule-list-header-btn" @click="prevMonth">上个月</view>
				<view class="schedule-list-header-title">
					<uni-dateformat :date="currentDate" format="yyyy年M月" ref="currentDateShow"></uni-dateformat>
				</view>
				<view class="schedule-list-header-btn" @click="nextMonth">下个月</view>
			</view>
			<!-- 标签 -->
			<uni-fab :pattern="tag_pattern" :content="tag_content" horizontal="right" vertical="bottom"
				direction="vertical" @trigger="tag_trigger"></uni-fab>
			<!-- 主体 -->
			<view class="schedule-list-body">
				<view class="schedule-list-date" v-for="(item_date,index_date) in schedule" :key="index_date" @click="showDetail">
					<view class="schedule-list-date-header">{{item_date.date}}</view>
					<view class="schedule-list-date-body">
						<view class="schedule-list-date-item" v-for="(item_time, index_time) in item_date.content" :key="index_time">
							<view class="item-time">{{item_time.time}}</view>
							<view class="item-tag iconfont" :style="{color:tagToColor(item_time.tag)}">
								&#xe606;
							</view>
							<view class="item-title">{{item_time.title}}</view>
							<view class="item-position">{{item_time.position}}</view>
						</view>
					</view>
					
				</view>
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
		onLoad,onInit
	} from '@dcloudio/uni-app'
	import dragball from '@/components/drag-ball/drag-ball.vue'
	// import { sortBy } from 'lodash'
	// 返回标志
	const goBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
		
	const showDetail = ()=>{
		uni.navigateTo({
			url:'/pages/activityDetail/activityDetail'
		})
	}
	// 头部时间
	const currentDate = reactive(new Date())
	const currentDateShow = ref("");
	const prevMonth = () => {
		console.log(currentDate);
		currentDate.setMonth(currentDate.getMonth() - 1)
	}
	
	const nextMonth = () => {
		console.log(currentDate);
		currentDate.setMonth(currentDate.getMonth() + 1)
		// currentDateShow.value.date = currentDate;
	}

	// 标签选择
	const tag_pattern = {
		color: '#7A7E83',
		backgroundColor: '#fff',
		selectedColor: '#007AFF',
		buttonColor: '#007AFF',
		iconColor: '#fff'
	}
	const tag_content = reactive([{
			text: '全部',
			active: true,
			iconPath: '/static/images/tag1.png',
			selectedIconPath: '/static/images/tag1.png',
		},
		{
			text: '讲座报告',
			active: false,
			iconPath: '/static/images/tag2.png',
			selectedIconPath: '/static/images/tag2.png',
		},
		{
			text: '会议',
			active: false,
			iconPath: '/static/images/tag3.png',
			selectedIconPath: '/static/images/tag3.png',
		},
		{
			text: '考试答辩',
			active: false,
			iconPath: '/static/images/tag4.png',
			selectedIconPath: '/static/images/tag4.png',
		},
		{
			text: '主题活动',
			active: false,
			iconPath: '/static/images/tag5.png',
			selectedIconPath: '/static/images/tag5.png',
		},
		{
			text: '电影演出',
			active: false,
			iconPath: '/static/images/tag6.png',
			selectedIconPath: '/static/images/tag6.png',
		},

		{
			text: '竞赛',
			active: false,
			iconPath: '/static/images/tag7.png',
			selectedIconPath: '/static/images/tag7.png',
		},
		{
			text: '其他',
			active: false,
			iconPath: '/static/images/tag1.png',
			selectedIconPath: '/static/images/tag1.png',
		},
	])
	const selectedTag = ref('全部')
	const tag_colors = ['#333333','#337ab7','#f0ad4e','#5bc0de','#d9534f','#339900','#663366'];
	const tag_trigger = (e) => {
		// console.log(e);
		tag_content.forEach(tag => {
			tag.active = false;
		})
		tag_content[e.index].active = true;
		selectedTag.value = tag_content[e.index].text;
	}

	// 展示列表
	const schedule = reactive([
		{
			date: '2023-07-08',
			content: [
				{			date: '2023-07-08',
					title: '去比赛',
					time: '10:00',
					tag: '讲座报告',
					id:'1',
					position:'G101',
					detail:'我是详细信息'
				},
				{			date: '2023-07-08',
					title: '去比赛',
					time: '08:00',
					tag: '竞赛',
					id:'2',
					position:'G101',
					detail:'我是详细信息'
				},
			]
		},
		{
			date: '2023-07-10',
			content: [
				{				date: '2023-07-10',
					title: '去比赛',
					time: '08:00',
					tag: '会议',
					id:'3',
					position:'G101',
					detail:'我是详细信息'
				},
				{			date: '2023-07-10',
					title: '去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛去比赛',
					time: '10:00',
					tag: '考前答辩',
					id:'4',
					position:'G101',
					detail:'我是详细信息'
				}
			]
		},
		{
			date: '2023-07-09',
			content: [
				{date: '2023-07-09',
					title: '去比赛',
					time: '08:00',
					tag: '竞赛',
					id:'5',
					position:'G101',
					detail:'我是详细信息'
				}
			]
		},
		
	])
	const tagToColor = (tag_name) => {
		for(var i=0;i<tag_content.length;i++) {
			if(tag_content[i].text == tag_name)
				return tag_colors[i];
		}
	}
	onMounted(() => {
	  // 对所有的天按时间顺序排列
	  schedule.sort((a, b) => {
	    return new Date(a.date) - new Date(b.date);
	  });
	
	  // 对每一天里的所有事项按时间顺序排列
	  schedule.forEach(day => {
		day.content.sort((a, b) => {
		  const timeA = a.time.split(':').map(val => parseInt(val, 10));
		  const timeB = b.time.split(':').map(val => parseInt(val, 10));
		  const minutesA = timeA[0] * 60 + timeA[1];
		  const minutesB = timeB[0] * 60 + timeB[1];
		  return minutesA - minutesB;
		});
	  });
	});
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

	.schedule-list {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.schedule-list-header {
		width: 100%;
		height: 88rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;
		font-size: 24px;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
		padding: 0 32rpx;
	}

	.schedule-list-header-btn {
		font-size: 16px;
		color: #333333;
		cursor: pointer;
	}
	.schedule-list-body {
		display: flex;
		flex-direction: column;
		width: 100vw;
		padding: 0 20rpx;
		border-left: 1px solid rgb(244,244,244);
		.schedule-list-date-header {
			height: 75rpx;
			line-height: 75rpx;
			padding: 0 25px;
			font-weight: 600;
			background-color: #eee;
		}
		.schedule-list-date-item {
			// position: relative;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			// white-space: nowrap;
		    overflow-x: auto;
		    // text-overflow: ellipsis;
			height: 75rpx;
			line-height: 75rpx;
			padding: 0 10px;
			border: 1px solid rgb(244,244,244);
			.item-tag {
				margin-left: 20rpx;
				flex: 0 0 auto;
			}
			.item-title {
				margin-left: 20rpx;
				flex: 1 1 auto;
			}
			.item-position {
				margin-left: 20rpx;
				flex: 0 0 auto;
			}
		}
	}
</style>