<template>
	<view>
		<!-- 地址列表 -->
		<view class="address-list">
			<block v-for="(item,index) in addressList" :key="index">
			<view class="address-item">
				<view class="userInfo">
					<text>{{item.consigner}}</text>
					<text>{{item.mobile}}</text>
				</view>
				<view class="address">
					<text decode="true">{{item.address_info}} {{item.address}}</text>
				</view>
				<view class="edit">
					<view class="edit-left">
						<label class="radio" ><radio @click="setDefault(item.id)" :checked="item.is_default==1" color="#C93A3A" style="transform:scale(0.7)"/>设为默认</label>
					</view>
					 <view class="edit-right">
						<text @click="deleteAddress(item.id)">删除</text>
						<!-- 跳转到edit-address页面 -->
						<text @click="editAddress(item.id)">编辑</text>
					 </view>
				</view>
			</view>
			</block>
		</view>
		<view class="add-newAddress">
			<!-- 跳转到new-address -->
			<button type="warn" @click="newAddress()">添加新地址</button>
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				addressList: {},
				page:1,
			};
		},
		onShow() {
			this.getAddressList(this.page);
		},
		methods: {
			//获取数据
			getAddressList(page){
				let that = this;
				request({
					url: 'index.php?s=/wap/member/memberAddress',
				})
				.then(res => {
					console.log(res);
					let addressList = res.data.list.data;
					that.addressList = addressList;
				});
			},
			//设置默认收货
			setDefault(id){
				let that = this;
				request({
					url:'index.php?s=/wap/member/updateAddressDefault',
					method:'POST',
					data:{
						id:id
					}
				}).then(res=>{
					this.getAddressList(this.page);
				});
			},
			// 点击跳转到new-address
			newAddress(id) {
				uni.navigateTo({
					url: '/pages/components/new-address/new-address'
				})
			},
			// 点击跳转到edit-address页面
			editAddress(id) {
				uni.navigateTo({
					url:'/pages/components/new-address/new-address?id='+id
				})
			},
			//删除地址
			deleteAddress(id){
				let that = this;
				uni.showModal({
				    title: '提示',
				    content: '确定要删除该地址吗？',
				    success: function (res) {
				        if (res.confirm) {
				            request({
				            	url:'index.php?s=/wap/member/memberAddressDelete',
				            	method:'POST',
				            	data:{
				            		id:id
				            	}
				            }).then(res=>{
				            	that.getAddressList(that.page);
				            });
				        }
				    }
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #EFEFF4;
	}
	.address-list {
		box-sizing: border-box;
		.address-item {
			box-sizing: border-box;
			margin-top: 20rpx;
			padding: 30rpx;
			background: #fff;
			.userInfo {
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				margin-bottom: 24rpx;
				text:nth-child(2) {
					color: #444;
				}
			
			}
			.address {
				font-size: 26rpx;
				color: #909090;
				margin-bottom: 24rpx;
			}
			.edit {
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				.edit-left {
					font-size: 24rpx;
					color: #AAAAAA;
				}
				.edit-right {
					box-sizing: border-box;
					display: flex;
					text {
						box-sizing: border-box;
						width: 80rpx;
						height: 40rpx;
						font-size: 20rpx;
						line-height: 38rpx;
						border: 1px solid #EFEFEF;
						color: #A9A9A9;
						display: inline-block;
						text-align: center;
					}
					text:nth-child(1) {
						margin-right: 10rpx;
					}
				}
			}
		}
	}
	.add-newAddress {
		box-sizing: border-box;
		padding: 40rpx 30rpx 30rpx 30rpx;
		color: #fff;
		font-size: 30rpx;
		button {
			width: 100%;
			height: 90rpx;
		}
	}
</style>
