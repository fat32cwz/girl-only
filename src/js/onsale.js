$(function(){
	adjustgoodsimg();     //商品图片宽高比例调整
	adjustgoodsinfo();
});

function adjustgoodsimg() {                   //商品图片宽高比例调整
	var a=$('.goods-img').width();
	a=a/3*4;
	$('.goods-img').height(a);
}

function adjustgoodsinfo() {
	var a= $('.goods').width();
	a=a*0.59;
	var b= $('.goods').height();
	$('.goods-info').width(a);
	$('.goods-info').height(b);
}