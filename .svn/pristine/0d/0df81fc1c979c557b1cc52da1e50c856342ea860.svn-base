<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('fastShipping2')">
                <router-link :to='{path:"/fastShipping2"}'>快速出货</router-link>
            </li>
            <li v-if="getMenuAuthFun('returnManagement2')">
                <router-link :to='{path:"/returnManagement2"}'>快速退货</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('orderPurchaseStall')">
                <router-link :to='{path:"/orderPurchaseStall"}'>订单管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('sellerSettlement')">
                <router-link :to='{path:"/sellerSettlement"}'>卖家结算</router-link>
            </li>
            <li v-if="getMenuAuthFun('customerManagement')">
                <router-link :to='{path:"/customerManagement"}'>客户管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('statisticalStatement')">
                <router-link :to='{path:"/statisticalStatement"}'>销售统计</router-link>
            </li>
        </ul>
        <div class="purchasing-content" style="height:77%;">
            <div class="purchasingAll">
                <div class="right">
                    <router-link :to='{path:"/packageStall"}' class="comeBack">返回</router-link>
                </div>
                <div class="packageTabs">
                    <ul class="flex">
                        <li>
                        	<a href="javascript:void(0);" @click="packageListTab('',-1)"  :class="{'change2':titleIndex === -1}" >未打包</a>
                        	<a href="javascript:void(0);" v-for="(obj,index) in packageData" @click="packageListTab(obj.id,index)"  :class="{'change2':index === titleIndex}" >包裹{{index+1}}</a>
                        </li>
                    </ul>
                </div>
                <div class="orderForm">
                    <el-col :span="8">电商卖家：{{orderData.companyId}}</el-col>
                    <el-col :span="15">下单时间：{{orderData.orderTime | formatDate}}</el-col>
                    <el-col :span="8">订单编号：{{orderData.orderCode}}</el-col>
                    <el-col :span="15">包裹编号：</el-col>
                    <el-col :span="8">共计金额：{{orderData.totalFee}}</el-col>
                    <el-col :span="15">商品数量：{{orderData.totalNum}}</el-col>
                </div>
                <div class="stocktakingTable">
                    <el-table
                        :data="packageListData"
                        style="width: 100%">
                        <el-table-column
                            v-if="clickIndex2>0"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="主图/货号">
                            <template scope="scope">
                                <div class="flex2">
                                    <img src="../image/111.png" alt=""  class="tableImg">
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
                            prop="num"
                            label="配货数量">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="单价">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="right"style="margin-top: 20px">
                    <div class="purPendingButton"  v-if="titleIndex>-1">
                        <a href="javascript:void(0)" class="buttonColor" type="info" size="small"  @click="dialogErweuma = true">打印二维码</a>
                        <a href="javascript:void(0)" class="buttonColor" type="info" size="small"  @click="allocate">通知取货</a>
                    </div>
                    <div class="purPendingButton" v-if="titleIndex==-1">
                        <router-link :to='{path:"/packageStall"}' class="buttonColor right" >继续打包</router-link>

                    </div>
                </div>
                <el-col :span="24">
                    <a href="javascript:void(0)" @click="exportTableData" class="export_excle">导出excel</a>
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
                </el-col>
            </div>
        </div>
        <el-dialog
            title="删除包裹"
            :visible.sync="dialogDelete"
            size="tiny">
            <div class="flex2">
                <p>是否确认删除此包裹？</p>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                 <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
        </el-dialog>
        <el-dialog
            title="移除包裹"
            :visible.sync="dialogRemove"
            size="tiny">
            <div class="flex2">
                <p>是否确认移除此包裹？</p>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                 <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
        </el-dialog>
        <el-dialog
            title="打印二维码"
            :visible.sync="dialogErweuma"
            size="tiny">
            <div class="flex2">
                <img src="../image/erweima1.png" alt=""><p style="margin-left: 15px ">打印数量：</p><el-input-number size="small" v-model="num6" :min="1"></el-input-number>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                 <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
        </el-dialog>
        <el-dialog
            title="通知取货"
            :visible.sync="dialog"
            size="tiny">
            <div class="flex2 inform">
                <p>取货通知已发送给商家！</p>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
    import {setStore,getStore} from  '../config/mUtils'
    import {getOrder,queryOrderDetail,findPackage,queryPackageList,updatePackageByAllocate} from '@/api/getData'
    import {formatDate} from '../utils/date.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                dialog:false,
                num6:1,
                erweima:false,
                dialogErweuma:false,
                dialogRemove:false,
                dialogDelete:false,
                titleIndex:-1,
                orderId:getStore("orderId"),		//订单主表ID
                packageId:"",
                packageIdNull:false,
                orderData:[],
                orderDetailData:[],
                packageData:[],
                packageListData: [],
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
            }
        },
        async mounted(){
        	this.initOrderData();
			this.initOrderDetailData();
			this.initPackageData();
			this.exportInit();		//初始化导出excel
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
         	//加载订单数据
        	async initOrderData(){
        		let param ={
            		id:this.orderId
            	}
                const res = await getOrder(param);
                if (res.isSuccess == true) {
                    this.orderData = res.result.data;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
        	},
       		 //加载待配货订单明细信息
        	async initOrderDetailData(){
        		let param ={
            		orderId:this.orderId,
            		packageIdNull:true
            	}
                const res = await queryOrderDetail(param);
                if (res.isSuccess == true) {
                    this.packageListData = res.result.data.results;
                    this.totalCount = res.result.data.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
        	},
        	 //加载包裹数据
        	async initPackageData(){
        		let param ={
            		orderId:this.orderId
            	}
                const res = await findPackage(param);
                if (res.isSuccess == true) {
                    this.packageData = res.result.data;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
        	},
       	 	//加载订单详情数据
            async initPackageListData() {
            	let param ={
            		packageId:this.packageId,
            		packageIdNull:false
            	}
                const res = await queryPackageList(param);
                if (res.isSuccess == true) {
                    this.packageListData = res.result.data.results;
                    this.totalCount = res.result.data.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            //通知取货
            async allocate() {
            	let param ={
            		orderIds:[this.orderId]
            	}
            	const res = await updatePackageByAllocate(param);
                if (res.isSuccess == true) {
                	 this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            packageListTab(packageId,index) {
            	this.titleIndex = index;
                this.packageId = packageId;
                if(this.packageId != "") {		//空包裹清单列表
                	this.initPackageListData();
                } else {					//显示未打包的订单明细列表
                	this.initOrderDetailData();
                }
            },
            handleCurrentChange:function(val) {
                this.currentPage = val;
                this.initPackageListData();
            },
            exportInit(){
	        	const s = document.createElement('script');
				s.type = 'text/javascript';
				s.src = 'http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js';
				document.body.appendChild(s);
        	},
            async exportTableData() {
            	const list = this.packageListData;
                const tHeader = ['货号', '商品名称','颜色','尺码','配货数量','单价'];
			　　　const filterVal = ['productCode', 'productName','color','size','num','price'];
			　　　const data = this.formatJson(filterVal, list);
			　　　export_json_to_excel(tHeader, data, '配货清单');
            },
            formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
		　　　}
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/purchasingManagement';
    @import "../style/indentManagement";
</style>
