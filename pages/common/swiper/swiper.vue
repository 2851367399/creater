<template>
	<view class="swiper-box">
		<swiper indicator-dots indicator-color="rgba(187,187,187,0.4)" indicator-active-color="rgba(255,255,255,0.7)">
			<block v-if="imgUrl && imgUrl.length > 0">
				<swiper-item v-for="(item,index) in imgUrl" :key="index">
					<view>
						<image :src="item.adv_image"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			imgUrl: {
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
	.swiper-box {
		box-sizing: border-box;
		padding: 21rpx 21rpx 0 21rpx;
		swiper {
			box-sizing: border-box;
			width: 100%;
			height: 290rpx;
			swiper-item {
				box-sizing: border-box;
				width: 100%;
				view {
					box-sizing: border-box;
					height: 290rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
					
			}
		}
	}
</style>
