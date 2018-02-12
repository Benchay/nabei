	<template>
    <div class="fillcontain"
    	v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
        <ul class="menu">
            <li v-if="getMenuAuthFun('fastShipping2')">
                <router-link :to='{path:"/fastShipping2"}'>快速出货</router-link>
            </li>
            <li v-if="getMenuAuthFun('indentManagement')">
                <router-link :to='{path:"/indentManagement"}'>订单管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('takeGoods')">
                <router-link :to='{path:"/takeGoods"}'>取货码</router-link>
            </li>
            <li v-if="getMenuAuthFun('sellerSettlement')">
                <router-link :to='{path:"/sellerSettlement"}'>客户结算</router-link>
            </li>
            <li v-if="getMenuAuthFun('SettlementRecordsStall')">
                <router-link :to='{path:"/SettlementRecordsStall"}'>结算单</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('customerManagement')">
                <router-link :to='{path:"/customerManagement"}'>客户管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('statisticalStatement')">
                <router-link :to='{path:"/statisticalStatement"}'>销售统计</router-link>
            </li>
        </ul>
        <div class="customerManagement">
            <div class="customerTop flex left">
                <el-input v-model="sellName" placeholder="公司名称搜索" size="small" :on-icon-click="initloadFirstData"  icon="search" ></el-input>
                <el-input v-model="mobile" placeholder="联系电话搜索" size="small" :on-icon-click="initloadFirstData"  icon="search" ></el-input>
            </div>
            <el-col :span="24" class="customerButton" v-if="haveMenuAuthFun('customerManagement',1)">
                <a href="javascript:void(0)" class="buttonColor" @click="addStallCustomerClick">添加卖家</a>
                <a href="javascript:void(0)" class="buttonColor" @click="batchDeleteStallCustomerConfirm">删除</a>
                <a href="javascript:void(0)" class="buttonColor" @click="dialogImport = true">导入卖家</a>
            </el-col>
            <div class="customerTable">
                <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="sellName"
                        label="公司名称">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="联系电话">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        width="250"
                        label="地址">
                        <template scope="scope">
                            <el-popover
                                ref="popover1"
                                placement="top"
                                width="200"
                                trigger="hover"
                                :content=scope.row.address>
                            </el-popover>
                            <div class="overflow" v-popover:popover1>
                                {{scope.row.address}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        :formatter="formatStatus">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        width="250"
                        label="备注信息">
                        <template scope="scope">
                            <el-popover
                                ref="popover1"
                                placement="top"
                                width="200"
                                trigger="hover"
                                :content=scope.row.remark>
                            </el-popover>
                            <div class="overflow" v-popover:popover1>
                                {{scope.row.remark}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作" v-if="haveMenuAuthFun('customerManagement',1)">
                        <template scope="scope">
                            <div class="stallOperation">
                                <a href="javascript:void(0)" @click="updateStallCustomerClick(tableData[scope.$index])">编辑</a>
                                <a href="javascript:void(0)" @click="deleteStallCustomer(tableData[scope.$index].id)">删除</a>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--<el-pagination
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
            </el-pagination>-->
            <el-pagination
                small
                class="right"
                style="margin-top: 20px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40,50]"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total,sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
            <a href="javascript:void(0)" @click="exportData" class="export_excle">导出excel</a>
            <div style="height:160px;">
                &nbsp;
            </div>
        </div>
        <el-dialog
            title="添加卖家"
            :visible.sync="dialogVisible"
            size="tiny"
            >
            <div class="dialogAddCustomer">
                <el-form ref="addStallCustomerForm" :model="addStallCustomerForm" :rules="addStallCustomerFormRule" label-width="120px">
                    <el-form-item label="公司名称：" prop="sellName">
                        <el-select
	                        v-model="addStallCustomerForm.sellName"
	                        filterable
	                        remote
	                        reserve-keyword
	                        size="small"
	                        style="width:100%;"
	                        placeholder="请输入卖家公司名称"
	                        :remote-method="remoteMethod"
	                        :loading="loading"
	                        @change="handleAddSelect">
	                        <el-option
	                        	style="width:200px;"
	                            v-for="item in optionsCompanys"
	                            :key="item.name"
	                            :label="item.name"
	                            :value="item.name">
	                        </el-option>
	                    </el-select>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="mobile">
                        <el-input v-model="addStallCustomerForm.mobile" placeholder="请输入卖家电话"></el-input>
                    </el-form-item>
                    <el-form-item label="卖家地址：" prop="address">
                        <el-input v-model="addStallCustomerForm.address" placeholder="请输入卖家地址"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入备注信息"
                            v-model="addStallCustomerForm.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="addStallCustomerFormSubmit('addStallCustomerForm')" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="dialogVisible = false" class="buttonColor2">取 消</a>
              </span>
        </el-dialog>
        <el-dialog
            title="编辑卖家信息"
            :visible.sync="dialogVisible2"
            size="tiny"
            >
            <div class="dialogAddCustomer">
                <el-form ref="editStallCustomerForm" :model="editStallCustomerForm" :rules="editStallCustomerFormRule" label-width="120px">
                    <el-form-item label="编号：" hidden="hidden">
	                    <el-input v-model="editStallCustomerForm.id" auto-complete="off" class="add-dialog"></el-input>
	                </el-form-item>
                    <el-form-item label="公司名称：" prop="sellName">
                        <!--<el-autocomplete
                            style="width:100%;"
                            v-model="editStallCustomerForm.sellName"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入卖家公司名称"
                            @select="handleSelect"
                        ></el-autocomplete>-->
                        <el-select
	                        v-model="editStallCustomerForm.sellName"
	                        filterable
	                        remote
	                        reserve-keyword
	                        size="small"
	                        style="width:100%;"
	                        placeholder="请输入卖家公司名称"
	                        :remote-method="remoteMethod"
	                        :loading="loading"
	                        @change="handleEditSelect">
	                        <el-option
	                        	style="width:200px;"
	                            v-for="item in optionsCompanys"
	                            :key="item.name"
	                            :label="item.name"
	                            :value="item.name">
	                        </el-option>
	                    </el-select>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="mobile">
                        <el-input v-model="editStallCustomerForm.mobile" placeholder="请输入卖家电话"></el-input>
                    </el-form-item>
                    <el-form-item label="卖家地址：" prop="address">
                        <el-input v-model="editStallCustomerForm.address" placeholder="请输入卖家地址"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入备注信息"
                            v-model="editStallCustomerForm.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="editStallCustomerFormSubmit('editStallCustomerForm')" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="dialogVisible2 = false" class="buttonColor2">取 消</a>
              </span>
        </el-dialog>
        <el-dialog
            title="导入卖家"
            :visible.sync="dialogImport"
            size="tiny">
            <div class="dialogImport">
                <div class="importFirst">
                    <div class="flex">
                        <p>选择文件上传：</p>
						<p>{{uploadFileName}}</p>
                    </div>
                    <div class="flex3" style="align-items: flex-start">
                        <div class="uploatName flex">
                        </div>
                    </div>
                    <div class="uploatButton">
                        <input type="file" accept=".xls" id="uploatfile" @change="uploatFile" v-if="accomplish">
                        <div class="flex2 importUploat">
                            <img src="../image/Download01.png" alt="">
                            <p>上传文件</p>
                        </div>
                    </div>
                </div>
                <div class="importTips">
                    支持扩展名：.xlsx,.xls
                </div>
                <div class="importDownload">
                    <a href="http://cws.nabei.net:8103/stock/fileTemplate/stallCustomer.xls" class="flex2">下载模版</a>
                </div>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor" @click="importf">确 定</a>
                <a href="javascript:void(0)" class="buttonColor2" @click="dialogImport = false">取 消</a>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {mapActions, mapState} from 'vuex'
    import {addStallCustomer,batchDeleteStallCustomer,updateStallCustomer,queryStallCustomer,queryCompany,batchImportStallCustomer,createVmCompany} from '@/api/getData'
    import {userInfo} from  '../config/mUtils'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
    const _XLSX = require('xlsx')
    const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;

    export default {
        components: {
            headTop,
        },
        data() {
        	//校验手机号
        	var validateMobile = (rule, value, cb) => {
                var pattern0 = /^1(3|4|5|7|8)\d{9}$/;//校验手机号
                var pattern1 = /^0\d{2}-\d{8}$/;//校验带区号带-的电话号.区号三位，号码8位
                var pattern2 = /^0\d{3}-\d{7}$/;//校验带区号带-的电话号.区号四位，号码7位
                var pattern3 = /^0\d{2}\d{8}$/;//校验带区号不带-的电话号.区号三位，号码8位
                var pattern4 = /^0\d{3}\d{7}$/;//校验带区号不带-的电话号.区号四位，号码7位
                var pattern5 = /^\d{7,8}$/;//校验7位或8位的电话号码
                
                if (!pattern0.test(value) && !pattern1.test(value) && !pattern2.test(value) && 
                 !pattern3.test(value) && !pattern4.test(value) && !pattern5.test(value) ) {
                    cb(new Error('请输入正确的手机号'))
                }else{
                	cb();
                }
            }
        	var validateSellName = (rule, value, cb) => {
        		if(value.length>15){
        			cb(new Error('公司名称最多15个汉字！'))
        		}else{
        			cb();
        		}
        	}
        	var validateAddress = (rule, value, cb) => {
        		if(value.length>15){
        			cb(new Error('卖家地址最多15个汉字！'))
        		}else{
        			cb();
        		}
        	}

        	var validateRemark = (rule, value, cb) => {
        		if(value.length>15){
        			cb(new Error('备注最多15个汉字！'))
        		}else{
        			cb();
        		}
        	}
            return {
            	addStallCustomerFormRule:{
                	sellName:[
                		{ required: true, message: '请输入卖家公司名称', trigger: 'blur' },
                		{ validator: validateSellName, trigger: 'blur' }
                	],
                	mobile:[
                		{ required: true, message: '请输入手机号', trigger: 'blur' },
                		{ validator: validateMobile, trigger: 'blur' }
                	],
                	address:[
                		{validator: validateAddress, trigger: 'blur'}
                	],
                	remark:[
                		{validator: validateRemark, trigger: 'blur'}
                	]
                },

                editStallCustomerFormRule:{
                	sellName:[
                		{ required: true, message: '请输入卖家公司名称', trigger: 'blur' },
                		{ validator: validateSellName, trigger: 'blur' }
                	],
                	mobile:[
                		{ required: true, message: '请输入手机号', trigger: 'blur' },
                		{ validator: validateMobile, trigger: 'blur' }
                	],
                	address:[
                		{validator: validateAddress, trigger: 'blur'}
                	],
                	remark:[
                		{validator: validateRemark, trigger: 'blur'}
                	]
                },

                dialogVisible:false,
                dialogVisible2:false,
                sellName:'',
                mobile:'',
                loading:false,
                addStallCustomerForm:{
                	sellName:'',
                    mobile:'',
                    address:'',
                    remark:'',
                    sellCompanyId:'',
                    companyId:''
                },

                editStallCustomerForm:{
                	id:'',
                	sellName:'',
                    mobile:'',
                    address:'',
                    remark:'',
                    sellCompanyId:'',
                    companyId:''
                },
                pageSize: 10,
                //默认高亮行数据id
                highlightId: -1,
                //当前页码
                currentPage: 1,
                //查询的页码
                start: 1,
                //默认数据总数
                totalCount: 0,

                tableData: [],
                
                dialogImport:false,
                
                accomplish:true,
                
                importExcelData:'',
                
                importFaileData:[],//导入失败数据
                
                uploadFileName:'',//上传文件名称
                
                optionsCompanys:[],
                
                jsonArray:[],
                
                loading2:false,

            }
        },
        mounted(){
			this.initloadFirstData();
        },
        methods: {
        	haveMenuAuthFun(pathName, mode){
        		return haveMenuAuth(pathName, mode);
        	},
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
           },


            //查询第一页数据
            initloadFirstData(){
            	this.currentPage = 1;
            	this.initloadData();
            },

            //从服务器获取数据
            async initloadData() {
            	this.tableData = [];
            	let param ={
            		pageIndex:this.currentPage,
    				pageSize:this.pageSize,
    				sellName:this.sellName,
    				mobile:this.mobile,
    				companyId:userInfo().companyId
            	}
                const res = await queryStallCustomer(param);
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

            handleAddSelect(item) {
            	this.addStallCustomerForm.sellCompanyId = '';
                this.optionsCompanys.forEach((obj) => {
            		if(obj.name == item && obj.id){
            			this.addStallCustomerForm.sellCompanyId = obj.id;
            		}
            		if(obj.vmType && (obj.vmType == 1 || obj.vmType == 2)){
            			this.addStallCustomerForm.status = obj.vmType;
            		}
            	});
            },
            handleEditSelect(item) {
            	this.editStallCustomerForm.sellCompanyId = '';
                this.optionsCompanys.forEach((obj) => {
            		if(obj.name == item && obj.id){
            			this.editStallCustomerForm.sellCompanyId = obj.id;
            		}
            		if(obj.vmType && (obj.vmType == 1 || obj.vmType == 2)){
            			this.editStallCustomerForm.status = obj.vmType;
            		}
            	});
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
                this.initloadData();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.initloadData();
            },

            async addStallCustomerFormSubmit(formName){
            	this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.addStallCustomerForm.companyId = userInfo().companyId;
					if(this.addStallCustomerForm.status){
						this.addStallCustomer();
					}else{
						this.addVmCompany(1);
					}    
                 } else {
                      return false;
                  }
              });
            },
            
            async addVmCompany(type){
            	let vmSellName = '';
            	if(type == 1){
            		vmSellName = this.addStallCustomerForm.sellName
            	}else{
            		vmSellName = this.editStallCustomerForm.sellName
            	}
            	let params = {
            		companyName:vmSellName
            	}
            	const res = await createVmCompany(params);
                    if (res.isSuccess == true) {
                    	if(type == 1){
                    		this.addStallCustomerForm.sellCompanyId = res.result.id;
	                        this.addStallCustomerForm.status = 2;
	                        this.addStallCustomer();
                    	}else{
                    		this.editStallCustomerForm.sellCompanyId = res.result.id;
                    		this.editStallCustomerForm.status = 2;
                    		this.updateStallCustomer();
                    	}
                        
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.errorMsg
                        });
                    }
            },
            
            async addStallCustomer(){
            	const res = await addStallCustomer(this.addStallCustomerForm);
                    if (res.isSuccess == true) {
                        this.$message({
                            type: 'success',
                            message: res.result.msg
                        });
                         this.dialogVisible = false;
                         this.initloadFirstData();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.errorMsg
                        });
                    }
            },

            async batchDeleteStallCustomer(array){
            	let param = {
            		stallCustomerIds:array
            	}
            	const res = await batchDeleteStallCustomer(param);
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

            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },

            batchDeleteStallCustomerConfirm(){
              if(this.multipleSelection == undefined || this.multipleSelection.length==0){
                  this.$message({
                        type: 'error',
                        message: '请先勾选要删除的卖家！'
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
                        message: '请先勾选要删除的卖家！'
                    });
                    return;
                }
              this.$confirm('是否确认删除选中的卖家?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.batchDeleteStallCustomer(array);
              }).catch(() => {

              });
          },

          deleteStallCustomer(stallId){
              var array = [];
              array.push(stallId);
              this.$confirm('是否确认删除选中的卖家?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.batchDeleteStallCustomer(array);
              }).catch(() => {

              });
          },

          updateStallCustomerClick(row){
           		this.editStallCustomerForm = {
           			id:row.id,
           			sellName:row.sellName,
           			mobile:row.mobile,
           			address:row.address,
           			remark:row.remark,
           			sellCompanyId:row.sellCompanyId,
           			companyId:row.companyId
           		};
           		this.dialogVisible2 = true;
           	},

           	async editStallCustomerFormSubmit(formName){
            	this.$refs[formName].validate(async (valid) => {
				if (valid) {
					if(this.editStallCustomerForm.status){
						this.updateStallCustomer();
					}else{
						this.addVmCompany(2);
					}
                        
                  } else {

                      return false;
                  }
              });
            },
            
            async updateStallCustomer(){
            	const res = await updateStallCustomer(this.editStallCustomerForm);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                     this.dialogVisible2 = false;
                     this.initloadData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            addStallCustomerClick(){
            	this.addStallCustomerForm = {
                	sellName:'',
                    mobile:'',
                    address:'',
                    remark:'',
                    sellCompanyId:'',
                    companyId:''
                }
            	this.dialogVisible = true;
            },

            //远程搜索模糊查询公司信息
            async remoteMethod(query){
                if(query!=''){
                    this.loading = true;

                    let param ={
	            		company:{
	            			type:2,
	            			name:query
	            		},
	            		pageIndex:1,
	    				pageSize:5000
	            	}
	                const res = await queryCompany(param);
	                this.optionsCompanys = [];
	                if (res.isSuccess == true) {
	                	let flag = false;
	                	this.optionsCompanys = res.result.data;
	                	res.result.data.forEach(obj => {
	                		if(obj.name == query){
	                			flag = true;
	                		}
	                	});
	                	if(!flag){
	                		this.optionsCompanys.push({name:query});
	                	}
	                }else{
	                	this.optionsCompanys.push({name:query});
	                }
                    setTimeout(() => {
                        this.loading = false;
                    }, 200);
                } else {
                    this.optionsCompanys = [];
                }
            },
            
            async importf(){
            	if(this.uploadFileName == ""){
            		this.$message({
                        type: 'error',
                        message: "请先选择上传的文件"
                    });
                    return;
            	}
                this.dialogImport = false;
                this.loading2 = true;
				this.importExcelData = '';
				this.importFaileData = [];
				let obj = document.getElementById("uploatfile");
				var wb;//读取完成的数据
            	var rABS = false; //是否将文件读取为二进制字符串
            	if(!obj.files) {
                    return;
                }
                var f = obj.files[0];
                var reader = new FileReader();
                reader.onload =(e) =>{
                    var data = e.target.result;
                    if(rABS) {
                        wb = X.read(btoa(fixdata(data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = X.read(data, {
                            type: 'binary'
                        });
                    }

                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
                    this.importExcelData = JSON.stringify( X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
                    this.jsonArray = JSON.parse(this.importExcelData);
                    this.importFileData(0);
                };
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
			},
			
			uploatFile(){
				let obj = document.getElementById("uploatfile").value;
				let array = obj.split("\\");
				if(array.length>0){
					this.uploadFileName = array[array.length-1];
				}else{
					this.uploadFileName = "";
				}
			},
			
			async importFileData(index){
				let importDataStr = [];
				for(var i=0;i<100 && index<this.jsonArray.length;i++){
					importDataStr.push(this.jsonArray[index]);
					index++;
				}
				let param = {
	                	jsonStr:importDataStr,
	                	companyId:userInfo().companyId
	               }
               const res = await batchImportStallCustomer(param);
            	if (res.isSuccess == true) {
                    if(res.result.data && res.result.data.length>0){
                    	res.result.data.forEach(obj => {
                    		this.importFaileData.push(obj);
                    	});
                    }
                    if(index<this.jsonArray.length){
                    	this.importFileData(index);
                    }else{
                    	this.loading2 = false;
                   		this.uploadFileName = "";
                   		let obj = document.getElementById("uploatfile");
               			obj.value = '';
               			if(this.importFaileData.length>0){
               				this.exportFaileExcel();
               			}else{
               				this.$message({
	                            type: 'success',
	                            message: res.result.msg
	                        });
               			}
               			this.initloadData();
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                    this.loading2 = false;
                }
			},
			
			formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]));
		　　　},
			
			async exportFaileExcel() {		//导出excel
            	if(this.importFaileData.length>0){
            		const tHeader = ['公司名称', '联系电话','卖家地址','备注','失败原因'];
			　　　  const filterVal = ['sellName', 'mobile','address','remark','msg'];
			　　　  const list = this.importFaileData;
			　　　  const data = this.formatJson(filterVal, list);
			　　　  export_json_to_excel(tHeader, data, '导入卖家失败数据');
            	}
			},
			
			async exportData(){
				let param ={
            		pageIndex:1,
    				pageSize:this.totalCount,
    				sellName:this.sellName,
    				mobile:this.mobile,
    				companyId:userInfo().companyId
            	}
                const res = await queryStallCustomer(param);
                if (res.isSuccess == true) {
                	const tHeader = ['公司名称', '联系电话','卖家地址','备注'];
			　　　    const filterVal = ['sellName', 'mobile','address','remark'];
			　　　    const list = res.result.results;
			　　　   const data = this.formatJson(filterVal, list);
			　　　   export_json_to_excel(tHeader, data, '客户数据');
                }
			},
			
			formatStatus:function(row, column){
            	let status = row.status;
            	if(status == 1){
            		return "已注册";
            	}else{
            		return "未注册";
            	}
            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/customerManagement';
    
    .imgwrapud{
        display: inline;
        position: absolute;
        top: 0;
        right: 4px;
    }
    
    
    .dialogImport{
	    .importFirst{
	        display: flex;
	        align-items: flex-start;
	        .uploatName{
	            background: #e7f3fd;
	            margin-left: 10px;
	            margin-bottom: 5px;
	            p{
	                max-width: 189px;
	                white-space:nowrap;
	                overflow:hidden;
	                text-overflow:ellipsis;
	            }
	        }
	        .uploatButton{
	            position: relative;
	            #uploatfile{
	                background: pink;
	                width: 96px;
	                height: 30px;
	                position: absolute;
	                top:0;
	                left:0;
	                opacity: 0;
	            }
	            .importUploat{
	                background:#fff;
	                border:1px solid #ccc;
	                border-radius: 15px;
	                padding: 4px 9px;
	                font-size: 12px;
	                margin-left: 10px;
	                img{
	                    width: 18px;
	                    height: 18px;
	                }
	            }
	        }
	    }
	
	    .dialogImport,.importTips{
	        height: 40px;
	        line-height: 40px;
	    }
	    .importTips{
	     font-size: 12px;
	        color:#999;
	    }
	    .importDownload{
	        padding: 0 8%;
	        a{
	            border:1px solid @blue2;
	            height: 30px;
	            border-radius: 5px;
	            color:#333;
	        }
	    }
	}
</style>
