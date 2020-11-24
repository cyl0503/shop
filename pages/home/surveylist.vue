<template>
	<view class="bg-white">
		<!-- 问卷调查列表 -->
		<!-- 问卷调查列表渲染 -->
		<view class="cu-tabbar-height"></view>
		<view class="nav-list">
			<navigator hover-class='none' class="nav-li bg-green" navigateTo :url="'/pages/home/surveydetail??surveyId='+item.id"
			 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in surveyList" :key="index">
				<view class="nav-title">{{item.title}}</view>
				<view class="nav-name">
					开始时间：{{item.startTime}}<br>
				</view>
				<view class="nav-name">
					结束时间：{{item.endTime}}<br>
				</view>
				<text class="cuIcon-copy"></text>
			</navigator>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import surveyApi from '../../api/survey.js'
	
	export default {
		data() {
			return {
				// 问卷调查列表 
				surveyList: []
			}
		},
		// 计算属性
		computed: {
			
		},
		// 监听页面加载
		onLoad() {
			this.initSurveyList();
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.initSurveyList();
			uni.stopPullDownRefresh();
		},
		// 方法
		methods: {
			// 初始化投票列表
			initSurveyList() {
				surveyApi.surveyList().then(res => {
					if (res.code === 200) {
						this.surveyList = res.data;
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

<style>
	.nav-title {
		padding-top: 12px;
	}

	.nav-li {
		width: 100%
	}
</style>
