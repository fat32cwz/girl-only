$(function () {
	
	getAutInfo();




	createAut();





})		

function getAutInfo() {
	if(sessionStorage.authedshops_id==""||sessionStorage.authedshops_id==null){
		$("#panel").addClass("hidden");
		$("#new").removeClass("hidden");
	}
	for (var i = 0; i < sessionStorage.authedshops_id.length; i++){
		url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[i]+"/authentication";
		$.ajax({
			url: url,
	       	type:"GET",  
	     	success:function (resp) {
	     		if(resp.message == 'success'){
	     			name = resp.data.name;
	     			phone = resp.data.phone;
	     			no = resp.data.no;
	     			address = resp.data.address;
	     			auth_at = resp.data.auth_at;
	     			$("#name").text(name);
	     			$("#phone").text(phone);
	     			$("#no").text(no);
	     			$("#address").text(address);
	     			$("#auth_at").text(auth_at);
	     		}
	     		else{
	     			alert("认证信息请求失败!"+resp.message);
	     		}
	     	}
		});
	}
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
		url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[0]+"/auths";
		$.ajax({
			url:url,
			type:"POST",
			data:{
				name:name,
				phone:phone,
				no:no,
				address:address
			},
			success:function (resp) {
				if (resp.message=="success") {
					swal({
						title:"创建认证成功！",
						text:"操作提示",
						type:"success"
					});
				}
				else{
					alert("创建认证失败！"+resp.message);
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
