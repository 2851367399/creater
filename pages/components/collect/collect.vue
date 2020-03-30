<template>
	<view>
		<view class="check-title">
			<view class="check">
				<view class="radio">
					 <label>
						 <checkbox 
						 v-if="isShow" value="r1" 
						 :checked="allChecked" 
						 style="transform: scale(0.7)"
						 @click="allCheck()"
						 color="#C93A3A"/>
						 全选
						 </label>
				</view>
				<view class="edit" @click="edit()">
					<text v-if="!isShow">编辑</text>
					<text v-else @click="del()">删除</text>
				</view>
			</view>
		</view>
		<!-- 收藏商品列表 -->
		<view class="collect-box">
			<view class="collect">
				<block v-for="(item,index) in goodsList" :key="index">
					<view class="collect-item">
						<view class="radio" v-if="isShow" @click="checked(index)">
							<label>
								<checkbox value="r1" :checked="item.active"  style="transform: scale(0.7)" color="#C93A3A"/>
							</label>
						</view>
						<view class="img">
							<image :src="item.image" mode=""></image>
						</view>
						<view class="title">
							<text>{{item.title}}</text>
						</view>
						<view class="price">
							<text>{{item.price}}</text>
					<!-- 		<text>￥222</text> -->
						</view>
					</view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[
					{
						title: '莫次有机PWE活性美白洗面奶',
						price: '￥123',
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584766095774&di=b6cd9633fa22ac5d942d31113c1f4970&imgtype=0&src=http%3A%2F%2Fwww.szthks.com%2Flocalimg%2F687474703a2f2f6777312e616c6963646e2e636f6d2f62616f2f75706c6f616465642f69382f54314a3039714648526358585858585858585f2121302d6974656d5f7069632e6a7067.jpg',
						active: false
					},
					{
						title: '莫次有机PWE活性美白洗面奶',
						price: '￥100',
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584766095774&di=b6cd9633fa22ac5d942d31113c1f4970&imgtype=0&src=http%3A%2F%2Fwww.szthks.com%2Flocalimg%2F687474703a2f2f6777312e616c6963646e2e636f6d2f62616f2f75706c6f616465642f69382f54314a3039714648526358585858585858585f2121302d6974656d5f7069632e6a7067.jpg',
						active: false
					},
					{
						title: '莫次有机PWE活性美白洗面奶',
						price: '￥190',
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584766095774&di=b6cd9633fa22ac5d942d31113c1f4970&imgtype=0&src=http%3A%2F%2Fwww.szthks.com%2Flocalimg%2F687474703a2f2f6777312e616c6963646e2e636f6d2f62616f2f75706c6f616465642f69382f54314a3039714648526358585858585858585f2121302d6974656d5f7069632e6a7067.jpg',
						active: false
					},
					{
						title: '莫次有机PWE活性美白洗面奶',
						price: '￥177',
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584766095774&di=b6cd9633fa22ac5d942d31113c1f4970&imgtype=0&src=http%3A%2F%2Fwww.szthks.com%2Flocalimg%2F687474703a2f2f6777312e616c6963646e2e636f6d2f62616f2f75706c6f616465642f69382f54314a3039714648526358585858585858585f2121302d6974656d5f7069632e6a7067.jpg',
						active: false
					}
				],
				isShow: false,
				allChecked: false,
				total:0
			};
			
		},
		methods: {
			// 点击编辑
			edit(){
				this.isShow = !this.isShow;
			},
			// 点击全选，所有的商品选中或全不选
			allCheck() {
				this.allChecked = !this.allChecked;
				for(let i = 0;i < this.goodsList.length;i++) {
					this.goodsList[i].active = this.allChecked;
				}
			},
			// 点击商品的选中项
			checked(index) {
				this.goodsList[index].active = !this.goodsList[index].active;
				for(let i = 0;i < this.goodsList.length;i++) {
					if(!this.goodsList[i].active) {
						this.allChecked = false;
						break;
					}
					else {
						this.allChecked = true
					}
				}
			},
			// 点击删除
			del() {
				// 单一点击每个商品
				if(this.goodsList&&this.goodsList.length > 0) {
					for(let i = 0;i < this.goodsList.length;i++) {
						if(this.goodsList[i].active) {
							this.goodsList.splice(i,1)
							uni.showToast({
								title: '删除成功',
								icon: 'none'
							})
						}	
					}
				}
				// 点击全选
				if(this.allChecked) {
					this.goodsList = '';
					this.allChecked = false
				}
			}
		}
	}
</script>

<style lang="scss">
	.check-title {
		box-sizing: border-box;
		padding: 0 30rpx;
		line-height: 70rpx;
		border-bottom: 1px solid #E5E5E5;
		.check {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.radio {
				font-size: 24rpx;
				color: #CCC;
				// width: 40rpx;
				// height: 40rpx;
			}
			.edit {
				color: #A4A4A4;
				font-size: 20rpx;
			}
		}
	}
	.collect-box {
		box-sizing: border-box;
		.collect {
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			.collect-item {
				padding-bottom: 24rpx;
				box-sizing: border-box;
				width: 50%;
				border-right: 1px solid #E5E5E5;
				border-bottom: 1px solid #E5E5E5;
				position: relative;
				.radio {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 99;
				}
				.img {
					box-sizing: border-box;
					width: 100%;
					height: 300rpx;
					image {
						width: 100%;
						height: 100%;
						display: block;
					}
				}
				.title {
					font-size: 30rpx;
					box-sizing: border-box;
					padding: 0 24rpx;
					color: #444444;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.price {
					font-size: 30rpx;
					box-sizing: border-box;
					padding: 0 24rpx;
					text:nth-child(2) {
						font-size: 26rpx;
						color: #B0B0B0;
						text-decoration: line-through;
						margin-left: 18rpx;
					}
				}
			}
			.collect-item:nth-child(2n) {
				border-right: 0;
			}
		}
	}
	
</style>
