<template>

	<view class="page">
		<view class="status">
		</view>
		<view class="content">
			<view class="header">
				<image :src="avatarSrc" mode="aspectFill" class="avatar"></image>
				<view class="more">
					<text style="font-size: 18px;margin-top: 4px;font-weight: 700;">姜饼麻子</text>
					<text
						style="color: rgba(214, 88, 88, 1);font-size: 14px;margin-top: 12px;margin-left: 4px;font-weight: 700;">
						计算机科学与技术学院-大二-计算机系
					</text>
				</view>
			</view>
			<view class="info">
				<!-- 	<view class="info-item">
					<text style="font-size: 18px;color: rgba(232, 86, 86, 1);font-weight: 700;">561</text>
					<text style="font-size: 14px;margin-top: 4px;">好友</text>
				</view> -->
				<view class="info-item">
					<text style="font-size: 18px;color: rgba(214, 88, 88, 1);font-weight: 700;">10</text>
					<text style="font-size: 14px;margin-top: 4px;" @click="toMywant()">需求</text>
				</view>
				<view class="info-item">
					<text style="font-size: 18px;color: rgba(214, 88, 88, 1);font-weight: 700;">561</text>
					<text style="font-size: 14px;margin-top: 4px;" @click="toStar()">收藏</text>
				</view>
			</view>
			<!-- 喜欢的桌椅 -->
			<view class="info">
				<view class="info-item">
					<text style="font-size: 18px;color: rgba(214, 88, 88, 1);font-weight: 700;">403</text>
					<!-- <text style="font-size: 14px;margin-top: 4px;">需求</text> -->
					<text class="iconfont icon">&#xe607;</text>
				</view>
				<view class="info-item">
					<text style="font-size: 18px;color: rgba(214, 88, 88, 1);font-weight: 700;">M102</text>
					<!-- <text style="font-size: 14px;margin-top: 4px;" @click="toStar()">收藏</text> -->
					<text class="iconfont icon">&#xe608;</text>
				</view>
			</view>

			<!-- 兴趣爱好标签 -->
			<view class="tags">
				<view class="tag-header">
					<text style="font-size: 12px;color: rgba(214, 88, 88, 1);">兴趣爱好：</text>
					<text style="font-size: 12px;color: #333;" @click="toTag()">修改</text>
				</view>
				<view class="tag-body">
					<view class="tag-item" v-for="(item,index) in tags" :key="index">
						<uni-tag :text="item.text" type="primary" class="tag" :inverted="true" :circle="true"></uni-tag>
					</view>
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

	.page {
		flex-direction: column;
		height: calc(100vh - var(--window-bottom));
		background-color: rgb(239, 239, 239);
	}

	.content {
		flex-direction: column;
		flex-grow: 1;
		background-color: rgb(239, 239, 239);

		.header {
			padding: 40px 20px 20px;
			flex-direction: row;
			background-color: #fff;

			.avatar {
				height: 65px;
				width: 65px;
				border-radius: 65px;
			}

			.more {
				flex-direction: column;
				align-self: flex-start;
				font-size: 12px;
				margin-left: 10px;
			}
		}

		.info {
			flex-direction: row;
			justify-content: space-around;
			width: 100%;
			height: 10vh;
			padding: 0 20px;
			background-color: #fff;

			.info-item {
				flex-direction: column;
				align-items: center;
				// margin-top: 30px;
			}
			.icon {
				margin-top: 10px;
				color: green;
				font-size: 30px;
			}
		}

		.tags {
			flex-direction: column;
			width: 100%;
			// height: 15vh;
			padding: 20px;
			background-color: #fff;

			.tag-header {
				justify-content: space-between;
				padding: 10px;
			}

			.tag-body {
				flex-direction: column;
			}

			.tag-item {
				width: 100%;
				// height: 30px;
			}

			.tag {
				display: flex;
				justify-content: center;
				width: 50%;
				height: 13px;
				margin: 5px;
			}
		}
	}
</style>
<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue'

	const avatarSrc = ref("../.././static/images/img5.jpg")

	const tags = ref([{
			text: '人物匹配',
		},
		{
			text: '电子产品',
		},
		{
			text: '生活用品',
		},
		{
			text: '学习资料',
		},
		{
			text: '零食饮料',
		},
		{
			text: '其他',
		}
	])

	const toTag = () => {
		uni.navigateTo({
			url: '/pages/tag/tag',
			animationDuration: 300
		})
	}
	const toStar = () => {
		uni.navigateTo({
			url: '/pages/starList/starList',
			animationDuration: 300
		})
	}
	const toMywant = () => {
		uni.navigateTo({
			url: '/pages/mywantList/mywantList',
			animationDuration: 300
		})
	}
	onMounted(() => {
		uni.getStorage({
			key: 'token',
			success: (res) => {
				console.log(res.data);
			},
			fail: (err) => {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
			}
		});
	})
</script>