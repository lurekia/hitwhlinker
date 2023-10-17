<template>
	<view class="login-content">
		<view class="login-title">
			登录
		</view>
		<view class="iphone">
			<input type="text" placeholder="输入用户名" v-model="username" @input="clearInput" />
			<uni-icons type="closeempty" color="#808080" size="25" v-if="showClearIcon" @click="clearIcon"></uni-icons>
		</view>

		<view class="password" v-if="type==2">
			<!-- <input type="password" placeholder="输入密码" /> 要显示密码就不要设置type="password"-->
			<input placeholder="请输入密码" v-model="passwordValue" :password="showPassword" />
			<uni-icons type="eye-filled" color="#808080" size="25" @click="changePassword"></uni-icons>
		</view>
		<view class="login-btn" @click="Login()">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iphoneValue: '', //手机号码
				username:"", // 用户名
				passwordValue: '', //密码
				testValue: '', //验证码
				showPassword: true, //是否显示密码
				showClearIcon: false, //是否显示清除按钮
				type: 2, //登录的状态 - - - 1是验证码登录、2是密码登录
				token: '',
				timer: 0, //验证码时间
				showTimer: true, //是否显示验证码时间
			}
		},

		methods: {
			// 显示隐藏密码
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			saveData(token) {
				uni.setStorageSync('token', token); // 将登录信息以token的方式存在硬盘中
				// console.log("token值是：",token);
				uni.request({
					url: 'http://94.74.87.251:8080/getInfo', // 路径
					method: 'GET', // 请求方法
					header: {
						"Authorization": token
					}, 
					success: (res) => {
						console.log(res);
						const user = res.data.user
						const user_info = {
							id: user.userId,
							name: user.nickName,
							avatar: "http://94.74.87.251:8080" + user.avatar,
						}
						uni.setStorageSync('user_info',JSON.stringify(user_info))
					}
				})
			},
			// 判断是否显示清除按钮
			clearInput: function(event) {
				this.iphoneValue = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			// 清除内容/隐藏按钮
			clearIcon: function() {
				this.username = '';
				this.showClearIcon = false;
			},
			// 密码登录
			Login() {
				let that = this
				if (!that.passwordValue) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}

				uni.request({
					url: 'http://94.74.87.251:8080/login', // 路径
					method: 'POST', // 请求方法
					data: {
						username:that.username,
						password:that.passwordValue
					}, //发送的数据
					success: (res) => {
						if (res.data.code === 200) {
							//存储token
							that.token = res.data.token;
							
							that.saveData(res.data.token);
							
							uni.reLaunch({ // 跳转到新闻页面
								url: "/pages/home/home",
							})
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							})
							
						} else {
							uni.showToast({
								title: '登录失败',
								icon: 'none'
							})
						}
					}
				})
				// const token = "sdawdwfafsfawfa";
				// const data = {
				// 	username: "姜饼麻子",
				// 	password:"10086"
				// }
				// uni.setStorageSync('token', token);
				// uni.setStorageSync('userInfo', JSON.stringify(data));
				// uni.navigateBack({
				// 	// url: '/pages/home/home',
				// 	animationDuration: 300
				// })
			}
		}
	}
</script>

<style scoped>
	.login-content {
		padding: 70px 10px 35px;
		text-align: center;
		color: #333333;
	}

	.login-title {
		font-size: 26px;
		font-weight: bold;
		margin-bottom: 31px;
	}

	.login-content input {
		height: 50px;
		background: #F8F8F8;
		border-radius: 25px;
		text-align: left;
		padding: 15px;
		box-sizing: border-box;
		font-size: 15px;
	}

	.iphone,
	.password,
	.test {
		position: relative;
		margin-bottom: 30px;
	}

	.iphone .uni-icons,
	.password .uni-icons {
		position: absolute;
		top: 14px;
		right: 30px;
	}

	.test-btn,
	.password-btn {
		color: #ff8b33;
		font-size: 15px;
		text-align: right;
	}

	.get-test {
		color: #ff8b33;
		font-size: 15px;
		width: 122px;
		height: 50px;
		border: 1px solid #FF8B33;
		border-radius: 25px;
		line-height: 50px;
	}

	.test {
		display: flex;
		justify-content: space-between;
	}

	.login-btn {
		width: 80vw;
		height: 45px;
		background: #FF8B33;
		border-radius: 36px;
		color: #fff;
		font-size: 20px;
		text-align: center;
		line-height: 45px;
		position: fixed;
		bottom: 60px;
		left: 50%;
		margin-left: -40vw;
	}
</style>