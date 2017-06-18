$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});

jQuery.support.cors = true;

$(function () {
	inputHover();

	login();


});

function inputHover(){
	$(".name input").focus(function () {
		$(".focus").removeClass("focus");
		$(".name").addClass("focus");
	});

	$(".password input").focus(function () {
		$(".focus").removeClass("focus");
		$(".password").addClass("focus");
	});
}

function login() {
	$("#login").click(function () {
		var username = $("#username").val();
		var password_hash = $("#password_hash").val();
		$.ajax({
             url: "http://server.shaonvonly.com/api/login",
             type:"POST",
             data: {
                 username : username,
                 password_hash: password_hash,
             },
             success: function(resp){
             	if (resp.message=='success') {
             		swal({
                        title:'登录成功！',
                        type: 'success',
                        timer:2000,
                        background:'#fff',
                        confirmButtonColor: '#fc8c9c',
                    });
             		setTimeout("window.location = 'index.html'",2000); 
             	}
             	else if (resp.message=='参数不合法') {
                    swal({
                        text:'输入不正确，请重新输入!',
                        title:'登录失败',
                        type: 'warning',
                        timer:2000,
                        background:'#fff',
                        confirmButtonColor: '#fc8c9c',
                    });
             	}
             	else if (resp.message=='密码错误') {
                    swal({
                        text:'密码错误!',
                        title:'登录失败',
                        type: 'error',
                        timer:2000,
                        background:'#fff',
                        confirmButtonColor: '#fc8c9c',
                    });
             	}
             	else if (resp.message=='用户名不存在') {
             		swal({
                        text:'用户名不存在!',
                        title:'登录失败',
                        type: 'warning',
                        timer:2000,
                        background:'#fff',
                        confirmButtonColor: '#fc8c9c',
                    });
             	}
             },
         });
	}); 

	
}


