var preLoadImg=new Object();function initRollOvers(){$("img.imgover,input.imgover").each(function(){var c=this.src;var b=c.lastIndexOf(".");var a=c.substr(0,b)+"_o"+c.substr(b,4);preLoadImg[c]=new Image();preLoadImg[c].src=a;$(this).hover(function(){this.src=a},function(){this.src=c})})}$(function(){initRollOvers()});