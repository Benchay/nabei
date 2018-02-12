<template>
    <div class="fillcontain"
    	v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
        <ul class="menu">
            <li class="menuIndex" v-if="getMenuAuthFun('stallProductManagement')">
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
        </ul>
        <div class="product">
            <div>
                <div class="flex productTop right">
                	<el-select v-model="catalogType" @change="initFirstPageData" placeholder="选择类别" class="dropdown-menu" size="small">
	                    <el-option label="全部" value=""></el-option>
	                    <el-option
	                        v-for="item in options"
	                        :key="item.id"
	                        :label="item.name"
	                        :value="item.id">
	                    </el-option>
	                </el-select>
                    <el-input
                        size="small"
                        placeholder="供应商搜索"
                        icon="search"
                        v-model="supplierName"
                        :on-icon-click="initFirstPageData" style="width: 120px;">
                    </el-input>
                    <el-input
                        size="small"
                        placeholder="货号搜索"
                        icon="search"
                        v-model="productCode"
                        :on-icon-click="initFirstPageData" style="width: 120px;">
                    </el-input>
                </div>
                <div class="productButton left">
                	<a href="javascript:void(0)" class="buttonColor" @click="showstallAddGoods2()">+添加新商品</a>
                	<a href="javascript:void(0)" class="buttonColor" @click="skumodel = true">sku属性设置</a>
                    <a href="javascript:void(0)" class="buttonColor"  @click="dialogCustomerVisible = true">批量修改供应商</a>
                    <a href="javascript:void(0)" class="buttonColor"  @click="batchDeleteConfig">批量删除</a>
                    <a href="javascript:void(0)" class="buttonColor"  @click="batchUpdateSaleState('1')">上架</a>
                    <a href="javascript:void(0)" class="buttonColor"  @click="batchUpdateSaleState('0')">下架</a>

                    <el-select v-model="productCatalog" placeholder="分类至" @change="checkProductCatalog" style="width: 100px;" size="small">
                        <el-option
	                        v-for="item in options"
	                        :key="item.id"
	                        :label="item.name"
	                        :value="item.id">
	                    </el-option>
                    </el-select>
                </div>
            </div>
            <el-col :span="24" style="margin-bottom: 15px">
                <div class="productTabs radioGreen">
                    <el-radio-group v-model="saleState" @change="initFirstPageData" size="small">
                        <el-radio-button label="1">出售中</el-radio-button>
                        <el-radio-button label="0">已下架</el-radio-button>
                    </el-radio-group>
                    <a href="javascript:void(0)" class="buttonColor" @click="dialogImport = true">导入商品</a>
                    <a href="javascript:void(0)" class="buttonColor" @click="synchronousGoods">同步商品</a>
                </div>
            </el-col>

            <div>
                <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                    width="180"
                        label="主图/货号">
                        <template scope="scope">
                            <div>
                                <el-popover
                                    v-if="scope.row.imgUrl_main !=''"
                                    ref="popover1"
                                    placement="right"
                                    width="210"
                                    trigger="hover">
                                    <div class="flex2">
                                        <img :src="scope.row.imgUrl_main" alt=""  style="width:200px;height: 200px;">
                                    </div>
                                </el-popover>
                            </div>
                            <div class="flex" style="padding: 3px;">
                                <img v-if="scope.row.imgUrl_main !=''" :src="scope.row.imgUrl_main" alt=""  class="tableImg2" v-popover:popover1>
                                <img v-if="scope.row.imgUrl_main ==''" src="../image/product_default.png" alt=""  class="tableImg2" v-popover:popover1>
                                <p @click="queryProductUrl(scope.row.id)">{{tableData[scope.$index].productCode}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        width="180"
                        label="商品名称">
                    </el-table-column>
                    <el-table-column
                        prop="supplierName"
                        width="120"
                        label="供应商">
                    </el-table-column>
                    <el-table-column
                        prop="purchasePrice"
                        label="成本价">
                        <template scope="scope">
                            <el-input v-if="scope.row.purchasePriceFlag == 1"  class="stallInput" v-model="scope.row.purchasePrice" @blur="changePrice(scope.row)" min="0" ></el-input>
                            <p v-else @click="clickpurchasePrice(scope.row)">{{scope.row.purchasePrice}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sellPrice"
                        label="批发价">
                        <template scope="scope">
                            <el-input v-if="scope.row.sellPriceFlag == 1"  class="stallInput" v-model="scope.row.sellPrice" @blur="changePrice(scope.row)" min="0" ></el-input>
                            <p v-else @click="clickSellPrice(scope.row)">{{scope.row.sellPrice}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="goodsCode"
                        width="120"
                        label="淘宝商品编码">
                    </el-table-column>
                    <el-table-column
                        prop="stockNum"
                        label="库存数">
                    </el-table-column>
                    <el-table-column
                        prop="comeType"
                        label="商品来源"
                        :formatter="formatComeType">
                    </el-table-column>
                    <el-table-column
                        width="200"
                        label="操作">
                        <template scope="scope">
                            <div class="operation">
                                <!--<a href="javascript:void(0)" class="blue2" @click="showstallAddGoods(tableData[scope.$index])">编辑</a>
                                <a href="javascript:void(0)" class="blue2" @click="print(scope.row)">打印</a>-->
                                <img src="../image/rcompile.png" title="编辑"  @click="showstallAddGoods(tableData[scope.$index])">
                                <img src="../image/print.png" title="打印"  @click="print(scope.row)">

                                <!--<a href="javascript:void(0)" class="blue2" @click="showSaleStateConfig(tableData[scope.$index].id,tableData[scope.$index].saleState)">{{scope.row.saleState==1?'下架':scope.row.saleState==0?'上架':''}}</a>-->
                                <!--<a href="javascript:void(0)" class="blue2" @click="showSpecificsellerForStallDia(tableData[scope.$index].id,tableData[scope.$index].companyId)">特定商家定价</a>-->
                                <!--<a href="javascript:void(0)" class="blue2" @click="configWarehour(tableData[scope.$index].id,tableData[scope.$index].warehouseId,tableData[scope.$index].warehouseSeatId)">设置仓位</a>-->
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
            <a href="javascript:void(0)" @click="exportProductData" class="export_excle">导出excel</a>
            <div style="height:160px;">
                &nbsp;
            </div>

        </div>
        <el-dialog
            :title="statusTip"
            :visible.sync="dialogVisible"
            size="tiny">
            <div>{{saleStatusTip}}</div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="updateSaleStateForStall" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="dialogVisible = false" class="buttonColor2">取 消</a>
              </span>
        </el-dialog>
        <el-dialog
            title="设置仓位"
            :visible.sync="dialogVisible1"
            size="tiny">
            <div>
                <div class="flex2">
                    <el-col :span="5" v-for="list in warehouseList" class="radioGreen">
                        <el-radio class="radio" v-model="seatRadio" :label="list.id" >{{list.name}}</el-radio>
                    </el-col>
                </div>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="updateWarehouseSeat" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="dialogVisible1 = false" class="buttonColor2">取 消</a>
              </span>
        </el-dialog>
        <el-dialog
            title="添加特定商家定价"
            :visible.sync="dialogVisible2"
            size="tiny">
            <div style="width:100%;overflow: hidden">
                <el-form :model="addSpecialCompform" :rules="addSpecialCompformRule" ref="addSpecialCompform" label-width="130px">
                    <el-col :span="24">
                        <el-form-item label="商家名：">
                            <el-autocomplete v-model="addSpecialCompform.companySpecialName" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item prop="companySpecialPrice" label="特定价格：">
                            <el-input v-model="addSpecialCompform.companySpecialPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="addSpecificsellerForStall('addSpecialCompform')" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="dialogVisible2 = false" class="buttonColor2">取 消</a>
              </span>
        </el-dialog>
        <el-dialog
            title="sku属性设置"
            :visible.sync="skumodel"
             class="skudia">
            <div class="contentwrap">
                <a href="javascript:;" class="prve" @click="lefttrup"><img src="../image/leftsku.png" alt=""></a>
                <div class="skutag">
                    <div class="skumain">
                        <el-tag
                        :key="tag"
                        v-for="(tag,index) in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                        @click.native="dynamicTagClick(tag,index)"
                        :class="{'active': index == currentIndex}">
                        {{tag.name}}
                        </el-tag>
                        <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                        >
                        </el-input>
                    </div>
                </div>
                    <!-- <el-button class="button-new-tag buttonColor editbtn" size="small" @click="showInput">自定义sku</el-button> -->
                    <a href="javascript:;" class="next" @click="righttrup"><img src="../image/rightsku.png" alt=""></a>
            </div>
            <div class="mainwrap">
                <el-tag
                    :key="tag"
                    v-for="tag in dynamicTagsco"
                    :closable="true"
                    :close-transition="false"
                    @close="handleCloseco(tag)"
                    >
                    {{tag.name}}
                    </el-tag>
                    <el-input
                    style="transform: translateY(-18px); margin-left: 0;"
                    class="input-new-tag"
                    v-if="inputVisibleco"
                    v-model="inputValueco"
                    ref="saveTagInputco"
                    size="mini"
                    @keyup.enter.native="handleInputConfirmco"
                    @blur="handleInputConfirmco"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag buttonColor  addbbtn" size="small" @click="showInputco">+</el-button>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="skumodel = false" class="buttonColor">确 定</a>
                <a href="javascript:void(0)" @click="skumodel = false" class="buttonColor2">取 消</a>
              </span>
        </el-dialog>
		<el-dialog
            title=""
            :visible.sync="dialogCustomerVisible"
            size="tiny"
            custom-class="">
            <el-col :span="24" class="leftList leftList2" style="height: 200px; line-height: 50px;">
                <div class="flex">
                    <el-col :span="5" class="title">选择供应商：</el-col>
                    <el-col :span="18" class="content" style="width:300px">
                        <el-select
                            v-model="supplierId"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入供应商..."
                            :remote-method="remoteMethod"
                            :loading="loading">
                            <el-option
                                v-for="item in supplierData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <!--<el-input icon="search" v-model="productCode" placeholder="请输入货号..." :on-icon-click="isShow"></el-input>-->
                    </el-col>
                </div>
                <el-col :span="25">
                	<p style="font-size: 12px; color: #cccccc;">说明：仅对未设置供应商的商品批量修改，商品供应商对应初始价格为0。</p>
                </el-col>
                <el-col :span="25" style="width: 160px; margin-left: auto; margin-right: auto;">
	                <a href="javascript:void(0)" @click="initSupplier" class="buttonColor">确 定</a>
	                <a href="javascript:void(0)" @click="dialogCustomerVisible = false" class="buttonColor2">取 消</a>
	              </el-col>
            </el-col>
            <div align="center">

            </div>
        </el-dialog>
        <el-dialog
            title="打印商品"
            size="small"
            :visible.sync="printDialog">
           <div class="printDialog">
               <div class="list">
                   <el-col :span="3">
                       货号：
                   </el-col>
                   <el-col :span="20">
                      {{printProductCode}}
                   </el-col>
               </div>
               <div class="list">
                <el-col :span="3">
                    打印类型：
                </el-col>
                <el-col :span="12" class="radioGreen printRadio">
                    <el-radio class="radio" v-model="printRadio" label="1">SKU条形码</el-radio>
                    <el-radio class="radio" v-model="printRadio" label="2">合格证</el-radio>
                </el-col>
                <el-col :span="3">
                    条码规格：
                </el-col>
                <el-col :span="6" class="flex">
                	<el-select v-if="printRadio =='1' " v-model="printSkuType" style="width: 150px;" placeholder="选择类别" class="dropdown-menu" size="small">
	                    <el-option label="80*50mm" value="80*50"></el-option>
	                    <el-option label="60*40mm" value="60*40"></el-option>
	                    <el-option label="100*70mm" value="100*70"></el-option>
	                </el-select>
                </el-col>
            </div>
               <div class="list" v-if="printRadio =='1' ">
                   <el-col :span="3">
                       编码规则：
                   </el-col>
                   <el-col :span="12" class="flex">
                      <el-input placeholder="前缀(选填)" v-model="printProductCodePrefix" class="printInput" size="small"></el-input>
                       <p>{{printProductCode}} - 颜色 - 尺码</p>
                   </el-col>
                   <el-col :span="3">
                       条码标题：
                   </el-col>
                   <el-col :span="6" class="flex">
                      <el-input placeholder="请填写条码标题" v-model="printProductBarText" class="printInput" size="small"></el-input>
                   </el-col>
               </div>
               <div class="printTable">
                   <el-table
                       height="300"
                       :data="this.printRow.productVariant"
                       border
                       style="width: 100%">
                       <el-table-column
                           prop="colour"
                           label="颜色">
                       </el-table-column>
                       <el-table-column
                           prop="size"
                           label="尺码"
                           width="180">
                       </el-table-column>
                       <el-table-column
                           prop="number"
                           label="数量">
                           <template scope="scope">
                               <el-input v-model="scope.row.printNum" min="0" @change="inputPrintNum" onkeypress="return event.keyCode>=48&&event.keyCode<=57"></el-input>
                           </template>
                       </el-table-column>
                       <el-table-column
                           prop=""
                           label="操作">
                           <template scope="scope">
                               <div class="flex2">
                                   <img src="../image/delete03.png" alt="">
                               </div>
                           </template>
                       </el-table-column>
                   </el-table>
                   <div align="right">合计：{{totalPrintNum}}&nbsp;张</div>
               </div>
           </div>

            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor" @click="groupPreviewPrint">预 览</a>
                <a href="javascript:void(0)" @click="printDirect" class="buttonColor">打 印</a>
                <a href="javascript:void(0)" @click="printDialog = false" class="buttonColor2">取 消</a>
            </span>
        </el-dialog>
        <el-dialog
            title=""
            size="small"
            custom-class="previewDialog"
            style="top:-10%;"
            :visible.sync="previewDialog">
            <div  v-if="printRadio =='1' ">
				<preview :title="printRow.title"  :barCode="printRow.barCode" :detail="printRow.detail" :dateTime="printRow.dateTime"></preview>
            </div>
            <div  v-if="printRadio =='2' ">
                <certification></certification>
            </div>

        </el-dialog>
        <el-dialog
            title=""
            :visible.sync="productUrlDialog"
            size="tiny"
            custom-class="dialogSignIn">
            <div v-for="(item,index) in productUrlData" align="center">
                <a href="javascript:void(0)" class="buttonSignIn" target="_blank" :href="item.detailUrl">商品连接{{index+1}}</a><br /><br />
            </div>
        </el-dialog>
        <el-dialog
            title="导入商品"
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
                        <input type="file" accept=".xls" @change="uploatFile" id="uploatfile" v-if="accomplish">
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
                    <a href="http://cws.nabei.net:8103/stock/fileTemplate/stallProduct.xls" class="flex2">下载模版</a>
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
    import {queryProduct,queryWarehouseSeatForStall,updateWarehouseSeatByProduct,findCompanysByNameAndMoblie,addProductPriceConfig,
	    	changeProductSaleStatus,batchDeleteProduct,queryProductCatalog,batchUpdateProductCatalog,querySkuConfig,batchDeleteSkuConfig,
	    	addSkuConfig,querySupplier,batchinitProductSupplier,updateProduct,queryStall,queryProductUrl,batchImportProduct,syncWebStoreProduct
	    } from '@/api/getData'
    import {userInfo} from  '../config/mUtils'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'
    import {priceFormat} from '../utils/formater.js'
    import {formatDate} from '../utils/date.js'
    import preview from '../components/preview'
    import certification from '../components/certification'
	import {lodopPrintPreview,lodopPrintDesign,groupPrint,groupPrintPreview,groupPrintPreviewHGZ,groupPrintHGZ} from '../utils/print.js'
    import {export_json_to_excel} from '../vendor/Export2Excel.js'
    const _XLSX = require('xlsx')
    const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;

    export default {
        components:{
            preview,
            certification
        },
        data() {
        	//校验所需金额
        	var validatePrice = (rule, value, cb) => {
                var pattern = /^(-?\d+)(\.\d+)?$/;
                var pattern2 = /^-?\d+\.?\d{0,2}$/;
                if (!pattern.test(value)) {
                    cb(new Error('特定价格必须为数字'))
                }else if(value <0){
                	cb(new Error('特定价格必须为正数'))
                }else if(!pattern2.test(value)){
                	cb(new Error('特定价格不能超过两位小数'))
                }else{
                	cb();
                }
            }
            return {
            	addSpecialCompformRule:{
            		companySpecialPrice:[
                    	{ validator: validatePrice, trigger: 'blur' }
                    ],
            	},
            	addSpecialCompform:{
            		companySpecialName:'',
                	companySpecialPrice:'',
                },
                currentIndex:0,
            	statusTip:'',
            	saleStatusTip : '',
                //商家集合
                restaurants: [],

                skuConfigType:1,

                catalogType:'',
                printDialog:false,
                skumodel: false,
                previewDialog:false,
                productUrlDialog:false,
                tempProductId: '',
                tempCompanyId: '',
                tempSaleState: '',
                sellPrice:'',
            	supplierName:'',
            	productCode:'',
            	dialogCustomerVisible:false,
            	supplierData:[],
            	supplierId:'',
            	loading:false,
            	saleState:1,
            	//默认每页数据量
                pageSize: 10,

                //当前页码
                currentPage: 1,

                totalCount:0,

                seatRadio:'',

                productId:'',

                productCatalog:'',

                input2:'',
                currentPage4: 4,
                dialogVisible:false,
                dialogVisible1:false,
                dialogVisible2:false,
                tableData: [],
                tableData2:[{}],
                form: {
                    name: '',
                    region: '',
                    type: '',
                    telephone:''
                },
                options: [],
                value: '',
                ruleForm: {
                    name: '',
                    number:'',
                },
                warehouseList:[
                    {
                        label:1,
                        list:'仓位1'
                    },
                    {
                        label:2,
                        list:'仓位2'},
                    {
                        label:3,
                        list:'仓位3'},
                ],
                radio:1,
                dynamicTags: [
                	{
		                "name": "颜色",
		                "type": 1
		            },
                	{
		                "name": "尺码",
		                "type": 2
		            }
                ],
                tags: [],
                inputVisible: false,
                inputValue: '',
                juli:'0',
                dynamicTagsco: [],
                inputVisibleco: false,
                inputValueco: '',
                printSkuType: '80*50',
                printRadio:"1",
                printProductCode:'',
                printProductCodePrefix:'',
                previewProductVariant:[],
                printRow:{},
                printProductBarText:'',
                printStallCode:'',
                printStallName:'',
                totalPrintNum:0,
                productUrlData:[
                	{
                		detailUrl:'https://item.taobao.com/item.htm?id=560055652892&spm=2015.12107834.0.0'
                	},
                	{
                		detailUrl:'https://item.taobao.com/item.htm?id=560055808612&spm=2015.12107834.0.0'
                	}
                ],

                dialogImport:false,//导入商品弹窗显示

                importExcelData:'',//导入数据

                importFaileData:[],//导入失败数据

                uploadFileName:'',//上传文件名称

                accomplish:true,
                
                jsonArray:[],
                
                loading2:false,
            }
        },
        watch:{
            '$route':function (route) {
            	this.totalPrintNum = 0;
            	this.initloadData();
            	this.initloadCatalogData();
            }
        },
        async mounted(){
        	this.initCompany();
        	this.initStall();
        	this.initSkuConfig();
            this.initloadData();
            this.initloadCatalogData();
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            handleCloseco(tag) {
                this.dynamicTagsco.splice(this.dynamicTagsco.indexOf(tag), 1);
                this.deleteSkuConfig(tag.id);
            },

            showInputco() {
                this.inputVisibleco = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInputco.$refs.input.focus();
                });
            },

            handleInputConfirmco() {
                let inputValue = this.inputValueco;
                if(inputValue == null || inputValue == ''){
            		return;
            	}
                this.addSkuConfig(inputValue);
            },
             handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            handleIconClick(){
                console.log(1)
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.initloadData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.initloadData();
            },

            async initCompany(){
		      	let param = {
        			pageSize:100,
        			pageIndex:1
        		}
		      	let result = [];
        		const res = await findCompanysByNameAndMoblie(param);
                if (res.isSuccess == true) {
                	res.result.data.results.forEach((obj) => {
                		let row = {
                			value:obj.nickName,
                			address:obj.compId,
                			compId:obj.compId
                		}
                		this.restaurants.push(row);
                	});
                }
		    },

		    async queryProductUrl(productId){
		      	let param = {
		      		productId:productId,
        			pageSize:100,
        			pageIndex:1
        		}
		      	this.productUrlData = [];
        		const res = await queryProductUrl(param);
                if (res.isSuccess == true) {
                	if(res.result.results && res.result.results.length>1){
                		this.productUrlData = res.result.results;
                		this.productUrlDialog = true;
                	}else if(res.result.results && res.result.results.length==1){
                		var a = document.createElement('a');
			              a.setAttribute('href', res.result.results[0].detailUrl);
			              a.setAttribute('target', '_blank');
			              a.setAttribute('id', 'id');
			              // 防止反复添加
			              if(!document.getElementById('id')) {
			                  document.body.appendChild(a);
			              }
			              a.click();
                		this.productUrlDialog = false;
                	}
                }
		    },

		    async initStall(){
		    	let param = {
		    		stall:{
		    			companyId:userInfo().companyId
		    		},
        			pageSize:1,
        			pageIndex:1
        		}
		    	const res = await queryStall(param);
                if (res.isSuccess == true) {
                	res.result.stall.results.forEach((obj) => {
                		if(obj.serialNub){
                			this.printStallCode = obj.serialNub;
                		}
                		if(obj.name){
                			this.printStallName = obj.name;
                		}
                	});
                }
		    },

		    async initSkuConfig(){
		    	this.tags = [];
		    	this.dynamicTagsco = [];
		    	let param = {
		    		companyId:userInfo().companyId,
        			pageSize:100,
        			pageIndex:1
        		}
		      	let result = [];
        		const res = await querySkuConfig(param);
                if (res.isSuccess == true) {
                	this.tags = res.result.results;
                	this.tags.forEach((obj) => {
                		if(obj.type == 1){
                			this.dynamicTagsco.push(obj);
                		}
                	});
                }
		    },

			//从服务器获取数据
            async initloadData() {
            	this.tableData = [];
            	let param ={
                    companyId:userInfo().companyId,
            		pageIndex:this.currentPage,
    				pageSize:this.pageSize,
    				supplierName:this.supplierName,
    				productCode:this.productCode,
    				productCatalogId:this.catalogType,
    				saleState:this.saleState
            	}
                const res = await queryProduct(param);
                if (res.isSuccess == true) {
                	this.tableData = res.result.results;
                	this.tableData.forEach(obj => {
                		if(obj.purchasePrice){
                			obj.purchasePrice = Number(obj.purchasePrice).toFixed(2);
                		}
                		if(obj.sellPrice){
                			obj.sellPrice = Number(obj.sellPrice).toFixed(2);
                		}
                		obj.purchasePriceFlag = 0;
                		obj.sellPriceFlag = 0;
                	})
                	if(this.currentPage == 1){
                		this.totalCount =  res.result.totalCount;
                	}
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
            //同步商品
           async synchronousGoods(){
		        let param={
                    companyId:userInfo().companyId,
                    startDate:'',
                    endDate:''
                }
               const res = await syncWebStoreProduct(param);
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
            //打印
            print(row){
            	this.totalPrintNum = 0;
            	this.printRow = row;
            	this.printProductCode = row.productCode;
            	this.printProductBarText = row.companyName;
            	this.printRow.productVariant.forEach(obj => {
            		if(obj.printNum){
            			obj.printNum = '';
            		}
            	});
                this.printDialog = true;
            },

            printProduct(){
            	this.printDialog = false
            },
            initFirstPageData(){
            	this.currentPage = 1;
            	this.initloadData();
            },

            async configWarehour(id,warehouseId,warehouseSeatId){
            	this.productId = id;
            	this.seatRadio = warehouseSeatId;
            	let param = {
            		warehouseId:warehouseId
            	}
            	this.warehouseList = [];
            	const res = await queryWarehouseSeatForStall(param);
                if (res.isSuccess == true) {
                	res.result.forEach((obj) => {
                		let seat = {
                			id:obj.id,
                			name:obj.name
                		}
                		this.warehouseList.push(seat);
                		this.dialogVisible1 = true;
                	});
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            async updateWarehouseSeat(){
            	let param = {
            		productId:this.productId,
            		warehouseSeatId:this.seatRadio
            	}
            	const res = await updateWarehouseSeatByProduct(param);
                if (res.isSuccess == true) {
                	this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.dialogVisible1 = false;
                    this.initloadData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

		      handleSelect(item) {
		        console.log(item);
		      },

		      showstallAddGoods(newVaule){
		      	this.$router.push({path: '/stallAddGoods',query:{productId:newVaule.id,status:'OK'}});
		      },

		      showstallAddGoods2(){
		      	this.$router.push({path: '/stallAddGoods',query:{status:'NO'}});
		      },

		      showSpecificsellerForStallDia(productId,companyId){
		      	this.tempProductId = productId;
		      	this.tempCompanyId = companyId;
		      	this.dialogVisible2 = true;
		      },


		      async addSpecificsellerForStall(formName){
            	this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let specificCompId = '';
				      	this.restaurants.forEach((obj) => {
				      		if(obj.value == this.addSpecialCompform.companySpecialName){
				      			specificCompId = obj.compId;
				      		}
				      	});
				      	this.addSpecialCompform.specificCompId = specificCompId;
				      	this.addSpecialCompform.productId = this.tempProductId;
				      	this.addSpecialCompform.companyId = this.tempCompanyId;
                        const res = await addProductPriceConfig(this.addSpecialCompform);
                        if (res.isSuccess == true) {
                            this.$message({
                                type: 'success',
                                message: res.result.msg
                            });
                            this.dialogVisible2 = false
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.errorMsg
                            });
                        }
					} else {

						return false;
					}
				});
          	},

          	showSaleStateConfig(productId, status){
          		if(status == 1){
          			this.statusTip = '产品下架';
          			this.saleStatusTip = '是否下架该商品？';
          		}else{
          			this.statusTip = '产品上架';
          			this.saleStatusTip = '是否上架该商品？';
          		}
          		this.tempProductId = productId;
          		this.tempSaleState = status;
          		this.dialogVisible = true;
          	},

          	batchUpdateSaleState(status){
          		let showMsg = '';
          		if(status == "1"){
          			showMsg = "上架";
          		}else{
          			showMsg = "下架";
          		}
          		if(this.multipleSelection == undefined || this.multipleSelection.length==0){
		    		this.$message({
                        type: 'error',
                        message: '请先勾选要'+showMsg+'的商品！'
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
                        message: '请先勾选要'+showMsg+'的商品！'
                    });
                    return;
                }
		        this.$confirm('是否确认'+showMsg+'选中的商品?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.changeProductSaleStatus(status,array);
		        }).catch(() => {

		        });
          	},

          	updateSaleStateForStall(){
          		let saleState = 1;
          		if(this.tempSaleState == 1){
          			saleState = 0;
          		}
          		let productIds = [];
          		productIds.push(this.tempProductId);
          		this.changeProductSaleStatus(saleState,productIds);
          	},

          	async changeProductSaleStatus(state, array){
          		let params = {
          			productIds: array,
          			status: state
          		};
          		const res = await changeProductSaleStatus(params);
          		if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    this.dialogVisible = false
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
                const res = await batchDeleteProduct(param);
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

            //从服务器获取数据
            async initloadCatalogData() {
            	this.tableData = [];
            	let param ={
            		companyId:userInfo().companyId,
            		pageIndex:1,
    				pageSize:1000
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
            lefttrup(){
                this.juli = Number(this.juli)+57.56
                console.log(this.juli)
                let skumain = document.getElementsByClassName("skumain")[0];
                if(this.juli >= 57.56 ){
                    this.juli = 0
                    console.log(this.juli)
                    return false
                }else{
                skumain.style.left = this.juli+'px';
                }
            },
            righttrup(){
                this.juli = Number(this.juli)-57.56
                 console.log(this.juli)
                let skumain = document.getElementsByClassName("skumain")[0];
                skumain.style.left = this.juli+'px';
            },
            dynamicTagClick(tag,index){
                this.currentIndex=index;
            	this.skuConfigType = tag.type;
            	let taglist = [];
            	this.tags.forEach((obj) => {
            		if(tag.type == obj.type){
            			taglist.push(obj);
            		}
            	});
            	this.dynamicTagsco = taglist;
            },

            async deleteSkuConfig(id){
            	let array = [];
            	array.push(id);
            	let param = {
                	skuConfigIds:array
                }
                const res = await batchDeleteSkuConfig(param);
            	if (res.isSuccess == true) {
                    this.$message({
                        type: 'success',
                        message: res.result.msg
                    });
                    let tempTag = [];
                    this.tags.forEach(obj => {
                    	if(obj.id != id){
                    		tempTag.push(obj);
                    	}
                    });
                    this.tags = tempTag;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            async addSkuConfig(name){
            	let param = {
                	name:name,
                	companyId:userInfo().companyId,
                	type:this.skuConfigType
                }
                const res = await addSkuConfig(param);
            	if (res.isSuccess == true) {
                    let row = {
                    	id:res.result.id,
                    	name:name,
                    	companyId:userInfo().companyId,
                    	type:this.skuConfigType
                    }
                    this.tags.push(row);
                    this.dynamicTagsco.push(row);
                    this.inputVisibleco = false;
                    this.inputValueco = '';
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },

            async remoteMethod(query){
                if(query!=''){
                    this.loading = true;
                    let params = {
	            		param:{
	                        companyId:userInfo().companyId,
	                        name:query
	                    },
	                    pageIndex:1,
	                    pageSize:15
	            	}
                    const res = await querySupplier(params);
                    setTimeout(() => {
                        this.loading = false;
                        this.supplierData = res.result.results;
                    }, 200);
                } else {
                    this.productData = [];
                }
            },

            initSupplier(){
            	if(this.multipleSelection == undefined || this.multipleSelection.length==0){
		    		this.$message({
                        type: 'error',
                        message: '请先勾选要修改的商品！'
                    });
                    this.supplierId = '';
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
                    this.supplierId = '';
                    return;
                }
                if(this.supplierId == ''){
            		this.$message({
                        type: 'error',
                        message: '请先选择供应商！'
                    });
            		return;
            	}
				this.dialogCustomerVisible = false;
		        this.$confirm('是否确认修改选中的商品?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.batchUpdateSupplier(array);
		        }).catch(() => {
					this.supplierId = '';
		        });
            },

            async batchUpdateSupplier(array){
            	let param = {
                	productIds:array,
                	supplierId:this.supplierId
                }
                const res = await batchinitProductSupplier(param);
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
                this.supplierId = '';
                this.initloadData();
            },

            clickpurchasePrice(row){
            	let tempData = [];
            	this.tableData.forEach((obj,index) => {
        			if(obj.id==row.id){
        				obj.purchasePriceFlag = 1;
        			}
        			tempData.push(obj);
               })
            	this.tableData = tempData;
            },

            clickSellPrice(row){
            	let tempData = [];
            	this.tableData.forEach((obj,index) => {
        			if(obj.id==row.id){
        				obj.sellPriceFlag = 1;
        			}
        			tempData.push(obj);
               })
            	this.tableData = tempData;
            },

            async changePrice(row){
            	let param = {
            		productId:row.id,
            		type:'2',
            		supplierPrice:row.purchasePrice,
            		sellPrice:row.sellPrice
            	}
            	let res = await updateProduct(param);
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


			groupPreviewPrint(){
            		this.printRow.dateTime = formatDate(new Date(),'yyyy-MM-dd hh:mm');
            	let params = [];
            	if(this.printRadio == 1){//条形码
            		if(this.printProductCodePrefix != '' && this.printProductCodePrefix.length>4){
            			this.$message({
                            type: 'error',
                            message: "前缀不能超过4个字符"
                        });
                        return;
            		}
            		if(this.printProductBarText == ''){
            			this.$message({
                            type: 'error',
                            message: "请先输入条码标题"
                        });
                        return;
            		}
            		if(this.printProductBarText.length>12){
            			this.$message({
                            type: 'error',
                            message: "条码标题不能超过12个字符"
                        });
                        return;
            		}
            		let printSkuConfig = this.printSkuType.split("*");
            		let printWidth = "800";
            		let printHeight = "500";
            		if(printSkuConfig.length>1){
            			printWidth = printSkuConfig[0]*10;
            			printHeight = printSkuConfig[1]*10;
            		}
            		this.printRow.productVariant.forEach(obj => {
            			let barText = this.printProductCodePrefix+this.printStallCode+"-"+this.printRow.productCode+"-"+obj.colour+"-"+obj.size;
	            		let row = {
	            			title:this.printProductBarText,
	            			barCode:obj.barcode,
	            			detail:obj.colour+";"+obj.size,
	            			dateTime:this.printRow.dateTime,
	            			printNum:obj.printNum,
	            			barText:barText
	            		}
	            		if(obj.printNum != '' && obj.printNum>0){
	            			params.push(row);
	            		}
	            	});
	            	if(params.length == 0){
	            		this.$message({
                            type: 'error',
                            message: "请输入要打印的条码数量"
                        });
                        return;
	            	}
	            	var printResult = this.groupPrintPreview(params,printWidth,printHeight);
	            	if(printResult != null && printResult.code == 0){
	            		this.$message({
                            type: 'error',
                            message: printResult.msg
                        });
                        return;
	            	}
            	}else{
            		this.printRow.productVariant.forEach(obj => {
	            		let row = {
	            			title:this.printRow.title,
	            			productCode:this.printRow.productCode,
	            			companyName:this.printStallName,
	            			barCode:obj.barcode,
	            			detail:obj.colour+";"+obj.size,
	            			dateTime:this.printRow.dateTime,
	            			price:this.printRow.sellPrice,
	            			printNum:obj.printNum
	            		}
	            		if(obj.printNum != '' && obj.printNum>0){
	            			params.push(row);
	            		}
	            	});
	            	var printResult = this.groupPrintPreviewHGZ(params);
	            	if(printResult != null && printResult.code == 0){
	            		this.$message({
                            type: 'error',
                            message: printResult.msg
                        });
                        return;
	            	}
            	}

            },




            printDirect(){
            	this.printRow.dateTime = formatDate(new Date(),'yyyy-MM-dd hh:mm');
            	let params = [];
            	if(this.printRadio == 1){//条形码
            		if(this.printProductCodePrefix != '' && this.printProductCodePrefix.length>4){
            			this.$message({
                            type: 'error',
                            message: "前缀不能超过4个字符"
                        });
                        return;
            		}
            		if(this.printProductBarText == ''){
            			this.$message({
                            type: 'error',
                            message: "请先输入条码标题"
                        });
                        return;
            		}
            		if(this.printProductBarText.length>12){
            			this.$message({
                            type: 'error',
                            message: "条码标题不能超过12个字符"
                        });
                        return;
            		}
            		let printSkuConfig = this.printSkuType.split("*");
            		let printWidth = "800";
            		let printHeight = "500";
            		if(printSkuConfig.length>1){
            			printWidth = printSkuConfig[0]*10;
            			printHeight = printSkuConfig[1]*10;
            		}
            		this.printRow.productVariant.forEach(obj => {
            			let barText = this.printProductCodePrefix+this.printStallCode+"-"+this.printRow.productCode+"-"+obj.colour+"-"+obj.size;
	            		let row = {
	            			title:this.printProductBarText,
	            			barCode:obj.barcode,
	            			detail:obj.colour+";"+obj.size,
	            			dateTime:this.printRow.dateTime,
	            			printNum:obj.printNum,
	            			barText:barText
	            		}
	            		if(obj.printNum != '' && obj.printNum>0){
	            			params.push(row);
	            		}
	            	});
	            	if(params.length == 0){
	            		this.$message({
                            type: 'error',
                            message: "请输入要打印的条码数量"
                        });
                        return;
	            	}
	            	var printResult = this.groupPrint(params,printWidth,printHeight);
	            	if(printResult != null && printResult.code == 0){
	            		this.$message({
                            type: 'error',
                            message: printResult.msg
                        });
                        return;
	            	}
            	}else{//合格证
            		this.printRow.productVariant.forEach(obj => {
	            		let row = {
	            			title:this.printRow.title,
	            			productCode:this.printRow.productCode,
	            			companyName:this.printStallName,
	            			barCode:obj.barcode,
	            			detail:obj.colour+";"+obj.size,
	            			dateTime:this.printRow.dateTime,
	            			price:this.printRow.sellPrice,
	            			printNum:obj.printNum
	            		}
	            		params.push(row);
	            	});
	            	var printResult = this.groupPrintHGZ(params);
	            	if(printResult != null && printResult.code == 0){
	            		this.$message({
                            type: 'error',
                            message: printResult.msg
                        });
                        return;
	            	}
            	}

            },

            exportProductData(){
            	const tHeader = ['货号', '商品名称','供应商','成本价','批发价','淘宝商品编码','库存数'];
		　　　  const filterVal = ['productCode', 'title','supplierName', 'purchasePrice', 'sellPrice','goodsCode','stockNum'];
		　　　  const list = this.tableData;
		　　　  const data = this.formatJson(filterVal, list);
		　　　  export_json_to_excel(tHeader, data, '商品数据');
            },

            formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]));
		　　　},

			formatComeType:function(row, column){
            	let comeType = row.comeType;
            	if(comeType == 0){
            		return "自建商品";
            	}else if(comeType == 1){
            		return "淘宝天猫";
            	}else if(comeType == 2){
            		return "京东";
            	}else{
            		return "";
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
                this.loading2 = true;
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
	                	jsonStr:importDataStr,
	                	companyId:userInfo().companyId
	               }
               const res = await batchImportProduct(param);
            	if (res.isSuccess == true) {
                    if(res.result.data && res.result.data.length>0){
                    	res.result.data.forEach(obj => {
                    		this.importFaileData.push(obj);
                    	});
                    }
                    if(index<this.jsonArray.length){
                    	this.importFileData(index);
                    }else{
                    	this.loading2 = false;
                   		this.uploadFileName = "";
                   		let obj = document.getElementById("uploatfile");
               			obj.value = '';
               			if(this.importFaileData.length>0){
               				this.exportFaileExcel();
               			}else{
               				this.$message({
	                            type: 'success',
	                            message: res.result.msg
	                        });
               			}
               			this.initloadData();
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
			},

			async exportFaileExcel() {		//导出excel
            	if(this.importFaileData.length>0){
            		const tHeader = ['商品名称','商品货号', '商品主图(链接)','批发价','商品分类',"商品规格","供应商","成本价","商品图片1","商品图片2","备注"];
			　　　  const filterVal = ['title','productCode', 'imgUrl_main','sellPrice','catelogName','productVariantStr','supplierName','purchasePrice','imgUrl_1','imgUrl_2','msg'];
			　　　  const list = this.importFaileData;
			　　　  const data = this.formatJson(filterVal, list);
			　　　  export_json_to_excel(tHeader, data, '档口导入商品失败数据');
            	}
			},

			inputPrintNum(){
				let tempPrintNum = 0;
				this.printRow.productVariant.forEach(obj => {
					if(obj.printNum){
						tempPrintNum = tempPrintNum+obj.printNum*1;
					}
				});
				this.totalPrintNum = tempPrintNum;
			},

            priceFormat,
			lodopPrintPreview,
			groupPrintPreview,
			groupPrint,
			groupPrintPreviewHGZ,
			groupPrintHGZ,
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stallProductManagement';

	.dialogSignIn{
    	width: 250px;
    }

    .operation{
        img{
            border-right: 1px solid #ccc;
            padding: 0 10px;
        }
        img:last-child{
            border-right: none;
        }
    }
</style>
