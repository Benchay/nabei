<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('webStoreOrderSalesBuy')">
                <router-link :to='{path:"/webStoreOrderSalesBuy"}'>网店订单</router-link>
            </li>
            <li v-if="getMenuAuthFun('purchaseRequireBuy')">
                <router-link :to='{path:"/purchaseRequireBuy"}'>采购需求</router-link>
            </li>
            <li class="menuIndex2" v-if="getMenuAuthFun('orderPurchaseBuy')">
                <router-link :to='{path:"/orderPurchaseBuy"}'>采购订单</router-link>
            </li>
            <!-- <li v-if="getMenuAuthFun('addShop')">
                <router-link :to='{path:"/addShop"}'>绑定店铺</router-link>
            </li> -->
            <li v-if="getMenuAuthFun('packageDetails')">
                <router-link :to='{path:"/packageDetails"}'>包裹管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('salesForecast')">
                <router-link :to='{path:"/salesForecast"}'>采购统计</router-link>
            </li>
        </ul>
        <div class="sellerSettlement">
            <router-link :to='{path:"/orderPurchaseBuyDetails"}' class="right comeBack2">返回</router-link>
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
                    <el-col :span="6">订单总欠款金额：{{this.orderVo.totalFee!=undefined&&this.orderVo.totalFee!=''?Number(this.orderVo.totalFee).toFixed(2):'0.00'}}</el-col>
                    <el-col :span="6">已结金额：{{this.orderVo.closeFee!=undefined&&this.orderVo.closeFee!=''?Number(this.orderVo.closeFee).toFixed(2):'0.00'}}</el-col>
                    <el-col :span="6" class="colorText">待结金额：{{this.orderVo.closeFee==undefined?Number(this.orderVo.totalFee):Number(this.orderVo.totalFee*1 - this.orderVo.closeFee*1).toFixed(2)}}</el-col>
                    <!--已结算状态 无此按钮-->
                    <el-button  class="buttonColor3" v-if="this.orderVo.closeStutas==0||this.orderVo.closeStutas==2" @click="quickSettlement">立即付款</el-button>

               </el-col>
            </div>
            <div class="detailsTable">
                <p class="tableTop">付款记录：</p>
                <el-table
                    :data="tableData6"
                    style="width: 100%">
                    <!--<el-table-column-->
                        <!--label="订单编号"-->
                        <!--width="240">-->
                        <!--<template scope="scope">-->
                            <!--<p>{{orderCode}}</p>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="createTime"
                        :formatter="mydateFormat"
                        label="结算时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="orderFee"
                        label="本次结算金额（￥）">
                        <template scope="scope">{{scope.row.orderFee!=undefined&&scope.row.orderFee!=''?Number(scope.row.orderFee).toFixed(2):'0.00'}}</template>
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="结算类型">
                        <template scope="scope">{{scope.row.type=='1'?'单订单结算':scope.row.type=='2'?'多订单结算':''}}</template>
                    </el-table-column>
                    <el-table-column
                        prop="sellementFee"
                        label="实际付款金额（￥）">
                        <template scope="scope">{{scope.row.sellementFee!=undefined&&scope.row.sellementFee!=''?Number(scope.row.sellementFee).toFixed(2):'0.00'}}</template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template scope="scope">
                            <router-link :to='{path:"/SettlementRecordsdetail",query:{backPath:"/orderFinancial",otherSideCompanyId:orderVo.busiCompId,settlementOrderId:scope.row.settlementOrderId}}' class="red">查看详情</router-link>
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
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    import {setStore, getStore} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {querySettlementDetail,querySettlementDay,getOrder} from '@/api/getData'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                roleForm: {
                    userId: '',
                    roleId: '',
                    compId:''
                },
                info:[{
                    state:1,
                    date:'1号',
                }],
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
            }
        },
        watch:{
            '$router':function(router){
                if(route.path=='/orderFinancial'){
                    this.queryOrderInfo();
                    this.initSettleDay();
                }
                this.orderId = this.$route.query.orderId;
                this.orderCode = this.$route.query.orderCode;
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
                        var date = '';
                        if(settlementDay!=undefined&&settlementDay!=''){
                            if(settlementDay.settlementType==1){
                                var day = settlementDay.settlementDay;
                                if(day==1){
                                    date = '周一';
                                }else if(day==2){
                                    date = '周二';
                                }else if(day==3){
                                    date = '周三';
                                }else if(day==4){
                                    date = '周四';
                                }else if(day==5){
                                    date = '周五';
                                }else if(day==6){
                                    date = '周六';
                                }else if(day==7){
                                    date = '周日';
                                }
                            }else if(settlementDay.settlementType==2){
                                date = settlementDay.settlementDay + '号';
                            }
                            let p = {
                                state:settlementDay.settlementType,
                                date:date,
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

            async initSettleDay(){
                this.tableData6 = [];
                let param = {
                "orderId":this.orderId,
                 "pageSize": this.pagesize,
                 "pageIndex": this.currentPage,
                };

                const res = await querySettlementDetail(param);
                if (res.isSuccess == true){

                    this.tableData6 = [];
                    var table = res.result.results;
                    for(var i = 0;i<table.length;i++){
                        var currFee = 0;
                        if(i>0){
                            for(var j=0;j<i;j++){
                                currFee = Number(currFee) + table[j].sellementFee;
                            }
                        }else{
                            currFee = 0;
                        }
                        let par = {
                            createTime:table[i].createTime,
                            type:table[i].settlementType,
                            orderFee:Number(table[i].orderFee)- Number(currFee),
                            sellementFee:table[i].sellementFee,
                            settlementOrderId:table[i].settlementOrderId
                        };
                        this.tableData6.push(par);
                    }
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
