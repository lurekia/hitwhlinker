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
	}
	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
	  font-family: 'iconfont';  /* Project id 4171624 */
	  src: url('https://at.alicdn.com/t/c/font_4171624_5f91t8g1imo.woff2?t=1690179389394') format('woff2'),
	       url('https://at.alicdn.com/t/c/font_4171624_5f91t8g1imo.woff?t=1690179389394') format('woff'),
	       url('https://at.alicdn.com/t/c/font_4171624_5f91t8g1imo.ttf?t=1690179389394') format('truetype');
	}
	.iconfont {
		font-family: iconfont;
	}
	
</style>
