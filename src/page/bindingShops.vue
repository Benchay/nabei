<template>
    <div class="fillcontain">
        <ul class="menu">
            <li class="menuIndex" v-if="getMenuAuthFun('bindingShops')">
                <router-link :to='{path:"/bindingShops"}'>绑定网商园</router-link>
            </li>
            <li v-if="getMenuAuthFun('fastShipping2')">
                <router-link :to='{path:"/fastShipping2"}'>快速出货</router-link>
            </li>
            <li v-if="getMenuAuthFun('returnManagement2')">
                <router-link :to='{path:"/returnManagement2"}'>快速退货</router-link>
            </li>
            <li v-if="getMenuAuthFun('orderPurchaseStall')">
                <router-link :to='{path:"/orderPurchaseStall"}'>订单管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('sellerSettlement')">
                <router-link :to='{path:"/sellerSettlement"}'>卖家结算</router-link>
            </li>
            <li v-if="getMenuAuthFun('customerManagement')">
                <router-link :to='{path:"/customerManagement"}'>客户管理</router-link>
            </li>
            <li v-if="getMenuAuthFun('statisticalStatement')">
                <router-link :to='{path:"/statisticalStatement"}'>销售统计</router-link>
            </li>
        </ul>
        <div class="bindingShops">
           <div class="flex2" style="height:100%;">
               <div>
                   <div class="flex2 shopsTop">
                       <img src="../image/LOGO01.png" alt="">
                       <img src="../image/binding.png" alt=""><img src="../image/LOGO02.png" alt="">
                   </div>
                   <div class="shops flex"   v-show="bindingShops">
                       <div class="shopsTop1">
                           <input class="userName" type="text" value="" placeholder="手机/邮箱/用户名">
                       </div>
                       <div class="shopsTop2">
                           <input class="password" type="text" value="" placeholder="请输入网商园登录密码">
                       </div>
                       <div>
                           <p class="left">授权后将允许网商园商品信息同步到<span class="color1">拿呗</span></p>
                       </div>
                       <el-button type="primary" style="width: 240px;" @click="accredit">授 权</el-button>
                   </div>
                   <div class="bingdingSuccess flex" v-show="bingdingSuccess">
                       <div class="successTip flex2"><img src="../image/smile.png" alt=""><div>已成功绑定网商园帐号！</div></div>
                       <p class="accounts">网商园帐号:12345678</p>
                       <div>
                           <p>如果需要更换当前绑定账号，您可以<a href="javascript:void(0);" class="color1" @click="removeBinding = true">解除绑定</a></p>
                       </div>
                   </div>
               </div>
           </div>
        </div>
        <el-dialog
            title="解除绑定"
            :visible.sync="removeBinding"
            size="tiny">
            <div class="removeBinding flex2">
                确认解绑当前网商园帐号？
            </div>
            <span slot="footer" class="dialog-footer flex2">
                <el-button type="primary" @click="removeBinding = false,removeSuccess()">确 定</el-button>
                <el-button @click="removeBinding = false">取 消</el-button>
              </span>
        </el-dialog>
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
                bindingShops:true,
                bingdingSuccess:false,
                removeBinding:false,
            }
        },
        methods: {
        	getMenuAuthFun(index){
                var b= getMenuAuth(index);
                return b;
            },
            accredit(){
                this.bingdingSuccess = true;
                this.bindingShops = false;
            },
            removeSuccess(){
                this.bingdingSuccess = false;
                this.bindingShops = true;
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/bindingShops';
</style>
