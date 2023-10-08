<template>
	<view class="card">
		<view class="header">
			<view style="flex-direction: row;align-items: center;">
				<text style="font-size: 12px;">建议发送给：</text>
				<text style="color: rgba(214, 88, 88, 1);font-weight: 700;">{{rec_send_to}}</text>
			</view>
			<view style="flex-direction: row;align-items: center;">
				<button size="mini" type="primary" @click="handleSend()">执行</button>
			</view>
		</view>
		<view class="content">
			<view v-for="(word,index) in process_prompt" :key="index" style="flex-direction: row;align-items: center;flex-wrap: wrap;height: 30px;">
				<text>{{word.pre}}</text>
				<input type="text" :placeholder="word.exp" v-model="word.var" :style="{width: (word.exp.length * 16) + 'px'}" class="input">
			</view>
			<text>{{last_word}}</text>
		</view>
		
	</view>
</template>
<style lang="scss" scoped>
	view {
		display: flex;
		box-sizing: border-box;
	}
	
	.card {
		flex-direction: column;
		width: 100%;
		// height: 40vh;
		background-color: #fff;
		border-radius: 10px;
		border: 1px solid rgb(216, 216, 216);
		padding: 10px 0;
	}
	.header {
		flex-direction: row;
		height: 5vh;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		border-bottom: 1px solid rgb(216, 216, 216);
	}
	.content {
		flex-direction: row;
		justify-content: baseline;
		align-items: center;
		flex-wrap: wrap;
		padding: 10px 20px;
		.input {
			// display: inline-block;
			border: 1px solid rgb(216, 216, 216);
			margin: 0 2px;
		}
	}
</style>
<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue'
	import {
		onLoad,
		onInit
	} from '@dcloudio/uni-app'
	const props = defineProps(["raw_prompt"])
	const rec_send_to = ref("预约助手");
	const send_to = ref("预约助手");
	// const raw_prompt = ref("帮我预约[10月1号下午][3点到5点]的[4楼a区24号]座位");
	const process_prompt = ref([
		// {
		// 	pre:"帮我预约",
		// 	exp:"10月1号下午",
		// 	var:"",
		// },
		// {
		// 	pre:"",
		// 	exp:"3点到5点",
		// 	var:"",
		// },
		// {
		// 	pre:"的",
		// 	exp:"4楼a区24号",
		// 	var:"",
		// }
	])
	const last_word = ref("座位"); 
	const handleSend = () => {
		let str = "";
		let arr = process_prompt.value;
		for(let i=0;i<arr.length;i++) {
			str = str + arr[i].pre;
			if(arr[i].var == "") {
				str = str + arr[i].exp;
			} else {
				str = str + arr[i].var;
			}
		}
		str = str + last_word.value;
		console.log(str);
		uni.$emit("getPrompt",str)
		uni.navigateBack({})
	}
	const process_raw_prompt = (str) => {
		let last_left = -1; // 上个左括号
		let last_right = -1; // 上个右括号
		let arr = [];
		for(let i=0;i<str.length;i++) {
			if(str[i] == '{') {
				last_left = i;
			} else {
				if(str[i] == '}') {
					let obj = {
						pre: str.substr(last_right+1,last_left-last_right-1),
						var: "",
						exp: str.substr(last_left+1,i-last_left-1),
					}
					last_right = i;
					arr.push(obj);
				}
			}
		}
		console.log(arr);
		process_prompt.value = arr;
		last_word.value = str.substr(last_right+1,str.length-last_right)
	}
	onMounted(() => {
		console.log(props);
		process_raw_prompt(props.raw_prompt)
	})
</script>

