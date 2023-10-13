<template>
	<view class="container">
		<image :src="props.head_img_url" class="left" mode="aspectFill"></image>
		<view class="right">
			<view v-if="props.msg.tag === 'text'" class="text-container">
				<mp-html :content="content" />
			</view>
			<view v-if="props.msg.tag === 'img'" class="img-container">
				<image :src="props.msg.content" mode="aspectFit"></image>
			</view>
			<view v-if="props.msg.tag === 'product'" class="pro-container">
				<product-item>
				</product-item>
			</view>
			<view v-if="props.msg.tag === 'libraryForm'" class="lib-container">
				<view class="text-container">
					<mp-html :content="content" />
					<!-- <text>请您看看这样预约是否可以？</text> -->
				</view>
				<library-form style="margin-left: -46px; margin-top: 10px;">
				</library-form>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {ref, reactive} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import productItem from '@/components/post/productItem.vue'
	import libraryForm from '@/components/chat/libraryForm.vue'
	const props = defineProps(["head_img_url", "msg"])
	const content = ref("")
	// 解析mardown 为 html字符串
	onLoad((obj) => {
		content.value = props.msg.content;
	})
</script>
<style lang="scss" scoped>
	.container {
		margin: 10px 0;
		display: flex;

		.left {
			height: 10vw;
			width: 10vw;
			border-radius: 5px;
		}
	}

	.text-container {
		max-width: calc(80vw - 30px);
		min-height: 25px;
		border-radius: 10px;
		background-color: #fff;
		position: relative;
		margin-left: 10px;
		padding: 10px;
		text {
			height: 25px;
			line-height: 25px;
			white-space: normal;
			word-break: break-all;
		}
	}

	.text-container::before {
		position: absolute;
		top: 15px;
		left: -12px;
		content: "";
		width: 0;
		height: 0;
		border-right: 6px solid #fff;
		border-bottom: 6px solid transparent;
		border-left: 6px solid transparent;
		border-top: 6px solid transparent;
	}
	.img-container {
		margin-left: 10px;
		
		image {
			max-width: calc(80vw - 30px);
			max-height: calc(80vw - 30px);
		}
	}
	.pro-container {
		margin-left: 10px;
		
		width: calc(90vw - 15px);
	}
	.lib-container {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		
		width: calc(90vw - 15px);
	}
</style>