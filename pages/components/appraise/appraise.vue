<template>
	<view>
		<view>
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
			
			<!-- 提交按钮 -->
			<view class="btn">
				<button type="warn" >确定</button>
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
	// 评分
	
	// 提交按钮
	.btn {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>
