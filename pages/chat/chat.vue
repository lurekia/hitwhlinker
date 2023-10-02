<template>
	<view class="chat">
		<!-- 主要聊天页面 -->
		<scroll-view class="content" :style="{paddingBottom:paddingBottom+'px'}" scroll-y="true" :scroll-into-view="`msg${msgs.length-1}`" :scroll-with-animation="true">
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
						:adjust-position="false" :cursor-spacing="20" @focus="scrollToBottom()"/>
				</view>
				<button v-if="input!==''" type="primary" @click="submit()" size="mini" >发送</button>
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
import leftChat from '@/components/leftChat.vue'
import rightChat from '@/components/rightChat.vue'
import toolBox from '@/components/unicomp/toolBox.vue'
// 设备信息
	let systemInfo = null 
	let msgs = ref([
		{
			left: true,
			content: "<h1>这是一个公众号推文的标题</h1>",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: false,
			content: "你好！",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: true,
			content: "这是一个公众号推文的标题",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: false,
			content: "你好！",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: true,
			content: "<h1>这是一个公众号推文的标题</h1>",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: false,
			content: "你好！",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: true,
			content: "<h1>这是一个公众号推文的标题</h1>",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: false,
			content: "你好！",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: true,
			content: "<h1>这是一个公众号推文的标题</h1>",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: false,
			content: "你好！",
			tag:'text',
			time: "2023/7/29 12:00:00"
		},
		{
			left: false,
			content: "../.././static/images/img1.jpg",
			tag:'img',
			time: "2023/7/29 12:00:00"
		},
		{
			left: true,
			content: "",
			tag:'product',
			time: "2023/7/29 12:00:00"
		},
		{
			left: true,
			content: "../.././static/images/img3.jpg",
			tag:'img',
			time: "2023/7/29 12:00:00"
		}
	]);
	// 对方用户名
	let title = "";
	// 状态参数
	const toolShow = ref(false)
	// 样式参数
	const scrollTop = ref(0)
	const keyBoardHeight = ref(10)
	const toolHeight = ref(278)
	const paddingBottom = computed(() => {
		if(toolShow.value == true) {
			return toolHeight.value + 50
		}
		return keyBoardHeight.value + 50
	})
	

	// 有用数据
	const input = ref("");
	// 头像
	let left_avatar = ref("../.././static/images/img1.jpg")
;
	const right_avatar = ref("../.././static/images/img5.jpg")

	
	// const scrool_to_bottom = () => {
		
	// }
	// const submit = function() {
	// 	if (input.value === "") return;
	// 	const inputValue = input.value
	// 	input.value = ""
	// 	msgs.value.push({
	// 		left: false,
	// 		content: inputValue,
	// 		tag:"text",
	// 		time: new Date().getTime(),
	// 	});

	// 	msgs.push({
	// 		left: true,
	// 		content: receiveText,
	// 		time: new Date().getTime(),
	// 	});
	// 	input.value = "";
	// 	last_item.value = 'msg' + (msgs.length - 1)
	// 	console.log(msgs);
	// 	console.log(last_item.value);
	// 	// 此处会有异步询问和错误处理
	// 	setTimeout(()=>{
	// 		const response = getAnswer(inputValue); // 获得回答，content 和 tag
	// 		msgs.value.push({
	// 			left: true,
	// 			content: response.content,
	// 			tag:response.tag,
	// 			time: new Date().getTime(),
	// 		});
	// 		updateChat()
	// 	}, 2000)
		
	// 	// last_item.value = 'msg' + (msgs.length - 1)
	// }
	// 加载数据

	const loadChat = () => {
		console.log("加载数据");
	}
	// 滑动到最底部
	const scrollToBottom = async () => {
		await nextTick()
		setTimeout(()=>{
		    uni.createSelectorQuery().select('.content').boundingClientRect((res)=>{
		        uni.pageScrollTo({
		            scrollTop: res.height,
		            duration: 200
		        })
		    }).exec()
		},50)
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
		if(res.height) {
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
				tag:'img',
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
			tag:'product',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(data)
		scrollToBottom()
	}
	
	// #ifdef APP
		uni.onKeyboardHeightChange(listenKeyboard)
	// #endif
	const submit = () => {
		if(input.value === '') {
			return 
		}
		const msg = {
			left: false,
			content: input.value,
			tag:'text',
			time: "2023/7/29 12:00:00"
		}
		msgs.value.push(msg)
		input.value = ""
		scrollToBottom()
	}
	
	onMounted(() => {
		// getSystemInfo()
		scrollToBottom()
		uni.$on("chooseImage",handleChooseImage)
		uni.$on("putProduct",putProduct)
	})
	onLoad((obj) => {
		title = obj.server_name
		uni.setNavigationBarTitle({
			title: title
		})
		loadChat() // 加载对话
		// 获取语料库
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
		uni.$off("chooseImage",handleChooseImage)
		uni.$off("putProduct",putProduct)
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
				width: calc(100vw - 196px);
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