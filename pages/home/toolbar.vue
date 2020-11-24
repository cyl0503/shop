<template>
	<!-- 工具条 -->
	<view class="toolbar">
		<view class="cu-bar tabbar bg-white">
			<view class="action" v-for="item in toolList">
				<view animation-type="zoom-fade-out" animation-duration="300" hover-class="none" @click="navTo(item.path)">
					<view id="newsicon" :class="'cuIcon-'+item.icon"></view>
					<view class="text-black text-blod text-brown">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mineApi from '../../api/mine.js'
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				toolList: [{
						name: '投票',
						icon: 'text',
						path: '/pages/home/votelist'
					},
					{
						name: '问卷调查',
						icon: 'question',
						path: '/pages/home/surveylist'
					},
					{
						name: '新闻中心',
						icon: 'news',
						path: '/pages/home/newslist'
					},
					{
						name: '留言板',
						icon: 'evaluate',
						path: '/pages/home/messagelist'
					}
				]
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/login/login';
				}
				//console.log(this.userInfo.ownerId)
				/* mineApi.getOwnerInfo(this.userInfo.ownerId).then(res => {
					console.log(res)
					if (res.data.status === 0){
						url = '/pages/mine/identfication';
					}
				}) */
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped>
	.bg-white {
		height: 100px;
		line-height: 100px;
	}

	#newsicon {
		font-size: 30px;
		color: #0081FF;
	}

	.text-brown {
		font-size: 14px;
	}
</style>
