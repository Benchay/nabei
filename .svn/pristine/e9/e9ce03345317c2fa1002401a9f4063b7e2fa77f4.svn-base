<template>
    <div class="fillcontain">
        <div class="createCompany">
            <div class="createHead flex2">
                <img src="../image/join.png" alt="">
                <p>加入公司</p>
            </div>
            <div class="JoinCompany">
                <div class="joinSearch flex2">
                    <el-input v-model="searchCompany" class="joinInput" placeholder="请输入要查找的公司名称..."></el-input>
                    <a href="javascript:void(0)" class="flex2" @click="search">搜 索</a>
                </div>
                <div class="joinTable flex2" v-if="searchBlock">
                    <div>
                        <el-col :span="24" class="searchNumber">共搜索到 <span> {{this.selectCompanyCount}} </span>条数据</el-col>
                        <div style="width: 700px;">
                            <el-table
                                max-height="410"
                                ref="searchCompTable"
                                :data="searchTableData"
                                @row-click="selectedCompanyItem"
                                :row-class-name="tableRowClassName"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="公司名称">
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
                                <el-table-column
                                    label=""
                                    prop="power">
                                    <template scope="scope">
                                        <el-button
                                            size="small"
                                            @click="joinCompany(searchTableData[scope.$index])"
                                        >+加入公司
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="joinFoot flex2">
                                <router-link :to='{path:"/guidance"}' class="confirm1 flex2">返回上一页</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="加入公司" :visible.sync="dialogJoinCompany" size="tiny">
            <div class="companyList">
                <div class="flex"><img src="../image/shops@3x.png" alt="">海麦金</div>
                <div class="companyInfo">
                    <p>公司规模： <span>25</span></p>
                    <!--<p>管理员：<span>李四</span></p>-->
                </div>
            </div>
            <div class="joinVerify flex">
                <span class="tit">验证信息：</span>
                <el-input v-model="joinSearchForm.input" placeholder="请输入验证信息"></el-input>
            </div>
            <div slot="footer" class="dialog-footer companyListFoot flex2">
                <el-button type="primary" @click="joinCompanyFun" class="confirm">确 定</el-button>
                <el-button @click="dialogJoinCompany = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {updateLoginInfo,queryCompany,createCompanyFun,requestJoinCompany,initDefaultWareHouse} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'
    import {setStore, getStore} from  '../config/mUtils'
    import {isJSON,isNullObject,getCompanyType} from  '../utils/common'

    export default {
        components: {

        },
        data () {
            return {
                identity:'',
                searchCompany: '',
                radio: '1',
                selectCompanyCount: 0,
                searchBlock: false,
                searchTableData: [],
                roleForm: {
                    loginname: '',
                    userId: '',
                    roleId: '',
                    compId: '',
                    userName: '',
                    registerTime: '',
                    nickName: ''
                },
                dialogJoinCompany: false,
                joinSearchForm: {
                    compId: '',
                    name: '',
                    nickName: '',
                    serialNub:'',
                    compScale: '',
                    input:''
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
            this.identity =getCompanyType(getStore("curCompany"));
            var userInfo = getStore("user_info_user");
            var vjson = JSON.parse(userInfo);
            if(this.identity == -1){
            	this.identity = vjson.type;
            }
            console.log(vjson)
            this.roleForm.userId = vjson.id;
            this.roleForm.userName = vjson.userName;
            var currentComp = getStore("curCompany");
            if (!isJSON(currentComp)) {
                var vcom = JSON.parse(currentComp);
                this.roleForm.compId = vcom.id;
            }
            //this.roleForm.compId=vjson.curCompany.id;
            //this.changepwdForm.userName=this.roleForm.userName;
            this.roleForm.registerTime = vjson.createTime;
            console.log("info---" + this.roleForm.registerTime);
        },
        destroyed(){
        	window.clearTimeout(this.timeout);
        },
        methods: {
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
            myCompanyBindingIdBlur(){
                this.$refs.refCreateForm.validateField('companyBindingId');
            },
            myCompScaleBlur(){
                console.log("================================");
                this.$refs.refCreateForm.validateField('compScale');
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
                this.joinSearchForm.serialNub = data.serialNub;
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
                    'company': {
                    	"name": this.searchCompany,
                    	"type": this.identity
                    },
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
                var input = this.joinSearchForm.input;
                if(input==''||input.trim()==''){
                    this.$message({
                        type:'error',
                        message:'请输入验证信息'
                    });
                    return;
                }else if(input.trim().length > 30){
                    this.$message({
                        type:'error',
                        message:'验证信息不能超过30个字符'
                    });
                    return;
                }
                const res = await requestJoinCompany({"userId": this.roleForm.userId, "companyId": compId});
                if (res.isSuccess == true) {
//					var msgtitle='加入成功';
//                  this.$message({
//                      type: 'success',
//                      message: msgtitle
//                  });
                    
                    this.joinSearchForm.input = '';
                    this.dialogJoinCompany = false;
                    
                    let  param = {
                        "userId":this.roleForm.userId,
                        "userName": this.roleForm.userName,
                        "compId": res.result.id,
                        "compName":this.joinSearchForm.name
                    };
                    
                    const res4=await updateLoginInfo(param);
                    
                	var currentCompt={"id":res.result.id,"ownerId":this.roleForm.userId,"type":this.identity};
                	setStore("curCompany",currentCompt);
                    
                    this.$message({
                    	type:'info',
                    	message:'您的申请已经提交，请等待该公司审核！'
                    });
//                  if(this.identity==1){
//                      this.$router.push({path: '/homeStall',query:{userId:res.result.userId}});
//                  }else if(this.identity==2){
//                      this.$router.push({path: '/homeSeller',query:{userId:res.result.userId}});
//                  }
//                  window.clearTimeout(this.timeout);
//                  this.timeout = setTimeout(()=>{
//                  	location.reload();
//                  },300);
                } else {
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
        }
    }

</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/createCompany';
</style>
