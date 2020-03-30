<template>
	<view class="choose-box">
		<block v-for="(item,index) in chooseList" :key="index">
			<view class="choose">
				<view>
					<image :src="item.src"></image>
					<view>{{item.text}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			chooseList: {
				type: Array
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.choose-box {
		box-sizing: border-box;
		display: flex;
		padding: 36rpx 52rpx 50rpx 52rpx;
		align-items: center;
		.choose {
			box-sizing: border-box;
			flex: 1;
			margin-right: 6rpx; 
			width: calc(20% - 5rpx);
			height: 126rpx;
			background: #F5F5F5;
			view {
				position: relative;
				top: 50%;
				transform: translateY(-42%);
				text-align: center;
				image {
					// 50/50  62/42 60/56 55/57 44/58
					width: 50rpx;
					height: 50rpx;
				}
				view {
					font-size: 20rpx;
					text-align: center;
					color: #626262;
					margin-top: 10rpx;
				}
			}
		}
		.choose:last-child {
			margin-right: 0;
		}
	}
</style>
