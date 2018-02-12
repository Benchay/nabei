<template>
    <div class="fillcontain">
       <ul :class="[identity ==1 ?'stallShareMenu':identity ==2 ?'sellerShareMenu':'']">
            <li v-if="getMenuAuthFun('financialManagement')">
                <router-link :to='{path:"/financialManagement"}'>账户总览</router-link>
            </li>
            <li class="ListMenu" v-if="getMenuAuthFun('financialManagement2')">
                <router-link :to='{path:"/financialManagement2"}'>财务交易记录</router-link>
            </li>
            <li v-if="getMenuAuthFun('accountSetting')">
                <router-link :to='{path:"/accountSetting"}'>账户设置</router-link>
            </li>
        </ul>
        <div class="returns-content">
            <div class="returnsAll">
                <div class="right">
                    <router-link :to='{path:this.backPath}' class="comeBack">返回</router-link>
                </div>
                <div class="orderDetails"  style="margin: 40px 0 0;">
                    <div class="flex detailsLeft">
                        <img :src="orderImgUrl_main" alt="">
                        <div>
                            <p>订单编号：{{orderCode}}</p>
                            <p>卖家名称：{{busiName}}</p>
                            <p>共计金额：￥{{totalFee}}</p>
                        </div>
                    </div>
                    <div  class="detailsCenter">
                        <p>结算状态：（{{closeStutas==0?'未结算':closeStutas==1?'已结算':closeStutas==2?'部分结算':''}}）</p>
                        <p>商品数量：<span class="title">{{totalNum}}</span>
                        </p>
                    </div>
                    <div class="flex detailsRight" >
                        <a href="javascript:void(0)" @click="salesDialog">
                            <div>
                                <p class="blue2">订单动态</p>
                                <p>（{{status==7?'待签收':status==8?'待确认':status==9?'待卸货':status==11?'待入库':status==99?'已完成':''}}）</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="returnsRemark">
                    退货原因：{{memo}}
                </div>
                <div class="returnsTable">
                    <el-table
                        height="360"
                        :data="tableData"
                        @selection-change="handleSelectionChange"
                        @current-change="handleCurrentSelectionChange"
                        style="width: 100%">
                        <el-table-column
                            v-if="status !=99"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="主图/货号">
                            <template scope="scope">
                                <div class="flex">
                                    <img :src="scope.row.imgUrl_main" alt=""  class="tableImg">
                                    <p>{{scope.row.productCode}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="productName"
                            width="280"
                            label="商品名称">
                        </el-table-column>
                        <el-table-column
                            prop="color"
                            label="颜色">
                        </el-table-column>
                        <el-table-column
                            prop="size"
                            label="尺码">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="退货价">
                        </el-table-column>
                        <el-table-column
                        label="退货/已退/未退数量">
                        <template scope="scope">
                        <p>{{scope.row.orderNum}}/<span class="blue2">{{scope.row.allocateProductNum}}</span>/{{scope.row.orderNum-scope.row.allocateProductNum}}</p>
                        </template>
                        </el-table-column>
                        <el-table-column
                            label="入库数量">
                            <template scope="scope">
                               <div v-if="status !=99">
                                   <!--已入库-->
                                   <p v-if="status !=9">{{scope.row.allocateProductNum}}</p>
                                   <!--未入库-->
                                   <el-input v-model="scope.row.input" :min="0" v-if="status ==9"></el-input>
                               </div>
                                <div   v-if="status ==99">
                                    <p>{{scope.row.allocateProductNum}}</p>
                                </div>
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
                    :page-size="pageSize"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
                <a href="javascript:void(0)" class="export_excle left">导出excel</a>
            </div>
            <el-dialog
                title="订单动态"
                :visible.sync="dialog1"
                size="small">
                <div class="dynamic">
                    <el-col :span="12">卖家名称：{{busiName}}</el-col>
                    <el-col :span="12">{{status==7?'待签收':status==8?'待确认':status==9?'待卸货':status==11?'待入库':status==99?'已完成':''}}</el-col>
                    <el-col :span="12">订单编号：{{orderCode}}</el-col>
                </div>
                <el-col class="dynamicList">
                    <div class="track-rcol">
                        <div class="track-list">
                            <ul>
                                <li v-for="list in salesList">
                                    <i class="node-icon"></i>
                                    <span class="time">{{list.createTime | mydateFormat}}</span>
                                    <div class="txt">
                                        <p>{{list.description}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {queryOrderDetailByOrderId,auditOrder,queryOrderLog} from '@/api/getData'
    import {userInfo}   from '../config/mUtils'
    import {formatDate,timeZoneCovertDay} from '../utils/date.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        data() {
            return {
                identity:1,
            	orderImgUrl_main:'',//订单主图
                dialog:false,
                status:0,
                closeStutas:0,
                tableData: [],
                roleForm: {
                    userId: '',
                    roleId: '',
                    compId:''
                },
                pageSize:10,
                currentPage:1,
                totalCount:0,
                input:'',
                dialog1:false,
                busiName:'',
                stallName:'',
                orderCode:'',
                totalNum:0,
                orderTime:'',
                memo:'',
                totalFee:'',
                multipleSelection:[],
                totalN :0,
                totalNT :0,
                salesList:[],
                orderDetails:[],
                createType:0,
                payType:0,
                orderId2:'',
                saleCompanyId:'',
                orderId:'',
                closingFee:0,
                backPath:''
            }
        },
        watch:{
            '$route':function (route) {
                this.orderId = this.$route.query.orderId;
                this.backPath = this.$route.query.backPath;
                this.initData();
            }
        },
        mounted(){
            this.roleForm.compId = userInfo().companyId;
            this.roleForm.userId = userInfo().userId;

            this.orderId = this.$route.query.orderId;
            this.backPath = this.$route.query.backPath;
            this.initData();
        },
        filters: {
            mydateFormat(time) {
                if (time == undefined || time == '') {
                    return "";
                }
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            },
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            quickPay(){
        	    this.$router.push({path:'/sellerSettlementImmediately',query:{actualPayFee:this.totalFee,backOrderId:this.orderId,customName:this.busiName,activeName:'second',saleCompanyId:this.saleCompanyId}});
            },

            async initData() {
                this.tableData = [];
                let param = {
                    "companyId": this.roleForm.compId,
                    "orderId": this.orderId,
                    "pageSize": this.pageSize,
                    "pageIndex": this.currentPage,
                    "getHeader": 1
                };
                console.log(param)
                const res = await queryOrderDetailByOrderId(param);
                if (res.isSuccess) {
                	let order = res.result.order;
                	this.closingFee = order.closingFee;
                    this.busiName = order.busiName;
                    this.orderCode = order.orderCode;
                    this.totalFee = order.totalFee;
                    this.totalNum = order.totalNum;
                    this.orderTime = order.orderTime;
                    this.orderImgUrl_main = order.imgUrl_main;
                    this.memo = order.memo;
                    this.status = order.status;
                    this.closeStutas = order.closeStutas;
                    this.createType = order.createType;
                    this.payType = order.payType;
                    this.saleCompanyId = order.busiCompId;
                    this.totalCount = res.result.data.totalCount;
                    res.result.data.results.forEach((obj)=>{
                    	if(obj.details){
                    		obj.details.forEach((obj2)=>{
                            	this.tableData.push(obj2);
                            	if((this.orderImgUrl_main == null || this.orderImgUrl_main == '') && obj2.imgUrl_main ){
                            		this.orderImgUrl_main = obj2.imgUrl_main;
                            	}
                        	});
                    	}
                    });

                }
            },
            handleSelectionChange(val){
                for(var i = 0 ; i<val.length;i++){
                    val[i].input = val[i].orderNum*1-val[i].allocateProductNum*1;
                }
                this.multipleSelection = val;
            },

            //订单动态
            async salesDialog(){
                this.dialog1 = true;
                let param = {
                    "companyId":this.roleForm.compId,
                    "orderId":this.orderId,
                    "pageIndex":1,
                    "pageSize":10,
                };
                const res = await queryOrderLog(param);
                if(res.isSuccess == true){
                    this.salesList = res.result.results;
                }
            },
            handleCurrentSelectionChange(val){
                val.input = val.orderNum*1-val.allocateProductNum*1;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.initData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.initData();
            },
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/salesReturn';
    .detailsLeft,.detailsCenter{
        p{
            white-space: nowrap;
            .observe{
                border-color: @blue2;
                color: @blue2;
                margin-left: 50px;
            }
            .jiesuan{
                &:hover,&:focus{
                    color: #fff;
                }
                margin-left: 155px;
                transform: translateY(5px);
            }
        }
    }
</style>
