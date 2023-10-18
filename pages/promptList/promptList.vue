<template>
	<view class="page">
		<scroll-view class="prompt-list" scroll-y="true" :scroll-with-animation="true">
			<prompt-item v-for="(item,index) in raw_prompts" :raw_prompt="item" :key="index" class="prompt-item">
			</prompt-item>
		</scroll-view> 
		<view class="add">
			<uni-icons type="plus-filled" style="color: rgb(0,122,255);font-size: 40px;" @click="handleConfirm"></uni-icons>
			<textarea name="" id="" cols="30" rows="20" v-model="inputValue" confirm="handleConfirm()" confirm-type="done" :show-confirm-bar="true"></textarea>
		</view>
		<view class="more">
			<text style="font-size: 12px;color: #333;">示例："第{五}周{G}楼{一}楼哪些教室有空"</text>
		</view>
	</view>
	<dragball :x='100' :y='50' image='http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg'></dragball>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import promptItem from '@/components/prompt/promptItem.vue'
	import dragball from '@/components/drag-ball/drag-ball.vue'
	const raw_prompts = ref([
		"帮我预约{10月1号下午}{3点到5点}的{4楼a区24号}座位",
		"第{五}周{G}楼{一}楼哪些教室有空"
	])
	const inputValue = ref("");
	const handleConfirm = () => {
		if(inputValue.value == "") {
			return ;
		}
		raw_prompts.value.push(inputValue.value);
		inputValue.value = "";
 	}
	
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
	display: flex;
}
.page {
	width: 100vw;
	height: 100vh;
	flex-direction: column;
}
.prompt-list {
	flex-direction: column;
	width: calc(100vw - 20px);
	// height: 100%;
	padding: 0 10px;
	.prompt-item {
		width: 100%;
		margin-top: 10px;
	}	/* background-color: pink; */
}
.add {
	width: calc(100vw - 20px);
	// height: 10vh;
	margin: 10px;
	padding: 10px;
	border-radius: 10px;
	align-items: center;
	justify-content: baseline;
	border: 1px solid rgb(216, 216, 216);
}
.more {
	width: 100vw;
	justify-content: center;
}
</style>
