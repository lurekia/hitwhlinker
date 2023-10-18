<template>

	<view class="page">
		<view class="status">
		</view>
		<view class="content">
			<view class="header">
				<image :src="avatarSrc" mode="aspectFill" class="avatar" @click="switchAvatar"></image>
				<view class="more">
					<text style="font-size: 18px;margin-top: 4px;font-weight: 700;">{{nickName}}</text>
					<text
						style="color: rgba(214, 88, 88, 1);font-size: 14px;margin-top: 12px;margin-left: 4px;font-weight: 700;">
						{{userInfo}}
					</text>
				</view>
			</view>

			<view class="item">
				<view class="item-header">
					<text style="font-size: 12px;color: #8f939c;">商品：</text>
					<!-- <text style="font-size: 12px;color: #333;" @click="toTag()">修改</text> -->
				</view>
				<view class="info-body">
					<view class="info-item">
						<!-- <text style="font-size: 18px;color: rgba(214, 88, 88, 1);font-weight: 700;">10</text> -->
						<text style="font-size: 18px;margin-top: 4px;color: rgba(214, 88, 88, 1);font-weight: 700;"
							@click="toMywant()">我的</text>
						<uni-icons type="wallet" size="30" color="rgb(0,122,255)" style="margin-top: 10px;"></uni-icons>
					</view>
					<view class="info-item">
						<!-- <text style="font-size: 18px;color: rgba(214, 88, 88, 1);font-weight: 700;">561</text> -->
						<text style="font-size: 18px;margin-top: 4px;color: rgba(214, 88, 88, 1);font-weight: 700;"
							@click="toStar()">收藏</text>
						<uni-icons type="star-filled" size="30" color="yellow" style="margin-top: 10px;"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 喜欢的桌椅 -->
			<view class="item">
				<view class="item-header">
					<text style="font-size: 12px;color: #8f939c;">自习：</text>
				</view>
				<view class="info-body">
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
			</view>

			<!-- 兴趣爱好标签 -->
			<view class="item">
				<view class="item-header">
					<text style="font-size: 12px;color: #8f939c;">兴趣爱好：</text>
					<text style="font-size: 12px;color: #333;" @click="toTag()">修改</text>
				</view>
				<view class="tag-body">
					<view class="tag-item" v-for="(item,index) in tags" :key="index">
						<uni-tag :text="item.text" type="primary" class="tag" :inverted="true" :circle="true"></uni-tag>
					</view>
				</view>
			</view>
			<view class="logOut">
				<button type="warn" style="width: 80vw;" @click="logout()">登出</button>
			</view>
		</view>
		<dragball :x='200' :y='50' image='http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg'></dragball>
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
				border: 1px solid rgba(214, 88, 88, 1);
			}

			.more {
				flex-direction: column;
				align-self: flex-start;
				font-size: 12px;
				margin-left: 10px;
			}
		}



		.item {
			flex-direction: column;
			width: 100%;
			// height: 15vh;
			padding: 20px;
			background-color: #fff;

			.item-header {
				justify-content: space-between;
				padding: 10px;
			}

			.tag-body {
				flex-direction: row;
				flex-wrap: wrap;

				width: 100%;

			}

			.tag-item {
				// width: 100%;
				// height: 30px;
				margin: 10px 10px;
			}

			.tag {
				display: flex;
				justify-content: center;
				// width: 50%;
				height: 13px;
				// margin: 5px;
				padding: 5px 10px;
			}

			.info-body {
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
		}

		.logOut {
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 100vw;
			height: 100px;
			padding: 30px;
			margin-bottom: 30px;
			background-color: #fff;

		}
	}
</style>
<script setup>
	import {
		onMounted,
		reactive,
		ref,
		// getCurrentInstance
	} from 'vue'
	import {
		onLoad,
		onInit,
		onShow
	} from '@dcloudio/uni-app'
	import dragball from '@/components/drag-ball/drag-ball.vue'
	// const {proxy} = getCurrentInstance()
	// const handleMoveBall = (wz) => {
	// 	proxy.inx = wz.x;
	// 	proxy.iny = wz.y;
	// }
	
	const avatarSrc = ref("")
	const userInfo = ref("")
	const nickName = ref("")
	let userId = "";
	let token = "";

	const tags = ref([{
			text: '川菜',
		},
		{
			text: '文化与历史',
		},
		{
			text: '文学',
		},
		{
			text: '学术研究与前沿',
		},
		{
			text: '读研',
		},
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
	const previewAvatar = () => {
		uni.previewImage({
			urls: [avatarSrc.value],
			longPressActions: {
				itemList: ['取消', '修改'],
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			}
		});
	}
	const switchAvatar = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function(res) {
				const tempFilePaths = res.tempFilePaths;
				uni.uploadFile({
					url: 'http://94.74.87.251:8080/system/user/profile/avatar', //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: 'avatarfile',
					header: {
						// "Content-Type": "multipart/form-data",
						'Authorization': token
					}, 
					formData: {
						// 'user': 'test',
						// 'avatarfile': 'ada'
					},
					success: (res2) => {
						// console.log(res2);
						// 解析返回的数据为JSON对象
						const resData = JSON.parse(res2.data);
						// // 从JSON对象中获取图片URL
						// if()
						console.log(resData);
						if(resData.code === 200) {
							avatarSrc.value = 'http://94.74.87.251:8080' + resData.imgUrl;
							uni.setStorageSync('user_info',JSON.stringify({id: userId,name: nickName.value,avatar: avatarSrc.value}))
							uni.showToast({
								title: "修改成功",
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: resData.msg,
								icon: 'none'
							})
						}
						
						// console.log("切换头像：", avatarSrc);
					},
				})

			}
		});
	}
	const logout = () => {
		uni.removeStorage({
			key: 'token',
			success: function(res) {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
				uni.showToast({
					title: "登出成功",
					icon: 'none'
				})
			},
			fail: function(err) {
				uni.showToast({
					title: "登出失败",
					icon: 'none'
				})
			}
		});
	}
	onMounted(() => {
		uni.getStorage({
			key: 'token',
			success: (res) => {
				token = res.data
			},
			fail: (err) => {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
			}
		});
		uni.getStorage({
			key: 'user_info',
			success: (res) => {
				// console.log(res.data);
				const user_info = JSON.parse(res.data);
				userId = user_info.id;
				nickName.value = user_info.name;
				avatarSrc.value = user_info.avatar;
				
				console.log(avatarSrc.value);
				userInfo.value = "大二 - 计算机科学与技术"
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