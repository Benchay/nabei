<template>
    <div class="fillcontain">
        <ul class="menu">
            <li v-if="getMenuAuthFun('addShop')">
                <router-link :to='{path:"/addShop"}'>绑定店铺</router-link>
            </li>
            <li v-if="getMenuAuthFun('webStoreOrderSalesBuy')">
                <router-link :to='{path:"/webStoreOrderSalesBuy"}'>销售订单</router-link>
            </li>
            <li v-if="getMenuAuthFun('purchaseRequireBuy')">
                <router-link :to='{path:"/purchaseRequireBuy"}'>采购需求</router-link>
            </li>
            <li v-if="getMenuAuthFun('orderPurchaseBuy')">
                <router-link :to='{path:"/orderPurchaseBuy"}'>采购订单</router-link>
            </li>
            <li class="menuIndex2" v-if="getMenuAuthFun('expressDynamic')">
                <router-link :to='{path:"/expressDynamic"}'>包裹</router-link>
            </li>
            <li v-if="getMenuAuthFun('salesReturn')">
                <router-link :to='{path:"/salesReturn"}'>退货</router-link>
            </li>
            <li v-if="getMenuAuthFun('stallSettlement')">
                <router-link :to='{path:"/stallSettlement"}'>档口结算</router-link>
            </li>
            <li>
                <router-link :to='{path:"/"}'>档口管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('salesForecast')">
                <router-link :to='{path:"/salesForecast"}'>采购统计</router-link>
            </li>
        </ul>
        <div class="expressDynamic">
            <div class="expressPlan">
                <el-steps :space="400" :active="1" center>
                    <el-step title="待揽件"><i class="step01" slot="icon"></i></el-step>
                    <el-step title="运输中"><i class="step02" slot="icon"></i></el-step>
                    <el-step title="待签收"><i class="step03" slot="icon"></i></el-step>
                </el-steps>
            </div>
            <div class="expressProgressBar">
                <ul>
                    <li>
                        <div><img src="../image/circle.png" alt=""></div>
                        <div>2017-08-12</div>
                        <div>周一</div>
                        <div>10：20</div>
                        <div>订单已确认您的订单已确认，开始处理</div>
                    </li>
                    <li>
                        <div><img src="../image/circle.png" alt=""></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>订单已配货</div>
                    </li>
                    <li>
                        <div><img src="../image/circle.png" alt=""></div>
                        <div>2017-08-12</div>
                        <div>周一</div>
                        <div>10：20</div>
                        <div>订单已确认您的订单已确认，开始处理</div>
                    </li>
                    <li>
                        <div><img src="../image/circle.png" alt=""></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>订单已配货</div>
                    </li>
                    <li>
                        <div><img src="../image/circle.png" alt=""></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </li>
                </ul>
            </div>
            <div class="details">
                <ul>
                    <li>订单编号：101210120122056525</li>
                    <li class="flex">档口名称：我是档口1<img src="../image/rheadset.png" alt="">和我联系</li>
                    <li>发货地址：常青花园1栋28楼2801</li>
                    <li>收货地址：洪山广场A区写字楼1栋28楼</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    import {getMenuAuth,haveMenuAuth} from  '../utils/AuthMenu.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {

            }
        },
        methods: {
			getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/expressDynamic';
</style>
