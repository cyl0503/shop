import request from '../utils/request'

//根据用户ID获取地址列表
const getAddress = function(userId){
	return request({
		url:'http://119.3.191.135:9999/address/list/'+userId,
		method:'GET'
	})
}

//根据用户ID获取默认地址
const getDefaultAddress = function(userId){
	return request({
		url:'http://119.3.191.135:9999/address/theDefault/'+userId,
		method:'GET'
	})
}

const editAddress = function(addressData){
	return request({
		url:'http://119.3.191.135:9999/address',
		method:'PUT',
		data:addressData
	})
}


const addAddress = function(addressData){
	return request({
		url:'http://119.3.191.135:9999/address',
		method:'Post',
		data:addressData
	})
}

export default{
	getAddress,
	editAddress,
	addAddress,
	getDefaultAddress
}