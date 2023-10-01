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
					@click="handleClick(chat.name,chat.head_img_url)">
				</uni-list-chat>

			</uni-list>
		</scroll-view>
	</view>
</template>

<script setup>
	import toFriendlyTime from "../../utils/toFriendlyTime.js"
	import {
		reactive,
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const chat_views = reactive([{
			id: 1,
			tag: "活动我先知",
			name: "活动我先知",
			head_img_url: "../.././static/images/img1.jpg",
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 10
		},
		{
			id: 2,
			tag: "新生引导员",
			name: "新生引导员",
			head_img_url: "../.././static/images/img2.jpg",
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 0
		},
		{
			id: 3,
			tag: "餐厅探店侠",
			name: "餐厅探店侠",
			head_img_url: "../.././static/images/img3.jpg",
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 10
		},
		{
			id: 4,
			tag: "预约助手",
			name: "预约助手",
			head_img_url: "../.././static/images/img4.jpg",
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 2
		},
		{
			id: 5,
			tag: "学习助手",
			name: "学习助手",
			head_img_url: "../.././static/images/img5.jpg",
			last_word: "你好呀",
			last_word_date: 1690702956056,
			unread_count: 10
		},
	]);


	// 点击跳转聊天界面
	const handleClick = (server,url) => {
		console.log(server,url);
		
		uni.navigateTo({
			url: '/pages/chat/chat?server_name=' + server,
			animationDuration: 300
		})
		// uni.request({
		// 	url:'http://119.8.190.49:5000/query',
		// 	method:"POST",
		// 	data:{
		// 		query: "oi?"
		// 	},
		// 	header: {
		// 		"Content-Type": "application/json;charset=UTF-8"
		// 	},
		// 	success: (res) => {
		// 		console.log(res);
		// 	},
		// 	fail: (err) => {
		// 		console.log(err);
		// 	}
		// })
		// uni.request({
		// 	url: 'https://u232543-ba75-9c7c3195.westb.seetacloud.com:8443/customer-service',
		// 	method: "POST",
		// 	data: {
		// 		question: "How much does it cost?"
				
		// 	},
		// 	header: {
		// 		"Content-Type": "application/json;charset=UTF-8"
		// 	},
		// 	success: (res) => {
		// 		console.log(res);
		// 	},
		// 	fail: (err) => {
		// 		console.log(err);
		// 	}
		// })
	}
	// 时间转换
	const friendlyTime = (timestamp) => {
		return toFriendlyTime(timestamp)
	}
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