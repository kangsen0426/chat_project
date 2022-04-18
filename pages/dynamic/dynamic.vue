<template>
	<view>
		<!-- 导航 -->
		<nav-bar :border="false" :fixed="true" :statusBar="true" @click-right="openAddInput">
			<view class="flex align-center justify-center font-weight-bold w-100">
				<view class="mx-1" @click="changeTab(index)" v-for="(item,index) in tabBars" :key="index"
					:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-light-muted'">
					{{item.name}}
				</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</nav-bar>

		<swiper :duration="500" :current="tabIndex" @change="onchangeTab" :style="'height:'+scrollH+'px'">
			<swiper-item>
				<scroll-view @scrolltolower="handleLoadMore" scroll-y="true" :style="'height:'+scrollH+'px'">
					<template v-if="list.length > 0">
						<block v-for="(item,index) in list" :key="index">
							<common-list :item="item" :index="index" @follow="togglefollow" @togglesupport="doSupport">
							</common-list>
							<divider></divider>
						</block>
						<load-more :loadmore="loadmoretip"></load-more>
					</template>
					<!-- 无数据 -->
					<template v-else>
						<no-thing></no-thing>
					</template>

				</scroll-view>

			</swiper-item>

			<swiper-item>
				<scroll-view @scrolltolower="handleLoadMore" scroll-y="true" :style="'height:'+scrollH+'px'">
					<!-- <template v-if="item.list.length > 0"> -->
					<!-- 轮播图 -->
					<swiper class="px-2 pb-2" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="(item,index) in swiperList" :key="index">
							<image :src="item.src" style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
					</swiper>
					<!-- 搜索框 -->
					<view class="p-2">
						<view class="bg-light rounded flex align-center justify-center py-2 text-secondary"
							@click="openSearch">
							<text class="iconfont icon-sousuo mr-2"></text>
							搜索话题
						</view>
					</view>
					<!-- 热门分类 -->
					<hot-cat-box :hotCate="hotCatList"></hot-cat-box>
					<!-- 最近更新 -->
					<view class="p-2 font-md">最近更新</view>
					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item" :index="index"></topic-list>
					</block>
					<!-- <load-more :loadmore="item.loadmore"></load-more> -->
					<!-- </template> -->
					<!-- 无数据 -->
					<template v-if="topicList.length === 0">
						<no-thing></no-thing>
					</template>

				</scroll-view>
			</swiper-item>

		</swiper>

	</view>
</template>

<script>
	import navBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from "@/components/common/commonList.vue"
	import loadMore from "@/components/common/loadmore.vue"
	import hotCatBox from "@/components/news/hot-cate.vue"
	import topicList from "@/components/news/topic-list.vue"
	export default {
		components: {
			navBar,
			commonList,
		
			loadMore,
		
			hotCatBox,
			topicList
		},
		data() {
			return {
				scrollH: 600,
				tabIndex: 0,
				loadmoretip: '上拉加载更多',
				tabBars: [{
					name: '关注'
				}, {
					name: '话题'
				}],
				swiperList: [{
						src: 'https://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/dc4db058-ea1e-4180-bcfe-f68a02a68859.jpeg'
					},
					{
						src: 'https://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/dc4db058-ea1e-4180-bcfe-f68a02a68859.jpeg'
					},
					{
						src: 'https://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/dc4db058-ea1e-4180-bcfe-f68a02a68859.jpeg'
					},
				],
				topicList: [{
					cover: '/static/demo/topicpic/1.jpeg',
					title: '车室test',
					desc: '搜索框咱们三',
					today_count: 0,
					news_count: 0
				}, {
					cover: '/static/demo/topicpic/1.jpeg',
					title: '车室test',
					desc: '搜索框咱们搜索框咱们三搜索框三',
					today_count: 0,
					news_count: 0
				}],
				hotCatList: [{
						name: '财经'
					},
					{
						name: '游戏'
					},
					{
						name: '前端'
					},
					{
						name: '大数据'
					},

				],
				list: [{
					username: '千北',
					useravatar: '',
					newstime: '2022-04-15',
					isFollow: true,
					title: '测试',
					titlepic: '/static/demo/banner1.jpg',
					support: {
						type: 'support',
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_num: 2
				}, {
					username: '千北',
					useravatar: '',
					newstime: '2022-04-15',
					isFollow: false,
					title: '测试',
					titlepic: '',
					support: {
						type: 'unsupport',
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_num: 2
				}, {
					username: '千北',
					useravatar: '',
					newstime: '2022-04-15',
					isFollow: false,
					title: '测试',
					titlepic: '/static/demo/banner1.jpg',
					support: {
						type: '',
						support_count: 0,
						unsupport_count: 0
					},
					comment_count: 0,
					share_num: 0
				}],

			};
		},
		onLoad() {
			let _this = this
			let res = uni.getSystemInfo({
				success(res) {
					_this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
		},
		methods: {
			openSearch() {

			},
			onchangeTab(e) {
				// 内容切换
				this.tabIndex = e.detail.current
			},
			handleLoadMore() {

				//防止重复加载
				if (this.loadmoretip !== '上拉加载更多') {
					return
				}

				this.loadmoretip = '加载中...'

				setTimeout(() => {
					this.loadmoretip = '上拉加载更多'
				}, 2000)
			},
			changeTab(index) {
				if (this.tabIndex === index) return
				this.tabIndex = index
			},
			openAddInput() {
				uni.navigateTo({
					url: '../addInput/addInput'
				})
			},
			togglefollow(index) {


				this.list[index].isFollow = true
				uni.showToast({
					title: '关注成功',
					icon: 'success'
				})
			},
			doSupport(e) {


				let index = e.index
				let type = e.type

				let item = this.list[index]
				// this.list[index].support.type = type
				// this.list[index].support[type + '_count']++

				// 之前没有操作过
				if (item.support.type === '') {
					item.support[type + '_count']++
				} else if (item.support.type === 'support' && type === 'unsupport') {
					// 顶 - 1
					item.support.support_count--;
					// 踩 + 1
					item.support.unsupport_count++;
				} else if (item.support.type === 'unsupport' && type === 'support') { // 之前踩了
					// 顶 + 1
					item.support.support_count++;
					// 踩 - 1
					item.support.unsupport_count--;
				} else if (item.support.type === type) {
					item.support[type + '_count']--
					item.support.type = ''
					return
				}
				item.support.type = type

			}
		}
	}
</script>

<style lang="scss">

</style>
