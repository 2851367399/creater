<template>
	<view class="recommend-box">
		<view class="recommend">
			<block v-for="(item,index) in recommendList" :key="index">
				<view class="recommend-item">
					<view class="recommend-left">
						<!-- <image :src="item.shop_logo"></image> -->
						<image src="http://img005.hc360.cn/hb/oERb28b0d93fb4Ef151633b00dEA358396E.jpg"></image>
					</view>
					<view class="recommend-right">
						<!-- 商店名称 -->
						<view class="title">
							<text class="main">{{item.grou_name}}</text>
						<!-- 	<view><text>外</text></view> -->
						</view>
						<view class="address">
							<text v-if="item.shop_address"></text>
							<text v-else>暂无该店铺相关地址信息</text>
						</view>
						<!-- 商店评分 -->
			<!-- 			<view class="rate">
							<view class="rate-left">
								<view class="score">
									<block v-for="full in item.full">
										<image src="/static/images/start-active.png"></image>
									</block>
									<block v-for="half in item.half">
										<image src="/static/images/start-half.png"></image>
									</block>
									<block v-for="gray in item.gray">
										<image src="/static/images/start.png"></image>
									</block>
								</view>
								<text class="goal">{{item.rate}}分 </text>
								<text class="symbol"> ￥</text>
								<text>{{item.price}}/人</text>
							</view>
							<view class="rate-right">
								<text>{{item.distance}}m</text>
							</view>
						</view> -->
						<!-- 特色 -->
					<!-- 	<view class="feature">
							<view class="feature-left">
								<text>{{item.main}}</text>
								<text>{{item.area}}</text>
							</view>
							<template v-if="item.isOpen">
								<view class="feature-right">
									<text>今日营业</text>
								</view>
							</template>
						</view> -->
						<!-- 排名 -->
					<!-- 	<view class="ranking">
							<text class="active">{{item.ranking}}</text>
							<text>{{item.des}}</text>
						</view> -->
						<!-- 团购 -->
					<!-- 	<view class="group">
							<text>团</text>
							<text>{{item.groupInfo}}</text>
						</view> -->
						<!-- 购物券 -->
						<!-- <view class="ticket">
							<text>券</text>
							<text>{{item.ticketInfo}}</text>
						</view> -->
					</view>
				</view>
			</block>
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			recommendList: {
				type: Array
			}
		},
		data() {
			return {
				score: ''
			};
		},
		created() {
			

		}
	}
</script>

<style lang="scss">
	.recommend-box {
		box-sizing: border-box;
		background: #F5F5F5;
		padding: 0 26rpx;
		.recommend {
			box-sizing: border-box;
			.recommend-item {
				padding: 28rpx 20rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 8rpx;
				overflow: hidden;
				margin-top: 20rpx;
				.recommend-left{
					box-sizing: border-box;
					float: left;
					width: 165rpx;
					height: 165rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.recommend-right{
					box-sizing: border-box;
					padding-left: 16rpx;
					float: left;
					width: calc(100% - 165rpx);
					.title {
						box-sizing: border-box;
						width: 100%;
						line-height: 30rpx;
						.main {
							font-size: 30rpx;
							font-weight: 700;
							color: #000;
							display: inline-block;
							max-width: 86%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						view {
							display: inline-block;
							font-size: 22rpx;
							margin-left: 18rpx;
							position: relative;
							padding: 4rpx 6rpx;
							background: #FFF5ED;
							color: #F19C49;
						}
					}
					.address {
						font-size: 28rpx;
						margin-top: 16rpx;
						color: #ccc;
					}
					.rate {
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 6rpx;
						.rate-left {
							flex: 1;
							box-sizing: border-box;
							color: #656565;
							font-size: 22rpx;
							display: flex;
							.score {
								box-sizing: border-box;
								image {
									width: 25rpx;
									height: 25rpx;
									margin-right: 6rpx;
								}
							}
							.goal {
								margin-left: 12rpx;
							}
							.symbol {
								margin-left: 12rpx;
								font-size: 16rpx;
								position: relative;
								top: 5rpx;
							}
						}
						.rate-right {
							box-sizing: border-box;
							font-size: 22rpx;
							color: #656565;
						}
					}
					.feature {
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 22rpx;
						color: #656565;
						margin-top: 6rpx;
						.feature-left {
							box-sizing: border-box;
							flex: 1;
							max-width: 86%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							text {
								margin-top: 12rpx;
							}
						}
						.feature-right {
							box-sizing: border-box;
							color: #FF4407;
						}
					}
					.ranking {
						box-sizing: border-box;
						font-size: 22rpx;
						color: #FF4407;
						margin-top: 10rpx;
						text {
							border: 1px solid #EAEAEA;
							padding: 3rpx 6rpx;
							display: inline-block;
							border-radius: 20rpx;
							border-bottom-left-radius: 0;
							margin-right: 8rpx;
						}
						text:last-child {
							margin-right: 0;
						}
						text.active {
							border-color: #FFD6C8;
						}
					}
					.group {
						font-size: 20rpx;
						color: #5F5F5F;
						margin-top: 16rpx;
						text:first-child {
							color: #fff;
							display: inline-block;
							padding: 2rpx 6rpx;
							margin-right: 10rpx;
							background: #FD490A;
							border-radius: 2rpx;
						}
					}
					.ticket {
						font-size: 20rpx;
						color: #5F5F5F;
						margin-top: 16rpx;
						text:first-child {
							color: #fff;
							display: inline-block;
							padding: 2rpx 6rpx;
							margin-right: 10rpx;
							background: #F99802;
							border-radius: 2rpx;
						}
					}
					
				}
			}
		}
	}
</style>
