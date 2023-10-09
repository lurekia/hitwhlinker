<template>
	<view class="status">
	</view>
	<view class="shop">
		<view class="header">
			<view class="title">
				需求市场
			</view>
			<view @click="goToPostForm">
				<uni-icons type="compose" size="30" color="#fff"></uni-icons>
			</view>
		</view>
		<view class="body">
			<!-- 需求搜索 -->
			<view class="want-query">
				<view class="want-header">
					<view style="align-items: center;">
						<text style="color: #333;margin-right: 10px;">添加标签</text>
						<switch :checked="tagChooseVisible" @change="tagChooseVisible = !tagChooseVisible" />
					</view>
					<view>
						<button type="primary" size="mini">查询</button>
					</view>

				</view>
				<!-- 标签选择 -->
				<view v-if="tagChooseVisible" class="want-pool">
					<uni-tag v-for="(item,index) in tag_content" :text="item.text"
						:type="item.active?'primary':'default'" class="tag" :inverted="true"
						@click="tag_trigger(index)"></uni-tag>
				</view>
				<!-- 标签展示 -->
				<view v-else class="want-selected">
					<uni-tag v-for="(item,index) in tag_selected" :text="item" type="primary" class="tag"
						 :circle="true"></uni-tag>
				</view>
			</view>
			<scroll-view class="product-list" scroll-y="true" :scroll-with-animation="true">
				<product-item v-for="item in products_data"  class="product-item" :key="item.id">
				</product-item>
			</scroll-view> 
		</view>

	</view>
</template>
<style lang="scss">
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
		flex-grow: 1;
	}
	.want-query {
		width: calc(100vw - 20px);
		height: 20vh;
		flex-direction: column;

		margin: 10px;
		border-radius: 10px;

		background-color: #fff;
	}

	.want-header {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		padding: 0 20px;
		border-bottom: 1px solid rgb(216, 216, 216);
	}

	.want-pool {
		padding: 10px;
		flex-wrap: wrap;
	}

	.want-selected {
		padding: 10px;
		flex-wrap: wrap;
	}

	.tag {
		width: 50px;
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
			margin-top: 5px;
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

	// 选择标签模式
	const tagChooseVisible = ref(false)

	const tag_content = ref([{
			text: '全部',
			active: true,
		},
		{
			text: '人物匹配',
			active: true,
		},
		{
			text: '电子产品',
			active: true,
		},
		{
			text: '生活用品',
			active: true,
		},
		{
			text: '学习资料',
			active: true,
		},
		{
			text: '零食饮料',
			active: true,
		}
	])
	const tag_selected = computed(() => {
		let arr = []
		tag_content.value.forEach((item) => {
			if (item.active == true) {
				arr.push(item.text)
			}
		})
		if (arr.length == tag_content.value.length) {
			arr = ['全部']
		}
		return arr
	})
	const tag_trigger = (id) => {
		// console.log(e);
		if (id == 0) { // 处理全部
			if (tag_content.value[0].active) {
				for (let i = 0; i < tag_content.value.length; i++) {
					tag_content.value[i].active = false
				}
			} else {
				for (let i = 0; i < tag_content.value.length; i++) {
					tag_content.value[i].active = true
				}
			}
		} else {
			tag_content.value[id].active = !tag_content.value[id].active
			for (let i = 1; i < tag_content.value.length; i++) {
				if (tag_content.value[i].active == false) {
					tag_content.value[0].active = false
					return
				}
			}
			tag_content.value[0].active = true
		}
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
</script>