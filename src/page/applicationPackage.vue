<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('messageManagement')">
                <router-link :to='{path:"/messageManagement"}'>消息管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('bulletinManagement')">
                <router-link :to='{path:"/bulletinManagement"}'>公告管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('msgManagement')">
                <router-link :to='{path:"/msgManagement"}'>短信管理</router-link>
            </li>
            <li class="menuIndex3">
            	<router-link :to='{path:"/applicationPackage"}'>应用管理</router-link>
            </li>
        </ul>
        <div class="bulletinManagement">
            <div>
                <div class="bulletinInfoTable" >
                    <div class="bullerinTop">
                        <el-button type="primary" @click="uploadApplicationClick" size="small">上传应用</el-button>
                        <el-button type="primary" @click="batchDeleteApplicationPackageClick" size="small">批量删除</el-button>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange"
                        style="width: 100%"
                        >
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="appName"
                            label="app 名称"
                           >
                        </el-table-column>
                        <el-table-column
                            prop="platform"
                            label="平台"
                            :formatter="formatPlatform">
                        </el-table-column>
                        <el-table-column
                            prop="appType"
                            label="应用类型"
                            :formatter="formatAppType">
                        </el-table-column>
                        <el-table-column
                            prop="updateCode"
                            label="更新码">
                        </el-table-column>
                        <el-table-column
                            prop="version"
                            label="版本">
                        </el-table-column>
                        <el-table-column
                            prop="size"
                            label="应用大小(M)">
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注">
                        </el-table-column>
                        <el-table-column
	                        label="操作">
	                        <template scope="scope">
	                            <div class="stallOperation">
	                                <a href="javascript:void(0)" @click="updateApplicationPackageClick(tableData[scope.$index])">编辑</a>
	                                <a href="javascript:void(0)" @click="deleteApplicationPackageClick(tableData[scope.$index].id)">删除</a>
	                            </div>
	                        </template>
	                    </el-table-column>
                    </el-table>
                </div>

                <el-pagination
                    small
                    class="right"
                    style="margin-top: 20px;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
                <el-dialog
		            title="上传应用"
		            :visible.sync="dialogApplicationForm"
		            size="tiny"
		            >
		            <div class="">
		                <el-form ref="applicationPackageForm" :model="applicationPackageForm" :rules="applicationPackageFormRule" label-width="120px">
		                	<el-form-item label="app 名称：" prop="appName" :label-width="formLabelWidth">
			                    <el-input v-model="applicationPackageForm.appName" placeholder="请输入app 名称" class="add-dialog"></el-input>
			                </el-form-item>
			                <el-form-item prop="platform" label="平台：" :label-width="formLabelWidth">
	                            <el-select v-model="applicationPackageForm.platform" @change="checkPlatform" placeholder="请选择平台类型"  class="formInput">
	                                <el-option label="Android" value="1"></el-option>
	                                <el-option label="IOS" value="2"></el-option>
	                            </el-select>
	                        </el-form-item>
	                        <el-form-item prop="appType" label="应用类型：" :label-width="formLabelWidth">
	                            <el-select v-model="applicationPackageForm.appType" placeholder="请选择平台类型"  class="formInput">
	                                <el-option label="档口" value="1"></el-option>
	                                <el-option label="卖家" value="2"></el-option>
	                            </el-select>
	                        </el-form-item>
	                        <el-form-item prop="appType" label="强制更新：" :label-width="formLabelWidth">
	                            <el-select v-model="applicationPackageForm.forceUpdate" placeholder="请选择"  class="formInput">
	                                <el-option label="是" value="1"></el-option>
	                                <el-option label="否" value="0"></el-option>
	                            </el-select>
	                        </el-form-item>
	                        <el-form-item prop="appType" label="状态：" :label-width="formLabelWidth">
	                            <el-select v-model="applicationPackageForm.enable" placeholder="请选择状态"  class="formInput">
	                                <el-option label="启用" value="1"></el-option>
	                                <el-option label="禁用" value="0"></el-option>
	                            </el-select>
	                        </el-form-item>
		                    <el-form-item label="更新码：" prop="updateCode" :label-width="formLabelWidth">
		                        <el-input v-model="applicationPackageForm.updateCode" placeholder="请输入更新码"></el-input>
		                    </el-form-item>
		                    <el-form-item label="版本：" :label-width="formLabelWidth">
		                        <el-input v-model="applicationPackageForm.version" placeholder="请输入应用版本"></el-input>
		                    </el-form-item>
		                    <el-form-item label="备注：" prop="remark">
		                        <el-input
		                            type="textarea"
		                            :rows="3"
		                            placeholder="请输入备注信息"
		                            v-model="applicationPackageForm.remark">
		                        </el-input>
		                    </el-form-item>
		                    <el-form-item label="下载地址：" v-if="isIOSFlag == 1" prop="url" :label-width="formLabelWidth">
		                        <el-input v-model="applicationPackageForm.url" placeholder="请输入下载地址"></el-input>
		                    </el-form-item>
		                    <el-form-item label="文件：" v-if="isIOSFlag == 2">
		                    	<el-upload
								  class="upload-demo"
								  :show-file-list="false"
								  action="/cws/uploadFile"
								  name = "uploadFile"
								  :headers = "{token:getStore('token')}"
								  :on-success="uploadSuccess"
								  :before-upload="beforeUpload">
								  <el-button size="small" type="primary">点击上传</el-button>
								</el-upload>
								<p>{{uploadFileName}}</p>
		                    </el-form-item>
		                </el-form>
		            </div>
		            <span slot="footer" class="dialog-footer flex2">
		                <!--<a href="javascript:void(0)" @click="" class="buttonColor" style="background-color: gold;">确 定</a>
		                <a href="javascript:void(0)" @click="dialogApplicationForm = false" class="buttonColor2">取 消</a>-->
		                
		                <el-button type="primary" @click="addApplicationPackageClick('applicationPackageForm')">保  存</el-button>
                        <el-button  @click="dialogApplicationForm = false">取  消</el-button>
		              </span>
		        </el-dialog>
                
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {saveApplicationPackage,queryApplicationPackage,batchDeleteApplicationPackage} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'
    import {userInfo,getStore} from  '../config/mUtils'
    import {getLodop}   from '../Lodop/LodopFuncs.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
        	var validateUpdateCode = (rule, value, cb) => {
        		let pattern = /^([1-9]\d*|[0]{1,1})$/;
        		if (!pattern.test(value)) {
                    cb(new Error('更新码只能为数字'))
                }else{
        			cb();
        		}
        	}
            return {
              	applicationPackageForm:{
              		appName:'',
              		platform:'',
              		appType:'',
              		version:'',
              		remark:'',
              		url:'fdafda'
              	},
              	
              	dialogApplicationForm:false,
              	
              	formLabelWidth: '120px',
              	
              	applicationPackageFormRule:{
              		appName:[
              			{ required: true, message: '请输入app 名称', trigger: 'blur' }
              		],
              		platform:[
              			{ required: true, message: '请选择平台', trigger: 'blur' }
              		],
              		appType:[
              			{ required: true, message: '请选择类型', trigger: 'blur' }
              		],
              		updateCode:[
              			{ required: true, message: '请输入更新码', trigger: 'blur' },
              			{ validator: validateVersion, trigger: 'blur' }
              		]
              	},
              	
              	uploadFileName:'',
              	
              	tableData:[],
              	
              	pageSize:10,
                //默认高亮行数据id
                highlightId: -1,
                //当前页码
                currentPage: 1,
                //数据总数
                totalCount: 0,

				isIOSFlag:2,
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
            handleSizeChange(val) {
            	this.pageSize = val;
            	this.currentPage = 1;
            	this.loadData();
            },
            handleCurrentChange(val) {
            	this.currentPage = val;
            	this.loadData();
            },
            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },
            uploadApplicationClick(){
            	this.uploadFileName = '';
            	this.applicationPackageForm = {};
                this.dialogApplicationForm = true;
            },
            
            beforeUpload(file){
            	this.uploadFileName = file.name;
            	let size = file.size/1024/1024;
            	this.applicationPackageForm.size = size.toFixed(2);
            },
            
            uploadSuccess(res, file) {
            	let url = "http://proxy.tintop.cn:26880/"+res.result;
            	this.applicationPackageForm.url = url;
            },
            
            initloadFirstData(){
            	this.currentPage = 1;
            	this.loadData();
            },

            async loadData(){
				this.tableData = [];
            	let param ={
            		ApplicationPackage:{},
            		pageIndex:this.currentPage,
    				pageSize:this.pageSize
            	}
                const res = await queryApplicationPackage(param);
                if (res.isSuccess == true) {
                	this.tableData = res.result.results;
                	this.totalCount =  res.result.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            
            async addApplicationPackageClick(formName){
            	this.$refs[formName].validate(async (valid) => {
				if (valid) {
						const res = await saveApplicationPackage(this.applicationPackageForm);
		                if (res.isSuccess == true) {
		                    this.$message({
		                        type: 'success',
		                        message: res.result.msg
		                    });
		                     this.dialogApplicationForm = false;
		                     this.initloadFirstData();
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
            
            deleteApplicationPackageClick(id){
                var array = [];
              	array.push(id);
                this.$confirm('是否确认删除选中的数据?', '提示', {
	                confirmButtonText: '确定',
	                cancelButtonText: '取消',
	                type: 'warning'
                }).then(() => {
                	this.batchDeleteApplicationPackage(array);
              	}).catch(() => {

              	});
            },
            
            updateApplicationPackageClick(row){
            	this.applicationPackageForm = row;
            	let forceUpdate = "1";
            	let enable = "1";
            	if(!row.forceUpdate){
            		forceUpdate = "0";
            	}
            	if(!row.enable){
            		enable = "0";
            	}
            	this.applicationPackageForm = {
            		id:row.id,
            		platform:row.platform+"",
            		remark:row.remark,
            		enable:enable,
            		url:row.url,
            		version:row.version,
            		size:row.size,
            		appName:row.appName,
            		forceUpdate:forceUpdate,
            		appType:row.appType+"",
            		createUserId:row.createUserId,
            		updateCode:row.updateCode+""
            	}
            	this.dialogApplicationForm = true;
            },
            
            batchDeleteApplicationPackageClick(){
                if(this.multipleSelection == undefined || this.multipleSelection.length==0){
                    this.$message({
                        type: 'error',
                        message: '请先勾选要删除的文件！'
                    });
                    return;
                }
                var array = [];
                this.multipleSelection.forEach((item) => {
                    array.push(item.id);
                })
                if(array.length <1){
                    this.$message({
                        type: 'error',
                        message: '请先勾选要删除的文件！'
                    });
                    return;
                }
                this.$confirm('是否确认删除选中的文件?', '提示', {
                    confirmButtonText: '确定',
                	cancelButtonText: '取消',
                	type: 'warning'
                }).then(() => {
                	this.batchDeleteApplicationPackage(array);
                }).catch(() => {

                });
            },
            
            async batchDeleteApplicationPackage(array){
            	let param = {
            		applicationPackageIds:array
            	}
            	const res = await batchDeleteApplicationPackage(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.initloadFirstData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            
            formatPlatform:function(row, column){
            	let platform = row.platform;
            	if(platform == 1){
            		return "Android";
            	}else if(platform == 2){
            		return "IOS";
            	}else if(platform == 3){
            		return "PC";
            	}else{
            		return "";
            	}
            },
            
            formatAppType:function(row, column){
            	let appType = row.appType;
            	if(appType == 1){
            		return "档口";
            	}else if(appType == 2){
            		return "卖家";
            	}else if(appType == 3){
            		return "运营管理";
            	}else{
            		return "";
            	}
            },
            
            checkPlatform(){
            	if(this.applicationPackageForm.platform == '1'){
            		this.isIOSFlag = 2;
            	}else{
            		this.isIOSFlag = 1;
            	}
            },
            
            getStore,

        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/bulletinManagement';
</style>
