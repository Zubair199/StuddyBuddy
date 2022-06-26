import axios from "axios";
import { AUTHENTICATIONS, AUTH, USER, CLASS, EXAM, ASSIGNMENT, CHAT } from "./api.constants";

export default {


	// AUTH
	// 	Login : function(values){
	// 		return axios.post(`${AUTHENTICATIONS.API_URL}${AUTH.SIGNIN}`, values)
	// 	},
	// 	Signup : function(values){
	// 		return axios.post(`${AUTHENTICATIONS.API_URL}${AUTH.SIGNUP}`, values)
	// 	},
	// 	checkEmail_resetPassword : function(values){
	// 		return axios.post(`${AUTHENTICATIONS.API_URL}${AUTH.EMAIL_RESET_PASSWORD}`, values)
	// 	},
	// // 	User
	// 	getUserById : function(value,token){
	// 		return axios.get(`${AUTHENTICATIONS.API_URL}${USER.USER_BY_ID}`+ value, { headers: services.authHeader() })
	// 	},
	// 	updateAccount : function(values, value, token){
	// 		return axios.put(`${AUTHENTICATIONS.API_URL}${USER.UPDATE_ACCOUNT}`+ value, values, { headers: services.authHeader() })
	// 	},
	// 	updatePassword : function(values, value, token){
	// 		return axios.put(`${AUTHENTICATIONS.API_URL}${USER.UPDATE_PASS}`+ value, values, { headers: services.authHeader() })
	// 	},

	// Chat 
	initiateChat: function (requestData) {
		return axios.post(`${AUTHENTICATIONS.API_URL}${CHAT.OPENCHAT}`, requestData)
	},
	verifyBlocked: function (requestData) {
		return axios.post(`${AUTHENTICATIONS.API_URL}${CHAT.VERIFYBLOCKED}`, requestData)
	},
	blockChats: function (requestData) {
		return axios.post(`${AUTHENTICATIONS.API_URL}${CHAT.BLOCK}`, requestData)
	},
	getProfile: function (requestData) {
		return axios.get(`${AUTHENTICATIONS.API_URL}${AUTH.SELF}`)
	},
	createNewMessage: function (requestData) {

		return axios.post(`${AUTHENTICATIONS.API_URL}${CHAT.NEWCHAT}`, requestData)
	},


	//  PROFILE
	createClass: function (values, token) {
		return axios.post(`${AUTHENTICATIONS.API_URL}${CLASS.CREATE}`, values)
	},
	createExam: function (values, token) {
		return axios.post(`${AUTHENTICATIONS.API_URL}${EXAM.CREATE}`, values)
	},
	createAssignment: function (values, token) {
		return axios.post(`${AUTHENTICATIONS.API_URL}${ASSIGNMENT.CREATE}`, values)
	},
	// updateDp : function(values, value){
	// 	return axios.post(`${AUTHENTICATIONS.API_URL}${PROFILE.UPDATE_DP}`,values, { headers: services.authHeader() })
	// },
	// updateProfile : function(values, id){
	// 	return axios.put(`${AUTHENTICATIONS.API_URL}${PROFILE.UPDATE_PROFILE}` + id ,values , { headers: services.authHeader() })
	// },
	// getUserProfile : function(value,token){
	// 	return axios.get(`${AUTHENTICATIONS.API_URL}${PROFILE.PROFILE_USER_ID}`+ value + '/profile/'+ Math.random().toString(36).substring(7), { headers: services.authHeader() })
	// },
	// updateStatus : function(values, value, token){
	// 	return axios.put(`${AUTHENTICATIONS.API_URL}${PROFILE.UPDATE_STATUS}`+ value, values, { headers: services.authHeader() })
	// },
	// getChat : function(value){
	// 	return axios.get(`${AUTHENTICATIONS.API_URL}${PROFILE.CHAT}`+ value, { headers: services.authHeader() })
	// },

	// //  Product routes
	// 	createProduct : function(values){
	// 		return axios.post(`${AUTHENTICATIONS.API_URL}${PRODUCT.CREATE}`,values, { headers: services.authHeader() })
	// 	},
	// 	getAllProductsByUID : function(value){
	// 		return axios.get(`${AUTHENTICATIONS.API_URL}${PRODUCT.PRODUCTS_USER_ID}`+value+'/prd/'+ Math.random().toString(36).substring(8), { headers: services.authHeader() })
	// 	},
	// 	deleteProductByID : function(values,value){
	// 		return axios.post(`${AUTHENTICATIONS.API_URL}${PRODUCT.DELETE_PRODUCT_BY_ID}`+value, values, { headers: services.authHeader() })
	// 	},
	// 	updateProduct : function(values,value){
	// 		return axios.put(`${AUTHENTICATIONS.API_URL}${PRODUCT.UPDATE_PRODUCT}`+ value, values, { headers: services.authHeader() })
	// 	},

	// //  Freelance routes
	// 	createFreelance : function(values){
	// 		return axios.post(`${AUTHENTICATIONS.API_URL}${FREELANCE.CREATE}`,values, { headers: services.authHeader() })
	// 	},
	// 	getFreelanceProfileByUID : function(value){
	// 		return axios.get(`${AUTHENTICATIONS.API_URL}${FREELANCE.FREELANCE_USER_ID}`+value+'/u/'+ Math.random().toString(36).substring(8), { headers: services.authHeader() })
	// 	},
	// 	updateFreelance : function(values,value){
	// 		return axios.put(`${AUTHENTICATIONS.API_URL}${FREELANCE.UPDATE_FREELANCE}`+ value, values, { headers: services.authHeader() })
	// 	},
	// 	updateFreelanceDP : function(values,value){
	// 		return axios.post(`${AUTHENTICATIONS.API_URL}${FREELANCE.UPDATE_DP}`, values, { headers: services.authHeader() })
	// 	},
	// 	updateFreelancePortfolio : function(values,value){
	// 		return axios.post(`${AUTHENTICATIONS.API_URL}${FREELANCE.UPDATE_PORTFOLIO}`, values, { headers: services.authHeader() })
	// 	},


	// // 	Google Drive Links
	// 	createLink : function(values){
	// 		return axios.post(`${AUTHENTICATIONS.API_URL}${DRIVE.CREATE}`,values, { headers: services.authHeader() })
	// 	},
	// 	getUserDriveLinks : function(value,token){
	// 		return axios.get(`${AUTHENTICATIONS.API_URL}${DRIVE.DRIVE_USER_ID}`+ value + '/drive/'+ Math.random().toString(36).substring(7), { headers: services.authHeader() })
	// 	},
	// 	updateDriveLinkByID : function(values,value){
	// 		return axios.put(`${AUTHENTICATIONS.API_URL}${DRIVE.UPDATE}`+ value, values, { headers: services.authHeader() })
	// 	},
	// 	deleteDriveLinkByID : function(value){
	// 		return axios.delete(`${AUTHENTICATIONS.API_URL}${DRIVE.DELETE_LINK_BY_ID}`+value, { headers: services.authHeader() })
	// 	},

}