<template>
    <div class="fillcontain">
        <ul :class="[identity ==1 ?'stallShareMenu':identity ==2 ?'sellerShareMenu':'']">
            <li class="ListMenu">
                <router-link :to='{path:"/messageCenter"}'>消息中心</router-link>
            </li>
        </ul>
       <div class="messageDetails">
           <router-link :to='{path:"/messageCenter"}' class="right sysBack">返回</router-link>
           <div class="detailsContent">
                <div class="contentHead flex">
                    <img src="../image/read.png" alt="">
                    <p>【系统消息】</p>
                    <p>2017-05-17 15：00</p>
                </div>
               <div class="detailsCont">
                   <p>订单编号：1231321231231，档口：盼盼盼衣服店 向您发起收款申请，收款金额：500元，请您及时付款！</p>
                   <p> 点击此处，立即处理：<a href="javascript:void(0)">立即付款</a></p>
               </div>
           </div>
       </div>
    </div>

</template>

<script>
    import headTop from '../components/headTop'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                //1为档口、2为卖家身份
                identity:2,
            }
        },
        methods: {

        },
    }
</script>

<style lang="less">
    @import '../style/mixin.less';
    @import "../style/common";
    @import '../style/messageCenter';

</style>
