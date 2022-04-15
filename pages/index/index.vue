<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<common-list :item="item" :index="index" @follow="togglefollow" @togglesupport="doSupport"></common-list>
			<divider></divider>
		</block>
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
		},
		onLoad() {

		},
		methods: {
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
