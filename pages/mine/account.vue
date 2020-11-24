<template>
	<!-- 设置界面 -->
	<view>
		<!--菜单列表-->
		<view class="cu-list menu">
			<view class="cu-item arrow">
				<text class="text-black text-blod">头像</text>
				<view v-if="!isUPImg" class="action">
					<image class="photo" :src="photoIMg" @tap="uploadPhoto"></image>
				</view>
				<view v-else class="action">
					<button class="cu-btn round bg-green shadow" @tap="uploadPhoto">
						<text class="cuIcon-upload"></text> 上传</button>
				</view>
			</view>
			<view class="cu-item arrow margin-top-sm" @tap="gotoUpPhoneNum(phoneNumber)">
				<text class="text-black text-blod">手机号</text>
				<view class="marginR">
					{{phoneNumber}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import mineAPI from '../../api/mine.js'

	export default {
		data() {
			return {
				photo: '',
				phoneNumber: '',
				isUPImg: false,
				photoIMg: ''
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onLoad() {
			if (this.userInfo.avatar === "") {
				this.isUPImg = true;
			} else {
				this.photoIMg = this.userInfo.avatar;
			}
			this.phoneNumber = this.userInfo.phoneNumber;
		},
		methods: {
			uploadPhoto() {
				uni.chooseImage({
					count: 1, //允许上传的数量 默认1
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album'], //从相册选择 camera 从相机 默认两者都有
					success: async (res) => {
						this.photoIMg = res.tempFilePaths[0];
						console.log(res.tempFilePaths[0]);
						const [error, result] = await uni.uploadFile({
							url: 'http://119.3.191.135:9999/image/upload',
							filePath: res.tempFilePaths[0],
							name: 'file'
						});
						this.photo = JSON.parse(result.data).data;
						//console.log(JSON.parse(result.data).data);
						//console.log(this.photo)
						this.userInfo.avatar = JSON.parse(result.data).data;
						mineAPI.updatePhoto(this.photo,this.userInfo.userId).then(res => {
							if (res.code === 200) {
								uni.showToast({
									icon: 'none',
									title: '修改成功'
								});
							} else {
								uni.showToast({
									icon: 'none',
									title: '修改失败'
								});
								
							}
						})
					}
				})
			},
			gotoUpPhoneNum(phoneNumber) {
				console.log(phoneNumber)
				uni.navigateTo({
					url: `/pages/mine/upPhoneNum?phoneNumber=${phoneNumber}`
				})
			},
		}
	}
</script>

<style>
	.end-bottom {
		align-self: flex-end;
	}

	.marginR {
		float: right;
	}

	.photo {
		width: 48px;
		height: 48px;
	}
</style>
