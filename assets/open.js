jQuery.fn.myMark = function(data,callBack){
	var con = $("<div style='z-index:2147483644;width:"+screenWidth+"px;height:"+screenHeight+"px;position:fixed;top:0px;left:0px;'></div>").prependTo(this);
	con.canvasMark(data,callBack);
};
jQuery.fn.canvasMark = function(data,callBack){
	var urlM = data;
	var con = $(this);
	var width = con.width();
	var height = con.height();
	var canvas = $("<canvas id='myCanvas' width='"+width+"' height='"+height+"'></canvas>").appendTo(con);
	initACanvas(con,canvas,urlM,callBack);
};
function initACanvas(con,canvass,imgurl,funcallback){
	var canvas = canvass[0];
	var ctx = canvas.getContext("2d");
	var x1;
	var y1;
	var a=15;
	var timeout;
	var totimes = 30;
	var jiange = 20;
	var caveimg = new Image();
	caveimg.src = imgurl;
	caveimg.onload = function(){
		var w = canvas.width;
		var h = canvas.height;
		if(640/1008>=w/h){//遮左右
			var startx = parseInt(320 - 504*w/h);
			ctx.drawImage(caveimg,startx,0,1008*w/h,1008,0,0,w,h);
		}else{
			var starty = 504 - 320*h/w;
			ctx.drawImage(caveimg,0,starty,640,640*h/w,0,0,w,h);
		}
		//ctx.drawImage(caveimg,0,0,canvas.width,canvas.height);
		tapClip();
	}
	var goLength = 0;
	function tapClip(){
		var hastouch = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())),
			tapstart = hastouch?"touchstart":"mousedown",
			tapmove = hastouch?"touchmove":"mousemove",
			tapend = hastouch?"touchend":"mouseup";
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = a*2;
		ctx.globalCompositeOperation = "destination-out";
		var mianjiindex = 0;
		var mianji = 0;
		canvas.addEventListener(tapstart , function(e){
			if(timeout){
				clearTimeout(timeout);
			}
			e.preventDefault();
			x1 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
			y1 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
			ctx.save();
			ctx.beginPath();
			ctx.arc(x1,y1,1,0,2*Math.PI);
			ctx.fill();
			ctx.restore();
			canvas.addEventListener(tapmove,tapmoveHandler);
			canvas.addEventListener(tapend,function(){
				canvas.removeEventListener(tapmove,tapmoveHandler);
				timeout = setTimeout(function(){
					if(mianji/canvas.width*canvas.height>4){
						if(funcallback){
							funcallback(con);
						}
						con.animate({opacity:0},1000,null,function(){$(this).remove();});
					}
				},totimes);
			});
			function tapmoveHandler(e){
				if(timeout){
					clearTimeout(timeout);
				}
				e.preventDefault();
				x2 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
				y2 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
				ctx.save();
				ctx.moveTo(x1,y1);
				ctx.lineTo(x2,y2);
				ctx.stroke();
				ctx.restore();
				x1 = x2;
				y1 = y2;
				mianjiindex++;
				if(mianjiindex==jiange*4){
					mianjiindex = 0;
					mianji = mianji + jiange*jiange/4;
				}
			}
		});
	}
}

jQuery.fn.myFinger = function(data,callBack,type){
	var con = $("<div style=\"z-index:2147483644;width:"+screenWidth+"px;height:"+screenHeight+"px;position:fixed;top:0px;left:0px;background-image:url('"+data+"');background-size:auto 100%;background-position:center;\"></div>").prependTo(this);
	con.finger(data,callBack,type);
};
jQuery.fn.finger = function(data,callBack,type){
	var imgWidth = screenWidth;
	var imgHeight = screenHeight;
	var bilishen = 2;
	var con = $(this);
	var img = $("<div style=\"background-image:url('https://s.hunlihu.com/static/"+type+".png');z-index:3;width:"+getBiliZ(90*bilishen)+"px;height:"+getBiliZ(90*bilishen)+"px;position:fixed;top:"+(imgHeight-getBiliZ(90*bilishen))/2+"px;left:"+(imgWidth-getBiliZ(90*bilishen))/2+"px;background-size:100% 100%;\"></div>").appendTo(con);
	var img2 = null;
	var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    var clickEvtName = device ? 'touchstart' : 'mousedown';
    var tapend = device?"touchend":"mouseup";
    var yundongin = null;
    var topM = parseInt((imgHeight+getBiliZ(50*bilishen))/2);
    var topMindex = topM;
    $(img)[0].addEventListener(clickEvtName,function(e){
    	if(yundongin){
    		clearInterval(yundongin);
    	}
    	e.preventDefault();
    	img2 = $("<img src='https://s.hunlihu.com/static/finger_line.png' style='z-index:2;width:"+getBiliZ(80*bilishen)+"px;position:fixed;top:"+(imgHeight+getBiliZ(50*bilishen))/2+"px;left:"+(imgWidth-getBiliZ(80*bilishen))/2+"px;'>").appendTo(con);
    	var ss = getBiliZ(40*bilishen)
    	yundongin = setInterval(function(){
    		topMindex = topMindex - 2;
    		img2.css("top",topMindex+"px");
    		if(topMindex<=(imgHeight/2-ss)){
    			if(yundongin){
    	    		clearInterval(yundongin);
    	    	}
    			img2.remove();
    			if(callBack){callBack(con);}
    			con.animate({opacity:0},1000,null,function(){$(this).remove();});
    		}
    	},10);
    },false);
    $(img)[0].addEventListener(tapend,function(e){
    	e.preventDefault();
		if(yundongin){
    		clearInterval(yundongin);
    	}
		img2.remove();
		timeBeigin = 0;
		timeEnd = 0;
		topMindex = topM;
    },false);
};

jQuery.fn.myKiss = function(data,callBack){
	var con = $("<div style=\"z-index:2147483644;width:"+screenWidth+"px;height:"+screenHeight+"px;position:fixed;top:0px;left:0px;background-image:url('"+data+"');background-size:auto 100%;background-position:center;\"></div>").prependTo(this);
	con.kiss(data,callBack);
};
jQuery.fn.kiss = function(data,callBack){
	var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    var clickEvtName = device ? 'touchstart' : 'mousedown';
    var con = $(this);
    var timeBeigin1 = 0;
    var timeBiegin2 = 0;
    var overNotTheKiss = true;
    $(this)[0].addEventListener(clickEvtName,function(e){
    	 if(device){
    		 if (event.targetTouches.length == 2) {
     		    var touch1 = event.targetTouches[0];
     		    var touch2 = event.targetTouches[1];
     		    // 把元素放在手指所在的位置
     		    var x1 = touch1.pageX;
				var y1 = touch1.pageY;
				var x21 = touch2.pageX;
				var y21 = touch2.pageY;
				if(Math.abs(x1-x21)<150&&Math.abs(y1-y21)<150){
					var imgWidth = $('body').width()/5;
					var imgHeight = imgWidth*5/6;
					con.append("<img src='https://s.hunlihu.com/static/kiss.png' style='width:40%;position:fixed;top:"+(y1-imgHeight)+"px;left:"+(x1-imgWidth)+"px;'>");
					if(callBack){callBack(con);}
					con.animate({opacity:0},1500,null,function(){$(this).remove();});
				}
     		 }
    	}else{
    		if(timeBeigin1==0){
        		var myDate = new Date();
        		timeBeigin1 = myDate.getTime();
        	}else{
        		if(timeBiegin2==0){
        			var myDate = new Date();
        			timeBiegin2 = myDate.getTime();
        			if(timeBiegin2-timeBeigin1<=200){
        				overNotTheKiss = false;
        				var x1 = device?e.targetTouches[0].pageX:e.clientX;
        				var y1 = device?e.targetTouches[0].pageY:e.clientY;
        				var imgWidth = $('body').width()/5;
        				var imgHeight = imgWidth*5/6;
        				con.append("<img src='https://s.hunlihu.com/static/kiss.png' style='width:40%;position:fixed;top:"+(y1-imgHeight)+"px;left:"+(x1-imgWidth)+"px;'>");
        				if(callBack){callBack(con);}
        				con.animate({opacity:0},1500,null,function(){$(this).remove()});
        			}
        		}else{
        			if(overNotTheKiss){
        				timeBeigin1 = 0;
        				timeBiegin2 = 0;
        			}
        		}
        	}
    	}
    },false);
};

jQuery.fn.zCustomer = function(callBack,type){
	var con = $("<div id='touchthis' style=\"z-index:2147483644;width:"+screenWidth+"px;height:"+screenHeight+"px;position:fixed;top:0px;left:0px;background:none;\" align='center'></div>").prependTo(this);
	con.customer(callBack,type);
};
var colorArr = new Array("","","#ECC47D","#FFFDFF","#FFFDFF","#FFFDFF","#EEAE45","#FFFDFF","#BCA480","#A14145","#FFFDFF","#BAA47F","#FFFDFF","#655077","#88624B");
jQuery.fn.customer = function(callBack,type){
	if(!type)type = 2;
	var top = screenWidth*810/640-39;
	var con = $(this);
	var div ="<div class='cdown customer_1'><img src='https://s.hunlihu.com/customer-open/customer"+type+"_1.jpg' style='width:100%;'/></div>"+
			 "<div class='cup customer_2'><img src='https://s.hunlihu.com/customer-open/customer"+type+"_2.png' style='width:100%;'/></div>"+
			 "<div class='cup customer_n' style='color:"+colorArr[type]+";'>"+keren+"</div>"+
			 "<div  class='cup customer_3' style='top:"+top+"'><img src='https://s.hunlihu.com/customer-open/customer"+type+"_3.png' style='width:140px;'/></div>";
	$(div).appendTo(con);
	//810,640
	var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    var clickEvtName = device ? 'touchstart' : 'mousedown';
    $("#touchthis")[0].addEventListener(clickEvtName,function(e){
    	$(".cup").addClass("customer_up");
    	$(".cdown").addClass("customer_down");
    	if(callBack){
    		callBack();
    		setTimeout(function(){con.remove();},980);
    	}

    },false);
};



function initMyOpen(){
	if(keren!='您'){
		var realPage = pageSpriteList[0];
		realPage.jdom.attr("class","pageacw");
		if(!customer_open_type){customer_open_type==2;}
		$('body').zCustomer(function(con){initFirstPage();},customer_open_type);//默认样式2
	}else{
		if(open_page_use==1&&open_page_backimg!=''){
			var realPage = pageSpriteList[0];
			realPage.jdom.attr("class","pageacw");
			var theopt = open_page_type;
			if(open_page_type=='mengban'){
				open_page_backimg = open_page_backimg+"?x-oss-process=image/blur,r_10,s_15/watermark,image_d2F0ZXJfbWIucG5n";
				$('body').myMark(open_page_backimg,function(con){
					initFirstPage();
				},open_page_type);
			}else if(open_page_type=='kiss'){
				open_page_backimg = open_page_backimg+"?x-oss-process=image/blur,r_10,s_15/watermark,image_d2F0ZXJfa3MucG5n";
				$('body').myKiss(open_page_backimg,function(con){
					initFirstPage();
				},open_page_type);
			}else{
				open_page_backimg = open_page_backimg+"?x-oss-process=image/blur,r_10,s_15";
				$('body').myFinger(open_page_backimg,function(con){
					initFirstPage();
				},open_page_type);
			}
		}
	}
}
