<template>
    <div class="fillcontain">
        <ul :class="[identity ==1 ?'stallShareMenu':identity ==2 ?'sellerShareMenu':'']">
            <li>
                <router-link :to='{path:"/financialManagement"}'>账户总览</router-link>
            </li>
            <li>
                <router-link :to='{path:"/financialManagement2"}'>财务交易记录</router-link>
            </li>
            <li class="ListMenu">
                <router-link :to='{path:"/accountSetting"}'>账户设置</router-link>
            </li>
        </ul>
        <div class="accountSetting">
            <div class="changeBack">
                <router-link :to='{path:"/accountSetting"}'>返回</router-link>
            </div>
            <div class="changeMobile">
                <div class="firstStep" v-show="firstStep">
                    <div class="changesteps flex2">
                        <ul class="flex">
                            <li>1.输入新手机号</li>
                            <li>2.验证新手机号</li>
                            <li v-if="bindMobileOld">3.安全确认</li>
                            <li v-if="bindMobileOld">4.完成</li>
                            <li v-if="!bindMobileOld">3.完成</li>
                        </ul>
                    </div>
                    <div class="newMobile flex2">
                        <div class="newList">
                            <el-col :span="24">
                                <el-col :span="8" class="flex"><span class="title1">当前手机号：</span></el-col>
                                <el-col :span="10" class="flex"> <p>{{bindMobileShow}}</p></el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="8" class="flex"><span class="title1">新输入新手机号码：</span></el-col>
                                <el-col :span="10" class="flex"><el-input v-model="newMobile" placeholder="" maxlength="11"></el-input></el-col>
                            </el-col>
                        </div>
                    </div>
                    <div class="flex2 newFoot">
                        <el-button type="info" @click="nextStep(1)">下一步</el-button>
                    </div>
                </div>
                <div class="twoStep" v-show="identifyStep">
                    <div class="changestepss  flex2" v-show="twoStep">
                        <ul class="flex">
                            <li>1.输入新手机号</li>
                            <li>2.验证新手机号</li>
                            <li v-if="bindMobileOld">3.安全确认</li>
                            <li v-if="bindMobileOld">4.完成</li>
                            <li v-if="!bindMobileOld">3.完成</li>
                        </ul>
                    </div>
                    <div class="changestepsss  flex2" v-show="threeStep">
                        <ul class="flex">
                            <li>1.输入新手机号</li>
                            <li>2.验证新手机号</li>
                            <li>3.安全确认</li>
                            <li>4.完成</li>
                        </ul>
                    </div>
                    <div class="newMobile flex2">
                        <div class="newList">
                            <el-col :span="24" class="flex twoMobile" v-show="twoStep">
                                <p>我们已向您的新手机号码{{newMobile}}发送了短信，</p>
                                <p>输入短信中的验证码！</p>
                            </el-col>
                            <el-col :span="24" class="flex twoMobile" v-show="threeStep">
                                <p>为保障账号安全，我们已向您的旧手机号码{{bindMobileShow}}发送了确认短信，</p>
                                <p>输入短信中的验证码即可完成更改绑定！</p>
                            </el-col>
                            <el-col :span="24" class="flex2">
                                <el-col :span="3" class="flex">
                                    <span class="tit">验证码：</span>
                                </el-col>
                                <el-col :span="10">
                                    <el-input v-model="identifyCodeNew" placeholder="请输入手机验证码" maxlength="6">
                                        <el-button slot="append">
                                        	<timer-btn class="btn btn-default"  ref="timebtn"  v-on:refCheckmobile="toSendMsg" v-ref:btn :second="60" :mobilehpne=sendPhone></timer-btn>
                                            <!--<timer-btn class="btn btn-default"  v-ref:btn :second="60"></timer-btn>-->
                                        </el-button>
                                    </el-input>
                                </el-col>
                            </el-col>
                        </div>
                    </div>
                    <div class="flex2 newFoot">
                        <el-button v-show="twoStep" type="info" @click="nextStep(2)">下一步</el-button>
                        <el-button v-show="threeStep" type="info" @click="nextStep(3)">确定</el-button>
                    </div>
                </div>
                <div class="fourStep" v-show="fourStep">
                    <div class="changestepssss  flex2">
                        <ul class="flex">
                            <li>1.输入新手机号</li>
                            <li>2.验证新手机号</li>
                            <li v-show="bindMobileOld">3.安全确认</li>
                            <li v-if="!bindMobileOld">3.完成</li>
                            <li v-show="bindMobileOld">4.完成</li>
                        </ul>
                    </div>
                    <div class="newMobile flex2">
                        <div class="newList flex2">
                            <img src="../image/econfirm.png" alt="">
                            <span class="title1">{{tipMsg}}</span>
                            <p>{{newMobile}}</p>
                        </div>
                    </div>
                    <div class="flex2 newFoot">
                        <el-button type="info"  @click="redirectPage('/accountSetting')">确定</el-button>
                    </div>
                </div>
            </div>
            </div>
        </div>
</template>
<script>
    import timerBtn from '../components/timerBtn'
    import {saveWalletMobile,checkMobileCodeUnLogin} from '@/api/getData'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import {getCompanyType} from  '../utils/common'

    export default {
        components: {
            timerBtn
        },
        data() {
            return {
                //1为档口、2为卖家身份
                identity:1,

                firstStep:true,
                twoStep:false,
                threeStep:false,
                fourStep:false,
                identifyStep:false,
                bindMobileOld:false,
                identifyCodeNew:'',//验证码
                tipMsg:'',
                newMobile:'',
                sendPhone:'',
                mobileCode:'',
                bindMobile:'',
                bindMobileShow:'',
            }
        },
        watch:{
        	'$route':function (route) {
        		this.newMobile = '';
        		this.identifyCodeNew = '';
        		this.bindMobile = this.$route.query.bindMobile;
        		if(this.bindMobile){
        			this.bindMobileOld = true;
        			this.bindMobileShow = this.toTel(this.bindMobile);
        		}else{
	    			this.bindMobileOld =false;
	    			this.bindMobileShow = '无';
	    		}
        		this.firstStep = true;
                this.twoStep = false;
                this.threeStep = false;
                this.fourStep = false;
                this.identifyStep = false;
        	}
        },
        mounted(){
        	this.bindMobile = this.$route.query.bindMobile;
        	if(this.bindMobile){
        		this.bindMobileOld = true;
    			this.bindMobileShow = this.toTel(this.bindMobile);
    		}else{
    			this.bindMobileOld =false;
    			this.bindMobileShow = '无';
    		}
            this.resetStep();
            this.identity =getCompanyType(getStore("curCompany"));
        },
        methods: {
            async nextStep(index){
                //校验参数
                if(this.validationData(index)){
                    if(index == 1){
                    	if(this.newMobile.trim() == this.bindMobile.trim()){
                    		this.$message({
		                        type: 'error',
		                        message: "新手机号与原绑定手机号不能相同"
		                    });
                    		return;
                    	}
                        this.sendPhone = this.newMobile;
                    	this.toSendMsg(this.sendPhone);
                        this.firstStep = false;
                        this.identifyStep = true;
                        this.twoStep = true;
                        this.threeStep = false;
                        this.fourStep = false;
                        this.identifyCodeNew = '';
                    }else if(index == 2){
                    	//校验手机验证码
                    	if(this.identifyCodeNew == ""){
                    		this.$message({
		                        type: 'error',
		                        message: "验证码不能为空"
		                    });
		                    return;
                    	}
                    	let param ={
		            		mobile:this.newMobile,
		            		code:this.identifyCodeNew
		            	}
		                const res = await checkMobileCodeUnLogin(param);
		                if (res.isSuccess == true) {
		                	if(this.bindMobile != ''){
		                		this.firstStep = false;
	                        	this.identifyStep = true;
			                	this.twoStep = false;
	                        	this.threeStep = true;
	                        	this.fourStep = false;
	                        	this.identifyCodeNew = '';
	                        	this.sendPhone = this.bindMobile;
	                        	this.toSendMsg(this.sendPhone);
	                        	this.$refs.timebtn.time = 60;
		                	}else{
		                		//重置手机号码信息
		                        this.saveWalletMobile();
		                        this.firstStep = false;
				                this.twoStep = false;
		                        this.threeStep = false;
		                        this.identifyStep = false;
		                        this.fourStep = true;
		                	}
                        	
		                }else{
		                	this.$message({
		                        type: 'error',
		                        message: "验证码不正确"
		                    });
		                }
                    }else if(index == 3){
                        //校验手机验证码
                    	if(this.identifyCodeNew == ""){
                    		this.$message({
		                        type: 'error',
		                        message: "验证码不能为空"
		                    });
		                    return;
                    	}
                    	let param ={
		            		mobile:this.bindMobile,
		            		code:this.identifyCodeNew
		            	}
		                const res = await checkMobileCodeUnLogin(param);
		                if (res.isSuccess == true) {
		                	//重置手机号码信息
	                        this.saveWalletMobile();
	                        this.firstStep = false;
			                this.twoStep = false;
	                        this.threeStep = false;
	                        this.identifyStep = false;
	                        this.fourStep = true;
		                }else{
		                	this.$message({
		                        type: 'error',
		                        message: "验证码不正确"
		                    });
		                }
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message:'手机号码填写错误！'
                    });

                }


            },
            redirectPage(page){
                this.resetStep();
                this.$router.push(page);

            },
            resetStep(){
            	this.identifyCodeNew = '';
                this.firstStep=true;
                this.twoStep=false;
                this.threeStep=false;
                this.fourStep=false;
            },

            validationData(index){
                if(index==1){
                    var pattern = /^1(3|4|5|7|8)\d{9}$/;
                    if(!pattern.test(this.newMobile)){
                        return false;
                    }else{
                        return true;
                    }
                }
                if(index==3){

                }
                return true;


            },

            async saveWalletMobile() {
                let param = {
                    companyId:userInfo().companyId,//
                    newMobile:this.newMobile,
                    mobileCode:this.mobileCode
                }

                const res = await saveWalletMobile(param); //TODO  ACCOUNTID;    userInfo.companyId
                //console.log( " userInfo.companyId:"+userInfo.companyId);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '重置手机成功！'
                    });
                    this.tipMsg = '您已成功绑定新的手机号码：';
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                    this.tipMsg = '绑定新的手机号码失败：';
                }
            },
            
            async toSendMsg(mobile){
                 var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
                 var flag = reg.test(mobile);
                 if(!flag)return false;
                 this.$refs.timebtn.send(mobile);
                 return true;
             },
            toTel(str) {
                let start = str.slice(0, 3);
                let end = str.slice(-4);

                return `${start}****${end}`;

            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/accountSetting';
</style>
