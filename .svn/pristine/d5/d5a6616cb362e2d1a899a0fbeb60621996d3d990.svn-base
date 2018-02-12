<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="manage_tip">
                    <p>请选择</p>
                </div>
                <el-col :span="35" class="flex2 addradio">
                    <el-col :span="8">
                        <el-radio class="radio" v-model="radio" label="1">加入公司</el-radio>
                    </el-col>
                    <el-col :span="9">
                        <el-radio class="radio" v-model="radio" label="2">创建公司</el-radio>
                    </el-col>
                </el-col>
                <p></p>
                <el-form :model="form"  style="overflow: hidden;width:100%;" v-show="this.radio==1"  ref="refform">
                    <div class="search">
                        <el-input placeholder="请输入要查找的公司名称" v-model="searchCompany">
                            <el-button slot="append" icon="search" @click="search">搜索</el-button>
                        </el-input>
                    </div>
                    <div v-show="searchBlock">
                        <div class="searchNumber">共搜索到 <span> {{this.selectCompanyCount}} </span>条数据</div>
                        <div class="searchTable">
                            <el-table
                                ref="searchCompTable"
                                :data="searchTableData"
                                @row-click="selectedCompanyItem"
                                :row-class-name="tableRowClassName"
                            >
                                <el-table-column
                                    prop="name"
                                    label="公司名称"
                                    width="200">
                                </el-table-column>
                                <el-table-column
                                    prop="compCode"
                                    label="公司代码">
                                </el-table-column>
                                <el-table-column
                                    label="公司LOGO">
                                    <template scope="scope">
                                        <img src="../image/shops@3x.png" alt="">
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="compScale"
                                    label="公司规模"
                                    :formatter="formatScale">
                                </el-table-column>
                                <el-table-column label="" width="200" prop="power">
                                    <template scope="scope">
                                        <el-button
                                            size="small"
                                            @click="joinCompany(searchTableData[scope.$index])"
                                        >+加入公司
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-form>
                <div v-show="this.radio==2"  style="overflow: hidden;width:100%;">
                    <el-form :model="form" :rules="createCompanyRule" ref="refCreateForm">
                        <div class="form">
                            <el-form-item prop="name" label="公司名称：" :label-width="formLabelWidth">
                                <el-input v-model="form.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <!--<el-form-item prop="compCode" label="公司代码：" :label-width="formLabelWidth">
                                <el-input v-model="form.compCode" auto-complete="off"></el-input>
                            </el-form-item>-->
                            <el-form-item prop="companyBindingId" label=" 公司类型：" :label-width="formLabelWidth" >
                                <el-select v-model="form.companyBindingId" placeholder="请选择公司类型" @change="myCompanyBindingIdBlur"  >
                                    <el-option label="档口" value="1"></el-option>
                                    <el-option label="卖家" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="公司LOGO：" :label-width="formLabelWidth">
                                <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList">
                                    <el-button size="small" type="primary">上传LOGO</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="公司位置：" :label-width="formLabelWidth">
                                <el-input v-model="form.location" auto-complete="off"></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item prop="compScale" label="公司规模：" :label-width="formLabelWidth">
                            <el-select v-model="form.compScale" placeholder="请选择公司规模"  @change="myCompScaleBlur">
                                <el-option label="20人以下" value="1"></el-option>
                                <el-option label="20-50人" value="2"></el-option>
                                <el-option label="50-200人" value="3"></el-option>
                                <el-option label="200-500人" value="4"></el-option>
                                <el-option label="500-100人" value="5"></el-option>
                                <el-option label="1000人以上" value="6"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <!--<el-button @click="cancelCreateCompany">取 消</el-button>-->
                        <el-button type="primary" @click="createCompany('refCreateForm')">创 建</el-button>
                    </div>
                </div>

                <el-dialog title="加入公司" :visible.sync="dialogJoinCompany" size="tiny" class="JoinCompany"
                           :before-close="handleJoinCompanyClose">
                    <div class="company">
                        <div class="flex"><img src="../image/shops@3x.png" alt="">{{joinSearchForm.name}}</div>
                        <div class="companyInfo">
                            <p>公司规模： <span>{{joinSearchForm.compScale | formatScaleValue }}</span></p>
                            <!--<p>管理员：<span>李四</span></p>-->
                        </div>
                    </div>
                    <div class="joinVerify flex">
                        <span class="tit">验证信息：</span>
                        <el-input v-model="joinSearchForm.input" placeholder="请输入验证信息"></el-input>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <!--<el-button @click="cancelJoinCompanyFun">取 消</el-button>-->
                        <el-button type="primary" @click="joinCompanyFun">确 定</el-button>
                    </div>
                </el-dialog>
            </section>
        </transition>
    </div>
</template>

<script>
	import {queryCompany,createCompanyFun,requestUserCompany,initDefaultWareHouse} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
    import {setStore, getStore} from  '../config/mUtils'
    import {isNullObject} from  '../utils/common'

    export default {
		components: {

        },
        filters: {
            formatScaleValue: function (value) {
                //return value;
                var scale = value;
                if (scale == '1') {
                    return "20人以下";
                } else if (scale == '2') {
                    return "20-50人";
                } else if (scale == '3') {
                    return "50-200人";
                } else if (scale == '4') {
                    return "200-500人";
                } else if (scale == '5') {
                    return "500-1000人";
                } else if (scale == '6') {
                    return "1000人以上";
                }
            },
        },
        data () {
            var validateCompName = (rule, value, cb) => {
                var pattern = /^\S{1,50}$/
                if (value === '') {
                    cb(new Error('公司名称不能为空'))
                } else if (!pattern.test(value)) {
                    cb(new Error('公司名称不能超过50个字符'))
                } else {
                    cb()
                }
            }

            var validateCompCode = (rule, value, cb) => {
                var pattern = /^[A-Za-z0-9]{3,20}/;
                if (value === '') {
                    cb(new Error('公司代码不能为空'))
                } else if (!pattern.test(value)) {
                    cb(new Error('3到20位数据或者字母'))
                } else {
                    cb()
                }
            }
            var validateCompCode = (rule, value, cb) => {
                var pattern = /^[A-Za-z0-9]{3,20}/;
                if (value === '') {
                    cb(new Error('公司代码不能为空'))
                } else if (!pattern.test(value)) {
                    cb(new Error('3到20位数据或者字母'))
                } else {
                    cb()
                }
            }
            var validateCompScale = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('请选择公司规模'))
                } else {
                    cb()
                }
            }
            var validateCompanyBindingId = (rule, value, cb) => {

                if (value == '') {
                    cb(new Error('请选择公司类型'))
                } else {
                    console.log(value);
                    cb()
                }
            }

            return {
                createCompanyRule: {
                    name: [
                        {validator: validateCompName, trigger: 'blur'}
                    ],
                    compCode: [
                        {validator: validateCompCode, trigger: 'blur'}
                    ],

                    compScale: [
                        {validator: validateCompScale, trigger: 'blur'}
                    ],
                    companyBindingId:[
                        {validator:validateCompanyBindingId,trigger: 'blur'}
                    ],
                },

                searchCompany: '',
                radio: '1',
                selectCompanyCount: 0,
                searchBlock: false,
                searchTableData: [],
                registerForm: {
                    userName: '',
                    mobile:'',
                    pwd: '',
                    checkPwd: '',
                    email: '',
                    captcha: ''
                },
                roleForm: {
                    loginname: '',
                    userId: '',
                    roleId: '',
                    compId: '',
                    userName: '',
                    registerTime: '',
                    nickName: ''
                },
                form: {
                    name: '',
                    region: '',
                    location: '',
                    compCode: '',
                    compScale: '',
                    delivery: false,
                    logoUrl: '',
                    companyBindingId:''
                },
                dialogJoinCompany: false,
                formLabelWidth: '120px',
                joinSearchForm: {
                    compId: '',
                    name: '',
                    nickName: '',
                    compScale: ''
                },
                fileList: [],


            }
        },
        computed: {
            captchaMsg () {
               // return this.$store.getters.getCaptchaMsg
            }
        },
        mounted(){
            var userInfo = getStore("user_info_user");
            var vjson = JSON.parse(userInfo);
            console.log(vjson)
            this.roleForm.userId = vjson.id;
            this.roleForm.userName = vjson.userName;
            var currentComp = getStore("curCompany");
            if (!isNullObject(currentComp)) {
                var vcom = JSON.parse(currentComp);
                this.roleForm.compId = vcom.id;
            }
            //this.roleForm.compId=vjson.curCompany.id;
            //this.changepwdForm.userName=this.roleForm.userName;
            this.roleForm.registerTime = vjson.createTime;
            console.log("info---" + this.roleForm.registerTime);
        },
        methods: {
            myCompanyBindingIdBlur(){
                this.$refs.refCreateForm.validateField('companyBindingId');
            },
            myCompScaleBlur(){
                console.log("================================");
                this.$refs.refCreateForm.validateField('compScale');
            },
            formatScale: function (row, column) {
                var scale = row.compScale;
                if (scale == '1') {
                    return "20人以下";
                } else if (scale == '2') {
                    return "20-50人";
                } else if (scale == '3') {
                    return "50-200人";
                } else if (scale == '4') {
                    return "200-500人";
                } else if (scale == '5') {
                    return "500-1000人";
                } else if (scale == '6') {
                    return "1000人以上";
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            tableRowClassName(row, index) {
                /*
                 if (index === 1) {
                 return 'info-row';
                 } else if (index === 3) {
                 return 'positive-row';
                 }
                 return '';*/
                if (row.operation) {
                    return 'info-row'
                } else {
                    return ''
                }
            },
            handleJoinCompanyClose(){
                this.cancelJoinCompanyFun();
            },
            cancelJoinCompanyFun(){
                this.joinSearchForm.input = '';
                this.dialogJoinCompany = false;
            },
            selectedCompanyItem(row){
                console.log(row);
                this.selectActiveCompanyId = row.id;

            },
            joinCompany(data){
                if (data.id == '') {
                    this.$message({
                        type: 'error',
                        message: '请选择要加入的公司'
                    });
                    return false;
                }
                this.joinSearchForm.compId = data.id;
                this.joinSearchForm.name = data.name;
                this.joinSearchForm.compScale = data.compScale;
                this.dialogJoinCompany = true;
                //this.joinSearchForm.name

            },
            async search(){
                if (this.searchCompany == '') {
                    this.$message({
                        type: 'error',
                        message: '请输入要加入的公司名称'
                    });
                    return false;
                }
                let dataCompany = {
                    'company': {"name": this.searchCompany},
                    'pageSize': 1000,
                    'pageIndex': 1,
                }

                const res = await queryCompany(dataCompany);
                console.log(res);
                if (res.isSuccess == true) {
                    this.searchBlock = true;
                    this.searchTableData = res.result.data;
                    this.selectCompanyCount = res.result.data.length;
                } else {
                    this.searchBlock = false;
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            cancelJoinCompanyFun(){
                this.joinSearchForm.input = '';
                this.dialogJoinCompany = false;
            },
            async joinCompanyFun(){
                var compId = this.joinSearchForm.compId;
                const res = await requestUserCompany({"userId": this.roleForm.userId, "companyId": compId});
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '加入成功'
                    });
                    //this.loadInit();
                    this.joinSearchForm.input = '';
                    this.dialogJoinCompany = false;
                    //location.reload();
                    this.$router.push({path: '/manage',query:{userId:res.result.userId}});
                } else {
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            //
            async createCompany(formName) {
                console.log("error=====1")
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.userId = this.roleForm.userId;
                        let dataCompany = {
                            'name': this.form.name,
                            'ownerId': this.userId,
                            'createUserId': this.userId,
                            'location': this.form.location,
                            'compCode': this.form.compCode,
                            'compScale': this.form.compScale,
                            'companyBindingId':this.form.companyBindingId,
                            'type':this.form.companyBindingId
                        }
                        const res = await createCompanyFun(dataCompany);
                        if (res.isSuccess == true) {
                        	var msgtitle='创建成功';
                        	if(this.form.companyBindingId== this.GLOBAL.COMPANY_TYPE_STALL ){
                        		const res2= await initDefaultWareHouse({"companyId":res.result.id,"name":"默认仓库","memo":"默认仓库"});
                        		if(res2.isSuccess == true){
                        			msgtitle='创建成功';
                        		}
                        	}else{
                        		msgtitle='创建成功(未初化仓库)';
                        	}

                        	this.$message({
                        			duration:this.GLOBAL.MESSAGE_DISSMISS_TIME_MID,
                                	type: 'success',
                                	message: msgtitle,
                                	showClose:true
                            });

                            this.dialogFormVisible = false;
                            if(this.form.companyBindingId==1){
                                this.$router.push({path: '/homeStall',query:{userId:this.roleForm.userId}})
                            }else if(this.form.companyBindingId==2){
                                this.$router.push({path: '/homeSeller',query:{userId:this.roleForm.userId}})
                            }else{
                                this.$router.push({path: '/manage',query:{userId:this.roleForm.userId}})
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.errorMsg
                            });
                        }
                    } else {
                        console.log("error=====")
                    }
                });
            },
        }
    }

</script>

<style lang="less">
    @import '../style/mixin.less';
    @import "../style/common";
    @import '../style/basicInformation';

</style>
