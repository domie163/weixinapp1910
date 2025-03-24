<template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]" style="width: 100%;">
        <view class="action" style="width: 100%;">
            <view :style="{width:'40rpx',borderRadius:'40rpx 0 0 40rpx',height:'80rpx',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
            </view>
            <view v-if="isAuth('guzhangshangbao','新增')" @click="onAddTap()"
			style="text-align: center;"
                  :style="{padding:'0 10rpx',lineHeight:'80rpx',width:'100%',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
                在线报修
            </view>
            <view :style="{width:'40rpx',borderRadius:'0 40rpx 40rpx 0',height:'80rpx',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
            </view>
        </view>
	</view>
	
	<uni-popup ref="deliver" type="center">
		<view
				style="width: 500rpx;background-color: #FFFFFF;height: auto;border-radius: 20rpx;padding-top: 20rpx;">
			<!-- 标题 -->
			<view style="text-align: center;">
				评论
			</view>
			<!-- 内容 -->
			<view style="width: 90%;margin: 0 auto;padding-top: 10rpx;">
				<!-- 评分 -->
				<text style="display: inline-block;margin-bottom: 10rpx;">评分：</text>
				<uni-rate  :value="scoreData" @change="scorexinxi" />
				<!-- 评论 -->
				<text style="display: inline-block;margin-bottom: 10rpx;">评论内容：</text>
				<textarea v-model='commentData' placeholder="评论内容" style="
				width: 100%;height: 200rpx;border: 1rpx solid #dddddd;border-radius: 15rpx;padding-left: 15rpx;padding-top: 10rpx;"></textarea>
			</view>
			<!-- 按钮 -->
			<view style="display: flex;width: 100%;margin: 20rpx auto;border-top: 1rpx solid #dddddd;">
				<view style="width: 50%;text-align: center;
				height: 75rpx;line-height: 75rpx;" @tap="closeScoreOrComment">
					取消
				</view>
				<view @tap="submitData" style="width: 50%;border-left: 1rpx solid #dddddd;text-align: center;height: 75rpx;line-height: 75rpx;color: #0081FF;">
					确认
				</view>
			</view>
		</view>
	</uni-popup>
	
	<view style="display: flex;flex-wrap: wrap">
        <view style="padding: 0 20rpx;width: 100%;margin: 0 auto;;flex-direction: column;flex-wrap: wrap;flex-direction: row;margin-top: 0upx;">
            <view class="list b-b" v-for="(item, index) in list" :key="index" style="width:100%;height: auto;border: 1rps solid #999;margin: 0 auto;background-color: #FFFFFF;margin-top: 10rpx; box-shadow: 0  0 10rpx 0 #999999;border-radius: 25rpx;">
                <view
                        style="margin-bottom: 25rpx;display: flex;justify-content: space-between;align-items: center;">
                    <h4>{{ item.guzhangshangbaoName }}</h4>
                    <view>
                        <uni-icons v-show="isAuth('guzhangshangbao','删除')" @tap="onDeleteTap(item.id)" type="closeempty"
                                   size="20"></uni-icons>
                    </view>
                </view>
                <!-- 级联表 -->
                <view v-show="item.weixiuyuanName" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                    <text style="width: 25%;margin-right: 5%;">维修人员姓名</text>
                    <text style="width: 70%">{{item.weixiuyuanName}}</text>
                </view>
                <view v-show="item.yonghuName" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                    <text style="width: 25%;margin-right: 5%;">学生姓名</text>
                    <text style="width: 70%">{{item.yonghuName}}</text>
                </view>
                <!-- 当前表 -->
                 <view v-show="item.guzhangshangbaoUuidNumber" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">报修编号</text>
                     <text style="width: 70%">
                         <text v-if="item.guzhangshangbaoUuidNumber != null">{{item.guzhangshangbaoUuidNumber}}</text>
                         <text v-else></text>
                     </text>
                 </view>
                 <view v-show="item.quyuValue" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">区域</text>
                     <text style="width: 70%">{{item.quyuValue}}</text>
                 </view>
                 <view v-show="item.guzhangshangbaoAddress" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">详细地址</text>
                     <text style="width: 70%">
                         <text v-if="item.guzhangshangbaoAddress != null">{{item.guzhangshangbaoAddress}}</text>
                         <text v-else></text>
                     </text>
                 </view>
                 <view v-show="item.guzhangshangbaoGuzhang" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">故障信息</text>
                     <text style="width: 70%">
                         <text v-if="item.guzhangshangbaoGuzhang != null">{{item.guzhangshangbaoGuzhang}}</text>
                         <text v-else></text>
                     </text>
                 </view>
                 <view v-show="item.guzhangshangbaoValue" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">故障类型</text>
                     <text style="width: 70%">{{item.guzhangshangbaoValue}}</text>
                 </view>
                 <view v-show="item.guzhangshangbaoYesnoValue" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">处理结果</text>
                     <text style="width: 70%">{{item.guzhangshangbaoYesnoValue}}</text>
                 </view>
                <view v-show="item.guzhangshangbaoYesnoText" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                    <text style="width: 25%;margin-right: 5%;">处理回复</text>
                    <view style="width: 70%" v-html="item.guzhangshangbaoYesnoText"></view>
                </view>
            <view style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;font-size: 24rpx;color: #8799A3;">
                <text v-show="item.createTime">{{item.createTime}}</text>
                <uni-icons v-show="isAuth('guzhangshangbao','修改') && (item.guzhangshangbaoYesnoTypes == 1  || item.guzhangshangbaoYesnoTypes == 3)" @tap="onUpdateTap(item.id)" type="compose" size="20">
                </uni-icons>
				<uni-icons v-show="item.guzhangshangbaoYesnoTypes == 5" @tap="onScoreOrComment(item.weixiuyuanId)" type="chat-filled" size="20">
				</uni-icons>
            </view>
        </view>
    </view>
	</view>

	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
                user:{},//当前登录表的所有参数
                sessionTable : uni.getStorageSync("nowTable"),//登录账户所在表名
                role : uni.getStorageSync("role"),//权限
                userId:uni.getStorageSync("userid"),//当前登录人的id
                btnColor: ['#67c23a', '#909399', '#e6a23c', '#f56c6c', '#356c6c', '#3498db', '#f093a9',
                    '#a7c23a', '#104eff', '#90f794', '#a21233', '#8e44ad'
                ],
				queryList: [{
						queryName: "在线报修名称",
					}
				],
                sactiveItem: {
                    "padding": "0",
                    "boxShadow": "0 0 0px rgba(0,0,0,.3)",
                    "margin": "0 10rpx",
                    "borderColor": "rgba(0,0,0,1)",
                    "backgroundColor": "var(--publicMainColor)",
                    "color": "#fff",
                    "borderRadius": "0 40rpx 40rpx 0",
                    "borderWidth": "0",
                    "width": "auto",
                    "lineHeight": "160rpx",
                    "fontSize": "28rpx",
                    "borderStyle": "solid"
                },
                sitem: {
                    "padding": "0",
                    "boxShadow": "0 0 0px rgba(0,0,0,.3)",
                    "margin": "0 10rpx",
                    "borderColor": "rgba(0,0,0,1)",
                    "backgroundColor": "var(--publicSubColor)",
                    "color": "#fff",
                    "borderRadius": "0 40rpx 40rpx 0",
                    "borderWidth": "0",
                    "width": "auto",
                    "lineHeight": "160rpx",
                    "fontSize": "28rpx",
                    "borderStyle": "solid"
                },
				

/*留言评论评分相关     开始*/
                    totalScore: 0, //总评分
                    scoreData: 0, //评分
                    commentData: null, //留言
                    commentList: [], //留言数据集合
                    /*留言评论评分相关     结束*/
				list: [],
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				upOption: {
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					textNoMore: '~ 没有更多了 ~',
				},
				hasNext: true,
				searchForm: {},
				/*1111*/
				weixiuyuanId:null,
				quyuTypesList: [],
				guzhangshangbaoTypesList: [],
				guzhangshangbaoYesnoTypesList: [],

				CustomBar: '0'
			};
		},
        computed: {
            baseUrl() {
                return this.$base.url;
            },
        },
		async onShow() {
			this.btnColor = this.btnColor.sort(() => {
				return (0.5 - Math.random());
			});

            let _this = this
            let table = uni.getStorageSync("nowTable");
            // 获取用户信息
            let resA = await _this.$api.session(table);
            _this.user = resA.data;
            _this.btnColor = _this.btnColor.sort(() => {
                return (0.5 - Math.random());
            });




			this.hasNext = true
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
		},
		onLoad() {
			this.hasNext = true
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
		},
		methods: {
		    //类型条件查询
            async showDrawer() {
                this.$refs.showRight.open();
            },
            async closeDrawer() {
                this.$refs.showRight.close();
            },
            //下载
            download(url) {
                let _this = this;
                uni.downloadFile({
                    url: url,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            _this.$utils.msg('下载成功');
                            window.open(url);
                        }
                    }
                });
            },
            //查询条件切换
            queryChange(e) {
                this.searchForm.guzhangshangbaoName = "";
            },
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				this.hasNext = true
				// 重置分页参数页数为1
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			async upCallback(mescroll) {
				let params = {
					page: mescroll.num,
					limit: mescroll.size,
                    guzhangshangbaoDelete: 1,
				}

                let _this = this
                let res = await this.$api.page(`guzhangshangbao`, params);
                res.data.list.forEach(function(item,index){
                })

                if (mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			//添加地址
            onSelectTap(item) {
                uni.setStorageSync('address', item);
                uni.navigateBack({
                    delta: 1
                })
            },
			// 详情

			onDetailTap(item) {
				this.$utils.jump(`./detail?id=${item.id}`)
			},
			// 修改
			onUpdateTap(id) {
				this.$utils.jump(`./add-or-update?id=${id}`)
			},
			// 添加
			onAddTap() {
				this.$utils.jump(`./add-or-update`)
			},
			onDeleteTap(id) {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: async function(res) {
						if (res.confirm) {
							await _this.$api.del('guzhangshangbao', JSON.stringify([id]));
							_this.hasNext = true
							// 重置分页参数页数为1
							_this.mescroll.resetUpScroll()
						}
					}
				});
			},
            onShenhe(data,shenheTypes) {
                var _this = this;
                uni.showModal({
                    title: '提示',
                    content: '确定要这个审核状态么?',
                    success: async function(res) {
                        if (res.confirm) {
                            var currentTime = new Date();
                            var year = currentTime.getFullYear();
                            var month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1;
                            var day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
                            var hour = currentTime.getHours();
                            var minute = currentTime.getMinutes();
                            var second = currentTime.getSeconds();
                            var shijian=year + "-" + month + "-" + day + " " +hour +":" +minute+":"+second;

                            data.guzhangshangbaoYesnoTypes=shenheTypes;
                            data.guzhangshangbaoShenheTime=shijian;
                            await _this.$api.update(`guzhangshangbao`, data);
                            _this.hasNext = true
                            // 重置分页参数页数为1
                            _this.mescroll.resetUpScroll()
                        }
                    }
                });
            },
			//手动评分
			scorexinxi(e) {
			    this.scoreData = e.value
			},
			//打开评分评论窗口
			async onScoreOrComment(id) {
			    this.weixiuyuanId = id
			    this.commentData = null
			    this.scoreData = 0
			    this.$refs.deliver.open()
			},
			// 关闭评分评论窗口
			closeScoreOrComment() {
			    this.$refs.deliver.close()
			},
			//提交数据
			async submitData() {
			    if (1 == 2)
			        return this.$utils.msg('不会进入的地方，如果进来请联系管理员');
			    else if (this.commentData == null || this.commentData == '')
			        return this.$utils.msg('评论不能为空');
			    else if (this.scoreData == null || this.scoreData == 0)
			        return this.$utils.msg('评分不能为空');
			    let data = {
			        weixiuyuanId: this.weixiuyuanId,
			        yonghuId: this.user.yonghuId,
						weixiuyuanCommentbackPingfenNumber: this.scoreData,
						weixiuyuanCommentbackText: this.commentData,
			    }
			    await this.$api.save(`weixiuyuanCommentback`, data);
				this.$utils.msg('评论成功');
				this.$utils.jump("../weixiuyuanCommentback/list")
			},
			// 搜索
			async search() {
				this.mescroll.num = 1
				let searchForm = {
					page: this.mescroll.num,
					limit: this.mescroll.size
                    ,guzhangshangbaoDelete: 1
				}

                let res = await this.$api.page(`guzhangshangbao`, searchForm);
                let _this = this
                res.data.list.forEach(function(item,index){
                })
				// 如果是第一页数据置空
				if (this.mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
			}
		}
	};
</script>

<style>
    /* product */
    page {
        background: #EEEEEE;
    }

    view {
        font-size: 28upx;
    }

    .daxiao{
        width: 100%;
        padding: 0 10rpx;
    }

    /* 按钮条件查询样式------------------------开始 */
    .tabView {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 60upx;
        margin-bottom: 20upx;
        white-space: nowrap;
        box-shadow: 0px 1px 14px 0px rgba(38, 38, 35, 0.07);
        margin-top: 6upx;
    }
    .tab {
        text-align: center;
        display: inline-block;
        margin: 0 12rpx 8rpx 0;
        padding: 0 10rpx;
        width: auto;
        line-height: 160rpx;
        color: #fff;
        font-size: 28rpx;
        border-radius: 0 40rpx 40rpx 0;
        border-width: 0;
        border-style: solid;
        border-color: rgba(0,0,0,1);
        background-color: var(--publicSubColor);
        box-shadow: 0 0 0px rgba(0,0,0,.3);
    }
    .tabActive{
        margin: 0 12rpx 8rpx 0;
        padding: 0 10rpx;
        width: auto;
        line-height: 160rpx;
        color: #fff;
        font-size: 28rpx;
        border-radius: 0 40rpx 40rpx 0;
        border-width: 0;
        border-style: solid;
        border-color: rgba(0,0,0,1);
        background-color: var(--publicMainColor);
        box-shadow: 0 0 0px rgba(0,0,0,.3);
    }
    /* 按钮条件查询样式------------------------结束 */

    .tab:last-of-type {
        border: none;
    }

    .uni-product-list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        margin-top: 0upx;
    // justify-content: space-around;
    }

    .uni-product {
        padding: 10upx;
        margin: 10upx;
        display: flex;
        flex-direction: column;
        background: #FFFFFF;
    }

    .image-view {
        height: 330upx;
        width: 330upx;
        margin: 12upx 0;
    }

    .uni-product-image {
        height: 330upx;
        width: 330upx;
    }

    .uni-product-title {
        width: 300upx;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        line-height: 1.5;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .uni-product-price {
        margin-top: 10upx;
        font-size: 28upx;
        line-height: 1.5;
        position: relative;
    }

    .uni-product-price-original {
        color: #e80080;
    }

    .uni-product-price-favour {
        color: #888888;
        text-decoration: line-through;
        margin-left: 10upx;
    }

    .uni-product-tip {
        position: absolute;
        right: 10upx;
        background-color: #ff3333;
        color: #ffffff;
        padding: 0 10upx;
        border-radius: 5upx;
    }

    uni-image > div, uni-image > img {
        width: 100%;
        height: 140px;
        object-fit: cover;
    }

    .add-btn {
        position: fixed;
        left: 30upx;
        right: 30upx;
    // #ifndef MP
    bottom: 106upx;
    // #endif
    // #ifdef MP-WEIXIN
    bottom: 16upx;
    // #endif
    z-index: 95;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 690upx;
        height: 80upx;
        font-size: 32upx;
        color: #fff;
        background-color: red;
        border-radius: 10upx;
        box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
    }

    .list {
        padding: 20upx 20upx 20upx;
    }

    .listm {
        background: #fff;
        border-radius: 15upx;
        box-shadow: 0 0 2upx rgba(0, 0, 0, 0.1);
        margin-bottom: 20upx;
        padding: 30upx;
    }

    .listmpic {
        border-radius: 10upx;
        width: 166upx;
        margin-right: 20upx;
    }

    .listmr {
    // width: 460upx;
        display: inline-block;
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .news-box6 .dian::before {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        background-color: red;
        position: absolute;
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 100%;
        z-index: 1;
    }


    .hide1 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .hide2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .hide3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .hide4 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        line-clamp: 4;
        -webkit-box-orient: vertical;
    }
</style>
