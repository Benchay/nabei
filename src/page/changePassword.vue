<template>
    <div class="fillcontain">
        <ul :class="[identity ==1 ?'stallShareMenu':identity ==2 ?'sellerShareMenu':'']">
            <li class="ListMenu">
                <router-link :to='{path:"/changePassword"}'>修改密码</router-link>
            </li>
        </ul>
        <div class="accountSetting">
            <div class="bindingMobile">
                <div>
                    <el-form :model="changepwdForm" :rules="registerRule" ref="changepwdForm">
                        <div class="box">
                            <span><span>*</span>旧密码:</span>
                            <el-form-item prop="oldPwd">
                                <el-input v-model="changepwdForm.oldPwd" placeholder="请输入密码" type="password"></el-input>
                            </el-form-item>
                        </div>
                        <div class="box">
                            <span><span>*</span>新密码:</span>
                            <el-form-item prop="newPwd">
                                <el-input v-model="changepwdForm.newPwd" placeholder="请输入新密码" type="password"></el-input>
                            </el-form-item>
                        </div>
                        <div class="box">
                            <span><span>*</span>确认新密码：</span>
                            <el-form-item prop="checkPwd">
                                <el-input v-model="changepwdForm.checkPwd" placeholder="请再次输入密码" type="password"></el-input>
                            </el-form-item>
                        </div>
                        <div class="box">
                            <span>手机号码：</span>
                            <el-form-item prop="userName">
                                <p type="userName" v-model="changepwdForm.userName" placeholder="手机号">{{this.roleForm.mobile | toTel}}</p>
                            </el-form-item>
                        </div>
                        <div class="box">
                            <span>验证码：</span>
                            <el-form-item prop="captcha">
                                <el-input v-model="changepwdForm.captcha" placeholder="请输入手机验证码">
                                    <el-button slot="append">
                                        <timer-btn class="btn btn-default" ref="timebtn" v-on:refCheckmobile="checkMobileForm"  v-ref:btn :second="60" :mobilehpne=this.roleForm.mobile ></timer-btn>
                                    </el-button>
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div class="bindingButton">
                    <el-button type="info" @click="changepwd">保存</el-button>
                    <el-button  class="back" @click="back"> 返回</el-button>
                </div>
                <div class="bindingFoot">
                    <div class="flex"><img src="../image/tprompting.png" alt=""><span class="title">温馨提示!</span></div>
                    <p>・定期更换密码可以让您的帐号更加安全！</p>
                    <p>・请确保登录密码与支付密码不同！</p>
                    <p>・建议采用数字与字母的组合，长度不少于6位！</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import timerBtn from '../components/timerBtn'
    import {changeUserPasswordEx} from '@/api/getData'
    import {setStore,getStore} from  '../config/mUtils'
    import {isJson,getCompanyType} from  '../utils/common'

    export default {
        components: {
            timerBtn
        },
        data() {
            var validateUser = (rule, value, cb) => {
                value=value.trim();
                var pattern = /^1(3|4|5|7|8)\d{9}$/
                if (value === '') {
                    cb(new Error('请输入手机号'))
                } else if (!pattern.test(value)) {
                    cb(new Error('请输入11位手机号'))
                } else {
                    cb()
                }
            }
            var validatePwd = (rule, value, cb) => {
                var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
                if (value === '') {
                    cb(new Error('请输入密码'))
                }else if(value.indexOf(' ') >0 ){
                    cb(new Error('密码不能有空格'))
                } else if (!pattern.test(value)) {
                    cb(new Error('请输入6-16位数字和字母的组合'))
                } else if(this.changepwdForm.oldPwd&&this.changepwdForm.newPwd&&this.changepwdForm.oldPwd==this.changepwdForm.newPwd){
                	cb(new Error('新密码不能和旧密码相同'))
                } else {
                    if (this.changepwdForm.checkPwd !== '') {
                        this.$refs.changepwdForm.validateField('checkPwd')
                    }
                    cb()
                }
            }
            var validateCheckPwd = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('请再次输入密码'))
                }else if(value.indexOf(' ')>0 ){
                    cb(new Error('密码不能有空格'))
                } else if (value !== this.changepwdForm.newPwd) {
                    cb(new Error('两次输入密码不一致!'))
                } else {
                    cb()
                }
            }
            var validateCaptcha  = (rule, value, cb) => {
                var pattern = /^\s*(\S+)\s*$/;
                if (value === '') {
                    cb(new Error('请输入验证码'))
                } else if (!pattern.test(value)) {
                    cb(new Error('验证码不能有空格'))
                } else {
                    cb()
                }
            }
            return {
                //               1为档口、2为卖家身份
                identity:1,

                roleForm: {
                    userId: '',
                    roleId: '',
                    compId:'',
                    userName:'',
                    mobile:''
                },
                input:'',
                mobile:'',
                changepwdForm: {
                    userName: '',
                    oldPwd:'',
                    newPwd: '',
                    checkPwd: '',
                    captcha:this.mobile,
                },
                registerRule: {
                    oldPwd:[
                        { validator: validatePwd, trigger: 'blur' }
                    ],
                    newPwd: [
                        { validator: validatePwd, trigger: 'blur' }
                    ],
                    checkPwd: [
                        { validator: validateCheckPwd, trigger: 'blur' }
                    ],
                    captcha: [
                        { validator:validateCaptcha, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
            var userInfo=getStore("user_info_user");
            var vjson = JSON.parse(userInfo);
            this.roleForm.userId=vjson.id;
            this.roleForm.mobile = vjson.mobile;
            this.roleForm.userName=vjson.userName;
            //this.roleForm.compId=vjson.curCompany.id;
            var currentComp=getStore("curCompany");
            if (isJson(currentComp)) {
                var vcom = JSON.parse(currentComp);
                this.roleForm.compId = vcom.id;
            }
            this.changepwdForm.userName=this.roleForm.userName;
            //测试代码
            //this.roleForm.compId='2';
            //console.log(this.roleForm.userId);
            this.identity =getCompanyType(getStore("curCompany"));
            this.loadInit();
        },
        methods: {
            back(){
                this.loadInit();
                this.$router.push({path: '/basicInformation',query:{}});
            },
            async changepwd(){
                this.$refs['changepwdForm'].validate(async (valid) => {
                        if (valid) {
                            const res= await changeUserPasswordEx({"mobile":this.roleForm.mobile,"oldPwd":this.changepwdForm.oldPwd,"newPwd":this.changepwdForm.newPwd,"mobileCode":this.changepwdForm.captcha});
                            if (res.isSuccess == true) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                                this.loadInit();
                                this.$router.push({path: '/basicInformation',query:{}})
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.errorMsg
                                });
                            }
                        }
                });
            },
            loadInit(){
                this.changepwdForm.userName='';
                this.changepwdForm.oldPwd='';
                this.changepwdForm.newPwd='';
                this.changepwdForm.checkPwd='';
                this.changepwdForm.captcha='';
            },
            async checkMobileForm(mobile){
                var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
                var flag = reg.test(mobile);
                if(!flag)return false;
                this.$refs.timebtn.send();
                return true;
            },
        },
        filters: {
            toTel(str) {
                let start = str.slice(0, 3);
                let end = str.slice(-4);
                return `${start}****${end}`;
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/changePassword';
</style>
