<template>
	<view class="bg-white page">
		<!-- 登录界面 -->
		<!-- 登录顶部 -->
		<view class="padding flex flex-direction form">
			<view class="cu-form-group margin-top">
				<text class="title">账号</text>
				<input placeholder="请输入账号" name="input" v-model="account"></input>
			</view>
			<view class="cu-form-group solid-bottom">
				<text class="title">密码</text>
				<input placeholder="请输入密码" name="input" v-bind:type="showPass" v-model="password"></input>
				<text v-bind:class="showPass=='password'?'cuIcon-attentionfill':'cuIcon-attentionforbidfill'" @tap="togglePass" ></text>  
			</view>
			<view class="padding flex flex-direction margin-top-sm">
				<button class="cu-btn bg-blue lg shadow-blur" @tap="bindLogin">登录</button>
			</view>
		</view>
		
		
	</view>   
</template>

<script>
	import loginApi from '../../api/login.js'
	import { mapState,mapMutations } from 'vuex' // 导入vuex中得mapState，mapMutations
	export default {
		data() {
			return {
				account: 'hyxq_001001001001', // 账户
				password: '123456', // 密码
				showPass:'password'
			}
		},
		computed:{
			...mapState(['forcedLogin','hasLogin']), // 对全局变量进行监控，
		},
		methods: {
			...mapMutations(['login']), // 对全局方法 login 进行监控
			 bindLogin(){
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'   
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 声明一个用户信息 
				 */
				const userInfo = {
					account: this.account,
					password: this.password
				} 
				// 发起登录请求
				loginApi.login(userInfo).then(res=>{
					console.log(res);
					if(res.code === 200){
						// 从请求结果中 获取有效用户信息
						const validUserInfo = res.data.user;
						// 如果信息不空  
						if(validUserInfo){
							uni.showToast({
								icon: 'none',
								title: '登录成功'
							});
							console.log(res.data.token)
							uni.setStorageSync('token',res.data.token);
							console.log(uni.getStorageSync('token'))
							console.log(validUserInfo); 
							this.saveUserInfo(validUserInfo);
							uni.switchTab({
								url:"/pages/home/home"
							})
						}
					}else{
						uni.showToast({
							icon: 'none',
							title: '登录失败'
						});
					}
				})
			},
			// 保存用户信息 做持久化操作 
			saveUserInfo(userInfo){
				this.login(userInfo);
			},
			// 切换展示密码 
			togglePass(){
				this.showPass = this.showPass === 'password' ? 'text' : 'password';
			}
		}
	}
</script>

<style scoped>
	.page{
		height: 100vh;
	}
	
</style>
