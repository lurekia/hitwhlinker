<template>
	<view class="status">
	</view>
	<view class="page">
		<view class="homeHeader">
			<image src="../../static/images/homeheader.png" style="width: 100%;margin-top: -20px;" mode="aspectFit"></image> 
		</view>
		<view class="homeBody">
			<view class="today">
				<text class="today-text">TODAY</text>
				<view class="custom-sentence">
					今日威海下雨，记得带伞哦~
				</view>
			</view>
			<view class="part-in">
				<view class="part-in-text">
					猜你想参加
				</view>
				<turns :data="data" @achieve="achieve"></turns>
			</view>
			<view class="campus-recommend">
				<view class="today-date">
					<view class="date-day">
						{{currentDate.slice(-2)}}
					</view>
					<view class="date-month">{{currentDate.slice(0,7)}}</view>
				</view>
				<view class="recommend-part">
					<view v-for="(item,index) in todayData" :key="index" class="recommend-li">
						<view class="content-wrapper">
						      <uni-icons type="sound" size="15" color="#e6db74" class="view-num"></uni-icons>
						      <text class="item-text">{{ item }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import turns from '../../components/pc-turns/pc-turns.vue'
	import {
		ref,
		reactive,
		onMounted,
		computed,
		watch
	} from 'vue'
	import {
		onLoad,onInit
	} from '@dcloudio/uni-app'
	const data = reactive([
		{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'1',
			detail:'<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'2',
			detail:'<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'3',
			detail:'<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'4',
			detail:'<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'5',
			detail:'<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'6',
			detail:'<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'7',
			detail:'<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},{
			src:'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',//活动的图片
			date:'2023-08-20',
			time:'9:00',
			title:'发布会',
			position:'G101',
			tag:'学术讲座',//活动所属分类
			id:'8',
			detail:'<h1>这是一个公众号推文的标题</h1><p>这是第一段落的内容。</p><h2>这是一个副标题</h2><p>这是第二段落的内容。</p><p>这是带有<strong>加粗</strong>和<em>斜体</em>的文本。</p><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png" alt="图片描述"><p>这是一张图片的描述。</p><blockquote><p>这是一个引用块。</p></blockquote><p>这是最后一段的内容。</p><p>更多信息，请访问<a href="https://baidu.com">https://example.com</a></p><p><strong>潇洒的哈市</strong></p><ul><li><strong style="color: rgb(230, 0, 0);"><em>大撒大撒</em></strong></li></ul><blockquote>撒旦hi</blockquote><blockquote><img src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"></blockquote>',//活动的详细信息
			status:1,//活动的喜欢or不喜欢  默认为喜欢 1   不喜欢为0
			viewNum:0,//活动的浏览量
			authorSrc:'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',//发布组织头像
			authorName:'HITwhLinker',//发布者名称
			like: false, // 默认没点赞
			likeCount: 26, // 点赞数量
		},
	])
	const achieve = (open) => {
		console.log(open);
		console.log('666');
	}
	var currentDate = ref('')
	const todayData = ref(['现在图书馆有空余的靠窗座位啦！','你有新出的成绩，请查收','今日食堂有新出的菜品，要不要去看看？'])
	const getCurrentDate = ()=>{
		 const date = new Date();
		  const year = date.getFullYear();
		  const month = String(date.getMonth() + 1).padStart(2, '0');
		  const day = String(date.getDate()).padStart(2, '0');
		  currentDate.value = `${year}.${month}.${day}`;
	}
	onLoad(() => {
		getCurrentDate();
	})
</script>

<style lang="scss" scoped>
		
	.homeBody {
		padding: 10rpx  40rpx  0 40rpx;
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
				color:#fff;
				line-height: 200rpx;
				padding-left: 30rpx;
				background: url(../../static/images/customSentence.jpg) no-repeat  ;
				background-size: 100% 100%;
				box-shadow: 2rpx 6rpx 8rpx 4rpx rgba(0, 0, 0, 0.2), 3rpx 8rpx 15rpx 2rpx rgba(0, 0, 0, 0.19);
				border-radius: 20rpx;
			}
		}
		.part-in-text {
			font-weight: 600;
			font-size: 50rpx;
			margin-bottom: 40rpx;
		}
		.campus-recommend {
			width: 95%;
			margin: 30rpx auto;
			background-color: #ebfdff;
			border: 1rpx solid #ebfdff;
			border-radius: 30rpx;
			height:300rpx;
			display: flex;
			align-items: center;
			.today-date {
				width: 160rpx;
				height:160rpx;
				margin:40rpx 0rpx;
				background: url('../../static/images/todayTimeBGI.jpg') no-repeat;
				background-size: contain;
				color: #fff;
				padding: 20rpx 0rpx 20rpx 0rpx;
				.date-day {
					font-size: 50rpx;
					padding: 0rpx 50rpx 0rpx 50rpx;
				}
				.date-month {
					font-size: 20rpx;
					padding: 0rpx 30rpx 0rpx 40rpx;
				}
			}
			.recommend-part {
				flex: 1;
				height: 90%;
				margin: auto 20rpx;
				border: 5rpx solid #cfe8fc;
				border-radius: 3rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				// white-space: nowrap; /* 禁止文字换行 */
				// overflow: hidden; /* 隐藏溢出部分的文字 */
			 //    text-overflow: ellipsis; /* 显示省略号 */
				.recommend-li {
					
					border-bottom: 1rpx solid #cfe8fc;
					padding-right: 10rpx;
					color: #999;
					margin-bottom: 20rpx;
					.content-wrapper {
					  display: flex;
					  align-items: center;
					  overflow: hidden;
					  text-overflow: ellipsis;
					  white-space: nowrap;
					}
				}
			}
		}
		
		
	}
	

</style>
