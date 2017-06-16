$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});


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
	var username = $("#username").val();
	var password_hash = $("#password_hash").val();
	$("#login").click(function () {
		$.ajax({
             url: "http://server.shaonvonly.com/api/login",
             type:"POST",
             data: {
                 username : username,
                 password_hash:password_hash,
             },
             success: function(resp){
             	console.log(resp);
             },
         });
	}); 

	
}