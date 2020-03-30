<template>
	<view>
		<view class="nav-box">
			<view class="location">
				<text>佛山</text>
			</view>
			<!-- 点击跳转到search-page搜索页面 -->
			<view class="search" @click="handleClick">
				<image src="/static/images/search.png"></image>
				<input disabled placeholder="输入您要搜索的宝贝..." placeholder-class="placeholder"/>
			</view>
			<view class="message">
				<image src="/static/images/cart-active.png" @click="goCart()"></image>
				<div class="line"></div>
				<image src="/static/images/message-active.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			handleClick() {
				uni.navigateTo({
					url:"/pages/components/search-page/search-page"
				})
			},
			goCart() {
				this.$emit("goCart")
			}
		},
		
	}
</script>

<style lang="scss">
	.nav-box {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		line-height: 60rpx;
		padding: 38rpx 30rpx 28rpx 30rpx;
		.location {
			font-size: 32rpx;
			color: #AAAAAA;
			margin-right: 42rpx;
		}
		.search {
			flex: 1;
			position: relative;
			height: 60rpx;
			box-sizing: border-box;
			input {
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				border: 1px solid #B5B5B5;
				border-radius: 8rpx;
				padding-left: 78rpx;
			}
	
			image {
				position: absolute;
				left: 38rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 40rpx;
				height: 40rpx;
			}
		}
		.message {
			box-sizing: border-box;
			display: flex;
			margin-left: 26rpx;
			align-items: center;
			position: relative;
			image {
				width: 70rpx;
				height: 55rpx;
			}
			image:first-child {
				margin-right: 20rpx;
			}
			image:last-child {
				margin-left: 10rpx;
				width: 55rpx;
				height: 55rpx;
			}
			.line {
				height: 126rpx;
				width: 2rpx;
				background-color: #E5E5E5;
				position: absolute;
				left: 50%;
				top: -38rpx;
			}
		}
	}
	.placeholder {
		font-size: 30rpx;
		color: #AAAAAA;
	}
</style>
