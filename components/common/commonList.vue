<template>
	<view class="commen_list_wrap">
		<!-- 信息区域 -->
		<view class="user_info_box">
			<view class="user_info">
				<image @click="openUserSpace" :src="item.useravatar ? item.useravatar : '/static/default.jpg'" lazy-load
					mode="aspectFit">
				</image>
				<view>
					<view class="user_name">
						{{item.username}}
					</view>
					<text class="time">
						{{item.newstime}}
					</text>
				</view>
			</view>
			<view class="follow animated" hover-class="jello" @click="follow" v-if="!item.isFollow">
				关注
			</view>
		</view>
		<view class="title_box" @click="openDetail">
			{{item.title}}
		</view>
		<view class="img_box" v-if="item.titlepic" @click="openDetail">
			<image :src="item.titlepic"></image>
		</view>
		<view class="btn_wrap">
			<view class="btn_item animated" hover-class="rubberBand text-main" @click="support">
				<text
					:class="['iconfont',item.support.type === 'support' ? 'icon-dianzan1 text-main' : 'icon-dianzan2']"
					style="margin-right: 20rpx;"></text>
				<text>{{item.support.support_count > 0 ? item.support.support_count :'顶'}}</text>
			</view>
			<view class="btn_item animated" hover-class="rubberBand text-main" @click="unsupport">
				<text :class="['iconfont',item.support.type === 'unsupport' ? 'icon-cai text-main' : 'icon-cai']"
					style="margin-right: 20rpx;"></text>
				<text>{{item.support.unsupport_count > 0 ? item.support.unsupport_count : '踩'}}</text>
			</view>
			<view class="btn_item animated" hover-class="rubberBand text-main" @click="doComment">
				<text class="iconfont icon-pinglun2" style="margin-right: 20rpx;"></text>
				<text>{{item.comment_count > 0 ? item.comment_count : '评论'}}</text>
			</view>
			<view class="btn_item animated" hover-class="rubberBand text-main" @click="doShare">
				<text class="iconfont icon-zhuanfa1" style="margin-right: 20rpx;"></text>
				<text>{{item.share_num > 0 ? item.share_num :'分享'}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				required: true
			},
			index: {
				type: Number
			},
			isdetail: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			openUserSpace() {

			},
			follow() {
				this.$emit('follow', this.index)
			},
			openDetail() {
				// 处于详情中
				if (this.isdetail) return;
				uni.navigateTo({
					url: "../../pages/detail/detail?detail=" + JSON.stringify(this.item)
				})
			},
			support() {
				this.$emit('togglesupport', {
					type: 'support',
					index: this.index
				})
			},
			unsupport() {
				this.$emit('togglesupport', {
					type: 'unsupport',
					index: this.index
				})
			},
			// 评论
			doComment() {
				// this.checkAuth(() => {
				if (!this.isdetail) {
					return this.openDetail()
				}
				this.$emit('doComment')
				// })
			},
			// 分享
			doShare() {
				if (!this.isdetail) {
					return this.openDetail()
				}
				this.$emit('doShare')
			}
		}
	}
</script>

<style lang="scss">
	.commen_list_wrap {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;


		.user_info_box {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.user_info {
				display: flex;
				align-items: center;

				image {
					width: 65rpx;
					height: 65rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.user_name {
					font-size: 30rpx;
					line-height: 1.5;
				}

				.time {
					color: #9D9589;
					font-size: 25rpx;
					line-height: 1.5;
				}

			}

			.follow {
				width: 90rpx;
				height: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 6rpx;
				background-color: #FF4A6A;
				color: #FFFFFF;
			}


		}

		.title_box {
			font-size: 30rpx;
			padding: 16rpx 0;
		}

		.img_box {
			width: 100%;

			image {
				width: 100%;
				height: 350rpx;
				border-radius: 6rpx;
			}
		}

		.btn_wrap {
			display: flex;
			align-items: center;
			padding: 10rpx 0;

			.btn_item {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}



	}
</style>
