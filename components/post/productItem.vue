<template>
	<view class="card">
		<view class="img">
			<image :src="data.pictrue?data.pictrue:'../.././static/images/product.webp'" mode="aspectFill"
				style="width: 100%;height: 100%;border-radius: 5px;" @click="goToDetail()"></image>
		</view>
		<view class="info">

			<view class="title">
				<rich-text :nodes="data.title"></rich-text>
			</view>
			<view class="money">
				<text style="color: red;font-size: 18px;margin-top: 5px;">￥</text>
				<text style="color: red;font-size: 26px;">189</text>
				<text style="color: red;font-size: 26px; margin:0 10px;">~</text>
				<text style="color: red;font-size: 26px;">289</text>
			</view>
			<view class="tags">
				<uni-tag text="电子产品" type="primary" class="tag" :inverted="true"></uni-tag>
				<uni-tag text="需自提" type="success" class="method"></uni-tag>
				<text style="color: #8f939c;font-size: 14px;">277次浏览</text>
			</view>
			<view v-if="isMine" class="user">
				<button type="warn" size="mini" @click="handleDelete(data.id)">撤销</button>
			</view>
			<view v-else class="user">
				<view class="nickname">
					<text>{{data.nickName}}</text>
				</view>
				<view class="link" @click="toPrivateChat()">
					<text>聊聊-&gt;</text>
				</view>
			</view>
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
		height: 22vh;
		background-color: #fff;
		border-radius: 10px;
		border: 1px solid rgb(216, 216, 216);
		padding: 10px;
	}

	.info {
		flex-grow: 1;
		height: 100%;
		margin-left: 10px;
		flex-direction: column;
		
		.money {
			justify-content: flex-start;
			align-items: flex-start;
		}
		.title {
			flex-grow: 1;
			width: 100%;
			height: 45px;
			margin-bottom: 10px;
		}

		.tags {
			flex-direction: row;
			width: 100%;
			height: 30px;
			align-items: center;
			justify-content: space-around;
			margin-bottom: 5px;

			.tag {
				margin-right: 5px;
				font-size: 14px;
			}

			.method {
				margin-right: 5px;
				font-size: 14px;
			}
		}

		.user {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 0 10px;
			width: 100%;
			// flex-grow: 1;
			height: 30px;
			font-size: 12px;
			.nickname {
				color: red;
			}
			.link {
				color: #8f939c;
			}
		}

	}

	.img {
		// border-radius: 10px;
		width: calc(17vh - 20px);
		height: calc(22vh - 20px);
		// flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	const props = defineProps(["data", "isMine"])
	// const avatarSrc = ref("../.././static/images/img5.jpg")
	// const src = ref("../.././static/images/product.webp")
	// const name = ref("123鼠鼠")
	// const money = ref(100)
	// const detail = ref("这是一个手表这是一个手表")
	// const date = ref("8分钟前")
	const goToDetail = () => {
		uni.navigateTo({
			url: '/pages/productDetail/productDetail',
			animationDuration: 300,
			success: (res) => {
				console.log("看详情：",props.data);
				uni.$emit("productListToDetail",props.data);
			}
		})
	}
	const toPrivateChat = () => {
		uni.navigateTo({
			url: '/pages/privateChat/privateChat',
			animationDuration: 300,
			success: (res) => {
				const friend_info = {
					id: props.data.userId,
					name: props.data.nickName,
					avatar: props.data.avatar
				}
				console.log("看看：",friend_info);
				uni.$emit("initPrivateMsgs",friend_info)
			}
		})
	}
	const handleDelete = (id) => {
		uni.$emit("handleDelete", id);
	}
</script>