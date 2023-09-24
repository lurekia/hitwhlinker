<template>
	<view>
		<!-- 提示窗示例 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="详细内容" content="欢迎使用 uni-popup!" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
				dailogShow: {
					type: Boolean,
					required: true
				},
			},
			data() {
				return {};
			},
			methods: {
			},
			watch: {
				'dailogShow': {
					handler(newVal, oldVal) {
						// console.log(111)
						if (this.dailogShow == true) {
							this.$nextTick(() => {
								this.$refs.popup.open()
							})
						} else {
							this.$nextTick(() => {
								this.$refs.popup.close()
							})
						}
					},
					deep: true,
					immediate: true
				}
			},
		}
</script>

<style lang="scss">

</style>