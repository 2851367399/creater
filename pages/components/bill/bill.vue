<template>
	<view>
		<view class="data-time">
			<view class="data">
				<view>
					<view class="uni-padding-wrap" style="display: flex;" >
						<view style="flex:1" @click="openView"  class="uni-title">{{year}}年{{month}}月</view>
						<view @click="openType" style="flex:1" class="uni-title">{{sType}}</view>
					</view>
					<!-- <view class="uni-padding-wrap">
						<view @click="openView" class="uni-title">{{year}}年{{month}}月</view>	
					</view> -->
				</view>
				<view class="method">
					<view class="expend">
						<text>支出￥{{expense}}元</text>
					</view>
					<view class="icoming">
						<text>收入￥{{income}}元</text>
						<image src="/static/images/icon-right.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="shop-list">
			<block v-for="(item,index) in list" :key="index">
			<view class="shop-item">
				<view class="shop-img">
					<image src="/static/images/user-default.jpeg" mode=""></image>
				</view>
				<view class="shop-main">
					<view class="title">
						<text>{{item.text}}</text>
					</view>
					<view class="time">
						<text>{{item.create_date}}</text>
					</view>
				</view>
				<view class="shop-price">
					<view class="price">
						<text>{{item.number}}</text>
					</view>
					<view class="used">
						<!-- <text>(已使用优惠券抵扣10)</text> -->
					</view>
				</view>
			</view>
			</block>
		</view>
		<view class="date-picker" v-if="visible">
			<view class="date-picker-line">
				<view @click="changeCancel" class="date-picker-cancel">取消</view>
				<view @click="changeOk" class="date-picker-ok">确定</view>
			</view>
			<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
			</picker-view>
		</view>
		<view class="date-picker" v-if="visible_type">
			<view class="date-picker-line">
				<view @click="typeChangeCancel" class="date-picker-cancel">取消</view>
				<view @click="typeChangeOk" class="date-picker-ok">确定</view>
			</view>
			<picker-view :indicator-style="indicatorStyle" :value="value" @change="typeBindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in type" :key="index">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			return {
				page:1,
				years,
				year,
				type : ["余额流水","折扣券流水","现金券流水"],
				months,
				month,
				expense:0,
				income:0,
				list:[],
				chooseYear:'',
				chooseMonth:'',
				chooseType:"",
				sType:"",
				value: [9999, month - 1],
				visible: false,
				visible_type:false,
				resType:1,
				indicatorStyle: `text-align:center;width:100%;height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			};
		},
		onLoad:function(){
			this.getList();
			this.sType=this.type[0];
		},
		methods:{
			openView:function(){
				console.log(this.years);
				this.visible = true;
			},
			openType:function(){
				this.visible_type=true;
			},
			bindChange: function(e) {
				const val = e.detail.value
				this.chooseYear = this.years[val[0]]
				this.chooseMonth = this.months[val[1]]
			},
			typeBindChange:function(e){
				const val = e.detail.value
				this.chooseType = this.type[val[0]]
			},
			
			typeChangeCancel:function(){
				this.visible_type = false;
			},
			changeOk:function(){
				this.year = this.chooseYear;
				this.month = this.chooseMonth;
				if(this.resType==1){
					this.getList();
				}else if (this.resType ==3){
					this.getList2();
				}else{
					this.getList2();
				}
				this.changeCancel();
			},
			typeChangeOk:function(){
				this.sType = this.chooseType;
				console.log(this.sType);
				this.typeChangeCancel();
				if(this.sType == "余额流水"){
					this.resType=1;
					this.getList();
				}else if(this.sType == "折扣券流水"){
					this.resType=3;
					this.getList2();
				}else{
					this.resType=4;
					this.getList2();
				}
				
				
			},
			changeCancel:function(){
				this.visible = false;
			},
			getList:function(){
				let that = this;
				request({
					url: 'index.php?s=/wap/member/apiBalanceList',
					data:{
						year:that.year,
						month:that.month,
					},
					method:"POST",
				}).then(function(res){
					console.log(res);
					that.list = res.data.list;
					that.expense = res.data.expense;
					that.income = res.data.income;
				});
			},
			getList2:function(){
				let that = this;
				request({
					url: 'index.php?s=/wap/member/Apin_money',
					data:{
						year:that.year,
						month:that.month,
						type:that.resType,
					},
					method:"POST",
				}).then(function(res){
					console.log(res);
					that.list = res.data.list;
					that.expense = res.data.expense;
					that.income = res.data.income;
				});
			}
		}
	}
</script>

<style lang="scss">
	.date-picker{
		width: 100%;
		position: fixed;
		bottom:0;
		background-color: #fff;
	}
	.date-picker-line{
		width:90%;
		overflow: hidden;
		padding:0 5%;
		line-height: 80upx;
		border-top: 1upx solid #eee;
		border-bottom: 1upx solid #eee;
	}
	.date-picker-cancel{
		float: left;
	}
	.date-picker-ok{
		color:seagreen;
		float: right;
	}
	picker-view {
	    width: 90%;
		padding:0 5%;
	    height: 300upx;
	    margin-top:20upx;
	}
	.item{
		text-align:center;
	}
	.data-time {
		box-sizing: border-box;
		height: 105rpx;
		background: #EFEFF4;
		font-size: 24rpx;
		padding: 10px 24rpx 0;

		.data {
			box-sizing: border-box;

			view:nth-child(1) {
				color: #444444;
			}

			.method {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				margin-top: 8rpx;

				.expend {
					color: #BBBBBB;
					flex: 1;
				}

				.icoming {
					color: #BBBBBB;
					flex: 1;
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}

	.shop-list {
		box-sizing: border-box;

		.shop-item {
			box-sizing: border-box;
			padding: 38rpx 30rpx 18rpx 30rpx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #EFEFF4;

			.shop-img {
				width: 60rpx;
				height: 60rpx;
				margin-right: 28rpx;

				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
			}

			.shop-main {
				box-sizing: border-box;
				flex: 1;

				.title {
					font-size: 30rpx;
					color: #2B2B2B;
				}

				.time {
					font-size: 24rpx;
					color: #9F9F9F;
				}
			}

			.shop-price {
				box-sizing: border-box;

				.price {
					font-size: 30rpx;
					color: #777777;
				}

				.used {
					font-size: 20rpx;
					color: #CECECE;
				}
			}
		}
	}
</style>
