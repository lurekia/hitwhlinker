<template>
	<view class="status">
	</view>
	<view class="chat">

		<!-- 头部 -->
		<view class="header">
			<text class="title">Student Buddy</text>
			<view class="tool">
				<text class="iconfont icon">&#xe602;</text>
				<text class="iconfont icon">&#xe601;</text>
			</view>
		</view>
		<!-- 所有好友列表 -->
		<!-- <scroll-view class="content" scroll-y="true"> 
			<ul>
				<li v-for="(chat, index) in chat_views" :key="index" class="chat-view" @click="handleClick(chat)">
					<image src="@/static/head.jpeg" mode="aspectFill" class="chat-img"></image>
					<view class="chat-content">
						<text class="text-name">{{chat.name}}</text>
						<text class="text-word">{{chat.last_word}}</text>
					</view>
					<view class="chat-date">
						<text>{{chat.last_word_date}}</text>
					</view>
				</li>
			</ul>
		</scroll-view> -->

		<scroll-view id="user-list-box" scroll-y="true">
			<!-- 会话用户列表 -->
			<uni-list :border="true">
				<uni-list-chat v-for="(chat,index) in chat_views" :key="chat.id" :showBadge="chat.unread_count>0"
					:badgeText="chat.unread_count" badge-positon="left" :title="chat.name" :avatar="chat.head_img_url"
					:note="chat.last_word" :time="friendlyTime(chat.last_word_date)" :clickable="true"
					@click="handleClick(index)">
				</uni-list-chat>

			</uni-list>
		</scroll-view>
	</view>
</template>

<script setup>
	import toFriendlyTime from "../../utils/toFriendlyTime.js"
	import {
		reactive,
		ref,
		onMounted
	} from 'vue'
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'

	const chat_views = ref([{
			id: 1,
			name: "活动我先知",
			type: "Club_activities",
			head_img_url: "../.././static/images/img1.jpg",
			msgs: [],
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 0
		},
		{
			id: 2,
			name: "新生引导员",
			type: "StuDoc",
			head_img_url: "../.././static/images/img2.jpg",
			msgs: [],
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 0
		},
		{
			id: 3,
			name: "餐厅探店侠",
			type:"Canteen",
			head_img_url: "../.././static/images/img3.jpg",
			msgs: [],
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 0
		},
		{
			id: 4,
			name: "预约助手",
			type:"classroom",
			head_img_url: "../.././static/images/img4.jpg",
			msgs: [],
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 0
		},
		{
			id: 5,
			name: "学习助手",
			type:"Learning_buddy",
			head_img_url: "../.././static/images/img5.jpg",
			msgs: [],
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 0
		},
	]);

 
	// 点击跳转聊天界面
	const handleClick = (index) => {
		console.log(index);
		
		uni.navigateTo({
			url: '/pages/chat/chat?server_name=' + chat_views.value[index].name+'&server_type='+chat_views.value[index].type,
			animationDuration: 300,
			events:{
				initMsgs: function(data) {
				      console.log(data)
				},
			},
			success: (res) => {
				// const friend_info = 
				// console.log("看看：",friend_info);
				res.eventChannel.emit("initMsgs",chat_views.value[index].msgs)
			}
		})
		
	}
	// 时间转换
	const friendlyTime = (timestamp) => {
		return toFriendlyTime(timestamp)
	}
	
	const loadData = () => {
		for(let i=0;i<chat_views.value.length;i++) {
			uni.request({
				url:'http://119.8.190.49:5000/get_chat_history',
				method:"GET",
				data:{
					user_id: 103,
					npc_name: chat_views.value[i].type
				},
				header: {
					"Content-Type": "application/json;charset=UTF-8"
				},
				success: (res) => {
					console.log(res);
					if(res.statusCode == 200) {
						chat_views.value[i].msgs = res.data
						if(res.data.length == 0) {
							chat_views.value[i].last_word = "无"
							chat_views.value[i].last_word_date = 0
						} else {
							const len = res.data.length;
							chat_views.value[i].last_word = res.data[len-1].message
							chat_views.value[i].last_word_date = res.data[len-1].timestamp
						}
					} else {
						console.log(res.msg);
					}
				},
				fail: (err) => {
					console.log(err);
				}
			})
		}
		
	}
	
	onShow(() => {
		uni.getStorage({
			key: 'token',
			success: (res) => {
				console.log(res.data);
				loadData();
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
	.header {
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 30rpx;
		border-bottom: 1px solid rgb(244, 244, 244);
		background-color: rgb(213, 79, 79);
		color: white;

		.title {
			font-size: 22px;
			font-weight: 600;
		}

		.tool {
			.icon {
				margin-left: 20rpx;
				font-size: 22px;
			}

		}
	}

	.content {
		height: calc(90vh - var(--window-bottom));
		background-color: rgb(255, 255, 255);
		width: 750rpx;

		ul {
			padding: 0;
		}

		ul li {
			box-sizing: border-box;
			list-style: none;
		}

		.chat-view {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100vw;
			height: 64px;
			padding: 3vw;
			border-bottom: 1px solid rgb(244, 244, 244);

			.chat-img {
				width: 10vw;
				height: 10vw;
			}

			.chat-content {
				display: flex;
				flex-direction: column;
				width: 65vw;

				.text-name {
					line-height: 22px;
					font-size: 16px;
				}

				.text-word {
					line-height: 22px;
					font-size: 13px;
					color: grey;
				}
			}

			.chat-date {
				width: 10vw;
				font-size: 12px;
				color: grey;
			}
		}
	}
</style>