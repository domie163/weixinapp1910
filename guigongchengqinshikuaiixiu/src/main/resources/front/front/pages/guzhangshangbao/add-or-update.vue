<template>
    <view class="content">
        <form class="app-update-pv">
            <view
                    :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"100rpx"}'
                    class="cu-form-group">
                <view :style='{"width":"160rpx","fontSize":"28rpx","color":"var(--publicMainColor)","textAlign":"left"}'
                      class="title">报修编号</view>
                <input   disabled
                         :style='{"padding":"0 30rpx","boxShadow":"0 0 0px rgba(0,0,0,.6) inset","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"0","borderWidth":"10rpx 2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                         :disabled="ro.guzhangshangbaoUuidNumber" type="text" v-model="ruleForm.guzhangshangbaoUuidNumber" placeholder="报修编号"></input>
            </view>
                <view :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"100rpx"}'
                      class="cu-form-group">
                    <view :style='{"width":"160rpx","fontSize":"28rpx","color":"var(--publicMainColor)","textAlign":"left"}'
                          class="title">区域</view>
                    <picker @change="quyuTypesChange" :value="quyuTypesIndex" :range="quyuTypesOptions" range-key="indexName">
                        <view
                                :style='{"padding":"0 30rpx","boxShadow":"0 0 0px rgba(0,0,0,.6) inset","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"0","borderWidth":"10rpx 2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                                class="uni-input">{{ruleForm.quyuTypes?ruleForm.quyuValue:"请选择区域"}}</view>
                    </picker>
                </view>
            <view
                    :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"100rpx"}'
                    class="cu-form-group">
                <view :style='{"width":"160rpx","fontSize":"28rpx","color":"var(--publicMainColor)","textAlign":"left"}'
                      class="title">详细地址</view>
                <input   disabled
                         :style='{"padding":"0 30rpx","boxShadow":"0 0 0px rgba(0,0,0,.6) inset","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"0","borderWidth":"10rpx 2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                         :disabled="ro.guzhangshangbaoAddress" type="text" v-model="ruleForm.guzhangshangbaoAddress" placeholder="详细地址"></input>
            </view>
            <view
                    :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"100rpx"}'
                    class="cu-form-group">
                <view :style='{"width":"160rpx","fontSize":"28rpx","color":"var(--publicMainColor)","textAlign":"left"}'
                      class="title">故障信息</view>
                <input   disabled
                         :style='{"padding":"0 30rpx","boxShadow":"0 0 0px rgba(0,0,0,.6) inset","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"0","borderWidth":"10rpx 2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                         :disabled="ro.guzhangshangbaoGuzhang" type="text" v-model="ruleForm.guzhangshangbaoGuzhang" placeholder="故障信息"></input>
            </view>
                <view :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"100rpx"}'
                      class="cu-form-group">
                    <view :style='{"width":"160rpx","fontSize":"28rpx","color":"var(--publicMainColor)","textAlign":"left"}'
                          class="title">故障类型</view>
                    <picker @change="guzhangshangbaoTypesChange" :value="guzhangshangbaoTypesIndex" :range="guzhangshangbaoTypesOptions" range-key="indexName">
                        <view
                                :style='{"padding":"0 30rpx","boxShadow":"0 0 0px rgba(0,0,0,.6) inset","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"0","borderWidth":"10rpx 2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                                class="uni-input">{{ruleForm.guzhangshangbaoTypes?ruleForm.guzhangshangbaoValue:"请选择故障类型"}}</view>
                    </picker>
                </view>

            <view class="btn">
                <button
                        :style='{"boxShadow":"0 0 16rpx rgba(0,0,0,0) inset","backgroundColor":"var(--publicMainColor)","borderColor":"#409EFF","borderRadius":"8rpx","color":"rgba(255, 255, 255, 1)","borderWidth":"0","width":"70%","fontSize":"32rpx","borderStyle":"solid","height":"80rpx"}'
                        @tap="onSubmitTap" class="bg-red">提交</button>
            </view>
        </form>

					<w-picker mode="dateTime" step="1" :current="false" :hasSecond="false" @confirm="createTimeConfirm"
                              ref="createTime" themeColor="#333333"></w-picker>


    </view>
</template>

<script>
    import wPicker from "@/components/w-picker/w-picker.vue";

    export default {
        data() {
            return {
                cross: '',
                ro:{
					yonghuId: false,
					guzhangshangbaoUuidNumber: true,
					quyuTypes: false,
					guzhangshangbaoAddress: false,
					guzhangshangbaoGuzhang: false,
					guzhangshangbaoTypes: false,
					weixiuyuanId: false,
					guzhangshangbaoYesnoTypes: false,
					guzhangshangbaoYesnoText: false,
					guzhangshangbaoDelete: false,
					createTime: false,
        },
            ruleForm: {
					yonghuId: '',
					guzhangshangbaoUuidNumber: this.getUUID(),//数字
					quyuTypes: '',//数字
					quyuValue: '',//数字对应的值
					guzhangshangbaoAddress: '',
					guzhangshangbaoGuzhang: '',
					guzhangshangbaoTypes: '',//数字
					guzhangshangbaoValue: '',//数字对应的值
					weixiuyuanId: '',
					guzhangshangbaoYesnoTypes: '',//数字
					guzhangshangbaoYesnoValue: '',//数字对应的值
					guzhangshangbaoYesnoText: '',
					guzhangshangbaoDelete: '',
					createTime: '',
            },
            // 登陆用户信息
            user: {},
				quyuTypesOptions: [],
							quyuTypesIndex : 0,
				guzhangshangbaoTypesOptions: [],
							guzhangshangbaoTypesIndex : 0,
				guzhangshangbaoYesnoTypesOptions: [],
							guzhangshangbaoYesnoTypesIndex : 0,

        }
        },
        components: {
            wPicker
        },
        computed: {
            baseUrl() {
                return this.$base.url;
            },
        },
        async onLoad(options) {

		/*下拉框*/
			let quyuTypesParams = {
                page: 1,
                limit: 100,
                dicCode: 'quyu_types',
            }
			let quyuTypes = await this.$api.page(`dictionary`, quyuTypesParams);
			this.quyuTypesOptions = quyuTypes.data.list
		/*下拉框*/
			let guzhangshangbaoTypesParams = {
                page: 1,
                limit: 100,
                dicCode: 'guzhangshangbao_types',
            }
			let guzhangshangbaoTypes = await this.$api.page(`dictionary`, guzhangshangbaoTypesParams);
			this.guzhangshangbaoTypesOptions = guzhangshangbaoTypes.data.list
		/*下拉框*/
			let guzhangshangbaoYesnoTypesParams = {
                page: 1,
                limit: 100,
                dicCode: 'guzhangshangbao_yesno_types',
            }
			let guzhangshangbaoYesnoTypes = await this.$api.page(`dictionary`, guzhangshangbaoYesnoTypesParams);
			this.guzhangshangbaoYesnoTypesOptions = guzhangshangbaoYesnoTypes.data.list


            // 如果是更新操作
            if (options.id) {
                this.ruleForm.id = options.id;
                // 获取信息
                let res = await this.$api.info(`guzhangshangbao`, this.ruleForm.id);
                this.ruleForm = res.data;
            }
            if(options.guzhangshangbaoId){
                this.ruleForm.guzhangshangbaoId = options.guzhangshangbaoId;
            }
            // 跨表
            // this.styleChange()
        },
        methods: {
            // 下拉变化
            quyuTypesChange(e) {
                this.quyuTypesIndex = e.target.value
                this.ruleForm.quyuValue = this.quyuTypesOptions[this.quyuTypesIndex].indexName
                this.ruleForm.quyuTypes = this.quyuTypesOptions[this.quyuTypesIndex].codeIndex
            },
            guzhangshangbaoTypesChange(e) {
                this.guzhangshangbaoTypesIndex = e.target.value
                this.ruleForm.guzhangshangbaoValue = this.guzhangshangbaoTypesOptions[this.guzhangshangbaoTypesIndex].indexName
                this.ruleForm.guzhangshangbaoTypes = this.guzhangshangbaoTypesOptions[this.guzhangshangbaoTypesIndex].codeIndex
            },
            guzhangshangbaoYesnoTypesChange(e) {
                this.guzhangshangbaoYesnoTypesIndex = e.target.value
                this.ruleForm.guzhangshangbaoYesnoValue = this.guzhangshangbaoYesnoTypesOptions[this.guzhangshangbaoYesnoTypesIndex].indexName
                this.ruleForm.guzhangshangbaoYesnoTypes = this.guzhangshangbaoYesnoTypesOptions[this.guzhangshangbaoYesnoTypesIndex].codeIndex
            },


            // styleChange() {
            // 	this.$nextTick(() => {
            // 		// document.querySelectorAll('.app-update-pv .cu-form-group .uni-yaoxianStyle-yaoxianStyle').forEach(el=>{
            // 		//   el.style.backgroundColor = this.addUpdateForm.yaoxianStyle.content.backgroundColor
            // 		// })
            // 	})
            // },


			// 日期控件
			createTimeConfirm(val) {
                this.ruleForm.createTime = val.result;
                this.$forceUpdate();
            },




            getUUID() {
                return new Date().getTime();
            },
            async onSubmitTap() {
				if ((!this.ruleForm.guzhangshangbaoUuidNumber)) {
                    this.$utils.msg(`报修编号不能为空`);
                    return
                }
				if ((!this.ruleForm.quyuTypes)) {
                    this.$utils.msg(`区域不能为空`);
                    return
                }
				if ((!this.ruleForm.guzhangshangbaoAddress)) {
                    this.$utils.msg(`详细地址不能为空`);
                    return
                }
				if ((!this.ruleForm.guzhangshangbaoGuzhang)) {
                    this.$utils.msg(`故障信息不能为空`);
                    return
                }
                if (this.ruleForm.id) {
                    await this.$api.update(`guzhangshangbao`, this.ruleForm);
                } else {
                    await this.$api.save(`guzhangshangbao`, this.ruleForm);
                }
                uni.setStorageSync('pingluenStateState', true);
                this.$utils.msgBack('提交成功');
            },
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                if (type === 'start') {
                    year = year - 60;
                } else if (type === 'end') {
                    year = year + 2;
                }
                month = month > 9 ? month : '0' + month;;
                day = day > 9 ? day : '0' + day;
                return `${year}-${month}-${day}`;
            },
            toggleTab(str) {
                this.$refs[str].show();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        padding: 20upx;
    }

    .content:after {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        content: '';
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
    }

    textarea {
        border: 1upx solid #EEEEEE;
        border-radius: 20upx;
        padding: 20upx;
    }

    .title {
        width: 180upx;
    }

    .avator {
        width: 150upx;
        height: 60upx;
    }

    .right-input {
        flex: 1;
        text-align: left;
        padding: 0 24upx;
    }

    .cu-form-group.active {
        justify-content: space-between;
    }

    .cu-form-group .title {
        height: auto;
        line-height:30rpx
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 20upx 0;
    }

    .cu-form-group {
        padding: 0 24upx;
        background-color: transparent;
        min-height: inherit;
    }

    .cu-form-group+.cu-form-group {
        border: 0;
    }

    .cu-form-group uni-input {
        padding: 0 30upx;
    }

    .uni-input {
        padding: 0 30upx;
    }

    .cu-form-group uni-textarea {
        padding: 30upx;
        margin: 0;
    }

    .cu-form-group uni-picker::after {
        line-height: 80rpx;
    }

    .select .uni-input {
        line-height: 80rpx;
    }

    .input .right-input {
        line-height: 88rpx;
    }
</style>