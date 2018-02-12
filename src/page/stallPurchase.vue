<template>
    <div class="fillcontain"
    	v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
        <ul class="menu">
            <li v-if="getMenuAuthFun('stallProcurement')">
                <router-link :to='{path:"/stallProcurement"}'>采购入库</router-link>
            </li>
            <li  class="menuIndex" v-if="getMenuAuthFun('stallPurchase')">
                <router-link :to='{path:"/stallPurchase"}'>采购退货</router-link>
            </li>
            <li v-if="getMenuAuthFun('supplierManagement')">
                <router-link :to='{path:"/supplierManagement"}'>供应商管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('purchaseStatistics')">
                <router-link :to='{path:"/purchaseStatistics"}'>采购统计</router-link>
            </li>
        </ul>
        <div class="supplier">
            <div class="flex supplierTop" style="width: 100%;">
            	提交时间：
            	<el-date-picker
                    size="small"
                    v-model="startDate"
                    type="date"
                    placeholder="选择开始日期"
                    @change="loadData">
                </el-date-picker>
                <el-input
                    size="small"
                    placeholder="供应商名称搜索"
                    icon="search"
                    v-model="q_supplierName"
                    :on-icon-click="loadData">
                </el-input>


            </div>
            <div style="float: right; margin-top: -25px;" >
            	<router-link :to='{path:"/stallPurchaseReturns"}' class="buttonColor"><span class="background1"></span>新增采购退货</router-link>
            	<a href="javascript:void(0)" class="buttonColor" @click="dialogImport = true">导入退货</a>
            </div>


            <div class="supplierTable">
                <el-table
                    :data="tableData"
                    style="width: 100%">

                    <el-table-column
                        prop="orderNo"
                        label="单号">
                    </el-table-column>
                    <el-table-column
                        prop="otherSideCompanyName"
                        label="供应商">
                    </el-table-column>
                    <!--<el-table-column
                        prop="linkTel"
                        label="退货总数量">
                    </el-table-column>
                    <el-table-column
                        prop="linkTel"
                        label="退货总金额">
                    </el-table-column>-->
                    <el-table-column
                        prop="createTime"
                        label="提交时间"
                        :formatter="mydateFormat">
                    </el-table-column>
                    <el-table-column
                        prop="createUserName"
                        label="提交人">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template scope="scope">
                            <div class="tableFoot">
                            	<router-link :to='{path:"/stallPurchaseDetail",query:{param:scope.row.storeOrderId}}' class="blue2">查看</router-link>
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
            <a href="javascript:void(0)" @click="exportData" class="export_excle">导出excel</a>
            <div style="height:160px;">
                &nbsp;
            </div>
        </div>

        <el-dialog
            title="导入退货单"
            :visible.sync="dialogImport"
            size="tiny">
            <div class="dialogImport">
                <div class="importFirst">
                    <div class="flex">
                        <p>选择文件上传：</p>
						<p>{{uploadFileName}}</p>
                    </div>
                    <div class="flex3" style="align-items: flex-start">
                        <div class="uploatName flex">
                        </div>
                    </div>
                    <div class="uploatButton">
                        <input type="file" accept=".xls" id="uploatfile" @change="uploatFile" v-if="accomplish">
                        <div class="flex2 importUploat">
                            <img src="../image/Download01.png" alt="">
                            <p>上传文件</p>
                        </div>
                    </div>
                </div>
                <div class="importTips">
                    支持扩展名：.xlsx,.xls
                </div>
                <div class="importDownload">
                    <a href="http://cws.nabei.net:8103/stock/fileTemplate/stallPurchaseReturns.xls" class="flex2">下载模版</a>
                </div>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor" @click="importf">确 定</a>
                <a href="javascript:void(0)" class="buttonColor2" @click="dialogImport = false">取 消</a>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryStockOrder,querySupplier,queryStockOrderForPurchase,checkImportProduct,createStockOrder} from '@/api/getData'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import {formatDate} from '../utils/date.js'
    import {mydateFormat} from '../utils/dataFormater.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
    const _XLSX = require('xlsx')
    const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                multipleSelection:[],
                startDate:'',
                q_supplierName:'',
                q_supplierId:'',
                q_supplierTel:'',
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

                tableData:[],//数据

                supplierFlag:true,//若为false,则查询列表为空

                dialogImport:false,

                accomplish:true,

                importExcelData:'',

                importFaileData:[],//导入失败数据

                uploadFileName:'',//上传文件名称

                purchaseDataList:[],
                
                loading2:false,
                
                jsonArray:[],
                
                importData:[],
            }
        },
        watch:{
        	'$route':function (route) {
        		this.loadData();
        	}
        },
        mounted(){
           this.loadData();
        },
        methods: {
			getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
           loadData(){
           		//this.loadSupplier().then(()=>this.loadPurchaseData());

           		this.loadSupplier();
           },

           async loadSupplier(){
           		if(this.q_supplierName != "" || this.q_supplierTel != ""){
           			let param = {companyId:userInfo().companyId};
           			if(this.q_supplierName != ""){
           				param.name = this.q_supplierName;
           			}
           			if(this.q_supplierTel != ""){
           				param.linkTel = this.q_supplierTel;
           			}
           			let params = {
           				param:param,
           				pageSize:1,
           				pageIndex:1
           			}
           			const res = await querySupplier(params);
           			if (res.isSuccess == true) {
	                    if(res.result.totalCount==0){
	                    	this.supplierFlag = false;
	                    	this.q_supplierId = '';
	                    }else{
	                    	this.supplierFlag = true;
	                    	this.q_supplierId = res.result.results[0].id;
	                    }
	                    this.loadPurchaseData()
	                }else{
	                    this.$message({
	                        type: 'error',
	                        message: res.errorMsg
	                    });
	                    this.loadPurchaseData()
	                }
           		}else{
           			this.supplierFlag = true;
           			this.q_supplierId = '';
           			this.loadPurchaseData()
           		}
           },
            async loadPurchaseData(){
            	if(!this.supplierFlag){
            		this.tableData = [];
            		this.totalCount = 0;
            		return;
            	}
            	let q_startDate = '';
            	if(this.startDate != ''){
            		q_startDate = formatDate(new Date(this.startDate),'yyyy-MM-dd')
            	}
            	let params = {
        			type:7,
        			startDate:q_startDate,
        			companyId:userInfo().companyId,
        			otherSideCompanyId:this.q_supplierId,
        			pageIndex:this.currentPage,
                	pageSize:this.pageSize
        		}
            	
                const res = await queryStockOrderForPurchase(params);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: '数据加载成功！'
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

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
                this.loadPurchaseData();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.loadPurchaseData();
            },

            //页码变更
            /*handleCurrentChange: function(val) {
                this.currentPage = val;
                let params ={
                    param:{
                        stallId:userInfo().companyId,
                    },
                    pageIndex:this.currentPage,
                    pageSize:this.pagesize
                }
                if(this.q_supplierName!=''){
                    params.param.name = this.q_supplierName
                }
                if(this.q_supplierTel!=''){
                    params.param.linkTel = this.q_supplierTel
                }
                this.loadPurchaseData(params);
            },*/

            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },

            async exportData(){
            	let params = null;
            	if(this.q_supplierId != ""){
            		params = {
            			type:7,
            			createTime:this.startDate,
            			companyId:userInfo().companyId,
            			otherSideCompanyId:this.q_supplierId,
            			pageIndex:1,
                    	pageSize:this.totalCount
            		}
            	}else{
            		params = {
            			type:7,
            			createTime:this.startDate,
            			companyId:userInfo().companyId,
            			pageIndex:1,
                    	pageSize:this.totalCount
            		}
            	}
                const res = await queryStockOrderForPurchase(params);
            	if (res.isSuccess == true) {
                    const tHeader = ['单号', '供应商','提交时间','提交人'];
			　　　    const filterVal = ['orderNo', 'otherSideCompanyName','createTime','createUserName'];
			　　　    const list = [];
					res.result.results.forEach(obj => {
						let row = {
							orderNo:obj.orderNo,
							otherSideCompanyName:obj.otherSideCompanyName,
							createTime:formatDate(new Date(obj.createTime),'yyyy-MM-dd hh:mm'),
							createUserName:obj.createUserName
						}
						list.push(row);
					});
			　　　   const data = this.formatJson(filterVal, list);
			　　　   export_json_to_excel(tHeader, data, '采购退货数据');
                }

          },

          async importf(){
            	if(this.uploadFileName == ""){
            		this.$message({
                        type: 'error',
                        message: "请先选择上传的文件"
                    });
                    return;
            	}
                this.dialogImport = false;
				this.importExcelData = '';
				this.importFaileData = [];
				let obj = document.getElementById("uploatfile");
				var wb;//读取完成的数据
            	var rABS = false; //是否将文件读取为二进制字符串
            	if(!obj.files) {
                    return;
                }
                var f = obj.files[0];
                var reader = new FileReader();
                reader.onload =(e) =>{
                    var data = e.target.result;
                    if(rABS) {
                        wb = X.read(btoa(fixdata(data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = X.read(data, {
                            type: 'binary'
                        });
                    }

                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
                    this.importExcelData = JSON.stringify( X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
                    this.jsonArray = JSON.parse(this.importExcelData);
                    this.importFileData(0);
                };
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
			},

			uploatFile(){
				let obj = document.getElementById("uploatfile").value;
				let array = obj.split("\\");
				if(array.length>0){
					this.uploadFileName = array[array.length-1];
				}else{
					this.uploadFileName = "";
				}
			},

			async importFileData(index){
				let importDataStr = [];
				for(var i=0;i<100 && index<this.jsonArray.length;i++){
					importDataStr.push(this.jsonArray[index]);
					index++;
				}
				let param = {
						type:'2',
	                	jsonStr:importDataStr,
	                	companyId:userInfo().companyId,
	               }
               const res = await checkImportProduct(param);
               let obj = document.getElementById("uploatfile");
               obj.value = '';
            	if (res.isSuccess == true) {
            		this.uploadFileName = "";
                    res.result.forEach(row => {
                    	this.importData.push(row);
                    });
                    if(index<this.jsonArray.length){
                    	this.importFileData(index);
                    }else{
                    	this.loading2 = false;
                   		this.uploadFileName = "";
                   		let obj = document.getElementById("uploatfile");
               			obj.value = '';
               			this.createStockOrder();
                    }
                    
                }else{
                	this.uploadFileName = "";
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
			},
			
			async createStockOrder(){
				let otherSideCompanyId = '';
				this.importData.forEach(row => {
					let flag = false;
                	if(otherSideCompanyId == '' && row.supplierId){
                		otherSideCompanyId = row.supplierId;
                	}
	            	this.purchaseDataList.forEach(obj2=> {
	            		if(obj2.productVariantId == row.id){
	            			obj2.price = row.sellPrice;
	            			obj.orderNum = row.stockNum;
	            			flag = true;
	            		}
	            	});

	            	if(!flag){
	            		let row2 = {
		            		productId:row.productId,
		            		productVariantId:row.id,
		            		orderNum:row.stockNum,
		            		price:row.sellPrice,
		            		companyId:userInfo().companyId,
		            		productCode:row.productCode,
		            		colour:row.colour,
		            		size:row.size,
		            		imgUrl_main:row.imgUrl_main,
		            	}
		            	this.purchaseDataList.push(row2);
	            	}
				})
				let  param2 = {
                    "type":'7',
                    "companyId":userInfo().companyId,
                    "details": this.purchaseDataList,
                    "otherSideCompanyId":otherSideCompanyId
                };
                const res2 = await createStockOrder(param2);
                if (res2.isSuccess == true) {
                    this.loadData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res2.errorMsg
                    });
                }
			},

          formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]));
		　　　},

            mydateFormat,
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/supplierManagement';

    .dialogImport{
	    .importFirst{
	        display: flex;
	        align-items: flex-start;
	        .uploatName{
	            background: #e7f3fd;
	            margin-left: 10px;
	            margin-bottom: 5px;
	            p{
	                max-width: 189px;
	                white-space:nowrap;
	                overflow:hidden;
	                text-overflow:ellipsis;
	            }
	        }
	        .uploatButton{
	            position: relative;
	            #uploatfile{
	                background: pink;
	                width: 96px;
	                height: 30px;
	                position: absolute;
	                top:0;
	                left:0;
	                opacity: 0;
	            }
	            .importUploat{
	                background:#fff;
	                border:1px solid #ccc;
	                border-radius: 15px;
	                padding: 4px 9px;
	                font-size: 12px;
	                margin-left: 10px;
	                img{
	                    width: 18px;
	                    height: 18px;
	                }
	            }
	        }
	    }

	    .dialogImport,.importTips{
	        height: 40px;
	        line-height: 40px;
	    }
	    .importTips{
	     font-size: 12px;
	        color:#999;
	    }
	    .importDownload{
	        padding: 0 8%;
	        a{
	            border:1px solid @blue2;
	            height: 30px;
	            border-radius: 5px;
	            color:#333;
	        }
	    }
	}
</style>
