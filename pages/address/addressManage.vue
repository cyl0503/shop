<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.telephone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<input class="input" type="text" v-model="addressData.address" placeholder="收货人地址" placeholder-class="placeholder" />
		</view>

		<!-- <view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.checked" v-model="addressData.checked" color="#1E90FF" @change="switchChange" />
		</view> 
		<button class="add-btn" @click="confirm">提交</button> -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import addressApi from '../../api/adress.js'
	export default {
		data() {
			return {
				addressData: {
					id: 0,
					userId: 0,
					name: '',
					address: '',
					mobile: '',
					checked: 0
				}
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onLoad(option) {
			let title = '新增收货地址';
			if (option.type === 'edit') {
				title = '查看收货地址'
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e) {
				console.log(e.detail.value)
				if (e.detail.value) {
					this.addressData.checked = 1;
				}

			},

			//提交
			confirm() {
				let data = this.addressData;
				if (!data.name) {
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if (!data.address) {
					this.$api.msg('地址不能为空');
					//this.$api.msg('请在地图选择所在位置');
					return;
				}
				console.log(this.addressData)
				if (this.manageType === 'edit') {
					console.log(this.addressData)
					addressApi.editAddress(this.addressData).then(res => {
						if (res.code === 200) {
							this.$api.prePage().loadData();
							this.$api.msg(`地址修改成功`);
							setTimeout(() => {
								uni.navigateBack()
							}, 800)
						}
					})
				} 
				else if (this.manageType === 'add') {
					 let data = {};
					 data.address = this.addressData.address;
					 data.mobile = this.addressData.mobile;
					 data.name = this.addressData.name;
					 data.userId = this.userInfo.userId;
					addressApi.addAddress(data).then(res=>{
						if(res.code === 200){
							this.$api.prePage().loadData();
							this.$api.msg(`地址添加成功`);
							setTimeout(() => {
								uni.navigateBack()
							}, 800)
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
	}
</style>
