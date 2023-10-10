<template>
	<view class="status">
	</view>
	<view>
		<view class="topbar">
			<view class="topbar-content">
				需求发布
			</view>
			<uni-icons type="back" size="30" color="#fff" class="go-back" @click="goBack"></uni-icons>
		</view>
		<view class="body">
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
				</uni-forms-item>
				<uni-forms-item label="途径" >
					<uni-data-checkbox v-model="typeValue" :localdata="type"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="价格" >
					<uni-easyinput v-model="baseFormData.money" placeholder="请输入初步价格" />
				</uni-forms-item>
				<uni-forms-item label="详情">
					<uni-easyinput type="textarea" v-model="baseFormData.detail" placeholder="请输入详情介绍" />
				</uni-forms-item>
				<uni-forms-item label="需求时间">
					<uni-datetime-picker v-model="baseFormData.datetimerange" return-type="timestamp" type="datetimerange" rangeSeparator="至" />
				</uni-forms-item>
				<uni-forms-item label="上传图片">
					<u-upload
							:fileList="fileList1"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="10"
						></u-upload>
					
				</uni-forms-item>
			</uni-forms>
			<button type="default" @click="submitForm" class="submit" >发布</button>
		</view>
	</view>
</template>

<script setup>
	import{
		ref,
		reactive,
		onMounted,
		computed,
		watch
	} from 'vue'
	import {
		onLoad,onInit
	} from '@dcloudio/uni-app'
	const goBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	const baseFormData = reactive({
					id:'',
					title: '',
					tag: '',
					detail: '',
					money:null,
					datetimerange: [],
					postTime:null,
				})
	const type= [{
					text: '需自取',
					value: 0
				}, {
					text: '可配送',
					value: 1
				}]
	const range = [
				  { value: 0, text: "教辅教材" },
				  { value: 1, text: "电子产品" },
				  { value: 2, text: "生活用品" },
				  { value: 3, text: "学习资料" },
				  { value: 4, text: "零食饮料" },
				  { value: 5, text: "人物匹配" },
				]
				
				
	const fileList1 = ref([]);

	// 删除图片
	const deletePic = (event) => {
	  fileList1.value.splice(event.index, 1);
	};

	// 新增图片
	const afterRead = async (event) => {
	  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
	  let lists = [].concat(event.file);
	  let fileListLen = fileList1.value.length;
	  lists.map((item) => {
		fileList1.value.push({
		  ...item,
		  status: 'uploading',
		  message: '上传中',
		});
	  });
	  for (let i = 0; i < lists.length; i++) {
		const result = await uploadFilePromise(lists[i].url);
		let item = fileList1.value[fileListLen];
		fileList1.value.splice(fileListLen, 1, {
		  ...item,
		  status: 'success',
		  message: '',
		  url: result,
		});
		fileListLen++;
	  }
	};

	const uploadFilePromise = (url) => {
	  return new Promise((resolve, reject) => {
		let a = uni.uploadFile({
		  url: 'http://94.74.87.251:8080/upload', // 仅为示例，非真实的接口地址
		  filePath: url,
		  name: 'file',
		  formData: {
			user: 'test',
		  },
		  success: (res) => {
			setTimeout(() => {
			  resolve(res.data.data);
			}, 1000);
		  },
		});
	  });
	};
</script>

<style lang="scss">
	
	
	.topbar {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
		background-color: #e85353;
		display: flex;
		position: relative;
		top: 0;
		left: 0;
		justify-content: center;
	
		.go-back {
			position: absolute;
			top: 0rpx;
			left: 20rpx;
			z-index: 99;
		}
	}
.body{
	width: 90%;
	margin: 50rpx auto;
	
	
	.submit {
		color: #fff;
		width: 30%;
		margin: 50rpx auto;
		background-color: #e85353;
	}
}

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
