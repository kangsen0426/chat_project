<template>
	<view>

		<!-- 文本域 -->
		<textarea v-model="content" placeholder="写点什么" maxlength="1000" class="uni-textarea px-2"
			style="width: 100%;height:500rpx; border-box;" />

		<!-- 图片上传 -->
		<upload-image ref="uploadImage" :show="showUpload" :list="imageList" @change="handleImgChange"></upload-image>


		<!-- 底部操作条 -->
		<view class="fixed-bottom bg-white flex align-center" style="height: 85rpx;">
			<view class="iconfont icon-caidan footer_btn animated" hover-class="jello"></view>
			<view class="iconfont icon-huati footer_btn animated" hover-class="jello"></view>
			<view class="iconfont icon-tupian footer_btn animated" hover-class="jello"
				@click="iconClickEvent('uploadImage')"></view>
			<view class="bg-main text-white ml-auto rounded flex justify-center align-center mr-2 animated"
				style="width: 140rpx;height: 60rpx;" hover-class="jello">发送
			</view>
		</view>
	</view>
</template>

<script>

	import uploadImage from '../../components/common/upload-image.vue'
	export default {
		components: {
			uploadImage
		},
		data() {
			return {
				content: '',
				imageList: [],
				showBack: false,

			};
		},
		computed: {
			showUpload() {
				return this.imageList.length > 0
			}
		},
		onBackPress() {
			if ((this.content !== '' || this.imageList.length) && !this.showBack) {
				uni.showModal({
					content: '是否要保存为草稿？',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						// 点击确认
						if (res.confirm) {
							this.store()
						} else { // 点击取消，清除缓存
							uni.removeStorage({
								key: "add-input"
							})
						}
						// 手动执行返回
						uni.navigateBack({
							delta: 1
						});
					},
				});
				this.showBack = true
				return true
			}

		},
		onLoad() {
			uni.getStorage({
				key: "add-input",
				success: (res) => {
					if (res.data) {
						let result = JSON.parse(res.data)
						this.content = result.content
						this.imageList = result.imageList
					}
				}
			})
		},
		methods: {
			iconClickEvent(type) {
				console.log(type)
				switch (type) {
					case 'uploadImage':
						this.$refs.uploadImage.chooseImage()
						break
				}
			},
			handleImgChange(list) {
				this.imageList = list
			},
			// 保存操作
			store() {
				// 保存为本地存储
				let obj = {
					content: this.content,
					imageList: this.imageList
				}
				uni.setStorage({
					key: 'add-input',
					data: JSON.stringify(obj)
				})
			}
		}
	}
</script>

<style lang="scss">
	.footer_btn {
		width: 86rpx;
		height: 86rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 50rpx;
	}
</style>
