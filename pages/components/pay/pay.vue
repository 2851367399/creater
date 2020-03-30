<template>
	<view>
		<!-- 收货地址 -->
		<view class="mode-box" v-if="isAddress" @click="address()">
			<view class="mode">
				<view class="userInfo">
					<text>{{this.name}}</text>
					<text>{{this.phone}}</text>
				</view>
				<view class="address">
					<text>{{this.defaultAddress}}</text>
				</view>
			</view>
		</view>
		<!-- 订单商品 -->
		<view class="product-box">
			<view class="product" v-if="res.itemlist ">
				<view class="product-img">
					<image :src="res.itemlist[0].picture_info.pic_cover" mode=""></image>
				</view>
				<view class="product-title">
					<view class="title" >
						<text>{{res.itemlist[0].goods_name}}</text>
					</view>
					<view class="params">
						<text>{{res.itemlist[0].sku_name}}</text>
					</view>
				</view>
				<view class="product-price">
					<view class="price">
						<text>￥{{res.itemlist[0].price}}</text>
					</view>
					<view class="number">
						<text>×{{res.itemlist[0].num}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 送货,编辑订单地址 -->
		<view class="delivery-box">
		  <view class="delivery-item">
		  	
		  	<view class="delivery-title">
		  		<text>配送方式</text>
		  	</view>
		  	<view class="delivery-title-choose" style="display: flex;">
		  		<picker @change="bindPickerChange" :value="index2" :range="modeway">
						<view>{{modeway[index2]}}</view>
					</picker>
		  		<image src="/static/images/icon-right.png" mode=""></image>
		  	</view>
		  </view>
			<!-- 物流配送 -->
			<view class="delivery-item">
				
				<view class="delivery-title">
					<text>物流配送</text>
				</view>
				<view class="delivery-title-choose" style="display: flex;">
					<picker @change="bindFlowChange" :value="index3" :range="flowway">
						<view>{{flowway[index3]}}</view>
					</picker>
					<image src="/static/images/icon-right.png" mode=""></image>
				</view>
			</view>
			<!-- 门店自提 -->
			<view class="delivery-item" v-if="!isAddress">
				
				<view class="delivery-title">
					<text>{{salesType[list]}}</text>
				</view>
				<view class="delivery-title-choose" style="display: flex;" >
					<picker @change="bindShopChange" :value="list" :range="salesType">
						<view>{{modeway[list]}}</view>
					</picker>
					<image src="/static/images/icon-right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="cut-line"></view>
		<!-- 付款金额 -->
		<view class="pay-box">
			<view class="pay-item">
				<text>商品总额</text>
				<text>￥{{res.count_money}}</text>
				<!-- <input type="text" value="" /> -->
			</view>
			<view class="pay-item">
				<text>运费</text>
				<text>￥{{this.addressList.express}}</text>
			</view>
			<view class="pay-item">
				<text>折扣券</text>
				<text style="color: #ccc;">抵扣{{res.cashback_price?res.cashback_price : 0.00}}元</text>
			</view>
			<view class="pay-item">
				<text>现金券：<text style="color: #ff4000;">￥{{res.n_money}}</text></text>
				<text>
					<input type="number" placeholder="请输入使用额度"
					placeholder-style="color:#ccc"
					style="text-align: right;"
					v-model="cash"
					@input="money($event)"/>
					</text>
			</view>
			<view class="pay-item">
				<text>使用余额：<text style="color: #ff4000;" v-if="res.member_account">￥{{res.member_account.balance}}</text></text>
				<text>
					<input type="number" placeholder="请输入使用余额"
					placeholder-style="color:#ccc"
					style="text-align: right;"
					v-model="balance"
					@input="changeBalance($event)"
					/>
					</text>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="cut-line"></view>
		<!-- 支付方式 -->
		<view class="delivery-box">
			<!-- <view class="delivery-item">
				<view class="delivery-title-choose" style="margin-right: 12rpx;">
					<image src="/static/images/wx-pay.png" mode=""></image>
				</view>
				<view class="delivery-title">
					<text>微信支付</text>
				</view>
				<view class="delivery-radio">
					<label class="radio" @click="shop()"><radio :checked="isShop" color="#C93A3A"/></label>
				</view>
			</view> -->
			<view class="delivery-item">
				<view class="delivery-title-choose" style="margin-right: 12rpx;">
					<image src="/static/images/payment.png" mode=""></image>
				</view>
				<view class="delivery-title">
				<!-- 	<label class="radio" @click="shop()"><radio :checked="isShop" color="#C93A3A"/></label> -->
					<text>余额付款</text>
				</view>
				<view class="delivery-radio">
					<text style="margin-right: 10rpx;" v-if="res.member_account">
						￥{{res.member_account.balance}}
					</text>
					
				</view>
			</view>
		</view>
		<!-- 付款 -->
		<view class="pay-money">
			<view>
				<text>应付金额：</text>
				<text>￥{{add}}</text>
			</view>
			<view @click="handleOrder()">
				<text>提交订单</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../request.js'
	export default {
		data() {
			return {
				// 是否使用折扣券
				isShop:false,
				// 存储全部的数据
				res: '',
				// 储存商品的sku_id
				sku_id: '',
				// 储存地址数据
				addressList:'',
				// 用户默认的收货地址
				defaultAddress: '',
				// 收货名字
				name: '',
				// 收货人号码
				phone: '',
				// 门店自提地址的id
				shopId: '',
				// 选择提货方式
				modeway: ['门店自取','物流配送'],
				index2: 1, 
				// 物流公司选择
				flowway: [],
				// 物流公司id
				co_id: '',
				// 物流公司索引
				index3: 0,
				// 物流方式
				salesType: [],
				// 物流方式索引
				list: 0,
				// 默认显示物流配送方式
				index:2,
				isAddress: true,
				// 现金券
				cash: '',
				// 余额
				balance: '',
				// 商品总价
				add: ''
			};
		},
		onLoad() {
			// 请求商品的价格数量等相关数据
			request({
				url: 'index.php?s=/wap/order/ApiorderInfo',
				method:"POST",
			}).then(res => {
				// 处理图片
				for(let i = 0;i < res.data.itemlist.length;i++) {
					res.data.itemlist[i].picture_info.pic_cover = 'http://192.168.110.233/' + res.data.itemlist[i].picture_info.pic_cover
				}
				// 存储全部的数据
				this.res = res.data;
				console.log(this.res);
				// 储存商品的sku_id
				this.sku_id = res.data.goods_sku_list;
				// 获取门店自提的地址
					for(let i = 0;i < this.res.pickup_point_list.data.length;i++) {
						let item = this.res.pickup_point_list.data[i];
						let dataItem = (item.province_name + item.city_name + item.dictrict_name + item.address)
						this.salesType = this.salesType.concat(dataItem);
					}
					// 请求获取默认收货地址和快递公司(每次选择完收货人的同步下数据)
					request({
						url: 'index.php?s=/wap/order/getAddres',
						method: 'post',
						data: {
							sku_id: this.sku_id
						}
					}).then(res => {
						// 储存地址数据
						this.addressList = res.data;
						// 获取物流类型
						console.log(this.addressList);
						if(this.addressList.express_company_list && this.addressList.express_company_list.length > 0) {
							for(let i = 0;i < this.addressList.express_company_list.length;i++) {
								this.flowway = this.flowway.concat(this.addressList.express_company_list[i].company_name)
							}
						}
						
						// 省市区
						this.addressList.address_default.address_info = this.addressList.address_default.address_info.split('&nbsp;').join("");
						// 默认地址处理
						this.defaultAddress = this.addressList.address_default.address_info + this.addressList.address_default.address;
						// 收货名字
						this.name = this.addressList.address_default.consigner;
						// 收货人名称
						this.phone = this.addressList.address_default.phone;
						// 总价(单价*数量-邮费，默认不使用折扣券);
						// this.total = (Number(this.res.count_money) + Number(this.res.cashback_price)).toFixed(2)
						this.add = (Number(this.res.count_money) + Number(this.addressList.express)).toFixed(2);
					})		
				})
		},
		onShow() {
			// 请求获取默认收货地址和快递公司(每次选择完收货人的同步下数据)
			request({
				url: 'index.php?s=/wap/order/getAddres',
				method: 'post',
				data: {
					sku_id: this.sku_id || ''
				}
			}).then(res => {
				// 储存地址数据
				this.addressList = res.data;
				// 获取物流类型
				if(this.addressList.express_company_list && this.addressList.express_company_list.length > 0) {
					for(let i = 0;i < this.addressList.express_company_list.length;i++) {
						this.flowway = this.flowway.concat(this.addressList.express_company_list[i].company_name)
					}
				}
				// 省市区
				this.addressList.address_default.address_info = this.addressList.address_default.address_info.split('&nbsp;').join("");
				// 默认地址处理
				this.defaultAddress = this.addressList.address_default.address_info + this.addressList.address_default.address;
				// 收货名字
				this.name = this.addressList.address_default.consigner;
				// 收货人名称
				this.phone = this.addressList.address_default.phone;
				// 总价(单价*数量-邮费，默认不使用折扣券)
				this.total = (Number(this.res.count_money)+Number(this.addressList.express)).toFixed(2);
			})		
		},
		methods:{
			// 点击跳转到chooseShop页面
			chooseShop() {
				uni.navigateTo({
					url:'/pages/components/choose-shop/choose-shop'
				})
			},
			// 点击跳转到address页面
			address() {
				uni.navigateTo({
					url: '/pages/components/address/address'
				})
			},
			// 选择(门店,物流)方式
			bindPickerChange(e) {
				this.index2 = e.target.value;
				if(e.target.value == 1) {
					this.isAddress = true
				}
				else {
					this.isAddress = false
				}
			},
			// 选择物流
			bindFlowChange(e) {
				this.index3 = e.target.value;
				this.co_id = this.addressList.express_company_list[this.index3].co_id;
				console.log(this.co_id)
			},
			// 选择门店
			bindShopChange(e) {
				this.list = e.target.value;
				// 门店自提地址的id
				this.shopId = this.res.pickup_point_list.data[this.list].id;
			},
			// 使用现金券
			money(event) {
				// 如果输入金额大于商品总额,显示商品总额
					// 如果用户存在现金券
					this.cash = parseInt(event.target.value) || 0;
					// 当前商品的总价
					let price = (parseFloat(this.res.count_money) + parseFloat(this.addressList.express));
					// 当前用户拥有的现金券
					let userCash = parseFloat(this.res.n_money);
					// 当前用户输入的现金券和余额的总和
					let sum = this.cash + (parseInt(this.balance) ? parseInt(this.balance): 0);
					// 商品总额大于用户现有现金券,默认最大输入位当前现金券(this.res.n_money)
					if(this.balance == '') {
						// 如果用户现金券小于当前的商品价格
						if(userCash < price) {
							// 输入现金券大于用户的现金券
							if(this.cash > userCash) {
								this.cash = userCash;
								this.add = (price - this.cash).toFixed(2);
							}
							else {
								this.add = (price - this.cash).toFixed(2);
							}
						}
						// 如果用户现金券大于当前的商品价格
						else {
							// 输入现金券大于用户的现金券
							if(this.cash > price) {
								this.cash = price;
								this.add = 0
							}
							else {
								this.add = (price - this.cash).toFixed(2)
							}
						}
					}
					// 如果用户输入的余额不为空
					else if(this.balance != '') {
						// 如果用户拥有的现金券大于当前商品的总价
						if(userCash > price) {
							// 当前余额+现金券大于商品的价格
							if(sum >= price) {
								// 输入的现金券小于当前商品价格
								if(this.cash < price) {
									this.balance = (price - this.cash).toFixed(2);
									this.add = 0;
								}
								// 输入的现金券大于当前商品价格
								else {
									this.cash = price;
									this.balance = 0;
									this.add = 0;
								}
							}
							else {
								this.add = (price - this.balance - this.cash).toFixed(2)
							}
						}
						// 如果用户拥有的现金券小于当前商品的总价
						else {
							if(sum >= price) {
								// 如果输入的现金券大于用户的现金券
								if(this.cash > userCash) {
									this.cash = userCash;
									this.add = (price - this.balance - userCash).toFixed(2);
								}
								else {
									this.add = (price - this.balance - this.cash).toFixed(2);
								}
							}
							else {
								this.add = (price - this.balance - this.cash).toFixed(2);
							}
						}
					}
				
				
				
			
			},
			// 使用余额
			changeBalance(event) {
				// 如果用户存在现金券
				this.balance = parseInt(event.target.value) || 0;
				// 当前商品的总价
				let price = (parseFloat(this.res.count_money) + parseFloat(this.addressList.express));
				// 当前用户拥有的现金券
				let userBalance = parseFloat(this.res.member_account.balance);
				// 当前用户输入的现金券和余额的总和
				let sum = this.balance + (parseInt(this.cash) ? parseInt(this.cash): 0);
				// 如果现金券等于价格，默认给0
				if(this.cash == price ) {
					this.balance = 0;
				}
				// 如果用户没有输入现金券
				if(this.cash =='' || this.cash == 0) {
					// 如果余额存在且余额大于商品价格
					if(userBalance && userBalance >= price) {
						if(this.balance > price) {
							this.balance = price;
							this.add = 0
						}
						else {
							this.add = (price - this.balance).toFixed(2)
						}
					}
					// 余额存在且余额小于商品价格
					else {
						if(this.balance > userBalance) {
							this.balance = userBalance;
							this.add = (price - this.balance).toFixed(2)
						}
						else {
							this.add = (price - this.balance).toFixed(2)
						}
					}
				}
				// 用户输入了现金券
				else {
					// 如果余额存在且余额大于商品价格
					if(userBalance && userBalance >= price) {
						if(this.balance > price - this.cash) {
							this.balance = price;
							this.add = 0;
						}
						else {
							this.add = (price - this.balance - this.cash).toFixed(2);
						}
					}
					// 余额小于商品价格
					else {
						if(this.balance > userBalance) {
							this.balance = userBalance;
							this.add = (price - this.balance - this.cash).toFixed(2);
						}
						else {
							this.add = (price - this.balance - this.cash).toFixed(2)
						}
					}
				}
	
			},
			// 提交订单
			handleOrder() {
				console.log(111)
						request({
							url: 'index.php?s=/wap/order/ordercreate',
							method: 'post',
							data: {
								goods_sku_list: this.res.goods_sku_list,
								leavemessage: '',
								use_coupon: 0,
								integral: 0,
								account_balance:this.balance,
								pay_type: 0,
								buyer_invoice: '',
								pick_up_id: this.shopId || this.addressList.express_company_list[this.index3].co_id,
								shipping_company_id:  this.co_id ,
								cashback_price: this.res.cashback_price,
								n_money: this.cash,
							}
						}).then(res => {
							uni.showToast({
								title: '订单提交中',
								icon: 'loading'
							})
							uni.navigateTo({
								url: '/pages/components/order/order'
							})
							// if(res.code == 200) {
							
							// 	console.log(111)
							// 	uni.hideToast();
								
							// }
						})
			
				
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background: #EFEFF4;
	box-sizing: border-box;
	padding-bottom: 90rpx;
}
// 收货地址
.mode-box {
	box-sizing: border-box;
	padding: 30rpx;
	background: #fff;
	border-bottom: 1px solid #efefef;
	.mode {
		box-sizing: border-box;
		
		font-size: 28rpx;
		color: #444;
		.userInfo {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text {
				font-size: 28rpx;
				color: #444;
				flex: 1;
			}
		}
		.address {
			box-sizing: border-box;
			margin-top: 12rpx;
		}
	}
}
// 订单详情
.order-box {
	background: #fff;
	box-sizing: border-box;
	padding: 0 18rpx;
	.order {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.order-left {
			box-sizing: border-box;
			.sketchy {
				font-size: 24rpx;
				color: #444;
				margin-top: 18rpx;
			}
			.detail-address {
				font-size: 28rpx;
				color: #000;
				font-weight: 700;
				margin-top: 18rpx
			}
		}
		.order-right {
			box-sizing: border-box;
			width: 30rpx;
			height: 30rpx;
			
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
// line
.line {
	background: #ccc;
	height: 4px;
	width: 100%;
}
// 订单商品
.product-box {
	background: #fff;
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
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.params {
				font-size: 24rpx;
				color: #AAAAAA;
				margin-top: 10rpx;
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
//送货,编辑订单地址
.delivery-box {
	background: #fff;
	box-sizing: border-box;
	.delivery-item {
		box-sizing: border-box;
		padding: 30rpx;
		border-bottom: 1px solid #E5E5E5;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		.delivery-radio {
			box-sizing: border-box;
		}
		.delivery-title {
			box-sizing: border-box;
			flex: 1;
		}
		.delivery-title-choose {
			color: #C7C7CC;
			image {
				width: 30rpx;
				height: 30rpx;
				position: relative;
				top: 4rpx;
			}
		}
	}
}
// 分割线
.cut-line {
	height: 18rpx;
	width: 100%;
	background: #EFEFF4;
}
// 付款金额 
.pay-box {
	background: #fff;
	box-sizing: border-box;
	.pay-item {
		box-sizing: border-box;
		padding: 30rpx;
		border-bottom: 1px solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		color: #000;
	}
}
// 付款
.pay-money {
	box-sizing: border-box;
	display: flex;
	height: 90rpx;
	font-size: 30rpx;
	color: #fff;
	line-height: 90rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	view {
		flex: 1;
		text-align: center;
	}
	view:nth-child(1) {
		background: #6C2E2E;
		text:nth-child(1) {
			color: #906B6B;
		}
	}
	view:nth-child(2) {
		background: #B4302D;
	}
}
</style>
