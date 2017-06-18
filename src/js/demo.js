$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});


$(function () {
	

});

function logout() {
	swal({
		title: '你确定要退出登录吗？',
		text: "未保存的数据将会消失!",
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

/*	$.ajax({
	    url: "http://server.shaonvonly.com/api/logout",
	    type:"POST",
	    success: function(){
	     	window.location.href = "welcome.html";
	    },
	});*/
	
}