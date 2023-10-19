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
				<text class="iconfont icon" @click="handleStartAudio">&#xe605;</text>
				<view class="textarea-container">
					<textarea auto-height :fixed="true" confirm-type="send" v-model="input" @confirm="submit"
						:adjust-position="false" :cursor-spacing="20" @focus="scrollToBottom()" />
				</view>
				<button v-if="input!==''" type="primary" @click="submit()" size="mini">发送</button>
				<text v-else class="iconfont icon" @click="handleStartTool">&#xe603;</text>
			</view>
			<tool-box v-if="toolShow" :height="toolHeight + 'px'"></tool-box>
		</view>
		<uni-popup ref="popup" type="bottom" :animation="false" :mask-click="false">
			<view class="audio-box-container" style="height: 328px;">
				<view class="audio-title">
					<text style="font-size: 12px;color: #8f939c">{{texttitle}}</text>
				</view>
				<view class="audio-output">
					<view class="right-audio">
						<text v-if="texted != ''">{{texted}}</text>
						<text v-else>...</text>
					</view>
					<view class="left-audio">
						<text v-if="textafter != ''">{{textafter}}</text>
						<text v-else>...</text>
					</view>
				</view>
				<view class="audio-input">
					<text>{{texting}}</text>
				</view>
				<view class="music-container">
					<view class="music" v-if="isSaying">
						<view></view>
						<view></view>
						<view></view>
						<view></view>
						<view></view>
						<view></view>
						<view></view>
					</view>
					<view class="nomusic" v-else>
						<view></view>
						<view></view>
						<view></view>
						<view></view>
						<view></view>
						<view></view>
						<view></view>
					</view>
				</view>
		
			</view>
		
		</uni-popup>
	</view>
	
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		onMounted,
		nextTick,
		watch
	} from 'vue'
	import {
		onLoad,
		onUnload,
		onReady
	} from '@dcloudio/uni-app'
	import leftChat from '@/components/chat/leftChat.vue'
	import rightChat from '@/components/chat/rightChat.vue'
	import toolBox from '@/components/unicomp/toolBox.vue'
	import Voice from '@/lib/BDvoice/voicePlay/voiceplay.js'
	// import {chat} from '@/lib/gpt.js'
	// 设备信息
	let systemInfo = null
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

	// 用户信息
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
	// 头像
	let left_avatar = ref("../.././static/images/img1.jpg");
	let right_avatar = ref("../.././static/images/img5.jpg")






	// 样式参数
	const scrollTop = ref(0)
	const keyBoardHeight = ref(10)
	const toolHeight = ref(278)
	const paddingBottom = computed(() => {
		if (toolShow.value == true || audioShow.value == true) {
			return toolHeight.value + 50
		}
		return keyBoardHeight.value + 50
	})
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
	// #ifdef APP
	uni.onKeyboardHeightChange(listenKeyboard)
	// #endif




	// 数据相关
	// 输入框
	const input = ref("");
	let res_type = '';
	let msgs = ref([
		// {
		// 	left: true,
		// 	content: "请问有什么为您服务的吗？",
		// 	tag: 'text',
		// 	time: "2023/7/29 12:00:00"
		// },
		// {
		// 	left: false,
		// 	content: "帮我预约个图书馆座位",
		// 	tag: 'text',
		// 	time: "2023/7/29 12:00:00"
		// },
		// {
		// 	left: true,
		// 	content: "已根据您的需求，为您找好座位，请看是否需要修改，否则三秒内即将自动为您选座",
		// 	tag: 'libraryForm',
		// 	time: "2023/7/29 12:00:00"
		// },
		// {
		// 	left: false,
		// 	content: "我觉得这个座位可以",
		// 	tag: 'text',
		// 	time: "2023/7/29 12:00:00"
		// },
		// {
		// 	left: true,
		// 	content: "好的，已经为您预约好座位，请按时去图书馆自习",
		// 	tag: 'text',
		// 	time: "2023/7/29 12:00:00"
		// },
	]);
	const initMsgs = (data) => {
		console.log(data);
		msgs.value = [];
		uni.request({
			url: 'http://119.8.190.49:5000/get_chat_history',
			method: "GET",
			data: {
				user_id: '103',
				npc_name: server_type
			},
			header: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			success: (res) => {
				console.log(res);
				if (res.statusCode === 200) {
					const data = res.data;
					for(let i=0;i<data.length;i++) {
						const msg = {
							left: !data[i].is_from_user,
							content: data[i].message,
							time: data[i].timestamp,
							tag: "text"
						}
						msgs.value.push(msg)
					}
					scrollToBottom()
				} else {
					console.log(res.msg);
				}
			},
			fail: (err) => {
				console.log(err);
			}
		})
		
	}
	// 加载数据
	const loadChat = () => {
		console.log("加载数据");
	}
	const changeRes = (type) => {
		res_type = type;
		if(type === '图书馆') {
			msgs.value.push({
				left: true,
				content: "选个座位吧",
				tag: 'libraryForm',
				time: new Date()
			})
		}
	}
	// 输入输出
	const query_server = (str, audio) => {
		if(server_type == 'reservation') {
			// console.log(res_type);
			if(res_type === '图书馆') {
				uni.request({
					url: 'http://119.8.190.49:5000/query_library',
					method: "POST",
					data: {
						query: str,
					},
					header: {
						"Content-Type": "application/json;charset=UTF-8"
					},
					success: (res) => {
						console.log(res);
						const msg = {
							left: true,
							content: res.data.answer,
							tag: 'text',
							time: new Date(),
						}
						msgs.value.push(msg)
						scrollToBottom()
						if(audio === true) {
							console.log("小助手回话开始回答");
							beginVoice(msg.content);
						}
						// return res.data.answer
					},
					fail: (err) => {
						console.log(err);
						// return err.errMs
					}
				})
			} else {
				// uni.request({
				// 	url: 'http://119.8.190.49:5000/query_classroom',
				// 	method: "POST",
				// 	data: {
				// 		query: str,
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
				// 			time: new Date(),
				// 		}
				// 		msgs.value.push(msg)
				// 		scrollToBottom()
				// 		if(audio === true) {
				// 			console.log("小助手回话开始回答");
				// 			beginVoice(msg.content);
				// 		}
				// 		// return res.data.answer
				// 	},
				// 	fail: (err) => {
				// 		console.log(err);
				// 		// return err.errMs
				// 	}
				// })
				const msg = {
							left: true,
							content: "- G101 第一大节有空\n - G203 第二大节有空\n - G105 第四大节有空\n ",
							tag: 'text',
							time: new Date(),
						}
						msgs.value.push(msg)
						scrollToBottom()
			}
 		} else {
			uni.request({
				url: 'http://119.8.190.49:5000/query_local_information',
				method: "POST",
				data: {
					query: str,
					type: server_type
				},
				header: {
					"Content-Type": "application/json;charset=UTF-8"
				},
				success: (res) => {
					console.log(res);
					const msg = {
						left: true,
						content: res.data.answer,
						tag: 'text',
						time: new Date(),
					}
					msgs.value.push(msg)
					scrollToBottom()
					if(audio === true) {
						console.log("小助手回话开始回答");
						beginVoice(msg.content);
					}
					// return res.data.answer
				},
				fail: (err) => {
					console.log(err);
					// return err.errMs
				}
			})
		}
		
		// console.log(msg.content);
		// return msg.content
	}
	// 提交
	const submit = () => {
		if (input.value === '') {
			return
		}
		console.log("发送信息");
		const msg = {
			left: false,
			content: input.value,
			tag: 'text',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(msg)
		// input.value = ""
		scrollToBottom()
		query_server(input.value, false);
		input.value = "";
	}
	const handleChooseSeat = (str) => {
		let msg = {
			left: false,
			content: '帮我预约个' + str + '座位',
			tag: 'text',
			time: new Date()
		}
		msgs.value.push(msg);
		msg = {
			left: true,
			content: '好的，已经帮您预约' + str + '座位',
			tag: 'text',
			time: new Date()
		}
		msgs.value.push(msg);
		
	}



	// 底部操作框
	// 状态参数
	const toolShow = ref(false)
	const handleStartTool = () => {
		toolShow.value = !toolShow.value;
		if (toolShow.value) {
			audioShow.value = false
		}
		scrollToBottom();
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
	const getPrompt = (str) => {
		const msg = {
			left: false,
			content: str,
			tag: 'text',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(msg);
		scrollToBottom();
		query_server(str, false);
	}


	// 语音控制
	let auto = false;
	const audioShow = ref(false)
	// 语音框
	const isSaying = ref(false)
	const texting = ref("")
	const texted = ref("")
	const textafter = ref("")
	const texttitle = ref('有什么问题吗？')
	const popup = ref();
	watch(audioShow, (newValue, oldValue) => {
		if (newValue === true) {
			startRecord()
			popup.value.open();
		} else {
			endRecord()
			popup.value.close();
		}
	})
	const beginVoice = (str) => {
		textafter.value = str;
		Voice({
			voiceSet: {
				tex: textafter.value
			},
			audioSet: {
				volume: 1
			},
			audioCallback: {
				onPlay: () => { //属性名去掉 - , 不知道为什么全名显示不了
					console.log('音频开始播放了')
					texttitle.value = "播放中..."
				},
				onEnded: () => {
					console.log('音频播放完了');
					setTimeout(()=> {
						startRecord()
						texttitle.value = "还有什么想问的吗？"
					},2000)
				}
			},
			lineUp: true, // 加入语音队列
			returnAudio: false // 返回音频对象
		})
	}
	const onStart = () => {
		isSaying.value = true
		texttitle.value = '倾听中...';
		texting.value = '';
		console.log('Event: start');
	}
	// const onVolumeChange = (e) => {
	// 	this.valueWidth = 100 * e.volume + 'px';
	// 	console.log('Event: volumeChange ' + this.valueWidth);
	// }
	const onRecognizing = (e) => {
		texting.value = e.partialResult;
		console.log('Event: recognizing');
	}
	const onRecognition = (e) => {
		texting.value = e.result;
		texted.value = e.result;
		textafter.value = '';
		console.log('Event: recognition');
		setTimeout(()=> {
			endRecord()
			console.log("结束录音");
		},2000)
	}
	const startRecord = () => {
		var options = { // 语音转文字的设置
			engine: 'baidu',
			// continue: true,
			userInterface: false,
			// punctuation: true,
		};
		console.log('开始语音识别：');
		plus.speech.startRecognize(options);
	}
	const endRecord = () => {
		console.log('语音识别结束：');
		if (!texting.value || texting.value === '' || audioShow.value === false) {
			// uni.showToast({
			// 	text: '没有识别到内容',
			// 	icon: 'none'
			// })
			console.log("结束了");
			return ;
		}
		if(isSaying.value === false) {
			return ;
		}
		
		texttitle.value = '正在回答...';
		texting.value = ''
		isSaying.value = false;
		plus.speech.stopRecognize()
		const msg = {
			left: false,
			content: texted.value,
			tag: 'text',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(msg);
		scrollToBottom();
		query_server(texted.value, true);
	}
	
	const handleStartAudio = () => {
		audioShow.value = !audioShow.value;
		if (audioShow.value === true) {
			toolShow.value = false
		}
		scrollToBottom()
	}

	

	// 钩子
	onMounted(() => {
		// getSystemInfo()
		scrollToBottom()
		// testVoice()
		
	})
	onLoad((options) => {
		// const eventChannel = this.getOpenerEventChannel();
		// const pages = getCurrentPages(); // 无需import
		// const page = pages[pages.length - 1];
		// const eventChannel = page.getOpenerEventChannel();
		// eventChannel.on("initMsgs", initMsgs)

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
		
		if(options.auto) {
			auto = true;
			title = "hitwhlinker";
			server_type = 'hitwhlinker';
			left_avatar.value = 'http://94.74.87.251:8080/profile/avatar/2023/10/17/img6_20231017141159A006.jpg';
			// audioShow.value = true;
		} else {
			auto = false;
			title = options.server_name
			server_type = options.server_type;
			left_avatar.value = options.server_avatar;
		}
		if(server_type === 'reservation') {
			
			msgs.value = [{
				left: true,
				tag: 'system',
				content: '',
				time: new Date()
			}];
		} else {
			initMsgs();
		}
			
		console.log("auto = ",auto);
		uni.setNavigationBarTitle({
			title: title
		})
		uni.$on("chooseImage", handleChooseImage)
		uni.$on("putProduct", putProduct)
		uni.$on("getPrompt", getPrompt)
		uni.$on("changeRes", changeRes);
		uni.$on("handleChooseSeat", handleChooseSeat);
		// uni.$on("initMsgs", initMsgs)
		
		console.log("启动助手");
		// #ifdef APP-PLUS
		// 监听语音识别事件
		plus.speech.addEventListener('start', onStart, false);
		// plus.speech.addEventListener('volumeChange', onVolumeChange, false);
		plus.speech.addEventListener('recognizing', onRecognizing, false);
		plus.speech.addEventListener('recognition', onRecognition, false);
		// plus.speech.addEventListener('end', onEnd, false);
		// #endif
	})
	onReady(() => {
		if(auto === true) {
			audioShow.value = true;
		}
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
		uni.$off("changeRes", changeRes);
		uni.$off("handleChooseSeat", handleChooseSeat);
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

	.audio-box-container {
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		background-color: #efefef;
		padding-bottom: 60px;
		width: 100vw;
		.audio-title {
			align-items: center;
			justify-content: center;
			width: 100vw;
			height: 20px;
			padding: 5px;
			// line-height: 20px;
			margin-bottom: 5px;
		}
		.audio-output {
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			width: 100vw;
			flex-grow: 1;
	
			.right-audio {
				align-self: flex-end;
				max-width: calc(80vw - 30px);
				min-height: 25px;
				border-radius: 20px 0 20px 20px;
				background-color: rgb(150, 236, 102);
				margin-right: 10px;
				padding: 10px;
				margin-top: 20px;
	
				text {
					height: 25px;
					line-height: 25px;
					white-space: normal;
					word-break: break-all;
				}
			}
	
			.left-audio {
				max-width: calc(80vw - 30px);
				min-height: 25px;
				border-radius: 0 20px 20px 20px;
				background-color: #fff;
				margin-left: 10px;
				margin-top: 20px;
				padding: 10px;
	
				text {
					height: 25px;
					line-height: 25px;
					white-space: normal;
					word-break: break-all;
				}
			}
		}
	
		.audio-input {
			flex-direction: column;
			align-items: center;
			width: 100vw;
			height: 60px;
			margin: 10px 0;
	
			text {
				display: block;
				height: 30px;
				line-height: 30px;
				border-radius: 20px;
				// background-color: #fff;
				padding: 10px;
			}
		}
	}
	
	// 语音效果
	.music-container {
		// width: 100vw;
		height: 30px;
	}
	
	.nomusic {
		width: 84px;
		height: 20px;
		display: flex;
	}
	
	.nomusic view {
		width: 6px;
		border-radius: 18px;
		margin-right: 6px;
	}
	
	.nomusic view:nth-child(1) {
		/* 时间递增，参差不齐的效果 */
		background: #f677b0;
	}
	
	.nomusic view:nth-child(2) {
		background: #df7ff2;
	}
	
	.nomusic view:nth-child(3) {
		background: #8c7ff2;
	}
	
	.nomusic view:nth-child(4) {
		background: #7fd0f2;
	}
	
	.nomusic view:nth-child(5) {
		background: #7ff2d3;
	}
	
	.nomusic view:nth-child(6) {
		background: #7ff2a0;
	}
	
	.nomusic view:nth-child(7) {
		background: #adf27f;
	}
	
	.music view {
		width: 6px;
		border-radius: 18px;
		margin-right: 6px;
	}
	
	.music view:nth-child(1) {
		/* 时间递增，参差不齐的效果 */
		animation: bar1 2s 0.2s infinite linear;
	}
	
	.music view:nth-child(2) {
		animation: bar2 2s 0.4s infinite linear;
	}
	
	.music view:nth-child(3) {
		animation: bar3 2s 0.6s infinite linear;
	}
	
	.music view:nth-child(4) {
		animation: bar4 2s 0.8s infinite linear;
	}
	
	.music view:nth-child(5) {
		animation: bar5 2s 1.0s infinite linear;
	}
	
	.music view:nth-child(6) {
		animation: bar6 2s 1.2s infinite linear;
	}
	
	.music view:nth-child(7) {
		animation: bar7 2s 1.4s infinite linear;
	}
	
	@keyframes bar1 {
		0% {
			background: #f677b0;
			margin-top: 25%;
			height: 10%;
		}
	
		50% {
			background: #f677b0;
			height: 100%;
			margin-top: 0%;
		}
	
		100% {
			background: #f677b0;
			height: 10%;
			margin-top: 25%;
		}
	}
	
	@keyframes bar2 {
		0% {
			background: #df7ff2;
			margin-top: 25%;
			height: 10%;
		}
	
		50% {
			background: #df7ff2;
			height: 100%;
			margin-top: 0%;
		}
	
		100% {
			background: #df7ff2;
			height: 10%;
			margin-top: 25%;
		}
	}
	
	@keyframes bar3 {
		0% {
			background: #8c7ff2;
			margin-top: 25%;
			height: 10%;
		}
	
		50% {
			background: #8c7ff2;
			height: 100%;
			margin-top: 0%;
		}
	
		100% {
			background: #8c7ff2;
			height: 10%;
			margin-top: 25%;
		}
	}
	
	@keyframes bar4 {
		0% {
			background: #7fd0f2;
			margin-top: 25%;
			height: 10%;
		}
	
		50% {
			background: #7fd0f2;
			height: 100%;
			margin-top: 0%;
		}
	
		100% {
			background: #7fd0f2;
			height: 10%;
			margin-top: 25%;
		}
	}
	
	@keyframes bar5 {
		0% {
			background: #7ff2d3;
			margin-top: 25%;
			height: 10%;
		}
	
		50% {
			background: #7ff2d3;
			height: 100%;
			margin-top: 0%;
		}
	
		100% {
			background: #7ff2d3;
			height: 10%;
			margin-top: 25%;
		}
	}
	
	@keyframes bar6 {
		0% {
			background: #7ff2a0;
			margin-top: 25%;
			height: 10%;
		}
	
		50% {
			background: #7ff2a0;
			height: 100%;
			margin-top: 0%;
		}
	
		100% {
			background: #7ff2a0;
			height: 10%;
			margin-top: 25%;
		}
	}
	
	@keyframes bar7 {
		0% {
			background: #adf27f;
			margin-top: 25%;
			height: 10%;
		}
	
		50% {
			background: #adf27f;
			height: 100%;
			margin-top: 0%;
		}
	
		100% {
			background: #adf27f;
			height: 10%;
			margin-top: 25%;
		}
	}
</style>