<template>
    <div class="fillcontain">
        <ul class="menu">
            <li class="menuIndex2">
                <router-link :to='{path:"/salesReturn"}'>退货管理</router-link>
            </li>
        </ul>
        <div class="promptlyReturns radioRed">
            <el-col :span="10" class="isLeft">
                <el-col :span="24" class="leftList leftList2">
                    <div class="flex">
                        <el-col :span="4" class="title">货号：</el-col>
                        <el-col :span="17" class="content" style="width:300px" v-if="scanOrSearch == 1">
                            <el-select
                                v-model="productCode"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入货号..."
                                :remote-method="remoteMethod"
                                :loading="loading"
                                @change="searchPurchaseProduct">
                                <el-option
                                    v-for="item in options4"
                                    :key="item.productCode"
                                    :label="item.productCode"
                                    :value="item.productCode">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="17" class="content" style="width:300px" v-if="scanOrSearch == 2">
                            <input type="text" placeholder="扫一扫..." v-model="barcode" class="returnBarcode"   v-focus="focusStatus" @keyup="searByBarcode($event)" >
                        </el-col>
                        <el-col :span="3" class="choseScan flex2" @click.native="choseScan()">
                            <p v-if="scanOrSearch == 2"><img src="../image/saoys.png" alt=""></p>
                            <p v-if="scanOrSearch == 1"><img src="../image/search001.png" alt=""></p>
                        </el-col>
                    </div>
                   <div  v-if="isVariant">
                       <el-col :span="4">&nbsp;</el-col>
                       <el-col :span="19" class="content">
                           <div class="contentInfo flex">
                           	   <img v-if="imgUrl_main != ''" style="width: 160px; height: 160px;" :src="imgUrl_main" alt="">
                               <img v-else style="width: 160px; height: 160px;" src="../image/product_default.png" alt="">
                               <div class="infoRight">
                                   <!--<p>库存(件)：{{this.totalStockNum}}</p>-->
                                   <p>单价(元)：{{this.price}}</p>
                                   <p>供货档口：{{this.stallName}}</p>
                               </div>
                           </div>
                       </el-col>
                   </div>
                </el-col>
                <div v-if="isVariant">
                    <el-col :span="24" class="flex leftList">
                        <el-col :span="4" class="title">颜色：</el-col>
                        <el-col :span="18" class="content" v-show="colors.length > 0">
                            <el-radio-group v-model="radio3" @change="selectColor">
                                <el-radio-button :label="item.value" v-for="item in colors" >{{item.value}}</el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="flex leftList">
                        <el-col :span="4" class="title">尺码：</el-col>
                        <el-col :span="18" class="content" v-show="sizes.length > 0">
                            <el-radio-group v-model="radio4" @change="selectSize">
                                <el-radio-button :label="item.value" v-for="item in sizes" >{{item.value}}</el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="flex leftList">
                        <el-col :span="4" class="title">数量：</el-col>
                        <el-col :span="18" class="content">
                            <el-input-number v-model="totalStockNum1" :min="1" :max="this.totalStockNum"></el-input-number>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="flex leftList">
                        <el-col :span="4" class="title">退货价格：</el-col>
                        <el-col :span="18" class="content">
                            <div style="width: 180px;">
                                <el-input placeholder="" v-model="purchasePrice" type="number" @blur="editPurchaseFun(purchasePrice)">
                                    <template slot="prepend">￥</template>
                                </el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="flex2 leftButton">
                        <a href="javascript:void(0)" class="buttonColor3" @click="addToList">加入退货清单</a>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="14" class="isRight">
                <div style="height: 15px;">
                    <div class="left">退货清单</div>
                    <el-button class="buttonColor3 right" @click="dialogImport = true" size="small">退货导入</el-button>
                </div>
                <!--<div class="rightDelete right"><a href="javascript:void(0)"  class="buttonColor3" @click="batchDeleteConfig">删除</a></div>-->
                <el-table
                    :data="tableData"
                    class="rightTable"
                    show-summary
                    @selection-change="handleSelectionChange"
                    height="450"
                    style="width: 100%">
                    <el-table-column
                        width="40">
                        <template scope="scope">
                            <div class="flex2" @click="batchDeleteConfig(scope.$index)">
                                <img src="../image/delete02.png" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="190"
                        label="主图/货号">
                        <template scope="scope">
                            <div class="flex tableFirst">
                                <img style="width: 40px; height: 40px;" :src="scope.row.imgUrl_main" alt=""  class="tableImg">
                                <p>{{scope.row.productCode}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="color"
                        label="颜色/尺码">
                        <template scope="scope">
                            {{scope.row.color}}/{{scope.row.size}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                        <!--prop="size"-->
                        <!--v-model="size"-->
                        <!--label="尺码">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="requireCnt"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        label="单价">
                        <template scope="scope">{{scope.row.price}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="stallName"
                        width="150"
                        label="档口">
                    </el-table-column>
                </el-table>
                <!--<div class="tips">-->
                    <!--<p>*提示：</p>-->
                    <!--<p>1.商品默认显示档口当前在售价，价格有变动可自行协商档口，手动调整！<br/>-->
                        <!--2.点击开始匹配后，系统会自动匹配档口</p>-->
                <!--</div>-->
                <el-col :span="24" class="flex2 payButton">

                    <a href="javascript:void(0)" class="buttonColor3" @click="confirmSalesReturn">确认</a>

                </el-col>
            </el-col>
        </div>

        <el-dialog
            title="导入退货清单"
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
                    <a href="http://cws.nabei.net:8103/stock/fileTemplate/promptlyReturns.xls" class="flex2">下载模版</a>
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
    import {querySellerProduct,deleteReturnRequire,createReturnRequire,queryReturnRequire,batchImportReturnRequire,queryCompany} from '@/api/getData'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
    const _XLSX = require('xlsx')
    const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;

    export default {
        data() {
            return {
                loading: false,
                options4:[],
                scanOrSearch:1,
            	imgUrl_main:'',
            	id:0,
                radio3:'',
                radio4:'',
                radio5:'',
                totalStockNum:0,
                totalStockNum1:0,
                productCode:'',
                price:1,
                stallName:'',
                orderNum:'',
                productInfo:'',
                closeFee:'',
                productId:'',
                productVariantId:'',
                multipleSelection:[],
                tableData:[],
                color:'',
                size:'',
                colors:[],
                sizes:[],
                companyId:'',
                stallId:'',
                vmStallId:'',
                myvmstallId:'',
                stockNum:'',
                pageSize:10,
                currentPage:1,
                array:[],
                sellerProductInfo:[],
                purchasePrice:0.00,
                roleForm: {
                    userId: '',
                    roleId: '',
                    compId:''
                },
                isVariant:false,
                purchasePrice1:true,

				dialogImport:false,

                accomplish:true,

                importExcelData:'',

                importFaileData:[],//导入失败数据

                uploadFileName:'',//上传文件名称

                rawSizes:[]//初始尺寸
            }
        },
        watch:{
            '$route':function (route) {
            this.initData();
            }
        },
        mounted(){
        	this.initData();
        },
        methods: {
            choseScan(){
                if(this.scanOrSearch == 1){
                    this.scanOrSearch = 2;
                    this.focusStatus=true;
                }else{
                    this.scanOrSearch =1;
                }
            },
            handleSelectSupplier(){
                this.dialogVisible = true;
            },
            isShow(){
                this.queryProductInfo();
            },
            async initData(){
                this.roleForm.userId=userInfo().userId;
                this.roleForm.compId = userInfo().companyId;
                let param = {
                    "companyId":this.roleForm.compId,
                    "resultCfg":{"groupbystall":"1"},
                    "pageIndex":1,
                    "pageSize":10,
                };
                const res = await queryReturnRequire(param);
                if (res.isSuccess == true){
                    this.tableData = [];
                    let table = res.result.results;
                    table.forEach((obj)=>{
                        for(var i= 0;i<obj.requires.length;i++){
                            this.tableData.push(obj.requires[i]);
                        }
                    })

//                    this.tableData = res.result.results;
                    this.totalCount = table.totalCount;
                }
            },
            async remoteMethod(query){
                if(query!=''){
                    this.loading = true;
                    let param = {
                        "productCode":query,
                        "companyId":this.roleForm.compId,
                        "pageIndex":1,
                        "pageSize":1000,
                        "type":2
                    };
                    const res = await querySellerProduct(param);
                    setTimeout(() => {
                        this.loading = false;
                        this.options4 = res.result.results;
                    }, 200);
                } else {
                    this.options4 = [];
                }
            },
            async searchPurchaseProduct(){
                this.imgUrl_main = '';
                this.colors = [];
                this.sizes = [];
                this.radio4 = '';
                this.radio3 = '';
                //搜索商品货号
                let param = {
                    "companyId":this.roleForm.compId,
                    "productCode":this.productCode,
                    "pageIndex":this.currentPage,
                    "pageSize":this.pageSize,
                    "type":2

                };
                const res = await querySellerProduct(param);
                if(res.isSuccess){
                    this.isVariant = true;
                    this.productInfo = res.result.results;
                    let selResultObj = res.result.results[0];
                    console.log(selResultObj)
                    let table = selResultObj.productVariant;
                    if(this.imgUrl_main == "" && selResultObj.imgUrl_main){
                        	this.imgUrl_main = selResultObj.imgUrl_main;
                        }
                    let totalStock = 0;
                    for(let i = 0 ;i<table.length;i++){
                    	totalStock = totalStock + table[i].stockNum;
                        let color = {
                            value:table[i].colour,
                            label:i
                        }

                        let size = {
                            value:table[i].size,
                            label:i
                        }
                        if(!this.distinctColor(table[i].colour)){
                            this.colors.push(color);
                        }

                        if(!this.distinctSize(table[i].size)){
                            this.sizes.push(size);
                        }
                    }

                    this.rawSizes = this.sizes;//初始化尺寸

                    this.totalStockNum = totalStock;
                    this.price = selResultObj.sellPrice;
                    this.stallName = selResultObj.stallName;
                    this.purchasePrice = selResultObj.sellPrice;
                    this.stallId =  selResultObj.stallId;
                    this.myvmstallId = selResultObj.vmstallId;
//                    if( selResultObj.vmstallId !=null){
//                        this.myvmstallId = selResultObj.vmstallId;
//                    }
                    //alert(this.myvmstallId)
                }else{
                    this.$message({
                        duration:this.GLOBAL.MESSAGE_DISSMISS_TIME_MID,
                        type:'error',
                        message:res.errorMsg
                    });
                }
            },
//            async queryCompany(compId){
//                this.customerName = '';
//                let param = {
//                    company:{
//                        id:compId
//                    },
//                    pageSize:1,
//                    pageIndex:1
//                }
//                const res = await queryCompany(param);
//                if(res.isSuccess){
//                    if(res.result.data.length == 1){
//                        this.customerName = res.result.data[0].name;
//                    }
//                }
//            },
            selectColor(){
                this.sizes=[];
                this.radio4 = '';
                var table = this.productInfo;
                table.forEach((obj)=>{
                    for(var i= 0;i<obj.productVariant.length;i++){
                        if( obj.productVariant[i].colour == this.radio3){
                            if(i == 0){
                                this.sizes=[];
                            }
                            console.log(obj.productVariant[0].colour)
                            let size = {
                                label:i,
                                value:obj.productVariant[i].size
                            };
                            this.sizes.push(size);
                        }
                    }
                });

            },
            selectSize(){
                let table = this.productInfo;
                table.forEach((obj)=>{
                    for(var i= 0;i<obj.productVariant.length;i++){
                        if(obj.productVariant[i].colour==this.radio3&&obj.productVariant[i].size==this.radio4)
                        {
                            this.productId = obj.productVariant[i].productId;
                            this.productVariantId = obj.productVariant[i].id;
                            this.pdCode = obj.productVariant[i].productCode;
                            //this.stallId = this.productInfo.stallId;
                            this.totalStockNum = this.productInfo.stockNum
                            if(this.productInfo.vmstallStatus==1){
                                this.stallType = 0;//线上的档口
                            }else {
                                this.stallType = 1;//线下的档口
                            }
                        }
                    }
                })
            },
            editPurchaseFun(value){
                this.purchasePrice1= true;
                var check=Number(value);
                if(isNaN(value)){
                    this.$message({
                        type: 'error',
                        message: '请输入正确的数字'
                    });
                    return;
                }else if(check<0 || check> 9999999){
                    this.$message({
                        type: 'error',
                        message: '请输入0-9999999之间的数字'
                    });
                    return;
                }else if(this.purchasePrice.indexOf('.') != -1){
                    var lenght1 = this.purchasePrice.length;
                    var lenght2 = this.purchasePrice.indexOf('.');
                    if(lenght1-lenght2>3){
                        this.$message({
                            type: 'error',
                            message: '商品价格只能保留两位小数！'
                        });
                        this.purchasePrice1= false;
                        return
                    }
                }else{
                    this.purchasePrice1= true;
                }
            },
            async addToList(){
                var check=Number(this.purchasePrice);
                if(this.totalStockNum1==0){
                    this.$message({
                        duration:this.GLOBAL.MESSAGE_DISSMISS_TIME_MID,
                        type:'info',
                        message:'请选择规格'
                    });
                    return;
                }else if(this.purchasePrice == '' || this.purchasePrice == 0){
                    this.$message({
                        duration:this.GLOBAL.MESSAGE_DISSMISS_TIME_MID,
                        type:'info',
                        message:'请填写退货价格'
                    });
                    return;
                }else if(isNaN(this.purchasePrice)){
                    this.$message({
                        type: 'error',
                        message: '请输入正确的数字'
                    });
                    return;
                }else if(check<0 || check> 9999999){
                    this.$message({
                        type: 'error',
                        message: '请输入0-9999999之间的数字'
                    });
                    return;
                }else if(this.purchasePrice1 == false){
                    this.$message({
                        type: 'error',
                        message: '商品价格只能保留两位小数！'
                    });
                    return
                }
                    let param = {
                    "productId":this.productId,
                    "requireCnt":this.totalStockNum1,
                    "companyId":this.roleForm.compId,
                    "productCode":this.productCode,
                    "productVariantId":this.productVariantId,
                    "color":this.radio3,
                    "size":this.radio4,
                    "price":this.purchasePrice,
                    "stallType":0,
                    "stallId":this.stallId,
                    "vmstallId":this.myvmstallId
                };
                this.salesReturnByHand(param);
            },
            async salesReturnByHand(param){

                const res = await createReturnRequire(param);
                if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.initData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
             distinctColor(val){
                for(let i=0;i< this.colors.length;i++){
                    let item = this.colors[i];
                    if(item.value == val){
                        return true;
                    }
                }
                return false;
            },
             distinctSize(val){
                for(let i=0;i< this.sizes.length;i++){
                    let item = this.sizes[i];
                    if(item.value == val){
                        return true;
                    }
                }
                return false;
            },
             //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },
             batchDeleteConfig(index) {
//                if(this.multipleSelection == undefined || this.multipleSelection.length==0){
//                    this.$message({
//                        type: 'error',
//                        message: '请先勾选要删除的行！'
//                    });
//                    return;
//                }
//                this.array=[];
//                let ids='';
//                for(let i=0;i<this.multipleSelection.length;i++){
//                	if(i==this.multipleSelection.length-1){
//                		ids += this.multipleSelection[i].orderDetailId;
//                	}else{
//                		ids += this.multipleSelection[i].orderDetailId + ',';
//                	}
//                }
//                this.array.push(ids);
//                if(array.length <1){
//                    this.$message({
//                        type: 'error',
//                        message: '请先勾选要删除的行！'
//                    });
//                    return;
//                }
                this.$confirm('是否确认删除选中的信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.batchDelete(index);
                }).catch(() => {

                });
                if(this.tableData.length==0){
                    this.userId='';
                }
            },
             async batchDelete(index){
                var deleid=this.tableData[index].id;
                console.table(this.tableData[index]);
                let param = {
                	"requireId":deleid
                }

                const res = await deleteReturnRequire(param);
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
                this.initData();
//                 this.$router.go(0)

            },
             contains(array,str){
                for(let i=0;i<array.length;i++){
                    if(array[i] == str){
                        return true;
                    }
                }
                return false;
            },
            confirmSalesReturn(){

//            	this.$router.push({path: '/promptlyReturnsAffirm',query:{data:this.multipleSelection}});
                this.$router.push({path: '/promptlyReturnsAffirm',query:{stallId:this.stallId,}});
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
	                	companyId:userInfo().companyId
	               }
               const res = await batchImportReturnRequire(param);
               let obj = document.getElementById("uploatfile");
               obj.value = '';
            	if (res.isSuccess == true) {
                    this.initData();
                    this.uploadFileName = "";
                    if(res.result.data && res.result.data.length>0){
                       this.importFaileData = res.result.data;
                       this.exportFaileExcel();
                    }else{
                        this.$message({
                            type: 'success',
                            message: res.result.msg
                        });
                    }
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
            		const tHeader = ['商品货号', '颜色','尺码','退货数量','退货价格','失败原因'];
			　　　  const filterVal = ['productCode', 'color','size','requireCnt','price','msg'];
			　　　  const list = this.importFaileData;
			　　　  const data = this.formatJson(filterVal, list);
			　　　  export_json_to_excel(tHeader, data, '导入退货清单失败数据');
            	}
			},
        },
    }
</script>
<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/salesReturn';

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
