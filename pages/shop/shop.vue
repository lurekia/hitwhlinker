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
					<uni-forms ref="baseForm" :modelValue="queryForm" style="width: 100%;">
						<uni-forms-item label="关键词">
							<uni-easyinput placeholder="请输入关键词" v-model="queryForm.title"/>
						</uni-forms-item>
						<uni-forms-item label="价格">
							<uni-easyinput placeholder="请输入预期价格" v-model="queryForm.price"/>
						</uni-forms-item>
						<uni-forms-item label="途径">
							<uni-data-checkbox :localdata="type" v-model="queryForm.getMethod"></uni-data-checkbox>
						</uni-forms-item>


					</uni-forms>
				</view>

				<view class="want-tag">
					<view class="want-header">
						<text style="color: #333;margin-bottom: 10px;font-size: 16px;">标</text>
						<text style="color: #333;margin-top: 10px;font-size: 16px;">签</text>
						<!-- <switch :checked="tagChooseVisible" @change="tagChooseVisible = !tagChooseVisible" /> -->
						<!-- <view>
							<button type="primary" size="mini">查询</button>
						</view> -->

					</view>
					<!-- 标签选择 -->
					<view class="want-pool">
						<uni-tag v-for="(item,index) in tag_content" :text="item.text"
							:type="item.active?'primary':'default'" class="tag" :inverted="item.active?false:true"
							:circle="true" @click="tag_trigger(index)"></uni-tag>
					</view>
				</view>


			</view>
			
			<view class="product-list">
				<product-item v-for="item in products_data" class="product-item" :key="item.id" :data="item" :isMine="false">
				</product-item>
			</view>
			<view class="more">
				
			</view>
			<uni-load-more v-if="isLoading||loadingType=='noMore'" :status="loadingType" :content-text="contentText"></uni-load-more>
		</scroll-view>

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
		padding: 0 10px;
		background-color: #fff;

		.row {
			// height: 6vh;
			// font-size: 14px;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding-top: 20px;
			border-bottom: 1px solid rgb(216, 216, 216);
		}

	}

	.want-tag {
		height: 15vh;
		flex-direction: row;
		// padding: 0 10px;
		// margin: 10px;

	}

	.want-header {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// width: 100%;
		height: 100%;
		padding: 0 10px;
		border-right: 1px solid rgb(216, 216, 216);
	}

	.want-pool {
		padding: 10px;
		flex-wrap: wrap;
	}

	.tag {
		display: flex;
		justify-content: center;
		width: 50px;
		height: 13px;
		margin: 5px;
	}

	.product-list {
		width: calc(100vw - 20px);
		// height: 60vh;
		// flex-grow: 1;
		flex-direction: column;
		background-color: transparent;
		margin: 0 10px;
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

	let token = null;
	let isLoading = ref(false);
	let loadingType = ref("loading");
	const contentText = {contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"}
	let pageNum = 1;
	let pageSize = 8;
	const goToPostForm = () => {
		uni.navigateTo({
			url: '/pages/postShopForm/postShopForm'
		})
	}

	const queryForm = reactive({
		title: "",
		price:"",
		goodsTypeId:"",
		getMethod:"",
	})
	const type = [{
		text: '需自取',
		value: 0
	}, {
		text: '可配送',
		value: 1
	}];
	// // 选择标签模式
	// const tagChooseVisible = ref(false)

	const tag_content = ref([{
			id:1,
			text: '人物匹配',
			active: false,
		},
		{
			id:2,
			text: '电子产品',
			active: false,
		},
		{
			id:3,
			text: '生活用品',
			active: false,
		},
		{
			id:4,
			text: '学习资料',
			active: false,
		},
		{
			id:5,
			text: '零食饮料',
			active: false,
		},
		{
			id:6,
			text: '其他',
			active: false,
		}
	])

	// const show_tag_content = computed(() => {
	// 	return tag_content.value.sort((a, b) => {
	// 		if (a.active == true && b.active == false) {
	// 			return -1;
	// 		}
	// 		return 1
	// 	})
	// })
	// const tag_selected = computed(() => {
	// 	let arr = []
	// 	tag_content.value.forEach((item) => {
	// 		if (item.active == true) {
	// 			arr.push(item.text)
	// 		}
	// 	})
	// 	if (arr.length == tag_content.value.length) {
	// 		arr = ['全部']
	// 	}
	// 	return arr
	// })
	const tag_trigger = (id) => {
		// console.log(e);
		// if (id == 0) { // 处理全部
		// 	if (tag_content.value[0].active) {
		// 		for (let i = 0; i < tag_content.value.length; i++) {
		// 			tag_content.value[i].active = false
		// 		}
		// 	} else {
		// 		for (let i = 0; i < tag_content.value.length; i++) {
		// 			tag_content.value[i].active = true
		// 		}
		// 	}
		// } else {
		// 	tag_content.value[id].active = !tag_content.value[id].active
		// 	for (let i = 1; i < tag_content.value.length; i++) {
		// 		if (tag_content.value[i].active == false) {
		// 			tag_content.value[0].active = false
		// 			return
		// 		}
		// 	}
		// 	tag_content.value[0].active = true
		// }
		// console.log(show_tag_content);
		for (let i = 0; i < tag_content.value.length; i++) {
			tag_content.value[i].active = false;
		}
		tag_content.value[id].active = true
	}

	const products_data = ref([])
	const loadData = () => {
		isLoading.value = true;
		uni.request({
			url: "http://94.74.87.251:8080/school/goods/list?pageNum="+pageNum+"&pageSize="+pageSize,
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