<template>
	<view>
		<view class="cu-tabbar-height"></view>
		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item.id)">
				<view class="image-wrapper">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<span>
					<text class="saleNum"> 销量 {{item.saleNum}} </text>
				</span>
				<text class="title clamp">{{item.name}}</text>
				<text class="price">￥{{item.price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsApi from '../../api/goods'

	export default {
		data() {
			return {
				goodsList: [],
				goodsInput:''
			}
		},
		onLoad() {
			this.loadHotSaleGoods();
		},
		methods: {
			// 获取热卖商品
			async loadHotSaleGoods() {
				const res = await goodsApi.hotSaleGoods();
				if (res.code === 200) {
					this.goodsList = res.data;
					console.log(res.data)
				} else {
					uni.showToast({
						icon: 'none',
						title: '加载失败'
					});
				}
			},
			navToDetailPage(productId) {
				uni.navigateTo({
					url: '/pages/product/product?id=' + productId
				})
			},
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				console.log(this.goodsInput)
				goodsApi.getGoodsByName(this.goodsInput).then(res=>{
					if(res.code === 200){
						console.log("success")
						this.goodsList = res.data;
					}
				})
			}
		},
		onNavigationBarSearchInputChanged(val) {
			//console.log(val)
			this.goodsInput = val.text;
			console.log(this.goodsInput)
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;
		margin-top: 20px;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price {
			font-size: $font-lg;
			color: #fa436a;
			line-height: 1;
		}

		.saleNum {
			font-size: $font-sm;
			color: #808080;
			line-height: 1;
			float: right;
			margin-top: 8px;
			margin-right: 10px;
		}
	}
</style>
