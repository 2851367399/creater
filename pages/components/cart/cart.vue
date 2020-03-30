<template>
	<view>
		<view class="check-title">
			<view class="check">
				<view class="radio">
					 <label>
						 <checkbox 
						 value="r1"  
						 style="transform: scale(0.7)"
						 color="#C93A3A"
						 @click="sellectAll()"
						 :checked="selectAllchecked"
						 />
						 全选
						 </label>
				</view>
				<view class="edit">
					<text  @click="edit()">{{isShow?'编辑':'完成'}}</text>
				<!-- 	<text v-else>删除</text> -->
				</view>
			</view>
		</view>
		<view class="goods-box">
			<view class="goods">
				
				<block v-for="(goods,index) in goods_list" :key="index" >
				<!-- 商品 -->
				<view class="product" >
					<view class="product-checkbox">
						<label>
						 <checkbox 
						 style="transform: scale(0.7)"
						 color="#C93A3A"
						 @click="checkBox(index)"
						 :checked="goods.act"
						  />
						 </label>
					</view>
					<view class="product-img">
						<image src="/static/images/goods-detail.png" mode=""></image>
					</view>
					<view class="product-title">
						<view class="title">
							<text>{{goods.goods_name}}</text>
						</view>
						<view class="params">
							<text>{{goods.sku_name}}</text>
						</view>
					</view>
					<view class="product-price">
						<view class="price">
							<text>￥{{goods.price}}</text>
						</view>
						<view class="number">
							<text>×{{goods.num}}</text>
						</view>
						<view class="amount">
							
						</view>
					</view>
					<view class="product-amount" v-if="!isShow">
						<text @click="decrement(index)">-</text>
						<input type="number"  :value="goods.num"/>
						<text @click="increment(index)">+</text>
					</view>
					
				</view>
				</block>
			</view>
		</view>
		<view class="btn">
			<view class="total">
				<text>合计：</text>
				<text>￥{{sumGoodsPrice}}</text>
			</view>
			<view @click="submitOrder()" class="add">
				<text>结算</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	 import {
	  mapState,
	  mapMutations
	 } from 'vuex';
	export default {
		data() {
			return {
				// 控制编辑跟完成显示
				isShow: true,
				goods_list:[],
				sumGoodsPrice:0.00,//合计金额
				selectAllchecked:false//全选按钮checked状态
			};
		},
		created() {
			console.log(this.$api)
		},
		methods: {
			// 输入的数量
			handleAmount(event) {
				this.amount = event.target.value;	
			},
			// 增加
			increment(index) {
				let num = this.goods_list[index].num;
				let max_buy = this.goods_list[index].max_buy;
				var that =this;
				if(max_buy > 0 ){
					if(num + 1 > max_buy){
						uni.showToast({
							title:"该商品最多购买:"+max_buy+"个",
							icon:"none"
						});
						return;
					}else{
						this.setGoodsNum(this.goods_list[index].cart_id,num+1,function(){
							that.goods_list[index].num += 1;
						});
					}
				}else{
						this.setGoodsNum(this.goods_list[index].cart_id,num+1,function(){
							that.goods_list[index].num += 1;
						});
				}
			},
			// 减少
			decrement(index) {
				let num = this.goods_list[index].num;
				let min_buy = this.goods_list[index].min_buy;
				var that =this
				if(min_buy > 0 ){
					if(num - 1 < min_buy&& num-1 > 0){
						uni.showToast({
							title:"购买数量不能少于最少购买数:"+min_buy,
							icon:"none"
						});
						return;
					}else{
						this.setGoodsNum(this.goods_list[index].cart_id,num-1,function(){
							that.goods_list[index].num -= 1;
						});
						
					}
				}else{
					if(num-1>0){
						this.setGoodsNum(this.goods_list[index].cart_id,num-1,function(){
							that.goods_list[index].num -= 1;
						});
					}
				}
			},
			// 点击编辑
			edit() {
				this.isShow = !this.isShow
			},
			//请求接口获取货品信息
			getGoods(){
				request({
					url:"index.php?s=/wap/goods/Apicart",
					method:"POST",
				}).then(res=>{
					let data = res.data;
					if(data.code <=0){
						console.log("用户未登录!");
						return;
					}else{
						this.goods_list = data.goods_list;
						console.log(this.goods_list);
					}
				});
			},
			//复选框点击时间,计算合计金额
			checkBox(index){
				if(this.selectAllchecked==true){
					this.selectAllchecked=false;
				}
				if(this.goods_list[index].act == false){
					this.sumGoodsPrice +=this.goods_list[index].price*this.goods_list[index].num;
					this.goods_list[index].act = true;
				}else{
					this.sumGoodsPrice -=this.goods_list[index].price*this.goods_list[index].num;
					this.goods_list[index].act = false;
				}
			},
			//全选
			sellectAll(){
				if(this.selectAllchecked == false){
					this.sumGoodsPrice=0.00;
					for(let i = 0;i<this.goods_list.length;i++){
						this.goods_list[i].act=true;
						this.sumGoodsPrice +=this.goods_list[i].price*this.goods_list[i].num;
					}
					this.selectAllchecked=true;
				}else{
					this.sumGoodsPrice=0.00;
					for(let i = 0;i<this.goods_list.length;i++){
						this.goods_list[i].act=false;
					}
					this.selectAllchecked=false;
				}
				
			},
			//更改货品购买数量
			setGoodsNum(car_id,num,call_back){
				request({
					url:"index.php?s=/wap/goods/cartAdjustNum",
					method:"POST",
					data:{cartid:car_id,num:num}
				}).then(res =>{
					if(res.data ==1){
						if(call_back != undefined){
							call_back();
						}
					}
				})
			},
			//结算
			submitOrder(){
				let car_id = ""; 
				let goods_List = this.goods_list;
				for(let i =0;i<goods_List.length;i++){
					if(goods_List[i].act == true){
						if(car_id.length >0){
							car_id += ","+goods_List[i].cart_id;
						}else{
							car_id += goods_List[i].cart_id;
						}
					}
				}
				if(car_id.length <=0){
					uni.showToast({
						title:"请先选择货品再进行结算!",
						icon:"none"
					});
					return;
				}else{
					this.createOrderSession(car_id);
				}
			},
			//提交到后台创建session
			createOrderSession(car_id){
				request({
					url:"index.php?s=/wap/order/ordercreatesession",
					method:"POST",
					data:{tag:"cart",cart_id:car_id},
				}).then(res =>{
					if(res.data==1){
						uni.navigateTo({
							url:"/pages/components/pay/pay"
						})
					}
				});
			}
		},
		onLoad() {
			this.getGoods();
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	.check-title {
		box-sizing: border-box;
		padding: 0 30rpx;
		line-height: 70rpx;
		border-bottom: 1px solid #E5E5E5;
		background: #FFFFFF;
		.check {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.radio {
				font-size: 24rpx;
				color: #CCC;
				// width: 40rpx;
				// height: 40rpx;
			}
			.edit {
				color: #A4A4A4;
				font-size: 20rpx;
			}
		}
	}
	// 商品
	.goods-box {
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		margin-bottom: 80rpx;
		// border-bottom: 1px solid #E5E5E5;
		.goods {
			box-sizing: border-box;
			
			.product {
				box-sizing: border-box;
				padding: 30rpx;
				display: flex;
				border-bottom: 1px solid #E5E5E5;
				position: relative;
				// align-items: center;
				.product-checkbox {
					box-sizing: border-box;
					position: relative;
					margin-top: 30rpx;
				}
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
				.product-amount {
					position: absolute;
					right: 30rpx;
					bottom: 40rpx;
					box-sizing: border-box;
					border: 1px solid #E5E5E5;
					height: 30rpx;
					width: 150rpx;
					display: flex;
					height: 50rpx;
					align-items: center;
					text {
						font-size: 40rpx;
						flex: 1;
						text-align: center;
						height: 46rpx;
						line-height: 46rpx;
					}
					text:nth-child(1) {
						border-right: 1px solid #E5E5E5;
					}
					text:nth-child(3) {
						border-left: 1px solid #E5E5E5;
					}
					input {
						height: 42rpx;
						flex: 1.5;
						box-sizing: border-box;
						padding-left: 8rpx;
						height: 80%;
						text-align: center;
					}
				}
			}
		}
	}
	// 底部
	.btn {
		line-height: 90rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left:0;
		width: 100%;
		height: 90rpx;
		display: flex;
		.total {
			flex: 1;
			text-align: center;
			font-size: 30rpx;
			background: #6C2E2E;
			text:nth-child(1) {
				color: #885E5E;
			}
			text:nth-child(2) {
				color: #fff;
			}
		}
		.add {
			flex: 1;
			text-align: center;
			font-size: 30rpx;
			background: #B4302D;
			color: #fff;
		}
	}
</style>
