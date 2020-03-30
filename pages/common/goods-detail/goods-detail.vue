<template>
	<view style="padding-bottom: 100rpx;">
		<view class="swiper-box" >
			<swiper indicator-dots indicator-color="rgba(187,187,187,0.4)" indicator-active-color="rgba(255,255,255,0.7)">
				<block v-if="imgUrl && imgUrl.length > 0">
					<swiper-item v-for="(item,index) in imgUrl" :key="index">
						<view>
							<image :src="item.pic_cover_big" mode="widthFix"></image>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>	
		<view class="goods-info">
			<view class="goods-title">
				<view class="title">
					<!-- <text class="sell">促销</text> -->
					<text>{{dataList.goods_name}}</text>
				</view>
				<view class="price">
					<view>
						<text>￥{{dataList.market_price}}</text>
						<view style="font-size: 24rpx;color: #ccc;" v-if="dataList.is_stock_visible">
							库存: {{dataList.stock}}件
						</view>
					</view>
					<view>
						<text>邮费：{{sales}}</text>
					</view>
				</view>
			</view>
			<view class="goods-params">
				<text>规格</text>
				<view class="choose-params">
					<text>标准</text>
					<image src="/static/images/icon-right.png"></image>
				</view>
			</view>
		</view>
		<view class="goods-sell">
			<!-- 详情、售后、评价 -->
			<view class="goods-nav">
				<block v-for="(item,index) in navList" :key="index">
					<view :class="{'active': currentIndex == index}" @click="handleClick(index)">
						<text>{{item}}</text>
					</view>
				</block>
			</view>
			<!-- 展示内容 -->
			<view class="goods-context">
				<!-- 详情 -->
				<view class="goods-show" v-if="currentIndex == 0">
					<image src="/static/images/newGoods_03.png"></image>
					<image src="/static/images/newGoods_03.png"></image>
					<image src="/static/images/newGoods_03.png"></image>
					<image src="/static/images/newGoods_03.png"></image>
					<image src="/static/images/newGoods_03.png"></image>
					<image src="/static/images/newGoods_03.png"></image>
					<image src="/static/images/newGoods_03.png"></image>
					<image src="/static/images/newGoods_03.png"></image>
				</view>
				<!-- 评价 -->
				<view v-if="currentIndex == 1">
					<view class="goods-appraise" v-if="appraiseList && appraiseList.length > 0">
						<view class="appraise-nav">
							<block v-for="(item,index) in appraiseNav" :key="index">
								<text :class="{'appraiseActive': appraiseIndex == index}" @click="handleAppraise(index)">{{item.name}}</text>
							</block>
						</view>
					</view>
					<view class="appraise-list" v-if="appraiseList && appraiseList.length > 0">
						<block v-for="(item,index) in appraiseList" :key="index">
							<view class="appraise-item">
								<view class="appraise-auth">
									<view>
										<image :src="item.user_img" mode=""></image>
										<text>{{item.member_name}}</text>
									</view>
									
									<text>{{item.addtime}}</text>
								</view>
								<view class="appraise-container">
									<view>{{item.content}}</view>
								</view>
								<!-- 评论图片 -->
								<view class="appraise-show" v-if="item.image != '' ">
									<block v-for="(list,index) in item.image" :key=index>
										<view><image :src="list"></image></view>
									</block>
								</view>
							<!-- 	<view class="appraise-sell">
									<text>购买日期：{{item.sellData}}</text>
								</view> -->
							</view>
						</block>
					</view>
					<view v-else class="noneAppraise">
						<text>暂无评价</text>
					</view>
				</view>				
				<!-- 售后 -->
				<view class="goods-sale" v-if="currentIndex == 2">
					<block v-for="(item,index) in saleList" :key="item.title">
						<view class="sale-item">
							<view class="sale-title">{{item.title}}</view>
							<view class="sale-des">{{item.des}}</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="footer-box">
			<view class="footer">
				<view class="collect">
					<view>
						<image src="/static/images/service.png" mode=""></image>
						<view><text>客服</text></view>
					</view>
					<view>
						<image src="/static/images/collect.png" mode="" style="width: 50rpx;"></image>
						<view><text>收藏</text></view>
					</view>
				</view>
				<view class="cart" @click="handleCart('cart')">
					<text>加入购物车</text>
				</view>
				<!-- 点击跳转到付款页面pay -->
				<view class="buy" @click="handleCart('pay')">
					<text>立即购买</text>
				</view>
			</view>
		</view>
		<!-- cart购物车小图标 -->
		<view class="cart-box">
			<image src="/static/images/cart.png" mode=""></image>
			<view class="badge">
				<uni-badge class="uni-badge-left-margin" text="2" type="error" size="small" />
			</view>
			
		</view>
		<!-- 点击加入购物车时显示 -->
		<!-- 遮挡层 -->
		<view class="mark" v-show="isShow"></view>
		<view class="show-box animated " v-show="isShow" :class="{'slideInUp': isShow }">
			<!-- slideOutDown -->
			<!-- 加入购物车商品标题 -->
			<view style="border-bottom: 1px solid #fefefe;box-sizing: border-box;">
				<view class="show-info">
					<view class="show-title">
						<view class="show-img" v-if="imgUrl.length > 0">
							<image :src="imgUrl[0].pic_cover_big" mode="" ></image>
						</view>
						<view class="title" style="overflow: hidden;">
							<view class="name" style="overflow: hidden;text-overflow: ellipsis;white-space: norwap;">
								{{dataList.goods_name}}
							</view>
							<!-- shopPrice -->
							<view class="price">￥{{this.shopPrice ?this.shopPrice: dataList.price}}</view>
						</view>
						<view class="show-close" @click="close">
							<image src="/static/images/error.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="show-params">
				<!-- 加入购物车商品规格 -->
				<view>
					<block v-if="goodsParams && goodsParams.length > 0">
						<view class="params-list" v-for="(item,index) in goodsParams" :key="index">
							<text class="params-name">{{item.spec_name}}</text>
							<view class="params-item" v-if="item.value && item.value.length > 0">
								<text 
								v-for="(list,index2) in item.value" 
								:key="index2" 
								:class="list.active?'paramsActive': ''"
								@click="chooseParams(index,index2)">
								{{list.spec_value_name}}
								</text>
							</view>
						</view>
					</block>
				</view>
				<!-- 加入购物车商品数量 -->
				<view class="params-number">
					<text class="number-name">商品数量</text>
					<view class="number-item">
						<view class="item" style="border-right: 0;" @click="increment()">
							<image src="/static/images/increment.png" mode=""></image>
						</view>
						<view class="item">
							<text>{{amount}}</text>
						</view>
						<view class="item" style="border-left: 0;">
							<image src="/static/images/decrement.png" mode="" @click="decrement()"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 确定按钮 -->
			<view class="btn">
				<button type="warn" @click="cart()" :disabled="disabled">确定</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import Vue from 'vue'
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				// swiper模拟数据
				imgUrl: [],
				navList: ["详情","评价","售后"],
				// 控制详情、评价、售后切换
				currentIndex: 0,
				// 控制评价类型
				appraiseIndex: 0,
				appraiseNav: [
					{
						type: 0,
						name: '全部评价6.2W'
					},
					{
						type: 1,
						name: '好评5K'
					},
					{
						type: 2,
						name: '中评2K'
					},
					{
						type: 3,
						name: '差评8'
					},
					{
						type: 4,
						name: '有图评价99'
					},
				],
				appraiseList: [],
				saleList: [
					{
						title: '厂家服务',
						des: '产品全国联保，享受三包服务，质保期为：一年质保。'
					},
					{
						title: '店下承诺',
						des: '店下平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务您放心购买！'
					},
					{
						title: '正品行货',
						des: '凭质保证书及京东商城发票，可享受全国联保服务。',
					}
				],
				number: '99',
				isShow: false,
				// 当前商品的id
				id: '',
				// 当前商品的部分参数
				dataList: '',
				// 邮费
				sales: '',
				// 控制加入购物车商品的数量
				amount: 1,
				// 存储商品规格
				goodsParams: [],
				// 储存选择商品规格参数
				shopParams: [],
				arr: [],
				// 当前选择商品的价格
				shopPrice: '',
				// 当前选择商品的id
				shopId: '',
				// 当前选择商品的规格名称
				sku_name: '',
				cost_price: '',
				// 控制购物车确定按钮
				disabled: false,
				// 储存匹配的商品参数
				chooseItem: '',
				// 储存当前选择商品的库存数;
				stock: '',
				// 判断用户是点击加入购物车还是点击立即购买
				isType: false
			};
		},
		onLoad(options) {
			// 存储商品的id
			let id = options.id;
			this.id = id;
			// 请求详情页数据
			request({
				url :'index.php?s=/wap/goods/Apigoodsdetail',
				method: 'POST',
				data: {
					id: id
					// id: 33
				}
			}).then(res => {
				// console.log(res);
				// 储存商品详情
				this.dataList = res.data.goods_detail;
				console.log(this.dataList);
				this.stock = this.dataList.stock;
				// console.log(this.dataList)
				// 储存商品规格
				// 动态为每个商品属性添加一条active点击属性
				this.goodsParams = this.dataList.spec_list;
				for(let i = 0;i < this.goodsParams.length;i++) {
					for(let j = 0;j < this.goodsParams[i].value.length;j++) {
						// 动态赋值对象的active属性
						Vue.set(this.goodsParams[i].value[j],'active',false)
					}
				}
				// 处理当前商品的所有规格参数
				this.handleSku_list()
				// this.goodsParams = goodsParams
				// console.log(this.goodsParams);
				// 处理轮播图数据
				let imgUrl = res.data.goods_detail.img_list;
				for(let i = 0;i < imgUrl.length;i++) {
					imgUrl[i].pic_cover_big = this.$api + imgUrl[i].pic_cover_big
				}
				this.imgUrl = imgUrl;
			});
			// 请求邮费
			request({
				url: 'index.php?s=/wap/Goods/getShippingFeeNameByLocation',
				method: 'POST',
				data: {
					goods_id: id
				}
			}).then(res => {
				if(typeof (res.data) == 'string') {
					this.sales = res.data
				}
				else {
					this.sales = res.data[0].express_fee;
				}
			})
			// 请求评价(默认请求全部)
			request({
				url: 'index.php?s=/wap/Goods/getGoodsComments',
				method: 'POST',
				data: {
					goods_id: this.id,//11
					comments_type: 0
				}
			}).then(res => {
				// 处理头像和评论图像的路径;
				let data = res.data.data
				for(let i = 0;i < data.length;i++) {
					// 格式化时间
					let totalNumber = new Date(data[i].addtime * 1000);
					let y = totalNumber.getFullYear();
					let m = totalNumber.getMonth() + 1 > 10?totalNumber.getMonth() + 1 : '0' + (totalNumber.getMonth() + 1);
					let d = totalNumber.getDay() > 10?totalNumber.getDay(): '0' + (totalNumber.getDay());
					data[i].addtime = y+'-'+m+'-'+d
					data[i].user_img = this.$api + data[i].user_img
					data[i].image = data[i].image.split(',');
					if(data[i].image.length > 0 && data[i].image != '') {
						for(let j = 0;j < data[i].image.length;j++) {
							data[i].image[j] = this.$api + data[i].image[j]
						}
					}			
				}
				this.appraiseList = data;
			})
		},
		methods: {
			// 切换详情、评价、售后
			handleClick(index) {
				this.currentIndex = index
			},
			// 切换评价类型
			handleAppraise(index) {
				this.appraiseIndex = index
			},
			// 点击加入购物车按钮
			handleCart(type) {
				
				// 判断用户是点击加入购物车或点击立即购买(跳转不同的页面)
				if(type == 'cart') {
					this.isType = false;
				}
				else {
					this.isType = true;
				}
				// 规格弹窗显示
				this.isShow = true;
				// 最小购买数
				if(this.dataList.min_buy != 0) {
					this.amount = this.dataList.min_buy
				}
			},
			// 点击关闭遮挡层
			close() {
				this.isShow = false
			},
			// 点击去到购物车页面
			cart() {
				console.log(this.stock)
				// 判断加入购物车或者购买的商品是否有库存
				if(this.stock == 0 && this.dataList.stock == 0) {
					uni.showToast({
						title: '当前商品库存为0',
						icon: 'none'
					})
					return
				}
				else {
				// 定义加入购物车所需的数据
					let data = {
						trueId: this.dataList.goods_id,
						count: this.amount,
						goods_name: this.dataList.goods_name,
						shop_id: this.dataList.shop_id,
						shop_name: this.dataList.shop_name,
						picture: this.dataList.picture,
						select_skuid: this.shopId || this.dataList.sku_list[0].sku_id,
						select_skuName: this.sku_name,
						cost_price: this.cost_price,
					}
					// 判断当前商品的规格是否存在
					if(!this.shopPrice && this.dataList.sku_list.length > 1) {
						uni.showToast({
							title: '请选择商品规格属性',
							icon: 'none'
						})
						return
					}
					// 判断数量是否超过库存数
					else if(this.dataList.stock == this.amount) {
						uni.showToast({
							title: '所选数量不能超过库存数',
							icon: 'none'
						})
						return
					}
					else {
						// 发送加入购物车的请求
						if(!this.isType) {
							request({
								url: 'index.php?s=/wap/goods/addcart',
								method: 'post',
								data: {cart_detail:JSON.stringify(data),cart_tag:'addCart'},
							}).then(res => {
								console.log(res);
								if(res.data > 0) {
									uni.showToast({
										title: '加入购物车成功',
										icon: 'none'
									})
									// 关闭规格窗口
									this.isShow = false
								}
							})
						}
						// 发送立即购买的请求
						else {
							request({
								url:"index.php?s=/wap/order/orderCreateSession",
								method: 'post',
								data: {
									tag: 'buy_now',
									sku_id: this.shopId || this.dataList.sku_list[0].sku_id,
									num:this.amount
								}
							}).then(res => {
								if(res.data == 1) {
									this.isShow = false
									uni.navigateTo({
										url: '/pages/components/pay/pay'
									})
								}
							})
						}
			
					}
				}
			},
			// 增加商品
			increment() {
				// 如果有限制最大购买数
				if(this.dataList.max_buy != 0 && this.dataList.max_buy != 1 ) {
					if(this.amount >= this.dataList.max_buy) {
						this.amount = this.dataList.max_buy;
						uni.showToast({
							title: '此商品最大限购'+this.dataList.max_buy+'件',
							icon: 'none'
						})
					}
					else {
						// 最大购买数不能超过对应的库存数
						if(this.amount >= this.stock) {
							this.stock = this.stock ? this.stock : 0;
							uni.showToast({
								title:'不能购买超过最大库存数'+this.stock+'件',
								icon: 'none'
							})
							this.amount = this.stock ? this.stock : 0;
						}
						else {
							this.amount = this.amount + 1;
						}
						
					}
				}
				else {
					// 最大购买数不能超过对应的库存数
					if(this.amount >= this.stock) {
						this.stock = this.stock ? this.stock : 0;
						uni.showToast({
							title:'不能购买超过最大库存数'+this.stock+'件',
							icon: 'none'
						})
						this.amount = this.stock ? this.stock : 0;
					}
					else {
						this.amount = this.amount + 1;
					} 
				}
				
			},
			// 减少商品
			decrement() {
				// 库存为零时不做操作
				if(this.stock == 0) {
					uni.showToast({
						title: '此商品库存不足',
						icon: 'none'
					})
					return;
				}
				else {
					// 如果有限制最小购买量
					if(this.dataList.min_buy != 0) {
						if(this.amount <= this.dataList.min_buy) {
							this.amount = this.dataList.min_buy;
							uni.showToast({
								title: '此商品最少'+this.dataList.min_buy+'件起购',
								icon: 'none'
							})
						}
						else {
							this.amount = this.amount - 1;
						}
					}
					else {
						if(this.amount <= 1) {
							this.amount = 1
						}
						else {
							this.amount = this.amount - 1;
						}
					}
				}
				
				
			},
			// 选择商品规格
			chooseParams(index,index2) {
				for(let i = 0;i < this.goodsParams[index].value.length;i++) {
					this.goodsParams[index].value[i].active = false;
				}
				this.goodsParams[index].value[index2].active = true;
				// 处理当前商品所选的参数
				this.handleSelectParams();
				// 根据当前选择的商品参数匹配商品的价格和id
				this.hanleSelectPrice()

			},
			// 处理当前商品的所有规格参数
			handleSku_list() {
				// var arr =[]
				// console.log(this.dataList)
				for(let i = 0;i < this.dataList.sku_list.length;i++) {
					this.arr.push(this.dataList.sku_list[i].attr_value_items)
				}
				// console.log(arr);
				for(let j = 0;j < this.arr.length;j++) {
					let Array = [];
					let arrItem = this.arr[j].split(";");
					// console.log(arrItem);
				 for(let z= 0;z < arrItem.length;z++) {
					 let data = arrItem[z].split(":");
					 Array = Array.concat(data).sort()
				 }
					this.arr[j] = Array

				}
				 // this.dataList.sku_list = arr;
				 // console.log(this.arr)
			},
			// 处理当前商品所选的参数	
			handleSelectParams() {
				// 每次点击之前把上次所选的商品规格参数清空
				this.shopParams = [];
				for(let j = 0;j < this.goodsParams.length;j++) {
					for(let z= 0;z < this.goodsParams[j].value.length;z++) {
						if(this.goodsParams[j].value[z].active) {
							let chooseItem = this.goodsParams[j].spec_id+':'+this.goodsParams[j].value[z].spec_value_id;
							this.shopParams.push(chooseItem);
						}
					}
				}
				// 数组去重
				this.shopParams=[...new Set(this.shopParams)];
				// console.log(this.shopParams);
				if(this.shopParams && this.shopParams.length > 0) {
					var dataItem = [];
					for(let i = 0;i < this.shopParams.length;i++) {
						let data = this.shopParams[i].split(";");
						// console.log(data)
						for(let j = 0;j < data.length;j++) {
							let arr = data[j].split((":"))
							dataItem.push(...arr);
						}
					}
					this.shopParams = dataItem.sort()
				}
			},
			// 根据当前选择的商品参数匹配商品的价格和id
			hanleSelectPrice() {
				for(let i = 0;i < this.arr.length;i++) {
					if(JSON.stringify(this.shopParams) == JSON.stringify(this.arr[i])) {
						this.shopPrice = this.dataList.sku_list[i].price;
						this.shopId = this.dataList.sku_list[i].sku_id;
						this.sku_name = this.dataList.sku_list[i].sku_name
						this.cost_price = this.dataList.sku_list[i].cost_price
						this.chooseItem = JSON.stringify(this.arr[i]);
						this.stock = this.dataList.sku_list[i].stock
						console.log(this.shopPrice,this.shopId,this.sku_name,this.cost_price,	this.stock);
						
					}
				}
			},
			
		},
		components: {uniBadge}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	.swiper-box {
		box-sizing: border-box;
		padding: 21rpx 21rpx 0 21rpx;
		background: #fff;
		swiper {
			box-sizing: border-box;
			width: 100%;
			height: 600rpx;
			swiper-item {
				box-sizing: border-box;
				width: 100%;
				view {
					box-sizing: border-box;
					height: 350rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	.goods-info {
		box-sizing: border-box;
		background: #fff;
		.goods-title {
			box-sizing: border-box;
			padding: 30rpx;
			padding-bottom: 20rpx;
			border-top: 1px solid #E7E7E7;
			border-bottom: 1px solid #E7E7E7;
			// height: 130rpx;
			.title {
				box-sizing: border-box;
				display: flex;
				align-content: center;
				.sell {
						background: #B4302D;
						box-sizing: border-box;
						color: #fff;
						font-size: 24rpx;
						padding: 0 4rpx;
						padding-top: 4rpx;
				}
				text:last-child {
					flex: 1;
					color: #686868;
					font-size: 30rpx;
					box-sizing: border-box;
					margin-left: 8rpx ;
				}
			}
			.price {
				box-sizing: border-box;
				display: flex;
				align-content: center;
				justify-content: space-between;
				view:first-child {
					box-sizing: border-box;
					flex: 1;
					text {
						font-size: 36rpx;
						color: #444;
					}
					// text:last-child {
					// 	font-size: 24rpx;
					// 	color: #B3B3B3;
					// 	text-decoration: line-through;
					// 	margin-left: 10rpx;
					// }
				}
				view:last-child {
					box-sizing: border-box;
					text {
						font-size: 18rpx;
						color: #AAAAAA;
					}
				}
			}
		}
		.goods-params {
			box-sizing: border-box;
			border-bottom: 1px solid #E7E7E7;
			line-height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 30rpx;
			text:first-child {
				flex: 1;
				font-size: 30rpx;
				color: #000;
			}
			.choose-params {
				box-sizing: border-box;
				text {
					font-size: 30rpx;
					color: #BDBDBD;
					margin-right: 12rpx;
				}
				image {
					width: 20rpx;
					height: 25rpx;
				}
			}
		}
	}	
	.goods-sell {
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #fff;
		.goods-nav {
			box-sizing: border-box;
			border-bottom: 1px solid #E7E7E7;
			border-top: 1px solid #E7E7E7;
			height: 90rpx;
			line-height: 90rpx;
			display: flex;
			background: #fff;
			position: sticky;
			top: 0;
			view {
				flex: 1;
				box-sizing: border-box;
				font-size: 30rpx;
				color: #444444;
				border-right: 1px solid #E7E7E7;
				text-align: center;
			}
			view:last-child {
				border-right: 0;
			}
			.active {
				color: #B4302D;
			}
		}
		.goods-show {
			box-sizing: border-box;
			image {
				width: 100%;
				display: block;
			}
		}
		.goods-appraise {
			box-sizing: border-box;
			height: 90rpx;
			border-bottom: 1px solid #E7E7E7;
			padding: 25rpx 0;
			.appraise-nav {
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 20rpx;
				text {
					background: #EAF2F7;
					margin-right: 20rpx;
					padding: 4rpx;
					color: #9EA0A2;
				}
				text:last-child {
					margin-right: 0;
				}
				.appraiseActive {
					color: #fff;
					background: #B4302D;
				}
			}
		}
		.appraise-list {
			box-sizing: border-box;
			background: #fff;
			.appraise-item {
				box-sizing: border-box;
				padding: 32rpx 30rpx;
				border-bottom: 1px solid #E7E7E7;
				.appraise-auth {
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					view {
						flex: 1;
						image {
							width: 50rpx;
							height: 50rpx;
							margin-right: 18rpx;
							border-radius: 50%;
						}
						text:nth-child(2) {
							font-size: 28rpx;
							color: #444444;
						}
					}
					
					text:nth-child(2) {
						font-size: 24rpx;
						color: #AAAAAA
					}
				}
				.appraise-container {
					box-sizing: border-box;
					margin-top: 24rpx;
					view {
						color: #9B9B9B;
						font-size: 24rpx;
					}
				}
				.appraise-show {
					box-sizing: border-box;
					display: flex;
					margin-top: 45rpx;
					view {
						flex: 1;
						flex-shrink: 0;
						height: 220rpx;
						margin-right: 16rpx;
						width: calc(33.33% - 11rpx);
						box-sizing: border-box;
						border: 1px solid #E7E7E7;
						image {
							width: 100%;
							height: 100%;
							display: block;
						}
					}
					view:last-child {
						margin-right: 0;
					}
				}
				.appraise-sell {
					box-sizing: border-box;
					text {
						font-size: 24rpx;
						color: #BBBBBB;
					}
				}				
			}
			.appraise-item:last-child {
				border-bottom: 0;
			}
		}
		.goods-sale {
			box-sizing: border-box;
			.sale-item {
				box-sizing: border-box;
				padding: 32rpx 30rpx 55rpx 32rpx;
				.sale-title {
					font-size: 26rpx;
					color: #444;
				}
				.sale-des {
					margin-top: 32rpx;
					font-size: 20rpx;
					color: #888888;
				}
			}
		}
		
	}
	.footer-box {
		box-sizing: border-box;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 90;
		.footer {
			box-sizing: border-box;
			display: flex;
			line-height: 100rpx;
			align-items: center;
			.collect,
			.buy,
			.cart{
				flex: 1;
				box-sizing: border-box;
				height: 100rpx;
				background: #f00;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				background: #B4302D;
			}
			.collect {
				padding-top:20rpx;
				background: #522121;
				display: flex;
				justify-content: space-between;
				align-items: center;
				view {
					box-sizing: border-box;
					flex: 1;
					text-align: center;
					position: relative;
					image {
						width:40rpx;
						height: 40rpx;
						position: absolute;
						left: 50%;
						top: 15rpx;
						transform: translateX(-50%);
						
					}
					view {
						box-sizing: border-box;
						margin-top: 25rpx;
						text {
							font-size: 20rpx;
							color: #fff;
						}
					}
				}
			}
			.cart {
				background: #6C2E2E;
			}
		}
	}
	.cart-box {
		box-sizing: border-box;
		width: 120rpx;
		height: 120rpx;
		position: fixed;
		bottom: 120rpx;
		right: 30rpx;
		z-index: 99;
		background: #fff;
		border-radius: 50%;
		image {
			width: 70rpx;
			height: 70rpx;
			position: absolute;
			left: 10%;
			top: 20%;
		}
	}
	// 数字角标
	.badge {
		position: absolute;
		right: 10px;
		font-size: 20rpx;
		top: 6rpx;
	}
	.uni-badge-left-margin {
	}
	// 购物车
	.mark {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.7);
		z-index: 199;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}
	.show-box {
		box-sizing: border-box;
		// height: 300rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #FFFFFF;
		z-index: 200;
		.show-info {
			box-sizing: border-box;
			padding: 30rpx;
			.show-title {
				box-sizing: border-box;
				display: flex;
				.show-img {
					box-sizing: border-box;
					border: 1px solid #efefef;
					width: 140rpx;
					height: 140rpx;
					image {
						width: 100%;
						height: 100%;
						display: block;
					}
				}
				.title {
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					box-sizing: border-box;
					padding: 0 48rpx 0 24rpx;
					.name {
						font-size: 34rpx;
						color: #444;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 100%;
						margin-top: 10rpx;
					}
					.price {
						font-size: 48rpx;
						margin-top: 20rpx;
					}
				}
				.show-close {
					width: 40rpx;
					height: 40rpx;
					margin-top: 10rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.show-params {
			box-sizing: border-box;
			.params-list {
				box-sizing: border-box;
				padding: 0 30rpx;
				padding-bottom: 30rpx;
				display: flex;
				justify-content: space-between;
				.params-name {
					font-size: 32rpx;
					color: #AAAAAA;
				}
				.params-item {
					box-sizing: border-box;
					text {
						font-size: 24rpx;
						color: #AAAAAA;
						border: 1px solid #AAAAAA;
						padding: 2rpx 6rpx;
						margin-right: 6rpx;
					}
					text:last-child {
						margin-right: 0;
					}
				}
			}
			.params-number {
				box-sizing: border-box;
				padding: 0 30rpx;
				padding-bottom: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.number-name {
					font-size: 32rpx;
					color: #AAAAAA;	
				}
				.number-item {
					box-sizing: border-box;
					display: flex;
					flex-wrap: nowrap;
					.item {
						height: 45rpx; 
						line-height: 45rpx; 
						box-sizing: border-box;
						border: 1px solid #efefef;
						position: relative;
						width: 45rpx;
						text {
							font-size: 24rpx;
							position: absolute;
							left: 17%;
							top: 0;
						}
						image {
							width: 30rpx;
							height: 30rpx;
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%,-50%);
						}
					}	
				}
			}
		}
		.btn {
			line-height: 90rpx;
			color: #fff;
			font-size: 36rpx;
		}
	}
	.noneAppraise {
		text-align: center;
		font-size: 28rpx;
		color: #444;
		line-height: 100rpx;
	}
	.paramsActive {
		border: 1px solid #B4302D !important;
		color: #B4302D !important;
	}
</style>
