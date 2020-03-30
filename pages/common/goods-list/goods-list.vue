<template>
	<view>
		<view class="news-box " :class="isMarginTop ? 'distanceActive': ''">
			<view class="news">
				<view>
					<block v-for="(item,index) in newsList" :key="index">
					<!-- 	{{newsList}} -->
						<!-- 跳转到goods-detail页面 -->
						<view class="news-item" @click="handleClick(item.goods_id)">
							<image :src="item.pic_cover_small"></image>
							<view class="news-text">
								<view class="news-title">
									<text>{{item.goods_name}}</text>
								</view>
								<view class="news-price">
									<text class="now">￥{{item.market_price}}</text>
									<!-- <text class="old">￥{{item.oldPrice}}</text> -->
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>

	export default {
		props: {
			newsList: {
				type: Array
			},
			// 定义图片外边包裹的div是否有外边距
			isMarginTop: {
				type: Boolean
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			// 跳转到goods-detail详情页
			handleClick(id) {
				uni.navigateTo({
					url:'/pages/common/goods-detail/goods-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
 
 .news-box {
 	box-sizing: border-box;
 	padding-bottom: 32rpx;
 	
 	view {
 		overflow: hidden;
 		display: block;
 		box-sizing: border-box;
 		// margin-top: 16rpx;
 		.news-item {
 			box-sizing: border-box;
 			width: 50%;
 			float: left;
 			image {
 				width: 100%;
 				height: 300rpx;
 				display: block;
 			}
 			.news-text {
 				box-sizing: border-box;
 				padding: 20rpx;
 				.news-title {
 					font-size: 26rpx;
 					color: #444444;
 					text-overflow: ellipsis;
 					overflow: hidden;
 					white-space: nowrap;
 				}
 				.news-price {
 					box-sizing: border-box;
 					.now {
 						font-size: 26rpx;
 						color: #000;
 						font-weight: 700;
 						margin-right: 10rpx;
 					}
 					.old {
 						font-size: 20rpx;
 						color: #D2D2D2;
 						text-decoration: line-through;
 						
 					}
 				}
 			}
 		}
 	}
 }
 .news-box.distanceActive {
	 margin-top: 16rpx;
 }
</style>
