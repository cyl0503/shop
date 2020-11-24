//es6 + promise + nui.request
export default (params) => {
	// 加载效果
	uni.showLoading({
		title:'加载中...'
	});	 
	// 请求参数中加入token
	const headers = { 
		Authorization:uni.getStorageSync('token')
	};
	// 添加请求头
	params.headers = headers;
	// 返回一个promise
	return new Promise((resolve,reject) => {
		uni.request({
			...params,  
			// 请求成功后回调函数
			success(res){
				// 直接返回请求结果中的数据
				resolve(res.data);
			},
			// 请求失败后回调函数
			fail(err){
				reject(err);
			},
			// 请求完成后回调函数
			complete(){
				// 关掉加载
				uni.hideLoading();
			}
		})
	});
}