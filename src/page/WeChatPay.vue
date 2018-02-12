<template>
    <div class="fillcontain">
        <div class="WeChatPay flex2">
           <div class="flex3">
               <div class="WeChatTop flex">
                   <img  v-if="isSuc" src="../image/weixin.png" alt="">
                   <p>微信支付</p>
               </div>
               <div>
                   <img :src="ewm" alt="">
               </div>
               <div class="WeChatFoot flex3">
                   <p v-if="isSuc">支付成功，页面将在4s后跳转！</p>
                   <p>交易金额：{{paymentAmount  }} 元</p>
                   <p>请使用手机微信扫二维码，完成支付</p>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    import {getWxQRcode} from '@/api/getData'
    import {userInfo,getStore,setStore} from  '../config/mUtils'
    export default {

        data() {
            return {
//                是否支付成功
                isSuc:false,
                ewm:'未获取到二维码！',
                paymentAmount:0

            }
        },
        mounted(){
            this.paymentAmount = this.$route.query.paymentAmount;
            let param = {
                companyId:userInfo().companyId,
                paymentAmount:this.$route.query.paymentAmount,
                createIp:'127.0.0.1'
            }
            this.getEwm(param);
        },
        watch: {
            '$route': function (route) {
                if(route.path=='/WeChatPay'){
                    //paymentAmount=0.01&companyId=1000&createIp=127.0.0.1
                    let param = {
                        companyId:userInfo().companyId,
                        paymentAmount:this.$route.query.paymentAmount,
                        createIp:'127.0.0.1'
                    }
                    this.getEwm(param);
                }
            }
        },
        methods:{
            async getEwm(data){
                let url="/wallet/api/getWxQRcode";
                let dataStr = ''; //数据拼接字符串
                Object.keys(data).forEach(key => {
                    dataStr += key + '=' + data[key] + '&';
                })

                if (dataStr !== '') {
                    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                    url = url + '?' + dataStr;
                }

                this.ewm = url
            }


        },
//        created () {
//            this.weChatPay = setInterval(() => {
//                this.dialogVisible = false;
//            }, 1000)
//        },
//        beforeDestroy(){
//            clearInterval(this.weChatPay)
//        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/WeChatPay';
</style>
