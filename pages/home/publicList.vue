<template>
	<view>
		<!-- 页面顶部信息  -->
		<view class="notice-item" v-for="(item,index) in noticeList" :key="index">
			<text class="time">{{item.createTime}}</text>
			<navigator :url="'/pages/home/publicdetail?id='+item.id" hover-class='none'>
				<view class="content">
					<text class="title">{{item.title}}</text>
					<text class="introduce">
						{{item.description + '...'}}
					</text>
					<view class="bot b-t">
						<text>查看详情</text>
						<text class="more-icon yticon icon-you"></text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import notice from '../../api/notice.js'
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				// 通知与公告列表
				noticeList: []
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		// 监听页面加载
		onLoad() {
			this.initNoticeList();
		},
		// 监听页面下拉刷新
		onPullDownRefresh() {
			this.initNoticeList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			// 初始化公示列表
			initNoticeList() {
				notice.noticeById(this.userInfo.userId).then(res => {
					if (res.code === 200) {
						this.noticeList = res.data;
					}
					console.log(res);
				})
			},
			removeTAG(html) {
				return this.$tagutil.removeTAG(html)
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
		font-weight: bold;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
