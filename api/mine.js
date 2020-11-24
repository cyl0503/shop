import request from '../utils/request'

//创建账号
const createOwner = function(owner) {
	return request({
		url: 'http://119.3.191.135:9999/userInfo/complete',
		method: 'POST',
		data: owner
	})
}

//修改密码
const modifyPassword = function(options) {
	return request({
		url: 'http://119.3.191.135:9999/userInfo/modifyPassword',
		method: 'PUT',
		data: options
	})
}

//根据业主id获取业主信息
const getOwnerInfo = function(Id) {
	return request({
		url: 'http://119.3.191.135:9999/ownerInfo/' + Id,
		method: 'GET'
	})
}

//上传图片
const uploadImg = function(img) {
	return request({
		url: 'http://119.3.191.135:9999/image/upload',
		method: 'POST',
		data: img
	})
}

//上传认证
const attest = function(ident) {
	return request({
		url: 'http://119.3.191.135:9999/ownerInfo/attest',
		method: 'PUT',
		data: ident
	})
}

//修改头像
const updatePhoto = function(avatar, userId) {
	return request({
		url: 'http://119.3.191.135:9999/userInfo/modifyAvatarOfUser?avatar='+avatar+'&userId='+userId,
		method: 'PUT',
	})
}

//根据用户id获取验证码
const getSMS = function(userId, phone) {
	return request({
		url: 'http://119.3.191.135:9999/sms?id='+userId+'&phone='+phone,
		method: 'POST',
	})
}

//根据业主id修改手机号
const upPhoneNum = function(ownerId, phone) {
	return request({
		url: 'http://119.3.191.135:9999/ownerInfo/'+ownerId+'/modifyPhone/'+phone,
		method: 'PUT',
	})
}

export default {
	createOwner,
	modifyPassword,
	getOwnerInfo,
	uploadImg,
	attest,
	updatePhoto,
	getSMS,
	upPhoneNum
}
