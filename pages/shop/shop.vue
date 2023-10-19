<template>

	<view class="shop">
		<view class="status">
		</view>
		<view class="header">
			<view class="title">
				需求市场
			</view>
			<view @click="goToPostForm">
				<uni-icons type="compose" size="30" color="#fff"></uni-icons>
			</view>
		</view>
		<scroll-view class="body" scroll-y="true" @scrolltolower="handleMore()">
			<!-- 需求搜索 -->
			<view class="want-query">
				<view class="row">
					<view class="filter" @click="showFilter">
						<text style="margin-right: 4px;">筛选</text>
						<text style="margin-right: 4px;" class="iconfont">&#xe60f;</text>
					</view>
					<uni-search-bar v-model="keyword" class="search" placeholder="请输入查询内容" bgColor="#EEEEEE" @confirm="search" />
				</view>

				<view class="want-tag">
					<scroll-view class="tag-body" scroll-x="true" :show-scrollbar="false">
						<view class="tag" @click="handleChangeTag(0)">
							<view style="margin-bottom: 4px;font-size: 26px;" class="iconfont">&#xe60c;</view>
							<text
								:style="{fontSize: '14px',color:tag_content[0].active?'#2979ff':'#8f939c'}">{{tag_content[0].text}}</text>
						</view>
						<view class="tag" @click="handleChangeTag(1)">
							<view style="margin-bottom: 4px;font-size: 26px;" class="iconfont">&#xe609;</view>
							<text
								:style="{fontSize: '14px',color:tag_content[1].active?'#2979ff':'#8f939c'}">{{tag_content[1].text}}</text>
						</view>
						<view class="tag"  @click="handleChangeTag(2)">
							<view style="margin-bottom: 4px;font-size: 26px;" class="iconfont">&#xe60d;</view>
							<text
								:style="{fontSize: '14px',color:tag_content[2].active?'#2979ff':'#8f939c'}">{{tag_content[2].text}}</text>
						</view>
						<view class="tag" @click="handleChangeTag(3)">
							<view style="margin-bottom: 4px;font-size: 26px;" class="iconfont">&#xe60e;</view>
							<text
								:style="{fontSize: '14px',color:tag_content[3].active?'#2979ff':'#8f939c'}">{{tag_content[3].text}}</text>
						</view>
						<view class="tag" @click="handleChangeTag(4)">
							<view style="margin-bottom: 4px;font-size: 26px;" class="iconfont">&#xe60a;</view>
							<text
								:style="{fontSize: '14px',color:tag_content[4].active?'#2979ff':'#8f939c'}">{{tag_content[4].text}}</text>
						</view>
						<view class="tag" @click="handleChangeTag(5)">
							<view style="margin-bottom: 4px;font-size: 26px;" class="iconfont">&#xe60b;</view>
							<text
								:style="{fontSize: '14px',color:tag_content[5].active?'#2979ff':'#8f939c'}">{{tag_content[5].text}}</text>
						</view>
					</scroll-view>
				</view>


			</view>

			<view class="product-list">
				<product-item v-for="item in products_data" class="product-item" :key="item.id" :data="item"
					:isMine="false">
				</product-item>
			</view>
			<view class="more">


			</view>
			<uni-load-more v-if="isLoading||loadingType=='noMore'" :status="loadingType"
				:content-text="contentText"></uni-load-more>
		</scroll-view>
		<!-- <dragball :x='100' :y='50' image='http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg'></dragball> -->
		<uni-drawer ref="filter" mode="right" :mask-click="true">
			<scroll-view style="height: 100%;padding: 10px;" scroll-y="true">
				<button @click="closeFilter" type="primary">筛选</button>
				<uni-forms :modelValue="filterForm" label-position="top">
					<uni-forms-item label="需求时间">
						<uni-datetime-picker v-model="filterForm.timeRange" return-type="timestamp" type="datetimerange"
							rangeSeparator="至" />
					</uni-forms-item>
					<uni-forms-item label="途径">
						<uni-data-select v-model="filterForm.getMethod" :localdata="type"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="金额">
						<uni-easyinput type="number" v-model="filterForm.money" placeholder="请输入预期金额"></uni-easyinput>
					</uni-forms-item>
				</uni-forms>
			</scroll-view>

		</uni-drawer>
	</view>
</template>
<style lang="scss" scoped>
	page {
		overflow-anchor: auto;
		background-color: #efefef;
	}

	view {
		display: flex;
		box-sizing: border-box;
	}

	.shop {
		height: calc(100vh - var(--window-bottom));
		flex-direction: column;
		background-color: rgb(239, 239, 239);
	}

	.header {
		display: flex;
		justify-content: space-between;
		width: 100vw;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 30rpx;
		border-bottom: 1px solid rgb(244, 244, 244);
		background-color: rgb(213, 79, 79);
		color: white;

		.title {
			font-size: 22px;
			font-weight: 500;
		}
	}

	.body {
		flex-direction: column;
		height: 80vh;
		flex-grow: 1;
		// padding-bottom: 50px;
	}

	.want-query {
		flex-direction: column;
		width: 100vw;
		// border-radius: 10px;
		// padding: 0 10px;
		background-color: #fff;

		.row {
			// height: 6vh;
			// font-size: 14px;
			flex-direction: row;
			padding: 0 10px;

			.filter {
				align-items: center;
				color: #c7c7c7;
				border-right: 1px solid rgb(216, 216, 216);
			}

			.search {
				flex-grow: 1;
			}

			border-bottom: 1px solid rgb(216, 216, 216);
		}
	}

	.tag-body {
		// display: flex;
		// flex-direction: row;
		// justify-content: space-between;
		white-space: nowrap;
		width: 100vw;
		height: 80px;
		padding-top: 15px;
	}



	.tag {
		display: inline-flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 25vw;
		height: 60px;
	}

	.product-list {
		width: 100vw;
		// height: 60vh;
		// flex-grow: 1;
		flex-direction: column;
		background-color: transparent;

		// margin: 0 10px;
		// margin-bottom: 100px;
		.product-item {
			width: 100%;
			// height: 340px;
			margin-top: 10px;
			background-color: #fff;
		}
	}

	.more {
		width: 100%;
		height: 20px;
		// background-color: pink;
	}
</style>
<script setup>
	import {
		ref,
		reactive,
		onMounted,
		computed,
		watch,
		getCurrentInstance,
		onUnmounted
	} from 'vue'
	import {
		onLoad,
		onInit,
		onShow
	} from '@dcloudio/uni-app'
	import productItem from '@/components/post/productItem.vue'
	import loginVue from '../login/login.vue';
	import dragball from '@/components/drag-ball/drag-ball.vue'
	const {
		proxy
	} = getCurrentInstance()
	let token = null;
	let user_info = {
		id: "001",
		name: "姜饼麻子",
		avatar: "../.././static/images/img5.jpg"
	};
	const keyword = ref("")
	let isLoading = ref(false);
	let loadingType = ref("loading");
	const contentText = {
		contentdown: "上拉显示更多",
		contentrefresh: "正在加载...",
		contentnomore: "没有更多数据了"
	}
	let pageNum = 1;
	let pageSize = 8;
	const filter = ref();
	const goToPostForm = () => {
		uni.navigateTo({
			url: '/pages/postShopForm/postShopForm'
		})
	}
	const showFilter = () => {
		// console.log(filter.value);
		filter.value.open()
	};
	const closeFilter = () => {
		filter.value.close()
	};
	const filterForm = ref({
		money: 100,
		timeRange: [],
		getMethod: "",
	})
	const type = [{
		text: '需自取',
		value: 0
	}, {
		text: '可配送',
		value: 1
	}];
	const searchTag = (id) => {
		isLoading.value = true;
		loadingType.value = "loading"
		products_data.value = [];
		console.log("搜索开始");
		uni.request({
			url: 'http://94.74.87.251:8080/search/goods_type/'+ id +'?pageNum=0&pageSize=100',
			method: "GET",
			header: {
				"Authorization": token
			},
			success: (res) => {
				console.log(res);
				if (res.data.code == 200) {
					// console.log(res);
					products_data.value = res.data.rows;
					
					loadingType.value = "noMore"
					// console.log(products_data.value);
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
		
				}
			},
			fail: (err) => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			},
			complete: () => {
				isLoading.value = false;
				keyword.value = "";
			}
		})
	}
	const search = () => {
		isLoading.value = true;
		loadingType.value = "loading"
		products_data.value = [];
		console.log("搜索开始");
		uni.request({
			url: 'http://94.74.87.251:8080/search/'+ keyword.value +'?pageNum=0&pageSize=100',
			method: "GET",
			header: {
				"Authorization": token
			},
			success: (res) => {
				console.log(res);
				if (res.data.code == 200) {
					console.log(res);
					products_data.value = res.data.data.goodsList;
					
					loadingType.value = "noMore"
					// console.log(products_data.value);
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
		
				}
			},
			fail: (err) => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			},
			complete: () => {
				isLoading.value = false;
				keyword.value = "";
			}
		})
		return;
	}
	// // 选择标签模式
	// const tagChooseVisible = ref(false)

	const tag_content = ref([{
			id: '0',
			text: '教辅教材',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: '1',
			text: '电子产品',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: '2',
			text: '生活用品',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: '3',
			text: '学习资料',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: "4",
			text: '零食饮料',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: "5",
			text: '人物匹配',
			icon: '&#xe60b;',
			active: false,
		}
	])
	const selectedTagIndex = ref(0);
	const handleChangeTag = (id) => {
		for (let i = 0; i < tag_content.value.length; i++) {
			tag_content.value[i].active = false;
		}
		tag_content.value[id].active = true
		selectedTagIndex.value = id
		searchTag(id);
	}

	const products_data = ref([])
	const loadData = () => {
		isLoading.value = true;
		uni.request({
			url: "http://94.74.87.251:8080/school/goods/list?pageNum=" + pageNum + "&pageSize=" + pageSize,
			method: "GET",
			header: {
				"Authorization": token
			},
			success: (res) => {
				// console.log(res);
				if (res.data.code == 200) {
					console.log(res);
					products_data.value = [...products_data.value, ...res.data.rows];
					if (res.data.rows.length < pageSize) {
						loadingType.value = "noMore"
					}
					console.log(products_data.value);
				} else {
					uni.showToast({
						title: '加载失败，请检查网络',
						icon: 'none'
					})

				}
			},
			fail: (err) => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			},
			complete: () => {
				isLoading.value = false;
			}
		})
	}
	const connectGoEasy = () => {
		// uni.showLoading();
		proxy.goEasy.connect({
			id: user_info.id,
			data: {
				name: user_info.name,
				avatar: user_info.avatar
			},
			onSuccess: () => {
				console.log('GoEasy connect successfully.')
			},
			onFailed: (error) => {
				console.log('Failed to connect GoEasy, code:' + error.code + ',error:' + error.content);
			},
			onProgress: (attempts) => {
				console.log('GoEasy is connecting', attempts);
			}
		});
	}

	const handleMore = () => {
		console.log("划到底部了");
		if (loadingType.value == "noMore" || isLoading.value == true) {
			return;
		}
		pageNum = pageNum + 1;
		console.log("查询页面数：",pageNum);
		isLoading.value = true;
		setTimeout(() => {
			loadData();
		}, 1000)

	}
	const initData = () => {
		uni.getStorage({
			key: 'user_info',
			success: (res) => {
				// console.log(res.data);
				user_info = JSON.parse(res.data);
				if (proxy.goEasy.getConnectionStatus() === 'disconnected') {
					connectGoEasy(); //连接goeasy
				}
				console.log("用户信息：", user_info);
			},
			fail: (err) => {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
			}
		});
		loadingType.value = "loading"
		products_data.value = [];
		pageNum = 1;
		loadData()
	}

	onShow(() => {
		uni.getStorage({
			key: 'token',
			success: (res) => {
				// console.log(res.data);
				token = res.data;
				for (let i = 0; i < tag_content.value.length; i++) {
					tag_content.value[i].active = false;
				}
				initData();

			},
			fail: (err) => {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
			}
		});
	})
	onUnmounted(() => {
		//断开连接
		proxy.goEasy.disconnect({
			onSuccess: function() {
				console.log("GoEasy disconnect successfully.")
			},
			onFailed: function(error) {
				console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error
					.content);
			}
		});
	})
</script>