<template>
    <div class="fillcontain">
        <ul class="menu">
            <li class="menuIndex2">
                <router-link :to='{path:"/salesReturn"}'>退货管理</router-link>
            </li>
        </ul>
        <div class="sellerSettlement">
            <router-link :to='{path:"/salesReturnDetails",query:{orderId:this.orderId}}' class="right comeBack2">返回</router-link>
            <div class="details">
                <el-col :span="24">
                    <el-col :span="6">档口名称：{{this.orderVo.busiCompanyName}}</el-col>
                    <el-col :span="6">
                        <div  class="flex" v-for="list in info">
                            <p v-bind:class="[list.state==0?'style1':list.state ==1?'style1':list.state ==2?'style2':'']">{{list.state==0?'现结':list.state == 1?'周结':list.state == 2?'月结':''}}</p>
                            <p>{{list.date==undefined?'':list.date}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">状态：{{this.orderVo.closeStutas==0?'未结算':this.orderVo.closeStutas==1?'已结算':this.orderVo.closeStutas==2?'部分结算':''}}</el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6">当前总欠款金额：{{this.orderVo.totalFee}}</el-col>
                    <el-col :span="6">已结金额：{{this.orderVo.closeFee}}</el-col>
                    <el-col :span="6" class="colorText">待结金额：{{this.orderVo.closeFee==undefined?this.orderVo.totalFee:(this.orderVo.totalFee - this.orderVo.closeFee)}}</el-col>
                    <!--已结算状态 无此按钮-->
                    <el-button  class="buttonColor3" v-if="this.orderVo.closeStutas==0||this.orderVo.closeStutas==2" @click="quickSettlement">立即付款</el-button>

                </el-col>
            </div>
            <div class="detailsTable">
                <p class="tableTop">付款记录：</p>
                <el-table
                    :data="tableData6"
                    style="width: 100%">
                    <el-table-column
                        label="订单编号"
                        width="240">
                        <template scope="scope">
                            <p>{{orderCode}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        :formatter="mydateFormat"
                        label="结算时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="orderFee"
                        label="本次结算金额（￥）">
                    </el-table-column>
                    <!--<el-table-column-->
                        <!--prop="type"-->
                        <!--:formatter="typeFormat"-->
                        <!--label="结算方式">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="sellementFee"
                        label="实际付款金额（￥）">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template scope="scope">
                            <router-link :to='{path:"/SettlementRecordsdetail",query:{backPath:"/salesReturnDetailsAccounts",otherSideCompanyId:orderVo.busiCompId,settlementOrderId:scope.row.settlementOrderId}}' class="red">查看详情</router-link>
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
                :page-sizes="[10, 20, 30, 40,50]"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="total,sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
            <div style="height: 200px;">
                &nbsp;
            </div>
        </div>
    </div>
</template>
<script>
    import {setStore, getStore} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {querySettlementDetail,querySettlementDay,getOrder} from '@/api/getData'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
        },
        data() {
            return {
                roleForm: {
                    userId: '',
                    roleId: '',
                    compId:''
                },
                orderCode:'',
                tableData6:[],
                orderId:'',
                orderTime:'',
                stallName:'',
                pagesize:10,
                currentPage:1,
                settleDay:'',
                totalCount:0,
                orderVo:'',
                info:[],
                otherSideCompanyId:'',
                backPath:'',
                settlementOrderId:''
            }
        },
        watch:{
            '$route': function (route) {
                var userInfo = getStore("user_info_user");
                var vjson = JSON.parse(userInfo);
                this.roleForm.userId = vjson.id;
                this.roleForm.userName = vjson.userName;
                var currentComp = getStore("curCompany");
                var vcom = JSON.parse(currentComp);
                this.roleForm.compId = vcom.id;
                this.orderCode = this.$route.query.orderCode;
                this.orderId = this.$route.query.orderId;
                this.queryOrderInfo();
                this.initSettleDay();
            }
        },
        mounted(){
            var userInfo = getStore("user_info_user");
            var vjson = JSON.parse(userInfo);

            this.roleForm.userId = vjson.id;
            this.roleForm.userName = vjson.userName;
            var currentComp = getStore("curCompany");
            var vcom = JSON.parse(currentComp);
            this.roleForm.compId = vcom.id;
            this.orderCode = this.$route.query.orderCode;
            this.orderId = this.$route.query.orderId;
            this.queryOrderInfo();
            this.initSettleDay();
        },
        methods: {
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pagesize = val;
                this.initSettleDay();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.initSettleDay();
            },
            getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },

            //查询订单信息
            async queryOrderInfo(){
                this.info = [];
                let param = {
                    "id":this.orderId,
                    "getOrderId":1
                };
                const res = await getOrder(param);
                if(res.isSuccess){
                    this.orderVo = res.result;
                    //查询结算日期
                    let pa = {
                        params:{"companyId":this.orderVo.busiCompId,"settlementCompanyId":this.roleForm.compId},
                        pageIndex:1,
                        pageSize:1
                    };
                    const settlementres = await querySettlementDay(pa);
                    if(settlementres.isSuccess){
                        var settlementDay = settlementres.result.results[0];
                        if(settlementDay!=undefined&&settlementDay!=''){
                            let p = {
                                state:settlementDay.settlementType,
                                date:settlementDay.settlementDay,
                            };
                            this.info.push(p);
                        }

                    }
                }
            },

            //立即结算
            quickSettlement(){
                this.$router.push({path:"/stallSettlementImmediately",query:{backPath:'/orderFinancial?orderId='+this.orderId,type:22,orderId:this.orderId,otherSideCompanyName:this.orderVo.busiCompanyName,saleCompanyId:this.orderVo.busiCompId}});
            },

            mydateFormat:function(row, column) {
                var time = row[column.property];
                if (time == undefined||time=='') {
                    return "";
                }
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm');
            },
            typeFormat:function(row,column){
                var num = row.type;
                if(num == "1"){
                    return "发起收款 ";
                }else if(num == "2"){
                    return "发起付款";
                }else if(num == "22"){
                    return "被动付款";
                }else if(num == "11"){
                    return "被动收款";
                }
            },
            async initSettleDay(){
                this.tableData6 = [];
                let param = {
                    "orderId":this.orderId,
                    "pageSize": this.pagesize,
                    "pageIndex": this.currentPage,
                };

                const res = await querySettlementDetail(param);
                if (res.isSuccess == true){
                    this.tableData6 = res.result.results;
                    this.totalCount = res.result.totalCount;
                }
            },
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/sellerSettlement';
</style>
