<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('bindWebstoreForPlatform')">
                <router-link :to='{path:"/bindWebstoreForPlatform"}'>绑定店铺管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('webStoreOrderForPlatform')">
                <router-link :to='{path:"/webStoreOrderForPlatform"}'>网店订单</router-link>
            </li>
            <li class="menuIndex3" v-if="getMenuAuthFun('orderForPlatform')">
                <router-link :to='{path:"/orderForPlatform"}'>采购订单</router-link>
            </li>
            <li v-if="getMenuAuthFun('productManagement')">
                <router-link :to='{path:"/productManagement"}'>商品管理</router-link>
            </li>
        </ul>
        <div class="verify-menu-search" style="padding-top: 50px;">
        	<div class="block left">
                                      订单编号:{{orderCode}}
           </div>
           <div class="block left" style="margin-left: 25px;">
                                      电商卖家:{{companyName}}
           </div>
           <div class="block left" style="margin-left: 25px;">
                                      档口名称:{{stallName}}
           </div>
           <div class="block left" style="margin-left: 25px;">
                                      采购总数:{{totalNum}}
           </div>
           <div class="block left" style="margin-left: 25px;">
                                      采购总金额:{{totalFee}}
           </div>
        </div>
        <div class="addShop" v-show="tableData3.length>0" style="padding-top: 5px;">
            <div class="shopList" style="padding-bottom: 80px;">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        prop="productCode"
                        label="商品货号"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="color"
                        label="颜色"
                        width="250"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="规格"
                        width="240"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="orderNum"
                        label="采购数量"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="单价"
                        width="200">
                    </el-table-column>
                </el-table>
                <el-pagination
                    small
                    class="right"
                    style="margin-top: 20px;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryOrderDetail} from '@/api/getData'
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
                rotate:false,
                bindWebStoreUrl:'www.bai',
                tableData3: [{companyName:''}],
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

                orderId:'',

                orderCode:'',//订单号

                companyName:'',//电商卖家

                stallName:'',

                totalNum:'',

                totalFee:'',

                searchOrderStartDate:'',
                searchOrderEndDate:'',
                searchCompanyName:'',
                searchOrderId:'',
				searchStallName:'',
				searchOrderStatus:'',
            }
        },
        watch:{
            '$route':function (route) {
                this.orderId = this.$route.query.orderId;
	         	this.orderCode = this.$route.query.orderCode;
	         	this.companyName = this.$route.query.companyName;
	         	this.stallName = this.$route.query.stallName;
	         	this.totalNum = this.$route.query.totalNum;
	         	this.totalFee = this.$route.query.totalFee;
	            this.initloadData();
            }
        },
         mounted(){
         	this.orderId = this.$route.query.orderId;
         	this.orderCode = this.$route.query.orderCode;
         	this.companyName = this.$route.query.companyName;
         	this.stallName = this.$route.query.stallName;
         	this.totalNum = this.$route.query.totalNum;
         	this.totalFee = this.$route.query.totalFee;
            this.initloadData();
        },

        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            async initloadData() {
            	let status = '';
            	if(this.searchOrderStatus != '' && this.searchOrderStatus != 'null'){
            		status = this.searchOrderStatus;
            	}
            	let param ={
            		pageIndex:1,
            		pageSize:this.pagesize,
            		orderId:this.orderId
            	}
            	this.tableData3 = [];
                const res = await queryOrderDetail(param);
                if (res.isSuccess == true) {
                    this.tableData3 = res.result.data.results;
                    this.totalCount = res.result.data.totalCount;
                    for(let i=0;i<this.tableData3.length;i++){
                    	let data1 = this.tableData3[i];
                    	if(data1.status){
                    		data1.statusShow = this.formatOrderStatus(data1.status);
                    	}
                    }
                    this.checkCompany();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            async initloadData2() {
            	let param ={
            		pageIndex:this.currentPage,
            		pageSize:this.pagesize,
            		orderCode:this.searchOrderId,
            		stallNameL:this.searchStallName,
            		orderStartTime:this.searchOrderStartDate,
            		orderEndTime:this.searchOrderEndDate,
            		status:status,
            		orderTypeIn:[1]
            	}
                this.tableData3 = [];
                const res = await queryOrder(param);
                if (res.isSuccess == true) {
                    this.tableData3 = res.result.data.results;
                    for(let i=0;i<this.tableData3.length;i++){
                    	let data1 = this.tableData3[i];
                    	if(data1.status){
                    		data1.statusShow = this.formatOrderStatus(data1.status);
                    	}
                    }
                    this.checkCompany();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

           async checkCompany(){
           		let companyIds = [];
                for(let i=0;i<this.tableData3.length;i++){
                	if(this.tableData3[i].companyId){
                		companyIds.push(this.tableData3[i].companyId);
                	}
                }
                let params = {
            		compIds : companyIds
            	}
                const res = await queryPurchaserInfo(params);
            	if (res.isSuccess == true) {
            		this.companyData = res.result.result;
            		for(let i=0;i<this.tableData3.length;i++){
	        			for(let j=0;j<this.companyData.length;j++){
	        				let data2 = this.companyData[j];
	        				if(data2.id == this.tableData3[i].companyId){
	        					this.tableData3[i].companyId = data2.name;
	        				}
	        			}
	                }
            	}else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            gotobindwebstore(){
            	window.open(this.bindWebStoreUrl);
            },
            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },

            handleCurrentChange:function(val) {
                this.currentPage = val;
                this.initParamsData2();
            },
            mydateFormat,
            formatOrderStatus:function(status){
            	if(status == 0){
            		return "";
            	}else if(status == 1){
            		return "待配货";
            	}else if(status == 2){
            		return "待拿货";
            	}else if(status == 3){
            		return "";
            	}else if(status == 4){
            		return "已完成";
            	}else{
            		return "";
            	}
            },
            mydateFormat,
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/addShop';
</style>
