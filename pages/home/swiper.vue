<template>
	<view>
		<swiper v-if="!hasLogin" class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item @tap="gotoTatget('login','')">
				<image src="../../static/welcome.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<swiper v-else class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="gotoTatget(item.type,item.targetId)">
				<image :src="item.src" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import AdAPI from '../../api/ad.js'
	import newsAPI from '../../api/news.js'
	import {
		mapState
	} from 'vuex';

	export default {
		name: "home",
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'news',
					src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597496950073&di=9bd545087fe7aa9cc5dbafbbab9c1179&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190814%2F903e564264974ce8868b4bd0f9afca1b.jpeg',
					targetId: 3
				}, {
					id: 1,
					type: 'news',
					src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597497519701&di=321919558568197c3959e985372c8d02&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2F87caa46a32b5863bb657cec722c7a06d.jpeg',
					targetId: 1
				}, {
					id: 2,
					type: 'notice',
					src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597497112092&di=abf8a8120378ea66e312b2029ba86ef6&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F5837872971%2F0',
					targetId: 5
				}, {
					id: 3,
					type: 'notice',
					src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597497194648&di=fbee6d06ec3333e4658e2f9d461ea382&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190425%2Fda364725e9e14285bbe8876c7a08902b.jpeg',
					targetId: 6
				}, {
					id: 4,
					type: 'ad',
					src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1700017516,3736924449&fm=26&gp=0.jpg',
					targetId: 'http://www.jkez.cn/html/solution/'
				}
				/* , {
					id: 5,
					type: 'public',
					src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					targetId: 1
				}, {
					id: 6,
					type: 'public',
					src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
					targetId: 1
				}, */
				]
			};
		},
		onLoad() {
			/* console.log("1224")
			AdAPI.getAdCarousel().then(res=>{
				if(res.code === 200){
					this.swiperList = res.data;
				}
			}) */
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			gotoTatget(type, targetId) {
				console.log(type)
				console.log(targetId)
				if (type === 'news') {
					uni.navigateTo({
						url: '/pages/home/newsdetail?id=' + targetId
					})
				}else if(type === 'notice'){
					uni.navigateTo({
						url: '/pages/home/noticedetail?id=' + targetId
					})
				}else if(type === 'ad'){
					console.log('ad');
					plus.runtime.openURL(targetId);
				}else if(type === 'login'){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			}
		},
		onShow() {
			console.log("success")
		}
	}
</script>

<style>
</style>
