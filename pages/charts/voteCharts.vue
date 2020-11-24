<template>
	<view>
		<view v-if="isUseArea == 0">
			<button type="primary" class="bg-blue lg" @click="showBySquare(1)">按平方显示</button>
		</view>
		<view v-else>
			<button type="primary" class="bg-blue lg" @click="showBySquare(0)">按票数显示</button>
		</view>
		<view v-for="(item,index) in voteList" class="qiun-columns">
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-dot-light">{{item.name}}</view>
			</view>
			<view class='line'></view>
			
			<view class="qiun-charts">
				<canvas :canvas-id="item.name" :id="item.name" class="charts" @touchstart="touchPie($event,index)"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js';
	import voteApi from '../../api/vote.js'

	var _self;
	let cnt = 0;

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				voteList: [],
				voteId: 0,
				canvaPieList: [],
				isUseArea:0
			}
		},
		onLoad(options) {
			console.log(options.voteId);
			this.voteId = options.voteId;
			_self = this;
			console.log(this)
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData(this.isUseArea);
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.getServerData(this.isUseArea);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getServerData(isUseArea) {
				voteApi.getVoteInfo(this.voteId).then(res => {
					if (res.code === 200) {
						console.log(res);
						this.voteList = res.data;
						this.canvaPieList = [];
						for (let i = 0; i < res.data.length; i++) {
							let Pie = {
								series: []
							};
							let voteCharts = res.data[i];
							for (let j = 0; j < voteCharts.content.items.length; j++) {
								console.log(j)
								let votedata = {};
								let votedataForSquare = {};
								votedata.name = voteCharts.content.items[j].name;
								votedata.data = Number(voteCharts.content.items[j].value);
								votedataForSquare.name = voteCharts.content.items[j].name;
								votedataForSquare.data = Number(voteCharts.content.items[j].area);
								if(!isUseArea){//0
									Pie.series.push(votedata);
								}else{//1
									Pie.series.push(votedataForSquare);
								}
							}
							console.log(Pie.series)
							_self.showPie(voteCharts.name, Pie);
						}
					} else {
						_self.tips = "网络错误，小程序端请检查合法域名";
					}
				})
			},
			showPie(canvasId, chartData) {
				let canvaPie = null;
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
				this.canvaPieList.push(canvaPie);
			},
			touchPie(e, index) {
				console.log(e);
				console.log(index);
				var unit = '票';
				if(this.isUseArea == 1){
					unit = '平方米';
				}
				this.canvaPieList[index].showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data+unit;
					}
				});
			},
			showBySquare(isUseArea){
				if(isUseArea == 1){
					this.isUseArea = 1;
				}else{
					this.isUseArea = 0;
				}
				this.getServerData(isUseArea);
			}
		}
	}
</script>

<style>
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 100%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.line {
		height: 1px;
		color: #D3D3D3;
	}
</style>
