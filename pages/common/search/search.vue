<template>
	<view>
		<view class="classify-search">
			<view class="search">
				<view class="search-input">
					<image src="/static/images/search.png"></image>
					<input type="text"  placeholder="输入您要搜索的宝贝.." placeholder-class="placeholder" @input="handleSearch"/>
				</view>
				<view class="search-img">
					<image v-if="!flag" src="/static/images/message-active.png" ></image>
					<text v-else>取消</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 用于判定当前搜索栏右边是显示文字还是显示图标
		props: {
			flag: {
				type: Boolean
			}
		},
		data() {
			return {
			};
		},
		methods:{
			handleSearch(event) {
				// console.log(event);
				this.text = event.detail.value
				this.$emit('input', event.detail.value)
			}
		}
	}
</script>

<style lang="scss">
.classify-search {
	box-sizing: border-box;
	padding: 0 30rpx;
	border-bottom: 1px solid #E5E5E5;
	background: #fff;
	.search {
		box-sizing: border-box;
		height: 88rpx;
		line-height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.search-input {
			flex: 1;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			image {
				width: 35rpx;
				height: 35rpx;
			}
			input {
				flex: 1;
				box-sizing: border-box;
				margin-left: 10rpx;
			}
		}
		.search-img {
			box-sizing: border-box;
			border-left: 1px solid #E5E5E5;
			text {
				margin-left: 36rpx;
				font-size: 28rpx;
				color: #9D9D9D;
			}
			image {
				width: 55rpx;
				height: 50rpx;
				position: relative;
				margin-left: 36rpx;
				top: 4rpx;
			}
		}
	}
}
		.placeholder {
			font-size: 30rpx;
			color: #AAAAAA;
		}
</style>
