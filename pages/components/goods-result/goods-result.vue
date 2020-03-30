<template>
	<view>
		<search :flag="flag"></search>
		<view class="search-nav">
			<block v-for="(item,index) in navList" :key="index">
				<view>
					<text>{{item}}</text>
				</view>
			</block>
		</view>
		<goods-list :newsList="newsList" :isMarginTop="isMarginTop"></goods-list>
	</view>
</template>

<script>
	import Search from '../../common/search/search.vue'
	import GoodsList from '../../common/goods-list/goods-list.vue'
	export default {
		components: {
			Search,
			GoodsList
		},
		data() {
			return {
				flag: false,
				isMarginTop: false,
				navList:['店下','线上','销量','价格'],
				// 搜索结果模拟数据
				newsList: [
					{
						src: "/static/images/newGoods_03.png",
						title: "莫次有机PWE活性美白洗面奶",
						newPrice: 169,
						oldPrice: 133
					},
					{
						src: "/static/images/newGoods_03.png",
						title: "莫次有机PWE活性美白洗面奶",
						newPrice: 169,
						oldPrice: 133
					},
					{
						src: "/static/images/newGoods_03.png",
						title: "莫次有机PWE活性美白洗面奶",
						newPrice: 169,
						oldPrice: 133
					},
					{
						src: "/static/images/newGoods_03.png",
						title: "莫次有机PWE活性美白洗面奶",
						newPrice: 169,
						oldPrice: 133
					},
				],
			};
		}
	}
</script>

<style lang="scss">
.search-nav {
	 box-sizing: border-box;
	 line-height: 85rpx;
	 border-bottom: 1px solid #E5E5E5;
	 color: #686868;
	 font-size: 28rpx;
	 display: flex;
	 view {
		 flex: 1;
		 border-right: 1px solid #E5E5E5;
		 box-sizing: border-box;
		 text-align: center;
	 }
	 view:last-child {
		 border-right: 0;
	 }
 }
</style>
