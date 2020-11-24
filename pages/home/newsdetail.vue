<template>
	<!-- 新闻界面 -->
	<view>
		<view class="cu-card  article no-card" v-if="title">
			<view class="cu-item shadow">
				<view class="title text-blod">
					{{title}}
				</view>
				<view class="cu-tag margin-tb-sm">
					发表于 {{updateTime}}
				</view>
				<view class="cu-tag margin-tb-sm">
					浏览量 {{readCount}}
				</view>
				<view class="content solid-top text-xl">
					<rich-text :nodes="content"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import newsApi from '../../api/news.js'
	export default {
		data() {
			return {
				title: '',
				content: '',
				updateTime: '',
				readCount:0
			}
		},
		// 监听页面加载
		async onLoad(options) {
			// 根据Id 获取新闻详细信息 
			newsApi.newsDetailById(options.id).then(res => {
				console.log(res);
				if (res.code === 200) {
					this.title = res.data.title;
					this.content = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
					this.updateTime = res.data.updateTime;
					this.readCount = res.data.readCount;
				}
			})
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style scoped>
	
	.title {
		font-size: 24px !important;
	}
	img{
		width: 100vw;
		height: auto;
	}
	
	
</style>
