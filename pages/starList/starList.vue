<template>
	<view class="page">
		<scroll-view class="product-list" scroll-y="true" :scroll-with-animation="true">
			<product-item v-for="item in products_data"  class="product-item" :key="item.id">
			</product-item>
		</scroll-view> 
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

<style lang="scss" scoped>
	page {
		overflow-anchor: auto;
		background-color: #efefef;
	}
	.shop {
		height: calc(100vh - var(--window-bottom));
		flex-direction: column;
		background-color: rgb(239, 239, 239);
	}
	view {
		display: flex;
		box-sizing: border-box;
	}
	.product-list {
		width: calc(100vw - 20px);
		height: 100%;
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
