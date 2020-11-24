import request from '../utils/request'
/**
 * 获取最新得通知与公告
 */
const getLatestNotice = function(userId){
	return request({
		url:'http://119.3.191.135:9999/notice/latest/'+userId,
		method:'POST'
	})
}
/**
 * 根据Id获取通知与公告信息
 * @param {Object} id 通知与公告Id
 */
const noticeById = function(id){
	return request({
		url:'http://119.3.191.135:9999/notice/list/'+id,
		method:'GET'
	})
}
/**
 * 获取所有地通知与公告列表
 */
const noticeList = function(){
	return request({
		url:'http://119.3.191.135:9999/notice/all',
		method:'GET'
	})
}

const confirmNotice = function(data){
	return request({
		url:'http://119.3.191.135:9999/notice/confirmReceive',
		method:'POST',
		data:data
	})
}

//通过用户ID和通知ID获取通知信息
const getNotice = function(noticeId,userId){
	return request({
		url:'http://119.3.191.135:9999/notice/'+noticeId+'/'+userId,
		method:'GET'
	})
}

export default{
	getLatestNotice,
	noticeById,
	noticeList,
	confirmNotice,
	getNotice,
}