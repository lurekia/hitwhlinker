<template>
	<view class="card" @click="goToDetail()">
		<view class="info">
			<view class="info-head">
				<view class="user">
					<image :src="avatarSrc" mode="aspectFill" class="avatar"></image>
					<view class="more">
						<text style="color: red;">{{name}}</text>
						<text style="color: gray;font-size: 8px;margin-top: 4px;">{{date}}</text>
					</view>
					
				</view>
				<uni-tag :text="'￥'+money+'元'" type="primary" class="money" :inverted="true"></uni-tag>
			</view>
			
			<rich-text :nodes="detail" class="detail"></rich-text>
		</view>
		<view class="img">
			<image :src="src" mode="aspectFill" style="width: 100%;height: 100%;border-radius: 5px;"></image>
		</view>
	</view>
</template>
<style lang="scss" scoped>
	view {
		display: flex;
		box-sizing: border-box;
	}
	
	.card {
		flex-direction: row;
		width: 100%;
		height: 15vh;
		background-color: #fff;
		border-radius: 10px;
		border: 1px solid rgb(216, 216, 216);
		padding: 10px 20px;
	}
		
	.info {
		flex-grow: 1;
		height: 100%;
		margin-right: 10px;
		flex-direction: column;
		.info-head {
			width: 100%;
			height: 40%;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 10px;
			border-bottom: 1px solid rgb(216, 216, 216);
		}
		.user {
			align-items: flex-start;
			.avatar {
				height: 30px;
				width: 30px;
				border-radius: 30px;
			}
			.more {
				flex-direction: column;
				align-self: flex-start;
				font-size: 12px;
				margin-left: 5px;
			}
		}
		
		.money {
			font-size: 14px;
			margin-right: 5px;
		}
		.detail {
			padding: 10px;
		}
	}
	
	.img {
		// border-radius: 10px;
		width: 25%;
		height: 100%;
	}
</style>
<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	// const props = defineProps(["head_img_url","msg"])
	const avatarSrc = ref("../.././static/images/img5.jpg")
	const src = ref("../.././static/images/product.webp")
	const name = ref("123鼠鼠")
	const money = ref(100)
	const detail = ref("这是一个手表这是一个手表")
	const date = ref("8分钟前")
	const goToDetail = () => {
		uni.navigateTo({
			url: '/pages/productDetail/productDetail'
		})
	}
</script>

