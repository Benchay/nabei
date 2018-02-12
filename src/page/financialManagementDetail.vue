<template>
    <div class="fillcontain">
        <ul :class="[identity ==1 ?'stallShareMenu':identity ==2 ?'sellerShareMenu':'']">
            <li>
                <router-link :to='{path:"/financialManagement"}'>账户总览</router-link>
            </li>
            <li class="ListMenu">
                <router-link :to='{path:"/financialManagement2"}'>财务交易记录</router-link>
            </li>
            <li>
                <router-link :to='{path:"/accountSetting"}'>账户设置</router-link>
            </li>
        </ul>
        <div class="papa">
            <div class="btngroup">
            <a href="javascript:void(0)" class="buttonColor3" @click="returnPage">返回</a>
            </div>
            <div class="paydetails">
                <div class="paydetailsHeader">
                    <p class="title"><i><img :src="payImg" alt=""></i><span>{{this.settlementOrder==undefined?'':this.settlementOrder.status==0?'等待付款':this.settlementOrder.status==1?'付款成功':this.settlementOrder.status==2?'付款失败':this.settlementOrder.status==3?'已关闭':this.settlementOrder.status==4?'付款中':''}}</span></p>
                    <p class="failreason" v-if="this.settlementOrder!=undefined&&this.settlementOrder.status==2">
                        失败原因 : {{this.settlementOrder!=undefined&&this.settlementOrder.auditMemo!=undefined?this.settlementOrder.auditMemo:''}}
                    </p>
                </div>
                <div class="paydetailsBody">
                    <div class="paydetailsBodyTop">
                        <span v-if="this.settlementOrder!=undefined&&(this.settlementOrder.type==1||this.settlementOrder.type==11)">收款信息</span>
                        <span v-if="this.settlementOrder!=undefined&&(this.settlementOrder.type==2||this.settlementOrder.type==22)">付款信息</span>

                    </div>
                    <div class="paydetailsBodyMain">
                      <div class="flex">
                          <span>档口名称:</span><span>{{this.stallName}}</span>
                      </div>
                      <div class="flex">
                          <span>交易流水号:</span><span>{{this.financeRecord.orderCode==undefined||this.financeRecord.orderCode==''?this.financeRecord.flowNo:this.financeRecord.orderCode}}</span>
                      </div>
                      <div class="flex">
                          <span>收款时间:</span><span>{{this.formatDate(this.financeRecord.createTime)}}</span>
                      </div>
                      <div class="flex">
                          <span>操作人:</span><span>赵蕾蕾</span>
                      </div>
                      <div class="flex">
                          <span>结算金额:</span><span>￥{{this.settlementFee}}</span>
                      </div>
                      <div class="flex">
                          <span>抹平金额:</span><span>￥{{this.fixFee}}</span>
                      </div>
                      <div class="flex">
                          <span>实际付款金额:</span><span>￥{{this.financeRecord.changeFee!=undefined?this.financeRecord.changeFee.toFixed(2):0.00}}</span>
                      </div>
                      <div class="flex">
                          <span>对方付款账号:</span><span>{{this.payAccount}} {{this.payAccountType==1?'(余额)':this.payAccountType==3?'(支付宝)':this.payAccountType==4?'(微信)':this.payAccountType==5?'(银行卡)':''}}</span>
                      </div>
                      <div class="flex">
                          <span>收款账号:</span><span>{{this.reciveAccount}} {{this.reciveAccountType==1?'(余额)':this.reciveAccountType==3?'(支付宝)':this.reciveAccountType==4?'(微信)':this.reciveAccountType==5?'(银行卡)':''}}</span>
                      </div>
                      <div class="flex">
                          <span>截图凭证:</span>
                         <ul class="list">
                             <li class="imgwrap" v-for="imgson in father">
                                 <img :src="imgson.img" alt="" width="100%" height="100%">
                             </li>
                         </ul>
                      </div>
                      <div class="flex">
                          <span>{{this.settlementOrder==undefined?'说明':this.settlementOrder.type==1||this.settlementOrder.type==11?'收款说明':this.settlementOrder.type==2||this.settlementOrder.type==22?'付款说明':'说明'}}:</span><span>{{this.memo}}</span>
                      </div>
                    </div>
                </div>
            </div>
            <div class="stalllist" v-show="this.settlementOrder!=undefined">
                <div class="stalllistTitle">
                    <div><span>档口名称 : </span><span>{{this.stallName}}</span>
                        <span v-bind:class="[this.settlementType==1?'weekSettlement':this.settlementType==2?'monthSettlement':'']" v-if="this.settlementType">{{this.settlementType==1?'周结':this.settlementType==2?'月结':''}}</span><span style="font-size: 12px;">{{this.settlementDay}}</span></div>
                    <div><span>采购总金额(元) : </span><span>{{this.totalFee}}</span></div>
                    <div><span>采购总数量(件) : </span><span>{{this.totalNum}}</span></div>
                </div>
                <el-table
                    :data="tableData"
                    height="441"
                    style="width: 100%;">
                    <el-table-column
                        prop="orderCode"
                        label="订单编号"
                       >
                    </el-table-column>
                    <el-table-column
                        prop="orderNum"
                        label="采购数" width="120">
                            <template scope="scope">
                            <p style="">{{scope.row.orderNum}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="totalFee"
                        label="采购金额" width="150">
                        <template scope="scope">
                            <p>{{scope.row.totalFee==undefined?0:scope.row.totalFee.toFixed(2)}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderTime"
                        label="下单时间"
                        :formatter="mydateFormat" width="180">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                         width="100">
                        <template scope="scope">
                            <el-button type="text" class="red" @click="changePage(scope.row.id,scope.row.otherOrderId,scope.row.orderType)">查看详情</el-button>
                        </template>
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
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {selectFinanceRecordCert,getSettlementOrder,getSettlement,querySettlementDay,queryOrderBySettlementOrder,getFinanceRecord} from '@/api/getData'
    import {userInfo,getStore} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {isNullObject,getCompanyType} from  '../utils/common'

    export default {
        data() {
            return {
                //              1为档口、2为卖家身份
                identity:2,
                tableData:[],
                father:[],
                payImg:'',
                paySuccess:require("../image/moneysuccess.png"),
                payFailed:require("../image/moneyfail.png"),
                paying:require("../image/moneymaking.png"),
                payWaiting:require("../image/moneymaking.png"),
                centerDialogVisible: false,
                textarea: '',
                //默认每页数据量
                pageSize: 10,

                //默认高亮行数据id
                highlightId: -1,

                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,

                //默认数据总数
                totalCount: 0,
                financeRecordId:'',
                settlementOrderId:'',
                backPath:'',
                settlementOrder:'',
                otherSideCompanyId:'',
                settlementDay:'',
                settlementType:'',
                totalFee:0,
                totalNum:0,
                stallName:'',
                flowNo:'',
                operateTime:'',
                settlementFee:0,
                fixFee:0,
                actualPayFee:0,
                reciveAccount:'',
                payAccount:'',
                reciveAccountType:0,
                payAccountType:0,
                certificateImgs:[],
                memo:'',
                financeRecord:'',

            }
        },
        watch:{
            '$route':function (route){
                this.payImg = '';
                this.stallName = '';
                this.financeRecord = '';
                this.settlementFee = 0;
                this.fixFee = 0;
                this.payAccount = '';
                this.payAccountType = 0;
                this.reciveAccount = '';
                this.reciveAccountType = 0;
                this.father = [];
                this.settlementOrder = undefined;
                this.tableData = [];
                this.totalFee = 0;
                this.totalNum = 0;
                this.memo = '';

                this.backPath = this.$route.query.backPath;
                this.financeRecordId = this.$route.query.financeRecordId;
                this.settlementOrderId = this.$route.query.orderId;

                //加载财务交易流水和结算单详情
                this.loadData();

                //根据结算单加载订单
                this.loadOrders();
            }
        },
        mounted(){
            this.settlementOrder = undefined;
            this.backPath = this.$route.query.backPath;
            this.financeRecordId = this.$route.query.financeRecordId;
            this.settlementOrderId = this.$route.query.orderId;

            //加载财务交易流水和结算单详情
            this.loadData();

            //根据结算单加载订单
            this.loadOrders();
        },

        methods: {

            handleSizeChange(val){
                this.pageSize = val;
            },

            handleCurrentChange(val){
                this.currentPage = val;
            },

            //加载财务交易流水
            async loadData(){
                if(this.financeRecordId==undefined){
                    return;
                }
                let param = {
                    id:this.financeRecordId
                };
                const res = await getFinanceRecord(param);
                if(res.isSuccess){
                    this.financeRecord = res.result;
                }else{
                    this.$message({
                        type: 'error',
                        message: '数据加载失败'
                    });
                }
                if(this.settlementOrderId==undefined||this.settlementOrderId==''){
                    return ;
                }else{
                    this.father = [];
                    let queryorderParam = {
                        "id":this.settlementOrderId
                    };
                    const orderres = await  getSettlement(queryorderParam);
                    if(orderres.isSuccess){
                        this.father = [];
                        this.settlementOrder = orderres.result;
                        this.checkImg();
                        if(orderres.result.companyId==userInfo().companyId){
                            this.otherSideCompanyId = this.settlementOrder.otherSideCompanyId;
                            this.stallName = this.settlementOrder.otherSideCompanyName;
                        }else if(orderres.result.otherSideCompanyId==userInfo().companyId){
                            this.otherSideCompanyId = this.settlementOrder.companyId;
                            this.stallName = this.settlementOrder.companyName;
                        }

                        //查询结算日
                        this.querySettlementDay();

//                        if(orderres.result.updateTime==undefined){
//                            this.operateTime = orderres.result.createTime;
//                        }else{
//                            this.operateTime = orderres.result.updateTime
//                        }

                        var realPayFee = 0;
                        var realFixFee = 0;
                        if(orderres.result.actualPayFee==undefined){
                            realPayFee = 0;
                        }else{
                            realPayFee = orderres.result.actualPayFee;
                        }
                        if(orderres.result.fixFee==undefined) {
                            realFixFee == 0;
                        }else{
                            realFixFee = orderres.result.fixFee;
                        }

                        this.settlementFee = (realPayFee + realFixFee).toFixed(2);
                        this.fixFee = realFixFee.toFixed(2);
                        this.reciveAccount = orderres.result.reciveAcount;
                        this.payAccount = orderres.result.payAcount;
                        this.reciveAccountType = orderres.result.reciveAcountType;
                        this.payAccountType = orderres.result.actualPayFeeType;
                        if(orderres.result.type==1||orderres.result.type==11){
                            this.memo = orderres.result.reciveMemo;
                        }else if(orderres.result.type==2||orderres.result.type==22){
                            this.memo = orderres.result.payMemo;
                        }

                        if(orderres.result.certificate){
                             orderres.result.certificate.split(",").forEach(obj => {
                                let pa = {
                                    img:obj
                                };
                                this.father.push(pa);
                            })
                        }
                    }
                }
            },


            //查询结算日
            async querySettlementDay(){
                if(this.otherSideCompanyId==undefined||this.otherSideCompanyId==''){
                    return;
                }
                let param = {
                    params:{"companyId":this.otherSideCompanyId,
                        "settlementCompanyId":userInfo().companyId},
                    pageIndex:1,
                    pageSize:1
                };
                const res = await querySettlementDay(param);
                if(res.isSuccess){
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

                    this.settlementDay = settlementDay;
                    this.settlementType = res.result.results[0].settlementType;
                }
            },

            //根据结算单加载订单
            async loadOrders(){
                if(this.settlementOrderId==undefined||this.settlementOrderId ==''){
                    return;
                }
                this.tableData = [];
                let param= {
                    "settlementOrderId":this.settlementOrderId
                };
                const res = await queryOrderBySettlementOrder(param);
                if(res.isSuccess){
                    this.totalFee = 0;
                    this.totalNum = 0;
                    let table = res.result.results;
                    table.forEach((obj)=>{
                        let par = {
                            "orderType":obj.orderType,
                            "orderCode":obj.orderCode,
                            "orderNum":obj.totalNum,
                            "totalFee":obj.totalFee,
                            "orderTime":obj.orderTime,
                            "id":obj.id,
                            "otherOrderId":obj.otherOrderId
                        };
                        this.tableData.push(par);
                        this.totalFee = this.totalFee + obj.totalFee;
                        this.totalNum  = this.totalNum + obj.totalNum;
                    });
                }else{
                    this.$message({
                        type:'error',
                        message:'数据加载失败'
                    });
                }
            },

            //判断状态图片
            checkImg(){
                if(this.settlementOrder==undefined){
                    this.payImg = '';
                }
                if(this.settlementOrder.status==0){
                    this.payImg = this.payWaiting;
                }else if(this.settlementOrder.status==1){
                    this.payImg = this.paySuccess;
                }else if(this.settlementOrder.status==2){
                    this.payImg = this.payFailed;
                }else if(this.settlementOrder.status==3){

                }else if(this.settlementOrder.status==4){
                    this.payImg = this.paying;
                }
            },

            //判断结算金额
            checkSettlementFee(){
                var realPayFee = 0;
                var realFixFee = 0;
                if(this.settlementOrder.actualPayFee==undefined){
                    realPayFee = 0.00;
                }else{
                    realPayFee = this.settlementOrder.actualPayFee;
                }
                if(this.settlementOrder.fixFee==undefined){
                    realFixFee = 0.00;
                }else{
                    realFixFee = this.settlementOrder.fixFee;
                }
                return (realPayFee + realFixFee).toFixed(2);
            },

            //返回
            returnPage(){
                this.$router.push({path:this.backPath});
            },

            //跳转详情页面
            changePage(id,otherId,orderType){
                var orderId = '';
                if(orderType==1||orderType==3){
                    orderId = id;
                    var path = '';
                    if(this.settlementOrderId!=undefined&&this.settlementOrderId!=''){
                        path = "/financialManagementDetail?backPath="+this.backPath+"&financeRecordId="+this.financeRecordId+"&orderId="+this.settlementOrderId;
                    }else{
                        path = "/financialManagementDetail?backPath="+this.backPath+"&financeRecordId="+this.financeRecordId;
                    }
                    this.$router.push({path:'/financialManagementorderDetail',query:{backPath:path,id:orderId}});
                }else if(orderType==2||orderType==4){
                    orderId = otherId;
                    var path = '';
                    if(this.settlementOrderId!=undefined&&this.settlementOrderId!=''){
                        path = "/financialManagementDetail?backPath="+this.backPath+"&financeRecordId="+this.financeRecordId+"&orderId="+this.settlementOrderId;
                    }else{
                        path = "/financialManagementDetail?backPath="+this.backPath+"&financeRecordId="+this.financeRecordId;
                    }
                    this.$router.push({path:'/financialManagementreturnDetail',query:{backPath:path,orderId:orderId}});
                }

            },

            //时间格式化
            formatDate(val){
                if(val==undefined||val==''){
                    return '';
                }
                return formatDate(val,'yyyy-MM-dd hh:mm:ss');
            },

              //时间格式化
            mydateFormat:function(row, column) {
                var time = row[column.property];
                if (time == undefined||time=='') {
                    return "";
                }
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm');
            },
        }

    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/financialManagement2';
</style>
