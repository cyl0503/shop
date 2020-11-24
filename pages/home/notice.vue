<template>
	<view>
		<view class="cu-card article no-card margin-top-sm"  >
			<view class="cu-item shadow">
				<view @click="navTo('/pages/home/noticelist')" hover-class='none'>
					<view class="title">
							<view class="flex flex-wrap bg-white">
								<view class="basis-xs "></view>
								<view class="basis-lg ">
									<view class="text-center text-blod">
										通知公告
									</view>
								</view>
								<view class="basis-xs ">
									<view class="text-right text-gray">
										更多  
									</view>
								</view>
							</view>
					</view>
				</view>
				<view @click="navTo('/pages/home/noticedetail?id=-1')"  hover-class='none'>
					<view class="content bg-gradual-blue ">
						<view class="notice">
							最新公告
						</view>
					</view>
					<view class="foot padding-sm margin-top-sm">
						<view class="flex  justify-between">
							<view class="margin-xs radius">查看详情</view>
							<view class="margin-xs radius"><text class="lg cuIcon-right text-sl" ></text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import notice from '../../api/notice.js'
	import {
		mapState
	} from 'vuex'; 
	
	export default{
		data(){
			return{
				noticeId:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods:{
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/login/login';
				}
				uni.navigateTo({
					url
				})
			},
		},
		async created() {
			/* const [err,res] = await notice.top();
			if(res.data.code === 200){
				this.noticeId = res.data.data.id;
			}
			console.log(res); */
		}
	}
	
</script>

<style>
	.notice{
	  width:100%;
	  height: 200px; 
	  line-height: 200px;
	  text-align: center;
	  font-size: 50px;
	  font-weight: 700;
	}
	.foot{
		line-height: 100%;
	}
</style>
