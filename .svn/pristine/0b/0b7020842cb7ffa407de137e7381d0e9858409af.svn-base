/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = 'history';
let baseImgPath = 'http://cws.nabei.net:26880/';

if (process.env.NODE_ENV == 'development') {
    //baseUrl = 'http://localhost:8080';
}else{
//	baseUrl = 'http://192.168.0.123:8080';
//	baseUrl = 'http://192.168.0.216:8099';
	baseUrl = 'http://cws.nabei.net:8106';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}
