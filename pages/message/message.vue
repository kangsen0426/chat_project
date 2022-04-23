<template>
	<view>
		<!-- 导航 -->
		<!-- #ifndef APP-PLUS -->
		<uni-nav-bar :shadow="false" :border="false"
		@click-left="clickLeft" @click-right="clickRight" title="小纸条">
			<!-- 左边图标 -->
			<block slot="left">
				<view class="iconfont icon-user-detail mx-2" 
				style="font-size: 22px;"></view>
			</block>
			<!-- 右边图标 -->
			<block slot="right">
				<view class="icon iconfont icon-zengjia" 
				style="font-size: 22px;"></view>
			</block>
		</uni-nav-bar>
		<!-- #endif -->
		
		<template v-if="list.length > 0">
		<!-- 消息列表 -->
		<block v-for="(item,index) in list" :key="index">
			<msg-list :item="item" :index="index"></msg-list>
		</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="flex align-center justify-center font-md border-bottom py-2" hover-class="bg-light" @click="popupEvent('friend')">
				<text class="iconfont icon-sousuo mr-2"></text> 添加好友
			</view>
			<view class="flex align-center justify-center font-md py-2" hover-class="bg-light"  @click="popupEvent('clear')">
				<text class="iconfont icon-shanchu mr-2"></text> 清除列表
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import msgList from '@/components/message/msgList.vue';

	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import { mapState } from 'vuex'
	export default {
		components: {
			msgList,
			uniPopup,
			uniNavBar
		},
		data() {
			return {
				
			}
		},
		// 页面加载
		onLoad() {
			
		},
		computed: {
			...mapState({
				list:state=>state.chatList
			})
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		// 监听原生导航栏按钮事件
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0: // 左边
				uni.navigateTo({
					url: '../userList/userList',
				});
				// 关闭弹出层
				this.$refs.popup.close()
					break;
				case 1: // 右边
				this.$refs.popup.open()
					break;
			}
		},
		methods: {
			// #ifndef APP-PLUS
			clickLeft(){
				this.navigateTo({
					url: '../userList/userList',
				})
				this.$refs.popup.close()
			},
			clickRight(){
				this.$refs.popup.open()
			},
			// #endif
			// 下拉刷新
			refresh(){
				setTimeout(()=>{
					this.list = demo
					// 停止下拉刷新
					uni.stopPullDownRefresh()
				},2000)
			},
			// 弹出层选项点击事件
			popupEvent(e){
				switch (e){
					case 'friend':
					uni.navigateTo({
						url: '../search/search?type=user',
					});
						break;
					case 'clear':
					this.$store.commit('clearChatList')
					uni.showToast({
						title: '清除成功',
						icon: 'none'
					});
					console.log('清除列表');
						break;
				}
				// 关闭弹出层
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>

</style>

