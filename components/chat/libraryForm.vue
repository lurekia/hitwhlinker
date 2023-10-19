<template>
	<view class="form-container">
		<view class="title" style="height: 30px;line-height: 30px;text-align: center;font-weight: 700;">

			<text> 图书馆座位信息</text>
		</view>
		<view class="form">
			<uni-forms ref="baseForm" :modelValue="formData" label-position="left">
				<!-- <uni-forms-item label="时间">
					<uni-datetime-picker v-model="formData.timeRange" return-type="date" type="datetimerange"
						rangeSeparator="至" />
				</uni-forms-item> -->
				<uni-forms-item label="时间">
					<uni-data-select v-model="formData.time" :localdata="timeType"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="楼层">
					<uni-data-select v-model="formData.floor" :localdata="floorType"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="区域">
					<uni-data-select v-model="formData.district" :localdata="districtType"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="座位类型">
					<uni-data-select v-model="formData.seat" :localdata="seatType"></uni-data-select>
				</uni-forms-item>
				<!-- 				<uni-forms-item label="座位号">
					<uni-easyinput type="number" v-model="formData.seat" placeholder="请输入座位号"></uni-easyinput>
				</uni-forms-item> -->
			</uni-forms>
		</view>
		<view v-if="showBtn" class="btn-container">
			<button size="mini" type="default" @click="handleReset">重置</button>
			<button size="mini" type="primary" @click="handleSure">确定</button>
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
	} from 'vue';
	import {
		onLoad,
		onInit
	} from '@dcloudio/uni-app';

	let showBtn = ref(true)
	const timeType = [
		{
			text: '今天8:00到10:00',
			value: '今天8:00到10:00'
		}, {
			text: '今天10:00到12:00',
			value: '今天10:00到12:00'
		}, {
			text: '今天14:00到16:00',
			value: '今天14:00到16:00'
		}, {
			text: '今天16:00到18:00',
			value: '今天16:00到18:00'
		}, {
			text: '今天19:00到21:00',
			value: '今天19:00到21:00'
		},{
			text: '明天8:00到10:00',
			value: '明天8:00到10:00'
		}, {
			text: '明天10:00到12:00',
			value: '明天10:00到12:00'
		}, {
			text: '明天14:00到16:00',
			value: '明天14:00到16:00'
		}, {
			text: '明天16:00到18:00',
			value: '明天16:00到18:00'
		}, {
			text: '明天19:00到21:00',
			value: '明天19:00到21:00'
		},
	]
	const floorType = [{
		text: '一楼',
		value: '一楼'
	}, {
		text: '二楼',
		value: '二楼'
	}, {
		text: '三楼',
		value: '三楼'
	}, {
		text: '四楼',
		value: '四楼'
	}, ]

	const districtType = [{
		text: 'A1',
		value: 'A1'
	}, {
		text: 'A2',
		value: 'A2'
	}, {
		text: 'B1',
		value: 'B1'
	}, {
		text: 'C1',
		value: 'C1'
	} ];
	const seatType = [
		{
			text: '有插座，靠窗',
			value: '有插座，靠窗'
		},
		{
			text: '无插座，靠窗',
			value: '无插座，靠窗'
		},
		{
			text: '有插座，不靠窗',
			value: '有插座，不靠窗'
		},
		{
			text: '无插座，不靠窗',
			value: '无插座，不靠窗'
		},
	]
	const formData = ref({
		time: '',
		floor: "",
		district: "",
		seat: ""
	})
	const handleReset = () => {
		formData.value = {
			time: '',
			floor: "",
			district: "",
			seat: ""
		}
	}
	const handleSure = () => {
		let str = ''
		const data = formData.value;
		if(data.time !== '') {
			str += data.time +'，';
		}
		if(data.floor !== '') {
			str += data.floor
		}
		if(data.district !== '') {
			str += data.district
			str += '区'
		}
		if(data.seat !== '') {
			str += data.seat
			str += '的'
		}
		// str += '座位';
		uni.$emit('handleChooseSeat',str);
		// console.log(str);
		// console.log(new Date().toLocaleString());
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.form-container {
		width: 90vw;
		// height: 40vh;
		background-color: #fff;
		border-radius: 25px;
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
		border-top: 1px solid rgb(239, 239, 239);
		// .btn {

		// }
	}
</style>