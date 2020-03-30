<template>
	<view>
		<!-- 订单号-->
		<view class="order-number">
			<view class="number">
				<text>订单号：25253412314</text>
				<text>交易成功</text>
			</view>
		</view>
		<!-- 物流 -->
		<view class="logistic-box">
			<view class="logistic">
				<view class="type">
					<text>顺风物流：89898989898</text>
					<view>
						<text>查物流</text>
						<image src="/static/images/icon-right.png" mode=""></image>
					</view>
				</view>
				<view class="user-info">
					<view class="user">
						<text>小李</text>
						<text>13415011234</text>
					</view>
					<view class="address">
						<text>广东省佛山市顺德区</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品 -->
		<view class="goods-box">
			<view class="goods">
				<!-- 商品信息栏 -->
				<view class="goods-title">
					<text>2020-3-20</text>
					<text>已完成</text>
				</view>
				<!-- 商品 -->
				<view class="product" @click="orderDetail()">
					<view class="product-img">
						<image src="/static/images/goods-detail.png" mode=""></image>
					</view>
					<view class="product-title">
						<view class="title">
							<text>莫次有机PWE活性美白洗面奶优惠套装</text>
						</view>
						<view class="params">
							<text>标准套餐+蓝色</text>
						</view>
					</view>
					<view class="product-price">
						<view class="price">
							<text>￥99</text>
						</view>
						<view class="number">
							<text>×22</text>
						</view>
					</view>
				</view>
				<!-- 合计 -->
				<view class="total">
					<view>
						<text>共1件商品，合计：￥220.00(含运费￥0.00)</text>
					</view>
					<view>
						<text>查看物流</text>
						<text>评价</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单时间 -->
		<view class="order-time">
			<view class="time">
				<view>
					<text>下单时间：2020-2-3 20:00:00</text>
				</view>
				<view>
					<text>付款时间：2020-2-3 20:00:00</text>
				</view>
				<view>
					<text>发货时间：2020-2-3 20:00:00</text>
				</view>
			</view>
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
	// 订单号
	.order-number {
		box-sizing: border-box;
		padding: 0 30rpx;
		background: #fff;
		.number {
			line-height: 90rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			color: #444444;
			text:nth-child(2) {
				color: #AAAAAA;
			}
		}
	}
	// 物流
	.logistic-box {
		box-sizing: border-box;
		padding: 30rpx;
		margin-top: 20rpx;
		background: #fff;
		.logistic {
			box-sizing: border-box;
			font-size: 30rpx;
			color: #888888;
			.type {
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image {
					width: 30rpx;
					height: 30rpx;
					position: relative;
					top: 6rpx;
				}
			}
			.user-info {
				box-sizing: border-box;
				margin-top: 45rpx;
				.user {
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					// font-size: 30rpx;
					// color: #888888;
				}
				.address {
					box-sizing: border-box;
					margin-top: 24rpx;
					
				}
			}
		}
	}
	// 商品
	.goods-box {
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		.goods {
			box-sizing: border-box;
			.goods-title {
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color: #AAAAAA;
				border-bottom: 1px solid #E5E5E5;
				line-height: 70rpx;
				text:nth-child(1) {
					flex: 1;
				}
			}
			.product {
				box-sizing: border-box;
				padding: 30rpx;
				display: flex;
				border-bottom: 1px solid #E5E5E5;
				// align-items: center;
				.product-img {
					width: 140rpx;
					height: 140rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.product-title {
					flex: 1;
					box-sizing: border-box;
					padding-left: 30rpx;
					padding-right: 48rpx;
					.title {
						font-size: 30rpx;
						color: #444444;
					}
					.params {
						font-size: 24rpx;
						color: #AAAAAA;
					}
				}
				.product-price {
					box-sizing: border-box;
					.price {
						font-size: 30rpx;
						color: #000;
					}
					.number {
						font-size: 24rpx;
						color: #AAAAAA;
						text-align: right;
					}
				}
			}
			.total {
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 24rpx;
				height: 136rpx;
				border-bottom: 1px solid #E5E5E5;
				padding-bottom: 18rpx;
				padding-top: 20rpx;
				text-align: right;
				view:nth-child(2)  {
					box-sizing: border-box;
					margin-top: 20rpx;
					font-size: 24rpx;
					text {
						display: inline-block;
						box-sizing: border-box;
						border: 1px solid #f00;
						width: 120rpx;
						height: 44rpx;
						line-height: 44rpx;
						text-align: center;
					}
					text:nth-child(1) {
						margin-right: 14rpx;
						border: 1px solid #DDDDDD;
						color: #9B9B9B;
					}
					text:nth-child(2) {
						border: 1px solid #B4302D;
						color: #B4302D;
					}
					// button {
					// 	font-size: 24rpx;
					// }
				}
			}
		}
	}
	// 订单时间
	.order-time {
		box-sizing: border-box;
		margin-top: 20rpx;
		padding: 30rpx;
		background: #fff;
		color: #888888;
		font-size: 30rpx;
		.time {
			box-sizing: border-box;
			view {
				box-sizing: border-box;
				margin-top: 6rpx;
			}
			view:nth-child(1) {
				margin-top: 0;
			}
		}
	}
</style>
