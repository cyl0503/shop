import request from '../utils/request'
/**
 * 根据Id获取新闻信息
 * @param {Object} id 新闻Id
 */
const newsDetailById = function(id){
	return request({
		url:'http://119.3.191.135:9999/newsInfo/'+id,
		method:'GET'
	})
}
/**
 * 获取所有的新闻列表
 */
const newsList = function(){
	return request({
		url:'http://119.3.191.135:9999/newsInfo/all',
		method:'GET'
	})
}


export default{
	newsDetailById,
	newsList
}