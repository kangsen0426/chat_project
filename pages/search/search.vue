<template>
	<view>
		<template v-if="searchList.length === 0">
			<view class="py-2 font-md px-2">
				搜索历史
			</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-2 py-1" hover-class="bg-light"
					v-for="(item,index) in list" :key="index" @click="historyClick(item)">
					{{item}}
				</view>
			</view>
		</template>
		<template v-else>
			<block v-for="(item,index) in searchList" :key="index">
				<common-list :item="item" :index="index" @follow="togglefollow" @togglesupport="doSupport">
				</common-list>
				<divider></divider>
			</block>
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
