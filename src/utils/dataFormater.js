 import {formatDate} from '../utils/date.js'

export function bindingAccFormat(data) {
    if (data == undefined||data=='') {
        return "";
    }
    if(data =='3'){
        return '支付宝';
    }else if(data=='4'){
        return '微信'
    }else if(data=='5'){
        return '银行卡'
    }

};

export function stutasFormat(row, column) {
    let data = row[column.property];
    if (data == undefined||data=='') {
        return "";
    }
    if(data =='1'){
        return '待审核';
    }else if(data=='2'){
        return '审核中'
    }else if(data=='3'){
        return '已完成'
    }else if(data == '4'){
        return '审核失败';
    }else if(data == '8'){
        return '已付款';
    }

};

//数据格式化
export function accountFormat(row, column) {
    // 01 余额 02 支付宝 03 微信 04 银行卡 05 其他
    let data = row[column.property];
    if (data == undefined||data=='') {
        return "";
    }
    if(data =='1'){
        return '账户余额';
    }else if(data=='2'){
        return '金币'
    }else if(data=='3'){
        return '支付宝'
    }else if(data=='4'){
        return '微信'
    }else if(data=='5'){
        return '银行卡'
    }

};
//数据格式化
export function  flowTypeFormat(row, column) {
    let data = row[column.property];
    console.log(data)
    if (data == undefined||data=='') {
        return "";
    }
    if(data =='1'){
        return '充值';
    }else if(data=='2'){
        return '提现'
    }else if(data=='3'){
        return '转账'
    }else{
        return '其他'
    }

};

//时间格式化
export function  mydateFormat(row, column) {
    let time = row[column.property];
    if (time == undefined||time=='') {
        return "";
    }
    let date = new Date(time);
    return formatDate(date,'yyyy-MM-dd hh:mm');
};

//时间格式化
export function  mydateFormat2(row, column) {
    let time = row[column.property];
    if (time == undefined||time=='') {
        return "";
    }
    let date = new Date(time);
    return formatDate(date,'MM-dd hh:mm');
};

//库存订单格式化
export function  stockOrderTypeFormat(row, column) {
    let data = row[column.property];
    if (data == undefined||data=='') {
        return "";
    }
    if(data =='0'){
        return '采购入库单';
    }else if(data=='1'){
        return '销售出库单'
    }else if(data=='2'){
        return '调拨入库单'
    }else if(data=='3'){
        return '调拨出库单'
    }else if(data=='4') {
        return '盘点单'
    }else if(data=='5'){
        return '盘点单'
    }else if(data=='6'){
        return '销售退货单'
    }else if(data=='7') {
        return '采购退货单'
    }else if(data=='8') {
        return '销售取消单'
    }else{
        return '其他'
    }
};


export function  getStockOrderType(data) {
    if(data =='0'){
        return '采购入库单';
    }else if(data=='1'){
        return '销售出库单'
    }else if(data=='2'){
        return '调拨入库单'
    }else if(data=='3'){
        return '调拨出库单'
    }else if(data=='4') {
        return '盘盈入库单"'
    }else if(data=='5'){
        return '盘亏出库单'
    }else if(data=='6'){
        return '销售退货单'
    }else if(data=='7') {
        return '采购退货单'
    }else if(data=='8') {
        return '销售取消单'
    }else{
        return '其他'
    }
};
