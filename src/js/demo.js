$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});


$(function () {
	sessionRead();

	loadSellerInfo();


});
	
function logout() {
	swal({
		title: '你确定要退出登录吗？',
		text: "操作提示",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '确定退出',
		cancelButtonText: '取消'
	}).then(function(isConfirm){
		if(isConfirm){
			$.ajax({
			    url: "http://server.shaonvonly.com/api/logout",
			    type:"POST",
			    success: function(){
			     	window.location.href = "welcome.html";
			    },
			});
		}
	});
}



function sessionRead() {
	if(sessionStorage.user_id == "undefined"){
		window.location.href = "welcome.html";
	}
	else{
		return false;
	}
}

function loadSellerInfo() {
    var url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[0];
    $.ajax({
         url:url,
         type:"GET",
         success:function (resp) {
           if (resp.message=="success") {
              seller_nickname = resp.data.seller_nickname;
              seller_avatar = resp.data.seller_avatar;
              auth_alipay_account = resp.data.auth_alipay_account;
              if (!seller_nickname=="") {
	              $(".info1").text(seller_nickname);
	          }
              if (!auth_alipay_account=="") {
	              $(".info2").text(auth_alipay_account);
	          }
	          if(seller_avatar==null||seller_avatar==""){
	          	$(".avatar").prop("src","images/avatar-default.jpg");
	          }else{
	          	$(".avatar").prop("src","http://server.shaonvonly.com/"+seller_avatar);
	          }
              
           }else{
              /*swal({
                 title:"个人信息加载失败！",
                 text:"提示",
                 type:"warning"
              });*/
           }
         }

    });
}


