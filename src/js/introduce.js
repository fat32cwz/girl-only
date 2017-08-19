$(function () {
	AdjustImgHeight();      

    AdjustPanelHeight();

    typeTabChange();

    createNewGoods();

    showUploadPic();

    addRow();

    showDeposit();

    fileinput1();

    initstaupload();

    dialogClose();


});

function AdjustPanelHeight() {       //调整中间两个面板高度对齐
	var a = $("#panel-2-2").height();
	$("#panel-2-1").height(a);
}



function AdjustImgHeight() {         //用于调整新增图片的宽度和高度
	var a = $("#pic-input").width();
	a=a*0.14;
	$(".pic-group-1 img").width(a);
	$(".pic-group-1 img").height(a);
	$(".pic-group-2 img").width(a);
	$(".pic-group-2 img").height(a);
}

function typeTabChange() {
	$(".col-xs-12 .list-group a").click(function () {
		$(".col-xs-12 .list-group .typeOnSelect").removeClass("typeOnSelect");
		$(this).addClass("typeOnSelect");
	});
}


function showUploadPic() {
	if(typeof FileReader==='undefined'){
		alert("抱歉，你的浏览器不支持图片上传。");
		$("#addPic_1").prop("disabled","disabled");
		$("#addPic_2").prop("disabled","disabled");
	}
	else{
		//$("#addPic_1").change(readFile1);
		//$("#addPic_2").change(readFile2);    
	}
}

function readFile1() {
	var length =  document.getElementById("addPic_1").files.length;
	console.log(length);
	var reader = new FileReader();
	reader.readAsDataURL(this.files[0]);
	console.log(this.files[0]);
	reader.onload = function(e){
		$(".pic-group-1").find("img[src='']").first().prop("src",this.result);
		console.log(this.result);
        // result = '<div id="result"><img src="'+this.result+'" alt=""/></div>';
        // div = document.createElement('div');
        // div.innerHTML = result;
        // document.getElementById('body').appendChild(div);  　　//插入dom树
    }		
}

function readFile2() {
	var length =  document.getElementById("addPic_2").files.length;
	console.log(length);
	var reader = new FileReader();
	reader.readAsDataURL(this.files[0]);
	console.log(this.files[0]);
	reader.onload = function(e){
		$(".pic-group-2").find("img[src='']").first().prop("src",this.result);
		console.log(this.result);
        // result = '<div id="result"><img src="'+this.result+'" alt=""/></div>';
        // div = document.createElement('div');
        // div.innerHTML = result;
        // document.getElementById('body').appendChild(div);  　　//插入dom树
    }		
}




function createNewGoods() {
	$("#submit").click(function () {
		url = "https://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/goods";
       //表单值获取开始
		name = $("#babyTitle").val();
		category_id = $(".typeOnSelect").attr("data-type");
		description = $("#babyInfo").val();
		texture = $("#texture").val();
		price = 100;
		status = ($("#spot").prop("checked")==true)?"onsale":"reserving";
		type = ($("#new").prop("checked")==true)?"new":"old";
        if($("#brand").val()==""||$("#goodsName").val()==""||$("#texture").val()==""||$("#size").val()==""||$("#skirtStyle").val()==""||$("#waiseStyle").val()==""||$("#skirtLength").val()==""){
            swal({
                title:"提交失败",
                text:"请填写完整“宝贝展示信息”(不需要的参数请填“无”)",
                type:"warning"
            });
            return;
        }
		properties = getProperties();  //返回JSON对象
		console.log(properties);
		goods_subs = getTableData();   //返回JSON对象
		console.log(goods_subs);
        if($("#spot").prop("checked")==true){
            count_at = ($("#count_at").prop("checked")==true)?"order":"payment";
        }else{
            count_at = "payment";
        }
		
		deposit = $("#deposit").val();
        
      
        var files = $('#upload-photos-1-text').fileinput('getFileStack');
        console.log(files);
        if(!(files=="")){
            var default_goods_pic = files[0].name;       //默认商品暂时为第一个
            console.log(default_goods_pic);
        }
        var file2 = $('#upload-photos-2-text').fileinput('getFileStack');
       
        //表单值获取结束

        //FormData处理开始
        var data = new FormData();
        data.append('name',name);
        data.append('category_id',category_id);
        data.append('description',description);
        data.append('texture',texture);
        data.append('price',price);
        data.append('status',status);
        data.append('type',type);
        data.append('properties',properties);
        data.append('goods_subs',goods_subs);
        data.append('count_at',count_at);
        if($("#spot1").prop("checked")==true){      //是否定金类型？
            if($("#deposit").val()==""){
                swal({
                    title:"输入错误",
                    text:"定金类型商品定金不能为空！",
                    type:"error"
                });
                return;
            }
            data.append('deposit',deposit);
        }

        if(!(files=="")){                           //存在加入的轮播图
            for (var i = 0; i < files.length; i++) {
                data.append('goods_pics',files[i]);
                if(i == 0){
                    data.append('default_goods_pic',files[i].name);
                }
            }
        }

        if(!(file2=="")){                           //存在加入的长图
            data.append('long_pic',file2[0]);
        }
        
        //FormData处理结束

		$.ajax({
			type:"POST",
			url: url,
			/*data:{
				name: name,
				category_id: category_id,
				description: description,
				texture: texture,
				price: price,
				status : status,
				properties : properties,
				goods_subs: goods_subs,	
                goods_pics:goods_pics,
				type: type,
				count_at: count_at,
				status_end_at: status_end_at,
				long_pic: long_pic,
				goods_pics: goods_pics,
				default_goods_pic : default_goods_pic,
				deposit: deposit  
			},*/
            data:data,
			dataType:"JSON",
            processData: false,  // 不处理数据
            contentType: false,  // 不设置内容类型
			success:function (resp) {
				if (resp.message=="success") {
					swal({title:"商品发布成功！",text:'可在"出售中"页面查看你的商品。',type:"success"});
                    console.log(data);
				}
				else if(resp.message=="参数不合法"||"未知错误"){
					swal({title:"商品发布失败！",text:"请检查表格数据(价格只能填写数字，库存只能填写整数)",type:"error"});
				}
			}
		});
	});
}


function addRow() {
	$("#addSize").click(function () {
		$("tbody").append('<tr>'+
            '<td><input type="text" /></td>'+
            '<td><input type="text" /></td>'+
            '<td><input type="text" /></td>'+
            '<td><input type="text" /></td>'+
            '<td><input type="text" /></td>'+
            '<td><input type="text" /></td>'+
        '</tr>');
	});

}

function getTableData() {
	var JsonData = {
		size:"",
		color:"",
		type:"",
		price:"",
		sku:""
	}
	var aa = [];

	var rows = document.getElementById("good_sub").rows.length;
	//获得行数(包括thead)
	var colums = document.getElementById("good_sub").rows[0].cells.length;
	//获得列数
	var count = 0;
	for (var i = 1; i < colums; i++) {
		if ((document.getElementById("good_sub").rows[i].cells[0].firstChild.value)) {
			count++;
		}
	}
	console.log(count);
    if ($("#spot1").prop("checked")==true) {           //定金类型商品
        for (var i = 1;i < count+1;i++) {
            var JsonData = new Object();
            JsonData.color = document.getElementById("good_sub").rows[i].cells[0].firstChild.value;
            JsonData.size = document.getElementById("good_sub").rows[i].cells[1].firstChild.value;
            JsonData.type = document.getElementById("good_sub").rows[i].cells[2].firstChild.value;
            JsonData.price = document.getElementById("good_sub").rows[i].cells[3].firstChild.value;
            JsonData.deposit = document.getElementById("good_sub").rows[i].cells[5].firstChild.value;
            JsonData.sku = 0;
            aa.push(JsonData);
        }
    }else{
        for (var j = 1;j < count+1;j++) {
            var JsonData = new Object();
            JsonData.color = document.getElementById("good_sub").rows[j].cells[0].firstChild.value;
            JsonData.size = document.getElementById("good_sub").rows[j].cells[1].firstChild.value;
            JsonData.type = document.getElementById("good_sub").rows[j].cells[2].firstChild.value;
            JsonData.price = document.getElementById("good_sub").rows[j].cells[3].firstChild.value;
            JsonData.sku = document.getElementById("good_sub").rows[j].cells[4].firstChild.value;
            aa.push(JsonData);
        }
    }	
	var obj = JSON.stringify(aa);
	return obj;
}

function getProperties() {
	brand = $("#brand").val();
	goodsName = $("#goodsName").val();
	texture = $("#texture").val();
	size = $("#size").val();
	skirtStyle = $("#skirtStyle").val();
	waiseStyle = $("#waiseStyle").val();
	skirtLength = $("#skirtLength").val();
    kind = $("#kind").val();
    plusMaterial = $("#plusMaterial").val();
	userDefined = ($("#userDefined").val()=="")?"无":$("#userDefined").val();
	var aa = [
		{
			key:"品牌",
			value:brand
		},
		{
			key:"商品",
			value:goodsName
		},
		{
			key:"材质",
			value:texture
		},
		{
			key:"尺码",
			value:size
		},
		{
			key:"裙型",
			value:skirtStyle
		},
		{
			key:"腰型",
			value:waiseStyle
		},
		{
			key:"裙长(cm)",
			value:skirtLength
		},
        {
            key:"面料",
            value:plusMaterial
        },
        {
            key:"种类",
            value:kind
        },
		{
			key:"自定义",
			value:userDefined
		}
	];
	var obj = JSON.stringify(aa);
	return obj;


}


function showDeposit() {
	$('input[name="paytype"]').click(function () {
		if ($("#spot").prop("checked")==true) {
			$(".deposit").addClass("invisible");
            $("#tips").addClass("hidden");
            $("#tips2").removeClass("hidden");
            $("#count_type").removeClass("hidden");
		}
		else if($("#spot1").prop("checked")==true){
			$(".deposit").removeClass("invisible");
            $("#tips").removeClass("hidden");
            $("#tips2").addClass("hidden");
            $("#count_type").addClass("hidden");
		}
	});
}


function fileinput1() {
	$("#addPic_1").click(function () {
		$("#upload-dialog-1-text").dialog("open");
	});
    $(".pic-group-1 img").click(function () {
        $("#upload-dialog-1-text").dialog("open");
    });

    $("#addPic_2").click(function () {
        $("#upload-dialog-2-text").dialog("open");
    });
    $(".pic-group-2 img").click(function () {
        $("#upload-dialog-2-text").dialog("open");
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
     url = "https://server.shaonvonly.com/api/users/"+sessionStorage.user_id+"/shops/"+sessionStorage.authedshops_id+"/goods";
     console.log(url);
     var upoptions = {
        language: 'zh', // 设置语言
        uploadUrl: url, // 上传的地址
        allowedFileExtensions: ['jpg', 'png', 'JPEG', 'bmp'],// 接收的文件后缀
        allowedFileTypes: ['image'],
        uploadAsync: false, // 默认异步上传
        showUpload: false, // 是否显示上传按钮
        showRemove: true, // 显示移除按钮
        showPreview: true, // 是否显示预览
        showCaption: false,// 是否显示标题
        dropZoneTitle:"最大可加入5张图片,请一次性添加<br>支持拖拽添加<br><div class='red'>提醒：第一张选择的将作为商品默认图片</div>",
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
        maxFileCount: 5, // 表示允许同时上传的最大文件个数
        enctype: 'multipart/form-data',
        validateInitialCount: true,
        overwriteInitial: true,
        autoReplace:false,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
    };

    var upoptions2 = {
        language: 'zh', // 设置语言
        uploadUrl: url, // 上传的地址
        allowedFileExtensions: ['jpg', 'png', 'JPEG', 'bmp'],// 接收的文件后缀
        allowedFileTypes: ['image'],
        uploadAsync: false, // 默认异步上传
        showUpload: false, // 是否显示上传按钮
        showRemove: true, // 显示移除按钮
        showPreview: true, // 是否显示预览
        showCaption: false,// 是否显示标题
        dropZoneTitle:"最大可加入1张图片,<br>支持拖拽添加<br>",
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
            '<button type="button" tabindex="500" title="确定" class="btn btn-primary no-border input-ok pull-right" id="close2"><i class="glyphicon glyphicon-ok"></i><span class="hidden-xs">&nbsp;确定</span></button>',
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
     $("#upload-dialog-2-text").dialog(diaoptions);



     $("#upload-photos-1-text").fileinput(upoptions);
     $("#upload-photos-2-text").fileinput(upoptions2);
     
}

function dialogClose() {
    $("#close1").click(function () {
        $("#upload-dialog-1-text").dialog("close");
        var files1 = $('#upload-photos-1-text').fileinput('getFileStack');
        console.log(files1.length);
        // for (var i = 0; i < files1.length; i++) {
        //     var reader = new FileReader();
        //     reader.onload = function(e){
        //         $("#showPic"+i).prop("src",e.target.result);
        //     }
        //     reader.readAsDataURL(files1[i]);
        // }
        try{
            var reader1 = new FileReader();
            reader1.onload = function(e){
                $("#showPic0").prop("src",e.target.result);
            }
            reader1.readAsDataURL(files1[0]);

            var reader2 = new FileReader();
            reader2.onload = function(e){
                $("#showPic1").prop("src",e.target.result);
            }
            reader2.readAsDataURL(files1[1]);

            var reader3 = new FileReader();
            reader3.onload = function(e){
                $("#showPic2").prop("src",e.target.result);
            }
            reader3.readAsDataURL(files1[2]);
        }catch(error){
            return;
        }
    });


    $("#close2").click(function () {
        $("#upload-dialog-2-text").dialog("close");
        var files2 = $('#upload-photos-2-text').fileinput('getFileStack');
        var reader = new FileReader();
        reader.onload = function(e){
            $("#showLongPic").prop("src",e.target.result);
        }
        reader.readAsDataURL(files2[0]);
    });
}
