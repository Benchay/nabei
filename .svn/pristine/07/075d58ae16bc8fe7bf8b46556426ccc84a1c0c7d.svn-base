<template>
    <div class="fillcontain">
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
        </ul>
        <div class="addGoods">
            <router-link :to='{path:"/stallProductManagement"}' class="comeBack right">返回</router-link>
            <div class="addFrom">
                <el-form :model="productForm" ref="productForm" label-width="130px">
					<div class="alltrup">
					<div class="lefttrup">
						     <el-col :span="20">
                        <el-form-item label="商品名称：" prop="title">
                            <el-input v-model="productForm.title" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="商品货号：" prop="productCode">
                        	<el-input v-if="productCodeValid == 2" v-model="productForm.productCode" ></el-input>
                            <el-input v-else :disabled="editFlag" v-model="productForm.productCode" ></el-input>
                            
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="批发价：" prop="sellPrice" >
                            <el-input v-model="productForm.sellPrice"></el-input>
                        </el-form-item>
                    </el-col>
					      <el-col :span="24">
                        <el-form-item label="商品分类：">
                            <el-select v-model="productForm.catelogId" placeholder="分类至">
                                <el-option
			                        v-for="item in productCatalogData"
			                        :key="item.id"
			                        :label="item.name"
			                        :value="item.id">
			                    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
					<el-col :span="24">
                        <el-form-item label="商品规格：">
                            <!--未添加规格 显示-->
                            <a href="javascript:void(0)" class="buttonColor" @click="dialogVisible = true">添加商品规格</a>
                            <!---->

                            <!--已添加规格 显示-->
                            <!-- <a href="javascript:void(0)" class="blue2" v-show="continueAddSpecFlag" @click="dialogVisible = true">+继续添加</a> -->
                            
                            <ul>
                                <li class="pricingList">
                                    <p>{{checkedSkuStr}}</p>
                                </li>
                            </ul>
                            <!---->
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="特定商家定价：">
                            <!--未添加商家 显示-->
                            <a href="javascript:void(0)" class="buttonColor" @click="addCompanyDia">选择特定商家</a>
                            <!---->

                            <!--已添加商家 显示-->
                            <!-- <a href="javascript:void(0)" class="blue2" v-show="continueAddSpeCusFlag" @click="addCompanyDia">+继续添加</a> -->
                            <ul v-for="(item,index) in productPriceConfigData">
                                <li class="pricingList">
                                    <p>{{item.sellerName}}</p>
                                    <p class="flex">￥<el-input v-model="item.price" size="mini"></el-input></p>
                                    <p @click="deleteCompanyTag(index)"><img src="../image/delete03.png" alt=""></p>
                                </li>
                            </ul>
                            <!---->
                        </el-form-item>
                    </el-col>
                     
                    <el-col :span="24">
                        <el-form-item label="供应商：">
                            <!--未添加工厂 显示-->
                            <a href="javascript:void(0)" class="buttonColor" @click="dialogVisible2 = true">选择供应商</a>

                            <!--已添加工厂 显示-->
                            <!-- <a href="javascript:void(0)" class="blue2" @click="dialogVisible = true">+继续添加</a> -->
                            <ul v-if="supplierName != ''">
                                <li class="pricingList">
                                    <p>{{supplierName}}</p>
                                    <p class="flex">￥<el-input v-model="supplierPrice" size="mini"></el-input></p>
                                </li>
                            </ul>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="上架：">
                            <el-switch on-text="" off-text="" on-color="#46cfc5" v-model="saleStateFlag"></el-switch>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="12">
                        <el-form-item label="商品描述：">
                            <el-input type="textarea" v-model="addProductform.description"></el-input>
                        </el-form-item>
                    </el-col>-->
					</div>
					<div class="righttrup">
                    <el-col :span="24">
                        <el-form-item>
							<el-upload
								action="/cws/uploadFile"
								name = "uploadFile"
								:headers = "{token:getStore('token')}"
								list-type="picture-card"
								limit="2"
								:file-list="uploadFileList"
								:on-preview="handlePictureCardPreview"
								:on-remove="handleRemove"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload">
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogImgVisible" size="tiny">
							  <img width="100%" :src="imgUrl_main" alt="">
							</el-dialog>
							<span v-if="uploadFileLimitFlag" class="avatar-uploaderdetail">上传商品图片</span>
							<span v-if="uploadFileLimitFlag" class="detailnum">(最多3张)</span>
                        </el-form-item>
                    </el-col>
					</div>
					    <el-col :span="24" class="goodsLast">
                       <el-form-item style="text-align: center;">
                           <a href="javascript:void(0)" @click="submitForm('productForm')" class="buttonColor pd-55">保存</a>
                           <!--<a href="javascript:void(0)" @click="resetForm('addProductform')" class="buttonColor">重置</a>-->
                           <router-link :to='{path:"/stallProductManagement"}' class="buttonColor pd-55">取消</router-link>
                       </el-form-item>
                   </el-col>
					</div>
                </el-form>
            </div>
        </div>
        <el-dialog
            title="添加商品规格"
            :visible.sync="dialogVisible"
            size="tiny"
            :before-close="handleClose"
			id="tjmall">
            <div>
               <div class="addSpecification" style="margin-bottom: 20px">
                   <el-col :span="3" class="tite" style="text-align: center;">颜色：</el-col>
                   <el-col :span="21">
					  <el-radio-group v-model="checkedColorRadio" @change="clickColor">
					    <el-radio v-for="tag in colorTags" :label="tag.name">{{tag.name}}</el-radio>
					  </el-radio-group>
					  
                       <el-input
                           class="input-new-tag"
                           v-if="inputColorVisible"
                           v-model="inputColorValue"
                           ref="saveColorTagInput"
                           size="mini"
                           @keyup.enter.native="handleInputColorConfirm"
                           @blur="handleInputColorConfirm">
                       </el-input>
                       <el-button v-else class="button-new-tag buttonColor" size="small" @click="showInputColor">+添加</el-button>
                   </el-col>			
               </div>
                <div class="addSpecification" style="margin-bottom: 20px">
                    <el-col :span="3" style="text-align: center;">尺码：</el-col>
                    <el-col :span="21">
                        <el-checkbox-group 
						    v-model="checkedSizes"
						    :min="0"
						    :max="10">
						    <el-checkbox v-for="tag in sizeTags" :label="tag.name" :key="tag.name">{{tag.name}}</el-checkbox>
						  </el-checkbox-group>
                        <el-input
                            class="input-new-tag"
                            v-if="inputSizeVisible"
                            v-model="inputSizeValue"
                            ref="saveSizeTagInput"
                            size="mini"
                            @keyup.enter.native="handleInputSizeConfirm"
                            @blur="handleInputSizeConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag buttonColor" size="small" @click="showInputSize">+添加</el-button>
                    </el-col>
                </div>
				<div>
					<el-col :span="3" style="text-align: center;">已选：</el-col>
					<el-col :span="21">{{checkedSkuStr}}</el-col>
				</div>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="confirmSkuData(1)" class="buttonColor">继续添加</a>
                <a href="javascript:void(0)" @click="confirmSkuData(0)" class="buttonColor">确 定</a>
              </span>
        </el-dialog>
        <el-dialog
            title="特定商家定价"
            :visible.sync="dialogVisible1"
            size="tiny"
            :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="110px" class="merchantsPricing">
                <el-form-item label="商家名：">
                    <!--<el-autocomplete v-model="companySpecialName" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>-->
                	<el-select
                        v-model="companySpecialName"
                        filterable
                        remote
                        reserve-keyword
                        size="small"
                        style="width:100%;"
                        placeholder="请输入特定商家名称"
                        :remote-method="remoteCustomerMethod"
                        :loading="loading">
                        <el-option
                        	style="width:200px;"
                            v-for="item in stallCustomerData"
                            :key="item.sellName"
                            :label="item.sellName"
                            :value="item.sellName">
                        </el-option>
                    </el-select>
                </el-form-item>
				
                <el-form-item label="商家定价：">
                    <el-input v-model="companySpecialPrice"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="confirmStallCustomer(1)" class="buttonColor">继续添加</a>
                 <a href="javascript:void(0)" @click="confirmStallCustomer(0)" class="buttonColor">确 定</a>
              </span>
        </el-dialog>
        <el-dialog
            title="供应商"
            :visible.sync="dialogVisible2"
            size="tiny"
            :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="110px" class="merchantsPricing">
                <el-form-item label="供应商名称：">
                    <!--<el-autocomplete v-model="supplierNameInput" :fetch-suggestions="querySupplierSearchAsync" placeholder="请输入供应商名称" @select="handleSupplierSelect"></el-autocomplete>-->
                	<el-select
                        v-model="supplierNameInput"
                        filterable
                        remote
                        reserve-keyword
                        size="small"
                        style="width:100%;"
                        placeholder="请输入供应商名称"
                        :remote-method="remoteSupplierMethod"
                        :loading="loading">
                        <el-option
                        	style="width:200px;"
                            v-for="item in suppliers"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成本价：">
                    <el-input v-model="supplierPriceInput"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" @click="dialogVisible2 = false;" class="buttonColor">取消</a>
                 <a href="javascript:void(0)" @click="confirmSupplier" class="buttonColor">确 定</a>
              </span>
        </el-dialog>
         
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryStallCustomer,querySupplier,addProduct,updateProduct,queryProductCatalog,loadProductInfo,
    		addSkuConfig,querySkuConfig} from '@/api/getData'
	import {userInfo,getStore} from  '../config/mUtils'
	import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },

        
        data() {
        	//校验所需金额
        	var validateProductPrice = (rule, value, cb) => {
                var pattern = /^(-?\d+)(\.\d+)?$/;
                var pattern2 = /^-?\d+\.?\d{0,2}$/;
                if (!pattern.test(value)) {
                    cb(new Error('商品售价必须为数字'))
                }else if(value <0){
                	cb(new Error('商品售价必须为正数'))
                }else if(!pattern2.test(value)){
                	cb(new Error('商品售价不能超过两位小数'))
                }else{
                	cb();
                }
            }
            return {
            	productCodeValid:1,
            	uploadFileLimitFlag:true,
            	uploadFileList:[],
            	checkedColorRadio:'',
            	checkedSkuStr:'',
            	checkedSkuConfig:{},
            	skuConfigData:[],
            	checkedColors:[],
            	checkedSizes:[],
            	editFlag:false,
            	saleStateFlag:true,//上下架
            	imgUrl_main:'',//显示大图时的图片地址
            	dialogImgVisible:false,//显示大图
            	productId:'',//编码商品时，传过来的商品id参数
                dialogVisible1: false,//特定商家定价弹窗显示
                dialogVisible:false,//添加商品规格弹窗显示
                dialogVisible2: false,//供应商弹窗显示
                inputColorValue:'',//规格弹窗中颜色输入框
                inputSizeValue:'',//规格弹窗中尺码输入框

                productCatalogData:[],//商品分类数据

                suppliers:[],//待选择供应商信息
                
                stallCustomerData:[],//档口特定商家列表
                
                productPriceConfigData:[],//已选择的特定商家
                
                loading:false,

                totalColors:'',

                totalSizes:'',
				
				colorTags:[],
				sizeTags:[],
//                弹窗标签
				dynamicColorTags:[],
				dynamicSizeTags:[],
				
				supplierName:'',
				supplierId:'',
				supplierPrice:'',
				
				supplierNameInput:'',
				
				supplierPriceInput:'',

                inputColorVisible: false,
                inputSizeVisible: false,
                companySpecialName:'',
                companySpecialPrice:'',

                productForm:{
                	title:'',
                	productCode:'',
                	sellPrice:'',
                	catelogId:''
                },

                handleClose:'11',
                token:'',
            }
        },
        watch:{
            '$route':function (route) {
                this.token = getStore('token');
               this.productForm = {
               	   title:'',
                   productCode:'',
                   sellPrice:'',
                   catelogId:''
               }
               this.productPriceConfigData = [];
               this.dynamicColorTags = [],
			   this.dynamicSizeTags = [],
	    	   this.totalColors = '';
	    	   this.totalSizes = '';
	    	   this.supplierPrice = '';
	    	   this.supplierName = '';
	    	   this.imgUrl_main = '';
	    	   this.checkedSkuStr = '';
	    	   this.checkedColors = [];
               this.checkedSizes = [];
               this.skuConfigData = [];
               this.checkedColorRadio = '';
               this.supplierNameInput = '';
               this.supplierPriceInput = '';
            	if(this.$route.query.status=='OK'){
            		this.editFlag = true;
            		this.productId = this.$route.query.productId;
            	}else{
            		this.productId = '';
            		this.editFlag = false;
            	}
            	this.initSkuConfig();
				this.initloadCatalogData();
            	this.getProductDetailByProductId();
            }
        },
        mounted(){
        	if(this.$route.query.status=='OK'){
    			this.productId = this.$route.query.productId;
        		this.editFlag = true;
        	}else{
        		this.editFlag = false;
        	}
        	this.initSkuConfig();
			this.initloadCatalogData();
			this.getProductDetailByProductId();
        },

        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
			clickColor(){
				this.checkedSkuConfig = [];
				let flag = false;
				this.skuConfigData.forEach(obj => {
					if(obj.colorName == this.checkedColorRadio){
						this.checkedSizes = obj.checkedSizes;
						flag = true;
					}
				});
				if(!flag){
					this.checkedSizes = [];
				}
			},

            async getProductDetailByProductId(){
            	this.uploadFileList = [];
            	if(this.productId==''){
            		return;
            	}
            	this.dynamicColorTags = [];
            	this.dynamicSizeTags = [];
            	this.productPriceConfigData = [];
            	let param = {
        			productId:this.productId
        		}
            	const res = await loadProductInfo(param);
            	if (res.isSuccess == true) {
            		this.productForm = res.result;
                	this.productForm.sellPrice = this.productForm.sellPrice+"";
                	if(res.result.imgUrl_main && res.result.imgUrl_main != ''){
                		this.uploadFileList.push({url:res.result.imgUrl_main});
                	}
                	if(res.result.imgUrl_1 && res.result.imgUrl_1 != ''){
                		this.uploadFileList.push({url:res.result.imgUrl_1});
                	}
                	if(res.result.imgUrl_2 && res.result.imgUrl_2 != ''){
                		this.uploadFileList.push({url:res.result.imgUrl_2});
                	}
                	if(this.uploadFileList.length>=3){
	            		this.uploadFileLimitFlag = false;
	            		var elems = document.getElementsByClassName('el-upload--picture-card');
						for (var i=0;i<elems.length;i+=1){
						  elems[i].style.display = 'none';
						}
	            	}
                	if(this.productForm.saleState == 1){
                		this.saleStateFlag = true;
                	}else{
                		this.saleStateFlag = false;
                	}
                	if(this.productForm.id){
                		this.productForm.productId = this.productForm.id;
                	}
					if(res.result.productCodeValid){
						this.productCodeValid = res.result.productCodeValid;
					}else{
						this.productCodeValid = 1;
					}
                	

                	this.supplierPrice = res.result.purchasePrice;
                	if(res.result.supplier){
                		this.supplierName = res.result.supplier.name;
                	}
                	this.totalColors = res.result.colours;
                	this.totalSizes = res.result.sizes;
                	res.result.colours.split("_").forEach((obj) => {
                		this.dynamicColorTags.push(obj.toString());
                	});
                	res.result.sizes.split("_").forEach((obj) => {
                		this.dynamicSizeTags.push(obj.toString());
                	});
                	this.skuConfigData = [];
                	if(res.result.productVariant){
                		this.dynamicColorTags.forEach(obj1 => {
                			let checkedSizes = [];
                			res.result.productVariant.forEach(obj => {
                				if(obj1 == obj.colour){
                					checkedSizes.push(obj.size);
                				}
                			})
                			let row = {
                				colorName:obj1,
                				checkedSizes:checkedSizes
                			}
                			this.skuConfigData.push(row);
                		});
                		this.checkedSkuStr = '';
				      	this.skuConfigData.forEach(obj => {
				      		let str = '';
				      		obj.checkedSizes.forEach(obj1 => {
				      			str += ", "+obj1;
				      		})
				      		str = str.substring(1);
				      		str = obj.colorName+"/"+str;
				      		this.checkedSkuStr += "; "+str;
				      	});
				      	this.checkedSkuStr = this.checkedSkuStr.substring(1);
                	}
                	if(res.result.productPriceConfig){
                		this.productPriceConfigData = res.result.productPriceConfig;
                	}
                }
            },
		    
		    async initSkuConfig(){
		    	this.colorTags = [];
		    	this.sizeTags = [];
		    	let param = {
		    		companyId:userInfo().companyId,
        			pageSize:100,
        			pageIndex:1
        		}
		      	let result = [];
        		const res = await querySkuConfig(param);
                if (res.isSuccess == true) {
                	res.result.results.forEach((obj) => {
                		if(obj.type == 1){
                			this.colorTags.push(obj);
                		}else if(obj.type == 2){
                			this.sizeTags.push(obj);
                		}
                	});
                }
		    },

		    //从服务器获取所有分类数据
            async initloadCatalogData() {
            	this.tableData = [];
            	let param ={
            		companyId:userInfo().companyId,
            		pageIndex:1,
    				pageSize:100
            	}
                const res = await queryProductCatalog(param);
                if (res.isSuccess == true) {
                	this.productCatalogData = res.result.results;

                }else{
                    this.$message({
                        type: 'error',
                        message: res.isSuccess
                    });
                }
            },


            async submitForm(formName){
            	this.productForm.imgUrl_main = '';
            	this.productForm.imgUrl_1 = '';
            	this.productForm.imgUrl_2 = '';
            	
            	for(var i=0;i<this.uploadFileList.length;i++){
            		if(i == 0){
            			this.productForm.imgUrl_main = this.uploadFileList[i].url;
            		}else if(i == 1){
            			this.productForm.imgUrl_1 = this.uploadFileList[i].url;
            		}else if(i == 2){
            			this.productForm.imgUrl_2 = this.uploadFileList[i].url;
            		}
            	}
            	if(this.productForm.title == ""){
            		this.$message({
				        type: 'error',
				        message: "商品名称不能为空"
				    });
				    return;
            	}else if(this.productForm.title.length>30){
            		this.$message({
				        type: 'error',
				        message: "商品名称不能超过30个字符"
				    });
				    return;
            	}
            	if(this.productForm.productCode == ""){
            		this.$message({
				        type: 'error',
				        message: "商品货号不能为空"
				    });
				    return;
            	}else if(this.productForm.productCode.length>20){
            		this.$message({
				        type: 'error',
				        message: "商品货号不能超过20个字符"
				    });
				    return;
            	}
            	var pattern = /^[0-9a-zA-Z-]+$/;
            	if (!pattern.test(this.productForm.productCode)) {
            		this.$message({
				        type: 'error',
				        message: "商品货号只能输入数字和字母"
				    });
				    return;
            	}
            	var pricePattern = /^(-?\d+)(\.\d+)?$/;
                var pricePattern2 = /^-?\d+\.?\d{0,2}$/;
            	if(this.productForm.sellPrice == ""){
            		this.$message({
				        type: 'error',
				        message: "商品售价不能为空"
				    });
				    return;
            	}else if (!pricePattern.test(this.productForm.sellPrice)) {
                    this.$message({
				        type: 'error',
				        message: "商品售价只能输入数字"
				    });
				    return;
                }else if(!pricePattern2.test(this.productForm.sellPrice)){
                	this.$message({
				        type: 'error',
				        message: "商品售价不能超过两位小数"
				    });
				    return;
                }else if(this.productForm.sellPrice<=0){
                	this.$message({
				        type: 'error',
				        message: "商品售价只能输入正数"
				    });
				    return;
                }
            	if(this.supplierName == ""){
            		this.$message({
				        type: 'error',
				        message: "请选择供应商"
				    });
				    return;
            	}

            	if(this.supplierPrice == ""){
            		this.$message({
				        type: 'error',
				        message: "请填写供应商进价"
				    });
				    return;
            	}else if (!pricePattern.test(this.supplierPrice)) {
                    this.$message({
				        type: 'error',
				        message: "供应商进价只能输入数字"
				    });
				    return;
                }else if(!pricePattern2.test(this.supplierPrice)){
                	this.$message({
				        type: 'error',
				        message: "供应商进价不能超过两位小数"
				    });
				    return;
                }else if(this.supplierPrice<0){
                	this.$message({
				        type: 'error',
				        message: "供应商进价只能输入正数"
				    });
				    return;
                }
            	
            	let companyTagFlag = true;
            	this.productPriceConfigData.forEach((obj) =>{
	            	if(obj.price != ""){
	            		if (!pricePattern.test(obj.price)) {
	            			companyTagFlag = false;
		                    this.$message({
						        type: 'error',
						        message: "特定商家定价只能输入数字"
						    });
						    return;
		                }else if(!pricePattern2.test(obj.price)){
		                	companyTagFlag = false;
		                	this.$message({
						        type: 'error',
						        message: "特定商家定价不能超过两位小数"
						    });
						    return;
		                }else if(obj.price*1<=0){
		                	companyTagFlag = false;
		                	this.$message({
						        type: 'error',
						        message: "特定商家定价只能输入正数"
						    });
						    return;
		                }
	            	}
            	});
            	if(!companyTagFlag){
            		return;
            	}
            	
            	let productVariant = [];
            	this.skuConfigData.forEach(obj => {
            		if(obj.colorName && obj.checkedSizes){
            			obj.checkedSizes.forEach(obj1 => {
            				let row = {
            					colour:obj.colorName,
            					size:obj1
            				}
            				productVariant.push(row);
            			});
            		}
            	});
            	if(productVariant.length<1){
                	this.$message({
				        type: 'error',
				        message: "商品规格不能为空"
				    });
				    return;
               }

            	this.$refs[formName].validate(async (valid) => {
					if (valid) {
						this.productForm.productVariant = productVariant;
		            	this.productForm.dynamicCompanyTags = this.productPriceConfigData;
		            	this.productForm.supplierName = this.supplierName;
		            	this.productForm.supplierPrice = this.supplierPrice;
		            	this.productForm.companyId = userInfo().companyId;
		            	if(this.saleStateFlag){
		            		this.productForm.saleState = 1;
		            	}else{
		            		this.productForm.saleState = 0;
		            	}
		            	let res;
		            	if(this.$route.query.status=='OK'){
		            		res = await updateProduct(this.productForm);
		            	}else{
		            	    res = await addProduct(this.productForm);
		            	}
						if (res.isSuccess == true) {
						    this.$message({
						        type: 'success',
						        message: res.result.msg
						    });
						    this.$router.push({path: '/stallProductManagement'});
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
           
           
            handleAvatarSuccess(res, file) {
            	let url = "http://proxy.tintop.cn:26880/"+res.result;
            	this.uploadFileList.push({url:url});
            	if(this.uploadFileList.length>=3){
            		this.uploadFileLimitFlag = false;
            		var elems = document.getElementsByClassName('el-upload--picture-card');
					for (var i=0;i<elems.length;i+=1){
					  elems[i].style.display = 'none';
					}
            	}
		    },
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isPNG = file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG && !isPNG) {
		          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return (isJPG||isPNG) && isLt2M;
		    },
            handleRemove(file, uploadFileList) {
            	let tempUploadFileList = [];
            	this.uploadFileList.forEach(obj => {
            		if(obj.url && obj.url != file.url){
            			tempUploadFileList.push(obj);
            		}
            	});
            	this.uploadFileList = tempUploadFileList;
            	if(this.uploadFileList.length < 3){
            		this.uploadFileLimitFlag = true;
            		var elems = document.getElementsByClassName('el-upload--picture-card');
					for (var i=0;i<elems.length;i+=1){
					  elems[i].style.display = 'block';
					}
            	}
            },
            handlePictureCardPreview(file) {
                this.imgUrl_main = file.url;
                this.dialogImgVisible = true;
            },

            showInputColor(){
            	this.inputColorVisible = true;
            	this.$nextTick(_ => {
                    this.$refs.saveColorTagInput.$refs.input.focus();
                });
            },

            showInputSize() {
                this.inputSizeVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveSizeTagInput.$refs.input.focus();
                });
            },

            handleInputColorConfirm() {
            	if(this.inputColorValue.length>15){
            		this.$message({
				        type: 'error',
				        message: "颜色不能超过15个字符"
				    });
				    return;
            	}
                let inputValue = this.inputColorValue;
                if(inputValue == null || inputValue == ''){
                	this.inputColorVisible = false;
                	this.inputColorValue = '';
                	return;
                }
                this.addSkuConfig(inputValue,1);
            },

            handleInputSizeConfirm() {
            	if(this.inputSizeValue.length>15){
            		this.$message({
				        type: 'error',
				        message: "尺码不能超过15个字符"
				    });
				    return;
            	}
                let inputValue = this.inputSizeValue;
                if(inputValue == null || inputValue == ''){
                	this.inputSizeVisible = false;
                	this.inputSizeValue = '';
                	return;
                }
                this.addSkuConfig(inputValue,2);
            },
		      
		      confirmSkuData(status){
		      	let row = {
		      		colorName:this.checkedColorRadio,
		      		checkedSizes:this.checkedSizes
		      	}
		      	let flag = true;
		      	this.skuConfigData.forEach(obj => {
		      		if(obj.colorName == this.checkedColorRadio){
		      			obj.checkedSizes = this.checkedSizes;
		      			flag = false;
		      		}
		      	});
		      	if(flag){
		      		this.skuConfigData.push(row);
		      	}
		      	this.checkedSkuStr = '';
		      	this.skuConfigData.forEach(obj => {
		      		let str = '';
		      		obj.checkedSizes.forEach(obj1 => {
		      			str += ", "+obj1;
		      		})
		      		str = str.substring(1);
		      		str = obj.colorName+"/"+str;
		      		this.checkedSkuStr += "; "+str;
		      	});
		      	this.checkedSkuStr = this.checkedSkuStr.substring(1);
		      	if(status == 0){
		      		this.dialogVisible = false;
		      	}
		      },

		    confirmStallCustomer(status){
		    	if(this.companySpecialName == ""){
		    		this.$message({
				        type: 'error',
				        message: "请先选择商家名称"
				    });
				    return;
		    	}
		    	var pricePattern = /^(-?\d+)(\.\d+)?$/;
                var pricePattern2 = /^-?\d+\.?\d{0,2}$/;
            	if(this.companySpecialPrice != ""){
            		if (!pricePattern.test(this.companySpecialPrice)) {
	                    this.$message({
					        type: 'error',
					        message: "特定商家定价只能输入数字"
					    });
					    return;
	                }else if(!pricePattern2.test(this.companySpecialPrice)){
	                	this.$message({
					        type: 'error',
					        message: "特定商家定价不能超过两位小数"
					    });
					    return;
	                }else if(this.companySpecialPrice<=0){
	                	this.$message({
					        type: 'error',
					        message: "特定商家定价只能输入正数"
					    });
					    return;
	                }
            	}
            
	    		let compId = '';
	    		this.stallCustomerData.forEach((obj) => {
	    			if(obj.sellName == this.companySpecialName){
	    				compId = obj.sellId;
	    			}
	    		});
	    		let flag = true;
	    		this.productPriceConfigData.forEach((obj) => {
		    		if(obj.sellerName == this.companySpecialName){
		    			obj.price = this.companySpecialPrice;
		    			flag = false;
		    		}
		    	});
		    	if(flag){
		    		let row = {
	    				sellerName:this.companySpecialName,
	    				price:this.companySpecialPrice,
	    				sellerId:compId
	    			}
		    		this.productPriceConfigData.push(row);
		    	};
		    	if(status == 0){
		    		this.dialogVisible1 = false;
		    	}
		    	this.companySpecialName = '';
		    	this.companySpecialPrice = '';
		    	
		    },

		    confirmSupplier(){
				this.supplierName = this.supplierNameInput;
		    	this.supplierPrice = this.supplierPriceInput;
		    	this.dialogVisible2 = false;
		    },

		    deleteSupplier(){
		    	this.supplierName = '';
		    	this.supplierPrice = '';
		    },

		    deleteCompanyTag(index){
		    	this.productPriceConfigData.splice(index,1)
		    },

		   

		    addCompanyDia(){
		    	this.companySpecialName = '';
		    	this.companySpecialPrice = '';
		    	this.dialogVisible1 = true;
		    },

		    async addSkuConfig(name,type){
            	let param = {
                	name:name,
                	companyId:userInfo().companyId,
                	type:type
                }
                const res = await addSkuConfig(param);
            	if (res.isSuccess == true) {
                    let row = {
                    	id:res.result.id,
                    	name:name,
                    	companyId:userInfo().companyId,
                    	type:this.skuConfigType
                    }
                    if(type == 1){
                    	this.colorTags.push(row);
                    	this.inputColorVisible = false;
                		this.inputColorValue = '';
                    }else if(type == 2){
                    	this.sizeTags.push(row);
                    	this.inputSizeVisible = false;
                		this.inputSizeValue = '';
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: res.errorMsg
                    });
                }
            },
			
			//远程搜索模糊查询供应商信息
            async remoteSupplierMethod(query){
                if(query!=''){
                    this.loading = true;
					let param = {
	            		pageIndex:1,
	            		pageSize:100,
	            		param:{
	            			companyId:userInfo().companyId,
	            			name:query
	            		}
	            	}
	            	const res = await querySupplier(param);
	            	this.suppliers = [];
	            	if (res.isSuccess == true) {
	                	if(res.result.results.length>=0){
	                		this.suppliers = res.result.results;
	                		let flag = false;
	                		this.suppliers.forEach(obj => {
	                			if(obj.name == query){
		                			flag = true;
		                		}
	                		});
	                		if(!flag){
	                			this.suppliers.push({name:query});
	                		}
	                	}
	                }else{
	                    this.$message({
	                        type: 'error',
	                        message: res.errorMsg
	                    });
	                }
	                setTimeout(() => {
                        this.loading = false;
                    }, 200);  
                } else {
                    this.suppliers = [];
                }
            },
            
            //远程搜索模糊查询档口客户列表信息
            async remoteCustomerMethod(query){
                if(query!=''){
                    this.loading = true;
					let param = {
						companyId:userInfo().companyId,
	            		sellName:query,
	            		pageIndex:1,
	            		pageSize:100,
	            	}
	            	const res = await queryStallCustomer(param);
	            	this.stallCustomerData = [];
	            	if (res.isSuccess == true) {
	                	if(res.result.results.length>0){
	                		this.stallCustomerData = res.result.results;
	                	}
	                }else{
	                    this.$message({
	                        type: 'error',
	                        message: res.errorMsg
	                    });
	                }
	                setTimeout(() => {
                        this.loading = false;
                    }, 200);  
                } else {
                    this.stallCustomerData = [];
                }
            },
            
            getStore,
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/stallProductManagement';
    .el-form-item__content {
		position: static;
		.pd-55{
			padding: 7px 55px;
		}
    }
    .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .el-upload--picture-card {
	    font-size: 28px;
	    color: #8c939d;
	    width: 110px;
	    height: 110px;
	    line-height: 110px;
		text-align: center;
		
	  }
	  .el-upload-list--picture-card .el-upload-list__item{
		width: 110px;
		height: 110px;
	  }
	  .avatar-uploaderdetail,.detailnum{
		  display: block;
		  width: 110px;
		  height: 20px;
		  text-align: center;
		  font-size: 14px;
	  }
	  .avatar {
	    width: 110px;
	    height: 110px;
	    display: block;
	  }
	  .alltrup{
		  overflow: hidden;
	  }
	  .lefttrup,.righttrup{
		  width: 50%;
		  float: left;
	  }
	  .el-radio-group{
		  .el-radio{
			  width: 89px;
			  margin: 0 5px 15px;
		  }
	  }
	  .el-checkbox-group{
		  .el-checkbox{
			  margin: 0 5px 15px; 
		  }
	  }
	  #tjmall{
		  .el-dialog--tiny{
			  width: 500px;
		  }
		  .el-dialog__body{
			  padding-left: 5px;
			  padding-right: 0;
			  .el-radio__inner,.el-checkbox__inner{
				  width: 14px;
				  height: 14px;
			  }
		  }
	  }
</style>