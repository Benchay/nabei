<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('warehouseManagement')">
                <router-link :to='{path:"/warehouseManagement"}'>仓库管理</router-link>
            </li>
            <li class="menuIndex3" v-if="getMenuAuthFun('stockTakingManagement')">
                <router-link :to='{path:"/stockTakingManagement"}'>库存盘点单</router-link>
            </li>
            <li v-if="getMenuAuthFun('stockAllotManagement')">
                <router-link :to='{path:"/stockAllotManagement"}'>库存调拨单</router-link>
            </li>
            <li v-if="getMenuAuthFun('checkDiffManagement')">
                <router-link :to='{path:"/checkDiffManagement"}'>库存差异单</router-link>
            </li>
        </ul>
        <div class="stockAllotDetails">
            <div class="right" style="margin-bottom: 20px;"><router-link class="back" :to='{path:"/stockTakingManagement"}'>返回</router-link></div>
            <div class="detailsTop">
                <el-col :span="24" >
                    <el-col :span="8" >档口名称：{{this.stallName}}</el-col>
                </el-col>
                <el-col :span="24" >
                    <el-col :span="8" >盘点编号：{{this.storeOrderId}}</el-col>
                </el-col>
                <el-col :span="24" >
                    <el-col :span="8" >盘点时间：{{this.createTime}}</el-col>
                </el-col>
                <el-col :span="24" >
                    <el-col :span="8" >盘点人：{{this.name}}</el-col>
                </el-col>
            </div>
            <div class="fastTable">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="productCode"
                        label="商品货号">
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
                        prop="stockNum"
                        label="库存数">
                    </el-table-column>
                    <el-table-column
                        prop="checkActualNum"
                        label="盘点数量">
                    </el-table-column>
                    <el-table-column
                        prop="diffNum"
                        label="盈亏数量">
                    </el-table-column>
                    <el-table-column
                        prop="diffFee"
                        label="盈亏金额">
                    </el-table-column>
                    <el-table-column
                        prop="memo"
                        label="备注">
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
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
            <a href="javascript:void(0)" class="export_excle">导出excel</a>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryStockTakingDetails} from '@/api/getData'
    import {formatDate} from '../utils/date.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                storeOrderId:'',
                stallName:'',
                createTime:'',
                name:'',
                orderTable:[],
                tableData: [],
                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,
                //每页显示的总条数
                pageSize:8,
                //默认数据总数
                totalCount: 0,
            }
        },
        mounted(){
            this.storeOrderId = this.$route.query.param;
            this.stallName = this.$route.query.stallName;
            this.createTime = this.$route.query.createTime;
            this.name = this.$route.query.name;
            let param = {
                "storeOrderId":this.storeOrderId,
                "pageIndex":this.currentPage,
                "pageSize":this.pageSize
            };
            this.loadData(param);
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
            async loadData(param){
                const data = await queryStockTakingDetails(param);
                if(data.isSuccess){
                    this.tableData = data.result.data;
                    this.totalCount = data.result.totalCount;
                }
            },
            handleCurrentChange:function(val) {
                this.currentPage = val;
                let param = {
                    "storeOrderId":this.storeOrderId,
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize
                };
                this.loadData(param);
            },
            //数据格式化
            formatDate:function(row, column) {
                let data = row[column.property];
                if (data == undefined||data=='') {
                    return "";
                }
                var date2 = new Date(data);
                return formatDate(date2,'yyyy-MM-dd hh:mm:ss');
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stockTakingDetails';
</style>
