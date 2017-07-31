$(function () {
	getBaseInfo();       //加载基本信息

	changeName();         //更改店名按钮事件

	textLengthCount();    //文本计数器

	reviseBaseInfo();     //上传提交店铺信息

	initstaupload();      //初始化上传插件

	fileinput1();		//绑定上传按钮弹窗事件

	dialogClose();		//绑定弹窗关闭事件

	
});


function getBaseInfo() {                                                  //加载基本信息
	if(sessionStorage.authedshops_id==""||sessionStorage.authedshops_id==null){
		$("#tips").removeClass("hidden");
		$(".infocontainer").css("margin-top","3%");
		$("#saveChanges").addClass("hidden");
	}
	for (var i = 0; i < sessionStorage.authedshops_id.length; i++){
		url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[i];
		$.ajax({
			url: url,
	       	type:"GET",  
	     	success:function (resp) {
	     		if(resp.message == 'success'){
	     			name = resp.data.name;
	     			logo_pic_url = resp.data.logo_pic_url;
	     			description = resp.data.description;
	     			$("#name").text(name);
	     			$("#description").text(description);
	     			$('#count').text($("#description").val().length);
	     			if(logo_pic_url!=null){
		     			$("#logo").prop("src","http://server.shaonvonly.com/"+logo_pic_url);
		     		}else{
		     			$("#logo").prop("src","images/shoplogo.jpg");
		     		}
	     		}
	     		else{
	     			alert("基本信息请求失败!");
	     		}
	     	}
		});
	}
}

function textLengthCount() {                      //文本计数器
	$('#description').bind('input propertychange paste', function() {
	    $('#count').text($(this).val().length);
	});
}


function reviseBaseInfo(){                      //上传提交店铺信息
	$("#saveChanges").click(function () {
		if ($('#description').val().length>200) {
			swal({
				title:"店铺介绍字数超过限制(200个)",
				text:"操作提示",
				type:"warning"
			});
			return;
		}
		swal({
			title: '你确定要保存更改吗？',
			text: "操作提示",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '确定',
			cancelButtonText: '取消'
		}).then(function(isConfirm){
			if(isConfirm){
				name = $("#name").text();
				description = $("#description").val();
				var files = $('#upload-photos-1-text').fileinput('getFileStack');
				var data = new FormData();
				data.append("name",name);
				data.append("description",description);
				data.append("logo_pic",files[0]);
				url = "http://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id[0];
				$.ajax({
					url: url,
			       	type:"PUT",
			       	data:data,
			       	processData: false,  // 不处理数据
            		contentType: false,  // 不设置内容类型
			     	success:function (resp) {
			     		if(resp.message == 'success'){
			     			swal({
			     				title:"更改成功！",
			     				text:"操作提示",
			     				type:"success"
			     			});
			     			getBaseInfo();                //更新页面
			     		}
			     		else{
			     			swal({
			     				title:"更改失败！",
			     				text:resp.message,
			     				type:"error"
			     			});
			     		}
			     	}
				});
			}
		});
	});


}

function changeName() {                      //更改店名按钮事件
	$("#changeName").click(function () {
		swal({
			title: '店铺名称',
			input: 'text',
			showCancelButton: true,
			inputValidator: function(value) {
				return new Promise(function(resolve, reject) {
					if (value) {
						resolve();
					} else {
						reject('店铺名称不能为空！');
					}
				});
			}
		}).then(function(result) {
			if (result) {
				$("#name").text(result);
			}
		});
	});
}

function initstaupload() {
    /*初始化模态框和上传控件*/
    var diaoptions = {
        resizable: true,
        modal: false,
        autoOpen: false,
        title: "选择图片",
        title_html: true,
        minWidth: $(window).width()*0.75,
        maxHeight: 500,
        open:function(){
            $(this).closest(".ui-dialog").css('width',$(window).width()*0.75);
            $(this).dialog('option', 'position', 'center');
        }
    };

     var upoptions = {
        language: 'zh', // 设置语言
        uploadUrl: '../../file/uploadQuestionPhotos.do', // 上传的地址
        allowedFileExtensions: ['jpg', 'png', 'JPEG', 'bmp'],// 接收的文件后缀
        allowedFileTypes: ['image'],
        uploadAsync: false, // 默认异步上传
        showUpload: false, // 是否显示上传按钮
        showRemove: true, // 显示移除按钮
        showPreview: true, // 是否显示预览
        showCaption: false,// 是否显示标题
        dropZoneTitle:"最大可加入1张图片,请一次性添加<br>支持拖拽添加<br>",
        browseClass: "btn btn-primary", // 按钮样式
        dropZoneEnabled: true,// 是否显示拖拽区域
        fileActionSettings: {showUpload: false},
        ajaxSettings: {
            async: false
        },
        previewZoomButtonClasses:{
            prev: 'btn btn-white btn-round',
            next: 'btn btn-white btn-round',
            toggleheader: 'btn btn-header-toggle btn-round btn-white',
            fullscreen: 'btn  btn-white btn-round',
            borderless: 'btn btn-white btn-round',
            close: 'btn  btn-white btn-round'
        },
        layoutTemplates: {
            main2: '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n' +
            '<button type="button" tabindex="500" title="确定" class="btn btn-primary no-border input-ok pull-right" id="close1"><i class="glyphicon glyphicon-ok"></i><span class="hidden-xs">&nbsp;确定</span></button>',
            modal: '<div class="modal-dialog modal-lg" role="document">\n' +
            '  <div class="modal-content">\n' +
            '    <div class="modal-header">\n' +
            '      <div class="kv-zoom-actions pull-right">{prev}{next}{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
            '      <h3 class="modal-title">{heading}<small><span class="kv-zoom-title"></span></small></h3>\n' +
            '    </div>\n' +
            '    <div class="modal-body">\n' +
            '      <div class="floating-buttons"></div>\n' +
            '      <div class="kv-zoom-body file-zoom-content"></div>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>\n',
            actionEnter: '<button type="button" class="kv-file-zoom {zoomClass}" title="enter">{zoomIcon}</button>'
        },
        maxFileSize: 10240,
        maxFileCount: 1, // 表示允许同时上传的最大文件个数
        enctype: 'multipart/form-data',
        validateInitialCount: true,
        overwriteInitial: true,
        autoReplace:false,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
    };

    



     $("#upload-dialog-1-text").dialog(diaoptions);

     $("#upload-photos-1-text").fileinput(upoptions);

     
}

function dialogClose() {                   //模态框关闭和加载图片
    $("#close1").click(function () {
        $("#upload-dialog-1-text").dialog("close");
        var file = $("#upload-photos-1-text").fileinput("getFileStack");
        var reader = new FileReader();
        reader.onload = function(e){
			$("#logo").prop("src",e.target.result);
		}
		reader.readAsDataURL(file[0]);
    });
}



function fileinput1() {
	$("#changeAvatar").click(function () {
		$("#upload-dialog-1-text").dialog("open");
	});

}

