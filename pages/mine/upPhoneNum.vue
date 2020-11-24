<template>
	<view>
		<form class="upPhoneNum">
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input v-model="phoneNumber" placeholder="请输入手机号" name="input"></input>
				<button type="primary" v-show="show" @click="getCode(phoneNumber)">获取验证码</button>
				<span v-show="!show" class="count">{{count}} s</span>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input v-model="writeCode" placeholder="请输入验证码" name="input"></input>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button type="primary" :disabled="isdisabled" class="cu-btn bg-blue margin-tb-sm lg" @tap="UpPhoneNum(phoneNumber)">{{isUpadate}}</button>
		</view>
	</view>
</template>

<script>
	import mineAPI from '../../api/mine.js'
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				phoneNumber: '',
				show: true,
				count: '',
				timer: null,
				isUpadate: '确认修改',
				isdisabled: false,
				code: '',
				date: '',
				writeCode: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad(option) {
			console.log(option.phoneNumber);
			this.phoneNumber = option.phoneNumber;
		},
		methods: {
			//获取验证码
			getCode(phoneNumber) {
				if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确'
					})
				} else {
					console.log(this.phoneNumber)
					mineAPI.getSMS(this.userInfo.userId, this.phoneNumber).then(res => {
						console.log(res)
						if (res.code != null || res.code != '') {
							const TIME_COUNT = 60;
							if (!this.timer) {
								this.count = TIME_COUNT;
								this.show = false;
								this.timer = setInterval(() => {
									if (this.count > 0 && this.count <= TIME_COUNT) {
										this.count--;
									} else {
										this.show = true;
										clearInterval(this.timer);
										this.timer = null;
									}
								}, 1000)
							}
							this.date = res.date;
							this.code = res.code;
							uni.showToast({
								icon: 'none',
								title: '验证码发送成功，5分钟内有效'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '验证码发送失败'
							});
						}
					})
				}

			},
			//修改手机号
			UpPhoneNum(phoneNumber) {
				if (this.code === '' || this.code === null) {
					uni.showToast({
						icon: 'none',
						title: '验证码不能为空'
					})
				} else {
					let nowDate = new Date();
					console.log(this.date);
					console.log(nowDate);
					console.log(nowDate - this.convertDateFromString(this.date) < 300000);

					//1800 000 30x60x1000 半小时
					//300 000  5x60x1000 5分钟

					if (nowDate - this.convertDateFromString(this.date) < 300000) {
						mineAPI.upPhoneNum(this.userInfo.ownerId, this.phoneNumber).then(res => {
							if (res.code === 200) {
								if (this.writeCode === this.code) {
									this.phoneNumber = '';
									this.writeCode = '';
									this.isdisabled = true;
									this.isUpadate = '修改成功';
									uni.showToast({
										icon: 'none',
										title: '修改成功'
									});
								} else {
									uni.showToast({
										icon: 'none',
										title: '验证码错误'
									});
								}
							} else {
								uni.showToast({
									icon: 'none',
									title: '修改失败'
								});
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '验证码已超时，请重新获取！'
						});
					}
				}
			},
			convertDateFromString(dateString) {
				if (dateString) {
					var arr1 = dateString.split(" ");
					var today = arr1[0].split('-');
					let time = arr1[1].split(':');
					var date = new Date(today[0], today[1] - 1, today[2], time[0], time[1], time[2]);
					return date;
				}
			}
		}
	}
</script>

<style>
	.upPhoneNum {
		margin-top: 5px;
	}
</style>
