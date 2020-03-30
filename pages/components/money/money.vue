<template>
	<view>
		<!-- 支付方式 -->
		<view class="pay-way">
			<view class="pay">
				<text>充值方式</text>
				<view>
					<text>微信支付</text>
					<image src="/static/images/icon-right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 充值金额 -->
		<view class="pay-money">
			<view class="money">
				<view>充值金额</view>
				<view style="margin-top: 84rpx">￥200</view>
			</view>
		</view>
		<!-- 协议 -->
		<view class="deal">
			<text>同意支付服务协议</text>
		</view>
		<!-- 充值选择 -->
		<view class="pay-choose">
			<view class="choose">
				<view class="choose-item">
					<view class="face">
						<text>￥200元</text>
					</view>
					<view class="discount">
						<text>获1200抵扣优惠券</text>
					</view>
				</view>
				<view class="choose-item">
					<view class="face">
						<text>￥200元</text>
					</view>
					<view class="discount">
						<text>获1200抵扣优惠券</text>
					</view>
				</view>
				<view class="choose-item">
					<view class="face">
						<text>￥200元</text>
					</view>
					<view class="discount">
						<text>获1200抵扣优惠券</text>
					</view>
				</view>
				<view class="choose-item">
					<view class="face">
						<text>￥200元</text>
					</view>
					<view class="discount">
						<text>获1200抵扣优惠券</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 充值按钮 -->
		<view class="btn">
			<button type="warn">确认充值</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
// 支付方式
.pay-way {
	box-sizing: border-box;
	line-height: 70rpx;
	border-bottom: 1px solid #E4E4E4;
	padding: 0 30rpx;
	background: #fff;
	.pay {
		box-sizing: border-box;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #AAAAAA;
		text:nth-child(1) {
			flex: 1;
		}
		view {
			box-sizing: border-box;
			image {
				width: 40rpx;
				height: 40rpx;
				position: relative;
				top: 10rpx;
			}
		}
	}
}
// 充值金额
.pay-money {
	box-sizing: border-box;
	height: 200rpx;
	padding: 35rpx;
	font-size: 24rpx;
	color: #AAAAAA;
	border-bottom: 1px solid #E4E4E4;
	background: #fff;
}
// 协议
.deal {
	box-sizing: border-box;
	background: #Fff;
	line-height: 70rpx;
	font-size: 24rpx;
	color: #AAAAAA;
	padding-left: 30rpx;
}
// 充值选择
.pay-choose {
	box-sizing: border-box;
	padding: 60rpx 90rpx 80rpx 90rpx;
	.choose {
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		.choose-item {
			box-sizing: border-box;
			width: calc(50% - 12rpx);
			border: 1px solid #B4302D;
			background: #fff;
			padding: 24rpx;
			border-radius: 12rpx;
			margin-bottom: 36rpx;
			.face {
				font-size: 40rpx;
				color: #B4302D;
				text-align: center;
			}
			.discount {
				font-size: 24rpx;
				color: #B4302D;
				text-align: center;
			}
			
		}
		.choose-item:nth-child(2n) {
			margin-left: 12rpx;
		}
		.choose-item:nth-child(2n-1) {
			margin-left: 12rpx;
		}
	}
}
// 充值按钮
.btn {
	box-sizing: border-box;
	padding: 36rpx;
}
</style>
