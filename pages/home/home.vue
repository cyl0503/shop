<template name="home">
	<view>
		<scroll-view scroll-y class="page">
			<!--轮播图--> 
			<cuSwiper></cuSwiper>
			<button type="primary" class="cu-btn bg-blue lg" @tap="identfy('/pages/mine/identification')">立即认证</button>
			<!-- 工具条 -->
			<toolbar></toolbar>
			<!-- 欢迎的小通知 -->
			<view class="example-body">
				<uni-notice-bar :show-icon="true" :scrollable="true" :single="true" text="花园小区欢迎您!!" />
			</view>
			<!--通知公告-->
			<notice></notice>
			<!--公示管理-->
			<publicity></publicity>
		</scroll-view>
	</view>
</template>

<script>
	// 引入工具条
	import toolbar from 'pages/home/toolbar.vue'
	// 引入轮播图
	import cuSwiper from 'pages/home/swiper.vue'

	import notice from 'pages/home/notice.vue'
	import publicity from 'pages/home/publicity.vue'

	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import {
		mapState
	} from 'vuex';

	export default {
		name: "home",
		data() {
			return {
				modalName: null,
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onLoad(options) {
			this.showModal(e);
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			identfy(url){
				/* if (!this.hasLogin) {
					url = '/pages/login/login';
				} */
				uni.navigateTo({
					url
				})
			}
		},
		components: {
			toolbar,
			cuSwiper,
			notice,
			publicity
		},
		onShow() {
			console.log("success")
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.lg{
		width: 100%;
		}
</style>
