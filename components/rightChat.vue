<template>
	<view class="container">
		<image :src="props.head_img_url" class="left" mode="aspectFill"></image>
		<view class="right">
			<view class="text-container">
				<text>{{ props.msg.content}}</text>
			</view>
		</view>
	</view>
</template>
<script setup>

const props = defineProps(["head_img_url","msg"])

</script>
<style lang="scss" scoped>
.container {
	margin: 10px 0;
	display: flex;
	flex-direction: row-reverse;
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
	background-color: rgb(150,236,102);
	position: relative;
	margin-right: 10px;
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
		right: -12px;
		content: "";
		width: 0;
		height: 0;
		border-right: 6px solid transparent;
		border-bottom: 6px solid transparent;
		border-left: 6px solid rgb(150,236,102);
		border-top: 6px solid transparent;
	}
</style>