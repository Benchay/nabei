<template>
    <div class="fillcontain">
        <ul :class="[identity ==1 ?'stallShareMenu':identity ==2 ?'sellerShareMenu':'']">
            <li class="ListMenu">
                <router-link :to='{path:"/financialManagement"}'>账户总览</router-link>
            </li>
            <li>
                <router-link :to='{path:"/financialManagement2"}'>财务交易记录</router-link>
            </li>
            <li>
                <router-link :to='{path:"/accountSetting"}'>账户设置</router-link>
            </li>
        </ul>
        <div class="otherManagement">
            <router-link :to='{path:"/financialManagement"}' :class="[identity ==1 ?'comeBack':identity ==2 ?'comeBack2':'']" class="right">返回</router-link>

            <el-col class="flex otherList">
                <el-col :span="2" class="bankTitle">银行卡</el-col>
                <el-col :span="22" class="bankCard">
                    <ul class="flex">
                        <li class="flex"  v-for="item in bankCarts" >
                            <img src="../image/banklogo.png" alt="">
                            <div class="tit">
                                <p>{{item.name}}</p>
                                <p>{{item.account |toTel2}}</p>
                            </div>
                            <img  class="delete" src="../image/rdelete03.png" alt=""  @click="handleDelAccount(5,item.id)">
                        </li>
                        <li class="flex addBank"  @click="dialogBank = true,addBank=false">
                            <img src="../image/add.png" alt="">
                            <div>
                                <a href="javascript:void(0);">添加银行卡</a>
                            </div>
                        </li>
                    </ul>

                </el-col>
            </el-col>
            <el-col class="flex otherList">
                <el-col :span="2" class="bankTitle">微信</el-col>
                <el-col :span="22" class="bankCard">
                    <ul class="flex">
                        <li class="flex"  v-for="item in wechat" v-show="wechat.length > 0">
                            <img src="../image/bweixin03.png" alt="">
                            <div class="tit">
                                <p>微信</p>
                                <p id="wechat">{{item.account |toTel}}</p>
                            </div>
                            <img  class="delete" src="../image/rdelete03.png" alt=""  @click="handleDelAccount(4,item.id)">
                        </li>
                        <li class="flex addBank"  v-show="wechat.length < 1"  @click="addWechatClick">
                            <img src="../image/add.png" alt="">
                            <div>
                                <a href="javascript:void(0);">添加微信</a>
                            </div>
                        </li>
                    </ul>
                </el-col>
            </el-col>
            <el-col class="flex otherList">
                <el-col :span="2" class="bankTitle">支付宝</el-col>
                <el-col :span="22" class="bankCard">
                    <ul class="flex">
                        <li class="flex" v-for="item in alipay" v-show="alipay.length > 0">
                            <img src="../image/bzf04.png" alt="">
                            <div class="tit">
                                <p>支付宝</p>
                                <p id="phone">{{item.account |toTel}}</p>
                            </div>
                            <img  class="delete" src="../image/rdelete03.png" alt="" @click="handleDelAccount(3,item.id)">
                        </li>
                        <li class="flex addBank" v-show="alipay.length < 1" @click="addAlipayClick">
                            <img src="../image/add.png" alt="">
                            <div>
                                <a href="javascript:void(0);">添加支付宝</a>
                            </div>
                        </li>
                    </ul>
                </el-col>
            </el-col>
        </div>
        <el-dialog
            title="添加银行卡"
            :visible.sync="dialogBank"
            size="small">
            <div class="dialogAddBank">
                <ul>
                    <li v-for="bank in banks" class="flex2">
                        <el-button @click="selectBankType(bank.bankType,bank.name)">
                            <div class="flex2">
                                <img :src="bank.pic" alt="">
                                <!--<p>{{bank.name}}</p>-->
                            </div>
                        </el-button>
                    </li>
                    <li @click="addNewBankClick" class="flex2">
                        <el-button>
                            <div class="flex2">
                                +添加银行卡
                            </div>
                        </el-button>
                    </li>
                </ul>
            </div>
            <div class="dialogZH" v-show="addBank">
                <el-col :span="11" class="flex">
                    <el-col :span="5" class="ZHtitle">银行名称：</el-col>
                    <el-col :span="19">
                    	<el-input v-if="bankNameFlag" :disabled="false" v-model="addBankCartForm.name" placeholder="请输入银行名称"></el-input>
                    	<el-input v-else :disabled="true" v-model="addBankCartForm.name" placeholder="请输入银行名称"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="13" class="flex">
                    <el-col :span="7" class="ZHtitle">户名：</el-col>
                    <el-col :span="17"><el-input v-model="addBankCartForm.userName" placeholder="请输入户主真实姓名" maxlength="30"></el-input></el-col>
                </el-col>
                <el-col :span="11" class="flex">
                    <el-col :span="5" class="ZHtitle">卡号：</el-col>
                    <el-col :span="19"><el-input v-model="addBankCartForm.accoutNumber" placeholder="请输入银行卡卡号"></el-input></el-col>
                </el-col>
                <el-col :span="13" class="flex">
                    <el-col :span="7" class="ZHtitle">银行卡开户行：</el-col>
                    <el-col :span="17"><el-input v-model="addBankCartForm.subBank" placeholder="请输入银行卡开户行" maxlength="60"></el-input></el-col>
                </el-col>
            </div>
            <el-col :span="24" slot="footer" class="dialog-footer flex2" style="padding: 10px 0 20px 0;"
                    :class="[identity ==1 ?'stallContent':identity ==2 ?'sellerContent':'']">
                <el-button @click="handleBindAccount(5)" class="buttonColorFM">确定添加</el-button>
                <el-button @click="dialogBank = false" class="buttonCancel">取 消</el-button>
              </el-col>
        </el-dialog>
        <el-dialog
            title="添加微信"
            :visible.sync="dialogWechat"
            size="tiny">
            <div class="dialogZH1">
                <el-col :span="24">
                    <el-col :span="7">微信帐号：</el-col>
                    <el-col :span="16">
                        <el-input v-model="addWeXinForm.accoutNumber" placeholder="请输入微信帐号" size="small" maxlength="30"></el-input>
                        <p class="wechatTip">{{weixintip}}</p>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="7">微信用户名：</el-col>
                    <el-col :span="16"><el-input v-model="addWeXinForm.userName" placeholder="请输入微信用户名" size="small" maxlength="30"></el-input></el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="7">微信收款码：</el-col>
                    <el-col :span="16">
                        <el-upload
                            class="avatar-uploader"
                            name="uploadFile"
                            action="/cws/uploadFile"
                            :headers = "{token:getStore('token')}"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="acountQRCode" :src="acountQRCode" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                </el-col>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogWechat = false">取消添加</el-button>
    <el-button type="primary" @click="handleBindAccount(4)">确定添加</el-button>
  </span>
        </el-dialog>
        <el-dialog
            title="添加支付宝"
            :visible.sync="dialogalipay"
            size="tiny">
            <div class="dialogZH1">
                <el-col :span="24">
                    <el-col :span="7">支付宝帐号：</el-col>
                    <el-col :span="16">
                        <el-input v-model="addAlipayForm.accoutNumber" placeholder="请输入支付宝帐号" size="small" maxlength="30"></el-input>
                        <p class="wechatTip">*请输入正确支付宝帐号，并确认无误。</p>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="7">支付宝用户名：</el-col>
                    <el-col :span="16"><el-input v-model="addAlipayForm.userName" placeholder="请输入支付宝用户名" size="small" maxlength="30"></el-input></el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="7">支付宝收款码：</el-col>
                    <el-col :span="16">
                        <el-upload
                            class="avatar-uploader"
                            name="uploadFile"
                            action="/cws/uploadFile"
                            :headers = "{token:getStore('token')}"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="acountQRCode" :src="acountQRCode" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                </el-col>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogalipay = false">取消添加</el-button>
    <el-button type="primary" @click="handleBindAccount(3)">确定添加</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {queryPlatformAccount,bindingFinanceAccount,unbindingFinanceAccount} from '@/api/getData'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import {isNullObject,getCompanyType} from  '../utils/common'

    export default {
        data() {
            return {
                //1为档口、2为卖家身份
                identity:1,
                weixintip:'*请输入正确微信帐号，并确认无误。',
                addBank:false,
                imageUrl:'',
                dialogBank:false,
                dialogWechat:false,
                dialogalipay:false,
                input:'',
                alipay:[],
                wechat:[],
                accountUserName:'',
                accountNo:'',
                accountBankName:'',
                bankCarts:[],
                banks:[
                	{name:'中国银行',pic:require('../image/bank_boc.png'),bankType:1},
                	{name:'中国农业银行',pic:require('../image/bank_abc.png'),bankType:3},
                    {name:'中国工商银行',pic:require('../image/bank_icbc.png'),bankType:2},
                    {name:'中国建设银行',pic:require('../image/bank_ccb.png'),bankType:4},
                    {name:'中国交通银行',pic:require('../image/bank_jt.png'),bankType:5},
                    {name:'中国邮政银行',pic:require('../image/bank_posta.png'),bankType:15},
                    {name:'中国招商银行',pic:require('../image/bank_cmbc.png'),bankType:6},
                    {name:'中国华夏银行',pic:require('../image/bank_hx.png'),bankType:10},
                    {name:'中国民生银行',pic:require('../image/bank_ms.png'),bankType:11},
                    {name:'中国光大银行',pic:require('../image/bank_gd.png'),bankType:9},
                    {name:'兴业银行',pic:require('../image/bank_xy.png'),bankType:8},
                    {name:'浦发银行',pic:require('../image/bank_pf.png'),bankType:14},
                    {name:'中信银行',pic:require('../image/bank_zx.png'),bankType:7},
                    {name:'中国平安银行',pic:require('../image/bank_pa.png'),bankType:12},
                    {name:'中国广发银行',pic:require('../image/bank_gf.png'),bankType:13},
                ],
                addBankCartForm:{},
                addWeXinForm:{},
                addAlipayForm:{},
                acountQRCode:'',
                bankNameFlag:true,
                accountBankType:''
            }
        },

        mounted(){
            this.identity =getCompanyType(getStore("curCompany"));
            this.loadAccuntInfo();

        },
        methods: {
            //回调图片
            handleAvatarSuccess(res, file) {
                this.acountQRCode = "http://cws.nabei.net:26880/" + res.result;
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
            async  handleDelAccount (accountType,id,confirm){
                if(confirm==undefined){
                await  this.$confirm('是否确认解除该绑定?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelAccount(accountType,id,true);
                }).catch(() => {

                });
                }
                 if(!confirm){
                    return ;
                 }
                switch(accountType){
                    case 3:
                        let  acc_index =  this.alipay.findIndex(function(value, index){
                            return value.id == id;
                        })
                        if(acc_index>-1){
                            this.alipay.splice(acc_index,1);
                        }
                    case 4:
                        let  acc_index_1 =  this.wechat.findIndex(function(value, index){
                            return value.id == id;
                        })
                        if(acc_index_1>-1){
                            this.wechat.splice(acc_index_1,1);
                        }
                    case 5:
                        let  acc_index_2 =  this.bankCarts.findIndex(function(value, index){
                            return value.id == id;
                        })
                        if(acc_index_2>-1){
                            this.bankCarts.splice(acc_index_2,1);
                        }
                }
                let param={id:id}
                const   res = await   unbindingFinanceAccount(param);

                if (res.isSuccess == true) {
                    this.$message({type: 'success',     message: '删除成功!' });
                }else{
                    this.$message({type: 'error',     message: res.errorMsg });
                }
            },

            async handleBindAccount (accountType){
            	let param = {};
				if(accountType == 5){//添加银行卡
					if(this.bankCarts && this.bankCarts.length>=4){
						this.$message({
	                        type: 'error',
	                        message: '允许最多绑定4张卡，请删除后添加'
	                    });
	                    return;
					}
					if(!this.addBankCartForm.name){
						this.$message({
	                        type: 'error',
	                        message: '请选择银行卡'
	                    });
	                    return;
					}
					if(this.addBankCartForm.name == ''){
						this.$message({
	                        type: 'error',
	                        message: '请填写银行名称'
	                    });
	                    return;
					}
					if(!this.addBankCartForm.userName){
						this.$message({
	                        type: 'error',
	                        message: '请填写户名'
	                    });
	                    return;
					}
					if(!this.addBankCartForm.accoutNumber){
						this.$message({
	                        type: 'error',
	                        message: '请填写银行卡卡号'
	                    });
	                    return;
					}
					let pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
					if(!pattern.test(this.addBankCartForm.accoutNumber.trim())){
						this.$message({
	                        type: 'error',
	                        message: '请输入正确的银行卡号！'
	                    });
	                    return;
					}
					if(!this.addBankCartForm.subBank){
						this.$message({
	                        type: 'error',
	                        message: '请填写银行卡开户行'
	                    });
	                    return;
					}
					param ={
	                    name:this.addBankCartForm.name,
	                    accType:accountType,
	                    bankType:this.addBankCartForm.bankType,
	                    accoutNumber:this.addBankCartForm.accoutNumber,
	                    subBank:this.addBankCartForm.subBank,
	                    userName:this.addBankCartForm.userName,
	                    companyId:userInfo().companyId
	                }
				}else if(accountType == 4){//添加微信
					if(!this.addWeXinForm.accoutNumber){
						this.$message({
	                        type: 'error',
	                        message: '请输入微信账号'
	                    });
	                    return;
					}
					if(!this.addWeXinForm.userName){
						this.$message({
	                        type: 'error',
	                        message: '请输入微信用户名'
	                    });
	                    return;
					}
					/*if(!this.acountQRCode){
						this.$message({
	                        type: 'error',
	                        message: '请上传微信收款码'
	                    });
	                    return;
					}*/
					param = {
						accType:accountType,
						accoutNumber:this.addWeXinForm.accoutNumber,
						userName:this.addWeXinForm.userName,
						name:this.addWeXinForm.userName,
						acountQRCode:this.acountQRCode,
						companyId:userInfo().companyId
					}
				}else if(accountType == 3){//添加alipay
					if(!this.addAlipayForm.accoutNumber){
						this.$message({
	                        type: 'error',
	                        message: '请输入支付宝帐号'
	                    });
	                    return;
					}
					if(!this.addAlipayForm.userName){
						this.$message({
	                        type: 'error',
	                        message: '请输入支付宝用户名'
	                    });
	                    return;
					}
					/*if(!this.acountQRCode){
						this.$message({
	                        type: 'error',
	                        message: '请上传支付宝收款码'
	                    });
	                    return;
					}*/
					param = {
						accType:accountType,
						accoutNumber:this.addAlipayForm.accoutNumber,
						userName:this.addAlipayForm.userName,
						name:this.addAlipayForm.userName,
						acountQRCode:this.acountQRCode,
						companyId:userInfo().companyId
					}
				}
                 
                this.createAccount (param);


            },
            async loadAccuntInfo(){

                let param ={companyId:userInfo().companyId};
                const res = await queryPlatformAccount(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '加载数据成功'
                    });

                    this.alipay =this.getAccByType (3, res.result.financeAccounts);
                    this.wechat =this.getAccByType (4, res.result.financeAccounts);
                    this.bankCarts =this.getAccByType (5, res.result.financeAccounts);
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }

            },

            async createAccount(param){
                const res = await bindingFinanceAccount(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '加载数据成功'
                    });
                    this.loadAccuntInfo();
                    this.restFields();

                    this.dialogBank=false;
                    this.dialogWechat=false;
                    this.dialogalipay=false;
                   // this.$route.router.push(this.$route.path);
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }

            },
            getAccByType(type,financeAccounts) {
                let results = [];
                for (var acc of financeAccounts) {
                    if(acc.accType==type){
                        let  tem ={
                        	account:acc.accoutNumber,
                        	id:acc.id,
                        	name:acc.name
                        };
                        tem.account = acc.accoutNumber;
                        tem.id = acc.id;
                        results.push(tem);

                    }
                }
                return results;
            },

            restFields() {
                this.accountUserName='';
                this.accountNo='';
                this.accountBankName=''
            },
            selectBankType(bankType,bankName){
            	this.addBankCartForm = {
            		name:bankName,
            		bankType:bankType
            	}
            	this.bankNameFlag = false;
            	this.addBank = true;
            },
            
            addNewBankClick(){
            	this.addBankCartForm = {};
            	this.bankNameFlag = true;
            	this.addBank = true;
            },
            
            addWechatClick(){
            	this.acountQRCode = '';
            	this.dialogWechat = true;
            },
            
            addAlipayClick(){
            	this.acountQRCode = '';
            	this.dialogalipay = true;
            },
            
            getStore,

        },
        filters: {
            toTel(str) {
                let start = str.slice(0, 3);
                let end = str.slice(-4);
                return `${start}****${end}`;
            },
            toTel2(str) {
                let start = str.slice(0, 0);
                let end = str.slice(-4);
                return `${start}**** **** **** ${end}`;
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/otherManagement';
</style>
