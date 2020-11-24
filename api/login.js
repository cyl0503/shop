import request from '../utils/request'


/**
 * 用户登录 
 * @param {Object} userInfo 用户信息对象 
 */
const login = function(userInfo){
	return request({
		url:'http://119.3.191.135:9999/login',
		method:'POST',
		data:{
			userName:userInfo.account,
			password:userInfo.password
		}
	})
}



export default{
	login
}