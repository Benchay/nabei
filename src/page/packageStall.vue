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
       <div class="Picking">
            <div style="height: 20px;">
                <router-link :to='{path:"/orderPurchaseStall"}' class="comeBack right">返回</router-link>
            </div>
           <el-col :span="12" class="isLeft">
               <p class="title">待配货清单</p>
               <el-table
                   ref="multipleTable"
                   :data="orderDetailData"
                   @selection-change="handOrderDetailChange"
                   height="400"
                   style="width: 100%">
                   <el-table-column
                       type="selection"
                       width="55">
                   </el-table-column>
                   <el-table-column
                       width="150"
                       label="主图/货号">
                       <template scope="scope">
                           <div class="flex2">
                               <img src="../image/111.png" alt=""  class="tableImg">
                               <p>MG110</p>
                           </div>
                       </template>
                   </el-table-column>
                   <el-table-column
                       prop="color"
                       label="颜色">
                   </el-table-column>
                   <el-table-column
                       prop="size"
                       label="尺码"
                       width="120">
                   </el-table-column>
                   <el-table-column
                       prop="number"
                       label="数量">
                   </el-table-column>
                   <el-table-column
                       prop="price"
                       label="单价">
                   </el-table-column>
               </el-table>
               <div class="flex2 leftButton">
                   <a href="javascript:void(0)"  @click="addToPackageByOrderDetail()" class="buttonColor">加入包裹清单</a>
                   <router-link :to='{path:"/packageListStall",query:{orderId:orderId}}' class="buttonColor">完成打包</router-link>
                   <a href="javascript:void(0)" class=""></a>
               </div>
           </el-col>
           <el-col :span="12" class="isLeft">
               <div class="title flex">
               <ul>
                   <li>
                       <a href="javascript:void(0);" v-for="(obj,index) in packageData" @click="tabs(obj.id,index)"  :class="{'change2':index === clickIndex}" >包裹{{index+1}}</a>
                   </li>
               </ul>
                   <a href="javascript:void(0)" @click="addPackage()" class="blue2">+添加包裹</a>
               </div>
               <el-table
                   ref="multipleTable"
                   :data="packageListData"
                   @selection-change="handPackageListChange"
                   height="400"
                   style="width: 100%">
                   <el-table-column
                       type="selection"
                       width="55">
                   </el-table-column>
                   <el-table-column
                       width="150"
                       label="主图/货号">
                       <template scope="scope">
                           <div class="flex2">
                               <img src="../image/111.png" alt=""  class="tableImg">
                               <p>MG110</p>
                           </div>
                       </template>
                   </el-table-column>
                   <el-table-column
                       prop="color"
                       label="颜色">
                   </el-table-column>
                   <el-table-column
                       prop="size"
                       label="尺码"
                       width="120">
                   </el-table-column>
                   <el-table-column
                       prop="number"
                       label="数量">
                   </el-table-column>
                   <el-table-column
                       prop="price"
                       label="单价">
                   </el-table-column>
               </el-table>
               <div class="flex2 leftButton">
                   <a href="javascript:void(0)" @click="removePackage()" class="buttonColor">移出包裹</a>
                   <a href="javascript:void(0)" @click="deletePackage()" class="buttonColor">删除包裹</a>
               </div>
           </el-col>
       </div>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    import {setStore,getStore} from  '../config/mUtils'
    import {findOrderDetail,findPackage,findPackageList,createPackageByOrderDetail,removeToPackageByOrderDetail,deletePackageList,deletePackage,updatePackageByAllocate} from '@/api/getData'
    import {formatDate} from '../utils/date.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        filters:{
        	formatDate(time){
        		return formatDate(time,"yyyy-MM-dd hh:mm:ss");
        	}
        },
        data() {
            return {
                clickIndex:0,
                orderId:getStore("orderId"),		//订单主表ID
                packageId:"",
                orderDetailData:[],		//待配货
                packageListData:[],		//包裹清单列表
                packageData:[],		//包裹列表
                currentComp:{id:'1'}		//用户登录信息暂时写死
            }
        },
        async mounted(){
			this.initOrderDetailData();
			this.initPackageData();
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
       		 //加载待配货订单明细信息
        	async initOrderDetailData(){
        		let param ={
            		orderId:this.orderId,
            		packageIdNull:true
            	}
                const res = await findOrderDetail(param);
                if (res.isSuccess == true) {
                    this.orderDetailData = res.result.data;
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
                    if(this.packageData.length > 0) {
                    	this.packageId = res.result.data[0].id;
                    	this.initPackageListData();
                    }
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
                const res = await findPackageList(param);
                if (res.isSuccess == true) {
                    this.packageListData = res.result.data;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
        	//添加包裹
        	async addPackage(){
        		var order = {id:""};
        		var isAdd = true;
        		for(var key in this.packageData) {
        			if(this.packageData[key].id == "") {
        				isAdd = false;
        				break;
        			}
        		}
        		if(this.packageData.length == 0 || isAdd) {
        			this.packageData.push(order);
        			return;
        		}
        	},
        	//添加到包裹清单
        	async addToPackageByOrderDetail() {
        		var orderDetailIds = [];
        		if(!this.orderDetailSelect || this.orderDetailSelect.length==0){
                    this.$message({
                        type: 'error',
                        message: '请先选择待配货清单！'
                    });
                    return;
                }
                this.orderDetailSelect.forEach((item) => {
                    orderDetailIds.push(item.id);
                });

                let param = {
                	orderDetailIds:orderDetailIds,
                	packageId:this.packageId,
                	companyId:this.currentComp.id
                };
                var res;
                if(this.packageId == "") {		//新建包裹
                	res= await createPackageByOrderDetail(param);
                } else {					//移动到某个包裹
                	res= await removeToPackageByOrderDetail(param);
                }
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
                this.$router.go(0);
        	},
        	async removePackage(){		//移出包裹
        		var packageListIds = [];
        		if((!this.packageListSelect) || this.packageListSelect.length == 0) {
        			this.$message({
                        type: 'error',
                        message: '请选择包裹清单'
                    });
                    return;
        		}
                this.packageListSelect.forEach((item) => {
                    packageListIds.push(item.id);
                })
                let param = {
                	packageListIds:packageListIds
                }
                const res = await deletePackageList(param);
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
                this.$router.go(0);
        	},
        	async deletePackage(){		//删除包裹
        		if(this.packageId == ''){
        			this.$message({
                        type: 'error',
                        message: '请选择包裹'
                    });
                    return;
        		}
                let param = {
                	packageId:this.packageId
                }
               const res = await deletePackage(param);
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
                this.$router.go(0);
        	},
        	handOrderDetailChange: function(val) {	//多选
                this.orderDetailSelect = val;
            },
            handPackageListChange: function(val) {	//多选
                this.packageListSelect = val;
            },
            tabs(packageId,index){
             	this.clickIndex = index;
                this.packageId = packageId;
                if(this.packageId != "") {
                	this.initPackageListData();
                } else {			//空包裹不显示列表
                	this.packageListData = [];
                }
            }
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import "../style/indentManagement";
</style>
