<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.status {
		height: var(--status-bar-height);
		width: 100%;
		background-color: rgb(213,79,79);
	}
	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
	  font-family: 'iconfont';  /* Project id 4171624 */
	  src: url('https://at.alicdn.com/t/c/font_4171624_52r1c5qq0of.woff2?t=1696730176139') format('woff2'),
	       url('https://at.alicdn.com/t/c/font_4171624_52r1c5qq0of.woff?t=1696730176139') format('woff'),
	       url('https://at.alicdn.com/t/c/font_4171624_52r1c5qq0of.ttf?t=1696730176139') format('truetype');
	}
	.iconfont {
		font-family: iconfont;
	}
	
</style>
