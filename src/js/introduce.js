$(function () {
	AdjustImgHeight();      

    AdjustPanelHeight();



});

function AdjustPanelHeight() {       //调整中间两个面板高度对齐
	var a = $("#panel-2-2").height();
	$("#panel-2-1").height(a);
}



function AdjustImgHeight() {         //用于调整新增图片的宽度和高度
	var a = $("#pic-input").width();
	a=a*0.14;
	$(".pic-group img").width(a);
	$(".pic-group img").height(a);
}
