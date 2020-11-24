<template>
	<view>
		<navigator url="/pages/home/editMessage">
			<view class="editmsg cu-form-group">
				<input disabled="disabled" id="edit" placeholder="留个言吧..." name="input"></input>
				<view id="msgicon" class="title cuIcon-edit"></view>
			</view>
		</navigator>
		<view v-for="(item,index) in messageList">
			<view class="cu-card dynamic">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="'background-image:url('+photoUrl+');'"></view>
							<view class="content flex-sub">
								<view>
									<span>{{name}}</span>
								</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.createTime}}
									<span v-if="item.status==1">已采纳</span>
								</view>
							</view>
						</view>
					</view>
					<view class="text-content margin-top">
						{{item.content}}
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import messageApi from '../../api/message.js'
	import mineAPI from '../../api/mine.js'
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				messageList: [],
				name:'',
				photoUrl:'../../static/missing-face.png'
			}
		},
		// 监听页面加载
		onLoad() {
			console.log(this.userInfo)
			this.photoUrl = this.userInfo.avatar;
			mineAPI.getOwnerInfo(this.userInfo.ownerId).then(res=>{
				if(res.code === 200){
						this.name = res.data.name;
					}
				})
			this.initMessageList();
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.initMessageList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed:{
			 ...mapState(['userInfo'])
		},
		methods: {
			// 初始化评价留言列表
			initMessageList() {
				console.log(this.userInfo.userId);
				messageApi.messageList(this.userInfo.userId).then(res => {
					//console.log(res);
					if (res.code === 200) {
						//this.messageList = res.data;
						this.messageList = res.data.sort((a,b)=>this.convertDateFromString(b.createTime) - this.convertDateFromString(a.createTime))
						//goodsList.sort((a,b)=>b.sales - a.sales)
						console.log(res.data);
						console.log(this.messageList)
					}
				})
			},
			// 移除标签
			removeTAG(html) {
				return this.$tagutil.removeTAG(html);
			},
			convertDateFromString(dateString) {
				if (dateString) {
					var arr1 = dateString.split(" ");
					var today = arr1[0].split('-');
					let time = arr1[1].split(':');
					var date = new Date(today[0], today[1]-1, today[2], time[0], time[1], time[2]);
					return date;
				}
			}
		}
	}
</script>

<style>
	#msgicon {
		font-size: 20px;
		padding-left: 2%;
	}

	.editmsg {
		height: 60px;
	}
	
	#edit{
		background-color: #F1F1F1;
		border-radius: 15px;
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
	}
</style>
