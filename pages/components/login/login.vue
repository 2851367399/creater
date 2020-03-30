<template>
	<view>
		<view class="register">
			<view class="logo">
				<image src="/static/images/user-logo.png" mode=""></image>
			</view>
			<view class="choose">
				<view></view>
				<view>登录</view>
				<view @click="register()">注册</view>
			</view>
			<view class="form-list">
				<view class="form-item">
					<image src="/static/images/arrow-user.png" mode=""></image>
					<input type="text" value="" placeholder="请输入用户名" placeholder-class="placeholder" v-model="username"/>
				</view>
				<view class="form-item">
					<image src="/static/images/arrow-password.png" mode=""></image>
					<input type="text" value="" placeholder="请输入密码" placeholder-class="placeholder" v-model="password"/>
				</view>
			</view>
			<!-- <view>
				{{username}} {{password}}
			</view> -->
			<view class="btn">
				<view class="login">
					<button @click="login()">马上登录</button>
				</view>
				<view class="register">
					<button @click="wechatLogin()">微信登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				username: '',
				password: ''
			};
		},
		created() {
			// getToken()
		},
		methods: {
			// 跳转到注册页
			register() {
				uni.redirectTo({
					url: '../register/register'
				})
			},
			wechatLogin(){
				uni.getStorage({
					key: 'token',
					fail: res => {
						
					},
					success:res =>{
						let token = res.data[0];
						let redirectUrl = encodeURIComponent("http://sh.086soft.cn/index.php?s=/wap/login/wchatLogin&token="+token);
						let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri='+redirectUrl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
						window.location.href = url;
					}
				});
				
			},
			// 立即登录
			login() {
				var username = this.username;
				var password = this.password;
				//验证字符串
				request({
					url: "index.php?s=/wap/login/index",
					method: "POST",
					data: {
						username: username,
						password: password
					}
				}).then(res => {
					console.log(res);
					if(res.data.retval.code > 0){
						if(res.data.token != null) {
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							});
							let expireDate = new Date().getTime() + 86400000;
							let data =Array(res.data.token,expireDate);
							uni.setStorage({
								key:"token",
								data:data,
							});
							if(getCurrentPages().length == 1) {
								uni.reLaunch({
									url: '/pages/mine/mine'
								})
									
								
							}
							else {
								// 返回上一页
								uni.navigateBack({
									delta:1
								});
							}
							
						}
					}
					else {
						uni.showToast({
							title: '用户名与密码不匹配',
							icon: 'none'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f4f4f4;
	}
	.register {
		box-sizing: border-box;
		.logo {
			// box-sizing: border-box;
			width: 220rpx;
			height: 170rpx;
			margin: 0 auto;
			padding-top: 80rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.choose {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			view {
				box-sizing: border-box;
				flex: 1;
				text-align: center;
			}
			view:nth-child(3) {
				color: #5E5A5A;
				font-size: 40rpx;
			}
			view:nth-child(2) {
				font-size: 50rpx;
				color: #C8C7CC;
			}
		}
		.form-list {
			box-sizing: border-box;
			margin-top: 80rpx;
			.form-item {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				padding: 0 10%;
				height: 100rpx;
				line-height: 100rpx; 
				image {
					width: 50rpx;
					height: 50rpx;
					margin-right: 24rpx;
				}
				input {
					flex: 1;
					box-sizing: border-box;
					border-bottom: 1px solid #C8C7CC;
				}
			}
		}
		.btn {
			position: absolute;
			bottom: 110rpx;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			.login,.register {
				box-sizing: border-box;
				height: 90rpx;
				button {
					width: 60%;
					height: 100%;
					text-align: center;
					font-size: 32rpx;
					color: #C8C7CC;
					border-radius: 60rpx;
				}
			}
			.login {
				margin-bottom: 24rpx;
				button {
					box-sizing: border-box;
					border: 1px solid #fff;
			
				}
				button:after {
					border: none;
				}
				
			}
			.register {
				button {
					background: #25B340;
					color: #fff;
				}
			}
		}
	}
	.placeholder {
		font-size: 24rpx;
		color: #C8C7CC
	}
</style>
