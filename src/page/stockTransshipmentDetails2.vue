<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('currentInventory')">
                <router-link :to='{path:"/currentInventory"}'>当前库存</router-link>
            </li>
            <li v-if="getMenuAuthFun('inventoryDetail')">
                <router-link :to='{path:"/inventoryDetail"}'>库存变动</router-link>
            </li>
            <li v-if="getMenuAuthFun('stocktaking')">
                <router-link :to='{path:"/stocktaking"}'>库存盘点</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('stockTransshipment')">
                <router-link :to='{path:"/stockTransshipment"}'>库存调拨</router-link>
            </li>
            <li v-if="getMenuAuthFun('inventoryWarning')">
                <router-link :to='{path:"/inventoryWarning"}'>库存预警</router-link>
            </li>
            <li v-if="getMenuAuthFun('storeManagement')">
                <router-link :to='{path:"/storeManagement"}'>多仓管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('inventoryInitialize')">
                <router-link :to='{path:"/inventoryInitialize"}'>库存初始化</router-link>
            </li>
        </ul>
        <div class="stocktaking">
            <div class="stocktakingTop">
                <!--调入库状态 显示-->
                <div class="left signIn" v-if="tableData.status==0&&userInfo().warehouseId==tableData.allocateWarehouseId">
                    <a href="javascript:void(0)" class="buttonColor" @click="signIn(tableData.id)">立即签收</a>
                </div>
                <!---->
                <div class="right">
                    <router-link :to='{path:"/stockTransshipment"}' class="comeBack">返回</router-link>
                </div>
            </div>
            <div class="stocktakingTable">
                <div class="tableTop flex" style="justify-content: space-between">
                    <div class="flex">
                        <div>调拨编号：{{tableData.orderNo}}</div>
                        <div>调拨时间：{{formatDate(tableData.createTime,'yyyy-MM-dd hh:mm')}}</div>
                        <div>调拨人：{{tableData.createUserName}}</div>
                    </div>
                    <div class="blue2">{{tableData.status==0?'待签收':tableData.status==1?'已签收':''}}</div>
                </div>
                <el-table
                    :data="tableData.details"
                    max-height="450"
                    style="width: 100%">
                    <el-table-column
                        label="主图/货号">
                        <template scope="scope">
                            <div class="flex" style="padding: 3px;">
                            	<img v-if="scope.row.imgUrl_main != ''" :src="scope.row.imgUrl_main" alt="">
                                <img v-else src="../image/product_default.png" alt="">
                                <p>{{scope.row.productCode}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="商品名称">
                    </el-table-column>
                    <el-table-column
                        prop="colour"
                        label="颜色">
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="尺码">
                    </el-table-column>
                    <el-table-column
                        label="数量">
                        <template scope="scope">
                            {{userInfo().warehouseId==tableData.warehouseId?scope.row.orderNum:-scope.row.orderNum}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchasePrice"
                        label="单价">
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
                :page-size="pagesize"
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
    import {loadStockOrder,auditStockOrder} from '@/api/getData'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
	import {formatDate} from '../utils/date.js'
	import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
	import {export_json_to_excel} from '../vendor/Export2Excel.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                value6: '',
                tableData: {},
                currentPage:1,
                pagesize:10,
                totalCount:0,
            }
        },
        watch: {
            '$route': function (route) {
                if(route.path=='/stockTransshipmentDetails2'){
                    this.param = this.$route.query.param;
                    this.loadData(this.param);
                }

            }
        },
        mounted(){
                this.param = this.$route.query.param;
                this.loadData(this.param);
        },
        methods: {
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.loadData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.loadData();
            },
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleIconClick(ev) {
                console.log(ev);
            },
            async loadData(param) {
                //  /api/queryStockOrderDetail?companyId=1000&warehouseId=W001&orderType=2,3&pageIndex=1&pageSize=10
                let  requestParam = {
                    "stockOrderId":param,
                    "pageIndex":this.currentPage,
                    "pageSize":this.pagesize
                };
                const res = await loadStockOrder(requestParam);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '加载数据成功'
                    });
                    this.tableData = res.result;
                    this.totalCount = res.result.totalCount;
                    this.state= res.result.checkedStatus;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async  signIn(stockOrderId){
                this.$confirm('确认签收吗？')
                    .then(_ => {
                        this.auditStockOrder(stockOrderId);
                    })
                    .catch(_ => {});
            },

            async auditStockOrder(stockOrderId){
                let  requestParam = {
                    "stockOrderId":stockOrderId,
                    "auditFlag":1
                };
                const res = await auditStockOrder(requestParam);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '签收成功!'
                    });
                    this.param = this.$route.query.param;
                    this.loadData(this.param);
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            
            //导出文档
			async exportData() {
			   let  requestParam = {
                    "stockOrderId":this.param
                };
                const res = await loadStockOrder(requestParam);
                if (res.isSuccess == true) {
                	const list = res.result.details;
                    const tHeader = ['商品货号', '商品名称','颜色','尺码','数量','单价'];
			　　　　const filterVal = ['productCode', 'title','colour','size','orderNum','purchasePrice'];
			　　　　const data = this.formatJson(filterVal, list);
			　　　　export_json_to_excel(tHeader, data, '库存调拨详情列表');
                }
            },
            
            formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]));
		　　　},
		
            userInfo,
			formatDate
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stocktaking';
</style>
