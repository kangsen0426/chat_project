<template>
	<view class="commen_list_wrap">

		<view class="list">
			<!-- 信息区域 -->
			<view class="user_info_box">
				<view class="user_info_outer">
					<image src="../../static/default.jpg" lazy-load mode="aspectFit"></image>
					<view class="user_info">
						<view class="user_name">
							昵称
						</view>
						<text class="time">
							2022-04-15
						</text>
					</view>
				</view>
			</view>

		</view>
		<view class="title_box">

		</view>
		<view class="img_box">

		</view>
		<view class="btn_wrap">

		</view>

	</view>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	.commen_list_wrap {
		width: 100%;

		.list {
			padding: 20rpx;


			.user_info_box {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.user_info_outer {
					image {
						width: 65rpx;
						height: 65rpx;
						border-radius: 50%;
					}

					.user_info {
						display: flex;
						align-items: center;

						.user_name {
							font-size: 30rpx;
						}

						.time {
							color: #9D9589;
						}
					}
				}


			}


		}
	}
</style>
