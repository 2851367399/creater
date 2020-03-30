<template>
	<view class="container">
		<search v-model="text" :flag="flag"></search>
		<view class="list-box">
			<block v-for="(item,index) in list" :key="item.id">
				<!-- 点击跳转到goodsResult页面 -->
				<view class="list-item" @click="handleClick">
					<text>{{item.name}}</text>
					<image src="/static/images/icon-right.png"></image>
				</view>
			</block>
		
		</view>
	</view>
</template>

<script>
	import Search from '../../common/search/search.vue'
	export default {
		data() {
			return {
				flag: true,
				text: '',
				list: [
					{
						name: '全部商品',
						id: 1
					},
					{
						name: '苹果',
						id: 2
					},
					{
						name: '贡橙',
						id: 3
					},
					{
						name: '其他',
						id: 4
					},
				]
			};
		},
		components:{
			Search
		},
		methods:{
			handleClick() {
				uni.navigateTo({
					url:'../goods-result/goods-result'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background: #EFEFF4;
		.list-box {
			box-sizing: border-box;
			margin-top: 20rpx;
			font-size: 30rpx;
			color: #505050;
			line-height: 85rpx;
			.list-item {
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				border-bottom: 1px solid #E7E7E7;
				text {
					flex: 1;
				}
				image {
					width: 24rpx;
					height: 24rpx;
				}
			}
		}
	}
</style>
