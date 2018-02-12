<template>
    <div class="fillcontain">
        <ul class="menu">
            <li class="menuIndex3" v-if="getMenuAuthFun('warehouseManagement')">
                <router-link :to='{path:"/warehouseManagement"}'>仓库管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('stockTakingManagement')">
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
            <div class="right" style="margin-bottom: 20px;"><router-link class="back" :to='{path:"/warehouseManagement"}'>返回</router-link></div>
            <div class="fastTable">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <!--<el-table-column-->
                        <!--label="主图/货号">-->
                        <!--<template scope="scope">-->
                            <!--<div class="flex2">-->
                                <!--<img src="../image/111.png" alt="">-->
                                <!--<p>{{scope.row.productCode}}</p>-->
                            <!--</div>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
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
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="stockPrice"
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
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
            <a href="javascript:void(0)" class="export_excle">导出excle</a>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryAllStockDetailInfo} from '@/api/getData'
    import {formatDate} from '../utils/date.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                id:'',
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
            this.id = this.$route.query.param;
            let param = {
                "warehouseId":this.id,
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
                const data = await queryAllStockDetailInfo(param);
                if(data.isSuccess){
                    this.tableData = data.result.data;
                    this.totalCount = data.result.totalCount;
                }
            },
            handleCurrentChange:function(val) {
                this.currentPage = val;
                let param = {
                    "warehouseId":this.id,
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize
                };
                this.loadData(param);
            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/warehouseDetails';
</style>
