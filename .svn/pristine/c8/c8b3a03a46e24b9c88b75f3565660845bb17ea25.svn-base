export function formatDate(date, fmt) {
	if(date == null) {
		return "";
	}
	if(typeof(date) == "number"){
		date = new Date(date);
	}
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
/*
*  timeZone: 'Thu May 12 2017 08:00:00 GMT+0800 (中国标准时间)'
*/
export function timeZoneCovert(timeZone){
	var d = new Date(timeZone);  
	var month=(d.getMonth() + 1);
	var sm=month;
	if(month <10){
		sm='0' + sm;
	}
	var day=d.getDate();
	var sday=day;
	if(day <10){
		sday='0' + day;
	}
	var time=d.getFullYear() + '-' + sm + '-' + sday + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
	return time;
};
/*
* 转换日期
* 开始时间默认：00:00:00
* 结束时间默认：23:59:59
*/
export function timeZoneCovertDay(timeZone,start){
	var d = new Date(timeZone);  
	var month=(d.getMonth() + 1);
	var sm=month;
	if(month <10){
		sm='0' + sm;
	}
	var day=d.getDate();
	var sday=day;
	if(day <10){
		sday='0' + day;
	}
	var time='';
	if(start){
		time='00:00:00';
	}else{
		time='23:59:59';
	}
	var time=d.getFullYear() + '-' + sm + '-' + sday + ' ' + time; 
	return time;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}