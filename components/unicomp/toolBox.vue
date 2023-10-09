<template>
	<view :style="{height:props.height}" class="tool-box">
		<uni-grid :column="4" :showBorder="false">
			<uni-grid-item v-for="(item,index) in funcs" :key="index" class="card" @click="item.action">
					<view class="tool-icon">
						<uni-icons :type="item.type" size="40" color="#000" class="icon"></uni-icons>
					</view>
					<view class="tool-title">
						<text>{{item.title}}</text>
					</view>
			</uni-grid-item>
		</uni-grid>
	</view>
	
</template>

<script setup>
	import {
			ref,
			reactive,
			computed,
			onMounted
		} from 'vue'
	const props = defineProps(["height"])
	
	const uploadImage = () => {
		// console.log(1);
		uni.chooseImage({
			count: 6, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				// uni.previewImage({
				// 			urls: res.tempFilePaths,
				// 			longPressActions: {
				// 				itemList: ['发送给朋友', '保存图片', '收藏'],
				// 				success: function(data) {
				// 					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				// 				},
				// 				fail: function(err) {
				// 					console.log(err.errMsg);
				// 				}
				// 			}
				// 		});
				uni.$emit("chooseImage",res.tempFilePaths)
			}
		});
	}
	const uploadFile = () => {
		
	}
	const putProduct = () => {
		uni.$emit("putProduct")
	}
	const getPrompt = () => {
		uni.navigateTo({
			url:"/pages/promptList/promptList"
		})
	}
	const funcs = [
		{
			title: "相册",
			type:"image",
			action:uploadImage
		},
		{
			title: "文件",
			type:"folder-add-filled",
			action:uploadFile
		},
		{
			title: "需求",
			type:"cart-filled",
			action:putProduct
		},
		{
			
			title: "提示词",
			type:"email",
			action:getPrompt
		}
	]
	
	
</script>

<style scoped lang="scss">

	
	view {
		box-sizing: border-box;
		display: flex;
	}
	
	.tool-box {
		width: 100vw;
		padding: 10px 0;
		background-color: #F7F7F7;
	}
	.card {
		flex-direction: column;
		width: 25vw;
	}
	.tool-icon {
		justify-content: center;
		align-items: center;
		width: 15vw;
		height: 15vw;
		margin: 0 5vw;
		padding-top: 5px;
		padding-left: 5px;
		border-radius: 10px;
		background-color: #fff;
	}
	.tool-title {
		width: 15vw;
		margin: 0 5vw;
		justify-content: space-around;
		margin-top: 10px;
		font-size: 12px;
		color: #333;
	}
</style>