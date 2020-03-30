<template>
	<view>
		<!-- 导航 -->
		<view class="nav-box">
			<view class="nav">
				<block v-for="(item,index) in navList" :key="index">
					<view class="nav-item " @click="handleNav(index)" :class="{'active': currentIndex == index}">
						<text>{{item}}</text>
					</view>
				</block>
			</view>
		</view>
		<!-- 商品列表 -->
		<!-- 全部 -->
		<view v-if="visible == 1" class="animated fadeInLeft">
			<block v-for="(item,index) in list" :key="index">
			<!-- 已完成交易但未评价 -->
			<view class="goods-box">
				<view class="goods">
					<!-- 商品信息栏 -->
					<view class="goods-title">
						<text>{{item.create_date}}</text>
						<text>{{item.status_name}}</text>
					</view>
					<!-- 商品 -->
					<block v-for="(good,i) in item.order_item_list" :key="i">
					<view class="product" @click="orderDetail()">
						<view class="product-img">
							<image :src="baseURL + good.picture.pic_cover" mode=""></image>
						</view>
						<view class="product-title">
							<view class="title">
								<text>{{good.goods_name}}</text>
							</view>
							<view class="params">
								<text>{{good.sku_name}}</text>
							</view>
						</view>
						<view class="product-price">
							<view class="price">
								<text>￥{{good.price}}</text>
							</view>
							<view class="number">
								<text>×{{good.num}}</text>
							</view>
						</view>
					</view>
					</block>
					<!-- 合计 -->
					<view class="total">
						<view>
							<text>共{{item.order_item_list.length}}件商品，合计：￥{{item.order_money}}(含运费￥{{item.shipping_money}})</text>
						</view>
						<view>
							<block v-for="(btn,bk) in item.member_operation" :key="bk">
							<text v-if="btn.no == 'pay'">{{btn.name}}</text>
							<text v-if="btn.no == 'close'">{{btn.name}}</text>
							<text v-if="btn.no == 'logistics'">{{btn.name}}</text>
							<text v-if="btn.no == 'getdelivery'">{{btn.name}}</text>
							<text v-if="btn.no == 'delete_order'">{{btn.name}}</text>
							</block>
						</view>
					</view>
				</view>
			</view>
			</block>
			<!-- 已完成交易且已评价 -->
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../request.js'
	export default {
		data() {
			return {
				baseURL:this.$api,
				visible:0,
				navList: ['全部', '待付款', '待发货', '待收货', '待评价'],
				currentIndex: 0,
				list: [],

			};

		},
		onLoad: function(params) {
			this.currentIndex = params.status;
			this.getList();
		},
		methods: {
			// 点击切换
			handleNav(index) {
				this.currentIndex = index;
				this.getList();
			},
			// 点击商品去到订单详情页
			orderDetail() {
				uni.navigateTo({
					url: '/pages/components/order-detail/order-detail'
				})
			},
			// 店家跳转到申请退货页面
			returnGoods() {
				uni.navigateTo({
					url: '/pages/components/return-goods/return-goods'
				})
			},
			// 点击跳转到评价页面
			appraise() {
				uni.navigateTo({
					url: '/pages/components/appraise/appraise'
				})
			},
			getList() {
				this.visible = 0;
				let status = '';
				let that = this;
				let index = parseInt(this.currentIndex);
				switch (index) {
					case 0:
						status = 'all';
						break;
					case 1:
						status = '0';
						break;
					case 2:
						status = '1';
						break;
					case 3:
						status = '2';
						break;
					case 4:
						status = '3';
						break;
					default:
						status = '6';
				}

				request({
					url: 'index.php?s=/wap/order/myOrderList',
					data: {
						status: status
					},
					method: "POST",
				}).then(function(res) {
					that.visible = 1;
					that.list = res.data.order_list.data;
				});
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}

	// 导航
	.nav-box {
		box-sizing: border-box;
		line-height: 90rpx;
		height: 90rpx;
		background: #fff;

		.nav {
			box-sizing: border-box;
			display: flex;
			border-bottom: 1px solid #E5E5E5;

			.nav-item {
				box-sizing: border-box;
				flex: 1;
				text-align: center;
				font-size: 30rpx;
				color: #444444;
				border-right: 1px solid #E5E5E5;
			}

			.nav-item:nth-child(5) {
				border-right: 0
			}

			.nav-item.active {
				color: #B4302D;
			}
		}
	}

	// 商品列表
	.goods-box {
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;

		// border-bottom: 1px solid #E5E5E5;
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

				view:nth-child(2) {
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
</style>
