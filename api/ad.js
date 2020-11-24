import request from '../utils/request'

const getStartAD = function(){
	return request({
		url:'http://119.3.191.135:9999/ad/openScreen',
		method:'GET'
	})
}

const getAdCarousel = function(){
	return request({
		url:'http://119.3.191.135:9999/ad/carousel',
		method:'GET'
	})
}


export default{
	getStartAD,
	getAdCarousel
}