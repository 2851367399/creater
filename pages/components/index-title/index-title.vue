<template>
	<view class="title-box" >
		<view class="title">
			<image :src="src" :style="wx"></image>
			<text :style="distance">{{text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
			},
			text: {
				type: String,
			},
			distance: {
				type:String,
				default: ''
			},
			wx: {
				type: String
			}
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.title-box {
		box-sizing: border-box;
		padding: 0 16rpx;
		.title {
			box-sizing: border-box;
			padding: 0 14rpx;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #979797;
			position: relative;
			image {
				vertical-align: middle;
			
			}
			text {
				font-size: 32rpx;
				color: #444444;
			}
		}
		.title::before {
			content: '';
			width: 0;
			height: 0;
			position: absolute;
			left: 20rpx;
			bottom: -3rpx;
			border: 20rpx solid;
			border-color:  transparent transparent #979797 transparent;
		}
		.title::after {
			content: '';
			width: 0;
			height: 0;
			position: absolute;
			left: 24rpx;
			bottom: -3rpx;
			border: 18rpx solid;
			border-color: transparent transparent #fff transparent;
		}
	}
</style>
