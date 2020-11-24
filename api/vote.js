import request from '../utils/request'

const votelists =function(){
	return request({
		url:'http://119.3.191.135:9999/voteInfo/all',
		method:'GET'
	})
}

/**
 * 获取用户对应地投票列表
 * @param {Object} userId 用户Id
 */
const voteList = function (userId){
	return request({
		url:'http://119.3.191.135:8080/voteTheme/list/user/'+userId,
		method:'GET'
	});
}

/**
 * 获取用户对应地投票详情 
 * @param {Object} userId 用户Id
 * @param {Object} voteId 投票Id
 */
const voteDetail = function(voteId){
	return request({
		url:'http://119.3.191.135:9999/voteInfo/'+voteId,
		method:'GET'
	})
}

const poll = function(data){
	return request({
		url:'http://119.3.191.135:9999/voteInfo/poll',
		method:'POST',
		data:data
	})
}

//根据投票id获取投票统计信息
const getVoteInfo = function(voteId){
	return request({
		url:'http://119.3.191.135:9999/voteInfo/statistical/'+voteId,
		method:'GET'
	})
}

//判断当前用户是否参与过投票
const voteCheck = function(voteId,userId){
	return request({
		url:'http://119.3.191.135:9999/voteInfo/'+voteId+'/check/'+userId,
		method:'GET'
	})
}

export default{
	votelists,
	voteList,
	voteDetail,
	poll,
	getVoteInfo,
	voteCheck
}