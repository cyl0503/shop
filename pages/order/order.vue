<template>
	<view class="content">
		<!-- tab 四个状态 -->
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<!-- 每页下具体的内容 -->
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadDataByState">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<!-- 订单列表 item订单里的每项-->
					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">
						<view class="i-top b-b">
							<text class="time">{{item.order.createTime}}</text>
							<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
							<!-- 判断该订单是否取消 -->
							<text v-if="item.order.orderStatus===3" class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(index)"></text>
						</view>
						<!-- 如果一个订单是多个商品 -->
						<scroll-view v-if="item.goodsList.length > 1" class="goods-box" scroll-x>
							<view v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex" class="goods-item">
								<image class="goods-img" :src="goodsItem.img" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<!-- 订单只有一个商品 -->
						<view v-if="item.goodsList.length === 1" class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.goodsList"
						 :key="goodsIndex">
							<image class="goods-img" :src="goodsItem.img" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.goodsName}}</text>
								<text class="attr-box"> x {{goodsItem.goodsNumber}}</text>
								<text class="price">{{goodsItem.totalPrice}}</text>
							</view>
						</view>
						<view class="price-box">
							共
							<text class="num">{{item.goodsList.length}}</text>
							件商品 实付款
							<text class="price">{{item.order.totalPrice}}</text>
						</view>
						
						<view class="action-box b-t" v-if="item.order.orderStatus === 0">
							<button class="action-btn" @click="updateStatus(item.order.id,3)">取消订单</button>
							<button class="action-btn recom" @click="pay(item.order.id,item.order.totalPrice)">立即支付</button>
						</view>
						<view class="action-box b-t" v-else-if="item.order.orderStatus === 1">
							<button class="action-btn recom" @click="updateStatus(item.order.id,2)">确认收货</button>
						</view>
					</view>
					<!-- 加载的 -->
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	import orderApi from '../../api/order.js'
	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 9,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 0,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '已完成',
						loadingType: 'more',
						orderList: []
					}
				],
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad(option) {
			if(+option.state == 9){
				this.tabCurrentIndex = 0;
			}else{
				this.tabCurrentIndex = +option.state + 1;
			}
			console.log(this.tabCurrentIndex);
			this.loadDataByState();
		},

		methods: {
			//获取订单列表
			loadDataByState(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex; //取当前index 
				let navItem = this.navList[index]; // 当前的nav  

				if (source === 'tabChange' && navItem.loaded === true) {
					//tab切换只有第一次需要加载数据
					return;
				}
				if (navItem.loadingType === 'loading') {
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';
				
				if(index == 0){
						orderApi.getOrderList(this.userInfo.userId).then(res => {
							if (res.code == 200) {
								console.log(res)
								let List = res.data;
								List.forEach(item => {
									item = Object.assign(item, this.orderStateExp(item.order.orderStatus));
								})
								this.navList[0].orderList = List;
								this.$set(this.navList[0], 'loaded', true);
								this.navList[0].loadingType = 'more';
							}
						})
				}else{
					orderApi.getListByState(this.userInfo.userId,index-1).then(res=>{
						if(res.code == 200){
							let List = res.data;
							List.forEach(item => {
								//Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
								item = Object.assign(item, this.orderStateExp(item.order.orderStatus));
							})
							navItem.orderList = List;
							this.$set(navItem, 'loaded', true);
							navItem.loadingType = 'more';
						}
					})
				}
			}, 
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current; //当前index
				this.loadDataByState('tabChange');
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			//删除订单
			deleteOrder(index) {
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(() => {
					//splice(index, 1) 删除index处订单
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
				}, 600)
			},
			updateStatus(orderId,status) {
				uni.showLoading({
					title: '请稍后'
				})
				
				orderApi.updateStatus(orderId,status).then(res=>{
					if(res == 200){
						if(status == 2){
							uni.showToast({
								icon: 'none',
								title: '确认成功'
							});
						}else if(status == 3){
							let {
								stateTip,
								stateTipColor
							} = this.orderStateExp(3);
							//修改订单状态
							item = Object.assign(item, {
								state: 3,
								stateTip,
								stateTipColor
							})
							console.log(item)
							//取消订单后删除待付款中该项
							let list = this.navList[1].orderList;
							let index = list.findIndex(val => val.id === item.id);
							index !== -1 && list.splice(index, 1); 
							uni.showToast({
								icon: 'none',
								title: '取消成功'
							});
						}
					}
				})
				uni.hideLoading();
			},
			pay(orderId,totalPay) {
				//跳转支付
				uni.navigateTo({
					url: `/pages/money/pay?orderId=${orderId}&totalMoney=${totalPay}`
				})
			},
			//订单状态文字和颜色
			orderStateExp(state) {
				//console.log(state);
				let stateTip = '',
					//stateTipColor = '#fa436a';
					stateTipColor = '#1E90FF';
				switch (+state) {
					case 0:
						stateTip = '待付款';
						break;
					case 1:
						stateTip = '待收货';
						break;
					case 2:
						stateTip = '已完成';
						break;
					case 3:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;
				}
				return {
					stateTip,
					stateTipColor
				};
			}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #F0FFFF;
				color: $base-color;

				&:after {
					border-color: #1E90FF;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
