<template>
<view class="vip-box">
	<view class="vip-banner">
		<image src="/static/images/vipBanner_03.png"></image>
	</view>
	<view class="vip-goods">
		<scroll-view scroll-x="true">
			<view class="goods-list">
				<block v-for="(item,index) in vipList" :key="index">
					<view class="goods">
						<image :src="item.src"></image>
						<view class="goods-title">
							<text>{{item.title}}</text>
						</view>
						<view class="goods-price">
								<template v-if="item.newPrice">
									<text class="new-unit">￥</text>
									<text class="new-price">{{item.newPrice}}</text>
								</template>
								<text class="old-unit" :class="item.newPrice?' active': ''">￥</text>
								<text class="old-price" :class="item.newPrice?' active': ''">{{item.oldPrice}}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
	
	<view class="vip-get">
		<image src="/static/images/vieGet.jpg"></image>
	</view>
	
</view>
</template>

<script>
	export default {
		props: {
			vipList: {
				type: Array
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.vip-box {
		box-sizing: border-box;
		padding: 14rpx 42rpx 30rpx 42rpx;
		.vip-banner {
			box-sizing: border-box;
			padding-bottom: 30rpx;
			image {
				width: 100%;
				height: 200rpx;
				display: block;
			}
		}
		.vip-goods {
			box-sizing: border-box;
			.goods-list {
				box-sizing: border-box;
				width: 100%;
				display: flex;
				white-space: nowrap;
				.goods {
					flex-shrink: 0;
					box-sizing: border-box;
					margin-right: 12rpx;
					box-sizing: border-box;
					width: calc(32% - 12rpx);
					image {
						display: block;
						width: 100%;
						height: 208rpx;
					}
					.goods-title {
						box-sizing: border-box;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #0F0F0F;
						font-size: 23rpx;
						margin-top: 14rpx;
					}
					.goods-price {
						box-sizing: border-box;
						font-weight: 700;
						font-size: 24rpx;
						margin-top: 8rpx;
						.new-price,.new-unit {
							color: #35B9B9;
						}
						.new-unit,.old-unit {
							font-weight: normal;
						}
						.old-price,.old-unit {
							color: #000;
						}
						.old-unit {
							margin-left: 8rpx;
						}
					}
				}
				.goods:last-child {
					margin-right: 0;
				}
			}
		}
		.vip-get {
			height: 164rpx;
			box-sizing: border-box;
			margin-top: 30rpx;
			image {
				display: block;
				height: 100%;
				width: 100%;
			}
		}
	}
	.active {
		text-decoration: line-through;
		font-weight: normal !important;
		color: #727272 !important;
	}
</style>
