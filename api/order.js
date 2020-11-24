import request from '../utils/request'

const getOrderList = function(userId){
	return request({
		url:'http://119.3.191.135:9999/order/listByUserId/'+userId,
		method:'GET'
	})
}

//根据订单id获取订单详情
const getOrderById = function(orderId){
	return request({
		url:'http://119.3.191.135:9999/order/'+orderId,
		method:'GET'
	})
}

//根据订单id修改订单状态
const updateStatus = function(orderId,status){
	return request({
		url:'http://119.3.191.135:9999/order/'+orderId+'/modifyStatus/'+status,
		method:'PUT'
	})
}

const submitOrder = function(data){
	return request({
		url:'http://119.3.191.135:9999/order',
		method:'POST',
		data:data
	})
}

//支付订单
const payOrder = function(orderId){
	return request({
		url:'http://119.3.191.135:9999/order/payOrder/'+orderId,
		method:'PUT'
	})
}

//根据userId获取指定状态的订单信息
const getListByState = function(userId,status){
	return request({
		url:'http://119.3.191.135:9999/order/listByUserId/'+userId+'/status/'+status,
		method:'GET'
	})
}


export default{
	getOrderList,
	getOrderById,
	submitOrder,
	payOrder,
	getListByState,
	updateStatus
}