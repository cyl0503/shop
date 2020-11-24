import request from '../utils/request'

const hostSale = function(){
	return request({
		url:'http://119.3.191.135:9999/goodsInfo/hostSale',
		method:'GET'
	})
}

export default{
	hostSale
}