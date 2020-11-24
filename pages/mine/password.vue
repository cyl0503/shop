<template>
	<!-- 设置界面 -->
	<view class="bg-white page">
		<!-- 修改密码表单 -->
		<view class="padding flex flex-direction form">
			<!-- 旧密码 -->
			<view class="cu-form-group margin-top">
				<input v-model="password.oldPassword" placeholder="旧密码" type="password"></input>
			</view>
			<!-- 新密码 -->
			<view class="cu-form-group solid-bottom">
				<input v-model="password.newPassword" placeholder="新密码" type="password"></input> <br>
			</view>
			<!-- 新密码 -->
			<view class="cu-form-group solid-bottom">
				<input v-model="password.twoNewPassword" placeholder="再输一次新密码" type="password"></input> <br>
			</view>
			<!-- 修改密码提示 -->
			<text class="padding-sm text-gray">
				要求6-16位，至少包含数字、字母、符号其中两种元素
			</text>
			<!-- 确定按钮 -->
			<view class="padding flex flex-direction margin-top-sm">
				<button class="cu-btn bg-blue lg shadow-blur" @tap="updatePassword">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import mineAPI from '../../api/mine.js'
	import {mapState} from 'vuex'

	export default {
		data() {
			return {
				password: {
					newPassword: '',
					oldPassword: '',
					twoNewPassword:'',
				}
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//修改密码
			updatePassword: function() {
				if (this.password.oldPassword === "") {
					uni.showToast({
						icon: 'none',
						title: '旧密码不能为空'
					});
					return;
				}
				if (this.password.newPassword === "") {
					uni.showToast({
						icon: 'none',
						title: '新密码不能为空'
					});
					return;
				} else if (this.password.newPassword.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '新密码不能少于6位数'
					});
					return;
				}
				if (this.password.newPassword === this.password.twoNewPassword) {
					uni.showToast({
						icon: 'none',
						title: '两次输入密码不一致'
					});
					return;
				}
				if (this.password.oldPassword === this.password.newPassword) {
					uni.showToast({
						icon: 'none',
						title: '新密码不能与原密码一样'
					});
				} else {
					let password = {};
					password.newPassword = this.password.newPassword;
					password.oldPassword = this.password.oldPassword;
					password.userId = this.userInfo.userId;
					mineAPI.modifyPassword(password).then(res => {
						console.log(res);
						if (res.code === 200) {
							uni.showToast({
								icon: 'none',
								title: '修改成功'
							});
						}else{
							uni.showToast({
								icon: 'none',
								title: '修改失败'
							});
						}
					})
				}
			}
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
