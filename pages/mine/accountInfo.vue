<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input :disabled="isdisabled" v-model="owner.ownerName" placeholder="请输入姓名" name="input"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">身份证号</view>
				<input :disabled="isdisabled" v-model="owner.ownerIdCard" placeholder="请输入身份证号" name="input"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input :disabled="isdisabled" v-model="owner.phoneNumber" placeholder="请输入手机号" name="input"></input>
				<button :disabled="isdisabled" type="primary" v-show="show" @click="getCode(owner.phoneNumber)">获取验证码</button>
				<span v-show="!show" class="count">{{count}} s</span>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input :disabled="isdisabled" v-model="writeCode" placeholder="请输入验证码" name="input"></input>
			</view>
		</form>

		<view class="padding flex flex-direction">
			<button type="primary" :disabled="isdisabled" class="cu-btn bg-blue margin-tb-sm lg" @tap="createOwner1">{{isCreate}}</button>
		</view>

	</view>
</template>

<script>
	import mineAPI from '../../api/mine.js'
	import {
		mapState
	} from 'vuex'

	let aCity = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外"
	}

	export default {
		data() {
			return {
				isCreate: '创建业主',
				isdisabled: false,
				owner: {
					ownerName: '',
					ownerIdCard: '',
					phoneNumber: '',
					userId: 0
				},
				show: true,
				count: '',
				timer: null,
				code: '',
				date: '',
				writeCode: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad() {
			this.loadAccountData();
		},
		// 监听页面下拉刷新
		onPullDownRefresh() {
			this.loadAccountData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			loadAccountData() {
				if (this.userInfo.ownerId != null) {
					this.isCreate = '已创建',
						this.isdisabled = true;
					mineAPI.getOwnerInfo(this.userInfo.ownerId).then(res => {
						console.log(res)
						if (res.code === 200) {
							this.owner.ownerName = res.data.name;
							this.owner.ownerIdCard = res.data.idCard;
							this.owner.phoneNumber = res.data.phoneNumber;
						}
					})
				}
			},
			createOwner1: function() {
				if (this.owner.ownerName == "") {
					uni.showToast({
						icon: 'none',
						title: '姓名不能为空'
					});
					return;
				}
				//身份证正则判断
				/* let iSum = 0;
				let info = "";
				let sId = this.owner.ownerIdCard;
				if (!/^\d{17}(\d|x)$/i.test(sId)) {
					uni.showToast({
						icon: 'none',
						title: '你输入的身份证长度或格式错误'
					});
					return;
				}
				sId = sId.replace(/x$/i, "a");
				if (aCity[parseInt(sId.substr(0, 2))] == null) {
					uni.showToast({
						icon: 'none',
						title: '你的身份证地区非法'
					});
					return;
				}
				sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
				let d = new Date(sBirthday.replace(/-/g, "/"));
				if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())){
					uni.showToast({
						icon: 'none',
						title: '身份证上的出生日期非法'
					});
					return;
				}
				for (let i = 17; i >= 0; i--)
					iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
				if (iSum % 11 != 1)
					return "你输入的身份证号非法";
				aCity[parseInt]
				return true; */
				if (this.owner.ownerIdCard == "") {
					uni.showToast({
						icon: 'none',
						title: '身份证号不能为空'
					});
					return;
				} else if (this.owner.ownerIdCard.length != 18) {
					uni.showToast({
						icon: 'none',
						title: '身份证格式不正确'
					});
					return;
				}
				if (this.owner.phoneNumber == "") {
					uni.showToast({
						icon: 'none',
						title: '手机号不能为空'
					});
					return;
				} /* else if (this.owner.phoneNumber.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确'
					});
					return;
				} */
				console.log(this.userInfo);
				this.owner.userId = this.userInfo.userId;
				console.log(this.owner);
				mineAPI.createOwner(this.owner).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.clearForm();
						uni.showToast({
							icon: 'none',
							title: '创建成功'
						});
						//跳转到主页
						uni.navigateTo({
							url: "/pages/index/index"
						})
					}
				})

			},
			clearForm() {
				this.owner.ownerName = '';
				this.owner.ownerIdCard = '';
				this.owner.phoneNumber = '';
				this.code = '';
			},
			//获取验证码
			getCode(phoneNumber) {
				if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确'
					})
				} else {
					//console.log(this.phoneNumber)
					mineAPI.getSMS(this.userInfo.userId, phoneNumber).then(res => {
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
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
