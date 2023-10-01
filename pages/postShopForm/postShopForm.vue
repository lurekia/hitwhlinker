<template>
	<view class="status">
	</view>
	<view>
		<view class="topbar">
			<view class="topbar-content">
				需求发布
			</view>
			<uni-icons type="back" size="30" color="#fff" class="go-back" @click="goBack"></uni-icons>
		</view>
		<view class="body">
			<!-- 基础用法，不包含校验规则 -->
			<uni-forms ref="baseForm" :modelValue="baseFormData">
				<uni-forms-item label="标题" required>
					<uni-easyinput v-model="baseFormData.title" placeholder="请输入标题" />
				</uni-forms-item>
				<uni-forms-item label="标签" required>
					<uni-data-select
					        v-model="baseFormData.tag"
					        :localdata="range"
					        @change="change"
					      ></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="价格" >
					<uni-easyinput v-model="baseFormData.money" placeholder="请输入初步价格" />
				</uni-forms-item>
				<uni-forms-item label="详情">
					<uni-easyinput type="textarea" v-model="baseFormData.detail" placeholder="请输入详情介绍" />
				</uni-forms-item>
				<uni-forms-item label="需求时间">
					<uni-datetime-picker v-model="baseFormData.datetimerange" return-type="timestamp" type="datetimerange" rangeSeparator="至" />
				</uni-forms-item>
			</uni-forms>
			<button type="default" @click="submitForm" class="submit" >提交</button>
		</view>
		
	</view>
</template>

<script setup>
	import{
		ref,
		reactive,
		onMounted,
		computed,
		watch
	} from 'vue'
	import {
		onLoad,onInit
	} from '@dcloudio/uni-app'
	const goBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	const baseFormData = reactive({
					title: '',
					tag: '',
					detail: '',
					money:null,
					datetimerange: [],
				})
	const range = [
				  { value: 0, text: "教辅教材" },
				  { value: 1, text: "电子产品" },
				  { value: 2, text: "生活用品" },
				  { value: 3, text: "学习资料" },
				  { value: 4, text: "零食饮料" },
				  { value: 5, text: "人物匹配" },
				]
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
.body{
	width: 90%;
	margin: 50rpx auto;
	
	
	.submit {
		color: #fff;
		width: 30%;
		margin: 50rpx auto;
		background-color: #e85353;
	}
}

.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>
