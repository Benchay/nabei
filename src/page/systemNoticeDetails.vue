<template>
    <div class="fillcontain">
        <div class="systemNoticeDetails">
            <p>更多公告</p>
            <router-link :to='{path:"/systemNotice"}' class="right sysBack">返回</router-link>
            <div class="detailsContent1">
                <div class="contentHead flex">
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
