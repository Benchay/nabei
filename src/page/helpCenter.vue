<template>
    <div class="fillcontain">
        <ul class="menu">
            <li class="menuIndex2">
                <a href="javascript:void(0)">帮助中心</a>
            </li>
        </ul>
        <div class="helpCenter">
            <el-col :span="24" class="helpTabs radioRed">
                <el-radio-group v-model="radio" size="large" @change="changeTab">
                    <el-radio-button label="1"> 用户管理相关 </el-radio-button>
                    <el-radio-button label="2"> 商品管理相关 </el-radio-button>
                    <el-radio-button label="3"> 采购管理相关 </el-radio-button>
                    <el-radio-button label="4"> 财务管理相关 </el-radio-button>
                </el-radio-group>
            </el-col>
            <div class="Q&A" style="overflow:hidden;width:100%;" v-if="userQA==1">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="如何设置员工权限？" name="1">
                        <div>第一步 【角色管理】-可以添加不同角色，然后给不同角色分配不同的权限;</div>
                        <div>第二步 【员工管理】添加员工、分配角色;</div>
                    </el-collapse-item>
                    <el-collapse-item title="忘记登录密码，怎么修改？" name="2">
                        <div>进入【个人中心】--【基本资料】，可修改用户登录密码</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="Q&A" style="overflow:hidden;width:100%;" v-if="userQA==2">
                <el-collapse v-model="activeName2" accordion>
                    <el-collapse-item title="如何添加新商品？" name="1">
                        <div>【商品管理】点击添加新商品，开始添加商品，添加商品有以下两种情况：</div>
                        <div> 1、添加的商品是属于已注册系统的档口。则用户可选择已有的档口，输入需要添加的货号，选择商品对应的变体信息，确认添加。</div>
                        <div> 2、添加的商品属于未注册档口的商品，则需要用户手动输入档口名称、商品货号、单价及图片等。</div>
                        <div style="border:1px solid #ccc;display: inline-block;">
                            <img src="../image/bg_sp02.png" alt="">
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="关联商品的作用是什么？" name="2">
                        <div>在系统中同一种商品在不同档口显示的货号会不同，为方便卖家在进行商品采购时能够针对性地选择档口，可以设置将不同货号的商品关联起来。</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="Q&A" style="overflow:hidden;width:100%;" v-if="userQA==3">
                <el-collapse v-model="activeName3" accordion>
                    <el-collapse-item title="订单结算日期可以修改吗？" name="1">
                        <div>在系统中同一种商品在不同档口显示的货号会不同，为方便卖家在进行商品采购时能够针对性地选择档口，可以设置将不同货号的商品关联起来。</div>
                        </el-collapse-item>
                    <el-collapse-item title="绑定淘宝账户可以删除吗？" name="2">
                        <div>进入【采购管理】-【绑定淘宝店铺】，添加所需要的淘宝店铺后绑定。</div>
                    </el-collapse-item>
                    <el-collapse-item title="如何催促档口配货？" name="3">
                        <div>如您希望档口尽快给您配货，可以进入【订单管理】找到该笔交易，点击“提醒配货”或点击直接与档口线上沟通，提醒档口尽快发货。</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="Q&A" style="overflow:hidden;width:100%;" v-if="userQA==4">
                <el-collapse v-model="activeName4" accordion>
                    <el-collapse-item title="支付方式有哪些？" name="1">
                        <div>财务支付方式分为线上支付及线下支付，线上支付为余额支付，线下支付分为微信、支付宝、银行卡、现金</div>
                        </el-collapse-item>
                    <el-collapse-item title="支付密码如何修改？" name="2">
                        <div>进入【财务管理】-【安全中心】，找到修改支付密码进行修改即可。</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        components: {
        },
        data() {
            return {
                radio:1,
                activeName: '1',
                activeName2:'1',
                activeName3:'1',
                activeName4:'1',
                userQA:1

            }
        },
        methods: {
            changeTab(index){
                console.log(index);
                    this.userQA = index;
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';
    @import '../style/helpCenter';
</style>
