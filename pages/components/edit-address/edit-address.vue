<template>
	<view>
		<view class="address-box">
			<view class="address-item">
				<view>
					<text>收货人</text>
				</view>
				<input type="text" value="" placeholder="请输入收货人姓名" placeholder-class="placeholder"/>
			</view>
			<view class="address-item">
				<view>
					<text>电话号码</text>
				</view>
				<input type="text" value="" placeholder="请输入电话号码" placeholder-class="placeholder"/>
			</view>
			<view class="address-item">
				<view>
					<text>所在地区</text>
				</view>
				<input type="text" value="" placeholder="请输入城市区" placeholder-class="placeholder"/>
			</view>
			<view class="address-item">
				<view>
					<text>详细信息</text>
				</view>
				<input type="text" value="" placeholder="请输入详细地址" placeholder-class="placeholder"/>
			</view>
			<view class="address-item default">
				<view>
					<text>设为默认</text>
				</view>
				<label class="radio"><radio  checked="" color="#C93A3A"/></label>
			</view>
		</view>
		<view class="save">
			<!-- 跳转到address页面 -->
			<button type="warn" @click="address()">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 跳转到address页面
				address() {
					console.log(111)
					uni.navigateBack({
						delta: 1
					})
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
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
