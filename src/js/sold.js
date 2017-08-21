$(function () {

	showRecentGoods(1);     //近三个月订单加载

	tabChange();

	allSelect();

	batchDeliver();                 //批量发货功能

});


function tabChange() {									//筛选标签切换
	$(".nav-pills li a").click(function () {
		$(".nav-pills li .screening-active").removeClass("screening-active");
		$(this).addClass("screening-active");
		var tab = $(this).attr("data-tab");
		console.log(tab);
		switch(tab){
    		case "1":
    			showRecentGoods(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "2":
    			showPayNowGoods(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "3":
    			showPayDepositGoods(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "4":
    			showPayFinalGoods(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "5":
    			showWaitingGoods(1);
    			$("#plfh").prop("disabled","");
    			break;
    		case "6":
    			showDeliveredGoods(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "7":
    			showRefundingGoods(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "8":
    			showSuccessGoods(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "9":
    			showClosedGoods(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "10":
    			showThreeMonthsAgoOrders(1);
    			$("#plfh").prop("disabled","disabled");
    			break; 
    		default:
    			showRecentGoods(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    	}
	});


}





function showRecentGoods(pages_now) {              //近三个月订单加载
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); 
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		from: threeMonthBefore,
	       		to: nowDate
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},   	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="1"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "1";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="1"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}

function showPayNowGoods(pages_now) {                    //等待买家付现货款
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); 
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"1",
	       		from: threeMonthBefore,
	       		to: nowDate
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},     	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="2"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "2";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="2"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}


function showPayDepositGoods(pages_now) {             //等待买家付定金
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); get3MonthBefor();
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"2",
	       		from: threeMonthBefore,
	       		to: nowDate
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},     	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="3"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "3";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="3"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}


function showPayFinalGoods(pages_now) {            //等待买家付尾款
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); 
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"4",
	       		from: threeMonthBefore,
	       		to: nowDate
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},     	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="4"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "4";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="4"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}

function showWaitingGoods(pages_now) {                 //等待发货
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); 
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"5",
	       		from: threeMonthBefore,
	       		to: nowDate
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},     	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="5"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "5";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="5"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}


function showDeliveredGoods(pages_now) {               //商家已发货
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); 
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"6",
	       		from: threeMonthBefore,
	       		to: nowDate
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},     	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="6"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "6";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="6"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}

function showRefundingGoods(pages_now) {                //退货中
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); 
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"8",
	       		from: threeMonthBefore,
	       		to: nowDate
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},     	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="7"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "7";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="7"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}


function showSuccessGoods(pages_now) {                //交易成功
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); 
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"7",
	       		from: threeMonthBefore,
	       		to: nowDate
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},     	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="8"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "8";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="8"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}

function showClosedGoods(pages_now) {             //关闭的订单
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); 
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"10",
	       		from: threeMonthBefore,
	       		to: nowDate
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},     	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="9"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "9";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="9"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}


function showThreeMonthsAgoOrders(pages_now) {                  //	三个月前订单
	$("tbody").html('');
	//$("#pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	if (sessionStorage.authedshops_id) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/orders";
		nowDate = getNowMonth();
		threeMonthBefore = get3MonthBefor(); 
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		to: threeMonthBefore
	       	},
	       	beforeSend:function () {
	       		$("tbody").append('<tr><td colspan="8">加载中，请稍等...</td></tr>');
	       	},     	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			try{
		       			showdata = 12;                                       //每页显示条数
	       				data_total = resp.data.length;		                //总数据条数
						pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
						startRange = (pages_now-1)*showdata;
						endRange = (pages_now==pages_total?data_total:pages_now*showdata);
						console.log(data_total,pages_total,startRange,endRange);
						if($(".screening-active").attr("data-tab")=="10"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
		       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
		       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
		       				customer_nickname = resp.data[j].customer_nickname;                                       //买家
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);                                 //交易状态
		       				actual_payment = resp.data[j].actual_payment;			//实收款
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();					 		          //订单生成时间
		       				order_id = resp.data[j].order_no;                        //订单编号
		       				tab = "10";
		       				//console.log(goods_id,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at);
		       				if($(".screening-active").attr("data-tab")=="10"){
			       				createGoodsRow(goods_name,goods_price,order_goods_count,customer_nickname,status,actual_payment,created_at,order_id);     //生成商品出售行
			       				createPagination(pages_now,pages_total,tab);           //分页
		       				}
		       			}
	       			}catch(error){
	       				$("tbody").append('<tr><td colspan="8">暂无记录！</td></tr>');
	       				$("#pagination").html('<ul class="pagination pagination"></ul>');
	       			}
	       		}
	       	}
		});
	}
	
}


function statusNumToStatus(statusNum) {
	switch(statusNum){
		case 1:
			status = "等待买家付现货款";
			break;
		case 2:
			status = "等待买家付定金";
			break;
		case 3:
			status = "等待商家开尾款";
			break;
		case 4:
			status = "等待买家付尾款";
			break;
		case 5:
			status = "等待商家发货";
			break;
		case 6:
			status = "商家已发货";
			break;
		case 7:
			status = "交易成功";
			break;
		case 8:
			status = "退货中";
			break;
		case 9:
			status = "已退货";
			break;
		case 10:
			status = "订单取消";
			break;
		case 11:
			status = "订单删除";
			break;		
		case 12:
			status = "发货中";
			break;									
	}
	return status;
}


function createGoodsRow(a,b,c,d,e,f,g,h) {
	$("tbody").append('<tr>'+
                        '<td><input type="checkbox"></td>'+
                        '<td>'+a+'</td>'+
                        '<td>'+b+'</td>'+
                        '<td>'+c+'</td>'+
                        '<td>'+d+'</td>'+
                        '<td>'+e+'</td>'+
                        '<td>'+f+'</td>'+
                        '<td>'+g+'</td>'+
                        '<td class="hidden">'+h+'</td>'+
                    '</tr>');
}


function createPagination(pages_now,pages_total,tab) {                     //新建分页导航
	$("#pagination").html('<ul class="pagination pagination"></ul>');
     $(".pagination.pagination").pagination({
     	pageCount: pages_total,
     	current: pages_now,
     	jump:true,
     	coping:true,
     	homePage:'首页',
	    endPage:'末页',
	    prevContent:'上一页',
	    nextContent:'下一页', 
	    isHide:true
     });
    $(".pagination a[data-page]").click(function(){                       //页码跳转
    	target = $(this).attr("data-page");
    	switch(tab){
    		case '1':
    			showRecentGoods(target);
    			break;
    		case '2':
    			showPayNowGoods(target);
    			break;
    		case '3':
    			showPayDepositGoods(target);
    			break;
    		case '4':
    			showPayFinalGoods(target);
    			break;
    		case '5':
    			showWaitingGoods(target);
    			break;
    		case '6':
    			showDeliveredGoods(target);
    			break;
    		case '7':
    			showRefundingGoods(target);
    			break;
    		case '8':
    			showSuccessGoods(target);
    			break;
    		case '9':
    			showClosedGoods(target);
    			break;
    		case '10':
    			showThreeMonthsAgoOrders(target);
    			break;
    	}
    });

    $(".pagination .prev").click(function () {               //上一页跳转
    	prevPage = sessionStorage.pages_now-1;
    	switch(tab){
    		case '1':
    			showRecentGoods(prevPage);
    			break;
    		case '2':
    			showPayNowGoods(prevPage);
    			break;
    		case '3':
    			showPayDepositGoods(prevPage);
    			break;
    		case '4':
    			showPayFinalGoods(prevPage);
    			break;
    		case '5':
    			showWaitingGoods(prevPage);
    			break;
    		case '6':
    			showDeliveredGoods(prevPage);
    			break;
    		case '7':
    			showRefundingGoods(prevPage);
    			break;
    		case '8':
    			showSuccessGoods(prevPage);
    			break;
    		case '9':
    			showClosedGoods(prevPage);
    			break;
    		case '10':
    			showThreeMonthsAgoOrders(prevPage);
    			break;
    	}
    })

    $(".pagination .next").click(function () {               //下一页跳转
    	nextPage = parseInt(sessionStorage.pages_now)+1;      //注意加法会变成字符串拼接！！！！！
    	switch(tab){
    		case '1':
    			showRecentGoods(nextPage);
    			break;
    		case '2':
    			showPayNowGoods(nextPage);
    			break;
    		case '3':
    			showPayDepositGoods(nextPage);
    			break;
    		case '4':
    			showPayFinalGoods(nextPage);
    			break;
    		case '5':
    			showWaitingGoods(nextPage);
    			break;
    		case '6':
    			showDeliveredGoods(nextPage);
    			break;
    		case '7':
    			showRefundingGoods(nextPage);
    			break;
    		case '8':
    			showSuccessGoods(nextPage);
    			break;
    		case '9':
    			showClosedGoods(nextPage);
    			break;
    		case '10':
    			showThreeMonthsAgoOrders(nextPage);
    			break;
    	}
    })

    $(".jump-btn").click(function () {                     //指定页码跳转
		mytarget = $(".jump-ipt").val();
		if(mytarget){
			switch(tab){
    		case '1':
    			showRecentGoods(mytarget);
    			break;
    		case '2':
    			showPayNowGoods(mytarget);
    			break;
    		case '3':
    			showPayDepositGoods(mytarget);
    			break;
    		case '4':
    			showPayFinalGoods(mytarget);
    			break;
    		case '5':
    			showWaitingGoods(mytarget);
    			break;
    		case '6':
    			showDeliveredGoods(mytarget);
    			break;
    		case '7':
    			showRefundingGoods(mytarget);
    			break;
    		case '8':
    			showSuccessGoods(mytarget);
    			break;
    		case '9':
    			showClosedGoods(mytarget);
    			break;
    		case '10':
    			showThreeMonthsAgoOrders(mytarget);
    			break;
    	}
    	}	
		
	});

}


function get3MonthBefor(){                           //获取前两个月时间
    var resultDate,year,month;
    var currDate = new Date();
    year = currDate.getFullYear();
    month = currDate.getMonth()+1;
    switch(month)
    {
      case 1:
      case 2:
      case 3:
        month += 10;
        year--;
        break;
      default:
        month -= 2;
        break;
    }
    month = (month < 10) ? ('0' + month) : month;
    middleDate = year + '-'+month+'-01';
    var resultDate = new Date(middleDate).toISOString();
  	return resultDate;
}

function getNowMonth(){                               //获取当前月的下一月
	var resultDate,year,month;
	var currDate = new Date();
	year = currDate.getFullYear();
    month = currDate.getMonth()+2;
    month = (month < 10) ? ('0' + month) : month;
    middleDate = year + '-'+month+'-01';
    currDate.setMonth()
    var resultDate = new Date(middleDate).toISOString();
  	return resultDate;
}

function allSelect(){
	$("#allSelect label input").change(function () {
		state = $("#allSelect label input").prop("checked");
		if(state==true){
			$("tbody input").prop("checked","checked");
		}
		else if(state==false){
			$("tbody input").prop("checked","");
		}

	});
}


function batchDeliver() {                                 //批量发货
	$("#plfh").click(function () {
		var checkedArray = $("td input:checked");
		Array.from(checkedArray);
		for (var i = 0; i < checkedArray.length; i++) {
			order_id = $(checkedArray[i]).parent().parent().find(".hidden").text();
			name = $(checkedArray[i]).parent().next().next().next().next().next().text();
			console.log(order_id,name);
			$.ajax({
				url: "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[0]+"/orders/"+order_id+"/delivery",
				type:"PATCH",
				data:{
					name: name,
					delivery_no: order_id
				},
				success:function (resp) {
					if (resp.message=="success") {
						alert('发货成功');
					}
					else{
						alert("订单"+order_id+"发货失败！");
					}
				}
			});
		}


	});
}