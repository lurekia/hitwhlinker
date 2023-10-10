<template>
	<view class="card">
		<view class="info">
			<view class="info-head">
				<view v-if="isMine" style="margin-bottom: 4px;">
					<button type="warn" size="mini" @click="handleDelete(data.id)">撤销</button>
				</view>
				<view v-else class="user">
					<image :src="data.avatar?data.avatar:'../.././static/images/img5.jpg'" mode="aspectFill" class="avatar"></image>
					<view class="more">
						<text style="color: red;">{{data.nickName}}</text>
						<text style="color: gray;font-size: 8px;margin-top: 4px;">{{date}}</text>
					</view>
					
				</view>
				<view class="star">
					<text style="color: rgb(73,141,255);">{{data.starCounts}}</text>
					<uni-icons type="star-filled" style="color: rgb(73,141,255);font-size: 20px;"></uni-icons>
				</view>
			</view>
			
			<rich-text :nodes="data.title" class="detail"></rich-text>
		</view>
		<view class="img">
			
			<image :src="data.pictrue?data.pictrue:'../.././static/images/product.webp'" mode="aspectFill" style="width: 100%;height: 100%;border-radius: 5px;"  @click="goToDetail()"></image>
			<uni-tag :text="'￥'+data.price+'元'" type="primary" class="money" :inverted="true"></uni-tag>
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
		height: 20vh;
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
		.star {
			align-items: center;
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
		width: 30%;
		height: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		.money {
			// height: 3vh;
			font-size: 14px;
			margin-right: 5px;
			margin-top: 4px;
		}
	}
</style>
<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	const props = defineProps(["data","isMine"])
	// const avatarSrc = ref("../.././static/images/img5.jpg")
	// const src = ref("../.././static/images/product.webp")
	// const name = ref("123鼠鼠")
	// const money = ref(100)
	// const detail = ref("这是一个手表这是一个手表")
	// const date = ref("8分钟前")
	const goToDetail = () => {
		uni.navigateTo({
			url: '/pages/productDetail/productDetail'
		})
	}
	const handleDelete = (id) => {
		uni.$emit("handleDelete",id);
	}
</script>

