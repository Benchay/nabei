<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('stallProductManagement')">
                <router-link :to='{path:"/stallProductManagement"}'>商品管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('classificationGoods')">
                <router-link :to='{path:"/classificationGoods"}'>商品分类</router-link>
            </li>
            <li v-if="getMenuAuthFun('commodityStatistics')">
                <router-link :to='{path:"/commodityStatistics"}'>商品统计</router-link>
            </li>
            <li v-if="getMenuAuthFun('bindstallshop')">
                <router-link :to='{path:"/bindstallshop"}'>绑定店铺</router-link>
            </li>
            <li class="menuIndex">
                <router-link :to='{path:"/spreadLabel"}'>推广标签</router-link>
            </li>
        </ul>
        <div class="product">
            <router-link :to='{path:"/spreadLabel"}' class="comeBack right">返回</router-link>
            <div class="flex productTop">
                <el-input
                    size="small"
                    placeholder="供应商搜索"
                    icon="search"
                    v-model="supplierName"
                    :on-icon-click="initloadData">
                </el-input>
                <el-input
                    size="small"
                    placeholder="货号搜索"
                    icon="search"
                    v-model="productCode"
                    :on-icon-click="initloadData">
                </el-input>
            </div>
            <div class="productTable">
                <p class="title">{{spreadLabelName}}列表：</p>
                <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        label="主图/货号">
                        <template scope="scope">
                            <div class="flex2 tableFirst" style="justify-content: start; padding: 3px;">
                                <img v-if="scope.row.imgUrl_main !=''" :src="scope.row.imgUrl_main" alt=""  class="tableImg">
                                <img v-else src="../image/product_default.png" alt=""  class="tableImg">
                                <p>{{tableData[scope.$index].productCode}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="supplierName"
                        label="供应商">
                    </el-table-column>
                    <el-table-column
                        prop="catelogName"
                        label="类别">
                    </el-table-column>
                    <el-table-column
                        prop="sellPrice"
                        label="批发价">
                    </el-table-column>
                    <el-table-column
                        prop="stockNum"
                        label="库存数">
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
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
            <a href="javascript:void(0)" @click="exportClassDetailData" class="export_excle">导出excel</a>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {querySpreadLabelProduct} from '@/api/getData'
	import {userInfo} from  '../config/mUtils'
	import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
	import {export_json_to_excel} from '../vendor/Export2Excel.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
            	spreadLabelId:'',
            	
            	spreadLabelName:'',

            	productLabelId:'',
            	
            	supplierName:'',
            	
            	productCode:'',

            	//默认每页数据量
                pageSize: 10,
                //当前页码
                currentPage: 1,

                totalCount:0,

                tableData: [],

                options: [],//推广标签集
            }
        },
        mounted(){
        	this.spreadLabelId = this.$route.query.spreadLabelId;
        	this.spreadLabelName = this.$route.query.spreadLabelName;
            this.initloadData();
            //this.initloadSpreadLabelData();
        },
        watch:{
           '$route':function (route) {
               this.spreadLabelId = this.$route.query.spreadLabelId;
        	   this.spreadLabelName = this.$route.query.spreadLabelName;
               this.initloadData();
               //this.initloadSpreadLabelData();
           }
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
        	async initloadData(){
        		this.tableData = [];
				let param ={
            		pageIndex:this.currentPage,
    				pageSize:this.pageSize,
    				spreadLabelId:this.spreadLabelId,
    				supplierName:this.supplierName,
    				productCode:this.productCode
            	}

				const res = await querySpreadLabelProduct(param);
                if (res.isSuccess == true) {
                	this.tableData = res.result.results;
                	if(this.currentPage == 1){
                		this.totalCount =  res.result.totalCount;
                	}
                }
            },

            //从服务器获取数据
            async initloadCatalogData() {
            	this.tableData = [];
            	let param ={
            		companyId:userInfo().companyId,
            		pageIndex:1,
    				pageSize:this.pageSize
            	}
                const res = await queryProductCatalog(param);
                if (res.isSuccess == true) {
                	this.options = res.result.results;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            handleIconClick(){
                console.log(1)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            async addProductCatalog(){
				let param = {
					name:this.addCatalogName,
					companyId:userInfo().companyId
				};
              	const res = await addProductCatalog(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                     this.dialogVisible3 = false;
                     this.initloadData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
          },

            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },

            batchDeleteConfig() {
		    	if(this.multipleSelection == undefined || this.multipleSelection.length==0){
		    		this.$message({
                        type: 'error',
                        message: '请先勾选要删除的商品！'
                    });
                    return;
		    	}
                var array = [];
                this.multipleSelection.forEach((item) => {
                    array.push(item.id);
                })
                if(array.length <1){
                	this.$message({
                        type: 'error',
                        message: '请先勾选要删除的商品！'
                    });
                    return;
                }
		        this.$confirm('是否确认删除选中的商品?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.batchDelete(array);
		        }).catch(() => {

		        });
		    },

		    async batchDelete(array){
                let param = {
                	productIds:array
                }
                const res = await batchUpdateProductCatalog(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.initloadData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            checkProductCatalog(){
            	if(this.productCatalog == ''){
            		return;
            	}
            	if(this.multipleSelection == undefined || this.multipleSelection.length==0){
		    		this.$message({
                        type: 'error',
                        message: '请先勾选要修改的商品！'
                    });
                    this.productCatalog = '';
                    return;
		    	}
                var array = [];
                this.multipleSelection.forEach((item) => {
                    array.push(item.id);
                })
                if(array.length <1){
                	this.$message({
                        type: 'error',
                        message: '请先勾选要修改的商品！'
                    });
                    this.productCatalog = '';
                    return;
                }
		        this.$confirm('是否确认修改选中的商品?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.batchUpdate(array);
		        }).catch(() => {
					this.productCatalog = '';
		        });
           },

           async batchUpdate(array){
                let param = {
                	productIds:array,
                	productCatalogId:this.productCatalog
                }
                const res = await batchUpdateProductCatalog(param);
                this.productCatalog = '';
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
                this.initloadData();

            },
            
            exportClassDetailData(){
          	  const tHeader = ['货号', '供应商','类别','销售价','库存数','最近一周销量'];
		　　　  const filterVal = ['productCode', 'supplierName', 'catelogName', 'sellPrice','stockNum','salesVolume'];
		　　　  const list = this.tableData;
		　　　  const data = this.formatJson(filterVal, list);
		　　　  export_json_to_excel(tHeader, data, '商品分类详情页');
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
    @import '../style/stallProductManagement';
</style>
