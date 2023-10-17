<template>
	<view class="card">
		<view v-if="picture!==''" class="img">
			<image :src="picture" mode="aspectFill"
				style="width: 100%;height: 100%;border-radius: 5px;" @click="goToDetail()"></image>
		</view>
		<view class="info">

			<view class="title">
				<rich-text :nodes="data.title"></rich-text>
			</view>
			<view class="money">
				<text style="color: red;font-size: 18px;margin-top: 5px;">￥</text>
				<text style="color: red;font-size: 26px;">{{data.price}}</text>
				<!-- <text style="color: red;font-size: 26px; margin:0 10px;">~</text>
				<text style="color: red;font-size: 26px;">289</text> -->
			</view>
			<view class="tags">
				<uni-tag :text="typeText" type="primary" class="tag" :inverted="true"></uni-tag>
				<uni-tag :text="getMethodType[data.getMethod]" type="success" class="method"></uni-tag>
				<text style="color: #8f939c;font-size: 14px;">{{data.starCounts}}次收藏</text>
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
		ref,
		computed
	} from 'vue'
	
	const props = defineProps(["data", "isMine"])
	const getMethodType = ["需自取","可配送"];
	const productType = [
		{
			id: "1",
			text: '人物匹配',
		},
		{
			id: "2",
			text: '电子产品',
		},
		{
			id: "3",
			text: '生活用品',
		},
		{
			id: '4',
			text: '学习资料',
		},
		{
			id: '5',
			text: '零食饮料',
		},
		{
			id: '6',
			text: '其他',
		}
	]
	const goToDetail = () => {
		uni.navigateTo({
			url: '/pages/productDetail/productDetail?id='+props.data.id,
			// animationDuration: 300,
			// success: (res) => {
			// 	uni.$emit("productListToDetail",props.data);
			// }
		})
	}
	const picture = computed(() => {
		if(props.data.picture === null || props.data.picture.trim() === "") {
			return ''
		}
		return props.data.picture.split(",",1)[0];
	})
	const typeText = computed(() => {
		for(let type of productType) {
			if(type.id === props.data.goodsTypeId) {
				return type.text;
			}
		}
		return "";
	})
	const toPrivateChat = () => {
		uni.navigateTo({
			url: '/pages/privateChat/privateChat?id=' + props.data.userId + '&name='+props.data.nickName + '&avatar=' + props.data.avatar,
			animationDuration: 300,
		})
	}
	const handleDelete = (id) => {
		uni.$emit("handleDelete", id);
	}
</script>