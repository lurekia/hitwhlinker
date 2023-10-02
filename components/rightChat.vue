<template>
	<view class="container">
		<image :src="props.head_img_url" class="right" mode="aspectFill"></image>
		<view class="left">
			<view v-if="props.msg.tag === 'text'" class="text-container">
				<text>{{ props.msg.content}}</text>
			</view>
			<view v-if="props.msg.tag === 'img'" class="img-container">
				<image :src="props.msg.content" mode="aspectFit"></image>
			</view>
			<view v-if="props.msg.tag === 'product'" class="pro-container">
				<product-item>
				</product-item>
			</view>
		</view>
	</view>
</template>
<script setup>
	
import productItem from '@/components/post/productItem.vue'
const props = defineProps(["head_img_url","msg"])

</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
	.right {
		height: 10vw;
		width: 10vw;
		border-radius: 5px;
	}
}
.text-container {
	max-width: calc(80vw - 30px);
	min-height: 25px;
	border-radius: 10px;
	background-color: rgb(150,236,102);
	position: relative;
	margin-right: 10px;
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
		right: -12px;
		content: "";
		width: 0;
		height: 0;
		border-right: 6px solid transparent;
		border-bottom: 6px solid transparent;
		border-left: 6px solid rgb(150,236,102);
		border-top: 6px solid transparent;
	}

.img-container {
	margin-right: 10px;
	
	image {
		max-width: calc(80vw - 30px);
		max-height: calc(80vw - 30px);
	}
}

.pro-container {
	margin-right: 10px;
	
	width: calc(90vw - 15px);
}
</style>