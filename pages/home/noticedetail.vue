<template>
	<view>
		<view class="cu-card  article no-card" v-if="title">
			<view class="cu-item shadow">
				<view class="title text-blod">
					{{title}}
				</view>
				<view class="cu-tag margin-tb-sm">
					发表于 {{createTime}}
				</view>
				<view class="cu-tag margin-tb-sm">
					浏览量 {{readCount}}
				</view>
				<view class="cu-tag margin-tb-sm">
					确认人数 {{acceptNum}}
				</view>
				<view class="content solid-top text-xl">
					<view class="margin-top-sm" v-html="content">
					</view>
				</view>
			</view>
		</view>
		<!-- 确认通知 -->
		<view class="padding flex flex-direction">
			<button type="primary" :disabled="status === 1" class="cu-btn bg-blue margin-tb-sm lg" @tap="confirm">{{isReceive}}</button>
		</view>
	</view>
</template>

<script>
	import noticeAPI from '../../api/notice.js'
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				noticeId:0,
				title: '',
				content: '',
				createTime: '',
				readCount: 0,
				acceptNum: 0,
				isReceive: '确认收到',
				status: 0
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad(options) {
			// 根据Id 获取通知与公告信息 
			console.log(parseInt(options.id));
			console.log(this.userInfo.userId);
			this.noticeId = options.id;
			if(options.id == -1){
				this.getLatestNotice();
			}else{
				this.getNoticeList(options.id, this.userInfo.userId);
			}
		},
		// 监听页面下拉刷新
		onPullDownRefresh() {
			if(this.noticeId == -1){
				this.getLatestNotice();
			}else{
				this.getNoticeList(this.noticeId, this.userInfo.userId);
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			confirm() {
				let data = {};
				data.noticeId = this.noticeId;
				data.userId = this.userInfo.userId;
				console.log(data)
				noticeAPI.confirmNotice(data).then(res => {
					console.log(res)
					if (res.code === 200) {
						this.isReceive = '已确认';
						this.status = 1;
						uni.showToast({
							icon: 'none',
							title: '确认成功'
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '确认失败'
						});
					}
				})
			},
			getLatestNotice(){
				noticeAPI.getLatestNotice(this.userInfo.userId).then(res=>{
					console.log(res);
					if (res.code === 200) {
							this.title = res.data.title;
							this.content = res.data.description;
							this.createTime = res.data.createTime;
							this.readCount = res.data.readCount;
							this.acceptNum = res.data.acceptNum;
							this.status = res.data.status;
							if (this.status === 1) {
								this.isReceive = '已确认';
							}
						}
				})
			},
			getNoticeList(id,userId){
				noticeAPI.getNotice(id,userId).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.title = res.data.title;
						this.content = res.data.content;
						this.createTime = res.data.createTime;
						this.readCount = res.data.readCount;
						this.acceptNum = res.data.acceptNum;
						this.status = res.data.status;
						if (this.status === 1) {
							this.isReceive = '已确认';
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.title {
		font-size: 26px !important;
		text-align: center;
	}
</style>
