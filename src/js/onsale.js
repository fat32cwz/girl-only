$(function(){
	adjustgoodsimg();     //商品图片宽高比例调整

});

function adjustgoodsimg() {                   //商品图片宽高比例调整
	var a=$('.goods-img').width();
	a=a/3*4;
	$('.goods-img').height(a);
}