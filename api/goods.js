import request from '../utils/request'

// 获取热卖商品API
const hotSaleGoods = function(){
	return request({
		url:'http://119.3.191.135:9999/goodsInfo/hostSale',
		method:'GET'
	})
}

// 获取商品详情信息
const goodsDetail = function(id){
	return request({
		url:'http://119.3.191.135:9999/goodsInfo/'+id,
		method:'GET'
	})
}

/**
 * 添加购物车
 * @param {Object} shopCar
 */
const addShopCar = function(data){
	return request({
		url:'http://119.3.191.135:9999/goodsInfo/addToShoppingCart',
		method:'POST',
		data:data
	})
}

const cartList = function(userId){
	return request({
		url:'http://119.3.191.135:9999/goodsInfo/getShopCar/'+userId,
		method:'POST'
	})
}

const deleteCartItem = function(goodId){
	return request({
		url:'http://119.3.191.135:9999/goodsInfo/removeShopCar/'+goodId,
		method:'POST'
	})
}

const changeGoodCnt = function(goodId,count){
	return request({
		url:'http://119.3.191.135:9999/goodsInfo/shopCar/'+goodId+'/number/'+count,
		method:'POST'
	})
}

//按商品名称模糊查询商品
const getGoodsByName = function(goodsName){
	return request({
		url:'http://119.3.191.135:9999/goodsInfo/goodsByName?name='+goodsName,
		method:'POST'
	})
}

//按商品分类查询商品
const getGoodsByTag = function(name){
	return request({
		url:'http://119.3.191.135:9999/goodsInfo/list/typeName/'+name,
		method:'GET'
	})
}
	
export default{
	hotSaleGoods,
	goodsDetail,
	addShopCar,
	cartList,
	deleteCartItem,
	changeGoodCnt,
	getGoodsByName,
	getGoodsByTag
}