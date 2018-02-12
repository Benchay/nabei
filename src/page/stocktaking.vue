<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('currentInventory')">
                <router-link :to='{path:"/currentInventory"}'>当前库存</router-link>
            </li>
            <li v-if="getMenuAuthFun('inventoryDetail')">
                <router-link :to='{path:"/inventoryDetail"}'>库存变动</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('stocktaking')">
                <router-link :to='{path:"/stocktaking"}'>库存盘点</router-link>
            </li>
            <li v-if="getMenuAuthFun('stockTransshipment')">
                <router-link :to='{path:"/stockTransshipment"}'>库存调拨</router-link>
            </li>
            <li v-if="getMenuAuthFun('inventoryWarning')">
                <router-link :to='{path:"/inventoryWarning"}'>库存预警</router-link>
            </li>
            <li v-if="getMenuAuthFun('storeManagement')">
                <router-link :to='{path:"/storeManagement"}'>多仓管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('inventoryInitialize')">
                <router-link :to='{path:"/inventoryInitialize"}'>库存初始化</router-link>
            </li>
        </ul>
        <div class="stocktaking">
            <div class="stocktakingTop">
                <div class="left">
                    <el-date-picker
                        size="small"
                        v-model="filters.startDate"
                        type="date"
                        placeholder="选择开始日期"
                        :picker-options="startDateBefore"
                        @change="startDateChanged"
                    >
                    </el-date-picker>
                    -
                    <el-date-picker
                        size="small"
                        v-model="filters.endDate"
                        type="date"
                        placeholder="选择截止日期"
                        :picker-options="startDateAfter"
                        @change="dateQuery"
                    >
                    </el-date-picker>
                </div>
                <el-select
                    v-model="searchParam.createUserId"
                    size="small"
                    filterable
                    clearable
                    remote
                    reserve-keyword
                    placeholder="盘点人搜索"
                    :remote-method="querySearch"
                    :loading="loading"
                    @change="query">
                    <el-option
                        v-for="item in userOptions"
                        :key="item.userId"
                        :label="item.userName"
                        :value="item.userId">
                    </el-option>
                </el-select>
            </div>
            <div class="stocktakingButton">
                <router-link :to='{path:"/startCounting"}' class="buttonColor">开始盘点</router-link>
                <a href="javascript:void(0)" class="buttonColor" @click="difference">差异表</a>
            </div>
            <div class="stockTabs">
                <el-radio-group v-model="status" class="radioGreen" size="small">
                    <el-radio-button label="全部" @click.native="filterStatus()"></el-radio-button>
                    <el-radio-button label="未完成" @click.native="filterStatus(0)"></el-radio-button>
                    <el-radio-button label="已完成" @click.native="filterStatus(1)"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="stocktakingTable">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="orderNo"
                        width="200"
                        label="盘点编号">
                    </el-table-column>
                    <el-table-column
                        prop="checkedStockNum"
                        label="结存">
                    </el-table-column>
                    <el-table-column
                        prop="checkActualNum"
                        label="实盘数">
                    </el-table-column>
                    <el-table-column
                        prop="changeNum"
                        label="盈亏数">
                        <template scope="scope">
                            {{scope.row.checkActualNum-scope.row.checkedStockNum}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="totalStockFee"
                        label="盈亏金额">
						 <template scope="scope">
                            {{scope.row.totalStockFee?scope.row.totalStockFee.toFixed(2):0.00.toFixed(2)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createUserName"
                        label="盘点人">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="盘点时间"
                        :formatter="mydateFormat">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态">
                        <template scope="scope">
                            <p v-bind:class="scope.row.status ==0?'blue2':''">{{scope.row.status == 1?'完成盘点':scope.row.status == 0?'草稿':''}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <router-link :to='{path:"/stocktakingRecord",query:{param:scope.row.storeOrderId,orderNo:scope.row.orderNo}}' class="blue2">盘点详情</router-link>
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
            <a href="javascript:void(0)" @click="exportData" class="export_excle">导出excel</a>
            <div style="height:160px;">
                &nbsp;
            </div>
        </div>
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            size="tiny">
            <div class="InInventory flex">
                <span>当前不可盘点！</span>
                <p>（该商品正在盘点中）</p>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {loadCompanyUserInfo,queryProductInfo,queryStockChecked} from '@/api/getData'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    import {formatDate} from '../utils/date.js'
	import {mydateFormat} from '../utils/dataFormater.js'
	import {export_json_to_excel} from '../vendor/Export2Excel.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
            	loading:false,
            	userOptions:[],
                filters:{
                    startDate:'',
                    endDate:'',
                },
                startDateBefore:{
                    disabledDate: (time) => {
                        let beginDateVal = this.filters.endDate;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                startDateAfter:{
                    disabledDate: (time) => {
                        let beginDateVal = this.filters.startDate;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
                searchParam:{
                	startDate:'',
                    endDate:'',
                    createUserId:''
                },
                status:'',
                input:'',
                input2:'',
                input_productCode:'',
                radio3:'',
                radio4:'',
                value6:'',
                num6:1,
                dialogVisible:false,//TODO
                productInfo:'',
                productConfigs:{
                    productInfo:{name:'',stockNum:''},
                    sizeSet:[],
                    colourSet:[]
                },
                detailForm:{},
                checkedDetails:[],
                tableData: [],
                tableData2:[],
                //默认每页数据量
                pageSize: 10,
                //默认高亮行数据id
                highlightId: -1,
                //当前页码
                currentPage: 1,
                //查询的页码
                start: 1,
                //默认数据总数
                totalCount: 0
            }
        },
        methods: {
        	mydateFormat,
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
           },
            handleIconClick(ev) {
                this.countingShow = true;
                this.getProductVariantByProductCode();
                console.log(this.productConfigs.productInfo);
            },
            ConfirmInventory(){
                this.dialogStartCounting = false;

                this.$router.push('/stocktakingRecordList');
            },
            difference(){
                this.$router.push('/stocktakingDifference');
            },
            startDateChanged(date){
            	if(date){
            		this.searchParam.startDate = date;
            	}else{
            		this.searchParam.startDate = '';
            	}
				  this.query();
            },
            dateQuery(date){
                if(date){
                    this.searchParam.endDate = date;
                }else{
                    this.searchParam.endDate = '';
                }
                this.query();
            },
            query(){
            	//alert(JSON.stringify(this.searchParam))
            	let  param = {
	                "companyId":userInfo().companyId,
	                "warehouseId":userInfo().warehouseId,
	                "searchParam":JSON.stringify(this.searchParam),
	                "orderType":"4,5",
	                "pageSize": this.pageSize,
	                "pageIndex": this.start,
	            };
	            this.loadData(param);
            },
            async querySearch(queryString){
            	if(queryString!=''){
            		this.loading = true;
            		var curComp = userInfo().curCompany;
	            	let param = {
	            		"CompanyUser": {
					        "compId": curComp.id,
					        "userName":queryString.trim()
					    },
					    "pageIndex": 1,
					    "pageSize": 10
	            	}
	            	//alert(JSON.stringify(param))
	            	const res = await loadCompanyUserInfo(param);
	            	window.clearTimeout(this.timeout);
	            	this.timeout = setTimeout(() => {
                        this.loading = false;
                        if(res.isSuccess){
		            		//alert(JSON.stringify(res.result.CompanyUser))
		            		this.userOptions = res.result.CompanyUser;
		            	}else{
/* 		            		this.$message({
		            			type:'error',
		            			message:res.errorMsg
		            		}); */
							this.userOptions =[];
		            	}
                    }, 200);
            	}else{
            		this.userOptions = [];
            		this.filters.createUserId = '';
            	}
            },
            handleSizeChange: function(val) {
                this.pageSize = val;	
				this.start = this.currentPage;
                this.query()
				this.start =1;
				
            },
            //页码变更
            handleCurrentChange: function(val) {
                this.currentPage = val;
				this.start = val;
                this.query()
				this.start =1;
            },
            async loadData(param) {
                const res = await queryStockChecked(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '加载数据成功'
                    });
                    this.tableData = res.result.results;
                    this.totalCount = res.result.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async getProductVariantByProductCode() {

                let  param = {
                    "companyId":userInfo().companyId,
                    "warehouseId":userInfo().warehouseId,
                    "productCode":this.input_productCode
                };

                const res = await queryProductInfo(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '加载数据成功'
                    });
                    this.filterProductConfigs(res.result);

                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
      
            filterProductConfigs(productInfo){
                if(productInfo.length>0){
                    this.productConfigs.productInfo.name =productInfo[0].title;
                    let productNum  =0;
                    productInfo.forEach((obj) => productNum+=obj.stockNum);
                    this.productConfigs.productInfo.stockNum =productNum;
                    let sizeSet = new Set();
                    productInfo.forEach((obj) => sizeSet.add(obj.size));
                    this.productConfigs.sizeSet = [...sizeSet];
                    let colourSet = new Set();
                    productInfo.forEach((obj) => colourSet.add(obj.colour));
                    this.productConfigs.colourSet = [...colourSet];


                }

            },
            filterVariantInfo(s_size,s_colour){
                for ({size,colour,productVariantId} of this.productInfo) {
                     if(size==s_size&&colour==s_colour){
                         return productVariantId
                     }
                }
            },
            filterStatus(status){
                let  param = {
                    "companyId":userInfo().companyId,
                    "warehouseId":userInfo().warehouseId,
                    "orderType":"4,5",
                    "pageSize": this.pageSize,
                    "pageIndex": this.start,
                };
                if(status!=undefined){
                    param.status=status;
					let  searchParam  = {"status":status};
					param.searchParam = JSON.stringify(searchParam);
                }
				
                this.loadData(param);
            },
            
            //导出文档
			async exportData() {
			   let  param = {
	                "companyId":userInfo().companyId,
	                "warehouseId":userInfo().warehouseId,
	                "searchParam":JSON.stringify(this.searchParam),
	                "orderType":"4,5",
	                "pageSize": this.totalCount,
	                "pageIndex": 1,
	            };
               const res = await queryStockChecked(param);
               const list = [];
                if (res.isSuccess == true) {
                    res.result.results.forEach(obj => {
                    	let orderNo= '' ;//盘点编号
                    	let checkedStockNum = '0';//库存数
                    	let checkActualNum = '0';//盘点数
                    	let changeNum = '0';//盈亏数
                    	let totalStockFee = '0.00';//盈亏金额
                    	let createUserName = '';//盘点人
                    	let createTime = '';//盘点时间
                    	let status = ''; //状态
                    	if(obj.orderNo){
                    		orderNo = obj.orderNo;
                    	}
                    	if(obj.checkedStockNum){
                    		checkedStockNum = obj.checkedStockNum;
                    	}
                    	if(obj.checkActualNum){
                    		checkActualNum = obj.checkActualNum;
                    	}
                    	if(obj.checkActualNum && obj.checkedStockNum){
                    		changeNum = obj.checkActualNum-obj.checkedStockNum;
                    	}
                    	if(obj.totalStockFee){
                    		totalStockFee = obj.totalStockFee.toFixed(2);
                    	}
                    	if(obj.createUserName){
                    		createUserName = obj.createUserName;
                    	}
                    	if(obj.createTime){
                    		createTime = formatDate(new Date(obj.createTime),'yyyy-MM-dd hh:mm');
                    	}
                    	if(obj.status && obj.status == 1){
                    		status = "盘点成功";
                    	}else{
                    		status = "草稿";
                    	}
                    	let row = {
		            		orderNo : orderNo,
							checkedStockNum : checkedStockNum,
							checkActualNum : checkActualNum,
							changeNum : changeNum,
							totalStockFee : totalStockFee,
							createUserName : createUserName,
							createTime: createTime,
							status: status
		            	}
		            	list.push(row);
                    });

                    const tHeader = ['盘点编号', '库存数','盘点数','盈亏数','盈亏金额','盘点人','盘点时间','状态'];
			　　　　const filterVal = ['orderNo', 'checkedStockNum','checkActualNum','changeNum','totalStockFee','createUserName','createTime','status'];
			　　　　const data = this.formatJson(filterVal, list);
			　　　　export_json_to_excel(tHeader, data, '库存盘点列表');
                }
            },
            
            formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]));
		　　　},
			formatDate,
        },

        mounted(){
            let  param = {
                "companyId":userInfo().companyId,
                "warehouseId":userInfo().warehouseId,
                "orderType":"4,5",
                "pageSize": this.pageSize,
                "pageIndex": this.start,
            };
            this.loadData(param);
        },

        watch: {
            '$route': function (route) {
                if(route.path=='/stocktaking'){
                    let  param = {
                        "companyId":userInfo().companyId,
                        "warehouseId":userInfo().warehouseId,
                        "orderType":"4,5",
                        "pageSize": this.pageSize,
                        "pageIndex": this.start,
                    };
                    this.loadData(param);
                }
            }

        },
        created () {
            this.intervalid1 = setInterval(() => {
                this.dialogVisible = false;
            }, 1000)
        },
        beforeDestroy(){
            clearInterval(this.intervalid1)
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stocktaking';
</style>
