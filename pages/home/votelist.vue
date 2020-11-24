<template>
	<view class="bg-white">
		<!-- 投票列表 -->
		
			<!-- 投票列表渲染 -->  
			<view class="cu-tabbar-height"></view>
			<view class="nav-list">
				<view hover-class='none' class="nav-li bg-blue" 
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in voteList" :key="index" 
				 @click="gotoVoteDetail(item.id,item.peoNum)">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">
						开始时间：{{item.startTime}}<br>
					</view>
					<view class="nav-name">
						结束时间：{{item.endTime}}
					</view>
					<text class="cuIcon-copy"></text>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>

	</view>
</template>
<script>
	import voteApi from '../../api/vote.js'
	import {
		mapState
	} from 'vuex'
	
	export default {
		data() {
			return {
				// 新闻列表 
				voteList:[]
			}
		},
		// 计算属性
		computed:{
			...mapState(['userInfo'])
		},
		// 监听页面加载
		onLoad() {
			this.initVoteList();
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.initVoteList();
			uni.stopPullDownRefresh();
		},
		// 方法
		methods: {
			// 初始化投票列表
			initVoteList() {
				voteApi.votelists().then(res => {
					console.log(res);
					if(res.code === 200){
						this.voteList = res.data;
						console.log('获取成功');
					}
				})
			},  
			// 移除标签
			removeTAG(html) {
				return this.$tagutil.removeTAG(html);
			},
			gotoVoteDetail:function(voteId,peopleNum){
				console.log(voteId);
				voteApi.voteCheck(voteId,this.userInfo.userId).then(res=>{
					if(res.code === 200){
						uni.navigateTo({
							url: '/pages/charts/voteCharts?voteId=' + voteId
						})
					}else{
						uni.navigateTo({
							url: '/pages/home/votedetail?voteId='+voteId+'&peopleNum='+peopleNum
						})
					}
				})
			}
		}
	}
</script>

<style scoped>   
	.nav-li{
		width:100%
		}
</style>
