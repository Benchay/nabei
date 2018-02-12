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
        <div class="purchasing-content" style="height:77%;">
            <div class="purchasingAll">
                <div class="right">
                    <router-link :to='{path:this.backPath}' class="comeBack2" >返回</router-link>
                </div>
                <div class="orderDetails">
                    <div class="flex detailsLeft">
                        <img style="width: 80px; height: 80px;" :src="orderImgUrl_main" alt="暂无图片">
                        <div>
                            <p>订单编号：{{orderCode}}</p>
                            <p>档口名称：{{stallName}}({{returnmethod(this.smmethod)}})</p>
                            <p>总采购数：{{totalNum}}</p>
                        </div>
                    </div>
                    <div  class="detailsCenter">
                        <p>结算状态：{{this.Orderdata.closeStutas==0?'未结算':this.Orderdata.closeStutas==1?'已结算':this.Orderdata.closeStutas==2?'部分结算':''}}
                    </p>
                    <p>采购总金额：<span class="title">￥{{totalFee}}</span>
                    </p>
                    <p>已结算金额：<span class="title">￥{{alreadyFee}}</span></p>
                </div>
                    <div class="flex detailsRight">
                        <a href="javascript:void(0)" @click="findOrderLog">
                            <div>
                                <p class="red">订单动态</p>
                                <!--（待确认(待配货)（运输中）三种状态-->
                                <p>（{{formatScale(status)}}）</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="packageTabs">
                    <ul class="flex">
                        <li class="tabsLi">
                            <a href="javascript:void(0);" v-for="(obj,index) in packageList" @click="tabs(index)"  :class="{'change3':index === clickIndex2}" >{{obj.name}}</a>
                        </li>
                    </ul>
                </div>
                <div class="stocktakingTable">
                <div v-show="nobao">
                    <el-table
                        :data="tableData1"
                        :span-method="objectSpanMethod"
                        style="width: 100%">
                        <el-table-column
                            label="主图/货号"
                            prop="productCode">
                            <template scope="scope">
                                <div class="flex2" style="justify-content: start;">
                                    <img :src="scope.row.imgUrl_main" alt=""  class="tableImg">
                                    <p>{{scope.row.productCode}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="productName"
                            width="180"
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
                        prop="packedNum"
                            label="配货数量">
                        </el-table-column>
                        <el-table-column
                        prop="price"
                            label="单价">
                        </el-table-column>
                    </el-table>
                    </div>
                    <div v-show="hasbao">
                    <el-table
                        :data="tableData"
                        :span-method="objectSpanMethod"
                        style="width: 100%">
                        <el-table-column
                            label="主图/货号">
                            <template scope="scope">
                                <div class="flex2" style="justify-content: start;">
                                     <!-- <ul> -->
                                        <!-- <li v-for="item in scope.row.details"> -->
                                        <img :src="scope.row.imgUrl_main" alt=""  class="tableImg" style="display: inline-block; vertical-align: top;">
                                            <span style="display: inline-block; vertical-align: top; margin-top: 12px;">{{scope.row.details[0].productCode}}</span>
                                    <!-- </ul> -->
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="180"
                            label="商品名称">
                             <template scope="scope">
                                <!-- <ul> -->
                                    <!-- <li v-for="item in scope.row.details"> -->
                                     <p>{{scope.row.details[0].productName}}</p>
                                        <!-- </li> -->
                                <!-- </ul> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="颜色">
                            <template scope="scope">
                                <ul>
                                    <li v-for="item in scope.row.details">{{item.color}}</li>
                                </ul>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="尺码">
                             <template scope="scope">
                                <ul>
                                    <li v-for="item in scope.row.details">{{item.size}}</li>
                                </ul>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="配货数量">
                            <template scope="scope">
                                <ul>
                                    <li v-for="item in scope.row.details">{{item.packedNum}}</li>
                                </ul>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="单价">
                            <template scope="scope">
                                <ul>
                                    <li v-for="item in scope.row.details">{{item.unitPrice}}</li>
                                </ul>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                </div>
                <div class="right"style="margin-top: 20px">
                    <div class="purPendingButton" v-show="remind">
                        <a href="javascript:void(0)" class="buttonColor3" type="info" size="small"  @click="dialog = true">包裹动态</a>
                    </div>
                </div>
                <el-col :span="24">
                    <a href="javascript:void(0)" class="export_excle1">导出excel</a>
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
                </el-col>
            </div>
        </div>
        <el-dialog
            title="包裹动态"
            :visible.sync="dialog"
            size="small">
            <div class="dynamic">
                <el-col :span="12">档口名称：{{stallName}}</el-col>
                <el-col :span="12">拿货时间：{{orderTime}}</el-col>
                <el-col :span="12">订单编号：{{orderCode}}</el-col>
                <el-col :span="12">包裹编号：201201230256312020201</el-col>
            </div>
            <el-col class="dynamicList">
                <div class="track-rcol">
                    <div class="track-list">
                        <ul>
                            <li>
                                <i class="node-icon"></i>
                                <span class="time">2016-03-10 18:07:15</span>
                                <div class="txt">
                                    <p>已入库</p>
                                    <p>签收人：张晓梅</p>
                                    <p>联系电话：13465211349</p>
                                </div>
                            </li>
                            <li>
                                <i class="node-icon"></i>
                                <span class="time">2016-03-10 18:07:15</span>
                                <div class="txt">
                                    <p>待装车</p>
                                    <p>装车人：张晓梅</p>
                                    <p>联系电话：13465211349</p>
                                </div>
                            </li>
                            <li>
                                <i class="node-icon"></i>
                                <span class="time">2016-03-10 18:07:15</span>
                                <div class="txt">
                                    <p>待装车</p>
                                    <p>装车人：张晓梅</p>
                                    <p>联系电话：13465211349</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-dialog>
        <el-dialog
            title="订单动态"
            :visible.sync="dialog1"
            size="small">
            <div class="dynamic">
                <el-col :span="12">档口名称：{{stallName}}</el-col>
                <el-col :span="12">{{formatScale(status)}}</el-col>
                <el-col :span="12">订单编号：{{orderCode}}</el-col>
            </div>
            <el-col class="dynamicList">
                <div class="track-rcol">
                    <div class="track-list">
                        <ul>
                            <li class="flex" v-for="log in orderLog">
                                <i class="node-icon"></i>
                                <span class="time">{{formatOrderDate(log.createTime)}}</span>
                                <div class="txt">
                                    <p>{{log.description}}</p>
                                    <!--
                                    <p>操作人：{{log.nickName}}</p>
                                    <p>联系电话：{{log.mobile}}</p>-->
                                </div>
                            </li>
                            <!--<li>-->
                                <!--<i class="node-icon"></i>-->
                                <!--<span class="time">2016-03-10 18:07:15</span>-->
                                <!--<div class="txt">-->
                                    <!--<p>运输中</p>-->
                                <!--</div>-->
                            <!--</li>-->
                            <!--<li>-->
                                <!--<i class="node-icon"></i>-->
                                <!--<span class="time">2016-03-10 18:07:15</span>-->
                                <!--<div class="txt">-->
                                    <!--<p>待装车</p>-->
                                    <!--<p>装车人：张晓梅</p>-->
                                    <!--<p>联系电话：13465211349</p>-->
                                <!--</div>-->
                            <!--</li>-->
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-dialog>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    import {setStore, getStore} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {mydateFormat} from '../utils/dataFormater.js'
    import {isJson} from  '../utils/common'
    import {queryPackage,queryOrderPackedList,queryOrderLog,getOrder,loadPackageInfo,findOrderDetail} from '@/api/getData'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                identity:2,
            	roleForm: {
                    loginname: '',
                    userId: '',
                    roleId: '',
                    compId: '',
                    userName: ''
                },
                smmethod:'',
                Orderdata:'',
                hasbao:false,
                nobao: true,
                activeName:'second',
            	stallName:'',
            	orderCode:'',
                totalFee:'',
                alreadyFee:'',
                jiesuanstatus:'',
            	totalNum:'',
                orderTime:'',
                status:0,
                currentPage:1,
                pageSize:5,
                totalCount:0,
                packageIdlist:[],
                packageId:'',
                package1:false,
                remind:false,
                dialog:false,
                dialog1:false,
                num6:1,
                erweima:false,
                clickIndex2:0,
                packageList:[],
                unPackedList:[],
                items:[
                    {title:'全部'},
                    {title:'配货'},
                    {title:'退货'},
                ],
                tableDetails:[
                    {
                        name:'电商买家名称名称',
                        numbers: 'NG123',
                        checkDate:'2017-05-11 12:21:11',
                    }
                ],
                tableData: [],
                tableData1:[],
                productInfo:[],
                productDetail:[],
                orderId:'',
                orderLog:[],
                busiCompId:'',
                ddorderid:'',
                createType:'',
                getorderid:'',
                orderImgUrl_main:'',
                backPath:''
            }
        },
        watch:{
            '$route':function (route) {
                this.id = this.$route.query.id;
                this.backPath = this.$route.query.backPath;
                this.getOrdertodetail();
            },
        },

        mounted(){
                this.getLoginInfo();
                //测试代码
                this.id = this.$route.query.id;
            this.backPath = this.$route.query.backPath;
                this.getOrdertodetail();
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            getLoginInfo(){
                var userInfo = getStore("user_info_user");
                var vjson = JSON.parse(userInfo);

                this.roleForm.userId = vjson.id;
                this.roleForm.userName = vjson.userName;
                var currentComp = getStore("curCompany");
                var vcom = JSON.parse(currentComp);
                this.roleForm.compId = vcom.id;
            },
            checkSettlementStatus(val){
                if(this.Orderdata.payType==0){
                    return '已结算';
                }else{
                    if(val==undefined){
                        return '';
                    }else if(val == 0){
                        return '未结算';
                    }else if(val==1){
                        return '已结算';
                    }
                }
            },
            returnmethod(){
                if(this.smmethod ==0){
                    return '现结'
                }else if(this.smmethod ==1){
                    return '周结'
                }else if(this.smmethod ==2){
                    return '月结'
                }else if(this.smmethod ==3){
                    return '季结'
                }
            },
            //立即付款
            quickPay(){
                this.$router.push({path:'/stallSettlementImmediately',query:{backPath:'/orderPurchaseBuyDetails?id='+this.Orderdata.id,type:22,orderId:this.Orderdata.id,otherSideCompanyName:this.stallName,saleCompanyId:this.Orderdata.busiCompId}});
            },

            handleSizeChange(val) {
                this.pageSize = val;
                this.getOrdertodetail();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getOrdertodetail();
            },
            async getOrdertodetail() {
                let param = {
                    id: this.id,
                    getOrderId:1
                }
                const res = await getOrder(param);
                if (res.isSuccess == true) {
                    this.Orderdata = res.result;
                    this.orderId = res.result.orderId;
                    this.stallName= res.result.busiCompanyName;
                    this.orderCode = res.result.orderCode;
                    this.totalFee = res.result.totalFee;
                    this.status = res.result.status;
                    this.totalNum = res.result.totalNum;
                    this.alreadyFee = res.result.closeFee
                    this.jiesuanstatus = res.result.closeStutas
                    this.smmethod = res.result.payType
                    this.createType = res.result.createType
                    this.getorderid = res.result.id
                    this.initpapa()
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async initpapa(){
                if(this.createType == 0){
                    this.initloadData()
                }else if(this.createType == 1){
                    this.quiteorder()
                }
            },
            async initloadData(){
                this.packageList = [];
                let param = {
                    "orderId":this.orderId,
                    pageIndex:this.currentPage,
                };
                const res = await queryPackage(param);
                if(res.isSuccess){
                    let table = res.result.results;
                     if(table.length==0){
                        let p = {
                            list:'-1',
                            name:'未配货',
                            code:''
                        };
                        this.packageList.push(p);
                        this.packageId = this.packageList[0].list;
                    }else{
                        for(var i = 0 ;i<table.length;i++){
                            let pa = {
                                list:table[i].id,
                                name:'包裹'+(i+1)
                            };
                            this.packageList.push(pa);
                        }
                        this.packageId = this.packageList[0].list;

                    }
                            if(this.packageId=='-1'){
                                this.nobao = true;
                                this.hasbao = false;
                                this.queryNPackedInfo();
                            }else{
                                this.hasbao = true;
                                this.nobao = false;
                                this.loadOrderDetail();
                            }
                }
            },
            //快捷采购
               async quiteorder(){
                this.hasbao = false;
                 this.nobao = true;
                this.tableData1 = [];
                let param = {
                    "orderId":this.getorderid,
                    "packageFlag":1
                };
                const res = await findOrderDetail(param);
                if(res.isSuccess){
                   this.tableData1 = res.result.data;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
                this.package1 = true;
                this.remind = false;
            },
                //查询未配货详请
            async queryNPackedInfo(){
                this.tableData1 = [];
                let param = {
                    "orderId":this.orderId,
                    "packageFlag":1
                };
                const res = await findOrderDetail(param);
                if(res.isSuccess){
                    this.tableData1 = res.result.data;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
                if(this.status == "50"){
                    this.package1 = false;
                }else{
                    this.package1 = true;
                }
                this.remind = false;
            },
            //加载包裹详情
            async loadOrderDetail(){
                this.tableData = [];
                let param = {
                    packageId:this.packageId,
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize,
                };
                const res = await loadPackageInfo(param);
                if(res.isSuccess){
                    this.totalCount = res.result.data.totalCount;
                    let table = res.result.data.results;
                    for(let i = 0 ;i < table.length;i++){
                        this.tableData.push(table[i]);
                    }
                }else{
                    this.$message({
                        duration:this.GLOBAL.MESSAGE_DISSMISS_TIME_MID,
                        type:'error',
                        message:res.errorMsg
                    });
                    this.packageId = '';
                    return ;
                }
                this.remind = true;
                this.package1 = false;
            },
            tabs(index){
                this.clickIndex2 = index;
                this.packageId = this.packageList[index].list;
                console.log(this.packageId);
                if( this.packageId=='-1'){
                    this.remind = false;
                    this.package1 = true;
                   this.queryNPackedInfo();
                }else{
                    this.remind = true;
                    this.package1 = false;
                    this.loadOrderDetail();//加载订单详情
                }
            },
            findOrderLog(){
                this.queryOrderLogInfo();
            },
            //查询订单动态
            async queryOrderLogInfo(){
                this.logList = [];
                let param = {
                    "companyId":this.roleForm.compId,
                    "orderId":this.orderId,
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize
                };
                const res = await  queryOrderLog(param);
                if(res.isSuccess) {
                    let table = res.result.results;
                    for(var i = 0;i<table.length;i++){
                        this.logList.push(table[i]);
                        this.stallName = table[i].stallName;
                    }
                    this.dialog1 = true;
                }else{
                    this.$message({
                        type:'error',
                        message:res.errorMsg
                    });
                }
            },

            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                let data = row[column.property];
                for(let i = 0 ; i <this.productInfo.length;i++){
                    if(data==this.productInfo[i].productCode){
                        return {
                            rowspan:this.productInfo[i].details.length,
                            colspan:1
                        };
                    }
                }
            },


            formatOrderDate(time) {
                if(time==undefined||time==''){
                    return '';
                }

                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            },
            formatScale(scale) {
               if (scale == '1') {
                    return "待确认";
                } else if (scale == '2') {
                    return "待拿货";
                } else if (scale == '3') {
                    return "待装车";
                } else if (scale == '4') {
                    return "已完成";
                } else if (scale == '5') {
                    return "待配货";
                } else if (scale == '6') {
                    return "部分配货";
                } else if (scale == '9') {
                    return "待入库";
                } else if (scale == '99') {
                    return "已完成";
                } else if (scale == '50') {
                    return "已取消";
                }
            },

        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/purchasingManagement';
    @import "../style/indentManagement";

    .detailsLeft,.detailsCenter{
        @uicolor:#da444f;
        p{
            white-space: nowrap;
            .observe{
                border-color: @uicolor;
                color: @uicolor;
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
