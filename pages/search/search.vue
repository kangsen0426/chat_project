<template>
	<view>
		<!-- 自定义导航 -->
		<!-- #ifndef APP-PLUS -->
		<view style="height: 88rpx;z-index: 9999;"
			class="flex align-center px-2 position-fixed left-0 top-0 right-0 bg-white">
			<view class="iconfont icon-sousuo position-absolute text-muted" style="left: 30rpx;"></view>
			<input class="flex-1 rounded bg-light" style="padding: 5rpx 0 5rpx 50rpx;" type="text" v-model="searchText"
				@confirm="searchEvent" placeholder="搜索" placeholder-style="color: #CCCCCC;" />
			<text class="pl-2" @click="goBack">取消</text>
		</view>
		<view style="height: 88rpx;"></view>
		<!-- #endif -->

		<template v-if="searchList.length === 0">
			<!-- 搜索历史 -->
			<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-2" v-for="(item,index) in list" :key="index"
					hover-class="bg-light" @click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</template>
		<template v-else>
			<!-- 数据列表 -->
			<block v-for="(item,index) in searchList" :key="index">
				<template v-if="type ==='post'">
					<!-- 帖子 -->
					<common-list :item="item" :index="index"></common-list>
				</template>
				<template v-else-if="type === 'topic'">
					<!-- 话题 -->
					<topic-list :item="item" :index="index"></topic-list>
				</template>
				<template v-else>
					<!-- 用户 -->
					<user-list :item="item" :index="index"></user-list>
				</template>
			</block>

			<!-- 上拉加载 -->
			<load-more :loadmore="loadmore"></load-more>
		</template>

	</view>
</template>

<script>
	import commonList from "@/components/common/commonList.vue"
	export default {
		components: {
			commonList
		},
		data() {
			return {
				type: '',
				searchText: '',
				searchList: [],
				list: [
					'test1',
					'te阿大撒',
					'安徽督军啊',
					'tesada',
				]
			};
		},
		onNavigationBarSearchInputChanged(e) {
			let text = e.text
			this.searchText = text
		},
		onNavigationBarButtonTap(e) {

			if (e.index === 0) {
				this.search()
			}

		},
		onLoad(e) {

			if (e.type) {
				this.type = e.type
			}
			let pageTitle = '帖子'
			switch (this.type) {
				case 'post':
					pageTitle = '帖子'
					// 监听关注和顶踩操作
					// uni.$on('updateFollowOrSupport', (e) => {
					// 	switch (e.type) {
					// 		case 'follow': // 关注
					// 			this.follow(e.data.user_id)
					// 			break;
					// 		default:
					// 			break;
					// 	}
					// })
					break;
				case 'topic':
					pageTitle = '话题'
					break;
				case 'user':
					pageTitle = '用户'
					break;
			}
			// 修改搜索占位
			// #ifdef APP-PLUS
			let currentWebview = this.$mp.page.$getAppWebview();
			let tn = currentWebview.getStyle().titleNView;
			tn.searchInput.placeholder = '搜索' + pageTitle;
			currentWebview.setStyle({
				titleNView: tn
			})
			// #endif
			// 取出搜索历史
			let list = uni.getStorageSync('historySeachText')
			if (list) {
				this.list = JSON.parse(list)
			}


		},
		methods: {
			search() {
				// 收起键盘
				uni.hideKeyboard()
				uni.showLoading({
					title: '加载中'
				})

				console.log('search')

				uni.hideLoading()
			},
			historyClick(key) {
				this.searchText = key
				this.search()
			},
			togglefollow() {

			},
			doSupport() {

			}
		}
	}
</script>

<style lang="scss">

</style>
