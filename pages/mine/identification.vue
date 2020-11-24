<template>
	<view>
		<view v-if="status === 2">
			<view class="flex-sub text-center bg-white">
				<view class="text-sl">
					<text class=" cuIcon-roundcheckfill text-green">认证成功</text>
				</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">
					房产证
				</view>
			</view>
			<view class="cu-form-group">
				<!-- mode="aspectFill"  保留中间部分 宽不变 高度自适应 -->
				<image class="imgg" :src="img1" mode="aspectFill"></image>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					身份证正面
				</view>
			</view>
			<view class="cu-form-group">
				<image class="imgg" :src="img2" mode="aspectFill"></image>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					身份证反面
				</view>
			</view>
			<view class="cu-form-group">
				<image class="imgg" :src="img3" mode="aspectFill"></image>
			</view>
		</view>
		<view v-else-if="status === 1">
			<view class="flex-sub text-center bg-white cef">
				<view class="text-sl">
					<view>认证信息已提交</view>
					<view>请耐心等待！</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					请上传房产证照片
				</view>
				<view class="action">
					{{imgList1.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList1" :key="index" @tap="ViewImage1" :data-url="imgList1[index]">
						<image :src="imgList1[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg1" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage1" v-if="imgList1.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					请上传身份证正面照
				</view>
				<view class="action">
					{{imgList2.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList2" :key="index" @tap="ViewImage2" :data-url="imgList2[index]">
						<image :src="imgList2[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg2" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage2" v-if="imgList2.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					请上传身份证反面照
				</view>
				<view class="action">
					{{imgList3.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList3" :key="index" @tap="ViewImage3" :data-url="imgList3[index]">
						<image :src="imgList3[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg3" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage3" v-if="imgList3.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction margin-top-sm">
				<button type="primary" :disabled="iscommit" class="cu-btn bg-blue lg" @tap="identfy">{{isIdent}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import mineApi from '../../api/mine.js'
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				imgList1: [],
				imgList2: [],
				imgList3: [],
				deedPhotos: '',
				negativePicture: '',
				positivePicture: '',
				isdisabled: false,
				iscommit: false,
				isIdent: '上传',
				img1: '',
				img2: '',
				img3: '',
				status: 0
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad() {
			this.loadIdentData();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.loadIdentData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			loadIdentData() {
				mineApi.getOwnerInfo(this.userInfo.ownerId).then(res => {
					console.log(res)
					if (res.data.status === 1) {
						this.status = 1;
					} else if (res.data.status === 2) {
						this.status = 2;
						this.isdisabled = true;
						this.isIdent = '已认证';
						this.img1 = res.data.deedPhotos;
						this.img2 = res.data.positivePicture;
						this.img3 = res.data.negativePicture;
					}
				})
			},
			ChooseImage1() {
				uni.chooseImage({
					count: 1, //默认1
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: async (res) => {
						this.imgList1 = res.tempFilePaths;
						const [error, result] = await uni.uploadFile({
							url: 'http://119.3.191.135:9999/image/upload',
							filePath: res.tempFilePaths[0],
							name: 'file'
						});
						this.deedPhotos = JSON.parse(result.data).data;
					}

				});
			},
			ViewImage1(e) {
				uni.previewImage({
					urls: this.imgList1,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg1(e) {
				uni.showModal({
					title: '尊敬的业主',
					content: '确定要删除这张照片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList1.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ChooseImage2() {
				uni.chooseImage({
					count: 1, //默认1
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: async (res) => {
						this.imgList2 = res.tempFilePaths;
						const [error, result] = await uni.uploadFile({
							url: 'http://119.3.191.135:9999/image/upload',
							filePath: res.tempFilePaths[0],
							name: 'file'
						});
						this.positivePicture = JSON.parse(result.data).data;
					}
				});
			},
			ViewImage2(e) {
				uni.previewImage({
					urls: this.imgList2,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg2(e) {
				uni.showModal({
					title: '尊敬的业主',
					content: '确定要删除这张照片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList2.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ChooseImage3() {
				uni.chooseImage({
					count: 1, //默认1
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: async (res) => {
						this.imgList3 = res.tempFilePaths;
						const [error, result] = await uni.uploadFile({
							url: 'http://119.3.191.135:9999/image/upload',
							filePath: res.tempFilePaths[0],
							name: 'file'
						});
						this.negativePicture = JSON.parse(result.data).data;
					}
				});
			},
			ViewImage3(e) {
				uni.previewImage({
					urls: this.imgList3,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg3(e) {
				uni.showModal({
					title: '尊敬的业主',
					content: '确定要删除这张照片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList3.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			identfy() {
				let ident = {}
				ident.deedPhotos = this.deedPhotos;
				ident.id = this.userInfo.userId;
				ident.negativePicture = this.negativePicture;
				ident.positivePicture = this.positivePicture;

				console.log(ident)
				mineApi.attest(ident).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.iscommit = true;
						this.isIdent = '已提交';
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
					}
				})

			},
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.action {
		font-weight: bold;
	}

	image {
		margin: 0 auto;
	}

	.imgg {
		margin-bottom: 15px;
	}

	.cef {
		background-color: #FFFFFF;
		width: 100%;
		height: 100%;
	}
</style>
