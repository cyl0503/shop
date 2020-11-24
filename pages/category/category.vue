<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.name}}</text>
				<view class="t-list">
					<view @click="navToList(item.id, titem.id,titem.name)" v-if="titem.pid === item.id" class="t-item" v-for="titem in tlist"
					 :key="titem.id">
						<image :src="titem.picture"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				flist: [],
				slist: [],
				tlist: [],
				cateList: [{
						id: 1,
						name: '新鲜果蔬'
					},
					{
						id: 2,
						name: '礼品鲜花'
					},
					{
						id: 3,
						name: '送药上门'
					},
					{
						id: 5,
						pid: 1,
						name: '水果'
					},
					{
						id: 6,
						pid: 1,
						name: '蔬菜'
					},
					{
						id: 8,
						pid: 5,
						name: '核果类',
						picture: '/static/temp/hgl.jpg'
					},
					{
						id: 9,
						pid: 5,
						name: '仁果类',
						picture: '/static/temp/rgl.jpg'
					},
					{
						id: 10,
						pid: 5,
						name: '浆果类',
						picture: '/static/temp/jgllm.jpg'
					},
					{
						id: 11,
						pid: 5,
						name: '柑果类',
						picture: '/static/temp/ggl.jpg'
					},
					{
						id: 14,
						pid: 6,
						name: '叶菜类',
						picture: '/static/temp/ycl.jpg'
					},
					{
						id: 15,
						pid: 6,
						name: '瓜类',
						picture: '/static/temp/ng.jpg'
					},
					{
						id: 16,
						pid: 6,
						name: '茄果类',
						picture: '/static/temp/qgl.jpg'
					},
					{
						id: 17,
						pid: 6,
						name: '豆类',
						picture: '/static/temp/dl.jpg'
					},
					{
						id: 18,
						pid: 6,
						name: '根茎类',
						picture: '/static/temp/gjl.jpg'
					},
					{
						id: 19,
						pid: 6,
						name: '菌类',
						picture: '/static/temp/jgl.jpg'
					},
					{
						id: 20,
						pid: 2,
						name: '礼品'
					},
					{
						id: 21,
						pid: 2,
						name: '鲜花'
					},
					{
						id: 22,
						pid: 20,
						name: '创意礼品',
						picture: '/static/temp/cate8.jpg'
					},
					{
						id: 23,
						pid: 21,
						name: '鲜花',
						picture: '/static/temp/cate9.jpg'
					},
					{
						id: 24,
						pid: 21,
						name: '每周一花',
						picture: '/static/temp/cate10.jpg'
					},
					{
						id: 25,
						pid: 21,
						name: '卡通花束',
						picture: '/static/temp/cate11.jpg'
					},
					{
						id: 26,
						pid: 21,
						name: '永生花',
						picture: '/static/temp/cate12.jpg'
					},
					{
						id: 27,
						pid: 3,
						name: '常用药品'
					},
					{
						id: 28,
						pid: 27,
						name: '感冒药',
						picture: '/static/temp/gmy.jpg'
					},
					{
						id: 29,
						pid: 27,
						name: '止咳化痰药',
						picture: '/static/temp/zkhty.jpg'
					},
					{
						id: 30,
						pid: 27,
						name: '止泻药',
						picture: '/static/temp/zxy.jpg'
					},
					{
						id: 31,
						pid: 27,
						name: '助消化药',
						picture: '/static/temp/zxhy.jpg'
					},
					{
						id: 32,
						pid: 27,
						name: '解热镇痛药',
						picture: '/static/temp/jrzty.jpg'
					}
				]
			}
		},
		onLoad() {
			this.loadData();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			async loadData() {
				let list = this.cateList;
				list.forEach(item => {
					if (!item.pid) {
						this.flist.push(item); //pid为父级id, 没有pid或者pid=0是一级分类
					} else if (!item.picture) {
						this.slist.push(item); //没有图的是2级分类
					} else {
						this.tlist.push(item); //3级分类
					}
				})
			},
			//一级分类点击
			tabtap(item) {
				if (!this.sizeCalcState) {
					this.calcSize();
				}

				this.currentId = item.id;
				let index = this.slist.findIndex(sitem => sitem.pid === item.id);
				this.tabScrollTop = this.slist[index].top;
			},
			//右侧栏滚动
			asideScroll(e) {
				if (!this.sizeCalcState) {
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
				if (tabs.length > 0) {
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize() {
				let h = 0;
				this.slist.forEach(item => {
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(sid, tid,name) {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					uni.navigateTo({
						url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}&name=${name}`
					})
				}
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}

	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}

	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;

		&.active {
			color: $base-color;
			background: #f8f8f8;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside {
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}

	.s-item {
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}

	.t-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;

		&:after {
			content: '';
			flex: 99;
			height: 0;
		}
	}

	.t-item {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;

		image {
			width: 140upx;
			height: 140upx;
		}
	}
</style>
