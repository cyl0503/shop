<template>
	<!-- 投票界面 -->
	<view class="page bg-white">
		<!-- 通知公告详情顶部 -->
		<view class="vote-box">
			<view class="voteTitle">
				<text class="title text-blod">
					{{voteInfo.title}}
				</text>
			</view>
			<!-- <view class="voteDescription">
				<text class="title align-center">
					{{voteInfo.description}} 
				</text>
			</view> -->

			<view class="voteData">
				<view class="voteDataItem">
					<view class="voteDataItemName">题目总数</view>
				</view>
				<view class="voteDataItem">
					<view class="voteDataItemName">参与人数</view>
				</view>
				<view class="voteDataItem" id="rank1">
					<view class="voteDataItemName">实时数据</view>
				</view>
			</view>
			<view class="voteData">
				<view class="voteDataItem">
					<view id="totalOption" class="voteDataItemName">
						{{voteInfo.questions.length}}
					</view>
				</view>
				<view class="voteDataItem">
					<view id="totalTicket" class="voteDataItemName">
						{{peopleNum}}
					</view>
				</view>
				<view class="voteDataItem" id="rank" @click="showGraph(voteId)">
					<view class="cuIcon-list"></view>
				</view>
			</view>

		</view>


		<view v-for="(item,index) in voteInfo.questions" style="padding: 2vw;">
			<!-- 如果是单选的情况 -->
			<view v-if="item.type==0">
				<view class="questiontitle">
					{{index+1}}.{{item.title}}(单选)
				</view>
				<view class="uni-list">
					<radio-group @change="radioChange($event,index,item.id)" style="width: 100%;">
						<label class="uni-list-cell uni-list-cell-pd " v-for="(item1, index1) in item.items" :key="item1.value">
							<view class="cu-form-group margin-top solids-bottom">
								<radio :class="item1.id === item.current?'checked':''" :checked="item1.id === item.current" :value="item1.id"></radio>
								<view class="title">{{item1.name}}</view>
							</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view v-else-if="item.type==1">
				<view class="questiontitle">
					{{index+1}}.{{item.title}}(多选)
				</view>
				<view class="uni-list">
					<checkbox-group @change="checkboxChange($event,index,item.id)">
						<label class="uni-list-cell uni-list-cell-pd " v-for="item1 in item.items" :key="item1.id">
							<view class="cu-form-group margin-top solids-bottom">
								<checkbox :class="item1.checked?'checked':''" :checked="item1.checked?true:false" :value="item1.id"></checkbox>
								<view class="title">{{item1.name}}</view>
							</view>
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="poll">提交</button>
		</view>
	</view>
</template>

<script>
	import voteApi from '../../api/vote'
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				// 保存投票信息
				voteInfo: {},
				answers: [],
				voteId: 0,
				peopleNum:0
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		// 监听页面加载函数
		onLoad(options) {
			this.voteId = options.voteId;
			this.peopleNum = options.peopleNum;
			this.initVoteInfo(this.voteId)
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.initVoteInfo(this.voteId);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			// 初始化投票信息
			initVoteInfo(voteId) {
				voteApi.voteCheck(voteId,this.userInfo.userId).then(res=>{
					if(res.code === 200){
						uni.navigateTo({
							url: '/pages/charts/voteCharts?voteId=' + voteId
						})
					}else{
						voteApi.voteDetail(voteId).then(res => {
							if (res.code === 200) {
								this.voteInfo = res.data;
								this.voteId = res.data.id;
								console.log(res)
							}
						})
					}
				})
			},
			//单选事件
			radioChange(event, index, questionId) {
				var items = this.voteInfo.questions[index].items;
				for (let i = 0; i < items.length; i++) {
					const item = items[i];
					if (item.id === event.target.value) {
						console.log(event.target.value);
						this.$set(this.voteInfo.questions[index], 'current', item.id)
						break;
					}
				}
				let answer = {};
				answer.questionId = questionId;
				answer.itemIds = event.target.value;
				this.answers[index] = answer;

			},
			// 监听复选框 
			checkboxChange: function(e, index, questionId) {
				var items = this.voteInfo.questions[index].items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.id)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				let answer = {};
				answer.questionId = questionId;
				answer.itemIds = values.join(",");
				this.answers[index] = answer;
			},
			// 进行投票操作
			poll() {
				let data = {};
				data.userId = this.userInfo.userId;
				data.themeId = this.voteInfo.id;
				data.answers = this.answers;
				console.log(data);
				voteApi.poll(data).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '投票成功'
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '投票失败'
						});
					}
				})
			},
			//显示实时图表数据
			showGraph(voteId) {
				console.log(voteId);
				uni.navigateTo({
					url: '/pages/charts/voteCharts?voteId=' + voteId
				})
			}
		}
	}
</script>

<style>
	.voteTitle {
		width: 100%;
		text-align: center;
		border-bottom: 1px dashed lightgray;
		color: #00AAFF;
		font-weight: bold;
	}

	.text-blod {
		width: 100%;
		font-size: 24px;
		height: 100px;
		line-height: 100px;
	}

	.voteData {
		display: flex;
		border-bottom: 1px dashed lightgray;
		height: 40px;
		line-height: 40px;
	}

	.voteDataItem {
		flex: 1;
		text-align: center;
	}

	#rank {
		font-size: 22px;
	}

	.questiontitle {
		font-size: 22px;
		margin-top: 10px;
		padding: 5px;
	}
</style>
