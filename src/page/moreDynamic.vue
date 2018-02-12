<template>
    <div class="fillcontain">
       <div class="moreDynamic">
            <p>更多动态</p>
           <ul :class="identity ==1?'moreList2':identity ==2?'moreList':''">
               <li v-for="item in listData">
                   <!--<p :class="[
                       list.status == 0?'MoreSprite':
                       list.status == 1?'MoreSprite1':
                       list.status == 2?'MoreSprite2':
                       list.status == 3?'MoreSprite3':
                       list.status == 10?'MoreSprite10':
                       list.status == 11?'MoreSprite11':
                       list.status == 12?'MoreSprite12':
                       list.status == 99?'MoreSprite99':
                       '']" class="moreImg"></p>-->
                    <p class="moreImg"></p>
                   <p class="ListTitle">{{item.tempOrderStatus}}</p>
                   <p @click="loadDetail(item)">{{item.title}}</p>
                   <p>{{item.companyName}}</p>
                   <p>{{item.tempOrderTitle}}：{{item.tempOrderId}}</p>
               </li>
           </ul>
           <el-pagination
               small
               class="right"
               style="margin-top: 20px;"
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="currentPage"
               :page-sizes="[10, 20, 30, 40]"
               :page-size="pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="totalCount">
           </el-pagination>
       </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {queryWorkMessage} from '@/api/getData'
    import {formatDate} from '../utils/date.js'

    export default {
        data(){
            return {
                //1为档口、2为卖家身份
                identity:1,
                listData:[],
                //默认每页数据量
                pageSize: 10,

                //当前页码
                currentPage: 1,

                totalCount:0,
                orderLogList:[],
                companyId:'',

            }
        },
        mounted(){
            this.initWorkMessage();
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
				this.currentPage = 1;
                this.initWorkMessage();

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            //初始化公告信息
            async initWorkMessage(){
            	this.bulletinData = [];
            	let param = {
            		toUserId:"402880fb5fc42799015fc8f254bf016f",
            		type:"WORK_NEWS",
            		//operateIn:"STALL_RETURN_ORDER_CONFIRM",
            		state:'VALID',
            		pageIndex:this.currentPage,
            		pageSize:this.pageSize
            	}
            	const res = await queryWorkMessage(param);
                if (res.isSuccess == true) {
                    this.listData = [];
                    res.result.results.forEach(obj => {
                    	let content = JSON.parse(obj.content)
                    	obj.companyName = content.companyName;
                    	obj.tempOrderTitle = '订单id';
                    	if(content.orderCode){
                    		obj.tempOrderId = content.orderCode;
                    	}
                    	if(obj.sendTime){
                    		obj.tempOrderTime = formatDate(obj.sendTime,"yyyy-MM-dd");
                    	}
                    	if(obj.operate && obj.operate == 'SELLER_CREATE_ORDER'){
                    		obj.tempOrderStatus = "已下单";
                    	}else if(obj.operate && obj.operate == 'SELLER_RETURN_ORDER_APPLY'){
                    		obj.tempOrderStatus = "已提交退货申请";
                    	}else if(obj.operate && obj.operate == 'STALL_RETURN_ORDER_SIGN'){
                    		obj.tempOrderStatus = "已签收";
                    	}else if(obj.operate && obj.operate == 'STALL_RETURN_ORDER_CONFIRM'){
                    		obj.tempOrderStatus = "已确认";
                    	}else if(obj.operate && obj.operate == 'SELLER_CREATE_OUTSETTLEMENTORDER_APPLY'){
                    		obj.tempOrderStatus = "提交付款结算申请";
                    		obj.tempOrderTitle = '结算单id';
                    	}else if(obj.operate && obj.operate == 'SELLER_CREATE_INSETTLEMENTORDER_APPLY'){
                    		obj.tempOrderStatus = "提交收款结算申请";
                    		obj.tempOrderTitle = '结算单id';
                    	}else if(obj.operate && obj.operate == 'STALL_CREATE_STOCKORDER'){
                    		obj.tempOrderStatus = "已提交采购订单";
                    		obj.tempOrderTitle = '采购订单id';
                    	}
                    	this.listData.push(obj);
                    });
                    this.totalCount = res.result.totalCount;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.isSuccess
                    });
                }
            },
            
            loadDetail(row){
                var orderStatus = row.operate;
                var content = JSON.parse(row.content);
				
                if(orderStatus && orderStatus == 'SELLER_CREATE_ORDER'){
                    this.$router.push({path:'/indentManagementReturnDetails2',query:{orderId:content.orderId}});//待配货

                }else if(orderStatus && orderStatus == 'SELLER_RETURN_ORDER_APPLY'){

                    this.$router.push({path:'/sellReturnSignIn',query:{orderId:content.orderId}});//退货待签收

                }else if(orderStatus && orderStatus == 'STALL_RETURN_ORDER_SIGN'){

                    this.$router.push({path:'/sellReturnAffirm',query:{orderId:content.orderId}});//退货待确认

                }else if(orderStatus && orderStatus == 'STALL_RETURN_ORDER_CONFIRM'){

                    this.$router.push({path:'/sellReturnStorage',query:{orderId:content.orderId}});//退货待入库

                }else if(orderStatus && (orderStatus == 'SELLER_CREATE_OUTSETTLEMENTORDER_APPLY'|| orderStatus == 'SELLER_CREATE_INSETTLEMENTORDER_APPLY')) {
                    //卖家提交付款申请
                    this.$router.push({
                        path: '/sellerSettlementDetails',
                        query: {settlementOrderId: content.settlementOrderId}
                    });

                }

            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import "../style/common";
    @import "../style/moreDynamic";
</style>
