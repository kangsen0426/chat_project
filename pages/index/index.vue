<template>
	<view>
		<scroll-view :scroll-into-view="scrollInto" scroll-with-animation scroll-x="true" class="scroll-row"
			style="height: 100rpx;">
			<view v-for="(item,i) in tabBars" :key="i" :id="'tab'+i" class="scroll-row-item px-5 py-2 font-md"
				:class="tabIndex === i ? 'text-main font-lg font-weight-bold' : ''" @click="changeTab(i)">{{item.name}}
			</view>
		</scroll-view>
		<swiper :duration="500" :current="tabIndex" @change="onchangeTab" :style="'height:'+scrollH+'px'">
			<swiper-item v-for="(item,i) in newsList" :key="i">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px'">
					<block v-for="(item2,index) in item.list" :key="index">
						<common-list :item="item2" :index="index" @follow="togglefollow" @togglesupport="doSupport">
						</common-list>
						<divider></divider>
					</block>
				</scroll-view>
			</swiper-item>

		</swiper>

	</view>

</template>

<script>
	import commonList from "../../components/common/commonList.vue"
	import divider from '../../components/common/divider.vue'
	export default {
		components: {
			commonList,
			divider
		},
		data() {
			return {
				scrollH: 600,
				tabIndex: 0,
				scrollInto: 'tab0',
				tabBars: [{
					name: '推荐'
				}, {
					name: '财经'
				}],
				newsList: []
			}
		},
		onLoad() {
			let _this = this
			let res = uni.getSystemInfo({
				success(res) {
					_this.scrollH = res.windowHeight - uni.upx2px(100)
				}
			})
			this.getNewsList()
		},
		methods: {
			getNewsList() {
				let arr = []

				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
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
						}]
					}
					arr.push(obj)
				}
				
				this.newsList = arr
			},
			onchangeTab(e) {
				this.changeTab(e.detail.current)
			},
			changeTab(index) {
				if (this.tabIndex === index) {
					return
				}
				this.tabIndex = index
				this.scrollInto = 'tab' + index

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

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
