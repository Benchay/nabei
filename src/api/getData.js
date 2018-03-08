﻿import fetch from '@/config/fetch'

/**
 * 登陆
 */
export const login = data => fetch('/ums/api/login.do', data, 'POST');
/**
 * 退出
 */
export const logout = data => fetch('/ums/api/logout.do', data, 'GET');
/**
 * 载入用户信息
 */
export const loadUserInfo = data => fetch('/ums/api/loadUserInfo.do', data, 'GET');
/**
 *获取用户角色列表
 */
export const getUserRoles = data => fetch('/ums/api/getUserRoles.do', data, 'GET');
/**
 * 删除角色信息
 */
export const delRole = data => fetch('/ums/api/delRole.do', data, 'GET');
/**
 * 获取用户权限列表
 */
export const getUserAuths = data => fetch('/ums/api/getUserAuths.do', data, 'GET');
export const getUserAuthsMenu = data => fetch('/ums/api/getUserAuthsMenu.do', data, 'GET');

export const resetpwd = data => fetch('/ums/api/resetUserPassword.do', data, 'POST');

export const findpwdByPhone = data => fetch('/ums/api/findUserPassword.do', data, 'GET');

export const findCompanysByNameAndMoblie = data => fetch('/ums/api/findCompanysByNameAndMoblie.do', data, 'POST');

export const findCompanysByName = data => fetch('/ums/api/findCompanysByName.do', data, 'POST');

export const registeUser = data => fetch('/ums/api/registeUser.do', data, 'Post');

export const createVmCompany = data => fetch('/ums/api/createVmCompany.do', data, 'POST');

export const checkImportVmCompany = data => fetch('/ums/api/checkImportVmCompany.do', data, 'POST');

export const createCompanyFun = data => fetch('/ums/api/createCompany.do', data, 'POST');
export const getMobileCode = data => fetch('/ums/api/getMobileCode.do', data, 'GET');
export const saveRole = data => fetch('/ums/api/saveRole.do', data, 'POST');
export const queryRole = data => fetch('/ums/api/queryRole.do', data, 'POST');
export const queryAuthsByRole = data => fetch('/ums/api/queryAuthsByRole.do', data, 'GET');
export const addNewStaff = data => fetch('/ums/api/addNewStaff.do', data, 'POST');
export const queryUserByCompany = data => fetch('/ums/api/queryUserByCompany.do', data, 'GET');
export const loadAllUserInfo = data => fetch('/ums/api/loadAllUserInfo.do', data, 'GET');
export const loadCompanyUserInfo = data => fetch('/ums/api/loadCompanyUserInfo.do', data, 'POST');
export const delUserRole = data => fetch('/ums/api/delUserRole.do', data, 'GET');
export const delUserCompany = data => fetch('/ums/api/delUserCompany.do', data, 'GET');
export const findUserByMobile = data => fetch('/ums/api/findUserByMobile.do', data, 'GET');
export const queryCompanyUsers = data => fetch('/ums/api/queryCompanyUsers.do', data, 'POST');
export const batchAddUserRoles = data => fetch('/ums/api/batchAddUserRoles.do', data, 'POST');
export const queryUsersByRole = data => fetch('/ums/api/queryUsersByRole.do', data, 'GET');
export const updateRole = data => fetch('/ums/api/updateRole.do', data, 'POST');
export const queryCompany = data => fetch('/ums/api/queryCompany.do', data, 'POST');
export const requestUserCompany = data => fetch('/ums/api/requestUserCompany.do', data, 'GET');
export const requestJoinCompany = data => fetch('/ums/api/requestJoinCompany.do', data, 'POST');
export const processJoinApplication = data => fetch('/ums/api/processJoinApplication.do', data, 'GET');
export const complateUserCompany = data => fetch('/ums/api/complateUserCompany.do', data, 'POST');
export const getUserCompanys = data => fetch('/ums/api/getUserCompanys.do', data, 'GET');
export const saveCompany = data => fetch('/ums/api/saveCompany.do', data, 'POST');
export const deleteCompany = data => fetch('/ums/api/deleteCompany.do', data, 'GET');
export const exitCompany = data => fetch('/ums/api/exitCompany.do', data, 'GET');
export const changeCompanyAuth = data => fetch('/ums/api/changeCompanyAuth.do', data, 'GET');
export const changeUserPasswordEx = data => fetch('/ums/api/changeUserPasswordEx.do', data, 'GET');
export const getCompanyAuthsByCompanyId = data => fetch('/ums/api/getCompanyAuthsByCompanyId.do', data, 'GET');
export const updateLoginInfo = data => fetch('/ums/api/updateLoginInfo.do', data, 'POST');
export const queryUsersCommInfo = data => fetch('/ums/api/queryUsersCommInfo.do', data, 'POST');
export const createMsgParamsConfig = data => fetch('/ums/api/createMsgParamsConfig.do', data, 'POST');
export const updateMsgConfig = data => fetch('/ums/api/updateMsgConfig.do', data, 'POST');
export const selectMsgConfig = data => fetch('/ums/api/selectMsgConfig.do', data, 'GET');
export const createSendInterfaceConfig = data => fetch('/ums/api/createSendInterfaceConfig.do', data, 'POST');
export const batchDeleteMsgConfig = data => fetch('/ums/api/batchDeleteMsgConfig.do', data, 'GET');
export const selectSendMsgRecord = data => fetch('/ums/api/selectSendMsgRecord.do', data, 'POST');
export const batchDeleteSendMsgRecord = data => fetch('/ums/api/batchDeleteSendMsgRecord.do', data, 'GET');
export const getRandomCode = data => fetch('/ums/api/getRandomCode.do', data, 'GET');


export const findUserByKeyword = data => fetch('/ums/api/findUserByKeyword.do', data, 'GET');

export const loadUserInIds = data => fetch('/ums/api/loadUserInIds.do', data, 'POST');
export const modifyStaffByUserId = data => fetch('/ums/api/modifyStaffByUserId.do', data, 'POST');





/*
 * ims
 */
export const queryContacts = data => fetch('/ims/contactsApi/queryContacts.do', data, 'GET');
export const queryAllContacts = data => fetch('/ims/contactsApi/queryAllContacts.do', data, 'GET');
/*
 * cws
 */
export const getBindWebStoreUrl = data => fetch('/cws/webStore/getBindWebStoreUrl.do', data, 'GET');
export const findWebStoreRecord = data => fetch('/cws/webStore/findWebStoreRecord.do', data, 'POST');
export const deleteWebStoreRecord = data => fetch('/cws/webStore/deleteWebStoreRecord', data, 'GET');
export const batchDeleteWebStoreRecord = data => fetch('/cws/webStore/batchDeleteWebStoreRecord', data, 'POST');
export const querySalesReturnList = data => fetch('/cws/order/querySalesReturnList.do', data, 'POST');
export const querySalesStockInList = data => fetch('/cws/order/querySalesStockInList.do', data, 'POST');
export const salesStockIn = data => fetch('/cws/order/salesStockIn.do', data, 'GET');
export const stallGradedScore = data => fetch('/cws/stall/gradedScore.do', data, 'POST');
export const salesGradedScore = data => fetch('/cws/webStore/gradedScore.do', data, 'POST');
export const queryWebStore = data => fetch('/cws/webStore/queryWebStore.do', data, 'POST');
export const queryOrderRecord = data => fetch('/cws/order/queryOrderRecord.do', data, 'POST');
export const queryOrderManage = data => fetch('/cws/order/queryOrderManage.do', data, 'POST');
export const queryPurchaseRequireByStall = data => fetch('/cws/purchaseRequire/queryPurchaseRequireByStall.do', data, 'POST');
export const queryPurchaseRequireNoStall = data => fetch('/cws/purchaseRequire/queryPurchaseRequireNoStall.do', data, 'POST');
export const queryGoodsReturnList = data => fetch('/cws/order/queryGoodsReturnList.do', data, 'POST');
export const deletePurchase = data => fetch('/cws/purchaseRequire/deletePurchase.do', data, 'POST');
export const editPurchase = data => fetch('/cws/purchaseRequire/editPurchase.do', data, 'POST');
export const enterPurchase = data => fetch('/cws/purchaseRequire/enterPurchase.do', data, 'POST');
export const remindPrepare = data => fetch('/cws/order/remindPrepare.do', data, 'POST');
export const initStall = data => fetch('/cws/stall/initStall.do', data, 'POST');
export const querySalesPackageListByOrder = data => fetch('/cws/packageList/querySalesPackageListByOrder.do', data, 'GET');
export const queryOrderDetailByOrderId = data => fetch('/cws/orderDetail/queryOrderDetailByOrderId.do', data, 'GET');
export const queryOrderDetailSales = data => fetch('/cws/orderDetail/queryOrderDetailSales.do', data, 'POST');
/*
 * 市场
 */
export const queryMarket = data => fetch('/cws/market/queryMarket.do', data, 'POST');
/*
 *主营业务
 */
export const loadCoreBusiness = data => fetch('/cws/stall/loadCoreBusiness.do', data, 'GET');
/**
 * 查询网店订单
 */
export const queryWebStoreOrder = data => fetch('/cws/webStoreOrder/queryWebStoreOrder.do', data, 'POST');

export const markOrder = data => fetch('/cws/webStoreOrder/markWebStoreOrder.do', data, 'POST');

export const batchdeleteWebStoreOrder = data => fetch('/cws/webStoreOrder/batchdeleteWebStoreOrder.do', data, 'GET');

/**
 * 查询网店子订单
 */
export const queryWebStoreOrderDetail = data => fetch('/cws/webStoreOrderDetail/queryWebStoreOrderDetail.do', data, 'POST');

/**
 * 查询采购需求
 */
export const queryPurchaseRequire = data => fetch('/cws/purchaseRequire/queryPurchaseRequire.do', data, 'POST');
/*批量删除采购需求*/
export const batchDeletePurchaseRequire = data => fetch('/cws/purchaseRequire/batchDelete.do', data, 'POST');

/**
 * 生成采购需求
 */
export const createByWebStoreOrderDetail = data => fetch('/cws/purchaseRequire/createByWebStoreOrderDetail.do', data, 'POST');

/**
 * 查询订单信息
 */
export const getOrder = data => fetch('/cws/order/getOrder.do', data, 'POST');
/**
 * 查询订单分页集合
 */
export const queryOrder = data => fetch('/cws/order/queryOrder.do', data, 'POST');
/**
 * 查询订单详情分页
 */
export const queryOrderDetail = data => fetch('/cws/orderDetail/queryOrderDetail.do', data, 'POST');
/**
 * 查询订单详情不分页
 */

export const findOrderDetail = data => fetch('/cws/orderDetail/findOrderDetail.do', data, 'GET');

/**
 * 生成采购订单
 */
export const createOrderByPurchaseRequire = data => fetch('/cws/order/createByPurchaseRequire.do', data, 'POST');
/**
 * 采购订单确定下单
 */
export const updateOrderByPlace = data => fetch('/cws/order/updateByPlace.do', data, 'POST');
/**
 * 采购订单确定配货
 */
export const updatePackageByAllocate = data => fetch('/cws/order/updateByAllocate.do', data, 'POST');

/**
 * 查询包裹(档口)
 */
export const findPackage = data => fetch('/cws/package/findPackage.do', data, 'POST');
export const queryPackageLogInfo = data => fetch('/cws/package/queryPackageLogInfo.do', data, 'POST');

/**
 * 创建包裹(档口)
 */
export const createPackageByOrderDetail = data => fetch('/cws/package/createByOrderDetail.do', data, 'POST');

/**
 * 创建包裹(档口)
 */
export const createPackage = data => fetch('/cws/package/createPackage.do', data, 'POST');

/**
 * 添加到某个包裹(档口)
 */
export const removeToPackageByOrderDetail = data => fetch('/cws/package/removeToByOrderDetail.do', data, 'POST');

/**
 * 删除包裹(档口)
 */
export const deletePackage = data => fetch('/cws/package/deletePackage.do', data, 'GET');


/**
 * 删除包裹清单(档口)
 */
export const deletePackageList = data => fetch('/cws/packageList/deletePackageList.do', data, 'POST');


/**
 * 查询包裹详情(档口，无分页)
 */
export const findPackageList = data => fetch('/cws/packageList/findPackageList.do', data, 'POST');

/**
 * 查询包裹详情(档口,分页)
 */
export const queryPackage = data => fetch('/cws/package/queryPackage.do', data, 'POST');
export const queryPackageList = data => fetch('/cws/packageList/queryPackageList.do', data, 'POST');
export const batchStockIn = data => fetch('/cws/package/batchStockIn.do', data, 'POST');
export const findOrderLogDetail = data => fetch('/cws/order/findOrderLogDetail.do', data, 'GET');

/**
 *财务
 */
export const queryPlatformAccount = data => fetch('/wallet/api/queryPlatformAccount', data, 'GET');

export const queryFinanceRecord = data => fetch('/wallet/api/queryFinanceRecord', data, 'POST');

export const getFinanceRecord = data => fetch('/wallet/api/getFinanceRecord', data, 'GET');

export const swithNotice = data => fetch('/wallet/api/swithNotice', data, 'GET');

export const queryRangeChanged = data => fetch('/wallet/api/queryRangeChanged', data, 'POST');

export const queryRangeCondition = data => fetch('/wallet/api/queryRangeCondition', data, 'POST');

export const queryRange = data => fetch('/wallet/api/queryRange', data, 'POST');

export const modifyThreshold = data => fetch('/wallet/api/modifyThreshold', data, 'GET');

export const walletRecharge = data => fetch('/wallet/api/walletRecharge', data, 'POST');

export const walletOutcash = data => fetch('/wallet/api/walletOutcash', data, 'POST');

export const walletFeeforword = data => fetch('/wallet/api/walletFeeforword', data, 'POST');


export const queryUserInfo = data => fetch('/ums/api/loadAllUserInfo.do', data, 'POST');

export const delUserInfo = data => fetch('/ums/api/delUserInfo.do', data, 'GET');

export const saveUserInfo = data => fetch('/ums/api/saveUserInfo.do', data, 'POST');

export const saveUser = data => fetch('/ums/api/saveUser.do', data, 'POST');

export const recharge = data => fetch('/wallet/api/recharge', data, 'GET');

export const queryCompanyInfo = data => fetch('/ums/api/loadAllCompInfo.do', data, 'POST');

export const bindingFinanceAccount = data => fetch('/wallet/api/bindingFinanceAccount', data, 'POST');

export const unbindingFinanceAccount = data => fetch('/wallet/api/unBindingFinanceAccount', data, 'GET');

export const savePayPassword = data => fetch('/wallet/api/savePayPassword', data, 'POST');

export const saveWalletMobile = data => fetch('/wallet/api/saveWalletMobile', data, 'POST');

export const findBeanRechargePackage = data => fetch('/wallet/api/findBeanRechargePackage.do', data, 'GET');

export const createBeanRechargePackage = data => fetch('/wallet/api/createBeanRechargePackage.do', data, 'POST');

export const updateBeanRechargePackage = data => fetch('/wallet/api/updateBeanRechargePackage.do', data, 'POST');

export const deleteBeanRechargePackage = data => fetch('/wallet/api/deleteBeanRechargePackage.do', data, 'GET');


export const queryCompanyInfoDetail = data => fetch('/ums/api/queryCompanyInfoDetail.do', data, 'POST');

export const createFinanceAccountForCustomer = data => fetch('/wallet/api/createFinanceAccountForCustomer', data, 'POST');

export const createPaymentAccount = data => fetch('/wallet/api/createPaymentAccount.do', data, 'POST');

export const queryPaymentAccount = data => fetch('/wallet/api/queryPaymentAccount.do', data, 'GET');

export const deletePaymentAccountForCustomer = data => fetch('/wallet/api/deletePaymentAccountForCustomer.do', data, 'GET');

export const updatePaymentAccount = data => fetch('/wallet/api/updatePaymentAccount.do', data, 'POST');

export const batchdeletePayment = data => fetch('/wallet/api/batchdeletePayment.do', data, 'GET');

export const queryRangeConditionForCustomer = data => fetch('/wallet/api/queryRangeConditionForCustomer.do', data, 'POST');

export const batchAuditingWalletChange = data => fetch('/wallet/api/batchAuditingWalletChange', data, 'GET');

export const batchDeleteBeanRechargePackage = data => fetch('/wallet/api/batchDeleteBeanRechargePackage.do', data, 'GET');

export const updateCompanyAccountBySystem = data => fetch('/wallet/api/updateCompanyAccountBySystem.do', data, 'POST');

export const selectFinanceBySystem = data => fetch('/wallet/api/selectFinanceBySystem.do', data, 'POST');

export const selectFinanceRecordCert = data => fetch('/wallet/api/selectFinanceRecordCert.do', data, 'GET');

export const exportRangeConditionForCustomer = data => fetch('/wallet/api/exportRangeConditionForCustomer.do', data, 'POST');

export const queryPurchaserIds = data => fetch('/cws/order/queryPurchaserIds.do', data, 'GET');

export const queryPurchaserInfo = data => fetch('/ums/api/findCompInfoByIds.do', data, 'POST');

export const queryQuickShipmentInfo = data => fetch('/cws/order/queryShipment.do', data, 'POST');


export const quickShipments = data => fetch('/cws/order/quickShipment.do', data, 'POST');

export const getCompanyStocks = data => fetch("/stock/api/getCompanyStocks", data, 'GET');
//export const initDefaultWareHouse = data => fetch("/stock/api/initDefaultWareHouse", data, 'GET');


export const queryShipmentDetail = data => fetch("/cws/order/queryShipmentDetail.do", data, 'GET');

export const getCompanyStockChanges = data => fetch("/stock/api/getCompanyStockChanges", data, 'GET');


export const queryStockOrderDetailForAllocation = data => fetch("/stock/api/queryStockOrderDetailForAllocation", data, 'GET');

export const queryOrderInfo = data => fetch("/cws/order/loadOrderInfo.do", data, 'GET');

export const delOrderInfo = data => fetch("/cws/order/delOrderDetailInfo.do", data, 'GET');

export const queryQuickSalesReturnInfo = data => fetch("/cws/order/querySalesReturnOrder.do", data, 'POST');

export const querySalesReturnOrderInfo = data => fetch("/cws/order/loadOrderInfo.do", data, 'GET');

export const querySalesReturnDetail = data => fetch("/cws/order/querySalesReturnDetailInfo.do", data, 'GET');

export const quickSalesReturn = data => fetch("/cws/order/quickSalesReturn.do", data, 'POST');
export const querySalesPendingList = data => fetch("/cws/order/querySalesPendingList.do", data, 'POST');
/**
 * stock
 */
export const queryWarningStocks = data => fetch("/stock/api/queryWarningStocks.do", data, 'GET');

export const updateSafeStockNum = data => fetch("/stock/api/updateSafeStockNum.do", data, 'GET');

export const queryCurrentWarehouseId = data => fetch("/cws/stall/findCurrentHouseId.do", data, 'GET');

export const queryProductInfo = data => fetch("/stock/api/getProductVariantByProductCode", data, 'GET');

export const queryWarehouseInfo = data => fetch("/stock/api/getWarehouse", data, 'GET');

export const getWarehouseName = data => fetch("/stock/api/getWarehouse", data, 'GET');

export const queryWarehouse = data => fetch("/stock/api/queryWarehouse", data, 'POST');

export const queryWarehouseSeat = data => fetch("/stock/api/queryWarehouseSeat", data, 'POST');

export const updateWarehouseSeatByProduct = data => fetch("/stock/api/updateWarehouseSeatByProduct.do", data, 'GET');

export const createStockOrder = data => fetch("/stock/api/createStockOrder.do", data, 'POST');

export const saveWarehouse = data => fetch("/stock/api/saveWarehouse.do", data, 'POST');

export const saveWarehouseSeat = data => fetch("/stock/api/saveWarehouseSeat.do", data, 'POST');

export const delWarehouse = data => fetch("/stock/api/delWarehouse.do", data, 'GET');

export const delWarehouseSeat = data => fetch("/stock/api/delWarehouseSeat.do", data, 'GET');

export const queryStockOrderGroupByProductCode = data => fetch("/stock/api/queryStockOrderGroupByProductCode", data, 'GET');

export const queryWarehouseSeatInfo = data => fetch("/stock/api/getWarehouseSeat.do", data, 'GET');

export const queryProductDetailInfo = data => fetch("/stock/api/getProductInfo.do", data, 'POST');
export const queryBarcode = data => fetch("/stock/api/queryBarcode.do", data, 'POST');



export const querySalesNum = data => fetch("/cws/order/findSalesNum.do", data, 'POST');

export const quickShipments2 = data => fetch("/cws/order/fastShipping.do", data, 'POST');

export const quickSalesReturn2 = data => fetch("/cws/order/fastSalesReturn.do", data, 'POST');

export const importPurchaseReauireOrder = data => fetch("/cws/purchaseRequire/importPurchaseReauireOrder.do", data, 'POST');


export const queryFirstMenu = data => fetch("/ums/api/getAllAuthes.do", data, 'POST');

export const queryStockChangeRecord = data => fetch("/stock/api/queryStockChangeRecord.do", data, 'POST');


export const queryChildMenu = data => fetch("/ums/api/getAuthesByParent.do", data, 'GET');

export const deleteMenu = data => fetch("/ums/api/delAuth.do", data, 'GET');

export const queryPlatformInfo = data => fetch("/ums/api/getPlatformInfo.do", data, 'GET');

export const queryStockChanged = data => fetch("/stock/api/queryStockChanged", data, 'GET');

export const savePlatformInfo = data => fetch("/ums/api/savePlatformInfo.do", data, 'POST');

export const queryBulletinInfo = data => fetch("/ums/api/findAllBulltinInfo.do", data, 'POST');

export const publishBulletin = data => fetch("/ums/api/publishBulltin.do", data, 'GET');

export const queryBulletinDetail = data => fetch("/ums/api/findBulletinById.do", data, 'GET');

export const deleteBulletin = data => fetch("/ums/api/delBulltin.do", data, 'GET');

export const batchDeleteBulletin = data => fetch("/ums/api/batchDelBulltin.do", data, 'POST');

export const queryApplications = data => fetch("/ums/api/queryAllApplication.do", data, 'GET');

export const updateBulletinInfo = data => fetch("/ums/api/saveOrUpdateBulltin.do", data, 'POST');

export const queryPrimaryMenu = data => fetch("/ums/api/findPrimaryMenu.do", data, 'GET');

export const addNemMenuInfo = data => fetch("/ums/api/saveOrUpdate.do", data, 'POST');

export const queryLogDetail = data => fetch("/ums/api/queryLogDetail.do", data, 'POST');

export const queryULogs = data => fetch("/ums/api/queryLog.do", data, 'POST');

export const queryCLogs = data => fetch("/cws/api/queryLog.do", data, 'POST');

export const queryModules = data => fetch("/ums/api/queryModules.do", data, 'GET');

export const queryCompInfoByIds = data => fetch("/ums/api/findCompInfoBatch.do", data, 'POST');

export const selectSessionByParams = data => fetch("/ims/sessionApi/selectSessionByParams.do", data, 'POST');

export const loadStockOrder = data => fetch("/stock/api/loadStockOrder.do", data, 'GET');

export const querySupplier = data => fetch("/stock/api/querySupplier", data, 'POST');

export const saveSupplier = data => fetch("/stock/api/saveSupplier", data, 'POST');

export const batchdeleteSupplier = data => fetch("/stock/api/batchdeleteSupplier", data, 'GET');

export const createSupplier = data => fetch("/stock/api/createSupplier", data, 'POST');
export const queryStockOrderForAllocation = data => fetch("/stock/api/queryStockOrderForAllocation", data, 'GET');

export const queryStockOrderDetail = data => fetch("/stock/api/queryStockOrderDetail", data, 'GET');


export const queryAllStockOrderForAllocation = data => fetch("/stock/api/queryAllStockOrderForAllocation", data, 'POST');

export const queryStockOrderDetailInfo = data => fetch("/stock/api/queryStockOrderDetailInfo", data, 'GET');

export const queryStockOrderForPurchase = data => fetch("/stock/api/queryStockOrderForPurchase", data, 'GET');

export const findSupplierList = data => fetch("/stock/api/findSupplierList", data, 'POST');

export const loadDebtsBusiness = data => fetch("/stock/api/loadDebtsBusiness", data, 'GET');


export const queryAllWarehouseInfo = data => fetch("/stock/api/queryAllWarehouseInfo", data, 'POST');

export const getDebtInfo = data => fetch("/stock/api/getDebtInfo", data, 'GET');

export const queryAllStockDetailInfo = data => fetch("/stock/api/queryAllStockDetailInfo", data, 'GET');

export const queryCheckDiffInfo = data => fetch("/stock/api/queryCheckDiffInfo", data, 'POST');

export const queryCheckDiffDetailInfo = data => fetch("/stock/api/queryCheckDiffDetailInfo", data, 'GET');

export const queryStockTakingInfo = data => fetch("/stock/api/queryStockTakingInfo", data, 'POST');

export const queryStockTakingDetails = data => fetch("/stock/api/queryStockTakingDetails", data, 'GET');


export const statisticsPurchaseInfo = data => fetch("/cws/order/statisticsPurchaseInfo.do", data, 'POST');

export const queryStockChecked = data => fetch("/stock/api/queryStockChecked", data, 'GET');


export const queryBulletin = data => fetch("/ums/api/queryBulletin.do", data, 'GET');

export const querySettlementDay = data => fetch("/stock/api/querySettlementDay.do", data, 'POST');

export const delSettlementDay = data => fetch("/stock/api/delSettlementDay.do", data, 'GET');

export const saveSettlementDay = data => fetch("/stock/api/saveSettlementDay.do", data, 'POST');


export const queryContactsInfo = data => fetch("/ims/contactsApi/queryContacts.do", data, 'GET');

export const saveWarehouseWithSeatNames = data => fetch("/stock/api/saveWarehouseWithSeatNames.do", data, 'POST');

export const auditStockOrder = data => fetch("/stock/api/auditStockOrder.do", data, 'GET');



export const saveStockOrder = data => fetch("/stock/api/saveStockOrder.do", data, 'POST');

export const queryProductStock = data => fetch("/stock/api/queryProductStock.do", data, 'GET');

export const queryWarehouseName = data => fetch("/stock/api/queryWarehouseName.do", data, 'GET');

export const createStall = data => fetch("/cws/stall/createStall.do", data, 'POST');
export const saveStall = data => fetch("/cws/stall/saveStall.do", data, 'POST');
export const queryStall = data => fetch("/cws/stall/queryStall.do", data, 'POST');
export const queryStalls = data => fetch("/cws/stall/queryStalls.do", data, 'POST');

export const validateStallCode = data => fetch("/cws/stall/validateStallCode.do", data, 'POST');

export const getProductVariantByProductCodeAndStall = data => fetch("/stock/api/getProductVariantByProductCodeAndStall.do", data, 'GET');


export const queryOrderPackedList = data => fetch("cws/packageList/queryOrderPackedList.do", data, 'GET');


export const initStocksByVariants = data => fetch("/stock/api/initStocksByVariants.do", data, 'POST');

export const queryNewestOrderLog = data => fetch("/cws/order/queryNewestOrderLog.do", data, 'GET');

export const signOrder = data => fetch("/cws/order/signForOrder.do", data, 'GET');

export const querySalesOrderDetail = data => fetch("/cws/order/querySalesOrderManageDetail.do", data, 'GET');

export const confirmSalesReturnInfo = data => fetch("/cws/order/confirmSalesReturn.do", data, 'POST');

export const confirmWholeReturnOrder = data => fetch("/cws/order/confirmedOrder.do", data, 'GET');

export const createOffLineFinanceRecord = data => fetch("/wallet/api/createOffLineFinanceRecord.do", data, 'POST');


export const getWarehouseNameData = data => fetch("/stock/api/getWarehouseNameData.do", data, 'GET');

// export const savePurchaseInfo = data => fetch("/cws/purchaseRequire/addPurchaseByHand.do", data, 'POST');

export const getByParams = data => fetch("/stock/api/getByParams.do", data, 'GET');

export const getProductCodeConfig = data => fetch("/stock/api/getProductCodeConfig.do", data, 'GET');

export const queryPurchaseOrderDetail = data => fetch("/cws/order/querySalesOrderDetail.do", data, 'GET');

export const queryOrderLog = data => fetch("/cws/orderLog/queryOrderLog.do", data, 'GET');

export const getColorSizeByParams = data => fetch("/stock/api/getColorSizeByParams.do", data, 'GET');

export const queryNDistributeOrderDetail = data => fetch("/cws/order/queryNDistributionDetail.do", data, 'GET');

export const queryProductCatalog = data => fetch("/stock/api/queryProductCatalog.do", data, 'POST');

export const savePackage = data => fetch("/cws/package/savePackage.do", data, 'POST');

export const addProductCatalog = data => fetch("/stock/api/addProductCatalog.do", data, 'POST');

export const batchDeleteProductCatalog = data => fetch("/stock/api/batchDeleteProductCatalog.do", data, 'POST');

export const batchUpdateProductCatalog = data => fetch("/stock/api/batchUpdateProductCatalog.do", data, 'POST');

// export const queryPackageInfo = data => fetch("/cws/packageList/queryPackageListByOrder.do", data, 'GET');

export const deletePackageAndPackedProduct = data => fetch("/cws/package/clearPackageInfoAndDelInfo.do", data, 'GET');

export const moveOutPackage = data => fetch("/cws/package/moveOutOfPackage.do", data, 'POST');

export const endOfPacked = data => fetch("/cws/package/endOfPackagePacked.do", data, 'GET');

export const getWxQRcode = data => fetch("/wallet/api/getWxQRcode", data, 'GET');

export const modifyPackageNum = data => fetch("/cws/packageList/editPackageListInfo.do", data, 'GET');

export const notifyPackedFinished = data => fetch("/cws/order/remindTakePackage.do", data, 'POST');

export const salesReturnByHand = data => fetch("/cws/order/salesReturnByHand.do", data, 'POST');

export const addStallCustomer = data => fetch("/cws/stall/addStallCustomer.do", data, 'POST');

//档口同步卖家客户
export const asyncStallCustomer = data => fetch("/cws/stall/asyncStallCustomer.do", data, 'POST');

export const batchDeleteStallCustomer = data => fetch("/cws/stall/batchDeleteStallCustomer.do", data, 'POST');

export const updateStallCustomer = data => fetch("/cws/stall/updateStallCustomer.do", data, 'POST');

export const queryStallCustomer = data => fetch("/cws/stall/queryStallCustomer.do", data, 'POST');

export const batchImportStallCustomer = data => fetch("/cws/stall/batchImportStallCustomer.do", data, 'POST');

export const querySalesReturnOrderListPC = data => fetch('/cws/order/querySalesReturnOrderListPC.do', data, 'POST');

export const batchDeleteOrderDetail = data => fetch('/cws/order/batchDeleteOrderDetail.do', data, 'POST');

export const queryStcok = data => fetch("/stock/api/queryStcok.do", data, 'POST');

export const batchUpdateSafeStockNum = data => fetch("/stock/api/batchUpdateSafeStockNum.do", data, 'GET');

export const queryLastCheckedDiff = data => fetch("/stock/api/queryLastCheckedDiff.do", data, 'GET');

export const updateStockWareHouseSeatInfo = data => fetch("/stock/api/updateStockWareHouseSeatInfo.do", data, 'GET');

export const salesReturnListEnter = data => fetch("/cws/order/salesReturnListEnter.do", data, 'POST');

export const getProductDetailByProductId = data => fetch("/stock/api/getProductDetailByProductId.do", data, 'GET');


export const getStallByCompanyId = data => fetch("/cws/stall/getStallByCompanyId.do", data, 'GET');


/*-------------------------卖家商品管理接口 start-------------------------*/

export const querySellerProduct = data => fetch("/cws/api/querySellerProduct.do", data, 'POST');

export const updateSellerProduct = data => fetch("/cws/api/updateSellerProduct.do", data, 'POST');

export const createSellerProduct = data => fetch("/cws/api/createSellerProduct.do", data, 'POST');

export const batchCreateSellerProduct = data => fetch("/cws/api/batchCreateSellerProduct.do", data, 'POST');

export const batchDeleteSellerProduct = data => fetch("/cws/api/batchDeleteSellerProduct.do", data, 'POST');

export const querySellerProductsByRelationId = data => fetch("/cws/api/querySellerProductsByRelationId.do", data, 'GET');

export const setSellerProductRelation = data => fetch("/cws/api/setSellerProductRelation.do", data, 'POST');

export const batchImportSellerProduct = data => fetch("/cws/api/batchImportSellerProduct.do", data, 'POST');

export const loadSellerProductInfo = data => fetch("/cws/api/loadSellerProductInfo.do", data, 'GET');

/*-------------------------卖家商品管理接口 end-------------------------*/

/*-------------------------档口商品管理接口 start-------------------------*/

export const queryProduct = data => fetch("/stock/api/queryProduct.do", data, 'POST');

export const addProduct = data => fetch("/stock/api/addProduct.do", data, 'POST');

export const updateProduct = data => fetch("/stock/api/updateProduct.do", data, 'POST');

export const batchDeleteProduct = data => fetch("/stock/api/batchDeleteProduct.do", data, 'POST');

export const changeProductSaleStatus = data => fetch("/stock/api/changeProductSaleStatus.do", data, 'POST');

export const batchinitProductSupplier = data => fetch("/stock/api/batchinitProductSupplier.do", data, 'POST');

export const addProductPriceConfig = data => fetch("/stock/api/addProductPriceConfig.do", data, 'POST');

export const loadProductInfo = data => fetch("/stock/api/loadProductInfo.do", data, 'GET');

export const queryProductUrl = data => fetch("/stock/api/queryProductUrl.do", data, 'POST');

export const batchImportProduct = data => fetch("/stock/api/batchImportProduct.do", data, 'POST');

export const checkImportProduct = data => fetch("/stock/api/checkImportProduct.do", data, 'POST');

export const checkImportStockTransProduct = data => fetch("/stock/api/checkImportStockTransProduct.do", data, 'POST');

/*-------------------------档口商品管理接口 end-------------------------*/

/*-------------------------虚拟档口管理接口 start-------------------------*/

export const createVmStall = data => fetch("/cws/api/createVmStall.do", data, 'POST');

export const queryVmStall = data => fetch("/cws/api/queryVmStall.do", data, 'POST');

export const queryVmStallExact = data => fetch("/cws/api/queryVmStallExact.do", data, 'POST');

export const batchDeleteVmStall = data => fetch("/cws/api/batchDeleteVmStall.do", data, 'POST');

export const updateVmStall = data => fetch("/cws/api/updateVmStall.do", data, 'POST');

export const batchImportVmStall = data => fetch("/cws/api/batchImportVmStall.do", data, 'POST');

/*-------------------------档口采购退货接口 end-------------------------*/

export const queryWarehouseSeatForStall = data => fetch("/stock/api/queryWarehouseSeatForStall.do", data, 'GET');

//删除采购需求
export const deletePurchaseRequire = data => fetch("/cws/purchaseRequire/deletePurchaseRequire.do", data, 'GET');
//根据采购需求id查询采购需求
export const getPurchaseRequire = data => fetch("/cws/purchaseRequire/getPurchaseRequire.do", data, 'GET');

//生成结算单
export const saveSettlementOrder = data => fetch("/stock/api/saveSettlementOrder.do", data, 'POST');

//修改采购需求
export const saveOrUpdatePurchaseRequire = data => fetch("/cws/purchaseRequire/saveOrUpdate.do", data, 'POST');
//创建退货需求
export const createReturnRequire = data => fetch("/cws/returnRequire/createReturnRequire.do", data, 'POST');
//获取退货需求详细
export const queryReturnRequire = data => fetch("/cws/returnRequire/queryReturnRequire.do", data, 'POST');
//文档导入退货清单
export const batchImportReturnRequire = data => fetch("/cws/returnRequire/batchImportReturnRequire.do", data, 'POST');
//获取退货需求
export const getReturnRequire = data => fetch("/cws/returnRequire/getReturnRequire.do", data, 'GET');
//根据退货需求生成退货订单
export const createByReturnRequire = data => fetch("/cws/order/createByReturnRequire.do", data, 'POST');
//删除退货需求
export const deleteReturnRequire = data => fetch("/cws/returnRequire/deleteReturnRequire.do", data, 'GET');

//查询结算单
export const querySettlementOrder = data => fetch("/stock/api/querySettlementOrder", data, 'POST');

//删除库存订单
export const delStockOrder = data => fetch("/stock/api/delStockOrder.do", data, 'GET');

//包裹状态更新-拿货
export const updatePackgeStatus = data => fetch("/cws/package/updatePackgeStatus.do", data, 'POST');
//提货码
export const loadByPickupCode = data => fetch("/cws/package/loadByPickupCode.do", data, 'GET');
//
export const sendRemind = data => fetch("/cws/order/sendRemind.do", data, 'POST');
//查询包裹详情
export const loadPackage = data => fetch("/cws/package/loadPackage.do", data, 'GET')
    //结算单确认
export const confirmSettlementOrder = data => fetch("/stock/api/confirmSettlementOrder", data, 'GET')
    //加载结算单信息
export const getSettlementOrder = data => fetch("/stock/api/getSettlementOrder", data, 'GET')
    //在线转账
export const walletFeeforward = data => fetch("/wallet/api/walletFeeforward", data, 'POST')
    //快速出货，退货
export const createReturnOrSalesOrder = data => fetch("/cws/orderDetail/createReturnOrSalesOrder.do", data, 'POST')
    //修改结算单
export const payForSettlementOrder = data => fetch("/stock/api/payForSettlementOrder.do", data, 'POST')

//查询库存订单
export const queryStockOrder = data => fetch("/stock/api/queryStockOrder.do", data, 'POST')

export const queryUser = data => fetch("/ums/api/queryUser.do", data, 'POST')

//取消订单
export const cancelOrder = data => fetch("/cws/order/cancelOrder.do", data, 'GET')
    //获取结算单
export const getSettlement = data => fetch("/stock/api/getSettlement", data, 'GET')
    //查询包裹详情
export const loadPackageInfo = data => fetch("/cws/package/loadPackageInfo.do", data, 'GET')
    //确认订单
export const auditOrder = data => fetch("/cws/order/auditOrder.do", data, 'POST')

//根据结算单id查询订单
export const queryOrderBySettlementOrder = data => fetch("/stock/api/queryOrderBySettlementOrder", data, 'GET')

//查询旺掌柜同步订单信息
export const querySjzxWebCompany = data => fetch("/cws/webStore/querySjzxWebCompany.do", data, 'GET')

export const getSyncTime = data => fetch("/cws/webStoreOrder/getSyncTime.do", data, 'POST')

//查询订单结算记录
export const querySettlementDetail = data => fetch("/stock/api/querySettlementDetail", data, 'POST')

//查询通知消息
export const queryWorkMessage = data => fetch("/ims/workMessageApi/queryWorkMessage.do", data, 'POST')

//查询通知消息数量
export const getWorkMessageCount = data => fetch("/ims/workMessageApi/getWorkMessageCount.do", data, 'POST')

//标记通知消息为已读
export const readWorkMessage = data => fetch("/ims/workMessageApi/readWorkMessage.do", data, 'POST')

//删通知消息
export const delWorkMessage = data => fetch("/ims/workMessageApi/delWorkMessage.do", data, 'POST')

//查询消息会话信息
export const querySession = data => fetch("/ims/sessionApi/querySession.do", data, 'POST')

//删除消息会话
export const delSession = data => fetch("/ims/sessionApi/delSession.do", data, 'POST')

//查询聊天消息分页列表
export const queryClientMessage = data => fetch("/ims/clientMessageApi/queryClientMessage.do", data, 'POST')



//根据商品分类查询商品信息
export const getProductByCatalog = data => fetch("/stock/api/getProductByCatalog.do", data, 'POST')
    //删除订单
export const deleteOrder = data => fetch("/cws/order/deleteOrder.do", data, 'GET')

//同步网店订单
export const syncWebStoreOrder = data => fetch("/cws/webStoreOrder/syncWebStoreOrder.do", data, 'POST')

/*-------------------------SKU 配置接口 start-------------------------*/

export const addSkuConfig = data => fetch("/stock/api/addSkuConfig.do", data, 'POST');

export const querySkuConfig = data => fetch("/stock/api/querySkuConfig.do", data, 'POST');

export const batchDeleteSkuConfig = data => fetch("/stock/api/batchDeleteSkuConfig.do", data, 'POST');

/*-------------------------SKU 配置 接口 end-------------------------*/
//同步商品
export const syncWebStoreProduct = data => fetch("/cws/webStore/syncWebStoreProduct.do", data, 'POST')


//校验手机验证码
export const checkMobileCodeUnLogin = data => fetch("/ums/api/checkMobileCodeUnLogin.do", data, 'GET')

//查询热卖商品
export const queryHotProduct = data => fetch("/cws/productHot/findProductHot.do", data, "POST")

//创建热卖商品
export const createHotProduct = data => fetch("/cws/productHot/saveProductHot.do", data, "POST");

/*-------------------------邀请码接口 start-------------------------*/

export const createInvitationCode = data => fetch("/ums/api/createInvitationCode.do", data, 'POST');

export const queryInvitation = data => fetch("/ums/api/queryInvitation.do", data, 'GET');

export const updateInvitation = data => fetch("/ums/api/updateInvitation.do", data, 'GET');

/*-------------------------邀请码接口 end-------------------------*/
//验证盘点商品信息
export const validationVarantInfo = data => fetch("/stock/api/validationVarantInfo.do", data, 'POST')



/*-------------------------商品货号规则接口 start-------------------------*/

export const addProductCodeConfig = data => fetch("/stock/api/addProductCodeConfig.do", data, 'POST');

export const queryProductCodeConfig = data => fetch("/stock/api/queryProductCodeConfig.do", data, 'POST');

/*-------------------------商品货号规则接口 end-------------------------*/

//查询配置文件
export const getPackageFlowConfig = data => fetch("/cws/package/getPackageFlowConfig.do", data, 'GET');
//保存配置文件
export const savePackageFlowConfig = data => fetch("/cws/package/savePackageFlowConfig.do", data, 'POST');

/*--------------------------卖家档口设置送货地址-------------------------*/
export const saveOrUpdateAddressInfo = data => fetch("/cws/deliveryAddress/saveOrUpdate.do", data, 'POST');
export const queryDeliveryAddress = data => fetch("/cws/deliveryAddress/queryDeliveryAddress.do", data, 'POST');
export const delAddress = data => fetch("/cws/deliveryAddress/batchDelete.do", data, 'POST');
export const saveReciveMethodSetting = data => fetch("/cws/package/saveReciveMethodSetting.do",data,'POST');
export const queryReciveMethodSetting = data => fetch("/cws/package/queryReciveMethodSetting.do",data,'POST');
export const deleteAddressInfo = data => fetch("/cws/package/delReciveMethodSetting.do",data,"GET");

//批量创建空包裹
export const batchCreateSelerPackage = data => fetch("/cws/package/batchCreateSelerPackage.do", data, 'POST');
//根据档口id查询二维码
export const getStallCardUrl = data => fetch("/cws/stall/getStallCardUrl.do", data, 'GET');

/*-------------------------公司车辆接口 start-------------------------*/

export const createCompanyCars = data => fetch("/cws/api/createCompanyCars.do", data, 'POST');

export const batchUpdateCompanyCarsValidStatus = data => fetch("/cws/api/batchUpdateCompanyCarsValidStatus.do", data, 'POST');

export const updateCompanyCars = data => fetch("/cws/api/updateCompanyCars.do", data, 'POST');

export const queryCompanyCars = data => fetch("/cws/api/queryCompanyCars.do", data, 'POST');

/*-------------------------公司车辆接口 end-------------------------*/

/*-------------------------公司车辆运输明细表接口 start-------------------------*/

export const createTransportDetail = data => fetch("/cws/api/createTransportDetail.do", data, 'POST');

export const updateTransportDetail = data => fetch("/cws/api/updateTransportDetail.do", data, 'POST');

export const queryTransportDetail = data => fetch("/cws/api/queryTransportDetail.do", data, 'POST');

/*-------------------------公司车辆运输明细表接口 end-------------------------*/

/*-------------------------应用升级包管理接口 start-------------------------*/

export const saveApplicationPackage = data => fetch("/ums/api/saveApplicationPackage.do", data, 'POST');

export const queryApplicationPackage = data => fetch("/ums/api/queryApplicationPackage.do", data, 'POST');

export const batchDeleteApplicationPackage = data => fetch("/ums/api/batchDeleteApplicationPackage.do", data, 'POST');

/*-------------------------应用升级包管理接口 end-------------------------*/

export const statisticsOrderDetail = data => fetch("/cws/orderDetail/statisticsOrderDetail.do", data, 'POST');

export const statisticsOrderSalesCount = data => fetch("/cws/orderDetail/statisticsOrderSalesCount.do", data, 'POST');


/*-------------------------档口推广标签接口 start-------------------------*/

export const querySpreadLabel = data => fetch("/stock/api/querySpreadLabel.do", data, 'POST');

export const batchDeleteSpreadLabel = data => fetch("/stock/api/batchDeleteSpreadLabel.do", data, 'POST');

export const addSpreadLabel = data => fetch("/stock/api/addSpreadLabel.do", data, 'POST');

export const updateSpreadLabel = data => fetch("/stock/api/updateSpreadLabel.do", data, 'POST');

export const querySpreadLabelProduct = data => fetch("/stock/api/querySpreadLabelProduct.do", data, 'POST');

/*-------------------------档口推广标签接口 end-------------------------*/