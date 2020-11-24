import request from '../utils/request'

/**
 * 获取所有的评价留言列表
 */
const messageList = function(userId){
	return request({
		url:'http://119.3.191.135:9999/messageInfo/all/'+userId,
		method:'GET'
	})
}

//发表留言
const uploadMessage = function(message){
	return request({
		url:'http://119.3.191.135:9999/messageInfo',
		method:'POST',
		data:message
	})
}


export default{
	uploadMessage,
	messageList
}