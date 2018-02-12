<template>
    <div class="fillcontain">
        <ul class="menu">
            <li class="menuIndex2" v-if="getMenuAuthFun('webStoreOrderSalesBuy')">
                <router-link :to='{path:"/webStoreOrderSalesBuy"}'>网店订单</router-link>
            </li>
            <li v-if="getMenuAuthFun('purchaseRequireBuy')">
                <router-link :to='{path:"/purchaseRequireBuy"}'>采购需求</router-link>
            </li>
            <li v-if="getMenuAuthFun('orderPurchaseBuy')">
                <router-link :to='{path:"/orderPurchaseBuy"}'>采购订单</router-link>
            </li>
            <!-- <li v-if="getMenuAuthFun('addShop')">
                <router-link :to='{path:"/addShop"}'>绑定店铺</router-link>
            </li> -->
            <li v-if="getMenuAuthFun('packageDetails')">
                <router-link :to='{path:"/packageDetails"}'>包裹管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('salesForecast')">
                <router-link :to='{path:"/salesForecast"}'>采购统计</router-link>
            </li>
        </ul>
        <div class="startProcurement">
            <div>
                <div class="salesOrderTop">
                    <div class="topSearch">
                        <el-input
                            placeholder="订单号搜索"
                            icon="search"
                            size="small"
                            v-model="searchOrderId"
                            :on-icon-click="initloadData">
                        </el-input>
                        <el-input
                            placeholder="买家昵称搜索"
                            icon="search"
                            size="small"
                            v-model="searchBuyerNick"
                            :on-icon-click="initloadData">
                        </el-input>
                    </div>
                </div>
                <div class="orderTop">
                    <a href="javascript:void(0)" class="buttonColor3" v-if="unfinished" @click="syncWebStoreOrder">同步订单</a>
                    <a href="javascript:void(0)" class="buttonColor3" v-if="unfinished" @click="showPurchaseDialog">转换成采购需求</a>
                    <a href="javascript:void(0)" @click="batchDeleteConfig" class="buttonColor3" v-if="accomplish">删除</a>
                    <a href="javascript:void(0)" @click="boomlabel" class="buttonColor3" v-if="unfinished">打标签</a>
                    <a href="javascript:void(0)" @click="dialogImport = true" class="buttonColor3">导入打标签</a>
                    <a href="javascript:void(0)" @click="cancellabel" class="buttonColor3" v-if="unfinished">取消标签</a>
                    <p class="right" v-if="lastAsyncTime != ''">同步时间：{{lastAsyncTime}}</p>
                </div>
                <div class="productTabs radioRed">
                    <el-radio-group v-model="radio" size="small" @change="changeRadio">
                        <el-radio-button label="2">全部</el-radio-button>
                        <el-radio-button label="1">特殊单</el-radio-button>
                        <el-radio-button label="0">正常单</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="salesOrderTable">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" class="tableFirst">
                       <tr>
                           <td class="firstLi"><el-checkbox @change="checkAllClick" v-model="checkAll">多选</el-checkbox></td>
                           <td class="nth-2">商品信息</td>
                           <td>颜色</td>
                           <td>尺码</td>
                           <td>付款金额</td>
                           <td>数量</td>
                       </tr>
                    </table>
                   <div class="scrollTable">
                      <div v-for="(item,key,index) in tableData">
                          <!--表头-->
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" class="buyTable">
                              <tr>

                                  <th v-if="key == 0"><el-checkbox v-model="checkedItem1"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 1"><el-checkbox v-model="checkedItem2"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 2"><el-checkbox v-model="checkedItem3"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 3"><el-checkbox v-model="checkedItem4"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 4"><el-checkbox v-model="checkedItem5"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 5"><el-checkbox v-model="checkedItem6"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 6"><el-checkbox v-model="checkedItem7"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 7"><el-checkbox v-model="checkedItem8"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 8"><el-checkbox v-model="checkedItem9"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 9"><el-checkbox v-model="checkedItem10"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 10"><el-checkbox v-model="checkedItem11"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th v-if="key == 11"><el-checkbox v-model="checkedItem12"></el-checkbox><span class="checkbox">订单号：{{item.orderCode}}</span></th>
                                  <th><span class="red">我是{{item.buyerNick}}</span>(来自{{item.sellerNick}})</th>
                                  <th>创建时间：{{item.orderTime}}</th>
                                  <th>付款时间：{{item.payTime}}</th>
                                  <th v-if="key == 0"><el-switch v-model="shuadanValue1" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,1)"></el-switch></th>
                                  <th v-if="key == 1"><el-switch v-model="shuadanValue2" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,2)"></el-switch></th>
                                  <th v-if="key == 2"><el-switch v-model="shuadanValue3" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,3)"></el-switch></th>
                                  <th v-if="key == 3"><el-switch v-model="shuadanValue4" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,4)"></el-switch></th>
                                  <th v-if="key == 4"><el-switch v-model="shuadanValue5" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,5)"></el-switch></th>
                                  <th v-if="key == 5"><el-switch v-model="shuadanValue6" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,6)"></el-switch></th>
                                  <th v-if="key == 6"><el-switch v-model="shuadanValue7" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,7)"></el-switch></th>
                                  <th v-if="key == 7"><el-switch v-model="shuadanValue8" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,8)"></el-switch></th>
                                  <th v-if="key == 8"><el-switch v-model="shuadanValue9" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,9)"></el-switch></th>
                                  <th v-if="key == 9"><el-switch v-model="shuadanValue10" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,10)"></el-switch></th>
                                  <th v-if="key == 10"><el-switch v-model="shuadanValue11" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,11)"></el-switch></th>
                                  <th v-if="key == 11"><el-switch v-model="shuadanValue12" on-color="#da444f" off-color="#999" on-text="忽略" off-text="忽略" @change="shadan(item.id,12)"></el-switch></th>
                              </tr>
                          </table>
                          <!--表格内容-->
                          <div class="tableContent">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" class="buyTable1">
                                  <tr v-for="data in item.orderDetails">
                                      <td colspan="2">
                                          <div class="tdFirst">
                                              <img :src="data.picPath" style="width: 100px;" alt="">
                                              <div>
                                                  <p>商品名称：{{data.productName}}</p>
                                              </div>
                                          </div>
                                      </td>
                                      <td>{{data.color}}</td>
                                      <td>{{data.size}}</td>
                                      <td>{{data.totalPrice}}</td>
                                      <td>x{{data.num}}</td>
                                  </tr>

                              </table>
                          </div>
                      </div>

                   </div>
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
                <a href="javascript:void(0)" class="export_excle1" @click="exportTableData">导出excel</a>
            </div>
             <div style="height:160px;">
                &nbsp;
            </div>
        </div>
        <!--dialog-->
        <el-dialog
        	id="purchaseDialog"
            title="提示"
            :visible.sync="purchaseDialogVisible"
            size="tiny">
            <!--提交商品没有未匹配档口商品 时显示-->
            <span>确定提交选中商品吗？</span>
            <!---->
            <!--提交商品有未匹配档口商品 时显示-->
            <p>您提交的商品中有<span>未匹配档口</span>的商品，是否忽略这些商品，继续下单？</p>
            <!---->
            <span slot="footer" class="dialog-footer">
            <el-button @click="purchaseDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addPurchaserequire">确 定</el-button>
          </span>
        </el-dialog>
        
        <el-dialog
            title="导入打标签"
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
                    <a href="http://cws.nabei.net:8103/stock/fileTemplate/webStoreOrderCode.xls" class="flex2">下载模版</a>
                </div>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor3" @click="importf">确 定</a>
                <a href="javascript:void(0)" class="buttonColor2" @click="dialogImport = false">取 消</a>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {setStore,getStore} from  '../config/mUtils'
    import {createByWebStoreOrderDetail,batchdeleteWebStoreOrder,markOrder,querySjzxWebCompany,syncWebStoreOrder,queryWebStoreOrder} from '@/api/getData'
    import {formatDate} from '../utils/date.js'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
    import {userInfo} from  '../config/mUtils'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    const _XLSX = require('xlsx')
    const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;

    export default {
        components: {
            headTop,
        },
        data() {
            return {
            	lastAsyncTime:'',
                accomplish:false,
                unfinished:true,
                radio:'2',
                value2:false,
                input2:'',
                searchBuyerNick:'',
                searchOrderId:'',
                checkAll:false,
                checkedItem1:false,
                checkedItem2:false,
                checkedItem3:false,
                checkedItem4:false,
                checkedItem5:false,
                checkedItem6:false,
                checkedItem7:false,
                checkedItem8:false,
                checkedItem9:false,
                checkedItem10:false,
                checkedItem11:false,
                checkedItem12:false,

                value1:'',
                shuadanValue1:false,
                shuadanValue2:false,
                shuadanValue3:false,
                shuadanValue4:false,
                shuadanValue5:false,
                shuadanValue6:false,
                shuadanValue7:false,
                shuadanValue8:false,
                shuadanValue9:false,
                shuadanValue10:false,
                shuadanValue11:false,
                shuadanValue12:false,
                purchaseDialogVisible: false,
                tableData: [],
                value: '',
                //默认每页数据量
                pageSize: 12,

                //默认高亮行数据id
                highlightId: -1,

                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,

                //默认数据总数
                totalCount: 0,
				
				dialogImport:false,
                
                accomplish:true,
                
                importExcelData:'',
                
                importFaileData:[],//导入失败数据
                
                uploadFileName:'',//上传文件名称
            }
        },
        async mounted(){
            this.initloadData();
            this.initSjzxWebCompany();

            const s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = 'http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js';
			document.body.appendChild(s);
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
            handleIconClick(){
                console.log()
            },
            changeRadio(){
                if(this.radio == 1){
                    this.unfinished = false;
                    this.accomplish = true;
                }else{
                    this.unfinished = true;
                    this.accomplish = false;
                }
                this.initloadData();
                this.initSjzxWebCompany();
            },
          //从服务器获取数据
            async initloadData() {
            	this.shuadanValue1 = false;
                this.shuadanValue2 = false;
                this.shuadanValue3 = false;
                this.shuadanValue4 = false;
                this.shuadanValue5 = false;
                this.shuadanValue6 = false;
                this.shuadanValue7 = false;
                this.shuadanValue8 = false;
                this.shuadanValue9 = false;
                this.shuadanValue10 = false;
                this.shuadanValue11 = false;
                this.shuadanValue12 = false;
            	this.tableData = [];
            	let param ={
            		pageIndex:this.currentPage,
            		pageSize:this.pageSize,
            		companyId:userInfo().companyId,
            		buyerNick:this.searchBuyerNick,
            		orderCode:this.searchOrderId,
                    mark:this.radio
            	}
                const res = await queryWebStoreOrder(param);
                if (res.isSuccess == true) {
                    this.tableData = res.result.data.results;
                    this.tableData.forEach((obj,key) => {
                    	if(key == 0 && obj.bmark == 1){
                    		this.shuadanValue1 = true;
                    	}else if(key == 1 && obj.bmark == 1){
                    		this.shuadanValue2 = true;
                    	}else if(key == 2 && obj.bmark == 1){
                    		this.shuadanValue3 = true;
                    	}else if(key == 3 && obj.bmark == 1){
                    		this.shuadanValue4 = true;
                    	}else if(key == 4 && obj.bmark == 1){
                    		this.shuadanValue5 = true;
                    	}else if(key == 5 && obj.bmark == 1){
                    		this.shuadanValue6 = true;
                    	}else if(key == 6 && obj.bmark == 1){
                    		this.shuadanValue7 = true;
                    	}else if(key == 7 && obj.bmark == 1){
                    		this.shuadanValue8 = true;
                    	}else if(key == 8 && obj.bmark == 1){
                    		this.shuadanValue9 = true;
                    	}else if(key == 9 && obj.bmark == 1){
                    		this.shuadanValue10 = true;
                    	}else if(key == 10 && obj.bmark == 1){
                    		this.shuadanValue11 = true;
                    	}else if(key == 11 && obj.bmark == 1){
                    		this.shuadanValue12 = true;
                    	}
                    	if(obj.orderTime){
                    		obj.orderTime = formatDate(obj.orderTime, 'yyyy-MM-dd hh:mm');
                    	}
                    	if(obj.payTime){
                    		obj.payTime = formatDate(obj.payTime, 'yyyy-MM-dd hh:mm');
                    	}
                    });
                    this.totalCount = res.result.data.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async initSjzxWebCompany(){
            	let param = {
            		companyId:userInfo().companyId
            	}

            	const res = await querySjzxWebCompany(param);
                if (res.isSuccess == true) {
                	if(res.result.length>0){
                		if(res.result[0].createTime){
                			this.lastAsyncTime = formatDate(res.result[0].updateTime,'yyyy-MM-dd hh:mm');
                		}
                	}
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async syncWebStoreOrder(){
            	let param = {
            		companyId:userInfo().companyId
            	}
            	const res = await syncWebStoreOrder(param);
                if (res.isSuccess == true) {
                	this.lastAsyncTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm');
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
           	handleCurrentChange:function(val) {
                this.currentPage = val;
                this.initloadData();
            },
            showPurchaseDialog(){		//显示生成需求弹窗
            	this.purchaseDialogVisible = true;
            },
            handleSelectionChange: function(val) {	//多选
                this.multipleSelection = val;
            },
            async addPurchaserequire(){		//生成采购需求
                var orderIds = [];
                this.multipleSelection.forEach((item) => {
                    orderIds.push(item.id);
                })
                let param = {
                	orderIds:orderIds,
                	companyId:userInfo().companyId
                }
                const res = await createByWebStoreOrderDetail(param);
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
                this.purchaseDialogVisible = false;
                this.initloadData();
            },
            formatOrderTime(row) {		//格式化下单时间
                return formatDate(row.orderTime, 'yyyy-MM-dd hh:mm');
            },
            checkAllClick(){
            	if(this.checkAll){
            		this.checkedItem1=true;
	                this.checkedItem2=true;
	                this.checkedItem3=true;
	                this.checkedItem4=true;
	                this.checkedItem5=true;
	                this.checkedItem6=true;
	                this.checkedItem7=true;
	                this.checkedItem8=true;
	                this.checkedItem9=true;
	                this.checkedItem10=true;
	                this.checkedItem11=true;
	                this.checkedItem12=true;
            	}else{
            		this.checkedItem1=false;
	                this.checkedItem2=false;
	                this.checkedItem3=false;
	                this.checkedItem4=false;
	                this.checkedItem5=false;
	                this.checkedItem6=false;
	                this.checkedItem7=false;
	                this.checkedItem8=false;
	                this.checkedItem9=false;
	                this.checkedItem10=false;
	                this.checkedItem11=false;
	                this.checkedItem12=false;
            	}
            },
            async batchDelete(array){
                let param = {
                	ids:array
                }
                const res = await batchdeleteWebStoreOrder(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.currentPage = 1;
                	this.initloadData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            async exportTableData() {
            	let param ={
            		pageIndex:1,
            		pageSize:this.totalCount,
            		companyId:userInfo().companyId,
            		buyerNick:this.searchBuyerNick,
            		orderCode:this.searchOrderId,
                    mark:this.radio
            	}
                const res = await queryWebStoreOrder(param);
                const list = [];
                if (res.isSuccess == true) {
                	res.result.data.results.forEach((obj) => {
	            		let buyerNick = '';
	            		let sellerNick = '';
	            		let orderTime = '';
	            		let payTime = '';
	            		let orderId = '';
	            		if(obj.buyerNick){
	            			buyerNick = obj.buyerNick;
	            		}
	            		if(obj.sellerNick){
	            			sellerNick = obj.sellerNick;
	            		}
	            		if(obj.orderTime){
	            			orderTime = formatDate(obj.orderTime, 'yyyy-MM-dd hh:mm');
	            		}
	            		if(obj.payTime){
	            			payTime = formatDate(obj.payTime, 'yyyy-MM-dd hh:mm');
	            		}
	            		if(obj.orderCode){
	            			orderId = obj.orderCode;
	            		}
	            		if(obj.orderDetails && obj.orderDetails.length>0){
	            			obj.orderDetails.forEach((obj2) => {
	            				let color = '';
			            		let size = '';
			            		let num = '';
			            		let price = '';
			            		let picPath = '';
			            		let productBarcode = '';
			            		if(obj2.color){
			            			color = obj2.color;
			            		}
			            		if(obj2.size){
			            			size = obj2.size;
			            		}
			            		if(obj2.orderNum){
			            			num = obj2.orderNum;
			            		}
			            		if(obj2.totalPrice){
			            			price = obj2.totalPrice;
			            		}
			            		if(obj2.picPath){
			            			picPath = obj2.picPath;
			            		}
			            		if(obj2.productBarcode){
			            			productBarcode = obj2.productBarcode;
			            		}
			            		let row = {
			            			productBarcode : productBarcode,
			            			buyerNick: buyerNick,
			            			sellerNick: sellerNick,
			            			orderTime: orderTime,
			            			color : color,
			            			size : size,
			            			num : num,
			            			price : price,
			            			picPath: picPath,
			            			payTime: payTime,
			            			orderId: orderId
			            		}
			            		list.push(row);
	            			});
	            		}
                	});
                }else{
                	this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }

                const tHeader = ['订单编号','货号','买家昵称','卖家昵称', '颜色','尺码','数量','付款金额','创建时间','付款时间','商品图片'];
			　　　const filterVal = ['orderId','productBarcode','buyerNick', 'sellerNick', 'color','size','num','price','orderTime','payTime','picPath'];
			　　　const data = this.formatJson(filterVal, list);
			　　　export_json_to_excel(tHeader, data, '销售订单表');
            },
            formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
		　　　　},
			async shadan(id,key){
				let mark = '';
				if(key == 1){
					if(this.shuadanValue1){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 2){
					if(this.shuadanValue2){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 3){
					if(this.shuadanValue3){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 4){
					if(this.shuadanValue4){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 5){
					if(this.shuadanValue5){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 6){
					if(this.shuadanValue6){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 7){
					if(this.shuadanValue7){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 8){
					if(this.shuadanValue8){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 9){
					if(this.shuadanValue9){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 10){
					if(this.shuadanValue10){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 11){
					if(this.shuadanValue11){
						mark = '1';
					}else{
						mark = '0';
					}
				}else if(key == 12){
					if(this.shuadanValue12){
						mark = '1';
					}else{
						mark = '0';
					}
				}
				let param = {
					ids:id,
					companyId:userInfo().companyId,
					bmark:mark
				}
				const res = await markOrder(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.currentPage = 1;
                	this.initloadData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
			},
			batchDeleteConfig() {
                var array = [];
                this.tableData.forEach((item,index) => {
                	if(index == 0 && this.checkedItem1){
                		array.push(item.id);
                	}else if(index == 1 && this.checkedItem2){
                		array.push(item.id);
                	}else if(index == 2 && this.checkedItem3){
                		array.push(item.id);
                	}else if(index == 3 && this.checkedItem4){
                		array.push(item.id);
                	}else if(index == 4 && this.checkedItem5){
                		array.push(item.id);
                	}else if(index == 5 && this.checkedItem6){
                		array.push(item.id);
                	}else if(index == 6 && this.checkedItem7){
                		array.push(item.id);
                	}else if(index == 7 && this.checkedItem8){
                		array.push(item.id);
                	}else if(index == 8 && this.checkedItem9){
                		array.push(item.id);
                	}else if(index == 9 && this.checkedItem10){
                		array.push(item.id);
                	}else if(index == 10 && this.checkedItem11){
                		array.push(item.id);
                	}else if(index == 11 && this.checkedItem12){
                		array.push(item.id);
                	}else if(index == 12 && this.checkedItem13){
                		array.push(item.id);
                	}
                })
                if(array.length <1){
                	this.$message({
                        type: 'error',
                        message: '请先勾选要删除的订单信息！'
                    });
                    return;
                }
		        this.$confirm('是否确认删除选中的订单信息?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.batchDelete(array);
		        }).catch(() => {

		        });
            },
            async boomlabel(){
                var array = [];
                this.tableData.forEach((item,index) => {
                	if(index == 0 && this.checkedItem1){
                		array.push(item.id);
                	}else if(index == 1 && this.checkedItem2){
                		array.push(item.id);
                	}else if(index == 2 && this.checkedItem3){
                		array.push(item.id);
                	}else if(index == 3 && this.checkedItem4){
                		array.push(item.id);
                	}else if(index == 4 && this.checkedItem5){
                		array.push(item.id);
                	}else if(index == 5 && this.checkedItem6){
                		array.push(item.id);
                	}else if(index == 6 && this.checkedItem7){
                		array.push(item.id);
                	}else if(index == 7 && this.checkedItem8){
                		array.push(item.id);
                	}else if(index == 8 && this.checkedItem9){
                		array.push(item.id);
                	}else if(index == 9 && this.checkedItem10){
                		array.push(item.id);
                	}else if(index == 10 && this.checkedItem11){
                		array.push(item.id);
                	}else if(index == 11 && this.checkedItem12){
                		array.push(item.id);
                	}else if(index == 12 && this.checkedItem13){
                		array.push(item.id);
                	}
                })
                if(array.length <1){
                	this.$message({
                        type: 'error',
                        message: '请先勾选订单信息！'
                    });
                    return;
                }else{
                    let arraystr = array.join(",");
                    console.log(arraystr)
                    let param = {
                        ids:arraystr,
                        companyId:userInfo().companyId,
                        bmark:1
                    }
                    const res = await markOrder(param);
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
                }
            },
            async cancellabel(){
                var array = [];
                this.tableData.forEach((item,index) => {
                	if(index == 0 && this.checkedItem1){
                		array.push(item.id);
                	}else if(index == 1 && this.checkedItem2){
                		array.push(item.id);
                	}else if(index == 2 && this.checkedItem3){
                		array.push(item.id);
                	}else if(index == 3 && this.checkedItem4){
                		array.push(item.id);
                	}else if(index == 4 && this.checkedItem5){
                		array.push(item.id);
                	}else if(index == 5 && this.checkedItem6){
                		array.push(item.id);
                	}else if(index == 6 && this.checkedItem7){
                		array.push(item.id);
                	}else if(index == 7 && this.checkedItem8){
                		array.push(item.id);
                	}else if(index == 8 && this.checkedItem9){
                		array.push(item.id);
                	}else if(index == 9 && this.checkedItem10){
                		array.push(item.id);
                	}else if(index == 10 && this.checkedItem11){
                		array.push(item.id);
                	}else if(index == 11 && this.checkedItem12){
                		array.push(item.id);
                	}else if(index == 12 && this.checkedItem13){
                		array.push(item.id);
                	}
                })
                if(array.length <1){
                	this.$message({
                        type: 'error',
                        message: '请先勾选要的订单信息！'
                    });
                    return;
                }else{
                    let arraystr = array.join(",");
                    console.log(arraystr)
                    let param = {
                        ids:arraystr,
                        companyId:userInfo().companyId,
                        bmark:0
                    }
                    const res = await markOrder(param);
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
                    this.importFileData();
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
			
			async importFileData(){
				let param = {
	                	jsonStr:this.importExcelData,
	                	companyId:userInfo().companyId,
	                	bmark:"1"
	              }
               const res = await markOrder(param);
               let obj = document.getElementById("uploatfile");
               obj.value = '';
            	if (res.isSuccess == true) {
                    this.initloadData();
                    this.uploadFileName = "";
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
			
			formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]));
		　　　},
			
			async exportFaileExcel() {		//导出excel
            	if(this.importFaileData.length>0){
            		const tHeader = ['公司名称', '档口编码','联系电话','地址','备注','失败原因'];
			　　　  const filterVal = ['name', 'stallCode','mobile','address','remark','msg'];
			　　　  const list = this.importFaileData;
			　　　  const data = this.formatJson(filterVal, list);
			　　　  export_json_to_excel(tHeader, data, '导入档口失败数据');
            	}
			},
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/startProcurement';
    
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
	            border:1px solid #da444f;
	            height: 30px;
	            border-radius: 5px;
	            color:#333;
	        }
	    }
	}
</style>
