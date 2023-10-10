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
			title: "专业",
			content: [{
					text: "计算机科学与技术",
					active: false,
				},
				{
					text: "人工智能",
					active: false,
				},
				{
					text: "软件工程",
					active: false,
				},
			]
		},
		{
			title: "社团与组织",
			content: [{
					text: "文学",
					active: false,
				},
				{
					text: "体育",
					active: false,
				},
				{
					text: "科创",
					active: false,
				},
				{
					text: "音乐与舞蹈",
					active: false,
				},
				{
					text: "摄影与影视",
					active: false,
				},
				{
					text: "环保与公益",
					active: false,
				},
				{
					text: "演讲与辩论",
					active: false,
				},
				{
					text: "国际交流与语言",
					active: false,
				},
			],
		},
		{
			title: "讲座",
			content: [
				{
					text: "学术研究与前沿",
					active: false,
				},
				{
					text: "职业与择业指导",
					active: false,
				},
				{
					text: "个人成长与心理健康",
					active: false,
				},
				{
					text: "技能培训与认证",
					active: false,
				},
				{
					text: "文化与历史",
					active: false,
				},
				{
					text: "科技与创新",
					active: false,
				},
				{
					text: "艺术与设计鉴赏",
					active: false,
				},
				{
					text: "国际视野与交流",
					active: false,
				},
				{
					text: "金融与投资策略",
					active: false,
				},
			],
		},
		{
			title: "菜品",
			content: [
				{
					text: "川菜",
					active: false,
				},
				{
					text: "粤菜",
					active: false,
				},
				{
					text: "西餐",
					active: false,
				},
				{
					text: "饺子",
					active: false,
				},
				{
					text: "韩国料理",
					active: false,
				},
				{
					text: "快餐与汉堡",
					active: false,
				},
				{
					text: "地方小吃",
					active: false,
				},
			]
		},
		{
			title: "未来规划与职业目标",
			content: [
				{
					text: "国内读研",
					active: false,
				},
				{
					text: "出国留学",
					active: false,
				},
				{
					text: "就业",
					active: false,
				},
				{
					text: "创业",
					active: false,
				},
			]
		},
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