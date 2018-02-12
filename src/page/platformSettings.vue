<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('menuManagement')">
                <router-link :to='{path:"/menuManagement"}'>菜单管理</router-link>
            </li>
            <li class="menuIndex3" v-if="getMenuAuthFun('platformSettings')">
                <router-link :to='{path:"/platformSettings"}'>平台基础配置</router-link>
            </li>
            <li v-if="getMenuAuthFun('msgParamsConfig')">
                <router-link :to='{path:"/msgParamsConfig"}'>短信参数配置</router-link>
            </li>
            <li v-if="getMenuAuthFun('msgSendInterfaceConfig')">
                <router-link :to='{path:"/msgSendInterfaceConfig"}'>短信发送接口配置</router-link>
            </li>
            <li v-if="getMenuAuthFun('logManagement')">
                <router-link :to='{path:"/logManagement"}'>日志管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('inviteCode')">
                <router-link :to='{path:"/inviteCode"}'>邀请码</router-link>
            </li>
            <li >
                <router-link :to='{path:"/applicationPackage"}'>上传应用</router-link>
            </li>
        </ul>
        <div class="platformSettings">
            <div>
                <div class="platformSettingsTop">
                    <div class="right" >
                        <el-button  @click="handleIconClickCancle">取消</el-button>
                    </div>
                </div>
                <div class="platformTable">
                    <div class="edit">
                        <el-col :span="24">
                        </el-col>
                        <el-col :span="24" >
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>平台名称：</span></el-col>
                                <el-col :span="14">
                                    <el-input
                                        placeholder="请输入平台名称"
                                        v-model="name">
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>

                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>平台logo：</span></el-col>
                                <el-col :span="14">
                                    <el-upload
                                        name="uploadFile"
                                        class="avatar-uploader"
                                        action="/cws/uploadFile"
                                        :headers = "{token:getStore('token')}"
                                        :show-file-list="false"
                                        :before-upload="beforeAvatarUpload"
                                        :on-success = "handleAvatarSuccess">
                                        <img v-if="logoUrl" :src="logoUrl" class="avatar" width="100" height="80">
                                        <i v-show="!logoUrl" class="el-icon-plus avatar-uploader-icon"></i>
                                        <!--<el-button size="small" type="primary">选择LOGO</el-button>-->
                                    </el-upload>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>网站链接：</span></el-col>
                                <el-col :span="14">
                                    <el-input
                                        placeholder="请输入网站链接"
                                        v-model="platformUrl">
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>广告图链接：</span></el-col>
                                <el-col :span="14">
                                    <el-input
                                        placeholder="请输入广告图链接"
                                        v-model="advertisUrl">
                                    </el-input>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="padding-top: 20px;">
                            <el-col :span="12" class="flex2">
                                <el-col :span="5"><span>邀请码状态：</span></el-col>
                                <el-col :span="14">
                                    <el-select v-model="validInvitationCode" placeholder="选择状态">
				                        <el-option label="启用" value="1"></el-option>
				                        <el-option label="禁用" value="2"></el-option>
				                    </el-select>
                                </el-col>
                            </el-col>
                        </el-col>
                    </div>
                </div>
            </div>
            <div style="padding: 400px;">
                <el-button type="primary"  @click="handleIconClickReset" >重置</el-button>
                <el-button  @click="handleIconSaveInfo" style="margin-left: 50px;" >保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryPlatformInfo,savePlatformInfo} from '@/api/getData'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    import {getStore} from  '../config/mUtils'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                logoUrl:'',
                advertisUrl:'',
                platformUrl:'',
                validInvitationCode:'',
                fileList:[],
                name:'',
                propInfo:'',
            }
        },
        mounted(){
            this.loadData();
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return  (isJPG||isPNG)&&isLt2M;
            },

            //回调图片
            handleAvatarSuccess(res, file) {
                this.logoUrl = "http://cws.nabei.net:26880/" + res.result;
            },

            handleIconClickCancle(){
                this.loadData();
            },
            handleIconSaveInfo(){
                if(this.name==undefined||this.name==''){
                    this.$message({
                        type:'error',
                        message:'请填写平台名称'
                    });
                    return;
                }
                if(this.logoUrl==undefined||this.logoUrl==''){
                    this.$message({
                        type:'error',
                        message:'请上传平台logo'
                    });
                    return;
                }
                if(this.advertisUrl==undefined||this.advertisUrl==''){
                    this.$message({
                        type:'error',
                        message:'请填写广告图链接'
                    });
                    return;
                }
                if(this.platformUrl==undefined||this.platformUrl==''){
                    this.$message({
                        type:'error',
                        message:'请填写网站链接'
                    });
                    return;
                }
                if(this.name==this.propInfo.name&&this.logoUrl==this.propInfo.logoUrl&&this.propInfo.advertisUrl==this.advertisUrl&&this.propInfo.platformUrl==this.platformUrl){
                    this.$message({
                        type:'error',
                        message:'数据没有变化'
                    });
                    return;
                }

                let param = {
                    "logoUrl":this.logoUrl,
                    "advertisUrl":this.advertisUrl,
                    "platformUrl":this.platformUrl,
                    "name":this.name,
                    "validInvitationCode":this.validInvitationCode,
                    "id":this.propInfo.id
                }
                this.saveInfo(param);
            },
            handleIconClickReset(){
                this.advertisUrl='';
                this.platformUrl='';
                this.name='';
            },
            async loadData(){
                const res = await queryPlatformInfo();
                if(res.isSuccess){
                    this.propInfo = res.result.data;
                    this.logoUrl = this.propInfo.logoUrl;
                    this.advertisUrl = this.propInfo.advertisUrl;
                    this.platformUrl = this.propInfo.platformUrl;
                    this.name = this.propInfo.name;
                    this.validInvitationCode = this.propInfo.validInvitationCode+"";
                }
            },

            async saveInfo(param){
                const res = await savePlatformInfo({platformProp:param});
                if(res.isSuccess){
                    this.$message({
                        "type":'info',
                        "message":res.result.msg
                    });
                }
            },
            getStore,
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/platformSettings';
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
