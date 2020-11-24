import request from '../utils/request'
/**
 * 获取用户对应地问卷调查列表
 * @param {Object} userId 用户Id
 */
const surveyList = function (userId){
	return request({
		url:'http://119.3.191.135:9999/surveyInfo/all',
		method:'GET'
	});
}
/**
 * 获取问卷调查详情 
 * @param {Object} surveyId 问卷调查Id
 * @param {Object} voteId 投票Id
 */
const surveyDetail = function(surveyId,userId){
	return request({
		url:'http://119.3.191.135:9999/surveyInfo/'+surveyId+'/user/'+userId+'}',
		method:'GET'
	})
}
/**
 * 进行投票
 * @param {Object} data
 */
const fillIn = function(data){
	return request({
		url:'http://119.3.191.135:9999/surveyInfo/fillIn',
		method:'POST',
		data:data
	})
}

export default{
	surveyList,
	surveyDetail,
	fillIn
}