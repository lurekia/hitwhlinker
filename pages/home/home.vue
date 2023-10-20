<template>
	<view class="status">
	</view>
	<view class="page">
		<view class="homeHeader">
			<image src="../../static/images/homeheader.png" style="width: 100%;margin-top: -20px;" mode="aspectFit">
			</image>
		</view>
		<view class="homeBody">
			<view class="today">
				<text class="today-text">TODAY</text>
				<view class="custom-sentence">
					{{city}}{{weather_info}}
				</view>
			</view>
			<view class="part-in">
				<view class="part-in-text">
					活动探针
				</view>
				<turns :data="data" @achieve="achieve"></turns>
			</view>
			<view >
				<view class="part-in-text">
					校园脉动感知
				</view>
				<view class="campus-recommend">
						<view v-for="(item,index) in recommend_data" :key="index" class="content-item" @click="toNPC(index,item)">
							<view class="flex-content">
								<uni-icons type="notification-filled" size="30" color="#306af1" class="star-num" ></uni-icons>
								<view class="recommend-content">
									{{item}}
								</view>
							</view>
							<uni-icons type="forward" size="20" color="#306af1" class="star-num" ></uni-icons>
							
						</view>
					
				</view>
			</view>
			<view class="may-want">
				<view class="part-in-text">
					发掘市集
				</view>
				<view class="product-list">
					<product-item v-for="item in products_data" class="product-item" :key="item.id" :data="item"
						:isMine="false">
					</product-item>
				</view>
			</view>
		</view>
		<dragball :x='100' :y='50' image='http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg'></dragball>
	</view>
	
</template>

<script setup>
	import turns from '../../components/pc-turns/pc-turns.vue'
	import dragball from '@/components/drag-ball/drag-ball.vue'
	import {
		ref,
		reactive,
		onMounted,
		computed,
		watch,
		// getCurrentInstance
	} from 'vue'
	import {
		onLoad,
		onInit,
		onShow
	} from '@dcloudio/uni-app'
	
	// const {proxy} = getCurrentInstance()
	// const handleMoveBall = (wz) => {
	// 	proxy.inx = wz.x;
	// 	proxy.iny = wz.y;
	// }
	import productItem from '@/components/post/productItem.vue'
	const data = [
			{
			src: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png', //活动的图片
			date: '2023-10-21',
			time: '9:00',
			title: '谭忆秋校长谈“当你与哈工大有了交集”',
			position: 'G101',
			tag: '学术讲座', //活动所属分类
			id:30,
			detail: '<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>', //活动的详细信息
			status: 1, //活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum: 0, //活动的浏览量
		},{
			src: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png', //活动的图片
			date: '2023-10-21',
			time: '9:00',
			title: '宣讲会｜勤工助学管理中心',
			position: 'G101',
			tag: '学术讲座', //活动所属分类
			id: 29,
			detail: '<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>', //活动的详细信息
			status: 1, //活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum: 0, //活动的浏览量
		},{
			src: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png', //活动的图片
			date: '2023-10-20',
			time: '9:00',
			title: '学生国际交流协会',
			position: 'G101',
			tag: '学术讲座', //活动所属分类
			id: 28,
			detail: '<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>', //活动的详细信息
			status: 1, //活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum: 0, //活动的浏览量
		},{
			src: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png', //活动的图片
			date: '2023-10-19',
			time: '9:00',
			title: '吉协路演',
			position: 'G101',
			tag: '学术讲座', //活动所属分类
			id: 27,
			detail: '<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>', //活动的详细信息
			status: 1, //活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum: 0, //活动的浏览量
		},{
			src: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png', //活动的图片//活动的图片
			date: '2023-10-20',
			time: '9:00',
			title: '校舞蹈队×“社团巡礼”',
			position: 'G101',
			tag: '学术讲座', //活动所属分类
			id: 26,
			detail: '<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>', //活动的详细信息
			status: 1, //活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum: 0, //活动的浏览量
			
		}]
	const products_data = 
    [
        {
            "id": 58,
            "title": "收队友参加智能交互创新赛",
            "price": null,
            "content": "“中国高校计算机大赛”（China Collegiate Computing Contest，简称C4）由教育部高等学校计算机类专业教学指导委员会、教育部高等学校软件工程专业教学指导委员会、教育部高等学校大学计算机课程教学指导委员会、全国高等学校计算机教育研究会于2016年创办。大赛设立以来，始终坚持“服务教学、推动教改、促进融合、引领创新”的办赛理念，在高校群体产生了广泛而深远的影响，2020年起，大赛继续由全国高等学校计算机教育研究会主办。“中国高校计算机大赛-智能交互创新赛”为2022年新设立的竞赛模块，第二届（2023年）“中国高校计算机大赛-智能交互创新赛”（以下简称“竞赛”）由浙江大学和OPPO公司联合承办，小布助手提供赛事支持。\n\n竞赛面向全球高校在校学生，鼓励跨校组队合作，学生可以以个人或团队形式参赛。参赛作品须围绕智能交互创新技术，进行关键算法的突破和应用场景的创新。竞赛报名及初赛作品提交截止时间：2023年5月31日。\n\n竞赛相关要求及流程等细节参见“竞赛规程”（附件1）。请各高校积极组织学生参赛，并在指导教师工作量认可及参赛队伍经费等相关方面给予大力支持！\n",
            "count": 1,
            "picture": "https://hitwhlinkeross.oss-cn-hangzhou.aliyuncs.com/8ebdc7ee-20b6-4386-9f06-1b25478a1e3c.png,https://hitwhlinkeross.oss-cn-hangzhou.aliyuncs.com/308a4072-eccb-4be6-a1ec-79ffdcf5fcfb.png,https://hitwhlinkeross.oss-cn-hangzhou.aliyuncs.com/65e3a9b8-8bf4-4510-9ea6-5c309c3fdfd0.png",
            "userId": 1,
            "nickName": "哈小助",
            "avatar": "/profile/avatar/2023/10/19/蜀绣img1_20231019195837A045.jpg",
            "contactInfo": "1722046599",
            "commentCount": 0,
            "goodsTypeId": "5",
            "stateFlg": 0,
            "getMethod": -1,
            "starCounts": 1,
            "isStar": 1,
            "createTime": "2023-10-20 02:39:01"
        },
        {
            "id": 54,
            "title": "出二十七寸显示器",
            "price": 500,
            "content": "出显示器，27寸，高清画质，方便安装",
            "count": 1,
            "picture": "https://hitwhlinkeross.oss-cn-hangzhou.aliyuncs.com/8203d77d-2387-451b-aa3b-c934045a318d.jpg",
            "userId": 1,
            "nickName": "哈小助",
            "avatar": "/profile/avatar/2023/10/19/蜀绣img1_20231019195837A045.jpg",
            "contactInfo": "1722046599",
            "commentCount": 0,
            "goodsTypeId": "2",
            "stateFlg": 0,
            "getMethod": 0,
            "starCounts": 0,
            "isStar": 0,
            "createTime": "2023-10-20 01:59:54"
        },
        {
            "id": 52,
            "title": "收前端大佬问点问题",
            "price": null,
            "content": "如何让接口拿到数据以后再展示悬浮框",
            "count": 1,
            "picture": "https://hitwhlinkeross.oss-cn-hangzhou.aliyuncs.com/2186d339-23e0-40df-8207-52ebf7c09370.png",
            "userId": 1,
            "nickName": "哈小助",
            "avatar": "/profile/avatar/2023/10/19/蜀绣img1_20231019195837A045.jpg",
            "contactInfo": "1366867671",
            "commentCount": 0,
            "goodsTypeId": "5",
            "stateFlg": 0,
            "getMethod": -1,
            "starCounts": 0,
            "isStar": 0,
            "createTime": "2023-10-20 01:53:38"
        }
]
	const loadActData = () => {
		uni.request({
			url: "http://94.74.87.251:8080/school/activity/list?pageNum=1&pageSize=100",
			method: "GET",
			header: {
				"Authorization": token
			},
			success: (res) => {
			},
			fail: (err) => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			}
		})
	}
	let weather_info = ref("");
	let city = ref("");
	let token = null;
	const achieve = (open) => {
		console.log(open);
		console.log('666');
	}
	var currentDate = ref('')
	const getCurrentDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		currentDate.value = `${year}.${month}.${day}`;
	}
	function toNPC(index, reaction) {
		if(index === "CanteenNpc")
		{
			uni.navigateTo({
				url:'/pages/chat/chat?server_name=餐厅探店侠&server_type=Canteen&server_avatar=http://94.74.87.251:8080/profile/avatar/2023/10/17/img3_20231017141058A003.jpg&reaction='+ reaction,
			})
		}
		if(index === "ReservationNpc" ){
			uni.navigateTo({
				url:'/pages/chat/chat?server_name=预约助手&server_type=reservation&server_avatar=http://94.74.87.251:8080/profile/avatar/2023/10/17/img4_20231017141118A004.jpg&reaction='+ reaction,
			})
		}
		if(index==="StudyNpc")
		{
			uni.navigateTo({
				url:'/pages/chat/chat?server_name=学习助手&server_type=Study&server_avatar=http://94.74.87.251:8080/profile/avatar/2023/10/17/img5_20231017141139A005.jpg&reaction='+ reaction,
			})
		}
	}
	const recommend_data = ref()
	// const act_data = ref()
	function loadRecommendData(){
		uni.request({
			url:'http://119.8.190.49:5000/recommendation',
			method: "GET",
			success: (res) => {
				console.log(res);
				if (res.statusCode == 200) {
					console.log('loadRecommendData',res.data);
					recommend_data.value = res.data
					console.log(recommend_data.value);
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
	onLoad(() => {
		getCurrentDate();
		loadRecommendData();
		uni.getStorage({
			key: 'token',
			success: (res) => {
				// console.log(res.data);
				token = res.data;
				loadActData();
			
			},
			fail: (err) => {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 300
				})
			}
		});
	})
	onShow(() => {
		
	})
	onMounted(()=>{
		
		// 查询天气
		uni.getLocation({
			type: 'wgs84',
			// geocode:true,
			success: function (res) {
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				const location = res.longitude + ',' + res.latitude;
				console.log(location);
				uni.request({
					url:"https://devapi.qweather.com/v7/weather/3d",
					method:"GET",
					data:{
						key:"10bb4b9742324acb910eadb1d9f8d6ae",
						location:location
					},
					success:(res)=>{
						// console.log(res);
						const data = res.data.daily[0]
						// weather_info.value = "今日威海白天"+data.textDay+"，夜晚"+data.textNight+",温度"+data.tempMin+"-"+data.tempMax+"℃"+"，祝您心情愉悦";
						weather_info.value = "今天"+data.textDay+"，祝您心情愉悦！";
					},
					fail:(err)=> {
						console.log(err);
					}
					
				});
				uni.request({
					url:"https://geoapi.qweather.com/v2/city/lookup",
					method:"GET",
					data:{
						key:"10bb4b9742324acb910eadb1d9f8d6ae",
						location:location
					},
					success:(res)=>{
						// console.log("城市",res);
						city.value = res.data.location[0].adm2;
						// console.log(res);
						// const data = res.data.daily[0]
						// weather_info.value = "今日威海白天"+data.textDay+"，夜晚"+data.textNight+",温度"+data.tempMin+"-"+data.tempMax+"℃"+"，祝您心情愉悦";
						// weather_info.value = "今天威海"+data.textDay+"，祝您心情愉悦！";
					},
					fail:(err)=> {
						console.log(err);
					}
					
				});
			}
		});
		
	})
</script>

<style lang="scss" scoped>
	.product-list {
		// height: 60vh;
		// flex-grow: 1;
		flex-direction: column;
		background-color: transparent;
	
		// margin: 0 10px;
		// margin-bottom: 100px;
		.product-item {
			width: 100%;
			// height: 340px;
			margin-top: 10px;
			background-color: #fff;
		}
	}
	.homeBody {
		padding: 10rpx 40rpx 0 40rpx;

		.today {
			width: 100%;
			height: 200rpx;
			margin: 0 auto;
			margin-bottom: 20rpx;

			.today-text {
				display: flex;
				justify-content: center;
				padding-top: 20rpx;
				float: left;
				color: #fc9696;
				font-weight: 700;
				writing-mode: vertical-lr;
				text-orientation: upright;
			}

			.custom-sentence {
				// display: inline-block;
				margin-left: 50rpx;
				width: 85%;
				height: 200rpx;
				color: #fff;
				line-height: 200rpx;
				padding-left: 30rpx;
				background: url(../../static/images/customSentence.jpg) no-repeat;
				background-size: 100% 100%;
				box-shadow: 2rpx 6rpx 8rpx 4rpx rgba(0, 0, 0, 0.2), 3rpx 8rpx 15rpx 2rpx rgba(0, 0, 0, 0.19);
				border-radius: 20rpx;
			}
		}

		.part-in-text {
			font-weight: 600;
			font-size: 50rpx;
			margin-bottom: 40rpx;
			margin-top: 40rpx;
		}

		.campus-recommend {
			width: 95%;
			margin: 30rpx auto;
			background-color: #f7f9fd;
			border: 1rpx solid #f7f9fd;
			box-shadow: 2rpx 6rpx 8rpx 4rpx rgba(0, 0, 0, 0.2), 3rpx 8rpx 15rpx 2rpx rgba(0, 0, 0, 0.19);
			border-radius: 30rpx;
			height: 300rpx;
			display: flex;
			flex-direction: column;
			padding: 15rpx 20rpx;
			.content-item {
				width: 100%;
				height: 33%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: #e9ebec solid 1px;
				.flex-content {
					width: 90%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.recommend-content {
						width: 100%;
						padding-left: 20rpx;
						font-size: 35rpx;
						overflow: hidden;
					  white-space: nowrap;
					  text-overflow: ellipsis;
					}
				}
			}
		}
	}
</style>