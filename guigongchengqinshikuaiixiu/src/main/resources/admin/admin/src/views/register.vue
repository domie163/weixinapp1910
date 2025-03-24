<template>
    <div>
        <div class="container">
            <div class="login-form">
                <h1 class="h1" style="color:#000;fontSize:28px;">贵工程寝室快修小程序注册</h1>
                <el-form class="rgs-form">
                    <el-form-item label="账号" class="input">
                        <el-input v-model="ruleForm.username" autocomplete="off" placeholder="账号"  />
                    </el-form-item>
                    <el-form-item label="密码" class="input">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password/>
                    </el-form-item>
                    <el-form-item label="重复密码" class="input">
                        <el-input type="passwo   rd" v-model="ruleForm.repetitionPassword" autocomplete="off" show-password/>
                    </el-form-item>
                        <el-form-item label="维修人员姓名" class="input" v-if="tableName=='weixiuyuan'">
                            <el-input v-model="ruleForm.weixiuyuanName" autocomplete="off" placeholder="维修人员姓名"  />
                        </el-form-item>
                        <el-form-item label="维修人员手机号" class="input" v-if="tableName=='weixiuyuan'">
                            <el-input v-model="ruleForm.weixiuyuanPhone" autocomplete="off" placeholder="维修人员手机号"  />
                        </el-form-item>
                        <el-form-item label="维修人员身份证号" class="input" v-if="tableName=='weixiuyuan'">
                            <el-input v-model="ruleForm.weixiuyuanIdNumber" autocomplete="off" placeholder="维修人员身份证号"  />
                        </el-form-item>
                        <!--
                            <el-form-item v-if="weixiuyuanPhotoFlag">
                            </el-form-item>
                            <el-form-item label="维修人员头像" class="input" v-if="tableName=='weixiuyuan'">
                                    <file-upload
                                        tip="点击上传维修人员头像"
                                        action="file/upload"
                                        :limit="1"
                                        :multiple="true"
                                        :fileUrls="ruleForm.weixiuyuanPhoto?$base.url+ruleForm.weixiuyuanPhoto:''"
                                        @change="weixiuyuanPhotoUploadChange"
                                    ></file-upload>
                           </el-form-item>
                        -->
                        <el-form-item label="维修人员邮箱" class="input" v-if="tableName=='weixiuyuan'">
                            <el-input v-model="ruleForm.weixiuyuanEmail" autocomplete="off" placeholder="维修人员邮箱"  />
                        </el-form-item>
                        <!--
                            <el-form-item label="逻辑删除" class="input" v-if="tableName=='weixiuyuan'">
                                <el-input v-model="ruleForm.weixiuyuanDelete" autocomplete="off" placeholder="逻辑删除"  />
                           </el-form-item>
                        -->
                        <!--
                            <el-form-item label="添加时间" class="input" v-if="tableName=='weixiuyuan'">
                                <el-input v-model="ruleForm.insertTime" autocomplete="off" placeholder="添加时间"  />
                           </el-form-item>
                        -->
                        <!--
                            <el-form-item label="创建时间 show2 photoShow" class="input" v-if="tableName=='weixiuyuan'">
                                <el-input v-model="ruleForm.createTime" autocomplete="off" placeholder="创建时间 show2 photoShow"  />
                           </el-form-item>
                        -->
                        <el-form-item label="学生姓名" class="input" v-if="tableName=='yonghu'">
                            <el-input v-model="ruleForm.yonghuName" autocomplete="off" placeholder="学生姓名"  />
                        </el-form-item>
                        <el-form-item label="学生手机号" class="input" v-if="tableName=='yonghu'">
                            <el-input v-model="ruleForm.yonghuPhone" autocomplete="off" placeholder="学生手机号"  />
                        </el-form-item>
                        <el-form-item label="学生身份证号" class="input" v-if="tableName=='yonghu'">
                            <el-input v-model="ruleForm.yonghuIdNumber" autocomplete="off" placeholder="学生身份证号"  />
                        </el-form-item>
                        <!--
                            <el-form-item v-if="yonghuPhotoFlag">
                            </el-form-item>
                            <el-form-item label="学生头像" class="input" v-if="tableName=='yonghu'">
                                    <file-upload
                                        tip="点击上传学生头像"
                                        action="file/upload"
                                        :limit="1"
                                        :multiple="true"
                                        :fileUrls="ruleForm.yonghuPhoto?$base.url+ruleForm.yonghuPhoto:''"
                                        @change="yonghuPhotoUploadChange"
                                    ></file-upload>
                           </el-form-item>
                        -->
                        <el-form-item label="学生邮箱" class="input" v-if="tableName=='yonghu'">
                            <el-input v-model="ruleForm.yonghuEmail" autocomplete="off" placeholder="学生邮箱"  />
                        </el-form-item>
                        <!--
                            <el-form-item label="逻辑删除" class="input" v-if="tableName=='yonghu'">
                                <el-input v-model="ruleForm.yonghuDelete" autocomplete="off" placeholder="逻辑删除"  />
                           </el-form-item>
                        -->
                        <!--
                            <el-form-item label="添加时间" class="input" v-if="tableName=='yonghu'">
                                <el-input v-model="ruleForm.insertTime" autocomplete="off" placeholder="添加时间"  />
                           </el-form-item>
                        -->
                        <!--
                            <el-form-item label="创建时间" class="input" v-if="tableName=='yonghu'">
                                <el-input v-model="ruleForm.createTime" autocomplete="off" placeholder="创建时间"  />
                           </el-form-item>
                        -->
                    <div style="display: flex;flex-wrap: wrap;width: 100%;justify-content: center;">
                        <el-button class="btn" type="primary" @click="login()">注册</el-button>
                        <el-button class="btn close" type="primary" @click="close()">取消</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                },
                tableName:"",
                rules: {},
                sexTypesOptions : [],
                weixiuyuanPhotoFlag:false,//用于刷新文件上传
                yonghuPhotoFlag:false,//用于刷新文件上传
            };
        },
        mounted(){
            let table = this.$storage.get("loginTable");
            this.tableName = table;

            //级联表的下拉框查询

        },
        methods: {
            // 获取uuid
            getUUID () {
                return new Date().getTime();
            },
            weixiuyuanPhotoUploadChange(fileUrls) {
               this.ruleForm.weixiuyuanPhoto = fileUrls;
                if(this.weixiuyuanPhotoFlag){
                    this.weixiuyuanPhotoFlag=false;
                }else{
                    this.weixiuyuanPhotoFlag=true;
                }
            },
            yonghuPhotoUploadChange(fileUrls) {
               this.ruleForm.yonghuPhoto = fileUrls;
                if(this.yonghuPhotoFlag){
                    this.yonghuPhotoFlag=false;
                }else{
                    this.yonghuPhotoFlag=true;
                }
            },
            close(){
                this.$router.push({ path: "/login" });
            },
            // 注册
            login() {

                            if((!this.ruleForm.username)){
                                this.$message.error('账号不能为空');
                                return
                            }
                            if((!this.ruleForm.password)){
                                this.$message.error('密码不能为空');
                                return
                            }
                            if((!this.ruleForm.repetitionPassword)){
                                this.$message.error('重复密码不能为空');
                                return
                            }
                            if(this.ruleForm.repetitionPassword != this.ruleForm.password){
                                this.$message.error('密码和重复密码不一致');
                                return
                            }
                            if((!this.ruleForm.weixiuyuanName)&& 'weixiuyuan'==this.tableName){
                                this.$message.error('维修人员姓名不能为空');
                                return
                            }
                             if('weixiuyuan' == this.tableName && this.ruleForm.weixiuyuanPhone&&(!this.$validate.isMobile(this.ruleForm.weixiuyuanPhone))){
                                 this.$message.error('手机应输入手机格式');
                                 return
                             }
                            if((!this.ruleForm.weixiuyuanIdNumber)&& 'weixiuyuan'==this.tableName){
                                this.$message.error('维修人员身份证号不能为空');
                                return
                            }
                            // weixiuyuan 中的 维修人员头像 判空处理
                            // if('weixiuyuan' == this.tableName && (this.ruleForm.weixiuyuanPhoto== null ||this.ruleForm.weixiuyuanPhoto== "")){
                            //     this.$message.error("维修人员头像不能为空");
                            //     return
                            // }
                            if('weixiuyuan' == this.tableName && this.ruleForm.weixiuyuanEmail&&(!this.$validate.isEmail(this.ruleForm.weixiuyuanEmail))){
                                this.$message.error("邮箱应输入邮件格式");
                                return
                            }
                            // weixiuyuan 中的 逻辑删除 判空处理
                            // if('weixiuyuan' == this.tableName && (this.ruleForm.weixiuyuanDelete== null ||this.ruleForm.weixiuyuanDelete== "")){
                            //     this.$message.error("逻辑删除不能为空");
                            //     return
                            // }
                            // weixiuyuan 中的 添加时间 判空处理
                            // if('weixiuyuan' == this.tableName && (this.ruleForm.insertTime== null ||this.ruleForm.insertTime== "")){
                            //     this.$message.error("添加时间不能为空");
                            //     return
                            // }
                            // weixiuyuan 中的 创建时间 show2 photoShow 判空处理
                            // if('weixiuyuan' == this.tableName && (this.ruleForm.createTime== null ||this.ruleForm.createTime== "")){
                            //     this.$message.error("创建时间 show2 photoShow不能为空");
                            //     return
                            // }
                            if((!this.ruleForm.yonghuName)&& 'yonghu'==this.tableName){
                                this.$message.error('学生姓名不能为空');
                                return
                            }
                             if('yonghu' == this.tableName && this.ruleForm.yonghuPhone&&(!this.$validate.isMobile(this.ruleForm.yonghuPhone))){
                                 this.$message.error('手机应输入手机格式');
                                 return
                             }
                            if((!this.ruleForm.yonghuIdNumber)&& 'yonghu'==this.tableName){
                                this.$message.error('学生身份证号不能为空');
                                return
                            }
                            // yonghu 中的 学生头像 判空处理
                            // if('yonghu' == this.tableName && (this.ruleForm.yonghuPhoto== null ||this.ruleForm.yonghuPhoto== "")){
                            //     this.$message.error("学生头像不能为空");
                            //     return
                            // }
                            if('yonghu' == this.tableName && this.ruleForm.yonghuEmail&&(!this.$validate.isEmail(this.ruleForm.yonghuEmail))){
                                this.$message.error("邮箱应输入邮件格式");
                                return
                            }
                            // yonghu 中的 逻辑删除 判空处理
                            // if('yonghu' == this.tableName && (this.ruleForm.yonghuDelete== null ||this.ruleForm.yonghuDelete== "")){
                            //     this.$message.error("逻辑删除不能为空");
                            //     return
                            // }
                            // yonghu 中的 添加时间 判空处理
                            // if('yonghu' == this.tableName && (this.ruleForm.insertTime== null ||this.ruleForm.insertTime== "")){
                            //     this.$message.error("添加时间不能为空");
                            //     return
                            // }
                            // yonghu 中的 创建时间 判空处理
                            // if('yonghu' == this.tableName && (this.ruleForm.createTime== null ||this.ruleForm.createTime== "")){
                            //     this.$message.error("创建时间不能为空");
                            //     return
                            // }
                this.$http({
                    url: `${this.tableName}/register`,
                    method: "post",
                    data:this.ruleForm
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: "注册成功,请登录后在个人中心页面补充个人数据",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                        this.$router.replace({ path: "/login" });
                }
                });
                } else {
                    this.$message.error(data.msg);
                }
            });
            }
        }
    };
</script>
<style lang="scss" scoped>
.el-radio__input.is-checked .el-radio__inner {
    border-color: #00c292;
    background: #00c292;
}

.el-radio__input.is-checked .el-radio__inner {
    border-color: #00c292;
    background: #00c292;
}

.el-radio__input.is-checked+.el-radio__label {
    color: #00c292;
}

.el-radio__input.is-checked+.el-radio__label {
    color: #00c292;
}

.el-radio__input.is-checked+.el-radio__label {
    color: #00c292;
}

.h1 {
    margin-top: 10px;
}

body {
    padding: 0;
    margin: 0;
}


.nk-navigation {
    margin-top: 15px;

a {
    display: inline-block;
    color: #fff;
    background: rgba(255, 255, 255, .2);
    width: 100px;
    height: 50px;
    border-radius: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
    padding: 0 20px;
}

.icon {
    margin-left: 10px;
    width: 30px;
    height: 30px;
}
}

.register-container {
    margin-top: 10px;

a {
    display: inline-block;
    color: #fff;
    max-width: 500px;
    height: 50px;
    border-radius: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
    padding: 0 20px;

div {
    margin-left: 10px;
}
}
}

.container {
    height: 100vh;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
        background-image: url(/guigongchengqinshikuaiixiu/img/back-img-bg.jpg);

.login-form {
    right: 50%;
    top: 50%;
    height: auto;
    transform: translate3d(50%, -50%, 0);
    border-radius: 10px;
    background-color: rgba(255,255,255,.5);
    width: 420px;
    padding: 30px 30px 40px 30px;
    font-size: 14px;
    font-weight: 500;

.h1 {
    margin: 0;
    text-align: center;
    line-height: 54px;
    font-size: 24px;
    color: #000;
}

.rgs-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

.input {
    width: 95%;

& /deep/ .el-form-item__label {
      line-height: 40px;
      color: rgba(17, 16, 16, 1);
      font-size: #606266;
  }

& /deep/ .el-input__inner {
      height: 40px;
      color: rgba(23, 24, 26, 1);
      font-size: 14px;
      border-width: 1px;
      border-style: solid;
      border-color: #606266;
      border-radius: 22px;
      background-color: #fff;
  }
}

.btn {
    margin: 0 10px;
    width: 88px;
    height: 44px;
    color: #fff;
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
    border-color: #409EFF;
    border-radius: 22px;
    background-color: #409EFF;
}

.close {
    margin: 0 10px;
    width: 88px;
    height: 44px;
    color: #409EFF;
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
    border-color: #409EFF;
    border-radius: 22px;
    background-color: #FFF;
}

}
}
}
</style>




