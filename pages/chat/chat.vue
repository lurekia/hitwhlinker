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
				<text class="iconfont icon" @click="startRecord">&#xe605;</text>
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
		nextTick
	} from 'vue'
	import {
		onLoad,
		onUnload
	} from '@dcloudio/uni-app'
	import leftChat from '@/components/chat/leftChat.vue'
	import rightChat from '@/components/chat/rightChat.vue'
	import toolBox from '@/components/unicomp/toolBox.vue'
	import Voice from '@/lib/BDvoice/voicePlay/voiceplay.js'
	// 设备信息
	let systemInfo = null
	let msgs = ref([
		{
			left: true,
			content: "请问有什么为您服务的吗？",
			tag: 'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: false,
			content: "帮我预约个图书馆座位",
			tag: 'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: true,
			content: "已根据您的需求，为您找好座位，请看是否需要修改，否则三秒内即将自动为您选座",
			tag: 'libraryForm',
			time: "2023/7/29 12:00:00"
		},
		{
			left: false,
			content: "我觉得这个座位可以",
			tag: 'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: true,
			content: "好的，已经为您预约好座位，请按时去图书馆自习",
			tag: 'text',
			time: "2023/7/29 12:00:00"
		},
	]);

	// 对方用户信息
	let user_info = {
		id: "100",
		name: "小红",
		avatar: "../.././static/images/img2.jpg"
	};
	// let friend_info = {
	// 	id: "100",
	// 	name: "小红",
	// 	avatar: "../.././static/images/img2.jpg"
	// };
	// 对方用户名
	let title = "";
	// const server_id = null;
	let server_type = "";
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

	// 加载数据

	const loadChat = () => {
		console.log("加载数据");
	}
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
	const getSystemInfo = () => {
		uni.getSystemInfo({
			success: (res) => {
				systemInfo = res
			},
			fail: (err) => {
				console.log(err);
			}
		})
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
		// console.log(filePaths);
		filePaths.forEach(item => {
			console.log(item);
			uni.uploadFile({
				url: 'http://94.74.87.251:8080/upload', //仅为示例，非真实的接口地址
				filePath: item,
				name: 'image',
				formData: {
					// 'user': 'test'
				},
				success: (res) => {
					// console.log(uploadFileRes.data);
					// 解析返回的数据为JSON对象
					console.log(res);
					const responseData = JSON.parse(res.data);
					// 从JSON对象中获取图片URL
					if (responseData.code === 200) {
						const url = responseData.msg;
						let msg = {
							left: false,
							content: url,
							tag: 'img',
							time: "2023/7/29 12:00:00"
						}
						msgs.value.push(msg)
						scrollToBottom()
					}

				}
			});


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

	// #ifdef APP
	uni.onKeyboardHeightChange(listenKeyboard)
	// #endif
	const query_server = (str) => {
		// uni.request({
		// 	url: 'http://119.8.190.49:5000/query_local_information',
		// 	method: "POST",
		// 	data: {
		// 		query: str,
		// 		type: server_type
		// 	},
		// 	header: {
		// 		"Content-Type": "application/json;charset=UTF-8"
		// 	},
		// 	success: (res) => {
		// 		console.log(res);
		// 		const msg = {
		// 			left: true,
		// 			content: res.data.answer,
		// 			tag: 'text',
		// 			time: "2023/7/29 12:00:00"
		// 		}
		// 		msgs.value.push(msg)
		// 		scrollToBottom()
		// 	},
		// 	fail: (err) => {
		// 		console.log(err);
		// 	}
		// })
		const msg = {
			left: true,
			content: '我都不知道你在说什么',
			tag: 'text',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(msg)
		Voice(msg.content)
	}

	const testVoice = () => {
		console.log("祝你恭喜发财");
		// Voice("祝你恭喜发财")

		// const innerAudioContext = uni.createInnerAudioContext();
		// innerAudioContext.autoplay = true;
		// innerAudioContext.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
		// innerAudioContext.onPlay(() => {
		//   console.log('开始播放');
		// });
		// innerAudioContext.onError((res) => {
		//   console.log(res.errMsg);
		//   console.log(res.errCode);
		// });
	}

	const submit = () => {
		if (input.value === '') {
			return
		}
		const msg = {
			left: false,
			content: input.value,
			tag: 'text',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(msg)
		// input.value = ""
		scrollToBottom()
		query_server(input.value)
		input.value = "";
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

	const initMsgs = (data) => {
		console.log(data);
		// msgs.value = []
		// for(let i=0;i<data.length;i++) {
		// 	const msg = {
		// 		left: !data[i].is_from_user,
		// 		content: data[i].message,
		// 		time: data[i].timestamp,
		// 		tag: "text"
		// 	}
		// 	msgs.value.push(msg)
		// }
	}
	const startRecord = () => {
		var options = { // 语音转文字的设置
			engine: 'baidu'
		};
		console.log('开始语音识别：');
		plus.speech.startRecognize(options, function(s) { //plus.speech.startRecognize可查官方文档
			console.log(s);
			input.value += s;
		}, function(e) {
			console.log('语音识别失败：' + JSON.stringify(e));
		});
	}
	onMounted(() => {
		// getSystemInfo()
		scrollToBottom()
		testVoice()
	})
	onLoad((obj) => {
		// const eventChannel = this.getOpenerEventChannel();
		const pages = getCurrentPages(); // 无需import
		const page = pages[pages.length - 1];
		const eventChannel = page.getOpenerEventChannel();
		eventChannel.on("initMsgs", initMsgs)

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

		title = obj.server_name
		server_type = obj.server_type;
		uni.setNavigationBarTitle({
			title: title
		})
		uni.$on("chooseImage", handleChooseImage)
		uni.$on("putProduct", putProduct)
		uni.$on("getPrompt", getPrompt)
		uni.$on("initMsgs", initMsgs)
	})
	onUnload(() => {
		// uni.$off('listToChat');
		// 更新聊天列表
		// myChatList.doc(server_chat_id).update({
		// 	list:msgs.value
		// })
		// #ifdef APP
		uni.offKeyboardHeightChange(listenKeyboard)
		// #endif
		uni.$off("chooseImage", handleChooseImage)
		uni.$off("putProduct", putProduct)
		uni.$off("getPrompt", getPrompt)
		uni.$off("initMsgs", initMsgs)
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

	.page {
		flex: 1;
		height: calc(100vh - 45px);
		background-color: #efefef;
	}


	.content {
		flex-direction: column;
		flex-grow: 1;
		background-color: transparent;
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