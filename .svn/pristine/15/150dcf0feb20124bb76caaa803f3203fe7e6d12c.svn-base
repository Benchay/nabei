<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('menuManagement')">
                <router-link :to='{path:"/menuManagement"}'>菜单管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('platformSettings')">
                <router-link :to='{path:"/platformSettings"}'>平台基础配置</router-link>
            </li>
            <li class="menuIndex3" v-if="getMenuAuthFun('msgParamsConfig')">
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
        <div class="msgParamsConfig" v-show="tableData3.length>0">
            <div>
                <el-button type="info" @click="showMsgParamsConfigDia" size="small">配置短信参数</el-button>
                <el-button type="info" @click="batchDelete" size="small">删除</el-button>
            </div>
            <div class="shopList" style="padding-bottom: 80px;">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="platform"
                        label="平台名称"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="appKey"
                        label="appKey"
                        width="220"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="appSecret"
                        label="appSecret"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="sigNature"
                        label="短信签名"
                        width="170">
                    </el-table-column>
                    <el-table-column
                        prop="templateCode"
                        label="短信模版Code"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="templateType"
                        label="短信模版类型"
                        width="140"
                        :formatter="formatTemplateType">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="操作"
                        show-overflow-tooltip>
                        <template scope="scope">
                        	<a href="javascript:void(0);" class="blue" @click="editdialog(tableData3[scope.$index])">编辑</a>｜
                            <a href="javascript:void(0);" class="blue" @click="configDelete(tableData3[scope.$index].id)">删除</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <el-dialog title="配置短信参数" :visible.sync="msgParamsConfigDia">
            <el-form :model="msgParamsConfigform" :rules="msgParamsConfigformRule" ref="msgParamsConfigform">
                <el-form-item label="appKey ：" prop="appKey"  :label-width="formLabelWidth">
                    <el-input v-model="msgParamsConfigform.appKey" placeholder="请输入appKey " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="appsecret ：" prop="appSecret" :label-width="formLabelWidth">
                    <el-input v-model="msgParamsConfigform.appSecret" placeholder="请输入appsecret " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="短信签名名称 ：" prop="sigNature" :label-width="formLabelWidth">
                    <el-input v-model="msgParamsConfigform.sigNature" placeholder="请输入短信签名名称 " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="短信模版Code ：" prop="templateCode" :label-width="formLabelWidth">
                    <el-input v-model="msgParamsConfigform.templateCode" placeholder="请输入短信模版Code " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="发送平台 ：" prop="platform" :label-width="formLabelWidth">
                    <el-input v-model="msgParamsConfigform.platform" placeholder="请输入发送平台 " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="短信模版类型：" :label-width="formLabelWidth">
                    <el-select v-model="msgParamsConfigform.templateType" placeholder="选择短信模版类型">
                        <el-option label="短信通知" value="1"></el-option>
                        <el-option label="验证码" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="msgParamsConfigDia = false">取 消</el-button>
                <el-button type="primary" @click="msgParamsConfigFormSubmit('msgParamsConfigform')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改配置短信参数" :visible.sync="editMsgParamsConfigDia">
            <el-form :model="editMsgParamsConfigform" :rules="editMsgParamsConfigformRule" ref="editMsgParamsConfigform">
            	<el-form-item label="编号：" :label-width="formLabelWidth" style="display: none;">
                    <el-input v-model="editMsgParamsConfigform.id" auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="appKey ：" prop="appKey" :label-width="formLabelWidth">
                    <el-input v-model="editMsgParamsConfigform.appKey" placeholder="请输入appKey " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="appsecret ：" prop="appSecret" :label-width="formLabelWidth">
                    <el-input v-model="editMsgParamsConfigform.appSecret" placeholder="请输入appsecret " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="短信签名名称 ：" prop="sigNature" :label-width="formLabelWidth">
                    <el-input v-model="editMsgParamsConfigform.sigNature" placeholder="请输入短信签名名称 " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="短信模版Code ：" prop="templateCode" :label-width="formLabelWidth">
                    <el-input v-model="editMsgParamsConfigform.templateCode" placeholder="请输入短信模版Code " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="发送平台 ：" prop="platform" :label-width="formLabelWidth">
                    <el-input v-model="editMsgParamsConfigform.platform" placeholder="请输入发送平台 " auto-complete="off" class="add-dialog"></el-input>
                </el-form-item>
                <el-form-item label="短信模版类型：" :label-width="formLabelWidth">
                    <el-select v-model="editMsgParamsConfigform.templateType" placeholder="选择短信模版类型">
                        <el-option label="短信通知" value="1"></el-option>
                        <el-option label="验证码" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editMsgParamsConfigDia = false">取 消</el-button>
                <el-button type="primary" @click="editMsgParamsConfigFormSubmit('editMsgParamsConfigform')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {createMsgParamsConfig,updateMsgConfig,selectMsgConfig,batchDeleteMsgConfig} from '@/api/getData'
    import {userInfo} from  '../config/mUtils'
    import {mydateFormat} from '../utils/dataFormater.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        computed: {
            classObject: function () {
                return {
                    active: this.isActive && !this.error,
                    'text-danger': this.error && this.error.type === 'fatal',
                }
            }
        },
        data() {
            return {
            	msgParamsConfigformRule:{
            		appKey:[
            			{ required: true, message: 'appKey不能为空'},
            		],
            		appSecret:[
            			{ required: true, message: 'appSecret不能为空'},
            		],
            		sigNature:[
            			{ required: true, message: '短信签名名称不能为空'},
            		],
            		templateCode:[
            			{ required: true, message: '短信模版Code不能为空'},
            		],
            		platform:[
            			{ required: true, message: '发送平台不能为空'},
            		]
            	},
            	editMsgParamsConfigformRule:{
            		appKey:[
            			{ required: true, message: 'appKey不能为空'},
            		],
            		appSecret:[
            			{ required: true, message: 'appSecret不能为空'},
            		],
            		sigNature:[
            			{ required: true, message: '短信签名名称不能为空'},
            		],
            		templateCode:[
            			{ required: true, message: '短信模版Code不能为空'},
            		],
            		platform:[
            			{ required: true, message: '发送平台不能为空'},
            		]
            	},
                rotate:false,
                bindWebStoreUrl:'www.bai',
                tableData3: [],
                //默认每页数据量
                pagesize: 8,

                //默认高亮行数据id
                highlightId: -1,

                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,

                //默认数据总数
                totalCount: 0,

                msgParamsConfigDia : false,

                msgParamsConfigform:{},

                editMsgParamsConfigDia:false,
                editMsgParamsConfigform:{},
                formLabelWidth: '160px',
            }
        },
         mounted(){
            this.initloadData();
        },

        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },

            async initloadData() {
            	let param ={
            		msgParamsState:1,
            		msgSendIntegerState:0
            	}
            	this.tableData3 = [];
                const res = await selectMsgConfig(param);
                if (res.isSuccess == true) {
                    this.tableData3 = res.result.data;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },


            //添加paypal账户
            async msgParamsConfigFormSubmit(formName){
            	this.$refs[formName].validate(async (valid) => {
					if (valid) {
                        const res = await createMsgParamsConfig(this.msgParamsConfigform);
                        if (res.isSuccess == true) {
                            this.$message({
                                type: 'success',
                                message: res.result.msg
                            });
                             this.msgParamsConfigDia = false;
                             this.initloadData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.errorMsg
                            });
                        }
					} else {

						return false;
					}
				});
          	},

          	async editMsgParamsConfigFormSubmit(formName){
            	this.$refs[formName].validate(async (valid) => {
					if (valid) {
                        const res = await updateMsgConfig(this.editMsgParamsConfigform);
                        if (res.isSuccess == true) {
                            this.$message({
                                type: 'success',
                                message: res.result.msg
                            });
                             this.editMsgParamsConfigDia = false;
                             this.initloadData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.errorMsg
                            });
                        }
					} else {

						return false;
					}
				});
          	},

          	formatTemplateType:function(row, column) {
            	let data = row.templateType;
            	if(data == 1){
            		return "短信通知";
            	}else if(data == 2){
            		return "验证码";
            	}else{
            		return "";
            	}
            },

          	showMsgParamsConfigDia (){
          		this.msgParamsConfigform = {
          			templateType:'1'
          		}
          		this.msgParamsConfigDia = true
          	},

          	editdialog(rows){
            	this.editMsgParamsConfigform = {
            	    id:rows.id,
            	    appKey:rows.appKey,
            	    appSecret:rows.appSecret,
            	    sigNature:rows.sigNature,
            	    templateCode:rows.templateCode,
            	    templateType:rows.templateType+'',
            	    platform:rows.platform
            	};
            	this.editMsgParamsConfigDia = true;
            },

            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },

            async batchDelete(){
				if(this.multipleSelection.length==0)
                    return;
                var array = [];
                this.multipleSelection.forEach((item) => {
                    array.push(item.id);
                })
                let param = {
                	ids:array
                }
                const res = await batchDeleteMsgConfig(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
                this.initloadData();
            },

            async configDelete(id){
            	let array = [id];
            	let param = {
                	ids:array
                }
                const res = await batchDeleteMsgConfig(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
                this.initloadData();
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/msgParamsConfig';
</style>
