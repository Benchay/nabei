<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('stallManage')">
                <router-link :to='{path:"/stallManage"}'>档口管理</router-link>
            </li>
            <li class="menuIndex2" v-if="getMenuAuthFun('stallSettlement')">
                <router-link :to='{path:"/stallSettlement"}'>档口结算</router-link>
            </li>
            <li v-if="getMenuAuthFun('SettlementRecords')">
                <router-link :to='{path:"/SettlementRecords"}'>结算单</router-link>
            </li>
        </ul>
        <div class="sellerSettlement">
            <!--<router-link :to='{path:"/stallSettlement"}' class="right comeBack2">返回</router-link>-->
            <router-link :to='{path:this.backPath}' class="right comeBack2">返回</router-link>
            <div class="details" >
                <el-col :span="24">
                    <el-col :span="24">档口名称：{{otherSideCompanyName}}</el-col>
                    <el-col :span="6">未结总欠款：{{unClosedFee==undefined||unClosedFee==''?0:unClosedFee}}</el-col>
                    <el-col :span="18">
                        <div  class="flex" v-for="list in info">
                            <p v-bind:class="[list.state==0?'现结':list.state ==1?'style1':list.state ==2?'style2':'']">{{list.state == 0?'现结':list.state == 1?'周结':list.state == 2?'月结':''}}</p>
                            <p>{{list.date}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6" v-if="this.settlementOrderId==undefined||this.settlementOrderId==''">已到期：{{toReviceFee==undefined||toReviceFee==''?0:toReviceFee}}</el-col>
                    <el-col :span="18" v-if="this.settlementOrderId==undefined||this.settlementOrderId==''">未到期：{{this.setUndueFee()}}</el-col>
                </el-col>
            </div>
            <div class="detailsTable">
                <el-table
                    :data="tableData6"
                    @selection-change="handleSelectionChange"
                    @current-change="handleCurrentSelectionChange"
                    max-height="400"
                    >
                    <el-table-column
                        type="selection"
                        :selectable="checkboxInit"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="orderNo"
                        label="订单编号">
                    </el-table-column>
                    <el-table-column
                        prop="closeFee"
                        label="已结金额">
                        <template scope="scope">{{scope.row.closeFee.toFixed(2)}}</template>
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="未结金额">
                        <template scope="scope">
                            <p>{{(scope.row.totalFee-scope.row.closeFee).toFixed(2)}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="hasExpireDays"
                        label="是否到期">
                        <template scope="scope">
                            <p>{{scope.row.hasExpireDays ==0 ?'到期':scope.row.hasExpireDays <0 ?'未到期（剩' + Math.abs(scope.row.hasExpireDays ) + '天）':scope.row.hasExpireDays >0 ?'已逾期（' + scope.row.hasExpireDays + '天）':''}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template scope="scope">
                            <el-button class="red" type="text" @click="queryDetails(scope.row.id,scope.row.orderType)">查看详情</el-button>
                            <!--<router-link :to='{path:"/orderPurchaseBuyDetails",query:{id:scope.row.id}}'  class="red">查看详情</router-link>-->
                        </template>
                    </el-table-column>
                </el-table>
                <!--<el-pagination-->
                <!--small-->
                <!--class="right"-->
                <!--style="margin-top: 20px;"-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="currentPage"-->
                <!--:page-sizes="[10, 20, 30, 40]"-->
                <!--:page-size="pageSize"-->
                <!--layout="total, sizes, prev, pager, next, jumper"-->
                <!--:total="totalCount">-->
            <!--</el-pagination>-->
                <a href="javascript:void(0)" class="buttonColor3" @click="batchSettlement" v-if="this.settlementOrderId==undefined||this.settlementOrderId==''">{{this.type==1?this.label1:this.label2}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getDebtInfo,querySettlementDay} from '@/api/getData'
    import {userInfo} from '../config/mUtils.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                checked:false,
                info:[],
                tableData6:[],
                otherSideCompanyName:'',
                otherSideCompanyId:'',
                unClosedFee:0,
                toReviceFee:0,
                undueFee:0,
                multipleSelection:[],
                orderIds:[],
                settlementOrderId:'',
                type:0,
                label1:'立即付款',
                label2:'立即收款',
                pageSize:10,
                currentPage:1,
                totalCount:0,
                backPath:'',

            }
        },
        watch:{
            '$route': function (route) {
                this.backPath = this.$route.query.backPath;
                this.type = this.$route.query.type;

                this.unClosedFee = this.$route.query.unClosedFee;
                this.unClosedFee = Number(this.unClosedFee).toFixed(2);
                this.toReviceFee = this.$route.query.toReviceFee;
                this.toReviceFee = Number(this.toReviceFee).toFixed(2);

                this.otherSideCompanyId = this.$route.query.otherSideCompanyId;
                this.otherSideCompanyName = this.$route.query.otherSideCompanyName;

                this.querySettlementDay();//查询结算日
                this.loadData();
            }
        },
        mounted(){
            this.backPath = this.$route.query.backPath;
            this.type = this.$route.query.type;
            this.unClosedFee = this.$route.query.unClosedFee;
            this.unClosedFee = Number(this.unClosedFee).toFixed(2);
            this.toReviceFee = this.$route.query.toReviceFee;
            this.toReviceFee = Number(this.toReviceFee).toFixed(2);
            this.otherSideCompanyId = this.$route.query.otherSideCompanyId;
            this.otherSideCompanyName = this.$route.query.otherSideCompanyName;

            this.querySettlementDay();//查询结算日
            this.loadData();

        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleSizeChange(val){
        	    this.pageSize = val;
                this.loadData();
            },

            async querySettlementDay(){
                this.info = [];
                let param = {
                    params:{"companyId":this.otherSideCompanyId,
                        "settlementCompanyId":userInfo().companyId},
                    pageIndex:1,
                    pageSize:1
                };

                const res = await querySettlementDay(param);
                if(res.isSuccess){
                    if(this.info.length==1){
                        return;
                    }
                    var settlementDay = '';
                    if(res.result.results[0].settlementType==1){
                        var day = res.result.results[0].settlementDay;
                        if(day==1){
                            settlementDay = '周一';
                        }else if(day==2){
                            settlementDay = '周二';
                        }else if(day==3){
                            settlementDay = '周三';
                        }else if(day==4){
                            settlementDay = '周四';
                        }else if(day==5){
                            settlementDay = '周五';
                        }else if(day==6){
                            settlementDay = '周六';
                        }else if(day==7){
                            settlementDay = '周日';
                        }

                    }else if(res.result.results[0].settlementType==2){
                        settlementDay = res.result.results[0].settlementDay + '号';
                    }

                    let pa = {
                        state:res.result.results[0].settlementType,
                        date:settlementDay
                    };
                    this.info.push(pa);
                }
            },

            handleCurrentChange(val){
                this.currentPage = val;
                this.loadData();
            },
            //获取未结算金额
            setUndueFee(){
                if(this.toReviceFee==undefined||this.toReviceFee==''){
                    this.toReviceFee = 0;
                }
                return (this.unClosedFee*1 - this.toReviceFee*1).toFixed(2);
            },
            //加载欠款订单
            async loadData(){
                if(this.otherSideCompanyId==undefined||this.type==undefined){
                    return;
                }
                let para = {
                    "companyId":userInfo().companyId,
                    "saleCompanyId":this.otherSideCompanyId,
                    "orderType":parseInt(this.type),
                    "withTotal":true
                };
                const res = await getDebtInfo(para);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message:'数据加载成功!'
                    });
                    this.tableData6 = res.result.results;
                    var groupData = res.result.groupData;
                    this.totalCount = res.result.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            checkboxInit(row,index){
                if((this.tableData6[index].closingFee!=undefined&&this.tableData6[index].closingFee!=''&&this.tableData6[index].closingFee>0)||(this.tableData6[index].closeFee!=undefined&&this.tableData6[index].closeFee==this.tableData6[index].totalFee)){
                    return 0;
                }else{
                    return 1;
                }
            },

            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            //勾选订单结算
            batchSettlement(){
                //立即结算
                    var sumTotalFee=0;
                    var closeFee = 0;
                    this.orderIds = [];
                    var ids = '';
                    this.multipleSelection.forEach((item) => {
                        if(this.settlementOrderId!=undefined&&this.settlementOrderId!=''){

                        }else if((item.closingFee!=undefined&&item.closingFee!=''&&item.closingFee>0)||(item.closeFee!=undefined&&this.closeFee==item.totalFee)){

                        }else{
                            this.orderIds.push(item.id);
                            ids = item.id + ',' + ids;
                            sumTotalFee += item.totalFee;
                            closeFee += item.closeFee;
                        }
                    })
                    ids = ids.substring(0,ids.length-1);
                    if(this.orderIds.length <1&&this.multipleSelection.length==0){
                        this.$message({
                            duration:this.GLOBAL.MESSAGE_DISSMISS_TIME_MID,
                            type: 'error',
                            message: '请先勾选要结算的订单！'
                        });
                        return;
                    }else if(this.orderIds.length <1){
                        this.$message({
                            duration:this.GLOBAL.MESSAGE_DISSMISS_TIME_MID,
                            type: 'error',
                            message: '当前没有可结算的订单！'
                        });
                        return;
                    }
                    if(this.type==1){
                        this.$router.push({path:"/stallSettlementImmediately",query:{backPath:"/stallSettlementDetails?type=1&otherSideCompanyName=" + this.otherSideCompanyName + "&otherSideCompanyId=" + this.otherSideCompanyId +  "&unClosedFee=" + this.unClosedFee + "&toReviceFee=" +this.toReviceFee,orderIds:ids,saleCompanyId:this.otherSideCompanyId,otherSideCompanyName:this.otherSideCompanyName,activeName:"second",unClosedFee:sumTotalFee}});
                    }else if(this.type==3){
                        this.$router.push({path:"/stallSettlementImmediately",query:{backPath:"/stallSettlementDetails?type=3&otherSideCompanyName=" + this.otherSideCompanyName + "&otherSideCompanyId=" + this.otherSideCompanyId +  "&unClosedFee=" + this.unClosedFee + "&toReviceFee=" +this.toReviceFee,backOrderIds:ids,saleCompanyId:this.otherSideCompanyId,otherSideCompanyName:this.otherSideCompanyName,activeName:"first"}});
                    }

            },
            //查看详情
            queryDetails(id,orderType){
                if(orderType==1){
                    this.$router.push({path:"/orderPurchaseBuyDetails",query:{orderId:id}});
                }else if(orderType==3){
                    this.$router.push({path:"/salesReturnDetails",query:{orderId:id}});
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
