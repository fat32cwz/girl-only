$(function () {
	
	showWaitingOrders(1);           //等待发货订单显示

	tabChange();					//筛选标签切换

	allSelect();                    //全选

	batchDeliver();                 //批量发货功能


});


function tabChange() {									//筛选标签切换
	$(".nav-tabs li a").click(function () {
		$(".nav-tabs li .active").removeClass("active");
		$(this).addClass("active");
		var tab = $(this).attr("data-tab");
		switch(tab){
    		case "1":
    			showWaitingOrders(1);
    			$("#plfh").prop("disabled","");
    			break;
    		case "2":
    			showSendingOrders(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "3":
    			showDeliveredOrders(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "4":
    			showUnpaidOrders(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		case "5":
    			showCanceledOrders(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    		default:
    			showWaitingOrders(1);
    			$("#plfh").prop("disabled","disabled");
    			break;
    	}
	});


}




function showWaitingOrders(pages_now) {
	$("tbody").html('');
	//$(".pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	for (var i = 0; i < sessionStorage.authedshops_id.length; i++) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[i]+"/orders";
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"5"
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
						if($(".active").attr("data-tab")=="1"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();				//订单生成时间
		       				order_no = resp.data[j].order_no;               //订单编号
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);          //交易状态
		       				receiver = resp.data[j].address.receiver;		//收货人
		       				customer_nickname = resp.data[j].customer_nickname;                              //买家昵称
		       				choice = "快递";							//买家选择：快递？...
		       				remark = resp.data[j].remark; 					//备注
		       				tab = "1";
		       				if($(".active").attr("data-tab")=="1"){
			       				createOrderRows(order_no,created_at,status,receiver,customer_nickname,choice,remark);    //生成商品卡片
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


function showSendingOrders(pages_now) {                                        //发货中
	$("tbody").html('');
	//$(".pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	for (var i = 0; i < sessionStorage.authedshops_id.length; i++) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[i]+"/orders";
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"12"
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
						if($(".active").attr("data-tab")=="2"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();				//订单生成时间
		       				order_no = resp.data[j].order_no;               //订单编号
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);          //交易状态
		       				receiver = resp.data[j].address.receiver;		//收货人
		       				customer_nickname = resp.data[j].customer_nickname;                              //买家昵称
		       				choice = "快递";							//买家选择：快递？...
		       				remark = resp.data[j].remark; 					//备注
		       				tab = "2";
		       				if($(".active").attr("data-tab")=="2"){
			       				createOrderRows(order_no,created_at,status,receiver,customer_nickname,choice,remark);    //生成商品卡片
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


function showDeliveredOrders(pages_now) {                                        //已发货
	$("tbody").html('');
	//$(".pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	for (var i = 0; i < sessionStorage.authedshops_id.length; i++) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[i]+"/orders";
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"6"
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
						if($(".active").attr("data-tab")=="3"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();				//订单生成时间
		       				order_no = resp.data[j].order_no;               //订单编号
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);          //交易状态
		       				receiver = resp.data[j].address.receiver;		//收货人
		       				customer_nickname = resp.data[j].customer_nickname;                              //买家昵称
		       				choice = "快递";							//买家选择：快递？...
		       				remark = resp.data[j].remark; 					//备注
		       				tab = "3";
		       				if($(".active").attr("data-tab")=="3"){
			       				createOrderRows(order_no,created_at,status,receiver,customer_nickname,choice,remark);    //生成商品卡片
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




function showUnpaidOrders(pages_now) {                                    //未补款
	$("tbody").html('');
	//$(".pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	for (var i = 0; i < sessionStorage.authedshops_id.length; i++) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[i]+"/orders";
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"4"
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
						if($(".active").attr("data-tab")=="4"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();				//订单生成时间
		       				order_no = resp.data[j].order_no;               //订单编号
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);          //交易状态
		       				receiver = resp.data[j].address.receiver;		//收货人
		       				customer_nickname = resp.data[j].customer_nickname;                              //买家昵称
		       				choice = "快递";							//买家选择：快递？...
		       				remark = resp.data[j].remark; 					//备注
		       				tab = "4";
		       				if($(".active").attr("data-tab")=="4"){
			       				createOrderRows(order_no,created_at,status,receiver,customer_nickname,choice,remark);    //生成商品卡片
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


function showCanceledOrders(pages_now) {                                 //被取消订单      
	$("tbody").html('');
	//$(".pagination").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
	for (var i = 0; i < sessionStorage.authedshops_id.length; i++) {
		var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[i]+"/orders";
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"10"
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
						if($(".active").attr("data-tab")=="5"){
			       			$("tbody").empty();
		       			}
		       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
		       				var date = new Date(resp.data[j].created_at);
		       				created_at = date.toLocaleString();				//订单生成时间
		       				order_no = resp.data[j].order_no;               //订单编号
		       				statusNum = resp.data[j].status;										
	                        status = statusNumToStatus(statusNum);          //交易状态
		       				receiver = resp.data[j].address.receiver;		//收货人
		       				customer_nickname = resp.data[j].customer_nickname;                              //买家昵称
		       				choice = "快递";							//买家选择：快递？...
		       				remark = resp.data[j].remark; 					//备注
		       				tab = "5";
		       				if($(".active").attr("data-tab")=="5"){
			       				createOrderRows(order_no,created_at,status,receiver,customer_nickname,choice,remark);    //生成商品卡片
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




function createOrderRows(a,b,c,d,e,f,g) {                           //生成订单表格行
	$("tbody").append('<tr>'+
                        '<td><input type="checkbox"></td>'+
                        '<td>'+a+'</td>'+
                        '<td>'+b+'</td>'+
                        '<td>'+c+'</td>'+
                        '<td>'+d+'</td>'+
                        '<td>'+e+'</td>'+
                        '<td>'+f+'</td>'+
                        '<td>'+g+'</td>'+
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
    			showWaitingOrders(target);
    			break;
    		case '2':
    			showSendingOrders(target);
    			break;
    		case '3':
    			showDeliveredOrders(target);
    			break;
    		case '4':
    			showUnpaidOrders(target);
    			break;
    		case '5':
    			showCanceledOrders(target);
    			break;
    	}
    });

    $(".pagination .prev").click(function () {               //上一页跳转
    	prevPage = sessionStorage.pages_now-1;
    	switch(tab){
    		case '1':
    			showWaitingOrders(prevPage);
    			break;
    		case '2':
    			showSendingOrders(prevPage);
    			break;
    		case '3':
    			showDeliveredOrders(prevPage);
    			break;
    		case '4':
    			showUnpaidOrders(prevPage);
    			break;
    		case '5':
    			showCanceledOrders(prevPage);
    			break;
    	}
    })

    $(".pagination .next").click(function () {               //下一页跳转
    	nextPage = parseInt(sessionStorage.pages_now)+1;      //注意加法会变成字符串拼接！！！！！
    	switch(tab){
    		case '1':
    			showWaitingOrders(nextPage);
    			break;
    		case '2':
    			showSendingOrders(nextPage);
    			break;
    		case '3':
    			showDeliveredOrders(nextPage);
    			break;
    		case '4':
    			showUnpaidOrders(nextPage);
    			break;
    		case '5':
    			showCanceledOrders(nextPage);
    			break;
    	}
    })

    $(".jump-btn").click(function () {                     //指定页码跳转
		mytarget = $(".jump-ipt").val();
		if(mytarget){
			switch(tab){
	    		case '1':
	    			showWaitingOrders(mytarget);
	    			break;
	    		case '2':
	    			showSendingOrders(mytarget);
	    			break;
	    		case '3':
	    			showDeliveredOrders(mytarget);
	    			break;
	    		case '4':
	    			showUnpaidOrders(mytarget);
	    			break;
	    		case '5':
	    			showCanceledOrders(mytarget);
	    			break;
	    	}
    	}	
		
	});

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
			status = "等待商家开放付现货款";
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
		case 12:
			status = "发货中";
			break;									
	}
	return status;
}


function batchDeliver() {                                 //批量发货
	$("#plfh").click(function () {
		var checkedArray = $("td input:checked");
		Array.from(checkedArray);
		for (var i = 0; i < checkedArray.length; i++) {
			order_id = $(checkedArray[i]).parent().next().text();
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




