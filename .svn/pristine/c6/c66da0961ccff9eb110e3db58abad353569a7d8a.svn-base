<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('fastShipping2')">
                <router-link :to='{path:"/fastShipping2"}'>快速出货</router-link>
            </li>
            <li v-if="getMenuAuthFun('indentManagement')">
                <router-link :to='{path:"/indentManagement"}'>订单管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('takeGoods')">
                <router-link :to='{path:"/takeGoods"}'>取货码</router-link>
            </li>
            <li v-if="getMenuAuthFun('sellerSettlement')">
                <router-link :to='{path:"/sellerSettlement"}'>客户结算</router-link>
            </li>
            <li  class="menuIndex" v-if="getMenuAuthFun('SettlementRecordsStall')">
                <router-link :to='{path:"/SettlementRecordsStall"}'>结算单</router-link>
            </li>
            <li v-if="getMenuAuthFun('customerManagement')">
                <router-link :to='{path:"/customerManagement"}'>客户管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('statisticalStatement')">
                <router-link :to='{path:"/statisticalStatement"}'>销售统计</router-link>
            </li>
        </ul>
        <div class="papa">
            <div class="btngroup">
             <a href="javascript:void(0)" class="buttonColor" v-if="this.settlementOrder.status==0&&this.settlementOrder.type==22" @click="quickSettlementLink">立即付款</a>
             <a href="javascript:void(0)" class="buttonColor" v-if="this.settlementOrder.status==4&&(this.settlementOrder.type==1||this.settlementOrder.type==11)" @click="confirmSettlementOrder(1)">审核通过</a>
             <a href="javascript:void(0)" class="buttonColor" v-if="this.settlementOrder.status==4&&(this.settlementOrder.type==1||this.settlementOrder.type==11)" @click="confirmSettlementOrder(2)">审核不通过</a>
            <a href="javascript:void(0)" class="buttonColor" @click="returnPage">返回</a>
            </div>
            <div class="paydetails">
                <div class="paydetailsHeader">
                    <p class="title"><i><img :src="payImg" alt=""></i><span class="blue2">{{this.settlementOrder.status==0?'等待付款':this.settlementOrder.status==1?'付款成功':this.settlementOrder.status==2?'付款失败':this.settlementOrder.status==3?'已关闭':this.settlementOrder.status==4?'付款中':''}}</span></p>
                    <p class="failreason" v-if="this.settlementOrder.status==2">
                        失败原因 : {{decodeURI(this.settlementOrder.auditMemo)}}
                    </p>
                </div>
                <div class="paydetailsBody">
                    <div class="paydetailsBodyTop">
                        <span class="blue2" v-if="this.settlementOrder.type==1||this.settlementOrder.type==11">收款信息</span>
                        <span v-if="this.settlementOrder.type==2||this.settlementOrder.type==22">付款信息</span>
                    </div>
                    <div class="paydetailsBodyMain">
                      <div class="flex">
                          <span>卖家名称:</span><span>{{this.settlementOrder.otherSideCompanyName}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.status > 0">
                         <span>实际付款金额:</span><span>{{this.settlementOrder.actualPayFee==undefined?0.00:this.settlementOrder.actualPayFee.toFixed(2)}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.status > 0">
                         <span>付款人:</span><span>{{this.settlementOrder.type==1?this.settlementOrder.updateUserName:this.settlementOrder.type==2?this.settlementOrder.createUserName:this.settlementOrder.type==11?this.settlementOrder.createUserName:this.settlementOrder.type==22?this.settlementOrder.createUserName:''}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.status > 0">
                         <span>付款时间:</span><span>{{this.settlementOrder.updateTime==undefined||this.settlementOrder.updateTime==''?formatDate(this.settlementOrder.createTime):formatDate(this.settlementOrder.updateTime)}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.status > 0">
                         <span>对方付款账号:</span><span>{{this.settlementOrder.payAcount}}{{this.settlementOrder.actualPayFeeType==1?'(余额)':this.settlementOrder.actualPayFeeType==3?'(支付宝)':this.settlementOrder.actualPayFeeType==4?'(微信)':this.settlementOrder.actualPayFeeType==5?'(银行卡)':''}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.status > 0">
                         <span>收款账号:</span><span>{{this.settlementOrder.reciveAcount}}{{this.settlementOrder.actualPayFeeType==1?'(余额)':this.settlementOrder.actualPayFeeType==3?'(支付宝)':this.settlementOrder.actualPayFeeType==4?'(微信)':this.settlementOrder.actualPayFeeType==5?'(银行卡)':''}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.status > 0 && this.father!=undefined && this.father.length > 0">
                            <span>截图凭证:</span>
                            <ul class="list">
                                <li class="imgwrap" v-for="imgson in father">
                                    <img :src="imgson.img" alt="" width="100%" height="100%">
                                </li>
                            </ul>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.status > 0">
                          <span>交易流水号:</span><span>{{this.settlementOrder.orderCode}}</span>
                      </div>
                        <div class="flex" v-if="this.settlementOrder.status > 0">
                            <span>付款说明:</span><span>{{this.settlementOrder.payMemo}}</span>
                        </div>
                      <div class="flex" v-if="this.settlementOrder.type==1||this.settlementOrder.type==22">
                        <span>发起收款金额:</span><span>￥{{checkSettlementFee()}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.type==1||this.settlementOrder.type==22">
                        <span>抹平金额:</span><span>￥{{this.settlementOrder.fixFee==undefined?0.00:this.settlementOrder.fixFee.toFixed(2)}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.type==1||this.settlementOrder.type==22">
                          <span>实际收款金额:</span><span>￥{{this.settlementOrder.actualPayFee==undefined?0.00:this.settlementOrder.actualPayFee.toFixed(2)}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.type==1||this.settlementOrder.type==22">
                         <span>发起人:</span><span>{{this.settlementOrder.createUserName}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.type==1||this.settlementOrder.type==22">
                            <span>发起收款时间:</span><span>{{formatDate(this.settlementOrder.createTime)}}</span>
                      </div>
                      <div class="flex" v-if="this.settlementOrder.type==1||this.settlementOrder.type==22">
                            <span>收款说明:</span><span>{{this.settlementOrder.reciveMemo}}</span>
                      </div>
                    </div>
                </div>
            </div>
            <div class="stalllist">
                <div class="stalllistTitle">
                    <div><span>卖家名称 : </span><span>{{this.settlementOrder.otherSideCompanyName}}</span>
                        <span v-bind:class="[this.settlementType==1?'weekSettlement':this.settlementType==2?'monthSettlement':'']" v-if="this.settlementType">{{this.settlementType==1?'周结':this.settlementType==2?'月结':''}}</span>
                        <span style="font-size: 12px;">{{this.settlementDay}}</span>
                    </div>
                    <div><span>配货总金额(元) : </span><span>{{this.totalFee!=undefined?this.totalFee.toFixed(2):0.00}}</span></div>
                    <div><span>配货总数量(件) : </span><span>{{this.totalNum}}</span></div>
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
                        label="配货数" width="120">
                            <template scope="scope">
                            <p style="">{{scope.row.orderNum}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="totalFee"
                        label="配货金额" width="150">
                        <template scope="scope">
                            <p>{{scope.row.totalFee!=undefined?scope.row.totalFee.toFixed(2):0}}</p>
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
                            <el-button class="blue2" type="text" @click="changePage(scope.row.id,scope.row.orderType,scope.row.otherOrderId)">查看详情</el-button>
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
        <el-dialog
            title="审核不通过"
            size="tiny"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
            class="auditwarp">
            <el-input
            type="textarea"
            :rows="2"
            maxlength="50"
            placeholder="请输入内容"
            v-model="failedMemo"
            ></el-input>
            <span slot="footer" class="dialog-footer">
                <a class="buttonColor" @click="confirmedStatus">确 定</a>
                <a class="buttonColor2"  @click="centerDialogVisible = false">取 消</a>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {querySettlementDay,queryOrderBySettlementOrder,selectFinanceRecordCert,getSettlementOrder,getSettlement,confirmSettlementOrder} from '@/api/getData'
    import {userInfo,getStore} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {isNullObject,getCompanyType} from  '../utils/common'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    export default {
        data() {
            return {
                //              1为档口、2为卖家身份
                identity:2,
                tableData:[],
                father:[],
                payImg:'',
                paySuccess:require("../image/smoneysuccess.png"),
                payFailed:require("../image/smoneyfail.png"),
                paying:require("../image/smoneymaking.png"),
                payWaiting:require("../image/smoneymaking.png"),
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
                settlementOrderId:'',
                otherSideCompanyId:'',
                settlementOrder:'',
                totalFee:0,
                totalNum:0,
                settlementDay:'',
                settlementType:'',
                failedMemo:'',
            }
        },
        watch:{
            '$route':function (route) {
                this.settlementOrderId = this.$route.query.settlementOrderId;

                //加载结算单信息
                this.loadSettlementOrderInfo();

                //根据结算单加载订单
                this.loadOrders();
            }
        },
        mounted(){
            this.settlementOrderId = this.$route.query.settlementOrderId;

            //加载结算单信息
            this.loadSettlementOrderInfo();

            //根据结算单加载订单
            this.loadOrders();
        },
        methods: {
            getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },


            //加载结算单信息
            async loadSettlementOrderInfo(){
                if(this.settlementOrderId==undefined){
                    return;
                }
                let param = {
                    id:this.settlementOrderId
                };
                const res = await  getSettlement(param);
                if(res.isSuccess){
                    this.settlementOrder = res.result;
                    this.otherSideCompanyId = this.settlementOrder.otherSideCompanyId;
                    this.checkImg();
                    if(this.settlementOrder.certificate!=undefined&&this.settlementOrder.certificate!=''){
                        let table = this.settlementOrder.certificate.split(',');
                        table.forEach((obj)=>{
                            let imgs = {
                                img:obj
                            };
                            this.father.push(imgs);
                        });
                    }
                    //查询结算日
                     this.querySettlementDay();
                }else{
                    this.$message({
                        type:'error',
                        message:'加载失败'
                    });
                }
            },

            //查询结算日
            async querySettlementDay(){
                let param = {
                    params:{"companyId":userInfo().companyId,
                        "settlementCompanyId":this.otherSideCompanyId},
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
                if(this.settlementOrderId==undefined){
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
                this.$router.push({path:'/SettlementRecordsStall'});
            },

            //详情跳转
            changePage(id,type,otherId){
                var orderId = "";
                if(type==2||type==4){
                    orderId = id;
                }else if(type==1||type==3){
                    orderId = otherId;
                }
                if(type==1||type==2){
                    this.$router.push({path:"/sellerSettlementorderDetails",query:{backPath:"/sellerSettlementDetails?saleCompanyId="+this.otherSideCompanyId+"&settlementOrderId="+this.settlementOrderId,orderId:orderId}});
                }else if(type==3||type==4){
                    this.$router.push({path:"/sellerSettlementreturnDetails",query:{backPath:"/sellerSettlementDetails?saleCompanyId="+this.otherSideCompanyId+"&settlementOrderId="+this.settlementOrderId,orderId:orderId}});
                }
            },

            //审核通过1,//审核不通过2
            async confirmSettlementOrder(val){
                if(this.settlementOrderId==undefined){
                    return;
                }
                if(val==2){
                    this.centerDialogVisible = true;
                }else if(val==1){
                    //确认
                    this.$confirm("确认收到款项？").then(_=>{
                        this.confirmSuccess(val);
                    }).catch(_=>{});

                }
            },

            async confirmSuccess(val){
                let param = {
                    "id":this.settlementOrderId,
                    "status":val
                };
                const res = await confirmSettlementOrder(param);
                if(res.isSuccess){
                    this.$message({
                        type:'info',
                        message:'已提交'
                    });
                    //加载结算单信息
                    this.loadSettlementOrderInfo();
                }else{
                    this.$message({
                        type:'error',
                        message:'操作失败'
                    });
                }
            },

            async confirmFailed(){
                //调用审核的接口
                let param = {
                    "id":this.settlementOrderId,
                    "status":2,
                    "auditMemo":encodeURI(encodeURI(this.failedMemo))
                };
                const res = await confirmSettlementOrder(param);
                if(res.isSuccess){
                    this.$message({
                        type:'info',
                        message:'已提交'
                    });
                    //加载结算单信息
                    this.loadSettlementOrderInfo();
                }else{
                    this.$message({
                        type:'error',
                        message:'操作失败'
                    });
                }

            },

            //确认审核失败
            async confirmedStatus(){

                if(this.failedMemo==undefined||this.failedMemo==''){
                    this.$message({
                        type:'error',
                        message:'请输入审核失败的原因'
                    });
                    return ;
                }
                this.centerDialogVisible = false;
                this.$confirm("未收到指定款项？").then(_=>{
                    this.confirmFailed();
                }).catch(_=>{});
            },

            //立即付款
            quickSettlementLink(){
                this.$router.push({path:"/sellerSettlementImmediately",query:{saleCompanyId:this.otherSideCompanyId,activeName:"second",settlementOrderId:this.settlementOrderId}});
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
             handleSizeChange(val) {
                this.pageSize = val;
                this.loadOrders();
            },

             handleCurrentChange(val) {
                this.currentPage = val;
                this.loadOrders();
            },
        }

    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/financialManagement2';
</style>
