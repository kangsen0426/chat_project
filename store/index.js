import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		loginStatus: false,
		token: false,
		user: {},
	},
	getters: {

	},
	mutations: {
		// 登录
		login(state, user) {
			state.loginStatus = true
			state.user = user
			state.token = state.user.token
			uni.setStorageSync('user', JSON.stringify(user));
			uni.$emit('updateIndex')
		},
		// 退出登录
		logout(state) {
			state.loginStatus = false
			state.user = {}
			state.token = false
			uni.removeStorageSync('user');
			uni.$emit('updateIndex')
		},
		// 修改用户信息(手机号,邮箱,密码)
		editUserInfo(state, {
			key,
			value
		}) {
			state.user[key] = value
			uni.setStorageSync('user', JSON.stringify(state.user));
		},
		// 修改资料
		editUserUserInfo(state, obj) {
			if (state.user.userinfo) {
				state.user.userinfo.sex = obj.sex
				state.user.userinfo.qg = obj.qg
				state.user.userinfo.job = obj.job
				state.user.userinfo.path = obj.path
				state.user.userinfo.birthday = obj.birthday
				uni.setStorageSync('user', JSON.stringify(state.user));
			}
		},

	},
	actions: {
		// 初始化登录状态
		initUser({
			state,
			dispatch
		}) {
			let user = uni.getStorageSync('user');
			if (user) {
				state.user = JSON.parse(user)
				state.loginStatus = true
				state.token = state.user.token
				// 打开socket
				// dispatch('openSocket')
			}
		},
		// 用户绑定
		userBind({
			state,
			dispatch
		}, client_id) {
			$http.post('/chat/bind', {
				type: "bind",
				client_id: client_id
			}, {
				token: true
			}).then(data => {
				/*
					{
						"type":"bind",
						"status":true
					}
				*/
				console.log('绑定成功', data);
				// 开始上线
				if (data.status && data.type === 'bind') {
					// 改为上线状态
					state.IsOnline = true
					// 初始化会话列表
					dispatch('initChatList')
					// 获取未读信息
					dispatch('getUnreadMessages')
				}
			}).catch(err => {
				// 失败 退出登录，重新链接等处理
			})
		},
	}

})

export default store
