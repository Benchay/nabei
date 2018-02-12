<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('returnManagement2')">
                <router-link :to='{path:"/returnManagement2"}'>快速退货</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('sellReturn')">
                <router-link :to='{path:"/sellReturn"}'>销售退货</router-link>
            </li>
            <li v-if="getMenuAuthFun('returnManagement2')">
                <router-link :to='{path:"/returnManagement2"}'>退货统计</router-link>
            </li>
        </ul>
        <div class="returns-content">
            <div class="returnsAll">
                <div class="right">
                    <router-link :to='{path:"/sellReturn"}' class="comeBack">返回</router-link>
                </div>
                <div class="left">
                    <a href="javascript:void(0)" class="buttonColor" @click="confirmInventory" v-if="orderState == 11">立即入库</a>
                </div>
                <div class="orderDetails"  style="margin: 40px 0 0;">
                    <div class="flex detailsLeft">
                        <img v-if="image != ''" :src="image" alt="">
                        <img v-else src="../image/product_default.png" alt="">
                        <div>
                            <p>订单编号：{{orderCode}}</p>
                            <p>卖家名称：{{busiCompId==''?'匿名商家':busiName}}</p>
                            <p>共计金额：￥{{totalFee}}</p>
                        </div>
                    </div>
                    <div  class="detailsCenter">
                        <p>结算状态：（{{closeStutas==0?'未结算':closeStutas==1?'已结算':closeStutas==2?'部分结算':''}}）
                            <router-link :to="{path:'/sellReturnCompleteAccount',query:{orderId:this.orderId,backPath:'/sellReturnStorage?orderId='+this.orderId}}" v-if="this.createType == 0 && this.closeStutas != 0">
                                <el-button class="observe" size="mini" round >查看记录</el-button>
                            </router-link>
                        </p>
                        <p>商品数量：<span class="title">{{totalNum}}</span>
                            <el-button class="buttonColor jiesuan" v-if="this.payType!= 0 && this.closeStutas!= 1" :disabled="this.closingFee>0" @click="quickPay">立即付款</el-button>
                        </p>
                    </div>
                    <div class="flex detailsRight" >
                        <a href="javascript:void(0)" @click="salesDialog">
                            <div>
                                <p class="blue2">订单动态</p>
                                <p>（{{orderState==7?'待签收':orderState==8?'待确认':orderState==9?'待卸货':orderState==11?'待入库':orderState==99?'已完成':''}}）</p>
                            </div>
                        </a>
						<el-button class="observe" size="mini"  @click="printOrder" v-if="this.status=99">打印</el-button>
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
                           
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="主图/货号">
                            <template scope="scope">
                                <div class="flex" style="padding: 3px;">
                                    <img v-if="scope.row.imgUrl_main != ''" :src="scope.row.imgUrl_main" alt=""  class="tableImg">
                                    <img v-else src="../image/product_default.png" alt=""  class="tableImg">
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
                            v-if="orderState == 99"
                            prop="stockProductNum"
                            label="入库数量">
                            <template scope="scope">
                               <div>
                                   <el-input type="number" size="small" v-model="scope.row.stockProductNum" :min="0" :max="scope.row.allocateProductNum" onkeypress="return event.keyCode>=48&&event.keyCode<=57" @change="checkStockProductNum(scope.row,scope.$index)" v-if="orderState ==11"></el-input>
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
                title="确认入库"
                :visible.sync="dialog"
                size="tiny">
                <div class="confirmInventory">
                    <p>该退货订单退货成功商品总数：{{totalN}}件，</p>
                    <p>本次选择的商品：<span class="blue2">{{totalCheckedNum}}件</span></p>
                  <!--  <div v-if="this.totalN != this.totalCheckedNum">
                        <p>还有部分商品未入库，是否下次继续入库剩余部分？</p>
                        <a href="javascript:void(0)" class="buttonColor CIButton" @click="partInventory">确定部分入库</a>
                        <p>您也可以按本次入库数量结束本退货订单。</p>
                    </div>-->
                    <div>
                        <a href="javascript:void(0)" class="buttonColor CIButton" @click="endInventory">结束入库</a>
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title="订单动态"
                :visible.sync="dialog1"
                size="small">
                <div class="dynamic">
                    <el-col :span="12">卖家名称：{{busiName}}</el-col>
                    <el-col :span="12">{{orderState==7?'待签收':orderState==8?'待确认':orderState==9?'待卸货':orderState==11?'待入库':orderState==99?'已完成':''}}</el-col>
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
    import {printReturnOrder} from '../utils/orderPrint.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        data() {
            return {
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
                dialog1:false,
                busiName:'',
                busiCompId:'',
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
                image:'',
                orderId2:'',
                saleCompanyId:'',
                orderId:'',
                closingFee:0,
                totalCheckedNum:'',
                closeFee:0,
                printrVo:[],
                orderState:0
            }
        },
        watch:{
            '$route':function (route) {
                this.orderId = this.$route.query.orderId;
                this.initData();
            }
        },
        mounted(){
            this.roleForm.compId = userInfo().companyId;
            this.roleForm.userId = userInfo().userId;

            this.orderId = this.$route.query.orderId;
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
            checkStockProductNum(val,index){
        	    if(Number(val.stockProductNum)<=0||Number(val.stockProductNum) > Number(val.allocateProductNum)){
        	        this.tableData[index].stockProductNum = val.allocateProductNum;
                }
            },
            quickPay(){
        	    this.$router.push({path:'/sellerSettlementImmediately',query:{actualPayFee:Number(Number(this.totalFee) - Number(this.closeFee)).toFixed(2),backOrderId:this.orderId,customName:this.busiName,activeName:"second",saleCompanyId:this.saleCompanyId,payPath:'/sellReturnStorage?orderId='+this.orderId}});
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
                const res = await queryOrderDetailByOrderId(param);
                if (res.isSuccess) {
                    this.printrVo=res.result;
                	let order = res.result.order;
                	this.orderState = order.status;
                	this.closeFee = order.closeFee;
                	if(this.closeFee==undefined||this.closeFee==''){
                        this.closeFee = 0;
                    }
                	this.closingFee = order.closingFee;
                    this.busiName = order.busiName;
                    this.busiCompId = order.busiCompId;
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
                    this.image = res.result.data.results[0].imgUrl_main;
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
                    if(val[i].stockProductNum==undefined||val[i].stockProductNum==''||val[i].stockProductNum === 0){
                        val[i].stockProductNum = val[i].allocateProductNum;
                    }
                }
                this.multipleSelection = val;
            },
            //确认入库
            confirmInventory(){
                var array = [];
                this.totalN = 0;//总数
                this.totalCheckedNum = 0;//选中数
                if(this.multipleSelection==undefined||this.multipleSelection.length==0){
                    this.$message({
                        type:'error',
                        message:'请先勾选入库列表'
                    });
                    return;
                }
                this.multipleSelection.forEach((obj)=>{
                    let param = {
                        "id":obj.orderDetailId,
                        "allocateProductNum":obj.stockProductNum
                    };
                    this.totalN = this.totalN*1 + obj.orderNum*1;
                    this.totalCheckedNum= this.totalCheckedNum*1 + obj.stockProductNum*1;
                    array.push(param);
                });
                if(array.length==0){
                    this.$message({
                        type:'error',
                        message:'请先勾选入库列表'
                    });
                    return;
                }else if(Number(this.totalCheckedNum) > Number(this.totalN) || this.totalCheckedNum === 0){
                    this.$message({
                        type:'error',
                        message:'请填写正确的入库数量'
                    });
                    return;
                }
                this.dialog = true;
                this.orderDetails = array;
            },
            async partInventory() {
                let param = {
                    "orderId": this.orderId,
                    "auditFlag": 60,
                    "orderDetails": this.orderDetails
                }
                const res = await auditOrder(param);
                if (res.isSuccess) {
                    this.$message({
                        type: 'success',
                        message: '入库成功！'
                    });
                    this.$router.push('/sellReturn');
                }else{
                    this.$message({
                        type: 'error',
                        message:res.errorMsg
                    });
                }
                this.dialog = false;
            },
            async endInventory(){
                let param = {
                    "orderId": this.orderId,
                    "auditFlag": 40,
                    "orderDetails": this.orderDetails
                }
                const res = await auditOrder(param);
                if (res.isSuccess) {
                    this.$message({
                        type: 'success',
                        message: '入库成功！'
                    });
                    this.initData();
                }else{
                    this.$message({
                        type: 'error',
                        message:res.errorMsg
                    });
                }
                this.dialog = false;
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
                val.stockProductNum = val.allocateProductNum;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.initData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.initData();
            },
			printOrder(){
                var orderInfo=null;
                var orderDetailVo=null;
                var stallVo=null;
                printReturnOrder(this.printrVo.order,this.printrVo.data.results);
			},
        }
    }
</script>
<style lang="less" type="text/less">
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
