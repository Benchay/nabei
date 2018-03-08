import {getLodop}   from '../Lodop/LodopFuncs.js'
import {formatDate} from '../utils/date.js'


 //SET_PRINT_STYLE:设置纯文本打印项风格,格式：SET_PRINT_STYLE(strStyleName,varStyleValue)。
        //strStyleName：打印风格名，设定纯文本风格名称及其含义如下：|varStyleValue：打印风格值，相关值如下：
        //“FontName”： 字体名称。|值： 字符型，与操作系统字体名一致，缺省是“宋体”。
        //“FontSize”： 字体大小。|值：数值型，单位是pt，缺省值是9，可以含小数，如13.5。
        //“FontColor”： 字体颜色。|值：整数或字符型，如同CSS的color。
        //“Bold”： 是否粗体。|值：数字型，1代表粗体，0代表非粗体，缺省值是0。
        //“Italic”： 是否斜体。|值：数字型，1代表斜体，0代表非斜体，缺省值是0。
        //“Underline”： 是否下滑线。|值：数字型，1代表有下划线，0代表无下划线，缺省值是0。
        //“Alignment”： 内容左右靠齐方式。|值：数字型，1--左靠齐 2--居中 3--右靠齐，缺省值是1。
        //“Angle”： 旋转角度。|值：数字型，逆时针旋转角度数，单位是度，0度表示不旋转

function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) {
     var c = str.charCodeAt(i);
    //单字节加1
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
       len++;
     }
     else {
      len+=2;
     }
    }
    return len;
}
export  function printOrderInfo(orderInfo,orderDetail,stall){
    var lodopResult = getLodop();
    if(lodopResult.code == 0){
        return lodopResult;
    }
    var typeStr = '';
	var qrpress='';
	var buyid='0';
	if(orderInfo.orderId!=null && orderInfo.orderId!=''){
		buyid=orderInfo.orderId;
	}
    if(orderInfo.orderType == 2){
        typeStr = "出货单号：";
		qrpress="hmj_order_purchase" +buyid +","+orderInfo.id ;
    }else if(orderInfo.orderType == 4){
        typeStr = "退货单号：";
		qrpress="hmj_stall_order_return_purchase"+buyid +","+orderInfo.id ;
    }else if(orderInfo.orderType == 1){
		qrpress="hmj_stall_order_shop"+orderInfo.id +","+buyid;
	}else if(orderInfo.orderType == 3){
		qrpress="hmj_stall_order_return_shop"+orderInfo.id +","+buyid;
	}
	var busiCompName=orderInfo.busiCompanyName;
	if(orderInfo.busiCompId==null || orderInfo.busiCompId==''){
		if(busiCompName=='' || busiCompName==null){
			busiCompName='匿名卖家';
		}
	}
    LODOP = lodopResult.lodop;
    var nsize=orderDetail.length;
	var alength=1860 + nsize *20;
    LODOP.PRINT_INIT("打印预览");
	LODOP.SET_PRINT_PAGESIZE (0,850, alength,0);
    LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR",true);
    LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
    //LODOP.ADD_PRINT_TABLE(199,29,300,800,"\r\n<table>\r\n" + tr + "</table>");
    // LODOP.ADD_PRINT_TEXT(22,80,162,26,orderInfo.companyName);
    LODOP.ADD_PRINT_TEXT(22,80,162,26,stall.name);
    LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT(55,33,69,20,"档口编码：");
    LODOP.ADD_PRINT_TEXT(79,33,55,20,"客户：");
    LODOP.ADD_PRINT_TEXT(102,33,74,20,typeStr);
    LODOP.ADD_PRINT_TEXT(55,90,189,20,stall.serialNub);
    LODOP.ADD_PRINT_TEXT(79,90,206,20,busiCompName);
    LODOP.ADD_PRINT_TEXT(102,90,188,20,orderInfo.orderCode);
    LODOP.ADD_PRINT_TEXT(127,31,267,20,"*******************************************");
    LODOP.ADD_PRINT_TEXT(174,30,271,20,"===========================================");
    LODOP.ADD_PRINT_TEXT(149,32,79,20,"商品货号");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT(149,111,59,20,"单价");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT(149,171,49,20,"数量");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT(149,222,75,20,"金额");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    //
	var moveth=230;
    var i=0;
    orderDetail.forEach((obj)=>{
        var moveH=i*20;
		var vshow=(i+1)+"."+obj.productCode + "("+obj.color+";" +obj.size+")";
		if(strlen(vshow)<22){
			LODOP.ADD_PRINT_TEXT(190 + moveH,32,300,20,vshow);
			LODOP.ADD_PRINT_TEXT(190 + moveH,145,100,20,obj.unitPrice );
			LODOP.ADD_PRINT_TEXT(190 + moveH,175,50,20,"X" );
			LODOP.ADD_PRINT_TEXT(190 + moveH,210,100,20,obj.orderNum );
			LODOP.ADD_PRINT_TEXT(190 + moveH,240,150,20,obj.totalFee.toFixed(2) );
		}else{
			LODOP.ADD_PRINT_TEXT(190 + moveH,32,300,20,vshow);
			LODOP.ADD_PRINT_TEXT(210 + moveH,130,120,20,obj.unitPrice );
			LODOP.ADD_PRINT_TEXT(210 + moveH,170,100,20,"X" );
			LODOP.ADD_PRINT_TEXT(210 + moveH,200,120,20,obj.orderNum );
			LODOP.ADD_PRINT_TEXT(210 + moveH,235,150,20,obj.totalFee.toFixed(2) );
			i++;
		}
        i++;
    });
	moveth=(i*20);
    //LODOP.ADD_PRINT_TEXT(320,33,277,20,"============================================");
	LODOP.ADD_PRINT_TEXT(230 + moveth,33,277,20,"============================================");
    LODOP.ADD_PRINT_TEXT(250 + moveth,35,64,20,"总数量：");
    LODOP.ADD_PRINT_TEXT(250 + moveth,181,59,20,"总金额：");
    LODOP.ADD_PRINT_TEXT(250 + moveth,98,58,20,orderInfo.totalNum);
    LODOP.ADD_PRINT_TEXT(250 + moveth,242,70,20,orderInfo.totalFee.toFixed(2));
    LODOP.ADD_PRINT_TEXT(273 + moveth,31,282,20,"*********************************************");
    LODOP.ADD_PRINT_TEXT(296 + moveth,32,70,20,"打印时间：");
    LODOP.ADD_PRINT_TEXT(316 + moveth,32,70,20,"联系电话：");
    LODOP.ADD_PRINT_TEXT(337 + moveth,32,70,20,"档口地址：");
    //LODOP.ADD_PRINT_TEXT(296 + moveth,89,223,20,formatDate(orderInfo.createTime,'yyyy-MM-dd hh:mm:ss'));
	LODOP.ADD_PRINT_TEXT(296 + moveth,89,223,20,formatDate(Date.parse(new Date()),'yyyy-MM-dd hh:mm:ss'));
    LODOP.ADD_PRINT_TEXT(316 + moveth,89,211,20,stall.linkTel);
    LODOP.ADD_PRINT_TEXT(337 + moveth,89,205,20,stall.location+'/'+stall.betterAddress);
	if(strlen(stall.location)>32 && strlen(stall.location)< 64){
		moveth+=15;
	}else if(strlen(stall.location)>64){
		moveth+=35;
	}
    LODOP.ADD_PRINT_TEXT(361 + moveth,30,284,20,"*********************************************");
    LODOP.ADD_PRINT_TEXT(378 + moveth,87,161,20,"扫一扫二维码查看订单详情");
    LODOP.ADD_PRINT_TEXT(532 + moveth,86,169,20,"欢迎您光临！请保留好小票！");
    //LODOP.ADD_PRINT_BARCODE(398 + moveth,88,150,131,"QRCode",qrpress);//打印二维码
	LODOP.ADD_PRINT_BARCODE(398 + moveth,88,150,131,"QRCode",qrpress);//打印二维码
    LODOP.ADD_PRINT_TEXT(551 + moveth,117,100,20,"谢谢您的惠顾！");
    //LODOP.ADD_PRINT_RECT(7,7,331,681,0,1);
    LODOP.PREVIEW();
}

export  function printReturnOrder(orderInfoVO,orderDetailVO){
    var lodopResult = getLodop();
    if(lodopResult.code == 0){
        return lodopResult;
    }
	console.log(orderDetailVO);
	var busiCompName='';
	if(orderInfoVO.busiCompId==null || orderInfoVO.busiCompId==''){
		if(busiCompName=='' || busiCompName==null){
			busiCompName='匿名卖家';
		}
	}else{
		busiCompName=orderInfoVO.busiName;
	}
	var details=orderDetailVO[0].details;
    LODOP = lodopResult.lodop;
	LODOP.PRINT_INIT("打印预览");
	LODOP.SET_PRINT_PAGESIZE (0,'2400', '1600',0);
	LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR",true);
	LODOP.ADD_PRINT_RECT(120,2,780,420,0,1);
	LODOP.ADD_PRINT_BARCODE(14,19,90,90,"QRCode","hmj_stall_order_return_shop");
	LODOP.ADD_PRINT_TEXT(20,309,123,49,"退货清单");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.ADD_PRINT_TEXT(35,520,70,20,"退货单号:");
	LODOP.ADD_PRINT_TEXT(35,520,170,20,orderInfoVO.orderCode);

	LODOP.SET_PRINT_STYLEA(0,"Horient",1);
	LODOP.ADD_PRINT_TEXT(90,23,71,22,"公司名称：");
	LODOP.ADD_PRINT_TEXT(90,80,138,22,busiCompName);
	LODOP.ADD_PRINT_TEXT(90,305,72,25,"供货档口：");
	LODOP.ADD_PRINT_TEXT(90,379,100,22,"DK001_002");
	LODOP.ADD_PRINT_TEXT(93,572,75,20,"打印日期：");
	LODOP.ADD_PRINT_TEXT(93,635,140,20,formatDate(Date.parse(new Date()),'yyyy-MM-dd hh:mm:ss'));
	//LODOP.ADD_PRINT_LINE(120,2,540,2,0,1); //左竖线
	LODOP.ADD_PRINT_LINE(156,5,156,760,0,1);
	var nV=0;
	var totalAllocateProductNum=0;
	for(var i=0;i<details.length;i++){
		var moveH=i*20;
		var moveV=nV*20;
		var oobj=details[i];
		totalAllocateProductNum+=oobj.allocateProductNum;
		if(i<=6){//左列
			LODOP.ADD_PRINT_TEXT(166 + moveV,10,100,20,oobj.productCode);
			LODOP.ADD_PRINT_TEXT(166 + moveV,155,80,20,oobj.orderNum);
			nV++;
		}else{//右列
			nV=0;
			LODOP.ADD_PRINT_TEXT(166 + moveV,10,100,20,oobj.productCode);
			LODOP.ADD_PRINT_TEXT(166 + moveV,155,80,20,oobj.orderNum);
			nV++;
		}
	};

	LODOP.ADD_PRINT_LINE(183,5,183,781,0,1);
	LODOP.ADD_PRINT_LINE(217,5,217,777,0,1);
	LODOP.ADD_PRINT_LINE(250,5,250,778,0,1);
	LODOP.ADD_PRINT_LINE(285,5,285,779,0,1);
	LODOP.ADD_PRINT_LINE(317,5,317,774,0,1);
	LODOP.ADD_PRINT_LINE(350,5,350,774,0,1);
	LODOP.ADD_PRINT_LINE(389,5,389,774,0,1);

	LODOP.ADD_PRINT_LINE(387,150,120,150,0,1);
	LODOP.ADD_PRINT_LINE(429,390,121,390,0,1);
	LODOP.ADD_PRINT_LINE(430,231,120,231,0,1);
	LODOP.ADD_PRINT_TEXT(128,38,101,25,"货号");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.ADD_PRINT_TEXT(130,163,62,25,"退货数量");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.ADD_PRINT_TEXT(127,274,62,25,"备注");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.ADD_PRINT_LINE(431,5,432,779,0,1);
	LODOP.ADD_PRINT_TEXT(402,127,79,20,"总数量：" + totalAllocateProductNum);
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.ADD_PRINT_LINE(387,510,120,511,0,1);
	LODOP.ADD_PRINT_LINE(428,601,118,602,0,1);
	LODOP.ADD_PRINT_TEXT(128,397,101,25,"货号");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.ADD_PRINT_TEXT(127,529,62,25,"退货数量");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.ADD_PRINT_TEXT(127,649,62,25,"备注");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.ADD_PRINT_TEXT(402,505,79,20,"总包数：");
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.ADD_PRINT_TEXT(437,25,100,20,"注意事项：");
	LODOP.ADD_PRINT_TEXT(545,22,102,25,"清点人：");
	LODOP.ADD_PRINT_TEXT(544,299,102,25,"采购人：");
	LODOP.ADD_PRINT_TEXT(547,594,102,25,"档口确认人：");
	LODOP.PREVIEW();
}

export function printPackage(packinfo, width, height, packName){
	var lodopResult = getLodop();
 	if(lodopResult.code == 0){
		return lodopResult;
	}
 	LODOP = lodopResult.lodop;
	LODOP.PRINT_INIT('打印测试');
	LODOP.SET_PRINT_PAGESIZE(0, width, height,0);
	LODOP.SET_PRINT_STYLE("FontSize", 16);
	// var operator=userinfo;
	for(var i=0;i<packinfo.length;i++){
		LODOP.NEWPAGE();
		LODOP.ADD_PRINT_BARCODE(15, 15, 150, 150,"QRCode","hmj_p_info" +packinfo[i]);
		LODOP.ADD_PRINT_TEXT(30,135,500,20,packName);
        // LODOP.ADD_PRINT_TEXT(50,155,140,20,"创建人:"+operator);
	};
	LODOP.PREVIEW();
	//LODOP.PRINT();
}



