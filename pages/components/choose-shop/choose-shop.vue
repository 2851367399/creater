<template>
	<view>
		<!-- 城市选择 -->
		<view class="city-choose">
			<view class="choose-item">
				<text>城市选择</text>
					<view class="city">
					<input placeholder="请填写城市" placeholder-class="placeholder" style="display: inline-block;text-align: right;"/>
					<image src="/static/images/icon-right.png" mode=""></image>
				</view>
			</view>
			
			<view class="choose-item">
					<text>选择门店</text>
					<view class="city">
						<picker @change="bindPickerChange" :value="index" :range="shopArray">
							<text style="color: #AAAAAA;">请选择门店</text>
							<image src="/static/images/icon-right.png" mode="">{{shopArray[index]}}</image>
						</picker>	
				</view>
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopArray: ['海珠门店','天河门店','白云门店'],
				index: 1
			};
		},
		methods: {
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	
	.city-choose {
		box-sizing: border-box;
		background: #fff;
		.choose-item {
			box-sizing: border-box;
			padding: 30rpx;
			border-bottom: 1px solid #E5E5E5;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text:nth-child(1) {
				flex: 1;
			}
			.city {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				input {
					flex: 1;
				}
				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 12rpx;
					// position: relative;
					// top: 4rpx;
				}
			}
		}
	}
	.placeholder {
		font-size: 30rpx;
	}

</style>
