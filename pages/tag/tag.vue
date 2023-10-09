<template>
	<view class="page">
		<view class="content">
			<view v-for="(item,index) in tag_content" :key="index" class="tags">
			<view class="tag-header">
				<text style="font-size: 16px;color: #333;">{{item.title}}</text>
			</view>
			<scroll-view class="tag-body" scroll-x="true" :show-scrollbar="false">
				<view class="tag" v-for="(tag,index2) in item.content" :key="index2">
					<uni-tag   :text="tag.text" :type="tag.active?'primary':'default'" :inverted="tag.active?false:true" :circle="true" @click="tag_trigger(index,index2)"></uni-tag>
				</view>
				
			</scroll-view>
		</view>
		</view>
		
		<view class="footer">
			<button style="width: 70%;" type="primary" size="default">我选好了</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'

	const tag_content = ref([
		{
			title: "游戏",
			content: [{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
				{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
				{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
			]
		},
		{
			title: "音乐",
			content: [{
					text: "林俊杰",
					active: false,
				},
				{
					text: "周杰伦",
					active: false,
				},
				{
					text: "邓紫棋",
					active: false,
				},
			],
		},
		{
			title: "活动",
			content: [{
					text: "学科竞赛",
					active: false,
				},
				{
					text: "社团活动",
					active: false,
				},
				{
					text: "体育活动",
					active: false,
				},
			],
		},
		{
			title: "游戏",
			content: [{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
				{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
				{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
			]
		},
		{
			title: "音乐",
			content: [{
					text: "林俊杰",
					active: false,
				},
				{
					text: "周杰伦",
					active: false,
				},
				{
					text: "邓紫棋",
					active: false,
				},
			],
		},
		{
			title: "活动",
			content: [{
					text: "学科竞赛",
					active: false,
				},
				{
					text: "社团活动",
					active: false,
				},
				{
					text: "体育活动",
					active: false,
				},
			],
		},
		{
			title: "游戏",
			content: [{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
				{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
				{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
			]
		},
		{
			title: "音乐",
			content: [{
					text: "林俊杰",
					active: false,
				},
				{
					text: "周杰伦",
					active: false,
				},
				{
					text: "邓紫棋",
					active: false,
				},
			],
		},
		{
			title: "活动",
			content: [{
					text: "学科竞赛",
					active: false,
				},
				{
					text: "社团活动",
					active: false,
				},
				{
					text: "体育活动",
					active: false,
				},
			],
		},
		{
			title: "游戏",
			content: [{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
				{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
				{
					text: "王者荣耀",
					active: false,
				},
				{
					text: "英雄联盟",
					active: false,
				},
				{
					text: "云顶之奕",
					active: false,
				},
			]
		},
		{
			title: "音乐",
			content: [{
					text: "林俊杰",
					active: false,
				},
				{
					text: "周杰伦",
					active: false,
				},
				{
					text: "邓紫棋",
					active: false,
				},
			],
		},
		{
			title: "活动",
			content: [{
					text: "学科竞赛",
					active: false,
				},
				{
					text: "社团活动",
					active: false,
				},
				{
					text: "体育活动",
					active: false,
				},
			],
		}
		
		
	])
	const tag_trigger = (index, index2) => {
		// console.log(tag_content.value[index].content[index2].active);
		tag_content.value[index].content[index2].active = !tag_content.value[index].content[index2].active
	}
</script>

<style lang="scss">
	view {
		display: flex;
		box-sizing: border-box;
	}

	.page {
		height: calc(100vh - var(--window-bottom) - 44px);
		flex-direction: column;
		// background-color: rgb(239,239,239);
	}
	.content {
		flex-direction: column;
		padding-bottom: 100px;
	}
	.tags {
		width: 100%;
		flex-direction: column;
		margin-bottom: 20px;

		.tag-header {
			height: 40px;
			padding: 10px 20px;
		}

		.tag-body {
			// flex-direction: row;
			// justify-content: space-between;
			white-space: nowrap;
			width: 100%;
			padding: 10px 0;
		}
		.tag {
			display: inline-block;
			height: 30px;
			margin: 0 5px;
			padding: 5px 0;
		}
	}
	.footer {
		// background-color: rgb(239,239,239);
		background-color: #fff;
		position: fixed;
		bottom: 0px;
		width: 100vw;
		height: 60px;
		justify-content: center;
		align-items: center;
		
	}
</style>