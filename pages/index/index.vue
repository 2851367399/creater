<template>
	<view>
		<!-- 导航 -->
		<index-nav @goCart="goCart()"></index-nav>
		<!-- 分割线 -->
		<view class="cut-line"></view>
		<!-- swiper -->
		<Swiper :imgUrl="imgUrl"></Swiper>
		<index-choose :chooseList="chooseList"></index-choose>
		<!-- 标题栏 -->
		<index-title src="/static/images/VIP.png" text="专属  店下推荐" wx="	width: 60rpx;height: 40rpx"></index-title>
		<!-- Vip会员专属产品 -->
		<index-vip :vipList="vipList"></index-vip>
		<!-- 分割线 -->
		<index-title src="/static/images/sale.png" text="折扣专区" distance="margin-left: 10rpx" wx="width: 80rpx;height: 50rpx"></index-title>
		<!-- 折扣区 -->
		<index-discount :discountList="discountList"></index-discount>
		<!-- 分割线 -->
		<index-title src="/static/images/new.png" text="新品上架" distance="margin-left: 10rpx" wx="	width: 60rpx;height: 40rpx"></index-title>
		<!-- 新品上架 -->
		<index-news :newsList="newsList" :isMarginTop="isMarginTop"></index-news>
		<!-- 分割线 -->
		<index-title src="/static/images/tuijian.png" text="商家推荐" distance="margin-left: 10rpx" wx="	width: 50rpx;height: 50rpx"></index-title>
		<!-- 商家推荐 -->
		<index-recommend :recommendList="recommendList"></index-recommend>
	</view>
</template>

<script>
	import IndexNav from '../components/index-nav/index-nav.vue'
	import Swiper from '../common/swiper/swiper.vue'
	import IndexChoose from '../components/index-choose/index-choose.vue'
	import IndexTitle from '../components/index-title/index-title.vue'
	import IndexVip from '../components/index-vip/index-vip.vue'
	import IndexDiscount from '../components/index-discount/index-discount.vue'
	import IndexNews from '../common/goods-list/goods-list.vue'
	import IndexRecommend from '../components/index-recommend/index-recommend.vue'
	import {getSwiper,request} from '../request.js'
	export default {
		data() {
			return {
				// swiper模拟数据
				imgUrl: [],
				// chooseList数据
				chooseList: [
					{
						src: '/static/images/scan.png',
						text: '扫一扫',
					},
					{
						src: '/static/images/discount.png',
						text: '折扣券',		
					},
					{
						src: '/static/images/hot.png',
						text: '店下爆品',
					},
					{
						src: '/static/images/online.png',
						text: '线下好货'
					},
					{
						src: '/static/images/location.png',
						text: '折扣专区',
					},
				],
				// 会员专属区域模拟数据
				vipList: [
					{
						src: "/static/images/vipGoods.png",
						title: "品质生活玻璃藤条",
						oldPrice: 79.9,
						newPrice: 69.9
					},
					{
						src: "/static/images/vipGoods.png",
						title: "品质生活玻璃藤条",
						oldPrice: 79.9,
						newPrice: 0
					},
					{
						src: "/static/images/vipGoods.png",
						title: "品质生活玻璃藤条",
						oldPrice: 79.9,
						newPrice: 69.9
					},
					{
						src: "/static/images/vipGoods.png",
						title: "品质生活玻璃藤条",
						oldPrice: 79.9,
						newPrice: 69.9
					},
					{
						src: "/static/images/vipGoods.png",
						title: "品质生活玻璃藤条",
						oldPrice: 79.9,
						newPrice: 69.9
					}
				],
				// 折扣区模拟数据
				discountList: ["/static/images/discount-02.png","/static/images/discount-03.png",
				"/static/images/discount-04.png","/static/images/discount-05.png"],
				// 新品上架模拟数据
				isMarginTop: true,
				newsList: [],
				// 推荐商家模拟数据
				recommendList: [
					{
						topic: "/static/images/logo_03.png",
						title: "犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃",
						rate: 3.5,
						price: 52,
						distance: 888,
						main: "烤鱼",
						area: "大良",
						isOpen: true,
						ranking: "大良新城区烤鱼第7名",
						des: "主菜牛娃份量很足够",
						groupInfo: "2-4人餐75元，双人餐86.8元",
						ticketInfo: "88.8代100元"
					},
					{
						topic: "/static/images/logo_03.png",
						title: "犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃犀利娃",
						rate: 4.0,
						price: 52,
						distance: 888,
						main: "烤鱼",
						area: "大良",
						isOpen: false,
						ranking: "大良新城区烤鱼第7名",
						des: "",
						groupInfo: "2-4人餐75元，双人餐86.8元",
						ticketInfo: "88.8代100元"
					}
				]
				
			}
		},
		components: {
			IndexNav,
			Swiper,
			IndexChoose,
			IndexTitle,
			IndexVip,
			IndexDiscount,
			IndexNews,
			IndexRecommend
		},
		// 模拟处理商家评分
		created() {
		// console.log(getCurrentPages()[0].$route.meta.pagePath)
		},
		onLoad() {
			// 请求数据
			request({
				url: 'index.php?s=/wap/index/index',
			})
			.then(res => {
				// 存储轮播图数据
				let imgUrl = res.data.plat_adv_list.adv_list;
				// 存储新品上架数据
				let newsList = res.data.goods_list.data;
				// 存储商家店铺数据
				let recommendList = res.data.shop_list.data;
				// 处理轮播图图片
				for(let i = 0;i < imgUrl.length;i++) {
					imgUrl[i].adv_image = this.$api + imgUrl[i].adv_image
				}
				this.imgUrl = imgUrl
				// 处理新品上架图片
				for(let j = 0;j < newsList.length;j++) {
					newsList[j].pic_cover_small = this.$api + newsList[j].pic_cover_small
				}
				this.newsList = newsList;
				// 处理店家图片
				for(let z = 0;z < recommendList.length;z++) {
					recommendList[z].shop_logo = this.$api + recommendList[z].shop_logo
				}
				this.recommendList = recommendList;
			});
		
		},
		methods: {
			goCart() {
				uni.navigateTo({
					url: '/pages/components/cart/cart'
				})
			}
		},
	}
</script>

<style lang="scss">
	.cut-line {
		width: 100%;
		height: 4rpx;
		background: #E5E5E5;
	}
	
	


	

</style>
