<template>
	<view>
		<view class="question">问题和意见</view>

		<view class="cu-form-group">
			<textarea maxlength="-1" v-model="message.content" :disabled="modalName!=null" @input="textareaInput" placeholder="请详细描述你的问题和意见..."></textarea>
		</view>
		<!-- 提交 -->
		<view class="padding flex flex-direction">
			<button :disabled="isdisable" class="cu-btn bg-blue margin-tb-sm lg" @tap="subMessage">发表</button>
		</view>
	</view>
</template>

<script>
	import messageAPI from '../../api/message.js'
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				modalName: null,
				message:{
					content: '',
					userId:0
				},
				flag: false,
				isdisable:false
			}
		},
		computed:{
			 ...mapState(['userInfo'])
		},
		methods:{
			textareaInput(e) {
				this.message.content = e.detail.value
			},
			handleSwicthState(e) {
				this.flag = e.detail.value
			},
			// 提交留言
			async subMessage(){
				this.message.userId = this.userInfo.userId;
				// 调用留言接口
				const res = await messageAPI.uploadMessage(this.message);
				// 判断结果
				if(res.code === 200){
					console.log(res);
					//this.message.content = '';
					//this.isdisable = true;
					uni.showToast({
						icon: 'none',
						title: '发表成功'
					});
					// 前一页
					//this.$api.gotoPrePage();
					//let pages = getCurrentPages();
					//let prePage = pages[pages.length - 2];
					uni.navigateBack({
					     success: function() {
								 console.log('success')
					        //prePage.onLoad(); // 执行前一个页面的 onLoad 方法
					     }
					});
				}
				
			}
		}
	}
</script>

<style>
	.question {
		width: 100%;
		background-color: #EEEEEE;
		color: gray;
		height: 35px;
		line-height: 35px;
		padding-left: 2%;
	}
</style>
