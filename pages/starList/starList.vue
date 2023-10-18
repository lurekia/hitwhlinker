<template>
	<view class="page">
		<scroll-view class="product-list" scroll-y="true" :scroll-with-animation="true" @scrolltolower="handleMore()">
			<product-item v-for="item in products_data"  class="product-item" :key="item.id" :data="item" :isMine="false">
			</product-item>
			<view class="more">
				
			</view>
			<uni-load-more v-if="isLoading||loadingType=='noMore'" :status="loadingType" :content-text="contentText"></uni-load-more>
		</scroll-view> 
		<dragball :x='100' :y='50' image='http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg'></dragball>
	</view>
</template>

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
	import dragball from '@/components/drag-ball/drag-ball.vue'
	let isLoading = ref(false);
	let loadingType = ref("loading");
	const contentText = {contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"}
	let pageNum = 1;
	let pageSize = 8;
	let token = null;
	const products_data = ref([])
	
	const loadData = () => {
		isLoading.value = true;
		uni.request({
			url: "http://94.74.87.251:8080/school/goods/myStarList?pageNum="+pageNum+"&pageSize="+pageSize,
			method: "GET",
			header: {
				"Authorization": token
			},
			success: (res) => {
				// console.log(res);
				if (res.data.code == 200) {
					console.log(res);
					products_data.value = [...products_data.value,...res.data.rows];
					if(res.data.rows.length < pageSize) {
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
		if(loadingType.value == "noMore" || isLoading.value== true) {
			return ;
		}
		pageNum = pageNum + 1;
		isLoading.value = true;
		setTimeout(()=>{loadData();},2000)
		
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

<style lang="scss" scoped>
	page {
		overflow-anchor: auto;
		background-color: #efefef;
	}
	.page {
		height: calc(100vh - var(--window-bottom));
		flex-direction: column;
		background-color: rgb(239, 239, 239);
	}
	view {
		display: flex;
		box-sizing: border-box;
	}
	.product-list {
		width: 100vw;
		height: 100%;
		flex-grow: 1;
		flex-direction: column;
		background-color: transparent;
		// margin: 0 10px;
	
		.product-item {
			width: 100%;
			margin-top: 10px;
			// background-color: #fff;
		}
	
	}
	.more {
		width: 100%;
		height: 20px;
		// background-color: pink;
	}
</style>
