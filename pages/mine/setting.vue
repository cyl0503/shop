<template>
	<!-- 设置界面 -->
	<view>
		<!--菜单列表-->
		<view class="cu-list menu">
			<!-- 去往账号管理界面 -->
			<navigator class="cu-item arrow m_t" url="/pages/mine/account">
				<view class="content">
					<text class="text-black text-blod">个人资料</text>
				</view>
			</navigator>
			<!-- 去往修改密码界面 -->
			<navigator class="cu-item arrow" url="/pages/mine/password">
				<view class="content">
					<text class="text-black text-blod">修改密码</text>
				</view>
			</navigator>

			<navigator class="cu-item arrow margin-top-sm" url="/pages/mine/identification">
				<view class="content">
					<text>实名认证</text>
				</view>
			</navigator>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue margin-tb-sm lg" @click="toLogout">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		methods: {
			...mapMutations(['logout']),

			//退出登录
			toLogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: (e) => {
						if (e.confirm) {
							this.logout();
							setTimeout(() => {
								uni.navigateBack();
							}, 200)
						}
					}
				});
			}
		}
	}
</script>

<style>
	.m_t{
		margin-top: 16upx;
	}
</style>
