<template>
	<view>
		<view class="topbar">
			<view class="topbar-content">
				需求发布
			</view>
			<uni-icons type="back" size="30" color="#fff" class="go-back" @click="goBack"></uni-icons>
		</view>
		<view class="page-body">
			<view class="body">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :modelValue="baseFormData" label-position="top">
					<uni-forms-item label="标题" required>
						<uni-easyinput v-model="baseFormData.title" placeholder="请输入标题" maxlength="25" />
					</uni-forms-item>
					
					<uni-forms-item label="标签" required>
						<uni-data-select
						        v-model="baseFormData.tag"
						        :localdata="range"
						        @change="changeGoodsTag"
						      ></uni-data-select>
					</uni-forms-item>
					
					<uni-forms-item label="途径" >
						<uni-data-checkbox v-model="baseFormData.typeValue" :localdata="type" @change="changetypeValue"></uni-data-checkbox>
					</uni-forms-item>
					<uni-forms-item label="价格" >
						<uni-easyinput type="number" class="uni-mt-5" v-model="baseFormData.price" placeholder="请输入初步价格(只能输入数字)" ></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="库存" >
						<uni-number-box :value="baseFormData.count" @change="changeCountValue" />
					</uni-forms-item>
					<uni-forms-item label="详情" required>
					      <uni-easyinput
					          type="textarea"
					          v-model="baseFormData.content"
					          autoHeight
					          placeholder="请输入详情介绍"
					          @input="updateDetail"
					        />
					</uni-forms-item>
					<!-- <uni-forms-item label="需求时间" >
						<uni-datetime-picker v-model="baseFormData.datetimerange" return-type="timestamp" type="datetimerange" rangeSeparator="至" />
					</uni-forms-item> -->
					<uni-forms-item label="上传图片">
						<u-upload
							:fileList="baseFormData.imageArray"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="10"
						></u-upload>
							
					</uni-forms-item>
					<uni-forms-item label="联系方式" required>
						<uni-easyinput v-model="baseFormData.contactInfo" placeholder="请输入您的联系方式" />
					</uni-forms-item>
				</uni-forms>
				
				<button type="default" @click="submitForm" class="submit" >发布</button>
			</view>
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
	let token = null;
	const changeGoodsTag = (e)=>{
		console.log(e);
		baseFormData.goodsTypeId=e;
	}
	const changetypeValue = (e)=>{
		console.log(e.detail.value);
		baseFormData.getMethod=e.detail.value;
	}
	const baseFormData = reactive({
					tag: '',
					// datetimerange: [],
					typeValue:null,
					imageArray:[],//表单的图片数组 //非接口传过来的真实url
					// ImageData:[],//接口返回给我的拼接后的真实url
					
					
					commentCount: 0,
					contactInfo: '',
					content: '',
					count: 1,
					// createBy: '',
					// createTime: '',
					getMethod: null,
					goodsTypeId: '',
					id: 0,
					picture: '',
					price: null,
					// remark: '',
					// stateFlg: 0,
					title: '',
					// updateBy: '',
					// updateTime: '',
					// userId: 0
				})
	function if_GetMethod(){
		if(baseFormData.getMethod===null)
		{
			return -1;
		}else{
			return baseFormData.getMethod
		}
	}
	let pageNum = 1;			
	const submitForm =()=>{
		uni.request({
			url: "http://94.74.87.251:8080/school/goods",
			method: "POST",
			data:{
				commentCount: baseFormData.commentCount,
				contactInfo: baseFormData.contactInfo,
				content: baseFormData.content,
				count: baseFormData.count,
				// createBy: baseFormData.createBy,
				// createTime: baseFormData.createTime,
				getMethod: if_GetMethod(),
				goodsTypeId: baseFormData.goodsTypeId,
				id: 0,
				picture: baseFormData.picture,
				price:baseFormData.price,
				// remark: baseFormData.remark,
				// stateFlg: baseFormData.stateFlg,
				title: baseFormData.title,
				// updateBy: baseFormData.updateBy,
				// updateTime: baseFormData.updateTime,
				// userId: baseFormData.userId
			},
			header: {
				"Authorization": token
			},
			success: (res) => {
				console.log(res);
				if (res.data.code == 200) {
					console.log(res);
					uni.switchTab({
						url:"/pages/shop/shop"
					})
					uni.showToast({
						title: '上传成功',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '加载失败，请检查网络',
						icon: 'none'
					})
		
				}
			},
			fail: (err) => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			}
		})
	}		
	const updateDetail=(event)=> {
	    baseFormData.content = event.target;
		// console.log(event.target);
	  }
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
	const loadData = ()=>{
		uni.request({
			url:"http://94.74.87.251:8080/school/goods_type/list",
			method: "GET",
			header: {
				"Authorization": token
			},
			success: (res) => {
				console.log('res',res);
				if (res.data.code == 200) {
					
				} else {
				}
			},
			fail: (err) => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			}
		})
	}
	onLoad((option) => {
		uni.getStorage({
				key: 'token',
				success: (res) => {
					token = res.data;
					loadData()
				},
				fail: (err) => {
					uni.navigateTo({
						url: '/pages/login/login',
						animationDuration: 300
					})
				}
			});
	
		
	})			
	const changeCountValue = (value)=>{
		baseFormData.count = value
		console.log(baseFormData.count);
	}				
	
	//图片的数组
	// const fileList1 = ref([]);

	// 删除图片
	const deletePic = (event) => {
	  baseFormData.imageArray.splice(event.index, 1);
	};

	// 新增图片
	const afterRead = async (event) => {
	  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
	  let lists = [].concat(event.file);
	  let fileListLen = baseFormData.imageArray.length;
	  lists.map((item) => {
		baseFormData.imageArray.push({
		  ...item,
		  status: 'uploading',
		  message: '上传中',
		});
	  });
	  for (let i = 0; i < lists.length; i++) {
		const result = await uploadFilePromise(lists[i].url);
		let item = baseFormData.imageArray[fileListLen];
		baseFormData.imageArray.splice(fileListLen, 1, {
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
		  url: 'http://94.74.87.251:8080/upload', 
		  filePath: url,
		  name: 'image',
		  formData: {
			user: 'test',
		  },
		  success: (res) => {
			  // 解析返回的数据为JSON对象
			  const responseData = JSON.parse(res.data);
			  // 从JSON对象中获取图片URL
			  const url = responseData.msg;
			  // 检查picture变量是否为空，如果不为空，则添加逗号
			  if (baseFormData.picture !== '') {
			    baseFormData.picture += ',';
			  }
			  
			  // 拼接URL到picture变量，并以逗号分隔
			  baseFormData.picture += url;
			  console.log(baseFormData.picture);
			setTimeout(() => {
			  resolve(res.data.data);
			  
			  // console.log(baseFormData.picture+res.data);
			}, 1000);
		  },
		});
	  });
	};
	onMounted(() => {
		uni.getStorage({
			key: 'token',
			success: (res) => {
				// console.log(res.data);
				token = res.data;
			},
			fail: (err) => {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
			}
		});
	})
</script>

<style lang="scss" scoped>
	.detail-content {
	  margin-top: 10px;
	}
	
	.detail-text {
	  white-space: pre-wrap;
	}
.topbar {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	color: #fff;
	background-color: #e85353;
	display: flex;
	position: relative;
	top: 0rpx;
	left: 0rpx;
	justify-content: center;
	.go-back {
		position: absolute;
		top: 0rpx;
		left: 20rpx;
		z-index: 99;
	}
}
.page-body {
	width: 100%;
	background-color: #f5f5f5;
	padding-top: 50rpx;
	.body{
		width: 94%;
		background-color: #fff;
		margin: 50rpx auto;
		margin-top: 0;
		padding: 0 10rpx;
		.submit {
			color: #fff;
			width: 30%;
			margin: 50rpx auto;
			background-color: #e85353;
		}
	}
}

</style>
