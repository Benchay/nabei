<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('bindWebstoreForPlatform')">
                <router-link :to='{path:"/bindWebstoreForPlatform"}'>绑定店铺管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('webStoreOrderForPlatform')">
                <router-link :to='{path:"/webStoreOrderForPlatform"}'>网店订单</router-link>
            </li>
            <li v-if="getMenuAuthFun('orderForPlatform')">
                <router-link :to='{path:"/orderForPlatform"}'>采购订单</router-link>
            </li>
            <li v-if="getMenuAuthFun('productManagement')">
                <router-link :to='{path:"/productManagement"}'>商品管理</router-link>
            </li> 
            <li class="menuIndex3" v-if="getMenuAuthFun('reportquery')">
                <router-link :to='{path:"/reportquery"}'>报表查询</router-link>
            </li>
        </ul>
        <div class="reportquerycontent">
        <el-row>    
         <el-col :span="24" style="margin-bottom: 20px;">
            <el-radio-group v-model="radio">
                <el-radio-button :label="item.label" v-for="item in tableList">{{item.value}}</el-radio-button>
            </el-radio-group>
        </el-col>
        </el-row>
        <div style="overflow: hidden;">
              <div class="block left" style="margin-right: 10px; padding-left: 15px;">
                <span style="font-size: 14px;">操作时间：</span>
                <el-date-picker
                size="small"
                v-model="filters.date.startDate"
                type="date"
                placeholder="选择开始日期"
                value-format="yyyy-MM-dd-HH-mm-ss"
                :picker-options="startDateBefore"
                >
                </el-date-picker>
                -
                <el-date-picker
                    size="small"
                    v-model="filters.date.endDate"
                    type="date"
                    placeholder="选择截止日期"
                    :picker-options="startDateAfter"
                    value-format="yyyy-MM-dd-HH-mm-ss"
                    @change="handleIconClickDate"
                >
                </el-date-picker>
                </div>
                <div class="block left">
                     <el-input
                        placeholder="选择卖家"
                        icon="search"
                        size="small"
                        v-model="stallName"
                        :on-icon-click="handleIconClick">
                    </el-input>
                </div>
            </div>
            <div class="tablewrap">
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="卖家名称">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="已拿商品总数">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="入库包裹数">
                  </el-table-column>
                  <el-table-column
                    prop="adddddress"
                    label="已拿包裹数">
                  </el-table-column>
                </el-table>
            </div>
        </div>  
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {findCompanysByName} from '@/api/getData'
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
                rotate:false,
                bindWebStoreUrl:'www.bai',
                tableData: [

                ],
                radio:0,
                tableList:[
                    {
                        value:'卖家拿货统计',
                        label:0
                    },
                    {
                        value:'表二',
                        label:1,
                    },
                    {
                        value:'表三',
                        label:2,
                    },
                     {
                        value:'表四',
                        label:3,
                    },
                    {
                        value:'表五',
                        label:4,
                    },
                    {
                        value:'表六',
                        label:5,
                    }
                ],
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

                searchOrderId:'',
                                searchBuyerNick:'',
                                searchSeller:'',
                                searchStatus:''
            }
        },
        async mounted(){
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
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },

            async initloadData() {
                /*let param ={
                        pageIndex:1,
                        pageSize:this.pagesize,
                        orderCode:this.searchOrderId,
                        buyerNick:this.searchBuyerNick,
                        sellerNick:this.searchSeller,
                        status:this.searchStatus
                }
                this.tableData3 = [];
                const res = await queryRecordByParams(param);
                if (res.isSuccess == true) {
                    this.tableData3 = res.result.data.results;
                    this.totalCount = res.result.data.totalCount;
                    for(let i=0;i<this.tableData3.length;i++){
                        let data1 = this.tableData3[i];
                        if(data1.status){
                                data1.statusShow = this.formatOrderStatus(data1.status);
                        }
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }*/
            },

            async initloadData2() {
                /*let param ={
                        pageIndex:this.currentPage,
                        pageSize:this.pagesize,
                        orderCode:this.searchOrderId,
                        buyerNick:this.searchBuyerNick,
                        sellerNick:this.searchSeller,
                        status:this.searchStatus
                }
                this.tableData3 = [];
                const res = await queryRecordByParams(param);
                if (res.isSuccess == true) {
                    this.tableData3 = res.result.data.results;
                    for(let i=0;i<this.tableData3.length;i++){
                        let data1 = this.tableData3[i];
                        if(data1.status){
                                data1.statusShow = this.formatOrderStatus(data1.status);
                        }
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }*/
            },
            gotobindwebstore(){
                window.open(this.bindWebStoreUrl);
            },
            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },
            async handleCurrentChange(val){
                this.currentPage = val;
                this.initloadData2();
            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    .reportquerycontent{
        height: 100%;
        margin: 0 30px;
        background: #fff;
        padding: 20px;
        .tablewrap{
            margin-top: 25px;
        }
        .el-table th > .cell{
            text-align: center;
        }
    }
</style>
