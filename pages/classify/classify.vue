<template>
	<view class="container">
		<!-- 搜索 -->
		<search v-model="text"></search>
		<view class="product-box">
			<view class="product-type" >
				<scroll-view scroll-y="true" :style="{height:cssText.height}" :scroll-into-view="id">
					<block v-for="(item,index) in typeList" :key="item.category_id">
						<view class="type-item " 
						:class="currentIndex==index? 'active': ''"
						:id="item.id"
						@click="handleClick(item,index)">
							<text>{{item.short_name}}</text>
						</view>
					</block>
				</scroll-view>
				
			</view>
			<view class="product-main">
				<!-- 店上好货 -->
				<!-- <view class="product-title">
					<text>店上好货</text>
					<text>more...</text>
				</view> -->
				<view class="product-online" v-if="onLineGoods && onLineGoods.length > 0" >
				<scroll-view scroll-y="true" :style="{height:cssText.height}" @scrolltolower="handleBottom()">
					<block v-for="(item,index) in onLineGoods" :key="index">
						<view class="online-item" @click="handleDetail(item.goods_id)">
							<view class="online-show">
								<image :src="item.pic_cover_micro"></image>
							</view>
							<view class="online-des">
								<view class="online-title">
									{{item.goods_name}}
								</view>
								<view class="online-context">
									<view class="online-price">
										<!-- <text>￥{{item.newPrice}}</text> -->
										<text>￥{{item.market_price}}</text>
									</view>
									<!-- <view class="online-add">
										<image src="/static/images/add.png" mode=""></image>
									</view> -->
								</view>
							</view>
						</view>
					</block>
				</scroll-view>

				</view>
				<view v-else class="none">暂无相关产品</view>
				<!-- 店下好店 -->
				<!-- <view class="product-title titleActive">
					<text>店下好店</text>
					<text>more...</text>
				</view> -->
				<!-- <view class="product-online">
					<block v-for="(item,index) in downLineGoods" :key="index">
						<view class="online-item">
							<view class="online-show">
								<image :src="item.topic"></image>
							</view>
							<view class="online-des">
								<view class="online-title">
									{{item.title}}
								</view>
								<view class="online-context">
									<view class="online-price">
										<text>￥{{item.newPrice}}</text>
										<text>￥{{item.oldPrice}}</text>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view> -->
			</view>
		</view>
		
		
		  
	</view>
</template>

<script>
	import Search from '../common/search/search.vue'
	import { request } from '../request.js'
	export default {
		data() {
			return {
				text: '',
				typeList: [],
				// 店上好货模拟数据
				onLineGoods: [],
				// 店下好货模拟数据
				downLineGoods: [
					{
						topic: '/static/images/product-02.png',
						title: '【给眼睛做个SPA】眼部按摩器升级',
						oldPrice: 99,
						newPrice: 199
					},
					{
						topic: '/static/images/product-01.png',
						title: '【给眼睛做个SPA】眼部按摩器升级',
						oldPrice: 99,
						newPrice: 199
					},
				],
				currentIndex: 0,
				cssText: {
					height: ''
				},
				id: '',
				// 请求分类
				page: 1,
				// 商品id
				category_id: '',
				// 控制否是执行上啦加载函数
				isflag:true,
				
			};
		},
		components: {
			Search
		},
		methods: {
			// 实现点击切换tab
			handleClick(item,index) {
				this.page = 1;
				this.category_id = item.category_id
				this.currentIndex = index;
				// 实现点击滚动
				this.id = item.id;
				uni.showLoading({
					title: '加载中'
				});
				request({
					url: 'index.php?s=/wap/goods/listCategoryGoods',
					data: {
						cat_id: this.category_id,
						page: 1
					}
				}).then(res => {
					uni.hideLoading()
					// 处理图片
					let onLineGoods = res.data.list.data;
					for(let i = 0;i < onLineGoods.length;i++) {
						onLineGoods[i].pic_cover_micro = this.$api + onLineGoods[i].pic_cover_micro
					}
					this.onLineGoods = onLineGoods;
				})
			},
			// 监听右侧下拉触底
			handleBottom() {
				console.log(111);
				this.$nextTick(() =>{
					this.page = this.page + 1;
						uni.showLoading({
							title: '加载中'
						});
						request({
							url: 'index.php?s=/wap/goods/listCategoryGoods',
							data: {
								cat_id: this.category_id,
								page : this.page
							}
						}).then(res => {
							
							uni.hideLoading()
							if(res.data.list.page_count == this.page) {
								uni.showToast({
									title:'暂无更多数据',
									icon: 'none'
								})
								this.isflag = false;
								return
							}
							// 处理图片
							let onLineGoods = res.data.list.data;
							for(let i = 0;i < onLineGoods.length;i++) {
								onLineGoods[i].pic_cover_micro = this.$api + onLineGoods[i].pic_cover_micro
							}
							this.onLineGoods = [...this.onLineGoods,...onLineGoods];
						})
					})
				},
				handleDetail(id) {
					uni.navigateTo({
						url:'/pages/common/goods-detail/goods-detail?id='+id
					})
				}
			
		},
			onLoad() {
				// 获取可视区域高度
				uni.getSystemInfo({
					success:(res) => {
						this.cssText.height = res.windowHeight - 48 + 'px';
					}
				})
				// 左侧分类请求数据
				request({
					url: 'index.php?s=/wap/goods/goodsClassificationList'
				}).then(res => {
					for(let i = 0; i < res.data.list.length;i++) {
						res.data.list[i].id="item" + res.data.list[i].category_id
					}
					this.typeList = res.data.list;
					this.category_id = res.data.list[0].category_id;
					// this.requestGoodsList(this.category_id)
				})
			},

	}
</script>

<style lang="scss">
	.container {
		box-sizing: border-box;
		height: 100%;
		.product-box {
			box-sizing: border-box;
			display: flex;
			.product-type {
				width: 160rpx;
				box-sizing: border-box;
				.type-item {
					line-height: 100rpx;
					width: 100%;
					color: #444;
					font-size: 25rpx;
					box-sizing: border-box;
					background: #F8F8F8;
					text-align: center;
				}
			}
			.product-main {
				flex: 1;
				box-sizing: border-box;
				padding: 0 20rpx;
			.product-title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 14rpx;
					text:first-child {
						font-size: 24rpx;
						color: #BFBFBF;
						flex: 1;
					}
					text:last-child {
						display: inline-block;
						font-size: 16rpx;
						line-height: 18rpx;
						box-sizing: border-box;
						padding: 2rpx 10rpx;
						border-radius: 12rpx;
						color: #BFBFBF;
						background: #F3F3F3;
					}
				}
				.product-title.titleActive {
					margin-top: 40rpx;
				}
			.product-online {
				box-sizing: border-box;
				
				.online-item {
					box-sizing: border-box;
					margin-top: 40rpx;
					display: flex;
					.online-show {
						width: 150rpx;
						height: 150rpx;
						margin-right: 32rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.online-des {
						box-sizing: border-box;
						flex: 1;
						.online-title {
							font-size: 30rpx;
							color: #444;
						}
						.online-context {
							box-sizing: border-box;
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 16rpx;
							.online-price {
								flex: 1;
								text-align: left;
								text:first-child {
									color: #CEB98F;
									font-size: 26rpx;
									margin-right: 10rpx;
								}
								// text:last-child {
								// 	font-size: 17rpx;
								// 	text-decoration: line-through;
								// 	color: #AAAAAA;
								// }
							}
							.online-add {
								width: 42rpx;
								height: 42rpx;
								image {
									width: 100%;
									height: 100%;
								}
							}
						}
					}
				}
			}	
			.none {
				text-align: center;
				color: #444;
				font-size: 28rpx;
				padding-top: 20rpx;
			}	
			}
		}
	}
	.active {
		border-left: 4px solid #C3A769;
		background: #fff !important;
	}
	

</style>
