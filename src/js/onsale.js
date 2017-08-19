$(function(){

	showOnsaleGoods(1);     //现货出售商品展示


	tabChange();

	
});


function tabChange() {
	/*$("#onsale").click(function () {
		$(".nav-tabs li .active").removeClass("active");
		$(this).addClass("active");

		showOnsaleGoods(1);

	});*/
	$("#onsale").bind({
		click:function () {
			$(".nav-tabs li .active").removeClass("active");
			$(this).addClass("active");

			showOnsaleGoods(1);
		}
	});


	/*$("#reserving").click(function () {
		$(".nav-tabs li .active").removeClass("active");
		$(this).addClass("active");

		showReservingGoods(1);
	});*/
	$("#reserving").bind({
		click:function () {
			$(".nav-tabs li .active").removeClass("active");
			$(this).addClass("active");

			showReservingGoods(1);
		}
	});

	/*$("#final").click(function () {
		$(".nav-tabs li .active").removeClass("active");
		$(this).addClass("active");

		showFinalGoods(1);
	});*/
	$("#final").bind({
		click:function () {
			$(".nav-tabs li .active").removeClass("active");
			$(this).addClass("active");

			showFinalGoods(1);
		}
	});

	
}


function showOnsaleGoods(pages_now) {
	$("#goods-container").html('<div class="row no-margin" id="goods-container"></div>');
	$(".text-center").html('<ul class="pagination pagination"></ul>');                     //清屏
	sessionStorage.pages_now = pages_now;
		var url = "https://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/goods";
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"onsale"
	       	},   	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			showdata = 6;                                       //每页显示条数
       				data_total = resp.data.length;		                //总数据条数
					pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
					startRange = (pages_now-1)*showdata;
					endRange = (pages_now==pages_total?data_total:pages_now*showdata);
					console.log(data_total,pages_total,startRange,endRange);
					if($(".active").attr("data-tab")=="1"){
			       			$("#goods-container").empty();
		       		}
	       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
	       				goods_id = resp.data[j].id;
	       				shop_id =resp.data[j].shop_id;
	       				name = resp.data[j].name;
	       				price = resp.data[j].price;
	       				ska = resp.data[j].ska;
	       				order_goods_sum = resp.data[j].order_goods_sum;
	       				goods_pic_default_pic_url = resp.data[j].goods_pic_default_pic_url;
	       				status = "O";
	       				if($(".active").attr("data-tab")=="1"){
		       				createShopsCard(goods_id,shop_id,name,price,order_goods_sum,ska,status,goods_pic_default_pic_url);     //生成商品卡片
		       				createPagination(pages_now,pages_total,status);           //分页
	       				}
	       			}
	       		}
	       	}
		});

	
}

function showReservingGoods(pages_now) {
	$("#goods-container").html('<div class="row no-margin" id="goods-container"></div>');  
	$(".text-center").html('<ul class="pagination pagination"></ul>');                       //清屏
	sessionStorage.pages_now = pages_now;
	for (var i = 0; i < sessionStorage.authedshops_id.length; i++) {
		var url = "https://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[i]+"/goods";
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"reserving"
	       	},   	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			showdata = 6;                                       //每页显示条数
       				data_total = resp.data.length;		                //总数据条数
					pages_total = parseInt(data_total/6)+(data_total % 6 == 0 ? 0:1);    //总页数
					startRange = (pages_now-1)*showdata; 
					endRange = (pages_now==pages_total?data_total:pages_now*showdata);
					console.log(data_total,pages_total,startRange,endRange);
					if($(".active").attr("data-tab")=="2"){
			       		$("#goods-container").empty();
		       		}
	       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
	       				goods_id = resp.data[j].id;
	       				shop_id =resp.data[j].shop_id;
	       				name = resp.data[j].name;
	       				price = resp.data[j].price;
	       				ska = resp.data[j].ska;
	       				order_goods_sum = resp.data[j].order_goods_sum;
	       				goods_pic_default_pic_url = resp.data[j].goods_pic_default_pic_url;
	       				status = "R";
	       				var date = new Date(resp.data[j].status_end_at);
		       			status_end_at = ISOtoDate(date);	           //结束时间
	       				if($(".active").attr("data-tab")=="2"){
		       				createShopsCard(goods_id,shop_id,name,price,order_goods_sum,ska,status,goods_pic_default_pic_url,status_end_at);     //生成商品卡片
		       				createPagination(pages_now,pages_total,status);           //分页
	       				}
	       			}
	       		}
	       	}
		});
	}
}


function showFinalGoods(pages_now) {
	$("#goods-container").html('<div class="row no-margin" id="goods-container"></div>');  
	$(".text-center").html('<ul class="pagination pagination"></ul>');                       //清屏
	sessionStorage.pages_now = pages_now;
	for (var i = 0; i < sessionStorage.authedshops_id.length; i++) {
		var url = "https://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[i]+"/goods";
		$.ajax({
			url: url,
	       	type:"GET",   
	       	data:{
	       		status:"final"
	       	},   	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			showdata = 6;                                       //每页显示条数
       				data_total = resp.data.length;		                //总数据条数
					pages_total = parseInt(data_total/6)+(data_total % 6 == 0 ? 0:1);    //总页数
					startRange = (pages_now-1)*showdata; 
					endRange = (pages_now==pages_total?data_total:pages_now*showdata);
					console.log(data_total,pages_total,startRange,endRange);
					if($(".active").attr("data-tab")=="3"){
			       		$("#goods-container").empty();
		       		}
	       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
	       				goods_id = resp.data[j].id;
	       				shop_id =resp.data[j].shop_id;
	       				name = resp.data[j].name;
	       				price = resp.data[j].price;
	       				ska = resp.data[j].ska;
	       				order_goods_sum = resp.data[j].order_goods_sum;
	       				goods_pic_default_pic_url = resp.data[j].goods_pic_default_pic_url;
	       				var date = new Date(resp.data[j].status_end_at);
		       			status_end_at = date.toLocaleString();	                              //结束时间
	       				status = "F";
	       				if($(".active").attr("data-tab")=="3"){
		       				createShopsCard(goods_id,shop_id,name,price,order_goods_sum,ska,status,goods_pic_default_pic_url,status_end_at);     //生成商品卡片
		       				createPagination(pages_now,pages_total,status);           //分页
	       				}
	       			}
	       		}
	       	}
		});
	}
	
}




function createShopsCard(i,si,n,p,o,s,status,url,end) {                          //生成商品卡片
	if(status=="O"){
		$("#goods-container").append('<div class="goods"> '+
	    ' <img src="https://server.shaonvonly.com/'+url+'" alt="图片无法访问" class="goods-img">'+
	    '<div class="goods-info">'+
	    	'<div class="goods-id hidden">'+i+'</div>'+
	    	'<div class="shop-id hidden">'+si+'</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">名&#x3000称</span>'+
	            '<span class="goods-info-data">'+n+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">价&#x3000格</span>'+
	            '<span class="goods-info-data">'+p+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">销&#x3000量</span>'+
	            '<span class="goods-info-data">'+o+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">库&#x3000存</span>'+
	            '<span class="goods-info-data">'+s+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item" id="button-group">'+
	            '<button class="btn  btn-default gbwk" type="button" id="gbwk" disabled>关闭定金</button>'+
	            '<button class="btn  btn-default xj" type="button" id="xj">下架商品</button>'+
	        '</div>'+
	    '</div>'+
	  '</div>');
		
	}
	else if(status == "R"){
		$("#goods-container").append('<div class="goods"> '+
	    ' <img src="https://server.shaonvonly.com/'+url+'" alt="图片无法访问" class="goods-img">'+
	    '<div class="goods-info">'+
	    	'<div class="goods-id hidden">'+i+'</div>'+
	    	'<div class="shop-id hidden">'+si+'</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">名&#x3000称</span>'+
	            '<span class="goods-info-data">'+n+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">价&#x3000格</span>'+
	            '<span class="goods-info-data">'+p+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">销&#x3000量</span>'+
	            '<span class="goods-info-data">'+o+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">库&#x3000存</span>'+
	            '<span class="goods-info-data">'+s+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item" id="button-group">'+
	            '<button class="btn  btn-default gbwk" type="button" id="gbwk">关闭定金</button>'+
	            '<button class="btn  btn-default xj" type="button" id="xj">下架商品</button>'+ 
	        '</div>'+
	    '</div>'+
	    '<a href="##" onclick="endTimeReset(this);"><div class="top_bar">结束时间：'+end+'</div></a>'+
	  '</div>');

	}
	else if(status=="F"){
		$("#goods-container").append('<div class="goods"> '+
	    ' <img src="https://server.shaonvonly.com/'+url+'" alt="图片无法访问" class="goods-img">'+
	    '<div class="goods-info">'+
	    	'<div class="goods-id hidden">'+i+'</div>'+
	    	'<div class="shop-id hidden">'+si+'</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">名&#x3000称</span>'+
	            '<span class="goods-info-data">'+n+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">价&#x3000格</span>'+
	            '<span class="goods-info-data">'+p+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">销&#x3000量</span>'+
	            '<span class="goods-info-data">'+o+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item">'+
	            '<span class="goods-info-title">库&#x3000存</span>'+
	            '<span class="goods-info-data">'+s+'</span>'+
	        '</div>'+
	        '<div class="goods-info-item" id="button-group">'+
	            '<button class="btn  btn-default kw" type="button" id="kw">开放尾款</button>'+
	            '<button class="btn  btn-default xj" type="button" id="xj">下架商品</button>'+ 
	        '</div>'+
	    '</div>'+
	    '<a href="##" onclick="endTimeReset(this);"><div class="top_bar">结束时间：'+end+'</div></a>'+
	  '</div>');
	}	
	adjustgoodsimg();     //商品图片宽高比例调整
	adjustgoodsinfo();	  //商品卡片信息容器调整

	reserved();            //关闭定金
	offsale();             //商品下架
	final();			   //开放尾款

	


}



function adjustgoodsimg() {                   //商品图片宽高比例调整
	var a=$('.goods-img').width();
	a=a/3*4;
	$('.goods-img').height(a);
}

function adjustgoodsinfo() {                  //商品卡片信息容器调整
	var a= $('.goods').width();
	a=a*0.59;
	var b= $('.goods').height();
	$('.goods-info').width(a);
	$('.goods-info').height(b);
}


function reserved() {                   //关闭定金
	$(".gbwk").click(function () {
		var user_id = sessionStorage.user_id;
		var id = $(this).parent().parent().find(".goods-id").text();
		var shop_id = $(this).parent().parent().find(".shop-id").text();
		var url = "https://server.shaonvonly.com/api/users/"+user_id+"/shops/"+shop_id+"/goods/"+id+"/reserved";
		swal({
			title: '你确定要关闭该商品的定金吗？',
			text: "操作提示!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '确定',
			cancelButtonText: '取消'
		}).then(function(isConfirm){
			if(isConfirm){
				$.ajax({
					url: url,
			       	type:"PATCH",   	
			       	success:function (resp) {
			       		if (resp.message=="success") {
			       			swal({
			       				title:'关闭成功!',
			       				text:'操作提示',
			       				type:'success'
			       			});
			       			$(".active").trigger("click");	
			       		}
			       		else{
			       			swal({
			       				title:'操作失败！',
			       				text: resp.message,
			       				type: 'error'
			       			});
			       		}
			       	}
				});	
			}
		});
	
	});
}

function offsale() {                   //商品下架
	$(".xj").click(function () {
		var user_id =sessionStorage.user_id;
		var id = $(this).parent().parent().find(".goods-id").text();
		var shop_id = $(this).parent().parent().find(".shop-id").text();
		var url = "https://server.shaonvonly.com/api/users/"+user_id+"/shops/"+shop_id+"/goods/"+id+"/offsale";
		swal({
			title: '你确定要下架该商品吗？',
			text: "操作提示!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '确定',
			cancelButtonText: '取消'
		}).then(function(isConfirm){
			if(isConfirm){
				$.ajax({
					url: url,
			       	type:"PATCH",   	
			       	success:function (resp) {
			       		if (resp.message=="success") {
			       			swal({
			       				title:'下架成功!',
			       				text:'操作提示',
			       				type:'success'
			       			});	
			       			$(".active").trigger("click");
			       		}
			       		else{
			       			swal({
			       				title:'操作失败！',
			       				text: resp.message,
			       				type: 'error'
			       			});
			       		}
			       	}
				});	
			}
		});
	});
}

function final() {
	$(".kw").click(function () {
		var user_id =sessionStorage.user_id;
		var id = $(this).parent().parent().find(".goods-id").text();
		var shop_id = $(this).parent().parent().find(".shop-id").text();
		var url = "https://server.shaonvonly.com/api/users/"+user_id+"/shops/"+shop_id+"/goods/"+id+"/final";
		swal({
			title: '你确定为该商品开尾款吗？',
			text: "操作提示!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '确定',
			cancelButtonText: '取消'
		}).then(function(isConfirm){
			if(isConfirm){
				$.ajax({
					url: url,
			       	type:"PATCH",   	
			       	success:function (resp) {
			       		if (resp.message=="success") {
			       			swal({
			       				title:'开尾款成功!',
			       				text:'操作提示',
			       				type:'success'
			       			});	
			       			$(".active").trigger("click");
			       		}
			       		else{
			       			swal({
			       				title:'操作失败！',
			       				text: resp.message,
			       				type: 'error'
			       			});
			       		}
			       	}
				});	
			}
		});
	});
}


function createPagination(pages_now,pages_total,status) {                     //新建分页导航
	$(".text-center").html('<ul class="pagination pagination"></ul>');
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
    $(".pagination a[data-page]").click(function(){          //页码跳转
    	target = $(this).attr("data-page");
    	if (status == "O") {
    		showOnsaleGoods(target);
    	}
    	else if (status == "R") {
    		showReservedGoods(target);
    	}
    	else if (status == "F") {
    		showFinalGoods(target);
    	}
    });

    $(".pagination .prev").click(function () {               //上一页跳转
    	prevPage = sessionStorage.pages_now-1;
    	if (status == "O") {
    		showOnsaleGoods(prevPage);
    	}
    	else if (status == "R") {
    		showReservingGoods(prevPage);
    	}
    	else if (status == "F") {
    		showFinalGoods(target);
    	}
    })

    $(".pagination .next").click(function () {               //下一页跳转
    	nextPage = parseInt(sessionStorage.pages_now)+1;      //注意加法会变成字符串拼接！！！！！
    	if (status == "O") {
    		showOnsaleGoods(nextPage);
    	}
    	else if (status == "R") {
    		showReservingGoods(nextPage);
    	}
    	else if (status == "F") {
    		showFinalGoods(target);
    	}
    })

    $(".jump-btn").click(function (){                     //指定页码跳转
		mytarget = $(".jump-ipt").val();
		if(mytarget){
			if (status == "O") {
	    		showOnsaleGoods(mytarget);
	    	}
	    	else if(status == "R") {
	    		showReservingGoods(mytarget);
	    	}
	    	else if (status == "F") {
    			showFinalGoods(target);
    		}
    	}	
		
	});

}

function endTimeReset(obj) {
	var user_id = sessionStorage.user_id;
	var shop_id = sessionStorage.authedshops_id[0];
	var goods_id = $(obj).parent().find(".goods-id").text();
	console.log(goods_id);
	var url = "https://server.shaonvonly.com/api/users/"+user_id+"/shops/"+shop_id+"/goods/"+goods_id+"/status_end_at";
	swal({
		title: '修改结束时间',
		text: '提示：请谨慎操作！',
		html: '<h4>提示：请谨慎操作！</h4>'+'<input class="endtimeinput" type="text" placeholder="点击选择时间">',
		showCancelButton: true,
		type:'warning',
		confirmButtonText: '确认',
  		cancelButtonText: '取消',
	}).then(function(isConfirm) {
		if (isConfirm) {
			endtime = $(".endtimeinput").val();
			result = new Date(endtime);
			status_end_at = result.toISOString();
			console.log(result,status_end_at);
			$.ajax({
				url: url,
		       	type:"PATCH",
		       	data:{
		       		status_end_at:status_end_at,
		       	}, 	
		       	success:function (resp) {
		       		if (resp.message=="success") {
		       			swal({
		       				title:'修改成功!',
		       				text:'操作提示',
		       				type:'success'
		       			});	
		       			$(".active").trigger("click");
		       		}
		       		else{
		       			swal({
		       				title:'修改失败！',
		       				text: resp.message,
		       				type: 'error'
		       			});
		       		}
		       	}
			});	
		}
	});
	$(".endtimeinput").datetimepicker({
		 format: "yyyy-mm-dd hh:ii",
		 language:'zh-CN',
		 pickerPosition:"bottom-right",
		 autoclose:true,
		 minTime:0
	});
}

function ISOtoDate(now) {
	var   year=now.getFullYear();     
	var   month=now.getMonth()+1;     
	var   date=now.getDate();     
	var   hour=now.getHours();     
	var   minute=now.getMinutes();     
	var   second=now.getSeconds();     
	return   year+"/"+month+"/"+date+"   "+hour+":"+minute+":"+second;   
}