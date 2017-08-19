$(function () {
	
	getAutInfo();

	createAut();

})		

function getAutInfo() {
	url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.shops_id+"/authentication";
	$.ajax({
		url: url,
       	type:"GET",  
     	success:function (resp) {
     		if(resp.message == 'success'){
     			name = resp.data.name;
     			phone = resp.data.phone;
     			no = resp.data.no;
     			address = resp.data.address;
     			alipay_account = resp.data.alipay_account;
     			time = resp.data.created_at;
     			auth_at = new Date(time).toLocaleString();
     			$("#name").text(name);
     			$("#phone").text(phone);
     			$("#no").text(no);
     			$("#address").text(address);
     			$("#auth_at").text(auth_at);
     			$("#alipay_account").text(alipay_account);


     			$("#panel").removeClass("hidden");
				$("#new").addClass("hidden");
     		}
     		else{
 				$("#panel").addClass("hidden");
				$("#new").removeClass("hidden");
     		}
     	}
	});
}

function createAut() {
	$("#create").click(function () {
		if($("#new_name").val()==""||$("#new_name").val()== null){
			swal({
				title:"提交失败！",
				text:"姓名不能为空！",
				type:"warning"
			});
			return;
		}
		if($("#new_phone").val()==""||$("#new_phone").val()== null){
			swal({
				title:"提交失败！",
				text:"电话不能为空！",
				type:"warning"
			});
			return;
		}
		if($("#new_alipay_account").val()==""||$("#new_alipay_account").val()== null){
			swal({
				title:"提交失败！",
				text:"支付宝账号不能为空！",
				type:"warning"
			});
			return;
		}
		if($("#new_no").val()==""||$("#new_no").val()== null){
			swal({
				title:"提交失败！",
				text:"证件号码不能为空！",
				type:"warning"
			});
			return;
		}
		if (!isIdcardNo($("#new_no").val())) {
	        swal({
				title:"提交失败！",
				text:"身份证格式错误！",
				type:"warning"
			});
	        return;
	    }
		if($("#new_address").val()==""||$("#new_address").val()== null){
			swal({
				title:"提交失败！",
				text:"地址不能为空！",
				type:"warning"
			});
			return;
		}
		name = $("#new_name").val();
		phone = $("#new_phone").val();
		no = $("#new_no").val();
		address = $("#new_address").val();
		alipay_account = $("#new_alipay_account").val();
		url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.shops_id+"/auths";
		$.ajax({
			url:url,
			type:"POST",
			data:{
				name:name,
				phone:phone,
				no:no,
				address:address,
				alipay_account:alipay_account
			},
			success:function (resp) {
				if (resp.message=="success") {
					swal({
						title:"创建认证成功！",
						text:"操作提示",
						type:"success"
					});
					getAutInfo();
				}
				else{
					swal({
						title:"创建认证失败！",
						text:"操作提示",
						type:"error"
					});
				}
			}
		});
	});
}

//验证身份证 
function isIdcardNo(idcard) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)|(^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}((\([0-9aA]\))|([0-9aA]))$)|(^[1|5|7][0-9]{6}\([0-9Aa]\)$)/;
    return pattern.test(idcard);
}
