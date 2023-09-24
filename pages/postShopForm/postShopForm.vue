<template>
	<view>
		<!-- 基础用法，不包含校验规则 -->
		<uni-forms ref="baseForm" :modelValue="baseFormData">
			<uni-forms-item label="标题" required>
				<uni-easyinput v-model="baseFormData.title" placeholder="请输入标题" />
			</uni-forms-item>
			<uni-forms-item label="标签" required>
				<uni-data-select
				        v-model="baseFormData.tag"
				        :localdata="range"
				        @change="change"
				      ></uni-data-select>
				<!-- <uni-easyinput v-model="baseFormData.tag" placeholder="请输入年龄" /> -->
			</uni-forms-item>
			<uni-forms-item label="价格" >
				<uni-easyinput v-model="baseFormData.money" placeholder="请输入初步价格" />
			</uni-forms-item>
			<uni-forms-item label="详情">
				<uni-easyinput type="textarea" v-model="baseFormData.detail" placeholder="请输入详情介绍" />
			</uni-forms-item>
			<uni-forms-item label="需求时间">
				<uni-datetime-picker v-model="baseFormData.datetimerange" return-type="timestamp" type="datetimerange" rangeSeparator="至" />
				<!-- <uni-datetime-picker type="datetime" return-type="timestamp" v-model="baseFormData.datetimesingle"/> -->
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					title: '',
					tag: '',
					detail: '',
					money: ,
					datetimerange: [],
				},
				 range: [
				          { value: 0, text: "教辅教材" },
				          { value: 1, text: "电子产品" },
				          { value: 2, text: "生活用品" },
						  { value: 3, text: "学习资料" },
						  { value: 4, text: "零食饮料" },
						  { value: 5, text: "人物匹配" },
				        ],
			};
		}
	}
</script>

<style lang="scss">
.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>
