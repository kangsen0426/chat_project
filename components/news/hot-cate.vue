<template>
	<view>
		<view class="flex align-center justify-between align-center px-2">
			<text class="font-md">热门分类</text>
			<view @click="openMore" class="flex justify-center font text-secondary animated" hover-class="jello">
				更多
				<text class="iconfont icon-jinru"></text>
			</view>
		</view>
		<view class="flex align-center py-2 border-bottom flex-wrap">
			<view @click="openDetail(item)" class="border rounded bg-light mx-1 px-2 my-1 animated" hover-class="jello"
				v-for="(item,index) in hotCate" :key="index">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			hotCate: {
				type: Array,
				required: true
			}
		},
		methods: {
			openMore() {

				console.log('click more')

				// uni.navigateTo({
				// 	url: '../../pages/topic-nav/topic-nav',
				// });
			},
			openDetail(item) {
				console.log('click detail')
			}
		},
	}
</script>

<style>
</style>
