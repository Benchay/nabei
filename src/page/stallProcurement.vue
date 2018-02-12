<template>
    <div class="fillcontain">
        <ul class="menu">
            <li  class="menuIndex" v-if="getMenuAuthFun('stallProcurement')">
                <router-link :to='{path:"/stallProcurement"}'>采购入库</router-link>
            </li>
            <li v-if="getMenuAuthFun('stallPurchase')">
                <router-link :to='{path:"/stallPurchase"}'>采购退货</router-link>
            </li>
            <li v-if="getMenuAuthFun('supplierManagement')">
                <router-link :to='{path:"/supplierManagement"}'>供应商管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('purchaseStatistics')">
                <router-link :to='{path:"/purchaseStatistics"}'>采购统计</router-link>
            </li>
        </ul>
        <div class="stallProcurement">
            <div class="left flex">
                <router-link :to='{path:"/stallProcurementStart"}' class="buttonColor">开始采购</router-link>
            </div>
            <div class="right flex">
            	<el-input v-model="q_supplierName" placeholder="供应商搜索"  icon="search" class="input-width" size="small" :on-icon-click="initFirstPageData"></el-input>
            	<el-select
                    v-model="q_createUserId"
                    filterable
                    remote
                    reserve-keyword
                    size="small"
                    class="input-width ml-10"
                    placeholder="采购员搜索"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    @change="handleCreateUserSelect">
                    <el-option
                    	style="width:200px;"
                        v-for="item in optionsCreateUser"
                        :key="item.id"
                        :label="item.userName"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-date-picker
                    size="small"
                    v-model="startDate"
                    class="ml-10"
                    style="width: 150px;"
                    type="date"
                    placeholder="选择开始日期"
                    :picker-options="startDateBefore"
                    format="yyyy-MM-dd"
					value-format="yyyy-MM-dd"
					@change="initFirstPageData"
				>
                </el-date-picker>
                -
                <el-date-picker
                    size="small"
                    v-model="endDate"
                    style="width: 150px;"
                    type="date"
                    placeholder="选择截止日期"
                    :picker-options="startDateAfter"
					format="yyyy-MM-dd"
					value-format="yyyy-MM-dd"
                    @change="initFirstPageData"
                >
                </el-date-picker>
            </div>
            <el-col :span="24" class="stallTabs radioGreen">
                <el-radio-group v-model="statusRadio" @change="initloadData" size="small">
                    <el-radio-button label="0">待签收</el-radio-button>
                    <el-radio-button label="2">部分签收</el-radio-button>
                    <el-radio-button label="1">已签收</el-radio-button>
                </el-radio-group>
            </el-col>
            <el-table
                class="stallTable"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="采购编号">
                    <template scope="scope">
                        <div class="flex2 tableFirst">
                            <p>{{scope.row.orderNo}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="otherSideCompanyName"
                    label="供应商">
                </el-table-column>
                <el-table-column
                    prop="createUserName"
                    label="采购员">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    :formatter="formatStatus">
                </el-table-column>
                <el-table-column
                    prop="orderNum"
                    label="采购数量">
                </el-table-column>
                <el-table-column
                    prop="totalStockFee"
                    label="采购总成本/元"
                    :formatter="formatStockFee">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    width="180"
                    label="创建时间"
                    :formatter="mydateFormat">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template scope="scope">
                        <div class="tableFoot">
                            <router-link :to='{path:"/stallProcurementStorage",query:{param:scope.row.storeOrderId}}' class="blue2">查看</router-link>
                            <router-link :to='{path:"/stallProcurementStorage"}' class="blue2">{{scope.row.flowStatus ==2?'签收':''}}</router-link>
                            <a href="javascript:void(0)" v-if="scope.row.status == 0" class="blue2" @click="deleteStockOrder(scope.row.storeOrderId)">删除</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryStockOrderForPurchase,delStockOrder,findUserByKeyword,querySupplier} from '@/api/getData'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {mydateFormat} from '../utils/dataFormater.js'
	import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
	import {export_json_to_excel} from '../vendor/Export2Excel.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                statusRadio:0,
                input:'',
                startDate:'',
                endDate:'',
                purchaseUserName:'',//采购员
                q_supplierName:'',
                q_supplierId:'',
                optionsCreateUser:[],
                loading:false,
                q_createUserName:'',
                q_createUserId:'',
                supplierFlag:true,//若为false,则查询列表为空
                input2:'',
                tableData:[],
                stockOrder:{

                    "details": []
                },
                pageSize:10,
                highlightId: -1,
                currentPage: 1,
                start: 1,
                totalCount: 0,
                initParam :{
                    companyId:userInfo().companyId,
                    warehouseId:userInfo().warehouseId,
                    orderType:'0',
                    pageIndex:1,
                    pageSize:10
                },
				startDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.endDate;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                startDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.startDate;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
            }
        },
        watch:{
        	'$route':function (route) {
        		this.statusRadio=0;
        		this.initFirstPageData();
        	}
        },
        mounted(){
            this.initFirstPageData();
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.initFirstPageData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.initQuerySupplierData()
            },

            initFirstPageData(){
            	this.currentPage = 1;
            	this.initQuerySupplierData();
            },
            async initQuerySupplierData(){
            	this.q_supplierId = '';
            	if(this.q_supplierName.trim() != ''){
            		//查询供应商信息
            		let params = {
            			param:{
            				name:this.q_supplierName.trim(),
            				companyId:userInfo().companyId
            			},
            			pageSize:1,
            			pageIndex:1
            		}
            		const res = await querySupplier(params);
	                if (res.isSuccess == true) {
	                    if(res.result.results.length == 1){
	                    	this.q_supplierId = res.result.results[0].id;
	                    	this.initloadData();
	                    }else{
	                    	this.initQueryFaildData();
	                    }
	                }else{
	                   this.initQueryFaildData();
	                }
            	}else{
            		this.initloadData();
            	}
            },
            initQueryFaildData(){
            	this.tableData = [];
	            this.totalCount = 0;
            },
            handleCreateUserSelect(){
            	this.initFirstPageData();
            },
            async initloadData() {
            	let q_startDate = '';
            	let q_endDate = '';
            	if(this.startDate != ''){
            		q_startDate = formatDate(new Date(this.startDate),'yyyy-MM-dd')
            	}
            	if(this.endDate != ''){
            		q_endDate = formatDate(new Date(this.endDate),'yyyy-MM-dd')
            	}
            	let param = {
            		companyId:userInfo().companyId,
                    warehouseId:userInfo().warehouseId,
                    status:this.statusRadio,
                    orderType:'0',
                    startDate:q_startDate,
                    endDate:q_endDate,
                    otherSideCompanyId:this.q_supplierId,
                    createUserId:this.q_createUserId,
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize
            	}
                const res = await queryStockOrderForPurchase(param);
                if (res.isSuccess == true) {
                    this.tableData = res.result.results;
                    this.totalCount = res.result.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            //页码变更
            handleCurrentChange: function(val) {
                this.currentPage = val;
                this.initloadData();
            },

            async deleteStockOrder(stockOrderId){
            	if(stockOrderId == "" || stockOrderId == undefined){
            		this.$message({
                        type: 'error',
                        message: '参数异常！'
                    });
            		return;
            	}
            	this.$confirm('是否确认删除该数据?', '提示', {
	                confirmButtonText: '确定',
	                cancelButtonText: '取消',
	                type: 'warning'
	              }).then(() => {
	                this.delete(stockOrderId)
	              }).catch(() => {

	              });

            },

            async delete(stockOrderId){
            	let param = {
            		stockOrderId:stockOrderId
            	}
            	const res = await delStockOrder(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.initloadData(this.initParam);
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            formatStatus:function(row, column){
            	if(row.status == null){
            		return '';
            	}else if(row.status == 1){
            		return "已签收";
            	}else if(row.status == 2){
            		return "部分签收";
            	}else if(row.status == 0){
            		return "待签收";
            	}
            },
            mydateFormat,

            formatStockFee:function(row, column){
            	let num = new Number(row.totalStockFee);
            	return num.toFixed(2);
            },
            
            async exportData(){
            	let param = {
            		companyId:userInfo().companyId,
                    warehouseId:userInfo().warehouseId,
                    status:this.statusRadio,
                    orderType:'0',
                    pageIndex:1,
                    pageSize:this.totalCount
            	}
                const res = await queryStockOrderForPurchase(param);
                if (res.isSuccess == true) {
                	const tHeader = ['采购编号', '供应商','采购员','状态','采购数量','采购总成本/元','创建时间'];
			　　　    const filterVal = ['orderNo', 'otherSideCompanyName','createUserName','status','orderNum','totalStockFee','createTime'];
			　　　    const list = [];
                    res.result.results.forEach(obj => {
                    	let status = '';
	                	if(obj.status == 1){
		            		status = "已签收";
		            	}else if(obj.status == 2){
		            		status = "部分签收";
		            	}else if(obj.status == 0){
		            		status = "待签收";
		            	}
		            	let totalStockFee = new Number(obj.totalStockFee);
            			totalStockFee = totalStockFee.toFixed(2);
            			let createTime = '';
						let row = {
							orderNo:obj.orderNo,
							otherSideCompanyName:obj.otherSideCompanyName,
							createUserName:obj.createUserName,
							status:status,
							orderNum:obj.orderNum,
							totalStockFee:totalStockFee,
							createTime:formatDate(new Date(obj.createTime),'yyyy-MM-dd hh:mm'),
						}
						list.push(row);
					});
					const data = this.formatJson(filterVal, list);
			　　　   export_json_to_excel(tHeader, data, '采购入库数据');
                }
          },
          
          formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]));
		　　　},
		  
		  //远程搜索模糊查询公司信息
            async remoteMethod(query){
                if(query!=''){
                    this.loading = true;
					this.optionsCreateUser = [];
                    let userParams = {
                		keyword:query.trim(),
                		pageSize:10,
                		pageIndex:1
                	}
            		const res2 = await findUserByKeyword(userParams);
                	if (res2.isSuccess == true) {
                		this.optionsCreateUser = res2.result.userlist;
                	}
                    setTimeout(() => {
                        this.loading = false;
                    }, 200);
                } else {
                	this.q_createUserId = '';
                    this.optionsCreateUser = [];
                }
            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stallProcurement';
    
    .input-width {
    	width: 150px;
    }
</style>
