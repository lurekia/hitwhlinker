<template>
	<view class="container">
		<image :src="props.head_img_url" class="left" mode="aspectFill"></image>
		<view class="right">
			<view class="text-container">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {ref, reactive} from 'vue'
	import MarkdownIt from 'markdown-it';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const props = defineProps(["head_img_url", "msg"])
	const content = ref("")
	// 解析mardown 为 html字符串
	const mdToHtml = (mdText) => {
		console.log(mdText);
		const md = new MarkdownIt();
		const htmlText = md.render(mdText);
		return htmlText;
	}
	onLoad((obj) => {
		if(props.msg.tag === "markdown") {
			content.value = mdToHtml(props.msg.content);
		} else {
			content.value = props.msg.content;
		}
	})
</script>
<style lang="scss" scoped>
	.container {
		margin: 10px 0;
		display: flex;

		.left {
			height: 10vw;
			width: 10vw;
			border-radius: 5px;
		}
	}

	.text-container {
		max-width: calc(80vw - 30px);
		min-height: 25px;
		border-radius: 10px;
		background-color: #fff;
		position: relative;
		margin-left: 10px;
		padding: 10px;
		text {
			height: 25px;
			line-height: 25px;
			white-space: normal;
			word-break: break-all;
		}
	}

	.text-container::before {
		position: absolute;
		top: 15px;
		left: -12px;
		content: "";
		width: 0;
		height: 0;
		border-right: 6px solid #fff;
		border-bottom: 6px solid transparent;
		border-left: 6px solid transparent;
		border-top: 6px solid transparent;
	}
</style>