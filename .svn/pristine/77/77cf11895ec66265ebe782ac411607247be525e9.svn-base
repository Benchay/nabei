import Vue from 'vue'
import Router from 'vue-router'
import * as types from '../store/types'
import { setStore, getStore,getSessionStore } from '../config/mUtils'
import {checkRouterAuth} from '../utils/AuthMenu'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const selectModel = r => require.ensure([], () => r(require('@/page/selectModel')), 'selectModel');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const homeSeller = r => require.ensure([], () => r(require('@/page/homeSeller')), 'homeSeller');
const homeStall = r => require.ensure([], () => r(require('@/page/homeStall')), 'homeStall');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const manageRole = r => require.ensure([], () => r(require('@/page/manageRole')), 'manageRole');
const manageStaff = r => require.ensure([], () => r(require('@/page/manageStaff')), 'manageStaff');
const inviteFriends = r => require.ensure([], () => r(require('@/page/inviteFriends')), 'inviteFriends');
const salesReturn = r => require.ensure([], () => r(require('@/page/salesReturn')), 'salesReturn');

const salesForecast = r => require.ensure([], () => r(require('@/page/salesForecast')), 'salesForecast');

//订单管理
const webStoreOrder = r => require.ensure([], () => r(require('@/page/webStoreOrder')), 'webStoreOrder');
//买家销售订单
const webStoreOrderSalesBuy = r => require.ensure([], () => r(require('@/page/webStoreOrderSalesBuy')), 'webStoreOrderSalesBuy');
//买家采购需求
const purchaseRequireBuy = r => require.ensure([], () => r(require('@/page/purchaseRequireBuy')), 'purchaseRequireBuy');
//买家采购订单
const orderPurchaseBuy = r => require.ensure([], () => r(require('@/page/orderPurchaseBuy')), 'orderPurchaseBuy');
//档口采购订单
const orderPurchaseStall = r => require.ensure([], () => r(require('@/page/orderPurchaseStall')), 'orderPurchaseStall');
//档口打包界面
const packageStall = r => require.ensure([], () => r(require('@/page/packageStall')), 'packageStall');

const financialManagement = r => require.ensure([], () => r(require('@/page/financialManagement')), 'financialManagement');
const financialManagement2 = r => require.ensure([], () => r(require('@/page/financialManagement2')), 'financialManagement2');
const financialManagement3 = r => require.ensure([], () => r(require('@/page/financialManagement3')), 'financialManagement3');
const otherManagement = r => require.ensure([], () => r(require('@/page/otherManagement')), 'otherManagement');
const accountSetting = r => require.ensure([], () => r(require('@/page/accountSetting')), 'accountSetting');
const financialManagementDetail = r => require.ensure([], () => r(require('@/page/financialManagementDetail')), 'financialManagementDetail');
const financialManagementorderDetail = r => require.ensure([], () => r(require('@/page/financialManagementorderDetail')), 'financialManagementorderDetail');
const financialManagementreturnDetail = r => require.ensure([], () => r(require('@/page/financialManagementreturnDetail')), 'financialManagementreturnDetail');
const stallfinancialManagementDetail = r => require.ensure([], () => r(require('@/page/stallfinancialManagementDetail')), 'stallfinancialManagementDetail');
const financialindentManagementPortionPicking = r => require.ensure([], () => r(require('@/page/financialindentManagementPortionPicking')), 'financialindentManagementPortionPicking');
const remainingSum = r => require.ensure([], () => r(require('@/page/remainingSum')), 'remainingSum');
const salesReturnDetails = r => require.ensure([], () => r(require('@/page/salesReturnDetails')), 'salesReturnDetails');
const expressDynamic = r => require.ensure([], () => r(require('@/page/expressDynamic')), 'expressDynamic');
const startProcurementMarkOrder = r => require.ensure([], () => r(require('@/page/startProcurementMarkOrder')), 'startProcurementMarkOrder');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const findpwd = r => require.ensure([], () => r(require('@/page/findpwd')), 'findpwd');
const basicInformation = r => require.ensure([], () => r(require('@/page/basicInformation')), 'basicInformation');
const setPassword = r => require.ensure([], () => r(require('@/page/setPassword')), 'setPassword');
const changeMobile = r => require.ensure([], () => r(require('@/page/changeMobile')), 'changeMobile');
const userCenter = r => require.ensure([], () => r(require('@/page/userCenter')), 'userCenter');
const companyManagement = r => require.ensure([], () => r(require('@/page/companyManagement')), 'companyManagement');
const messageManagement = r => require.ensure([], () => r(require('@/page/messageManagement')), 'messageManagement');
const sessionManagement = r => require.ensure([], () => r(require('@/page/sessionManagement')), 'sessionManagement');
const rechangeConfig = r => require.ensure([], () => r(require('@/page/rechangeConfig')), 'rechangeConfig');
const setmealConfig = r => require.ensure([], () => r(require('@/page/setmealConfig')), 'setmealConfig');
const verifyManage = r => require.ensure([], () => r(require('@/page/verifyManage')), 'verifyManage');
const financeSerial = r => require.ensure([], () => r(require('@/page/financeSerial')), 'financeSerial');
const walletInit = r => require.ensure([], () => r(require('@/page/walletInit')), 'walletInit');
const changePassword = r => require.ensure([], () => r(require('@/page/changePassword')), 'changePassword');
const commodityMnagement = r => require.ensure([], () => r(require('@/page/commodityMnagement')), 'commodityMnagement');
const stallAssess = r => require.ensure([], () => r(require('@/page/stallAssess')), 'stallAssess');

const fastShipping2 = r => require.ensure([], () => r(require('@/page/fastShipping2')), 'fastShipping2');

const indentManagement = r => require.ensure([], () => r(require('@/page/indentManagement')), 'indentManagement');
const returnManagement2 = r => require.ensure([], () => r(require('@/page/returnManagement2')), 'returnManagement2');

const returnManagementDetails = r => require.ensure([], () => r(require('@/page/returnManagementDetails')), 'returnManagementDetails');
const currentInventory = r => require.ensure([], () => r(require('@/page/currentInventory')), 'currentInventory');
const stocktaking = r => require.ensure([], () => r(require('@/page/stocktaking')), 'stocktaking');
const stocktakingRecord = r => require.ensure([], () => r(require('@/page/stocktakingRecord')), 'stocktakingRecord');
const inventoryDetail = r => require.ensure([], () => r(require('@/page/inventoryDetail')), 'inventoryDetail');
const inventoryWarning = r => require.ensure([], () => r(require('@/page/inventoryWarning')), 'inventoryWarning');
const stockTransshipment = r => require.ensure([], () => r(require('@/page/stockTransshipment')), 'stockTransshipment');
const stockTransshipmentDetails = r => require.ensure([], () => r(require('@/page/stockTransshipmentDetails')), 'stockTransshipmentDetails');
const packageListStall = r => require.ensure([], () => r(require('@/page/packageListStall')), 'packageListStall');
const indentManagementPackageDetails = r => require.ensure([], () => r(require('@/page/indentManagementPackageDetails')), 'indentManagementPackageDetails');
const indentManagementReturnDetails = r => require.ensure([], () => r(require('@/page/indentManagementReturnDetails')), 'indentManagementReturnDetails');
const indentManagementReturnDetails2 = r => require.ensure([], () => r(require('@/page/indentManagementReturnDetails2')), 'indentManagementReturnDetails2');
const statisticalStatement = r => require.ensure([], () => r(require('@/page/statisticalStatement')), 'statisticalStatement');
const bindingShops = r => require.ensure([], () => r(require('@/page/bindingShops')), 'bindingShops');
const storeManagement = r => require.ensure([], () => r(require('@/page/storeManagement')), 'storeManagement');
const inventoryInitialize = r => require.ensure([], () => r(require('@/page/inventoryInitialize')), 'inventoryInitialize');
const stocktakingDifference = r => require.ensure([], () => r(require('@/page/stocktakingDifference')), 'stocktakingDifference');
const stockTransshipmentDetails2 = r => require.ensure([], () => r(require('@/page/stockTransshipmentDetails2')), 'stockTransshipmentDetails2');
const customerManagement = r => require.ensure([], () => r(require('@/page/customerManagement')), 'customerManagement');
//卖家结算
const sellerSettlement = r => require.ensure([], () => r(require('@/page/sellerSettlement')), 'sellerSettlement');

const productManagement = r => require.ensure([], () => r(require('@/page/productManagement')), 'productManagement');

const sellerSettlementImmediately = r => require.ensure([], () => r(require('@/page/sellerSettlementImmediately')), 'sellerSettlementImmediately');
const sellerSettlementRecord = r => require.ensure([], () => r(require('@/page/sellerSettlementRecord')), 'sellerSettlementRecord');
const sellerSettlementDetails = r => require.ensure([], () => r(require('@/page/sellerSettlementDetails')), 'sellerSettlementDetails');
const sellerSettlementDetailsl = r => require.ensure([], () => r(require('@/page/sellerSettlementDetailsl')), 'sellerSettlementDetailsl');
const sellerSettlementreturnDetails = r => require.ensure([], () => r(require('@/page/sellerSettlementreturnDetails')), 'sellerSettlementreturnDetails');
const sellerSettlementorderDetails = r => require.ensure([], () => r(require('@/page/sellerSettlementorderDetails')), 'sellerSettlementorderDetails');



const bindWebstoreForPlatform = r => require.ensure([], () => r(require('@/page/bindWebstoreForPlatform')), 'bindWebstoreForPlatform');

const orderForPlatform = r => require.ensure([], () => r(require('@/page/orderForPlatform')), 'orderForPlatform');

const orderDetailForPlatform = r => require.ensure([], () => r(require('@/page/orderDetailForPlatform')), 'orderDetailForPlatform');

const dynamicsOrderForPlatform = r => require.ensure([], () => r(require('@/page/dynamicsOrderForPlatform')), 'dynamicsOrderForPlatform');

const stallProcurement = r => require.ensure([], () => r(require('@/page/stallProcurement')), 'stallProcurement');

const menuManagement = r => require.ensure([], () => r(require('@/page/menuManagement')), 'menuManagement');

const stallProcurementStart = r => require.ensure([], () => r(require('@/page/stallProcurementStart')), 'stallProcurementStart');

const startCounting = r => require.ensure([], () => r(require('@/page/startCounting')), 'startCounting');

const stallProcurementStorage = r => require.ensure([], () => r(require('@/page/stallProcurementStorage')), 'stallProcurementStorage');

const supplierManagement = r => require.ensure([], () => r(require('@/page/supplierManagement')), 'supplierManagement');

const stallProductManagement = r => require.ensure([], () => r(require('@/page/stallProductManagement')), 'stallProductManagement');

const stallAddGoods = r => require.ensure([], () => r(require('@/page/stallAddGoods')), 'stallAddGoods');

const classificationGoods = r => require.ensure([], () => r(require('@/page/classificationGoods')), 'classificationGoods');

const classificationGoodsDetails = r => require.ensure([], () => r(require('@/page/classificationGoodsDetails')), 'classificationGoodsDetails');

const platformSettings = r => require.ensure([], () => r(require('@/page/platformSettings')), 'platformSettings');

const msgParamsConfig = r => require.ensure([], () => r(require('@/page/msgParamsConfig')), 'msgParamsConfig');
const msgSendInterfaceConfig = r => require.ensure([], () => r(require('@/page/msgSendInterfaceConfig')), 'msgSendInterfaceConfig');
const stallSettlement = r => require.ensure([], () => r(require('@/page/stallSettlement')), 'stallSettlement');
const stallSettlementRecord = r => require.ensure([], () => r(require('@/page/stallSettlementRecord')), 'stallSettlementRecord');
const stallSettlementImmediately = r => require.ensure([], () => r(require('@/page/stallSettlementImmediately')), 'stallSettlementImmediately');
const stallSettlementDetails = r => require.ensure([], () => r(require('@/page/stallSettlementDetails')), 'stallSettlementDetails');
const msgManagement = r => require.ensure([], () => r(require('@/page/msgManagement')), 'msgManagement');
const bulletinManagement = r => require.ensure([], () => r(require('@/page/bulletinManagement')), 'bulletinManagement');
const logManagement = r => require.ensure([], () => r(require('@/page/logManagement')), 'logManagement');
const orderPurchaseBuyDetails = r => require.ensure([], () => r(require('@/page/orderPurchaseBuyDetails')), 'orderPurchaseBuyDetails');
const packageStatus = r => require.ensure([], () => r(require('@/page/packageStatus')), 'packageStatus');
const packageDetails = r => require.ensure([], () => r(require('@/page/packageDetails')), 'packageDetails');
const emptypackage = r => require.ensure([], () => r(require('@/page/emptypackage')), 'emptypackage');
const stallManage = r => require.ensure([], () => r(require('@/page/stallManage')), 'stallManage');

const stockAllotManagement = r => require.ensure([], () => r(require('@/page/stockAllotManagement')), 'stockAllotManagement');

const stockAllotDetails = r => require.ensure([], () => r(require('@/page/stockAllotDetails')), 'stockAllotDetails');
const warehouseManagement = r => require.ensure([], () => r(require('@/page/warehouseManagement')), 'warehouseManagement');
const warehouseDetails = r => require.ensure([], () => r(require('@/page/warehouseDetails')), 'warehouseDetails');
const checkDiffManagement = r => require.ensure([], () => r(require('@/page/checkDiffManagement')), 'checkDiffManagement');
const checkDiffDetails = r => require.ensure([], () => r(require('@/page/checkDiffDetails')), 'checkDiffDetails');
const stockTakingManagement = r => require.ensure([], () => r(require('@/page/stockTakingManagement')), 'stockTakingManagement');
const stockTakingDetails = r => require.ensure([], () => r(require('@/page/stockTakingDetails')), 'stockTakingDetails');
const orderFinancial = r => require.ensure([], () => r(require('@/page/orderFinancial')), 'orderFinancial');
const orderFinancialDetails = r => require.ensure([], () => r(require('@/page/orderFinancialDetails')), 'orderFinancialDetails');
const SellerSettlementMethod = r => require.ensure([], () => r(require('@/page/SellerSettlementMethod')), 'SellerSettlementMethod');
const messageCenter = r => require.ensure([], () => r(require('@/page/messageCenter')), 'messageCenter');
const messageCenterDetails = r => require.ensure([], () => r(require('@/page/messageCenterDetails')), 'messageCenterDetails');
const systemNotice = r => require.ensure([], () => r(require('@/page/systemNotice')), 'systemNotice');
const promptlyReturns = r => require.ensure([], () => r(require('@/page/promptlyReturns')), 'promptlyReturns');
const salesReturnDetailsAccounts = r => require.ensure([], () => r(require('@/page/salesReturnDetailsAccounts')), 'salesReturnDetailsAccounts');
const salesReturnAccountsDetails = r => require.ensure([], () => r(require('@/page/salesReturnAccountsDetails')), 'salesReturnAccountsDetails');
const promptlyReturnsAffirm = r => require.ensure([], () => r(require('@/page/promptlyReturnsAffirm')), 'promptlyReturnsAffirm');
const webStoreOrderForPlatform = r => require.ensure([], () => r(require('@/page/webStoreOrderForPlatform')), 'webStoreOrderForPlatform');
const reportquery = r => require.ensure([], () => r(require('@/page/reportquery')), 'reportquery');
const moreDynamic = r => require.ensure([], () => r(require('@/page/moreDynamic')), 'moreDynamic');
const indentManagementComplete = r => require.ensure([], () => r(require('@/page/indentManagementComplete')), 'indentManagementComplete');

const indentManagementAccountDetails = r => require.ensure([], () => r(require('@/page/indentManagementAccountDetails')), 'indentManagementAccountDetails');
const indentManagementCompleteAccount = r => require.ensure([], () => r(require('@/page/indentManagementCompleteAccount')), 'indentManagementCompleteAccount');
const guidance = r => require.ensure([], () => r(require('@/page/guidance')), 'guidance');
const createCompany = r => require.ensure([], () => r(require('@/page/createCompany')), 'createCompany');
const joinCompany = r => require.ensure([], () => r(require('@/page/joinCompany')), 'joinCompany');
const logTools = r => require.ensure([], () => r(require('@/page/logTools')), 'logTools');
const logToolsSeller = r => require.ensure([], () => r(require('@/page/logToolsSeller')), 'logToolsSeller');
const MSConfig = r => require.ensure([], () => r(require('@/page/MSConfig')), 'MSConfig');
const MSConfigSeller = r => require.ensure([], () => r(require('@/page/MSConfigSeller')), 'MSConfigSeller');
const systemNoticeDetails = r => require.ensure([], () => r(require('@/page/systemNoticeDetails')), 'systemNoticeDetails');
const stallIntroduction = r => require.ensure([], () => r(require('@/page/stallIntroduction')), 'stallIntroduction');
const sellerIntroduction = r => require.ensure([], () => r(require('@/page/sellerIntroduction')), 'sellerIntroduction');
const indentReturnDetails = r => require.ensure([], () => r(require('@/page/indentReturnDetails')), 'indentReturnDetails');
const WeChatPay = r => require.ensure([], () => r(require('@/page/WeChatPay')), 'WeChatPay');
const commodityStatistics = r => require.ensure([], () => r(require('@/page/commodityStatistics')), 'commodityStatistics');
const bindstallshop = r => require.ensure([], () => r(require('@/page/bindstallshop')), 'bindstallshop');
const helpCenter = r => require.ensure([], () => r(require('@/page/helpCenter')), 'helpCenter');
const helpCenterStall = r => require.ensure([], () => r(require('@/page/helpCenterStall')), 'helpCenterStall');
const purchaseStatistics = r => require.ensure([], () => r(require('@/page/purchaseStatistics')), 'purchaseStatistics');
const indentManagementPickingConfirmed = r => require.ensure([], () => r(require('@/page/indentManagementPickingConfirmed')), 'indentManagementPickingConfirmed');
const indentManagementPortionPicking = r => require.ensure([], () => r(require('@/page/indentManagementPortionPicking')), 'indentManagementPortionPicking');
const sellReturn = r => require.ensure([], () => r(require('@/page/sellReturn')), 'sellReturn');
const sellReturnSignIn = r => require.ensure([], () => r(require('@/page/sellReturnSignIn')), 'sellReturnSignIn');
const sellReturnAffirm = r => require.ensure([], () => r(require('@/page/sellReturnAffirm')), 'sellReturnAffirm');
const sellReturnStorage = r => require.ensure([], () => r(require('@/page/sellReturnStorage')), 'sellReturnStorage');
const finalsellReturnStorage = r => require.ensure([], () => r(require('@/page/finalsellReturnStorage')), 'finalsellReturnStorage');

const stallPurchase = r => require.ensure([], () => r(require('@/page/stallPurchase')), 'stallPurchase');
const stallPurchaseReturns = r => require.ensure([], () => r(require('@/page/stallPurchaseReturns')), 'stallPurchaseReturns');

const takeGoods = r => require.ensure([], () => r(require('@/page/takeGoods')), 'takeGoods');
const SettlementRecords = r => require.ensure([], () => r(require('@/page/SettlementRecords')), 'SettlementRecords');
const SettlementRecordsdetail = r => require.ensure([], () => r(require('@/page/SettlementRecordsdetail')), 'SettlementRecordsdetail');
const SettlementRecordsorderdetail = r => require.ensure([], () => r(require('@/page/SettlementRecordsorderdetail')), 'SettlementRecordsorderdetail');
const SettlementRecordsreturndetail = r => require.ensure([], () => r(require('@/page/SettlementRecordsreturndetail')), 'SettlementRecordsreturndetail');
const stallPurchaseDetail = r => require.ensure([], () => r(require('@/page/stallPurchaseDetail')), 'stallPurchaseDetail');
const SettlementRecordsStall = r => require.ensure([], () => r(require('@/page/SettlementRecordsStall')), 'SettlementRecordsStall');
const sellReturnPaymentHistory = r => require.ensure([], () => r(require('@/page/sellReturnPaymentHistory')), 'sellReturnPaymentHistory');
const sellReturnCompleteAccount = r => require.ensure([], () => r(require('@/page/sellReturnCompleteAccount')), 'sellReturnCompleteAccount');
const inviteCode = r => require.ensure([], () => r(require('@/page/inviteCode')), 'inviteCode');
const siteConfig = r => require.ensure([], () => r(require('@/page/siteConfig')), 'siteConfig');
const sellerCarConfig = r => require.ensure([], () => r(require('@/page/sellerCarConfig')), 'sellerCarConfig');
const transportDetail = r => require.ensure([], () => r(require('@/page/transportDetail')), 'transportDetail');
const transportpackageDetail = r => require.ensure([], () => r(require('@/page/transportpackageDetail')), 'transportpackageDetail');
const applicationPackage = r => require.ensure([], () => r(require('@/page/applicationPackage')), 'applicationPackage');

const routes = [{
        path: '/',
        component: login,
        meta:{title:'拿呗',},
    }, {
        path: '/register',
        component: register,
        meta: ['注册', '注册'],
        meta:{title:'注册',},
    }, {
        path: '/findpwd',
        component: findpwd,
        meta: ['忘记密码', '忘记密码'],
        meta:{title:'忘记密码',},
    },
    {
        path: '/selectModel',
        component: selectModel,
        meta: ['选择模式', '选择模式'],
        meta: {
            requireAuth: true,
            title:'选择模式',
        },
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        meta: {
            requireAuth: true, title:'拿呗',
        },
        children: [{
                path: '/guidance',
                component: guidance,
                meta: ['引导页', '引导页'],
                meta: {
                    requireAuth: true, title:'引导',
                },
            }, {
                path: '/createCompany',
                component: createCompany,
                meta: ['创建公司'],
                meta: {
                    requireAuth: true, title:'创建公司',
                },
            }, {
                path: '/joinCompany',
                component: joinCompany,
                meta: ['加入公司'],
                meta: {
                    requireAuth: true, title:'加入公司',
                },
            }, {
                path: '/homeSeller',
                component: homeSeller,
                meta: ['卖家首页'],
                meta: {
                    requireAuth: true, title:'首页',
                },
            }, {
                path: '/homeStall',
                component: homeStall,
                meta: ['档口首页'],
                meta: {
                    requireAuth: true,title:'首页',
                },
            }, {
                path: '/moreDynamic',
                component: moreDynamic,
                meta: ['首页-更多动态'],
                meta: {
                    requireAuth: true,title:'首页',
                },
            }, {
                path: '/addShop',
                component: addShop,
                meta: ['采购管理', '添加商铺'],
                meta: {
                    requireAuth: true,title:'添加商铺',
                },
            }, {
                path: '/vueEdit',
                component: vueEdit,
                meta: ['编辑', '文本编辑'],
                meta: {
                    requireAuth: true,title:'拿呗',
                },
            }, {
                path: '/manageRole',
                component: manageRole,
                meta: ['管理', '角色管理'],
                meta: {
                    requireAuth: true,title:'拿呗',
                },
            }, {
                path: '/manageStaff',
                component: manageStaff,
                meta: ['管理', '员工管理'],
                meta: {
                    requireAuth: true,title:'员工管理',
                },
            }, {
                path: '/basicInformation',
                component: basicInformation,
                meta: ['管理', '基本资料'],
                meta: {
                    requireAuth: true,title:'基本资料',
                },
            }, {
                path: '/changePassword',
                component: changePassword,
                meta: ['管理', '基本资料'],
                meta: {
                    requireAuth: true,title:'基本资料',
                },
            }, {
                path: '/inviteFriends',
                component: inviteFriends,
                meta: ['管理', '邀请好友'],
                meta: {
                    requireAuth: true,title:'邀请好友',
                },
            }, {
                path: '/salesReturn',
                component: salesReturn,
                meta: ['采购管理', '退货'],
                meta: {
                    requireAuth: true,title:'退货',
                },
            }, {
                path: '/salesReturnDetails',
                component: salesReturnDetails,
                meta: ['采购管理', '退货-详情'],
                meta: {
                    requireAuth: true,title:'退货',
                },
            }, {
                path: '/webStoreOrderSalesBuy',
                component: webStoreOrderSalesBuy,
                meta: ['采购管理', '开始采购-网店订单'],
                meta: {
                    requireAuth: true,title:'开始采购-网店订单',
                },
            }, {
                path: '/purchaseRequireBuy',
                component: purchaseRequireBuy,
                meta: ['采购管理', '开始采购-采购需求'],
                meta: {
                    requireAuth: true,title:'开始采购-采购需求',
                },
            }, {
                path: '/orderPurchaseBuy',
                component: orderPurchaseBuy,
                meta: ['采购管理', '开始采购-采购订单'],
                meta: {
                    requireAuth: true,title:'开始采购-采购订单',
                },
            },
            {
                path: '/orderPurchaseBuyDetails',
                component: orderPurchaseBuyDetails,
                meta: ['采购管理', '开始采购-采购订单-详情'],
                meta: {
                    requireAuth: true,title:'开始采购-采购订单',
                },
            }, {
                path: '/orderFinancial',
                component: orderFinancial,
                meta: ['采购管理', '开始采购-采购订单-财务结算'],
                meta: {
                    requireAuth: true,title:'开始采购-财务结算',
                },
            }, {
                path: '/orderFinancialDetails',
                component: orderFinancialDetails,
                meta: ['采购管理', '开始采购-采购订单-财务结算-详情'],
                meta: {
                    requireAuth: true,title:'开始采购-财务结算',
                },
            }, {
                path: '/startProcurementMarkOrder',
                component: startProcurementMarkOrder,
                meta: ['采购管理', '开始采购-标记订单'],
                meta: {
                    requireAuth: true,title:'开始采购-标记订单',
                },
            }, {
                path: '/salesForecast',
                component: salesForecast,
                meta: ['采购管理', '采购预测'],
                meta: {
                    requireAuth: true,title:'采购预测',
                },
            }, {
                path: '/stallSettlement',
                component: stallSettlement,
                meta: ['采购管理', '档口结算'],
                meta: {
                    requireAuth: true,title:'档口结算',
                },
            }, {
                path: '/stallSettlementImmediately',
                component: stallSettlementImmediately,
                meta: ['采购管理', '档口结算-立即结算'],
                meta: {
                    requireAuth: true,title:'档口结算-立即结算',
                },
            }, {
                path: '/SettlementRecords',
                component: SettlementRecords,
                meta: ['结算单-卖家'],
                meta: {
                    requireAuth: true,title:'开始采购-立即结算',
                },
            },
            {
                path: '/SettlementRecordsdetail',
                component: SettlementRecordsdetail,
                meta: ['结算单详情-卖家'],
                meta: {
                    requireAuth: true,title:'结算单详情',
                },
            },
            {
                path: '/SettlementRecordsorderdetail',
                component: SettlementRecordsorderdetail,
                meta: ['结算单订单详情-卖家'],
                meta: {
                    requireAuth: true,title:'结算单详情',
                },
            }, {
                path: '/SettlementRecordsreturndetail',
                component: SettlementRecordsreturndetail,
                meta: ['结算单退货订单详情-卖家'],
                meta: {
                    requireAuth: true,title:'结算单退货订单详情',
                },
            }, {
                path: '/SettlementRecordsStall',
                component: SettlementRecordsStall,
                meta: ['结算单-档口'],
                meta: {
                    requireAuth: true,title:'结算单',
                },
            }, {
                path: '/stallSettlementDetails',
                component: stallSettlementDetails,
                meta: ['采购管理', '档口结算-详情'],
                meta: {
                    requireAuth: true,title:'档口结算',
                },
            }, {
                path: '/stallSettlementRecord',
                component: stallSettlementRecord,
                meta: ['采购管理', '档口结算-记录'],
                meta: {
                    requireAuth: true,title:'档口结算',
                },
            }, {
                path: '/webStoreOrder',
                component: webStoreOrder,
                meta: ['网店订单', '网店订单'],
                meta: {
                    requireAuth: true,title:'网店订单',
                },
            }, {
                path: '/expressDynamic',
                component: expressDynamic,
                meta: ['采购管理', '包裹状态'],
                meta: {
                    requireAuth: true,title:'包裹状态',
                },
            }, {
                path: '/purchaseStatistics',
                component: purchaseStatistics,
                meta: ['采购统计'],
                meta: {
                    requireAuth: true,title:'采购统计',
                },
            }, {
                path: '/financialManagement',
                component: financialManagement,
                meta: ['财务管理', '账户总览'],
                meta: {
                    requireAuth: true,title:'账户总览',
                },
            }, {
                path: '/financialManagement2',
                component: financialManagement2,
                meta: ['财务管理', '余额交易记录'],
                meta: {
                    requireAuth: true,title:'余额交易记录',
                },
            }, {
                path: '/financialManagement3',
                component: financialManagement3,
                meta: ['财务管理', '金币交易记录'],
                meta: {
                    requireAuth: true,title:'金币交易记录',
                },
            }, {
                path: '/otherManagement',
                component: otherManagement,
                meta: ['财务管理', '其他管理'],
                meta: {
                    requireAuth: true,title:'其他管理',
                },
            }, {
                path: '/accountSetting',
                component: accountSetting,
                meta: ['财务管理', '账户管理'],
                meta: {
                    requireAuth: true,title:'账户管理',
                },
            }, {
                path: '/setPassword',
                component: setPassword,
                meta: ['财务管理', '绑定手机'],
                meta: {
                    requireAuth: true,title:'绑定手机',
                },
            }, {
                path: '/changeMobile',
                component: changeMobile,
                meta: ['财务管理', '更换手机'],
                meta: {
                    requireAuth: true,title:'更换手机',
                },
            }, {
                path: '/financialManagementDetail',
                component: financialManagementDetail,
                meta: ['财务管理', '余额交易记录-查看凭证详情'],
                meta: {
                    requireAuth: true,title:'查看凭证详情',
                },
            }, {
                path: '/financialManagementorderDetail',
                component: financialManagementorderDetail,
                meta: ['财务管理', '余额交易记录-查看凭证详情'],
                meta: {
                    requireAuth: true,title:'查看凭证详情',
                },
            }, {
                path: '/financialManagementreturnDetail',
                component: financialManagementreturnDetail,
                meta: ['财务管理', '余额交易记录-查看凭证详情'],
                meta: {
                    requireAuth: true,title:'查看凭证详情',
                },
            }, {
                path: '/stallfinancialManagementDetail',
                component: stallfinancialManagementDetail,
                meta: ['财务管理', 'stall余额交易记录-查看凭证详情'],
                meta: {
                    requireAuth: true,title:'查看凭证详情',
                },
            },
            {
                path: '/financialindentManagementPortionPicking',
                component: financialindentManagementPortionPicking,
                meta: ['财务管理', 'stall余额交易记录-查看凭证详情'],
                meta: {
                    requireAuth: true,title:'查看凭证详情',
                },
            }, {
                path: '/remainingSum',
                component: remainingSum,
                meta: ['财务管理', '余额'],
                meta: {
                    requireAuth: true,title:'余额',
                },
            }, {
                path: '/userCenter',
                component: userCenter,
                meta: ['用户管理', '客户管理'],
                meta: {
                    requireAuth: true,title:'客户管理',
                },
            }, {
                path: '/companyManagement',
                component: companyManagement,
                meta: ['用户管理', '公司管理'],
                meta: {
                    requireAuth: true,title:'公司管理',
                },
            }, {
                path: '/messageManagement',
                component: messageManagement,
                meta: ['消息管理', '消息管理'],
                meta: {
                    requireAuth: true,title:'消息管理',
                },
            }, {
                path: '/sessionManagement',
                component: sessionManagement,
                meta: ['消息管理', '会话管理'],
                meta: {
                    requireAuth: true,title:'会话管理',
                },
            }, {
                path: '/rechangeConfig',
                component: rechangeConfig,
                meta: ['财务管理', '充值账户配置'],
                meta: {
                    requireAuth: true,title:'充值账户配置',
                },
            }, {
                path: '/setmealConfig',
                component: setmealConfig,
                meta: ['财务管理', '套餐配置'],
                meta: {
                    requireAuth: true,title:'套餐配置',
                },
            }, {
                path: '/verifyManage',
                component: verifyManage,
                meta: ['财务管理', '充值审核管理'],
                meta: {
                    requireAuth: true,title:'充值审核管理',
                },
            }, {
                path: '/financeSerial',
                component: financeSerial,
                meta: ['财务管理', '财务流水'],
                meta: {
                    requireAuth: true,title:'财务流水',
                },
            }, {
                path: '/walletInit',
                component: walletInit,
                meta: ['财务管理', '钱包初始化'],
                meta: {
                    requireAuth: true,title:'钱包初始化',
                },
            }, {
                path: '/commodityMnagement',
                component: commodityMnagement,
                meta: ['商品管理', '商品管理'],
                meta: {
                    requireAuth: true,title:'商品管理',
                },
            },
            {
                path: '/commodityStatistics',
                component: commodityStatistics,
                meta: ['商品统计'],
                meta: {
                    requireAuth: true,title:'商品统计',
                },
            },
            {
                path: '/bindstallshop',
                component: bindstallshop,
                meta: ['档口绑定店铺'],
                meta: {
                    requireAuth: true,title:'档口绑定店铺',
                },
            },
            {
                path: '/stallAssess',
                component: stallAssess,
                meta: ['其他管理', '档口考核'],
                meta: {
                    requireAuth: true,title:'档口考核',
                },
            }, {
                path: '/SellerSettlementMethod',
                component: SellerSettlementMethod,
                meta: ['其他管理', '卖家结算方式'],
                meta: {
                    requireAuth: true,title:'卖家结算方式',
                },
            }, {
                path: '/helpCenter',
                component: helpCenter,
                meta: ['帮助中心-卖家'],
                meta: {
                    requireAuth: true,title:'帮助中心',
                },
            }, {
                path: '/helpCenterStall',
                component: helpCenterStall,
                meta: ['帮助中心-档口'],
                meta: {
                    requireAuth: true,title:'帮助中心',
                },
            }, {
                path: '/bindingShops',
                component: bindingShops,
                meta: ['销售管理', '绑定网商园'],
                meta: {
                    requireAuth: true,title:'绑定网商园',
                },
            }, {
                path: '/takeGoods',
                component: takeGoods,
                meta: ['卖家拿货'],
                meta: {
                    requireAuth: true,title:'拿货',
                },
            }, {
                path: '/sellReturn',
                component: sellReturn,
                meta: ['销售退货'],
                meta: {
                    requireAuth: true,title:'销售退货',
                },
            }, {
                path: '/sellReturnSignIn',
                component: sellReturnSignIn,
                meta: ['销售退货-待签收'],
                meta: {
                    requireAuth: true,title:'销售退货',
                },
            },
            {
                path: '/sellReturnAffirm',
                component: sellReturnAffirm,
                meta: ['销售退货-待确认'],
                meta: {
                    requireAuth: true,title:'销售退货',
                },
            },
            {
                path: '/sellReturnStorage',
                component: sellReturnStorage,
                meta: ['销售退货-待入库'],
                meta: {
                    requireAuth: true,title:'销售退货',
                },
            },
            {
                path: '/finalsellReturnStorage',
                component: finalsellReturnStorage,
                meta: ['财务管理-退货详情'],
                meta: {
                    requireAuth: true,title:'财务管理-退货详情',
                },
            },
            {
                path: '/sellReturnCompleteAccount',
                component: sellReturnCompleteAccount,
                meta: ['销售退货-结算记录'],
                meta: {
                    requireAuth: true,title:'销售退货-结算记录',
                },
            },
            {
                path: '/sellReturnPaymentHistory',
                component: sellReturnPaymentHistory,
                meta: ['销售退货-支付记录'],
                meta: {
                    requireAuth: true,title:'销售退货-支付记录',
                },
            },
            {
                path: '/fastShipping2',
                component: fastShipping2,
                meta: ['销售管理', '快速出货'],
                meta: {
                    requireAuth: true,title:'快速出货',
                },
            }, {
                path: '/indentManagement',
                component: indentManagement,
                meta: ['销售管理', '订单管理'],
                meta: {
                    requireAuth: true,title:'订单管理',
                },
            }, {
                path: '/returnManagement2',
                component: returnManagement2,
                meta: ['销售管理', '退货管理'],
                meta: {
                    requireAuth: true,title:'退货管理',
                },
            }, {
                path: '/returnManagementDetails',
                component: returnManagementDetails,
                meta: ['销售管理', '退货管理-详情'],
                meta: {
                    requireAuth: true,title:'退货管理',
                },
            }, {
                path: '/indentReturnDetails',
                component: indentReturnDetails,
                meta: ['销售管理', '签收-确认退货'],
                meta: {
                    requireAuth: true,title:'签收-确认退货',
                },
            }, {
                path: '/orderPurchaseStall',
                component: orderPurchaseStall,
                meta: ['销售管理', '订单管理-详情'],
                meta: {
                    requireAuth: true,title:'订单管理-详情',
                },
            }, {
                path: '/packageStall',
                component: packageStall,
                meta: ['销售管理', '订单管理-配货详情-包裹'],
                meta: {
                    requireAuth: true,title:'订单管理-配货详情-包裹',
                },
            }, {
                path: '/packageListStall',
                component: packageListStall,
                meta: ['销售管理', '订单管理-配货详情-包裹详情'],
                meta: {
                    requireAuth: true,title:'订单管理-配货详情-包裹详情',
                },
            }, {
                path: '/indentManagementPackageDetails',
                component: indentManagementPackageDetails,
                meta: ['销售管理', '订单管理-配货详情-包裹详情'],
                meta: {
                    requireAuth: true,title:'订单管理-配货详情-包裹详情',
                },
            }, {
                path: '/indentManagementPickingConfirmed',
                component: indentManagementPickingConfirmed,
                meta: ['销售管理', '订单管理-配货待确认'],
                meta: {
                    requireAuth: true,title:'订单管理-配货待确认',
                },
            },
            {
                path: '/indentManagementPortionPicking',
                component: indentManagementPortionPicking,
                meta: ['销售管理', '订单管理-部分配货'],
                meta: {
                    requireAuth: true,title:'订单管理-部分配货',
                },
            },
            {
                path: '/indentManagementReturnDetails',
                component: indentManagementReturnDetails,
                meta: ['销售管理', '订单管理-退货详情-确认'],
                meta: {
                    requireAuth: true,title:'订单管理-退货详情-确认',
                },
            }, {
                path: '/indentManagementComplete',
                component: indentManagementComplete,
                meta: ['销售管理', '订单管理-退货完成'],
                meta: {
                    requireAuth: true,title:'订单管理-退货完成',
                },
            }, {
                path: '/indentManagementReturnDetails2',
                component: indentManagementReturnDetails2,
                meta: ['销售管理', '订单管理-退货详情-立即收货'],
                meta: {
                    requireAuth: true,title:'订单管理-退货详情-立即收货',
                },
            }, {
                path: '/indentManagementCompleteAccount',
                component: indentManagementCompleteAccount,
                meta: ['销售管理', '订单管理-财务结算'],
                meta: {
                    requireAuth: true,title:'订单管理-财务结算',
                },
            }, {
                path: '/indentManagementAccountDetails',
                component: indentManagementAccountDetails,
                meta: ['销售管理', '订单管理-财务结算-详情'],
                meta: {
                    requireAuth: true,title:'订单管理-财务结算-详情',
                },
            }, {
                path: '/sellerSettlement',
                component: sellerSettlement,
                meta: ['销售管理', '卖家结算'],
                meta: {
                    requireAuth: true,title:'结算',
                },
            }, {
                path: '/sellerSettlementImmediately',
                component: sellerSettlementImmediately,
                meta: ['销售管理', '卖家结算-立即结算'],
                meta: {
                    requireAuth: true,title:'立即结算',
                },
            },
            {
                path: '/sellerSettlementDetailsl',
                component: sellerSettlementDetailsl,
                meta: ['销售管理', '卖家结算-查看详情'],
                meta: {
                    requireAuth: true,title:'结算-查看详情',
                },
            },
            {
                path: '/sellerSettlementreturnDetails',
                component: sellerSettlementreturnDetails,
                meta: ['销售管理', '结算单-查看详情'],
                meta: {
                    requireAuth: true,title:'结算单-查看详情',
                },
            },
            {
                path: '/sellerSettlementorderDetails',
                component: sellerSettlementorderDetails,
                meta: ['销售管理', '结算单-查看详情'],
                meta: {
                    requireAuth: true,title:'结算单-查看详情',
                },
            },
            {
                path: '/sellerSettlementDetails',
                component: sellerSettlementDetails,
                meta: ['销售管理', '卖家结算-查看详情later'],
                meta: {
                    requireAuth: true,title:'结算单-查看详情',
                },
            }, {
                path: '/sellerSettlementRecord',
                component: sellerSettlementRecord,
                meta: ['销售管理', '卖家结算-结算记录'],
                meta: {
                    requireAuth: true,title:'结算-结算记录',
                },
            }, {
                path: '/customerManagement',
                component: customerManagement,
                meta: ['销售管理', '客户管理'],
                meta: {
                    requireAuth: true,title:'客户管理',
                },
            }, {
                path: '/statisticalStatement',
                component: statisticalStatement,
                meta: ['销售管理', '统计报表'],
                meta: {
                    requireAuth: true,title:'统计报表',
                },
            }, {
                path: '/currentInventory',
                component: currentInventory,
                meta: ['库存管理', '当前库存'],
                meta: {
                    requireAuth: true,title:'当前库存',
                },
            }, {
                path: '/stocktaking',
                component: stocktaking,
                meta: ['库存管理', '库存盘点'],
                meta: {
                    requireAuth: true,title:'库存盘点',
                },
            }, {
                path: '/startCounting',
                component: startCounting,
                meta: ['库存管理', '库存盘点-开始盘点'],
                meta: {
                    requireAuth: true,
                },
            }, {
                path: '/stocktakingDifference',
                component: stocktakingDifference,
                meta: ['库存管理', '库存盘点-差异表'],
                meta: {
                    requireAuth: true,title:'库存盘点-差异表',
                },
            }, {
                path: '/stocktakingRecord',
                component: stocktakingRecord,
                meta: ['库存管理', '库存盘点-记录'],
                meta: {
                    requireAuth: true,title:'库存盘点-记录',
                },
            }, {
                path: '/inventoryDetail',
                component: inventoryDetail,
                meta: ['库存管理', '库存变动'],
                meta: {
                    requireAuth: true,title:'库存变动',
                },
            }, {
                path: '/inventoryWarning',
                component: inventoryWarning,
                meta: ['库存管理', '库存预警'],
                meta: {
                    requireAuth: true,title:'库存预警',
                },
            }, {
                path: '/stockTransshipment',
                component: stockTransshipment,
                meta: ['库存管理', '库存调拨'],
                meta: {
                    requireAuth: true,title:'库存调拨',
                },
            }, {
                path: '/stockTransshipmentDetails',
                component: stockTransshipmentDetails,
                meta: ['库存管理', '库存调拨-开始调拨'],
                meta: {
                    requireAuth: true,title:'库存调拨-开始调拨',
                },
            }, {
                path: '/stockTransshipmentDetails2',
                component: stockTransshipmentDetails2,
                meta: ['库存管理', '库存调拨-详情'],
                meta: {
                    requireAuth: true,title:'库存调拨-详情',
                },
            }, {
                path: '/storeManagement',
                component: storeManagement,
                meta: ['库存管理', '多仓管理'],
                meta: {
                    requireAuth: true,title:'多仓管理',
                },
            }, {
                path: '/inventoryInitialize',
                component: inventoryInitialize,
                meta: ['库存管理', '库存初始化'],
                meta: {
                    requireAuth: true,title:'库存初始化',
                },
            }, {
                path: '/logTools',
                component: logTools,
                meta: ['日志查看'],
                meta: {
                    requireAuth: true,title:'日志查看',
                },
            }, {
                path: '/logToolsSeller',
                component: logToolsSeller,
                meta: ['日志查看'],
                meta: {
                    requireAuth: true,title:'日志查看',
                },
            }, {
                path: '/MSConfig',
                component: MSConfig,
                meta: ['系统配置-档口'],
                meta: {
                    requireAuth: true,title:'系统配置',
                },
            },{
                path: '/siteConfig',
                component: siteConfig,
                meta: ['地址配置'],
                meta: {
                    requireAuth: true,title:'地址配置',
                },
            }, {
                path: '/MSConfigSeller',
                component: MSConfigSeller,
                meta: ['系统配置-卖家'],
                meta: {
                    requireAuth: true,title:'系统配置',
                },
            }, {
                path: '/productManagement',
                component: productManagement,
                meta: ['商品管理'],
                meta: {
                    requireAuth: true,title:'商品管理',
                },
            }, {
                path: '/bindWebstoreForPlatform',
                component: bindWebstoreForPlatform,
                meta: ['绑定店铺-运营平台'],
                meta: {
                    requireAuth: true,title:'绑定店铺',
                },
            }, {
                path: '/orderForPlatform',
                component: orderForPlatform,
                meta: ['采购订单-运营平台'],
                meta: {
                    requireAuth: true,title:'采购订单-运营平台',
                },
            }, {
                path: '/orderDetailForPlatform',
                component: orderDetailForPlatform,
                meta: ['采购订单详情-运营平台'],
                meta: {
                    requireAuth: true,title:'采购订单详情-运营平台',
                },
            }, {
                path: '/dynamicsOrderForPlatform',
                component: dynamicsOrderForPlatform,
                meta: ['采购订单动态信息-运营平台'],
                meta: {
                    requireAuth: true,title:'采购订单动态信息-运营平台',
                },
            }, {
                path: '/stallProcurement',
                component: stallProcurement,
                meta: ['采购管理-档口'],
                meta: {
                    requireAuth: true,title:'采购管理',
                },
            }, {
                path: '/msgParamsConfig',
                component: msgParamsConfig,
                meta: ['短信参数配置-运营平台'],
                meta: {
                    requireAuth: true,title:'短信参数配置-运营平台',
                },
            }, {
                path: '/msgSendInterfaceConfig',
                component: msgSendInterfaceConfig,
                meta: ['短信发送接口配置-运营平台'],
                meta: {
                    requireAuth: true,title:'短信发送接口配置-运营平台',
                },
            }, {
                path: '/menuManagement',
                component: menuManagement,
                meta: ['菜单管理-平台'],
                meta: {
                    requireAuth: true,title:'菜单管理-运营平台',
                },
            }, {
                path: '/stallProcurement',
                component: stallProcurement,
                meta: ['采购管理-采购入库'],
                meta: {
                    requireAuth: true,title:'采购管理-采购入库',
                },
            }, {
                path: '/stallProcurementStart',
                component: stallProcurementStart,
                meta: ['采购管理-采购入库-开始采购'],
                meta: {
                    requireAuth: true,title:'采购管理-采购入库-开始采购',
                },
            }, {
                path: '/stallProcurementStorage',
                component: stallProcurementStorage,
                meta: ['采购管理-采购入库-入库 签收'],
                meta: {
                    requireAuth: true,title:'采购管理-采购入库-入库 签收',
                },
            }, {
                path: '/supplierManagement',
                component: supplierManagement,
                meta: ['采购管理-供应商管理'],
                meta: {
                    requireAuth: true,title:'采购管理-供应商管理',
                },
            }, {
                path: '/stallProductManagement',
                component: stallProductManagement,
                meta: ['采购管理-商品管理'],
                meta: {
                    requireAuth: true,title:'采购管理-商品管理',
                },
            }, {
                path: '/stallAddGoods',
                component: stallAddGoods,
                meta: ['采购管理-商品管理-添加'],
                meta: {
                    requireAuth: true,title:'采购管理-商品管理-添加',
                },
            }, {
                path: '/classificationGoods',
                component: classificationGoods,
                meta: ['采购管理-商品分类'],
                meta: {
                    requireAuth: true,title:'采购管理-商品分类',
                },
            }, {
                path: '/classificationGoodsDetails',
                component: classificationGoodsDetails,
                meta: ['采购管理-商品分类-详情'],
                meta: {
                    requireAuth: true,title:'采购管理-商品分类-详情',
                },
            },
            {
                path: '/platformSettings',
                component: platformSettings,
                meta: ['平台管理'],
                meta: {
                    requireAuth: true,title:'平台管理',
                },
            }, {
                path: '/msgManagement',
                component: msgManagement,
                meta: ['短信管理-运营平台'],
                meta: {
                    requireAuth: true,title:'短信管理-运营平台',
                },
            },
            {
                path: '/bulletinManagement',
                component: bulletinManagement,
                meta: ['公告管理'],
                meta: {
                    requireAuth: true,title:'公告管理',
                },
            },
            {
                path: '/logManagement',
                component: logManagement,
                meta: ['日志管理'],
                meta: {
                    requireAuth: true,title:'日志管理',
                },

            },
            {
                path: '/stockAllotManagement',
                component: stockAllotManagement,
                meta: ['库存调拨-运营平台'],
                meta: {
                    requireAuth: true,title:'库存调拨-运营平台',
                },
            }, {
                path: '/packageStatus',
                component: packageStatus,
                meta: ['包裹-详情'],
                meta: {
                    requireAuth: true,title:'包裹-详情',
                },
            }, {
                path: '/packageDetails',
                component: packageDetails,
                meta: ['包裹'],
                meta: {
                    requireAuth: true,title:'包裹',
                },
            }, {
                path: '/emptypackage',
                component: emptypackage,
                meta: ['包裹'],
                meta: {
                    requireAuth: true,
                },
            }, {
                path: '/stallManage',
                component: stallManage,
                meta: ['档口管理'],
                meta: {
                    requireAuth: true,title:'档口管理',
                },
            }, {
                path: '/stockAllotDetails',
                component: stockAllotDetails,
                meta: ['调拨详情-平台'],
                meta: {
                    requireAuth: true,title:'调拨详情-平台',
                },
            }, {
                path: '/warehouseManagement',
                component: warehouseManagement,
                meta: ['库存管理-平台'],
                meta: {
                    requireAuth: true,title:'库存管理-平台',
                },
            }, {
                path: '/warehouseDetails',
                component: warehouseDetails,
                meta: ['库存管理详情-平台'],
                meta: {
                    requireAuth: true,title:'库存管理详情-平台',
                },
            }, {
                path: '/checkDiffManagement',
                component: checkDiffManagement,
                meta: ['库存差异-平台'],
                meta: {
                    requireAuth: true,title:'库存差异-平台',
                },
            }, {
                path: '/checkDiffDetails',
                component: checkDiffDetails,
                meta: ['库存差异详情-平台'],
                meta: {
                    requireAuth: true,title:'库存差异详情',
                },
            }, {
                path: '/stockTakingManagement',
                component: stockTakingManagement,
                meta: ['库存盘点-平台'],
                meta: {
                    requireAuth: true,title:'库存盘点',
                },
            }, {
                path: '/stockTakingDetails',
                component: stockTakingDetails,
                meta: ['库存盘点详情-平台'],
                meta: {
                    requireAuth: true,title:'库存盘点详情',
                },
            }, {
                path: '/messageCenter',
                component: messageCenter,
                meta: ['消息中心'],
                meta: {
                    requireAuth: true,title:'消息中心',
                },
            }, {
                path: '/messageCenterDetails',
                component: messageCenterDetails,
                meta: ['消息中心-详情'],
                meta: {
                    requireAuth: true,title:'消息中心-详情',
                },
            }, {
                path: '/systemNotice',
                component: systemNotice,
                meta: ['首页-系统公告'],
                meta: {
                    requireAuth: true,title:'系统公告',
                },
            }, {
                path: '/systemNoticeDetails',
                component: systemNoticeDetails,
                meta: ['首页-系统公告-详情'],
                meta: {
                    requireAuth: true,title:'首页-系统公告-详情',
                },
            }, {
                path: '/sellerIntroduction',
                component: sellerIntroduction,
                meta: ['首页-卖家 新手入门'],
                meta: {
                    requireAuth: true,title:'首页-卖家 新手入门',
                },
            }, {
                path: '/stallIntroduction',
                component: stallIntroduction,
                meta: ['首页-档口 新手入门'],
                meta: {
                    requireAuth: true,title:'新手入门',
                },
            }, {
                path: '/promptlyReturns',
                component: promptlyReturns,
                meta: ['退货-立即退货'],
                meta: {
                    requireAuth: true,title:'退货-立即退货',
                },
            }, {
                path: '/salesReturnDetailsAccounts',
                component: salesReturnDetailsAccounts,
                meta: ['退货-退货详情-结算'],
                meta: {
                    requireAuth: true,title:'退货-退货详情-结算',
                },
            }, {
                path: '/salesReturnAccountsDetails',
                component: salesReturnAccountsDetails,
                meta: ['退货-退货详情-结算-详情'],
                meta: {
                    requireAuth: true,title:'退货-退货详情-结算-详情',
                },
            }, {
                path: '/promptlyReturnsAffirm',
                component: promptlyReturnsAffirm,
                meta: ['退货-立即退货-确认退货'],
                meta: {
                    requireAuth: true,title:'退货-立即退货-确认退货',
                },
            }, {
                path: '/webStoreOrderForPlatform',
                component: webStoreOrderForPlatform,
                meta: ['业务管理(运营平台)-网店订单管理'],
                meta: {
                    requireAuth: true,title:'网店订单管理',
                },
            }, {
                path: '/reportquery',
                component: reportquery,
                meta: ['业务管理(运营平台)-报表查询'],
                meta: {
                    requireAuth: true,title:'报表查询',
                },
            },{
                path: '/WeChatPay',
                component: WeChatPay,
                meta: ['账户余额-微信支付'],
                meta: {
                    requireAuth: true,title:'账户余额-微信支付',
                },
            }, {
                path: '/stallPurchase',
                component: stallPurchase,
                meta: ['采购退货'],
                meta: {
                    requireAuth: true,title:'采购退货',
                },
            }, {
                path: '/stallPurchaseReturns',
                component: stallPurchaseReturns,
                meta: ['采购退货'],
                meta: {
                    requireAuth: true,title:'采购退货',
                },
                stallPurchaseReturns
            },
            {
                path: '/stallPurchaseDetail',
                component: stallPurchaseDetail,
                meta: ['采购退货详情'],
                meta: {
                    requireAuth: true,title:'采购退货详情',
                },
                stallPurchaseReturns
            },
            {
                path: '/inviteCode',
                component: inviteCode,
                meta: ['邀请码'],
                meta: {
                    requireAuth: true,title:'邀请码',
                },
            },
            {
                path: '/sellerCarConfig',
                component: sellerCarConfig,
                meta: ['公司车辆'],
                meta: {
                    requireAuth: true,title:'公司车辆',
                }
            },
            {
                path: '/transportDetail',
                component: transportDetail,
                meta: ['运输明细'],
                meta: {
                    requireAuth: true,title:'运输明细',
                }
            },
            {
                path: '/transportpackageDetail',
                component: transportpackageDetail,
                meta: ['运输明细'],
                meta: {
                    requireAuth: true,title:'运输明细',
                }
            },
            {
                path: '/applicationPackage',
                component: applicationPackage,
                meta: ['应用管理'],
                meta: {
                    requireAuth: true,title:'应用管理',
                }
            }
        ]
    }
]

const router = new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
		var token = getSessionStore(types.SESSION_TOKEN);
        if (token == '' || token==null) {
            //next({ path: '/', query: { redirect: to.fullPath } });
			next({ path: '/'});
        } else {
			/*
			var vpath=to.path.replace("/","");
			if(checkRouterAuth(vpath)){
				next();
			}*/
			next();
        }
    } else {
        next();
    }
})

export default router;
