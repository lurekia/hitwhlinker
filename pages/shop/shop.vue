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
		<scroll-view class="body" scroll-y="true">
			<!-- 需求搜索 -->
			<view class="want-query">
				<view class="row">
					<uni-forms ref="baseForm" :modelValue="queryForm" style="width: 100%;">
						<uni-forms-item label="关键词">
							<uni-easyinput placeholder="请输入关键词" />
						</uni-forms-item>
						<uni-forms-item label="价格" >
							<uni-easyinput placeholder="请输入预期价格" />
						</uni-forms-item>
						<uni-forms-item label="途径" >
							<uni-data-checkbox :localdata="type"></uni-data-checkbox>
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
						<uni-tag v-for="(item,index) in show_tag_content" :text="item.text"
							:type="item.active?'primary':'default'" class="tag" :inverted="item.active?false:true"
							:circle="item.active" @click="tag_trigger(index)"></uni-tag>
					</view>
				</view>


			</view>
			<view class="product-list">
				<product-item v-for="item in products_data" class="product-item" :key="item.id">
				</product-item>
			</view>
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
		padding-bottom: 10px;
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
		height: 60vh;
		flex-grow: 1;
		flex-direction: column;
		background-color: transparent;
		margin: 0 10px;

		.product-item {
			width: 100%;
			margin-top: 10px;
			// background-color: #fff;
		}

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

	const goToPostForm = () => {
		uni.navigateTo({
			url: '/pages/postShopForm/postShopForm'
		})
	}
	
	const queryForm = reactive({
					id:'',
					title: '',
					tag: '',
					detail: '',
					money:null,
					datetimerange: [],
					postTime:null,
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

			text: '人物匹配',
			active: false,
		},
		{
			text: '电子产品',
			active: false,
		},
		{
			text: '生活用品',
			active: false,
		},
		{
			text: '学习资料',
			active: false,
		},
		{
			text: '零食饮料',
			active: false,
		},
		{
			text: '其他',
			active: false,
		}
	])

	const show_tag_content = computed(() => {
		return tag_content.value.sort((a, b) => {
			if (a.active == true && b.active == false) {
				return -1;
			}
			return 1
		})
	})
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
		console.log(show_tag_content);
		tag_content.value[id].active = !tag_content.value[id].active
	}

	const products_data = ref([{
			id: 0,
			title: '无',
			tag: '电子产品',
			detail: '无',
			money: 100,
			datetimerange: [0, 2],
			postTime: "2023/10/2",
		},
		{
			id: 1,
			title: '无',
			tag: '电子产品',
			detail: '无',
			money: 100,
			datetimerange: [0, 2],
			postTime: "2023/10/2",
		},
		{
			id: 2,
			title: '无',
			tag: '电子产品',
			detail: '无',
			money: 100,
			datetimerange: [0, 2],
			postTime: "2023/10/2",
		},
		{
			id: 3,
			title: '无',
			tag: '电子产品',
			detail: '无',
			money: 100,
			datetimerange: [0, 2],
			postTime: "2023/10/2",
		},
		{
			id: 4,
			title: '无',
			tag: '电子产品',
			detail: '无',
			money: 100,
			datetimerange: [0, 2],
			postTime: "2023/10/2",
		},
	])
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