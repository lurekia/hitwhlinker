<template>
	<view class="form-container">
		<view class="title" style="height: 30px;line-height: 30px;text-align: center;font-weight: 700;">
			
			<text> 图书馆座位信息</text>
		</view>
		<view class="form">
			<uni-forms ref="baseForm" :modelValue="formData" label-position="left">
				<uni-forms-item label="时间">
					<uni-datetime-picker v-model="formData.timeRange" return-type="timestamp" type="datetimerange"
						rangeSeparator="至" />
				</uni-forms-item>
				<uni-forms-item label="楼层">
					<uni-data-select v-model="formData.floor" :localdata="floorType"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="区域">
					<uni-data-select v-model="formData.district" :localdata="districtType"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="座位号">
					<uni-easyinput type="number" v-model="formData.seat" placeholder="请输入座位号"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view v-if="showBtn" class="btn-container">
			<button size="mini" type="warn">取消</button>
			<button size="mini" type="primary">确定</button>
		</view>
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

	let showBtn = ref(true)
	const floorType = [{
		text: '一楼',
		value: 1
	}, {
		text: '二楼',
		value: 2
	}, {
		text: '三楼',
		value: 3
	}, {
		text: '四楼',
		value: 4
	}, ]

	const districtType = [{
		text: 'A1',
		value: 1
	}, {
		text: 'A2',
		value: 2
	}, {
		text: 'B1',
		value: 3
	}, {
		text: 'C1',
		value: 4
	}, ]
	const formData = ref({
		timeRange: [],
		floor: "二层",
		district: "D2",
		seat: ""
	})
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.form-container {
		width: 100vw;
		// height: 40vh;
		background-color: #fff;
	}
	.form {
		width: 100%;
		padding: 20px 20px 10px;
	}
	.btn-container {
	
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 20px 20px 20px;
		border-top: 1px solid rgb(239,239,239);
		// .btn {
			
		// }
	}
</style>