<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('fastShipping2')">
                <router-link :to='{path:"/fastShipping2"}'>快速出货</router-link>
            </li>
            <li v-if="getMenuAuthFun('returnManagement2')">
                <router-link :to='{path:"/returnManagement2"}'>快速退货</router-link>
            </li>
            <li class="menuIndex" v-if="getMenuAuthFun('indentManagement')">
                <router-link :to='{path:"/indentManagement"}'>订单管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('sellerSettlement')">
                <router-link :to='{path:"/sellerSettlement"}'>客户结算</router-link>
            </li>
            <li v-if="getMenuAuthFun('SettlementRecordsStall')">
                <router-link :to='{path:"/SettlementRecordsStall"}'>结算单</router-link>
            </li>
            <li v-if="getMenuAuthFun('customerManagement')">
                <router-link :to='{path:"/customerManagement"}'>客户管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('statisticalStatement')">
                <router-link :to='{path:"/statisticalStatement"}'>销售统计</router-link>
            </li>
        </ul>
        <div class="orderFinancial">
            <router-link :to='{path:backPath}' class="right comeBack">返回</router-link>
            <p class="financialTitle">付款详情</p>
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <th>结算时间：{{formatDate(settlementOrderVO.createTime)}}</th>
                    <th><p>本次结算金额：￥{{currentFee}}</p></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>付款金额：￥{{this.totalFee}}</td>
                    <td>抹平金额：￥{{this.fixFee}}</td>
                    <td>实际付款金额：￥{{this.actualPayFee}}</td>
                </tr>
                <tr>
                    <th>付款帐号：{{settlementOrderVO.payAcount}} {{settlementOrderVO.reciveAcountType==1?'(余额)':settlementOrderVO.reciveAcountType==3?'(支付宝)':settlementOrderVO.reciveAcountType==4?'(微信)':settlementOrderVO.reciveAcountType==5?'(银行卡)':''}}</th>
                    <th>收款方：{{settlementOrderVO.type==1||settlementOrderVO.type==11?settlementOrderVO.companyName:settlementOrderVO.type==2||settlementOrderVO.type==22?settlementOrderVO.otherSideCompanyName:''}}</th>
                    <th colspan="2">收款账户：{{settlementOrderVO.reciveAcount}} {{settlementOrderVO.actualPayFeeType==1?'(余额)':settlementOrderVO.actualPayFeeType==3?'(支付宝)':settlementOrderVO.actualPayFeeType==4?'(微信)':settlementOrderVO.actualPayFeeType==5?'(银行卡)':''}}</th>
                </tr>
                <tr>
                    <td colspan="4">结算方式：{{settlementOrderVO.settlementType==1?'单订单结算':settlementOrderVO.settlementType==2?'多订单结算':''}}</td>
                </tr>
                <tr>
                    <td colspan="4">付款说明：{{settlementOrderVO.payMemo}}</td>
                </tr>
                <tr>
                    <!--限制最多三张截图-->
                    <td colspan="4"  class="detailImage"><p style="vertical-align: middle;">截图凭证：</p>
                        <img class="uploadfile" v-for="item in uploadFile" :src="item" alt="">
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    import {getSettlement} from '@/api/getData'
    import {formatDate} from '../utils/date.js'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                settlementOrderId:'',
                settlementOrderVO:'',
                uploadFile:[],
                currentFee:0,
                actualPayFee:0,
                fixFee:0,
                totalFee:0,
                backPath:''

            }
        },
        watch:{
            '$route':function (route){
               this.currentFee = this.$route.query.currentFee;
               this.backPath = this.$route.query.backPath;
               this.currentFee = Number(this.currentFee).toFixed(2);
               this.settlementOrderId = this.$route.query.settlementOrderId;
                this.querySettlementOrders();
            }
        },
        mounted(){
            this.currentFee = this.$route.query.currentFee;
            this.backPath = this.$route.query.backPath;
            this.settlementOrderId = this.$route.query.settlementOrderId;
            this.querySettlementOrders();
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            //根据结算单编号查询结算单
            async querySettlementOrders(){
                let param = {
                    "id": this.settlementOrderId
                };
                const res = await  getSettlement(param);
                if(res.isSuccess){
                    this.settlementOrderVO = res.result;
                    this.actualPayFee = this.settlementOrderVO.actualPayFee;
                    this.actualPayFee = Number(this.actualPayFee).toFixed(2);
                    this.fixFee = this.settlementOrderVO.fixFee;
                    if(this.fixFee!=undefined&&this.fixFee!=''){
                        this.fixFee = Number(this.fixFee).toFixed(2);
                    }else{
                        this.fixFee = 0;
                    }
                    this.totalFee = Number(this.fixFee) + Number(this.actualPayFee);
                    this.totalFee = Number(this.totalFee).toFixed(2);
                    if(res.result.certificate){
                    	res.result.certificate.split(",").forEach(obj => {
                    		this.uploadFile.push(obj);
                    	})
                    }
                }
            },
            formatData:function(val){
                if(val==1){
                    return "单订单结算";
                }else if(val==2){
                    return "多订单结算";
                }else
                    return "";
            },
            //数据格式化
            formatDate:function(val) {
                if (val == undefined||val=='') {
                    return "";
                }
                var date = new Date(val);
                return formatDate(date,'yyyy-MM-dd hh:mm:ss');
            },
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/orderFinancial';

    .uploadfile{
    	width: 100px;
    	height: 100px;
    }
</style>
