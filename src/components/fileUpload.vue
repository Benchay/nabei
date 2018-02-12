<template>
    <el-dialog
			@close='closePop'
            title="导入文件"
            :visible.sync="dialogImport"
            size="tiny">
            <div class="dialogImport">
                <div class="importFirst">
                    <div class="flex">
                        <p>选择文件上传：</p>

                    </div>
                    <div class="flex3" style="align-items: flex-start">
                        <div class="uploatName flex">
                        </div>
                    </div>
                    <div class="uploatButton">
                        <input type="file" id="uploadfile" @change="importf" >
                        <div class="flex2 importUploat">
                            <img src="../image/Download01.png" alt="">
                            <p>上传文件</p>
                        </div>
                    </div>
                </div>
                <div class="importTips">
                    支持扩展名：.xlsx,.xls,.exe
                </div>
                <div class="importDownload">
                    <a href="http://cws.nabei.net:8103/stock/fileTemplate/checked.xlsx" class="flex2">下载模版</a>
                </div>
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <a href="javascript:void(0)" class="buttonColor" @click="closePop">确 定</a>
                <a href="javascript:void(0)" class="buttonColor2" @click="closePop">取 消</a>
              </span>
        </el-dialog>
</template>

<script>

    import {getMobileCode, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    import ElButton from "../../node_modules/element-ui/packages/button/src/button";

    const _XLSX = require('xlsx')
    const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;
	
    export default  {
        components: {ElButton},
        props: {
            title:'',
            templateName: '',
			dialogImport:false
        },
        data() {
            return {
				alltableData:[],
				tableData:[]
            }
        },
        methods: {
			importf(){
			 var newObj;
                this.$parent.dialogImport = false;
                let importExcelData = [];
                let obj = document.getElementById("uploadfile");
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
                    importExcelData =  X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    importExcelData.forEach((obj)=>{
                
                      newObj={
                        productCode : obj.货号,
                        title : obj.商品名称,
                        colour : obj.颜色,
                        size : obj.尺码,
                        checkActualNum : obj.盘点数,
                        companyId : userInfo().companyId,
                        warehouseId : userInfo().warehouseId,
                        }
                        this.tableData.push(newObj);
                        this.totalCount = this.tableData.length;
                    });
					
                        if(this.tableData.length>this.pageSize){
                            for(var i =0;i<this.pageSize;i++){
                                this.alltableData.push(this.tableData[i]);
                            }
                        }else{
                            for(var i=0;i<this.tableData.length;i++){
                                this.alltableData.push(this.tableData[i]);
                            }
                        }
                    if(this.tableData.length == 0){
                        this.$message({type:'error',message:'没有数据!'})
                    };
					 this.$emit('callBack', this.tableData);
                };

                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                };
				
			

            },

            fixdata(){ //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            },
			
			closePop(){
			 this.$parent.dialogImport = false;
			}
			
			//变体验证及库存数量添加
             
			 
			
		}
          

    }
</script>
<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/inventoryInitialize';
</style>