<template>
	<view>
		<!-- 用户未登录时显示 -->
		<view class="noLogin" v-if="!isLogin">
			<view class="logo">
				<image src="/static/images/user-logo.png" mode=""></image>
			</view>
			<view class="des">
				<view>
					<text>新零售双线平台,</text>
				</view>
				<view>
					<text>强力打通线上线下,更快,更省。</text>
				</view>
			</view>
			<view class="btn">
				<view class="login">
					<button @click="login()">登录</button>
				</view>
				<view class="register">
					<button @click="register()">注册</button>
				</view>
			</view>
		</view>
		<!-- 用户登录时显示 -->
		<view class="Login-box" v-else>
			<view class="user-logo">
				<view class="logo">
					<!-- <image :src="avatar" mode="" ></image> -->
						<image src="/static/images/user-default.jpeg" mode="" ></image>
					<text>{{user_name}}</text>
				</view>
			</view>
			<!-- 全部订单 -->
			<view class="order-box">
				<view class="order" @click="order('all')">
					<image src="/static/images/icon-00.png" mode="" style="height: 54rpx;"></image>
					<text>订单</text>
					<image src="/static/images/icon-right.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
				
				</view>
			</view>
			<view class="order-list">
				<view class="order-item" @click="order(1)">
					<view class="order-img">
						<image src="/static/images/icon-01.png" mode=""></image>
						<text class="order-icon">{{ordernum[0]}}</text>
					</view>
					<view class="order-text">
						<text>待付款</text>
					</view>
				</view>
				<view class="order-item" @click="order(2)">
					<view class="order-img">
						<image src="/static/images/icon-02.png" mode=""></image>
						<text class="order-icon">{{ordernum[1]}}</text>
					</view>
					<view class="order-text">
						<text>待发货</text>
					</view>
				</view>
				<view class="order-item" @click="order(4)">
					<view class="order-img">
						<image src="/static/images/icon-03.png" mode=""></image>
						<text class="order-icon">{{ordernum[2]}}</text>
					</view>
					<view class="order-text">
						<text>待评价</text>
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="user-info">
				<view class="order-box">
					<view class="order">
						<image src="/static/images/icon-04.png" mode="" ></image>
						<text>我的消息</text>
						<image src="/static/images/icon-right.png" mode=""style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
				<view class="order-box" @click="collect()">
					<view class="order">
						<image src="/static/images/icon-05.png" mode="" style="height: 48rpx;"></image>
						<text>我的收藏</text>
						<image src="/static/images/icon-right.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
				<view class="order-box" @click="address()">
					<view class="order">
						<image src="/static/images/icon-06.png" mode="" style="height: 59rpx;"></image>
						<text>我的地址</text>
						<view class="text" style="color: #B8B8B8;font-size: 30rpx;">{{area}}</view>
						<image src="/static/images/icon-right.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
				<view class="order-box" >
					<view class="order">
						<image src="/static/images/icon-07.png" mode="" style="height: 38rpx;"></image>
						<text>我的优惠</text>
						<view class="text" style="color: #B8B8B8;font-size: 30rpx;">微信支付</view>
						<image src="/static/images/icon-right.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
				<view class="order-box" @click="money">
					<view class="order">
						<image src="/static/images/icon-07.png" mode="" style="height: 38rpx;"></image>
						<text>我的钱包</text>
				<!-- 		<view class="text" style="color: #B8B8B8;font-size: 30rpx;">微信支付</view> -->
						<image src="/static/images/icon-right.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
				<view class="order-box" @click="bill">
					<view class="order">
						<image src="/static/images/icon-07.png" mode="" style="height: 38rpx;"></image>
						<text>我的账单</text>
				<!-- 		<view class="text" style="color: #B8B8B8;font-size: 30rpx;">微信支付</view> -->
						<image src="/static/images/icon-right.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
				<view class="line"></view>
				<view class="order-box">
					<view class="order">
						<image src="/static/images/icon-08.png" mode="" style="height: 38rpx;"></image>
						<text>门店扫码</text>
						<view class="text" style="color: #B8B8B8;font-size: 30rpx;">扫码提货</view>
						<image src="/static/images/icon-right.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { request } from '../request.js'
	export default {
		data() {
			return {
				baseURL:this.$api,
				isLogin:true,
				user_name:'未登陆',
				avatar:'/static/images/user-default.jpeg',
				ordernum:{
					0:0,
					1:0,
					2:0
				},
				area:'',
			};
		},
		onShow() {
			this.getLogin();
		},
	
		methods:{
			// 跳转到登录页
			login() {
				uni.navigateTo({
					url: '../components/login/login'
				})
			},
			// 跳转到注册页
			register() {
				uni.navigateTo({
					url:'../components/register/register'
				})
			},
			// 跳转到order我的订单页
			order(status) {
				uni.navigateTo({
					url: '/pages/components/order/order?status='+status
				})
			},
			// 跳转到收藏页
			collect() {
				uni.navigateTo({
					url: '/pages/components/collect/collect'
				})
			},
			// 跳到收货地址
			address() {
				uni.navigateTo({
					url:'/pages/components/address/address'
				})
			},
			// 跳转到充值页面
			money() {
				uni.navigateTo({
					url: '/pages/components/money/money'
				})
			},
			getLogin() {
				let that = this;
				request({
						url:"index.php?s=/wap/member/checkLogin",
						method:"POST",
					}).then(res=>{
						if(res.data == '') {
							this.isLogin = true
							that.getUserInfo();
						}else{
							this.isLogin = false;
						}
					});
			},
			getUserInfo(){
				let that = this;
				request({
						url:"index.php?s=/wap/member/Api_member_index",
						method:"POST",
					}).then(function(res){
						that.user_name = res.data.user_name;
						that.avatar = that.baseURL + res.data.member_img;
						that.ordernum = {
							0:res.data.unpaidOrder,
							1:res.data.shipmentPendingOrder,
							2:res.data.goodsNotReceivedOrder,
						};
						let address = res.data.address;
						that.area = address.province + " " + address.city + " " + address.district;
					});
			},
			// 跳到我的订单
			bill() {
				uni.navigateTo({
					url:'/pages/components/bill/bill'
				})
			}
			
			
		},
		
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f4f4f4;
	}
	//  用户未登录时显示 
	.noLogin {
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
		.des {
			font-size: 33rpx;
			view {
				text-align: center;
				color: #C8C7CC;
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
					background: #F14B64;
					color: #fff;
				}
			}
		}
	}
	// 用户登录时显示
	.Login-box {
		box-sizing: border-box;
		.user-logo {
			box-sizing: border-box;
			height: 320rpx;
			background: #F8F8F8;
			text-align: center;
			padding-top: 12rpx;
			.logo {
				box-sizing: border-box;
				width: 150rpx;
				height: 150rpx;
				display: inline-block;
				image {
					border-radius: 50%;
					width: 100%;
					height: 100%;
				}
				text {
					font-size: 36rpx;
					color: #999;
				}
			}
		}
		.order-box {
			box-sizing: border-box;
			border-bottom: 1px solid #E7E7E7;
			line-height: 90rpx;
			padding: 0 30rpx;
			background: #fff;
			.order {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				image:nth-child(1) {
					width: 50rpx;
					height: 50rpx;
				}
				text {
					flex: 1;
					box-sizing: border-box;
					padding-left: 12rpx;
					font-size: 30rpx;
				}
				image:nth-child(3) {
					width: 40rpx;
					height: 40rpx;
				}
			}
			
		}
		.order-list {
			box-sizing: border-box;
			// line-height: 150rpx;
			background: #fff;
			height: 150rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.order-item {
				box-sizing: border-box;
				flex: 1;
				text-align: center;
				.order-img {
					box-sizing: border-box;
					position: relative;
					image {
						width: 50rpx;
						height: 50rpx;
					}
					.order-icon {
						position: absolute;
						left: 52%;
						top: -4rpx;
						line-height: 16rpx;
						width: 32rpx;
						height: 32rpx;
						line-height: 32rpx;
						background: #f00;
						color: #fff;
						font-size: 20rpx;
						border-radius: 50%;
					}
				}
				.order-text {
					font-size: 26rpx;
				}
			}
		}
		.line {
			box-sizing: border-box;
			height: 18rpx;
			background: #EFEFF4;
		}
	}
	
</style>
