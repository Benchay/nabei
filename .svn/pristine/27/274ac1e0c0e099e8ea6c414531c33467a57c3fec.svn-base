<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('stallProcurement')">
                <router-link :to='{path:"/stallProcurement"}'>采购入库</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('stallPurchase')">
                <router-link :to='{path:"/stallPurchase"}'>采购退货</router-link>
            </li>
            <li v-if="getMenuAuthFun('supplierManagement')">
                <router-link :to='{path:"/supplierManagement"}'>供应商管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('purchaseStatistics')">
                <router-link :to='{path:"/purchaseStatistics"}'>采购统计</router-link>
            </li>
        </ul>
        <div class="stallProcurement">
            <div style="height: 30px;">
                <router-link :to='{path:"/stallPurchase"}' class="comeBack right">返回</router-link>
            </div>
            <div class="stallTable">
                <div class="tableTop">
                    <div class="flex left">
                        <div>供应商：{{stockOrder.otherSideCompanyName}}</div>
                        <div>提交人：{{stockOrder.createUserName}}</div>
                        <div>总数量：{{stockOrder.orderNum}}</div>
                        <div>退货总价：{{totalPrice}}</div>
                    </div>
                </div>
                <el-table
                    :data="stockOrder.details"
                    style="width: 100%">
                    <el-table-column
                        label="主图/货号">
                        <template scope="scope">
                            <div class="flex" style="padding: 3px;">
                            	<img v-if="scope.row.imgUrl_main != ''" :src="scope.row.imgUrl_main" alt="">
                                <img v-else src="../image/product_default.png" alt="">
                                <p>{{scope.row.productCode}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="colour"
                        label="颜色">
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="尺码">
                    </el-table-column>
                    <el-table-column
                        prop="orderNum"
                        label="退货数量">
                    </el-table-column>
                    <el-table-column
                    	prop="price"
                        label="退货总价"
                        :formatter="priceFormat">
                    </el-table-column>

                </el-table>
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
            </div>
            <div class="date">
                <p>创建时间：{{stockOrder.createTime}}</p>
                <!--根据状态显示-->
                <p v-if="state == 1 ">签收时间：{{stockOrder.updateTime}}</p>
                <!---->
            </div>
            <a href="javascript:void(0)" @click="exportData" class="export_excle">导出excel</a>
            <div style="height: 160px;">
                &nbsp;
            </div>
        </div>
    </div>
</template>

<script>
    import {loadStockOrder} from '@/api/getData'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'


    export default {
        components: {

        },
        data() {
            return {
                state:2,
                stockOrder:{},
                totalPrice:0,
                //当前页码
                currentPage: 1,

                pageSize:10,

                //默认数据总数
                totalCount: 0,
                
                stockOrderId:'',
            }
        },

        watch: {
            '$route': function (route) {
                this.stockOrderId = this.$route.query.param;
                this.loadData();

            }
        },
        mounted(){
            this.stockOrderId = this.$route.query.param;
            this.loadData();
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.loadData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.loadData();
            },
            async loadData() {
                //  /api/queryStockOrderDetail?companyId=1000&warehouseId=W001&orderType=2,3&pageIndex=1&pageSize=10
                if(this.stockOrderId == undefined || this.stockOrderId == ''){
                	return;
                }
                let  requestParam = {
                    stockOrderId:this.stockOrderId,
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize
                };
                this.totalPrice = 0;
                const res = await loadStockOrder(requestParam);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '加载数据成功'
                    });
                    this.stockOrder = res.result;
                    this.totalCount = this.stockOrder.totalCount;
                    this.stockOrder.details.forEach((obj) => {
                    	if(obj.orderNum && obj.price){
                    		this.totalPrice = this.totalPrice + obj.orderNum*obj.price;
                    	}
                    });
                    this.totalPrice = Math.abs(this.totalPrice).toFixed(2);
                    this.stockOrder.createTime = formatDate(this.stockOrder.createTime,'yyyy-MM-dd hh:mm');
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            priceFormat:function(row, column) {
			    let price = row.price;
			    let orderNum = row.orderNum;
			    if(price && orderNum){
			    	let totalPrice = price*orderNum;
			    	return Math.abs(totalPrice).toFixed(2);
			    }
			    return 0;
			},

			async exportData(){
            	let params = {
        			stockOrderId:this.stockOrderId
        		}

                const res = await loadStockOrder(params);
            	if (res.isSuccess == true) {
                    const tHeader = ['货号', '颜色','尺码','采购数量','采购成本/元'];
			　　　    const filterVal = ['productCode', 'colour','size','orderNum','price'];
			　　　    const list = [];
					res.result.details.forEach(obj => {
						let price = '';
						if(obj.price){
							let totalPrice = obj.price*obj.orderNum;
							price = Math.abs(totalPrice).toFixed(2);
						}
						let row = {
							productCode:obj.productCode,
							colour:obj.colour,
							size:obj.size,
							orderNum:obj.orderNum,
							price:price
						}
						list.push(row);
					});
			　　　   const data = this.formatJson(filterVal, list);
			　　　   export_json_to_excel(tHeader, data, '采购退货详情数据');
                }


          },

          formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]));
		　　　},
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stallProcurement';
</style>
