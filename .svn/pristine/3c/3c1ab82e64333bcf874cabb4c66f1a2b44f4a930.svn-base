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
        <div class="stockTakingManagement">
            <div class="stocktakingTop">
                <div class="left" >
                    <el-date-picker
                        size="small"
                        v-model="filters.date.startDate"
                        type="date"
                        placeholder="选择开始日期"
                        :picker-options="startDateBefore"
                        @change="handleDate"
                    >
                    </el-date-picker>
                    -
                    <el-date-picker
                        size="small"
                        v-model="filters.date.endDate"
                        type="date"
                        placeholder="选择截止日期"
                        :picker-options="startDateAfter"
                        @change="handleDate"
                    >
                    </el-date-picker>
                </div>
                <div class="left flex input2">
                    <el-input
                        placeholder="盘点编号搜索"
                        size="small"
                        icon="search"
                        v-model="input1"
                        class="width2"
                        :on-icon-click="orderIdClick">
                    </el-input>
                    <el-input
                        placeholder="档口名称搜索"
                        size="small"
                        icon="search"
                        v-model="input2"
                        class="width2"
                        :on-icon-click="stallNameClick">
                    </el-input>
                    <el-select class="width2" v-model="input3" placeholder="请选择盘点状态" @change="selectChange" size="small">
                        <el-option
                            v-for="item in states"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="stocktakingTable">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="storeOrderId"
                        label="盘点编号">
                    </el-table-column>
                    <el-table-column
                        prop="stallName"
                        label="档口名称">
                    </el-table-column>
                    <el-table-column
                        prop="diffNum"
                        label="盈亏数">
                    </el-table-column>
                    <el-table-column
                        prop="diffFee"
                        label="盈亏金额">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="盘点状态"
                        :formatter="formatStatus">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template scope="scope">
                            <router-link :to='{path:"/stockTakingDetails",query:{param:scope.row.storeOrderId,stallName:scope.row.stallName,createTime:scope.row.createTime,name:scope.row.name}}' class="blue2">查看详情</router-link>
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
    import {queryStockTakingInfo} from '@/api/getData'
    import {formatDate} from '../utils/date.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                filters:{
                    date:{
                        startDate:'',
                        endDate:''
                    }
                },
                startDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.filters.date.endDate;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                startDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.filters.date.startDate;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
                input1:'',
                input2:'',
                input3:'',
                states:[
                    {
                        "label":"未审核",
                        "value":0
                    },{
                        "label":"审核成功",
                        "value":1
                    },{
                        "label":"审核拒绝",
                        "value":2
                    }
                ],
                stallName:'',
                tableData: [],
                //默认每页数据量
                pageSize: 8,
                //默认高亮行数据id
                highlightId: -1,
                //当前页码
                currentPage: 1,
                //查询的页码
                start: 1,
                //默认数据总数
                totalCount: 0,
            }
        },
        mounted(){
            let param = {
                "start":'',
                "end":'',
                "storeOrderId":'',
                "stallName":'',
                "status":'',
                "pageIndex":this.currentPage,
                "pageSize":this.pageSize
            }
            this.initloadData(param);
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
            handleDate(){
                let param = {
                    "start":this.filters.date.startDate,
                    "end":this.filters.date.endDate,
                    "storeOrderId":'',
                    "stallName":'',
                    "status":'',
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize
                }
                this.initloadData(param);
            },
            orderIdClick(){
                let param = {
                    "start":'',
                    "end":'',
                    "storeOrderId":this.input1,
                    "stallName":'',
                    "status":'',
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize
                }
                this.initloadData(param);
            },
            stallNameClick(){
                let param = {
                    "start":'',
                    "end":'',
                    "storeOrderId":'',
                    "stallName":this.input2,
                    "status":'',
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize
                }
                this.initloadData(param);
            },
            selectChange(){
                let param = {
                    "start":'',
                    "end":'',
                    "storeOrderId":'',
                    "stallName":'',
                    "status":this.input3,
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize
                }
                this.initloadData(param);
            },
            async initloadData(param){
                const res = await queryStockTakingInfo(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message:'数据加载成功!'
                    });
                    this.tableData = res.result.data;
                    this.totalCount = res.result.totalCount
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
                let param = {
                    "start":this.filters.date.startDate,
                    "end":this.filters.date.endDate,
                    "storeOrderId":this.input1,
                    "stallName":this.input2,
                    "status":this.input3,
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize
                }
                this.initloadData(param);
            },
            //数据格式化
            formatStatus:function(row, column) {
                let data = row[column.property];
                if (data == undefined||data=='') {
                    return "";
                }
                if(data==0){
                    return "未审核";
                }else if(data==1){
                    return "审核成功";
                }else if(data==2){
                    return "审核拒绝";
                }
                return formatDate(date2,'yyyy-MM');
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stockTakingManagement';
</style>
