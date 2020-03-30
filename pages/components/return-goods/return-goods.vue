<template>
	<view>
		<!-- 申请退货第一步 -->
		<view v-if="!isShow">
			<!-- 退货商品 -->
			<view class="goods-box">
				<view class="goods">
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
				</view>
			</view>
			<!-- 商品评价 -->
			<view class="appraise-box">
				<view class="appraise">
					<textarea value="" placeholder="宝贝不能满足您的期待吗？简单说说它的不足吧.." placeholder-style="color:#B2B2B2;font-size: 15px;"/>
					<view class="show-photo">
						<image src="/static/images/photo.png" mode=""></image>
						<view>
							<text>添加图片</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 提示 -->
			<view class="reminder">
				<text>提交服务订单后，售后专员可能与您电话沟通，请保持通话畅通</text>
			</view>
			<!-- 提交按钮 -->
			<view class="btn">
				<button type="warn" @click="submit()">提交</button>
			</view>
		</view>
		<!-- 申请退货第二步 -->
		<view v-if="isShow">
			<!-- 发起退货 -->
			<view class="start-goods">
				<text>您已发起退货申请，请耐心等待商家处理...</text>
			</view>
			<view class="goods-box">
				<view class="goods">
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
				</view>
			</view>
			<!-- 取消退货 -->
			<view class="btn">
				<button type="warn">取消退货</button>
			</view>
		</view>
		<!-- 填写退货单号 -->
		<view v-if="0">
			<view class="start-goods">
				<text>卖家已同意了您的退货申请，请填写货运单号！</text>
			</view>
			<view class="goods-box">
				<view class="goods">
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
				</view>
			</view>
			<!-- 填写单号 -->
			<view class="address-box">
				<view class="address-item">
					<view>
						<text>收货人</text>
					</view>
					<input type="text" value="" placeholder="请输入收货人姓名" placeholder-class="placeholder"/>
				</view>
				<view class="address-item">
					<view>
						<text>电话号码</text>
					</view>
					<input type="text" value="" placeholder="请输入电话号码" placeholder-class="placeholder"/>
				</view>
				<view class="address-item">
					<view>
						<text>所在地区</text>
					</view>
					<input type="text" value="" placeholder="请输入城市区" placeholder-class="placeholder"/>
				</view>
				<view class="address-item">
					<view>
						<text>详细信息</text>
					</view>
					<input type="text" value="" placeholder="请输入详细地址" placeholder-class="placeholder"/>
				</view>
			</view>
			<!-- 确定按钮 -->
			<!-- 取消退货 -->
			<view class="btn">
				<button type="warn">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false
			};
		},
		methods: {
			// 点击提交
			submit() {
				this.isShow = true
			}
		},
		created() {
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	// 申请退货第一步
	// 商品
	.goods-box {
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		// border-bottom: 1px solid #E5E5E5;
		.goods {
				box-sizing: border-box;
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
			}
			
		}
	.goods-box:nth-child(1) {
		margin-top: 0;
	}
	// 商品评价
	.appraise-box {
		box-sizing: border-box;
		padding: 30rpx;
		background: #fff;
		margin-top: 20rpx;
		.appraise {
			box-sizing: border-box;
			textarea {
				width: 100%;
				box-sizing: border-box;
				font-size: 28rpx;
			}
			.show-photo {
				box-sizing: border-box;
				width: 164rpx;
				height: 164rpx;
				border: 1px solid #E5E5E5;
				text-align: center;
				padding: 32rpx 0;
				image {
					width: 50rpx;
					height: 45rpx;
				}
				view {
					color: #D8D8D8;
					font-size: 24rpx;
					text-align: center;
				}
			}
		}
	}
	// 提示
	.reminder {
		box-sizing: border-box;
		color:#B2B2B2;
		font-size: 24rpx;
		margin-top: 18rpx;
		padding: 0 30rpx;
	}
	// 提交按钮
	.btn {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	// 发起退货
	.start-goods {
		box-sizing: border-box;
		padding: 0 30rpx;
		line-height: 90rpx;
		font-size: 30rpx;
		color: #B83D3B;
		background: #fff;
	}
	// 填写单号
	.address-box {
		box-sizing: border-box;
		margin-top: 20rpx;
		.address-item {
			box-sizing: border-box;
			padding: 30rpx;
			border-bottom: 1px solid #E7E7E7;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			view {
				width: 165rpx;
				text {
					color: #000;
				}
			}
			input {
				flex: 1;
			}
		}
	}
</style>
