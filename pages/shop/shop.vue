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
					<uni-search-bar class="search" placeholder="请输入查询内容" bgColor="#EEEEEE" @confirm="search" />
				</view>

				<view class="want-tag">
					<scroll-view class="tag-body" scroll-x="true" :show-scrollbar="false">
						<view class="tag" v-for="(tag,index) in tag_content" :key="index"
							@click="handleChangeTag(index)">
							<text style="margin-bottom: 4px;font-size: 30px;" class="iconfont">&#xe609;</text>
							<text :style="{fontSize: '14px',color:tag.active?'#2979ff':'#8f939c'}">{{tag.text}}</text>
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
		// padding: 10px 0;
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
		watch
	} from 'vue'
	import {
		onLoad,
		onInit
	} from '@dcloudio/uni-app'
	import productItem from '@/components/post/productItem.vue'
import loginVue from '../login/login.vue';

	let token = null;
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
		timeRange:[],
		getMethod: "",
	})
	const type = [{
		text: '需自取',
		value: 0
	}, {
		text: '可配送',
		value: 1
	}];
	const search = () => {
		return;
	}
	// // 选择标签模式
	// const tagChooseVisible = ref(false)

	const tag_content = ref([{
			id: 1,
			text: '人物匹配',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: 2,
			text: '电子产品',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: 3,
			text: '生活用品',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: 4,
			text: '学习资料',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: 5,
			text: '零食饮料',
			icon: '&#xe60b;',
			active: false,
		},
		{
			id: 6,
			text: '其他',
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
	const handleMore = () => {
		console.log("划到底部了");
		if (loadingType.value == "noMore" || isLoading.value == true) {
			return;
		}
		pageNum = pageNum + 1;
		isLoading.value = true;
		setTimeout(() => {
			loadData();
		}, 2000)

	}
	onMounted(() => {
		uni.getStorage({
			key: 'token',
			success: (res) => {
				// console.log(res.data);
				token = res.data;
				loadData()
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