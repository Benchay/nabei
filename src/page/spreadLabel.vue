<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('stallProductManagement')">
                <router-link :to='{path:"/stallProductManagement"}'>商品管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('classificationGoods')">
                <router-link :to='{path:"/classificationGoods"}'>商品分类</router-link>
            </li>
            <li v-if="getMenuAuthFun('commodityStatistics')">
                <router-link :to='{path:"/commodityStatistics"}'>商品统计</router-link>
            </li>
            <li v-if="getMenuAuthFun('bindstallshop')">
                <router-link :to='{path:"/bindstallshop"}'>绑定店铺</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('spreadLabel')">
                <router-link :to='{path:"/spreadLabel"}'>推广标签</router-link>
            </li>
        </ul>
        <div class="classGoods">
            <div class="classTop">
                <el-input
                    placeholder="名称搜索"
                    icon="search"
                    size="small"
                    v-model="spreadLabelName"
                    :on-icon-click="initloadData">
                </el-input>
            </div>
            <div class="classButton">
                <a href="javascript:void(0)" class="buttonColor" @click="addDialogVisible = true">添加推广标签</a>
                <a href="javascript:void(0)" class="buttonColor" @click="batchDeleteConfig">删除</a>
            </div>
            <div class="classTable">
                <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="标签名称">
                    </el-table-column>
                    <el-table-column
                        prop="productCount"
                        label="商品数量">
                    </el-table-column>
                    <el-table-column
                        prop="memo"
                        label="备注">
                    </el-table-column>
                    <el-table-column
                        prop="sequenceNum"
                        label="显示顺序">
                    </el-table-column>
                    <el-table-column
                        width="250"
                        label="操作">
                        <template scope="scope">
                            <div class="tableFoot">
                                <router-link :to='{path:"/spreadLabelDetails",query:{spreadLabelId:tableData[scope.$index].id,spreadLabelName:tableData[scope.$index].name}}' class="blue2">查看</router-link>
                                <a href="javascript:void(0)" @click="updateSpreadLabelClick(tableData[scope.$index])">编辑</a>
                                <a href="javascript:void(0)" @click="deleteSpreadLabel(tableData[scope.$index])">删除</a>
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
                :page-sizes="[10, 20, 30, 40 ,50]"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, sizes,prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
        <el-dialog
            title="添加推广标签"
            :visible.sync="addDialogVisible"
            size="tiny"
            >
            <div>
            	<el-form ref="addSpreadLabelForm" :model="addSpreadLabelForm" :rules="addSpreadLabelFormRule" label-width="120px">
            		<el-form-item label="推广标签名称：" prop="name">
                        <el-input v-model="addSpreadLabelForm.name" placeholder="请输入推广标签名称"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="memo">
                        <el-input v-model="addSpreadLabelForm.memo" placeholder="请输入备注"></el-input>
                    </el-form-item>
                    <el-form-item label="排列顺序：" prop="sequenceNum">
                    	<el-input-number v-model="addSpreadLabelForm.sequenceNum" :min="1" :max="100" label="请输入排列顺序"></el-input-number>
                    </el-form-item>
            	</el-form>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="addSpreadLabel('addSpreadLabelForm')" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="addDialogVisible = false" class="buttonColor2">取 消</a>
              </span>
        </el-dialog>
        <el-dialog
            title="编辑推广标签"
            :visible.sync="editDialogVisible"
            size="tiny"
            >
            <div>
            	<el-form ref="editSpreadLabelForm" :model="editSpreadLabelForm" :rules="editSpreadLabelFormRule" label-width="120px">
            		<el-form-item label="推广标签名称：" prop="name">
                        <el-input v-model="editSpreadLabelForm.name" placeholder="请输入推广标签名称"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="memo">
                        <el-input v-model="editSpreadLabelForm.memo" placeholder="请输入备注"></el-input>
                    </el-form-item>
                    <el-form-item label="排列顺序：" prop="sequenceNum">
                    	<el-input-number v-model="editSpreadLabelForm.sequenceNum" :min="1" :max="100" label="请输入排列顺序"></el-input-number>
                    </el-form-item>
            	</el-form>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="editSpreadLabel('editSpreadLabelForm')" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="editDialogVisible = false" class="buttonColor2">取 消</a>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {addSpreadLabel,querySpreadLabel,batchDeleteSpreadLabel,updateSpreadLabel} from '@/api/getData'
    import {userInfo} from  '../config/mUtils'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
        	var validateSpreadLabelName = (rule, value, cb) => {
        		if(value.length>15){
        			cb(new Error('推广标签名称最多15个汉字！'))
        		}else{
        			cb();
        		}
        	}
            return {
            	spreadLabelName:'',
            	//默认每页数据量
                pageSize: 10,
                //当前页码
                currentPage: 1,

                totalCount:0,
                
                addSpreadLabelForm:{},
                
                editSpreadLabelForm:{},
                
                addDialogVisible:false,
                
                editDialogVisible:false,

                tableData:[],
                addSpreadLabelFormRule:{
                	name:[
                		{ required: true, message: '请输入推广标签名称', trigger: 'blur' },
                		{ validator: validateSpreadLabelName, trigger: 'blur' }
                	]
                },
                editSpreadLabelFormRule:{
                	name:[
                		{ required: true, message: '请输入推广标签名称', trigger: 'blur' },
                		{ validator: validateSpreadLabelName, trigger: 'blur' }
                	]
                },
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
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
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

            //从服务器获取数据
            async initloadData() {
            	alert(1);
            	this.tableData = [];
            	let param ={
            		name:this.spreadLabelName,
            		companyId:userInfo().companyId,
            		pageIndex:this.currentPage,
    				pageSize:this.pageSize
            	}
                const res = await querySpreadLabel(param);
                if (res.isSuccess == true) {
                	this.tableData = res.result.results;
                	this.totalCount =  res.result.totalCount;
                    this.pageSize = res.result.pageSize;
                    this.currentPage = res.result.currentPage;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            //
			async addSpreadLabel(formName){
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						this.addSpreadLabelForm.companyId = userInfo().companyId;
						const res = await addSpreadLabel(this.addSpreadLabelForm);
		                if (res.isSuccess == true) {
		                    this.$message({
		                        type: 'success',
		                        message: res.result.msg
		                    });
		                     this.addDialogVisible = false;
		                     this.initloadData();
		                }else{
		                    this.$message({
		                        type: 'error',
		                        message: res.errorMsg
		                    });
		                }
					}
				})
            },
            
            async editSpreadLabel(formName){
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const res = await updateSpreadLabel(this.editSpreadLabelForm);
		                if (res.isSuccess == true) {
		                    this.$message({
		                        type: 'success',
		                        message: res.result.msg
		                    });
		                     this.editDialogVisible = false;
		                     this.initloadData();
		                }else{
		                    this.$message({
		                        type: 'error',
		                        message: res.errorMsg
		                    });
		                }
					}
				})
            },

          async batchDeleteSpreadLabel(array){
            	let param = {
            		spreadLabelIds:array
            	}
            	const res = await batchDeleteSpreadLabel(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.initloadData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            
            deleteSpreadLabel(row){
            	var array = [];
            	array.push(row.id);
            	this.$confirm('是否确认删除选中的推广标签?', '提示', {
	                confirmButtonText: '确定',
	                cancelButtonText: '取消',
	                type: 'warning'
	              }).then(() => {
	                this.batchDeleteSpreadLabel(array);
	              }).catch(() => {
	
	              });
            },

          //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },

			batchDeleteConfig() {
              if(this.multipleSelection == undefined || this.multipleSelection.length==0){
                  this.$message({
                        type: 'error',
                        message: '请先勾选要删除的推广标签！'
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
                        message: '请先勾选要删除的推广标签！'
                    });
                    return;
                }
              this.$confirm('是否确认删除选中的推广标签?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.batchDeleteSpreadLabel(array);
              }).catch(() => {

              });
          },
          
          updateSpreadLabelClick(row){
          	this.editSpreadLabelForm = {
          		id:row.id,
          		name:row.name,
          		companyId:row.companyId,
          		memo:row.memo,
          		sequenceNum:row.sequenceNum
          	};
          	this.editDialogVisible = true;
          },
          
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stallProductManagement';
    
    .tableFoot{
        a{
            color:@blue2;
            margin-right: 10px;
        }
    }
</style>
