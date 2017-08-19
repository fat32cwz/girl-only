$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});


$(function () {
	tips();


	getCode();


	changePassword();
});

function getCode() {
	$("#getCode").click(function () {
		username = $("#username").val();
		url = "http://server.shaonvonly.com/api/users/sms_code_sending/username";
		$.ajax({
			type:"POST",
			url:url,
			data:{
				username:username
			},
			success:function (resp) {
				if (resp.message=="success") {
					swal({
						title:"验证码已发送到您的手机，请注意查看",
						text:"提示",
						type:"info"
					});
				}else{
					swal({
						title:"验证码发送失败！",
						text:resp.message,
						type:"error"
					});
				}
			}
		});
	});
}

function tips() {
	swal({
		title:"操作提示",
		text:"请填写好您的账号名，我们会将验证码发到您的账号名所绑定的手机号中，请注意查看",
		type:"info"
	});
}

function changePassword() {
	$("#change").click(function () {
		sn1 = $("#sn1").val();
		sn2 = $("#sn2").val();
		code = $("#code").val();
		username = $("#username").val();
		if(sn1!=sn2){
			swal({
				title:"两次输入的密码不相同！",
				text:"提示",
				type:"warning"
			});
			return;
		}
		url = "http://server.shaonvonly.com/api/users/reset_password";
		
		$.ajax({
			type:"POST",
			url:url,
			data:{
				code: code,
				password_hash: sn1,
				username:username
			},
			success:function (resp) {
				if (resp.message=="success") {
					swal({
						title:"密码重置成功",
						text:"操作提示",
						type:"success"
					});
				}else{
					swal({
						title:"密码重置失败",
						text:"操作提示",
						type:"error"
					});
				}
			}
		});
	});
}