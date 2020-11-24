<template>
	<!-- 新闻界面 -->
	<view>

		<!-- 	新闻列表内容 -->
		<navigator :url="'/pages/home/newsdetail?id='+item.newsId" hover-class="none" v-for="(item,index) in newsList" :key="index"
		 v-if="newsList">
			<view class="cu-card case" :class="false?'no-card':''">
				<view class="cu-item shadow">
					<view class="image">
						<image :src="item.firstImage" mode="widthFix"></image>
						<view class="cu-tag bg-blue">新闻</view>
						<view class="cu-bar bg-shadeBottom">
							<text class="text-cut">
								{{item.title}}
							</text>
						</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(../../static/app.jpg);background-color:white;">
							</view>
							<view class="content flex-sub">
								<view class="text-grey">花园小区新闻办</view>
								<view class="text-gray text-sm flex justify-between">
									发布于 {{item.publicTime}}
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.readCount}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</navigator>
		<!-- 新闻列表结束 -->

	</view>
</template>
<script>
	import newsApi from '../../api/news.js'
	export default {
		data() {
			return {
				newsList: []
			}
		},
		// 监听页面加载
		onLoad() {
			this.initNewsList();
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.initNewsList();
			setTimeout(function() {
				uni.stopPullDownRefresh(); 
			}, 1000);
		},
		methods: {
			// 初始化新闻列表
			initNewsList() {
				newsApi.newsList().then(res => {
					console.log(res);
					if (res.code === 200) {
						this.newsList = res.data;
						console.log(res.data);
					}
				})
			},
			// 移除标签
			removeTAG(html) {
				return this.$tagutil.removeTAG(html);
			}
		}
	}
</script>

<style scoped>
	.page {
		height: 100vh;
	}
</style>
