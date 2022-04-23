<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检测更新
			// #ifdef APP-PLUS
			this.$U.update()
			// #endif
			// 网络监听
			this.$U.onNetWork()
			// 初始化用户登录状态
			this.$store.dispatch('initUser')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	/* 官方css库 */
	@import "./common/uni.css";

	@import "./common/iconfont.css";
	@import "./common/animate.css";
	/* 全局样式 */
	@import "./common/free.css";
	@import "./common/common.css";
</style>
