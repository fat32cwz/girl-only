$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});



$(function () {

	loadGoodsInfo(1);

});

function loadGoodsInfo(pages_now){
	$("tbody").html('');                  //清屏
	sessionStorage.pages_now = pages_now;
	var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[0]+"/home";
	$.ajax({
		url: url,
    type:"GET",
    beforeSend:function () {
      $("tbody").append('<tr><td colspan="2">加载中，请稍等...</td></tr>');
    },        	
    success:function (resp) {
      if (resp.message=="success") {
        try{
         	  showdata = 8;                                       //每页显示条数
     			  data_total = resp.data.goods_statistics.length;		                //总数据条数
  				  pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
  				  startRange = (pages_now-1)*showdata;
  				  endRange = (pages_now==pages_total?data_total:pages_now*showdata);
  				  console.log(data_total,pages_total,startRange,endRange);
            $("tbody").empty();
            for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
              name = resp.data.goods_statistics[j].name;
              id = resp.data.goods_statistics[j].id;
              order_goods_sum = resp.data.goods_statistics[j].order_goods_sum;
       				createGoodsRow(name,id,order_goods_sum);     					//生成商品表格行
       				createPagination(pages_now,pages_total);          			 	//分页
     			  }
        }catch(error){
          $("tbody").append('<tr><td colspan="2">暂无记录！</td></tr>');
          $(".pagination").html('<ul class="pagination pagination"></ul>');
        }
      }else{
        swal({
          title:"表格数据请求失败！",
          text:resp.message,
          type:"error"
        });
        $("tbody").empty();
        $("tbody").append('<tr><td colspan="2">暂无记录！</td></tr>');
        $(".pagination").html('<ul class="pagination pagination"></ul>');
      }
    },
});
	
	
}

function createGoodsRow(a,b,c) {
	$("tbody").append('<tr>'+
                        '<td>'+
                            '<span class="goods-id">'+a+'</span>'+
                            '<span class="goods-no">商品编号：'+b+'</span>'+
                        '</td>'+
                        '<td>'+c+'</td>'+
                    '</tr>');
}


function createPagination(pages_now,pages_total) {                     //新建分页导航
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
    	loadGoodsInfo(target);
    });

    $(".pagination .prev").click(function () {               //上一页跳转
    	prevPage = sessionStorage.pages_now-1;
    	loadGoodsInfo(prevPage);
    })

    $(".pagination .next").click(function () {               //下一页跳转
    	nextPage = parseInt(sessionStorage.pages_now)+1;      //注意加法会变成字符串拼接！！！！！
    	loadGoodsInfo(nextPage);
    })

    $(".jump-btn").click(function () {                     //指定页码跳转
		mytarget = $(".jump-ipt").val();
		if(mytarget){
			loadGoodsInfo(mytarget);
    	}	
		
	});

}

