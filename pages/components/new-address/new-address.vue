<template>
	<view>
		<view class="address-box">
			<view class="address-item">
				<view>
					<text>收货人</text>
				</view>
				<input type="text" v-model="consigner" placeholder="请输入收货人姓名" placeholder-class="placeholder"/>
			</view>
			<view class="address-item">
				<view>
					<text>电话号码</text>
				</view>
				<input type="text" v-model="mobile" placeholder="请输入电话号码" placeholder-class="placeholder"/>
			</view>
			<view class="address-item">
				<view>
					<text>所在地区</text>
				</view>
				<picker @change="bindSelectProvince" :value="selectProvince" :range="province" :range-key="'province_name'">
					<view class="uni-input">{{province[selectProvince].province_name}}</view>
				</picker>
				<picker @change="bindSelectCity" :value="selectCity" :range="city" :range-key="'city_name'">
					<view class="uni-input">{{city[selectCity].city_name}}</view>
				</picker>
				<picker @change="bindSelectDistrict" :value="selectDistrict" :range="district" :range-key="'district_name'">
					<view class="uni-input">{{district[selectDistrict].district_name}}</view>
				</picker>
				<!-- <input type="text" value="" placeholder="请输入城市区" placeholder-class="placeholder"/> -->
			</view>
			<view class="address-item">
				<view>
					<text>详细信息</text>
				</view>
				<input type="text" value="" v-model="address" placeholder="请输入详细地址" placeholder-class="placeholder"/>
			</view>
			<view class="address-item default">
				<view>
					<text>设为默认</text>
				</view>
				<label class="radio"><radio @click="setDefault" :checked="is_default" color="#C93A3A"/></label>
			</view>
		</view>
		<view class="save">
			<!-- 跳转到address页面 -->
			<button type="warn" @click="saveAddress()">保存</button>
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				province: [{'province_name':'请选择'}],
				city:  [{'city_name':'请选择'}],
				district: [{'distrcit_name':'请选择'}],
				provinceId:[],
				cityId:[],
				districtId:[],
				selectProvince:0,
				selectCity:0,
				selectDistrict:0,
				consigner:'',
				mobile:'',
				address:'',
				is_default:false,
				address_id:0,
				address_info:[],
			};
		},
		onLoad(params){
			if(typeof params.id != 'undefined'){
				this.address_id = params.id;
				this.getAddress(this.address_id);
			}else{
				this.getProvince();
			}
		},
		methods: {
			bindSelectProvince(e){
				this.selectProvince = e.detail.value;
				this.getCity();
			},
			bindSelectCity(e){
				this.selectCity = e.detail.value;
				this.getDistrict();
			},
			bindSelectDistrict(e){
				this.selectDistrict = e.detail.value;
			},
			getProvince(){
				let that = this;
				let address_id = this.address_id;
				let address_info = this.address_info;
				request({
					url:'index.php?s=/wap/index/getProvince',
					method:'POST',
				}).then(res=>{
					let province = res.data;
					console.log(address_info);
					if(address_id>0){
						for(var i in province){
							console.log(province[i].province_id + ' - ' + address_info.province);
							if(province[i].province_id==address_info.province){
								that.selectProvince = i;
							}
						}
					}
					that.province = province;
					that.getCity();
				});
			},
			getCity(){
				let that = this;
				let address_id = this.address_id;
				let address_info = this.address_info;
				request({
					url:'index.php?s=/wap/index/getCity',
					data:{
						province_id:that.province[that.selectProvince].province_id
					},
					method:'POST',
				}).then(res=>{
					let city = res.data;
					if(address_id>0){
						for(var i in city){
							console.log(city[i].province_id + ' - ' + address_info.province);
							if(city[i].city_id==address_info.city){
								that.selectCity = i;
							}
						}
					}
					that.city = city;
					that.getDistrict();
				});
			},
			getDistrict(){
				let that = this;
				let address_id = this.address_id;
				let address_info = this.address_info;
				request({
					url:'index.php?s=/wap/index/getDistrict',
					data:{
						city_id:that.city[that.selectCity].city_id
					},
					method:'POST',
				}).then(res=>{
					let district = res.data;
					if(address_id>0){
						for(var i in district){
							console.log(district[i].district_id + ' - ' + address_info.district);
							if(district[i].district_id==address_info.district){
								that.selectDistrict = i;
							}
						}
					}
					that.district = district;
				});
			},
			getAddress(id){
				let that = this;
				request({
					url:'index.php?s=/wap/member/getMemberAddressDetail',
					method:'POST',
					data:{
						id:id
					}
				}).then(function(res){
					that.address_info = res.data;
					that.consigner = res.data.consigner;
					that.mobile = res.data.mobile;
					that.address = res.data.address;
					that.is_default = res.data.is_default==1?true:false;
					that.getProvince();
				});
			},
			setDefault(e){
				console.log(this.is_default);
				let is_default = this.is_default;
				if(is_default==false){
					this.is_default = true;
				}else{
					this.is_default = false;
				}
			},
			// 跳转到address页面
			saveAddress() {
				let that = this;
				let data = {
					id:that.address_id,
					consigner:that.consigner,
					mobile:that.mobile,
					phone:that.mobile,
					address:that.address,
					province:that.province[that.selectProvince].province_id,
					city:that.city[that.selectCity].city_id,
					district:that.district[that.selectDistrict].district_id,
					is_default:that.is_default,
				}
				request({
					url:'index.php?s=/wap/member/addMemberAddress',
					data:data,
					method:"POST",
				}).then(res=>{
					uni.showToast({
						title:'添加成功',
						icon: 'success'
					});
					uni.navigateBack({
						delta:1
					})
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
		box-sizing: border-box;
		padding-bottom: 90rpx;
	}
	.address-box {
		box-sizing: border-box;
		.address-item {
			box-sizing: border-box;
			padding: 30rpx;
			border-bottom: 1px solid #E7E7E7;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			view {
				width: 165rpx;
				text {
					color: #000;
				}
			}
			input {
				flex: 1;
			}
		}
		.address-item.default {
			margin-top: 20rpx;
		}
	}
	.save {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		font-size: 30rpx;
		color: #fff;
		z-index: 2;
		button {
			width: 100%;
			height: 100%;
		}
	}
	.placeholder {
		font-size: 30rpx;
		color: #B7B7B7;
	}
</style>
