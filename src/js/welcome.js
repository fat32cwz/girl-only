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
             success: function(){
             	window.location.href = "index.html";
             },
         });
	}); 

	
}