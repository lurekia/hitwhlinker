<template>
	<view class="status">
	</view>
	<view class="page">
		<view class="page-header">
			<view class="calendar-header"  >
				校园日历
			</view>
			<!-- <view class="list-icon" @click="goToList()">
				<uni-icons type="list" size="20" color="#fff" ></uni-icons>
			</view> -->
			<view class="calendar-wrapper">
				<uni-calendar
				class="uni-calendar--hook" 
				:selected="selected"
				@change="changeDate" 
				 @monthSwitch="monthSwitch"	
				/>
			</view>
		</view>
		
		<scroll-view style="height:35vh;padding: 10px;margin-bottom: 100rpx;" scroll-y="true">
			<view >
				<uni-list class="my-list">
					<uni-list-item  direction="column" v-for="item in selected" :key="item.index" 
					 thumb-size="lg"  clickable @click="showDetail(item)"   @longpress="showFloatWindow(item)" @touchend="hideFloatWindow">
					<!-- 通过header插槽定义列表的标题 -->
						<template v-slot:header>
							<view class="uni-header">
								<view class="uni-title">{{item.title}}</view>
								<text class="uni-footer-position">{{item.position}}</text>
							</view>
						</template>
							<!-- 同步footer插槽定义列表底部的显示效果 -->
						<template v-slot:footer>
							<view class="uni-footer">
								<text class="uni-footer-time">{{item.startTime.substring(0, 5)}}</text>
								<view class="act-tag">
									<view class="tag-view" v-if="(item.tag==='讲座')||(item.tag==='讲座报告')">
										<uni-tag text="讲座" type="primary" size="small" />
									</view>
									<view class="tag-view" v-if="item.tag==='竞赛'">
										<uni-tag text="竞赛" size="small" />
									</view>
									<view class="tag-view" v-if="item.tag==='演出'">
										<uni-tag text="演出" type="warning" size="small"/>
									</view>
									<view class="tag-view" v-if="item.tag==='电影'">
										<uni-tag text="电影" type="error" size="small"/>
									</view>
									<view class="tag-view" v-if="item.tag==='主题活动'">
										<uni-tag text="活动" type="success" size="small"/>
									</view>
								</view>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</scroll-view>
	</view>
	
	<dragball :x='100' :y='50' image='http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg'></dragball>
</template>

<script setup>
	import { ref, nextTick,reactive,onMounted } from 'vue'
	import dragball from '@/components/drag-ball/drag-ball.vue'
	import {
		onLoad,
		onInit,
		onShow
	} from '@dcloudio/uni-app'
	const activities = ref([])
	const selected = ref([])
	const showToastText = ref('')
	const showCalendar = ref(false)
	nextTick(() => {
	  showCalendar.value = true
	})
	const floatWindowVisible = ref(false)
	const selectedItemID = ref(null)
	function showFloatWindow(item) {
	      floatWindowVisible.value = true;
		  selectedItemID.value = item.id;
		  // 显示加载提示
		    uni.showLoading({
		      title: 'Loading...',
		      mask: true
		    });
		  uni.request({
		  	url: "http://119.8.190.49:5000/act_summary",
		  	method: "POST",
			data:{
				id:item.id,
				detail:item.detail
			},
		  	success: (res) => {
		  		console.log('res',res.data.summary);
				uni.hideToast();//隐藏加载
				 if (selectedItemID.value === item.id) {
				        showToastText.value = res.data.summary
				        uni.showToast({
				          title: showToastText.value,
				          icon: "none",
				          duration: 2000,
				        });
				      }
				
		  		showToastText.value = res.data.summary
				console.log('showToastText.value',showToastText.value);
		  	},
		  	fail: (err) => {
		  		uni.showToast({
		  			title: err,
		  			icon: 'none'
		  		})
		  	}
		  })
		
		  // showToastText.value = ''
	     
	    }
	function   hideFloatWindow() {
	      floatWindowVisible.value = false;
	      // 使用 uni.hideToast() 或 uni.hideModal() 等 API 关闭悬浮窗
	      uni.hideToast();
	    }
	const loadData = () => {
		uni.request({
			url: "http://94.74.87.251:8080/school/activity/list?pageNum=1&pageSize=100",
			method: "GET",
			header: {
				"Authorization": token
			},
			success: (res) => {
				// console.log(res);
				if (res.data.code == 200) {
					activities.value = [...activities.value, ...res.data.rows];
					console.log('activities.value',activities.value);
					activities.value.forEach(obj => {
					  // 处理 detail 属性
					  if (obj.detail) {
						  const regex = /<img[^>]+src="([^">]+)"/g;
						  obj.detail = obj.detail.replace(regex, '<img src="http://94.74.87.251:8080$1"');
					  }
					
					  // 处理 avatar 属性
					  if (obj.avatar) {
					    obj.avatar = 'http://94.74.87.251:8080' + obj.avatar;
					  }
					  if(obj.cover){
						  obj.cover = 'http://94.74.87.251:8080' + obj.cover;
					  }
					  console.log('修改后的值',activities.value);
					});
					
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
	let token = null;
	onShow(() => {
		uni.getStorage({
			key: 'token',
			success: (res) => {
				token = res.data;
				loadData();
	
			},
			fail: (err) => {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
			}
		});
	})
	const showDetail = (item) => {
		console.log('555');
		uni.navigateTo({
			url: '/pages/activityDetail/activityDetail?id=' + item.id // 通过查询参数传递项目ID
		})
	}
	function changeDate(e) {
		// 清空数组
	  selected.value.splice(0);
	  console.log('change 返回:', e)
	  activities.value.forEach(activity => {
	     if (activity.startDate === e.fulldate) {
			 console.log(activity.title);
	       selected.value.push(activity)
		   console.log('selected.value',selected.value);
	     }
	   })
	   selected.value.sort((a, b) => {
	     // 将日期和时间字符串拼接为完整的日期时间格式
	     const dateTimeA = `${a.startDate}T${a.startTime}`;
	     const dateTimeB = `${b.startDate}T${b.startTime}`;
	     
	     // 将日期时间字符串转换为时间数值进行比较
	     const timeA = Date.parse(dateTimeA);
	     const timeB = Date.parse(dateTimeB);
	     
	     // 按时间的升序排序
	     return timeA - timeB;
	   });
	  // console.log(selected);
	}
	function monthSwitch() {
		selected.value.splice(0);
	}
	// 跳转到列表
	const goToList = () => {		
		uni.navigateTo({
			url:'/pages/activityList/activityList',
		})
	}
	onMounted(() => {
		uni.getStorage({
			key: 'token',
			success: (res) => {
				// console.log(res.data);
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
	.list-icon {
		z-index: 10000;
		position: fixed;
		top: calc(30rpx + var(--status-bar-height));
		right: 120rpx;
		// 奇怪  莫名其妙要加一个z-index  否则就会被覆盖
		z-index: 99 ;
	}
	.uni-title {
		font-weight: 550;
		width: 80%;
	}
	.uni-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.act-tag {
		margin-left: 20rpx;
	}
	.uni-footer {
		display: flex;
	}
	.uni-footer-time {
		color: #333;
		font-size: 30rpx;
	}
	.uni-footer-position {
		color: #d65858;
		font-weight: 550;
		width:40%;
		font-size: 35rpx;
	}
	.page {
	  position: relative;
	  display: flex;
	  flex-direction: column;
	  height: 92vh;
	}
	.calendar-wrapper {
	  flex-shrink: 0;
	}
	.my-list-wrapper {
	  height: 50vh;
	  overflow-y: scroll; /* 内容超出自动滚动 */
	  border-top-left-radius: 20rpx;
	  border-top-right-radius: 20rpx;
	  
	}
		
	.zhuti ::v-deep .uni-tag{
		background-color: #ae81bd;
	}
	.my-list ::v-deep .uni-list {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}
    .uni-calendar--hook ::v-deep .uni-calendar__content  {
		
		background-color: #e85353;
		color: #fff;
	}
	.uni-calendar--hook ::v-deep .uni-calendar__box-bg-text {
		color: #fff;
	}
	.uni-calendar--hook ::v-deep .uni-calendar-item--disable {
		background-color: #e85353;;
	}
		
	.uni-calendar--hook ::v-deep .uni-calendar-item__weeks-box-text {
		color: #fff;
	}
	.uni-calendar--hook ::v-deep .uni-calendar-item--isDay {
		background-color: #fff;
		color: #e85353;
	}
	.uni-calendar--hook ::v-deep .uni-calendar-item--checked {
		background-color: #fff;
		color: #e85353;
	}
	// .uni-calendar--hook ::v-deep .uni-calendar-item--isDay-text {
	// 	color: #e85353;
	// }
	.uni-calendar--hook ::v-deep .uni-calendar-item--hook {
		border-radius: 50%;
	}
	.uni-calendar--hook ::v-deep .uni-calendar__header-text {
		color: #fff;
	}
		
	.calendar-header {
		position: fixed;
		top: calc(25rpx + var(--status-bar-height))  ;
		left: 20rpx;
		color: #fff;
		font-size: 40rpx;
	}
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}
</style>
