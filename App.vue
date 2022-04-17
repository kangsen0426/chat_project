<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	@import "uview-ui/index.scss";
	/* 官方css库 */
	@import "./common/uni.css";
	
	@import "./common/iconfont.css";
	@import "./common/animate.css";
	/* 全局样式 */
	@import "./common/free.css";
	@import "./common/common.css";
</style>
