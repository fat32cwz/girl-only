$(function () {
	getCode();

	changePassword();

});

function getCode() {
	$("#getCode").click(function () {
		url = "https://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/sms_code_sending";
		$.ajax({
			type:"POST",
			url:url,
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

function changePassword() {
	$("#change").click(function () {
		sn1 = $("#sn1").val();
		sn2 = $("#sn2").val();
		code = $("#code").val();
		if(sn1!=sn2){
			swal({
				title:"两次输入的密码不相同！",
				text:"提示",
				type:"warning"
			});
			return;
		}
		url = "https://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/password";
		
		$.ajax({
			type:"POST",
			url:url,
			data:{
				code: code,
				password_hash: sn1
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