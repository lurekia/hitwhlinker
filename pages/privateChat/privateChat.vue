<template>
	<view class="chat">
		<!-- 主要聊天页面 -->
		<scroll-view class="content" :style="{paddingBottom:paddingBottom+'px'}" scroll-y="true"
			:scroll-into-view="`msg${msgs.length-1}`" :scroll-with-animation="true">
			<view class="msg-list">
				<view class="msg-item" :id="`msg${index}`" v-for="(msg, index) in msgs" :key="msg.time">
					<left-chat v-if="msg.left" :msg="msg" :head_img_url="left_avatar"></left-chat>
					<right-chat v-else :msg="msg" :head_img_url="right_avatar"></right-chat>
				</view>
			</view>
		</scroll-view>
		<view class="bottom-box">
			<view class="bottom-input" :style="{paddingBottom:keyBoardHeight+'px'}">
				<text class="iconfont icon">&#xe605;</text>
				<view class="textarea-container">
					<textarea auto-height :fixed="true" confirm-type="send" v-model="input" @confirm="submit"
						:adjust-position="false" :cursor-spacing="20" @focus="scrollToBottom()" />
				</view>
				<button v-if="input!==''" type="primary" @click="submit()" size="mini">发送</button>
				<text v-else class="iconfont icon" @click="toolShow = !toolShow, scrollToBottom()">&#xe603;</text>
			</view>
			<tool-box v-if="toolShow" :height="toolHeight + 'px'"></tool-box>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		onMounted,
		nextTick,
		getCurrentInstance
	} from 'vue'
	import {
		onLoad,
		onUnload,
		// getCurrentPages
	} from '@dcloudio/uni-app'
	import leftChat from '@/components/chat/leftChat.vue'
	import rightChat from '@/components/chat/rightChat.vue'
	import toolBox from '@/components/unicomp/toolBox.vue'
	// 设备信息
	const {
		proxy
	} = getCurrentInstance()
	const im = proxy.goEasy.im
	let systemInfo = null
	let msgs = ref([{
		left: true,
		content: "请问有什么为您服务的吗？",
		tag: 'text',
		time: "2023/7/29 12:00:00"
	}, ]);
	// 对方用户信息
	let user_info = {
		id: "100",
		name: "小红",
		avatar: "../.././static/images/img2.jpg"
	};
	let friend_info = {
		id: "100",
		name: "小红",
		avatar: "../.././static/images/img2.jpg"
	};
	// const server_id = null;
	// let server_type = "";
	// 状态参数
	const toolShow = ref(false)
	// 样式参数
	const scrollTop = ref(0)
	const keyBoardHeight = ref(10)
	const toolHeight = ref(278)
	const paddingBottom = computed(() => {
		if (toolShow.value == true) {
			return toolHeight.value + 50
		}
		return keyBoardHeight.value + 50
	})


	// 有用数据
	const input = ref("");
	// 头像
	let left_avatar = ref("../.././static/images/img1.jpg");
	const right_avatar = ref("../.././static/images/img5.jpg")

	// 滑动到最底部
	const scrollToBottom = async () => {
		await nextTick()
		setTimeout(() => {
			uni.createSelectorQuery().select('.content').boundingClientRect((res) => {
				uni.pageScrollTo({
					scrollTop: res.height,
					duration: 200
				})
			}).exec()
		}, 50)
	}


	const listenKeyboard = (res) => {
		// console.log(res.height);
		keyBoardHeight.value = res.height + 10
		// console.log(keyBoardHeight);
		if (res.height) {
			toolShow.value = false
			toolHeight.value = res.height
		}
	}

	const handleChooseImage = (filePaths) => {
		console.log(filePaths);
		filePaths.forEach(item => {
			let msg = {
				left: false,
				content: item,
				tag: 'img',
				time: "2023/7/29 12:00:00"
			}
			msgs.value.push(msg)
			scrollToBottom()
		})
	}
	const putProduct = () => {
		const data = {
			left: false,
			content: "",
			tag: 'product',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(data)
		scrollToBottom()
	}
	const getPrompt = (str) => {
		const msg = {
			left: false,
			content: str,
			tag: 'text',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(msg)
		scrollToBottom()
		query_server(str)
	}
	// #ifdef APP
	uni.onKeyboardHeightChange(listenKeyboard)
	// #endif

	const submit = () => {
		if (input.value.trim() === '') {
			return
		}
		// 客户端
		const msg = {
			left: false,
			content: input.value,
			tag: 'text',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(msg)
		scrollToBottom()
		//创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
		let textMessage = im.createTextMessage({
			text: input.value, //消息内容
			to: {
				type: proxy.GoEasy.IM_SCENE.PRIVATE, //私聊还是群聊，群聊为GoEasy.IM_SCENE.GROUP
				id: friend_info.id, //接收方用户id
				data: {
					"avatar": friend_info.avatar,
					"name": friend_info.name
				} //接收方用户扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
			}
		});
		console.log(textMessage);
		//发送消息
		im.sendMessage({
			message: textMessage,
			onSuccess: function(message) { //发送成功
				console.log("Private message sent successfully.", message);
			},
			onFailed: function(error) { //发送失败
				console.log('Failed to send private message，code:' + error.code + ' ,error ' + error
					.content);
			}
		});
		// input.value = ""
		input.value = "";
	}

	// 标记已读
	const markPrivateMessageAsRead = () => {
		proxy.goEasy.im.markMessageAsRead({
		  id: friend_info.id,
		  type: proxy.GoEasy.IM_SCENE.PRIVATE,
		  onSuccess: function () {
		    console.log('标记私聊已读成功');
		  },
		  onFailed: function (error) {
		    console.log("标记私聊已读失败", error);
		  }
		});
	}
	//  初始私聊信息
	const initMsgs = (friend) => {
		// console.log(data);
		uni.showLoading()
		// uni.showLoading()
		uni.setNavigationBarTitle({
			title: friend_info.name
		})
		msgs.value = []
		im.history({
			id: friend_info.id, //用户id或者群id
			type: proxy.GoEasy.IM_SCENE.PRIVATE, //群聊：GoEasy.IM_SCENE.GROUP, 客服：GoEasy.IM_SCENE.CS,
			lastTimestamp: null, //上次查询结果里最后一条消息的时间戳，首次查询传入null即可
			// limit: 10, //可选项，返回的消息条数，默认为10条，最多30条
			onSuccess: function(res) {
				if (res.code === 200) {
					for (let item of res.content) {
						let msg = {
							left: item.senderId === friend_info.id ? true : false,
							tag: item.type,
							content: item.payload.text ? item.payload.text : item.payload.url,
							time: item.timestamp
						}
						msgs.value.push(msg)
					}
					markPrivateMessageAsRead()
					uni.hideLoading()
					console.log("加载完毕");
				}
				//单聊历史消息result示例

			},
			onFailed: function(error) { //获取失败
				console.log("Failed to query private message, code:" + error.code + " content:" + error
					.content);
			},
		});

		// uni.hideLoading()
	}
	// 接收信息
	const onMessageReceived = (message) => {
		//文字消息
		    // {
		    //     "messageId": "8f0e27a0c7e111eab347b726da4416bd",
		    //     "timestamp": 1594958217087,
		    //     "type": "text",
		    //     "senderId": "3bb179af-bcc5-4fe0-9dac-c05688484649",
		    //     "payload": {
		    //         "text": "Hello, GoEasyIM"
		    //     },
		    //     "receiverId": "fdee46b0-4b01-4590-bdba-6586d7617f95"
		    // }
		    console.log("received private message:" + JSON.stringify(message));
			let msg = {
				left: true,
				tag: message.type,
				content: message.payload.text ?	message.payload.text : message.payload.url,
				time: message.timestamp
			}
			msgs.value.push(msg)
			markPrivateMessageAsRead()
			scrollToBottom()
	}
	
	onLoad((option) => {
		// getSystemInfo()
		// scrollToBottom()
		friend_info = {id:option.id,name:option.name,avatar:option.avatar}
		left_avatar.value = friend_info.avatar;
		initMsgs()
		// const pages = getCurrentPages();  // 无需import
		// const page = pages[pages.length - 1];
		// const eventChannel = page.getOpenerEventChannel();
		// eventChannel.on("initMsgs", initMsgs);
		uni.getStorage({
			key: 'user_info',
			success: (res) => {
				// console.log(res.data);
				user_info = JSON.parse(res.data);
				right_avatar.value = user_info.avatar;
				console.log("用户信息：", user_info);
			},
			fail: (err) => {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
			}
		});
		
		uni.$on("chooseImage", handleChooseImage)
		uni.$on("putProduct", putProduct)
		uni.$on("getPrompt", getPrompt)
		
		
		proxy.goEasy.im.on(proxy.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, onMessageReceived);
	})
	onUnload(() => {
		// #ifdef APP
		uni.offKeyboardHeightChange(listenKeyboard)
		// #endif
		uni.$off("chooseImage", handleChooseImage)
		uni.$off("putProduct", putProduct)
		uni.$off("getPrompt", getPrompt)
		proxy.goEasy.im.off(proxy.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, onMessageReceived);
	})
	
</script>

<style lang="scss" scoped>
	view {
		display: flex;
		box-sizing: border-box;
	}

	page {
			overflow-anchor: auto;
			background-color: #efefef;
		}
		.chat {
			flex: 1;
			height: 100vh;
			background-color: #efefef;
		}
		.page {
			flex: 1;
			height: calc(100vh - 45px);
			background-color: #efefef;
			// background-color: pink;
		}
	
	
		.content {
			flex-direction: column;
			flex-grow: 1;
			background-color: #efefef;
		}

	.msg-list {
		flex-direction: column;
	}

	.msg-item {
		margin: 5px 0;
	}

	.bottom-box {
		flex-direction: column;
		// border-top: 1px solid #BBBBBB ;
		background-color: #F7F7F7;
		position: fixed;
		bottom: 0;
		z-index: 99999;
	}

	.bottom-input {
		flex-direction: row;
		align-items: center;

		width: 100vw;

		padding: 10px;

		.textarea-container {
			flex-grow: 1;
			min-height: 30px;
			line-height: 30px;
			margin-left: 20rpx;
			background-color: #ffffff;
			border-radius: 10px;

			textarea {
				width: calc(100vw - 146px);
				background-color: #ffffff;
			}
		}

		.icon {
			margin-left: 20rpx;
			font-size: 24px;
			color: gray;
		}
	}
</style>