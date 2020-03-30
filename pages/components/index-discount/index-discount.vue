<template>
	<view class="discount-box">
		<view class="discount">
			<image src="/static/images/discount-01.png" class="topic"></image>
			<view>
				<block v-for="(item,index) in discountList" :key="index">
					<view>
						<image :src="item"></image>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			discountList: Array
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.discount-box {
		box-sizing: border-box;
		padding: 18rpx 40rpx 60rpx 40rpx;
		.discount {
			box-sizing: border-box;
			.topic {
				width: 100%;
				height: 192rpx;
			}
			view {
				overflow: hidden;
				display: block;
				box-sizing: border-box;
				list-style: none;
				view {
					float: left;
					box-sizing: border-box;
					margin-bottom: 10rpx;
					width: calc(50% - 5rpx);
					image {
						display: block;
						width: 100%;
						height: 192rpx;
					}
				}
				view:nth-child(2n-1) {
					margin-right: 5rpx;
				}
				view:nth-child(2n) {
					margin-left: 5rpx;
				}
			}
		}
	}
</style>
