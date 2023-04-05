function initSmSm(page){
	var an_boss = $("#an_boss");
	var place_holder = $("#place_holder");
	page.dms.each(function(){
		var sma = $(this);
		var id = sma.attr("id");
		var biliW = widthBili;
		var biliH = heightBili;
		if(page.page_direction=='5'){
			biliW = heightBili;
			biliH = widthBili;
		}
		var smaterial_id = sma.attr("smaterial_id");
		var sm_type = sma.attr("sm_type");
		
		var css_width = parseInt(sma.attr("css_width"))*biliW;
		var css_height = parseInt(sma.attr("css_height"))*biliH;
		var css_margin_top = parseInt(sma.attr("css_margin_top"))*biliH;
		
		var css_margin_left = parseInt(sma.attr("css_margin_left"))*biliW;
		var css_border_radius =  parseInt(sma.attr("css_border_radius"))*biliW;
		sma.css('width',css_width+"px");
		sma.css('height',css_height+"px");
		
		var css_z_index = sma.attr("css_z_index");
		var isTopAn = false;
		if(parseInt(css_z_index)>=400||parseInt(css_z_index)==-1){
			if(big_type==0){
				isTopAn = true;
				$(sma).appendTo("body");
			}else if(big_type==1){
				var index_p = page.index;
				if(index_p==1){
					isTopAn = true;
					$(sma).appendTo("body");
				}
			}
			
		}

		if(sm_type=='video'){
			var video = $(sma);
			var videoS = new VideoSprite(video);
			videoS.play();
		}
		if(isTopAn){
			sma.css('top',css_margin_top+"px");
			sma.css('left',css_margin_left+"px");
			sma.css('position','fixed');
		}else{
			sma.css('margin-top',css_margin_top+"px");
			sma.css('margin-left',css_margin_left+"px");
		}
		var theimg = sma;
		if(sm_type=='img'){
			theimg = sma.find(".theimgi");
		}
		var css_background_color = sma.attr("css_background_color");
		if(sm_type!='timedown'){
			if(sm_type=='input'&&css_background_color==''){
				theimg.css("background-color","transparent");
			}else{
				theimg.css("background-color",css_background_color);
			}
		}
		sma.css('border-radius',css_border_radius+"px");
		var css_border_width = (sma.attr("css_border_width")*biliW).toFixed(0);
		var css_border_style = sma.attr("css_border_style");
		var css_border_position = sma.attr("css_border_position");
		var css_border_color = sma.attr("css_border_color");
		if(css_border_width>0){
			var borderCss = css_border_width+"px "+css_border_style+" "+css_border_color;
			var types = css_border_position.split(",");
			for(var i = 0; i < types.length;i++){
				var type = types[i];
				sma.css(type,borderCss);
			}
		}else{
			theimg.css("border","none");
			css_border_width = 0;
		}
		if(sm_type=='img'){
			var img = sma.find('.theimgi');
			img.css('width',css_width+"px");
			img.css('height',css_height+"px");
			img.css('border-radius',(css_border_radius-css_border_width)+"px");
			var isphone = img.attr('isphone');
			if(isphone&&isphone!='true'){
				img.bind('touchend',movePrevent);
			}
		}
		var css_box_shadow_h = parseInt(sma.attr("css_box_shadow_h"))*biliW;
		var css_box_shadow_v = parseInt(sma.attr("css_box_shadow_v"))*biliW;
		var css_box_shadow_blur = parseInt(sma.attr("css_box_shadow_blur"))*biliW;
		var css_box_shadow_spread = parseInt(sma.attr("css_box_shadow_spread"))*biliW;
		var css_box_shadow_color = sma.attr("css_box_shadow_color");
		var css_box_shadow_inset = sma.attr("css_box_shadow_inset");
		if(css_box_shadow_h>0||css_box_shadow_v>0||css_box_shadow_blur>0||css_box_shadow_spread>0){
			var shadow = css_box_shadow_color+" "+css_box_shadow_h+"px "+css_box_shadow_v+"px "+css_box_shadow_blur+"px "+css_box_shadow_spread+"px "+css_box_shadow_inset;
			sma.css("box-shadow",shadow);
		}
		var css_z_index = sma.attr("css_z_index");
		sma.css("z-index",css_z_index);
		var st_words_size = parseInt(sma.attr("st_words_size"))*biliW;
		var st_input_size = parseInt(sma.attr("st_input_size"))*biliW;
		if(sm_type=='words'){
			sma.css("font-size",st_words_size+"px");
			var st_words_line_height = sma.attr("st_words_line_height");
			var st_words_shadow_color = sma.attr("st_words_shadow_color");
			var st_words_color = sma.attr("st_words_color");
			var st_words_bold = sma.attr("st_words_bold");
			var st_words_italic = sma.attr("st_words_italic");
			var st_words_align = sma.attr("st_words_align");
			if(st_words_line_height!='normal'&&st_words_line_height!=''){
				var inhh = parseInt(st_words_line_height);
				if(inhh>7){
					st_words_line_height = inhh*biliH;
					st_words_line_height = st_words_line_height + "px";
				}
			}
			sma.css("line-height",st_words_line_height);
			sma.css("color",st_words_color);
			if(st_words_shadow_color!=''){
				sma.css("text-shadow",st_words_shadow_color+" 0px 0px 2px");
			}
			if(st_words_bold=='1'){
				sma.css("font-weight","bold");
			}
			if(st_words_italic=='1'){
				sma.css("font-style","italic");
			}
			var text_align = 'left';
			if(st_words_align=='1'){
				text_align = 'center';
			}else if(st_words_align=='2'){
				text_align = 'right';
			}
			sma.css("text-align",text_align);
		}
		if(sm_type=='input'){
			sma.css("font-size",st_input_size+"px");
			var st_input_color = sma.attr("st_input_color");
			sma.css("color",st_input_color);
			place_holder.append("#"+id+"::-webkit-input-placeholder{color:"+st_input_color+";}\n");
			var st_input_bold = sma.attr("st_input_bold");
			var st_input_italic = sma.attr("st_input_italic");
			var st_input_align = sma.attr("st_input_align");
			if(st_input_bold=='1'){
				sma.css("font-weight","bold");
			}
			if(st_input_italic=='1'){
				sma.css("font-style","italic");
			}
			var text_align = 'left';
			var select = sma.find("select");
			select.css("width",(css_width-10)+"px");
			if(st_input_align=='0'){
				text_align = 'left';
				sma.css("padding-left","5px");
			}else if(st_input_align=='1'){
				text_align = 'center';
				select.css("margin-left","-"+(css_width-30)/2+"px");
			}else if(st_input_align=='2'){
				text_align = 'right';
				sma.css("padding-right","5px");
				select.css("margin-left","-"+(css_width-35)+"px");
			}
			sma.css("text-align",text_align);
		}
		var an_use = sma.attr("an_use");
		if(an_use==1){
			var an_text = sma.attr("an_text");
			var an_duration = sma.attr("an_duration");
			var an_timing_function = sma.attr("an_timing_function");
			var an_delay = sma.attr("an_delay");
			var an_iteration_count = sma.attr("an_iteration_count");

			var animationDetail = an_duration+"s "+an_timing_function+" "+an_delay+"s "+an_iteration_count+" both;";
			var an = dealAn(an_text,biliW,'translateX');
			an = dealAn(an,biliH,'translateY');
			an = dealMaskPosition(an,biliW,biliH);
			
			if(isTopAn){
				an_boss.append(
						"@-webkit-keyframes an_"+smaterial_id+"{"+an+"}\n"+
						".andm_"+smaterial_id+"{-webkit-animation:an_"+smaterial_id+" "+animationDetail+"}\n"
						);
			}else{
				an_boss.append(
						"@-webkit-keyframes an_"+smaterial_id+"{"+an+"}\n"+
						".pageac .andm_"+smaterial_id+"{-webkit-animation:an_"+smaterial_id+" "+animationDetail+"}\n"
						);
			}
			sma.attr("class","dm andm_"+smaterial_id);
			var an_use_1 = sma.attr("an_use_1");
			if(an_use_1==1){
				var an_text_1 = sma.attr("an_text_1");
				var an_duration_1 = sma.attr("an_duration_1");
				var an_timing_function_1 = sma.attr("an_timing_function_1");
				var an_delay_1 = sma.attr("an_delay_1");
				var an_iteration_count_1 = sma.attr("an_iteration_count_1");

				var animationDetail_1 = an_duration_1+"s "+an_timing_function_1+" "+an_delay_1+"s "+an_iteration_count_1+" both;";
				var an_1 = dealAn(an_text_1,biliW,'translateX');
				an_1 = dealAn(an_1,biliH,'translateY');
				an_1 = dealMaskPosition(an_1,biliW,biliH);
				if(isTopAn){
					an_boss.append("@-webkit-keyframes an_"+smaterial_id+"_1"+"{"+an_1+"}\n .andm_"+smaterial_id+"_1"+"{-webkit-animation:an_"+smaterial_id+"_1 "+animationDetail_1+"}\n");
				}else{
					an_boss.append("@-webkit-keyframes an_"+smaterial_id+"_1"+"{"+an_1+"}\n .pageac .andm_"+smaterial_id+"_1"+"{-webkit-animation:an_"+smaterial_id+"_1 "+animationDetail_1+"}\n");
				}
				var theDom = sma;
				if(sm_type=='img'){
					theDom = sma.find(".theimgi");
				}
				sma[0].addEventListener("webkitAnimationEnd",function(){//当前动画执行完毕,启动下一个动画
					var theDom = sma;
					var smaterial_id = theDom.attr("smaterial_id");
					theDom.attr("class","dm andm_"+smaterial_id+"_1");
				});
			}
		}else if(an_use==99){//【新增】新版多动画组合
			var an_text = sma.attr("an_text");
//			var waitAnClass = new Array();
			var waitAnA = "";
			if(an_text!=''){
				an_text = an_text.replaceAll("'","\"");
				var anJson = JSON.parse(an_text);
				var needListen = false;
				var waitAnNum = 0;
				for(var i = 0;i<anJson.length;i++){
					var one_an = anJson[i];
					var an_use = one_an.an_use;
					var last = i==0?"":"_"+i;
					if(an_use==1){
						var an_text = one_an.an_id;
						var animationDetail = one_an.an_detail;
						var an = dealAn(an_text,biliW,'translateX');
						an = dealAn(an,biliH,'translateY');
						an = dealMaskPosition(an,biliW,biliH);
						if(isTopAn){
							an_boss.append("@-webkit-keyframes an_"+smaterial_id+last+"{"+an+"}\n .andm_"+smaterial_id+last+"{-webkit-animation:an_"+smaterial_id+last+" "+animationDetail+"}\n");
						}else{
							an_boss.append("@-webkit-keyframes an_"+smaterial_id+last+"{"+an+"}\n .pageac .andm_"+smaterial_id+last+"{-webkit-animation:an_"+smaterial_id+last+" "+animationDetail+"}\n");
						}
						if(needListen){
							waitAnNum ++;
						}else{
							sma.attr("class","dm andm_"+smaterial_id+last);
							needListen = true;
						}
					}
				}
				sma.attr("waitAnNum",waitAnNum);
				if(waitAnNum>0){
					var waitAnNumTemp = 0;
					sma[0].addEventListener("webkitAnimationEnd",function(){//第一动画执行完毕,启动下一个动画
						waitAnNumTemp++; 
						if(waitAnNumTemp>waitAnNum){
							waitAnNumTemp = 0;
						}else{
							var theDom = sma;
							var smaterial_id = theDom.attr("smaterial_id");
							sma.attr("class","dm andm_"+smaterial_id+"_"+waitAnNumTemp);
						}
					});
				}
			}
		}

		sma.removeAttr("auto_bili");
		sma.removeAttr("css_width");
		sma.removeAttr("css_height");
		sma.removeAttr("css_margin_top");
		sma.removeAttr("css_margin_left");
		sma.removeAttr("css_border_radius");
		sma.removeAttr("css_z_index");
		sma.removeAttr("css_background_color");
		sma.removeAttr("css_border_width");
		sma.removeAttr("css_border_style");
		sma.removeAttr("css_border_position");
		sma.removeAttr("css_border_color");
		sma.removeAttr("css_box_shadow_h");
		sma.removeAttr("css_box_shadow_v");
		sma.removeAttr("css_box_shadow_blur");
		sma.removeAttr("css_box_shadow_spread");
		sma.removeAttr("css_box_shadow_color");
		sma.removeAttr("css_box_shadow_inset");
		sma.removeAttr("css_z_index");
		sma.removeAttr("st_words_size");
		sma.removeAttr("st_input_size");
		sma.removeAttr("st_input_should_sign");
		sma.removeAttr("st_input_color");
		sma.removeAttr("st_input_font");
		sma.removeAttr("st_input_bold");
		sma.removeAttr("st_input_italic");
		sma.removeAttr("st_input_align");
		//sma.removeAttr("st_video_auto");
		sma.removeAttr("st_video_img_url");
		//sma.removeAttr("st_video_mp4_url");
		sma.removeAttr("st_video_img_url");
		//sma.removeAttr("an_use");
		sma.removeAttr("an_text");
		//sma.removeAttr("an_duration");
		sma.removeAttr("an_timing_function");
		//sma.removeAttr("an_delay");
		sma.removeAttr("an_iteration_count");
		//sma.removeAttr("an_use_1");
		sma.removeAttr("an_text_1");
		//sma.removeAttr("an_duration_1");
		sma.removeAttr("an_timing_function_1");
		//sma.removeAttr("an_delay_1");
		sma.removeAttr("an_iteration_count_1");

		sma.removeAttr("st_words_line_height");
		sma.removeAttr("st_words_shadow_color");
		sma.removeAttr("st_words_color");
		sma.removeAttr("st_words_bold");
		sma.removeAttr("st_words_italic");
		sma.removeAttr("st_words_align");
	});
}

function dealAn(an_text,bili,name) {
	var dealss = an_text.split(name);
	var dealhou = dealss[0];
	for(var i = 1;i < dealss.length;i++){
		var needJiexi = dealss[i];
		var indexOfkuohao = needJiexi.indexOf(")");
		var theleftpx = needJiexi.substring(0,indexOfkuohao);
		var therightpx = needJiexi.substring(indexOfkuohao);
		theleftpx = theleftpx.replace("(","").replace(" ","").replace(" ","").replace("px","").replace("PX","");
		theleftpx = parseInt(theleftpx);
		dealhou = dealhou + name+"("+(theleftpx*bili)+"px"+therightpx;
	}
	return dealhou;
}

function dealMaskPosition(an_text,biliW,biliH){
	var dealss = an_text.split('-webkit-mask-position');
	var dealhou = dealss[0];
	for(var i = 1;i < dealss.length;i++){
		var needJiexi = dealss[i];
		var indexOffenhao = needJiexi.indexOf(";");
		var therightdata = needJiexi.substring(indexOffenhao);
		var data = needJiexi.substring(0,indexOffenhao).replace(":","").replace(/(^\s*)|(\s*$)/g,"").replace("px","").replace("PX","");
		var datas = data.split(" ");
		var w = parseInt(parseInt(datas[0])*biliW);
		var h = parseInt(parseInt(datas[1])*biliH);
		dealhou = dealhou + "-webkit-mask-position:"+w+"px "+h+"px"+therightdata;
	}
	return dealhou;
}
function toPage(index){
	if(index>=pageSize){
		return;
	}
	var rightP = pageSpriteList[pageRightIndex];
	if(index>pageRightIndex){
		gotoPage(rightP,1,rightP.page_change_type,true,index);
	}else if(index<pageRightIndex){
		gotoPage(rightP,0,rightP.page_change_type,true,index);
	}
}
var theRightNowPage = null;
function gotoPage(page,movePageTowards,change_type,isAuto,index){
	pauseAllVideo();
	if(hasdaduan){
		change_type = 'tb';
		//isAuto = false;
	}
	var realPage = movePageTowards==1?page.nextPage():page.prePage();
	if(index||index==0){realPage = pageSpriteList[index];}
	pageRightIndex = realPage.index;
	var theRealPage = realPage.jdom;
	theRightNowPage = realPage;
	var pageingParamT = pageingParam[change_type];
	if(pageingParamT.notTit){
		if(isAuto){
			var next_chang_type = change_type;
			var direct = movePageTowards==1?1:-1;
			if(pageingParamT.direct){
				direct = pageingParamT.direct;
			}
			if((next_chang_type.indexOf('tb')!=-1)||next_chang_type.indexOf('lg1')!=-1){
                theRealPage.css("-webkit-transform","translateY("+screenHeight*direct+"px)");
                if(page.page_top=='1'){
            		theRealPage.css("z-index","1314533");
            	}else{
            		theRealPage.css("z-index","3");
            	}
            }else if((next_chang_type.indexOf('lr')!=-1)||next_chang_type.indexOf('lg2')!=-1){
                theRealPage.css("-webkit-transform","translateX("+screenWidth*direct+"px)");
                if(page.page_top=='1'){
            		theRealPage.css("z-index","1314533");
            	}else{
            		theRealPage.css("z-index","3");
            	}
            }else if(next_chang_type.indexOf('roll')!=-1){
            	theRealPage.css("-webkit-transform-origin",pageingParamT.origin1);
            	theRealPage.css("-webkit-transform","rotate("+(pageingParamT.rotate)+"deg)");
            	page.jdom.css("-webkit-transform-origin",pageingParamT.origin2);
            	if(page.page_top=='1'){
            		theRealPage.css("z-index","1314533");
            	}else{
            		theRealPage.css("z-index","3");
            	}
            }
			theRealPage.attr("class","pageac");
			playVideo(realPage,1);
		}
		var time = 0.3;
		if(pageingParamT.time){
			time = (pageingParamT.time).toFixed(2);
		}
		setTimeout(function(){
			if(change_type.indexOf('roll')==-1){
				theRealPage.css("-webkit-transition","-webkit-transform "+time+"s linear");
		        theRealPage.css("-webkit-transform",pageingParamT.translate+"(0px)");
		        if(pageingParamT.lg){
		        	page.jdom.css("-webkit-transition","-webkit-transform "+time+"s linear");
		        	page.jdom.css("-webkit-transform",pageingParamT.translate+"("+pageingParamT.goSize*direct*-1+"px)");
		        }
			}else{
				theRealPage.css("-webkit-transition","-webkit-transform "+time+"s linear");
		        theRealPage.css("-webkit-transform","rotate(0deg)");
		        if(pageingParamT.lg){
		        	page.jdom.css("-webkit-transition","-webkit-transform "+time+"s linear");
		        	page.jdom.css("-webkit-transform","rotate("+(pageingParamT.rotate*-1)+"deg)");
		        }
			}
		},40);
        function transitionEnd(){
        	theRealPage.css("-webkit-transition","none");
        	theRealPage.css("-webkit-transform-origin","50% 50%");
            if(realPage.page_top=='1'){
        		theRealPage.css("z-index","1314532");
        	}else{
        		theRealPage.css("z-index","2");
        	}
            if(pageingParamT.opacity){
            	theRealPage.css("opacity",1);
    		}
            page.jdom.css("-webkit-transition","none");
            page.jdom.css("-webkit-transform-origin","50% 50%");
            page.jdom.attr("class","page");
            if(page.page_top=='1'){
            	page.jdom.css("z-index","1314531");
        	}else{
        		page.jdom.css("z-index","1");
        	}
            page.dms.each(function(){
	            var tDom = $(this);
				var smaterial_id = tDom.attr("smaterial_id");
				tDom.attr("class","dm andm_"+smaterial_id);	
				var waitAnNum = tDom.attr("waitAnNum");
				if(waitAnNum>0){
					var waitAnNumTemp = 0;
					tDom[0].addEventListener("webkitAnimationEnd",function(){//第一动画执行完毕,启动下一个动画
						waitAnNumTemp++;
						if(waitAnNumTemp>waitAnNum){
							waitAnNumTemp = 0;
						}else{
							var theDom = tDom;
							var smaterial_id = theDom.attr("smaterial_id");
							tDom.attr("class","dm andm_"+smaterial_id+"_"+waitAnNumTemp);
						}
					});
				}
				
	        });
            stopVideo(page);
            pageingLock = false;
            if(realPage.auto_play=='1'){
                var pageing_time = parseFloat(realPage.pageing_time);
                if(pageing_time>=0){
                    setTimeout(function(){
                    	if(!hasdaduan){
                            gotoPage(realPage,1,realPage.change_type,true);
                    	}
                    },pageing_time*1000);
                }
            }
            if(pageingParamT.lg){
            	page.jdom[0].removeEventListener("webkitTransitionEnd",transitionEnd);	
            }else{
            	theRealPage[0].removeEventListener("webkitTransitionEnd",transitionEnd);
            }
        }
        if(isAndroid){
	        if(pageingParamT.lg){
	        	page.jdom[0].addEventListener("webkitTransitionEnd",transitionEnd);
	        }else{
	        	theRealPage[0].addEventListener("webkitTransitionEnd",transitionEnd);
	        }
        }else{
        	setTimeout(function(){
        		transitionEnd();
        	},time*900);
        }
	}else{
		if(isAuto){
			if(page.page_top=='1'){
				theRealPage.css("z-index","1314531");
			}else{
				theRealPage.css("z-index","1");
			}
			theRealPage.attr("class","pageac");
			playVideo(realPage,1);
		}
		var time = (pageingParamT.time).toFixed(2)
		page.jdom.css("-webkit-transition","opacity "+time+"s linear");
		page.jdom.css("opacity","0");
		function transitionEnd(){
        	theRealPage.css("-webkit-transition","none");
            if(realPage.page_top=='1'){
				theRealPage.css("z-index","1314532");
			}else{
				theRealPage.css("z-index","2");
			}
            theRealPage.attr("class","pageac");
            page.jdom.css("-webkit-transition","none");
            page.jdom.attr("class","page");
            if(page.page_top=='1'){
				page.jdom.css("z-index","1314531");
			}else{
				page.jdom.css("z-index","1");
			}
            page.jdom.css("opacity","1");
            page.dms.each(function(){
	            var tDom = $(this);
				var smaterial_id = tDom.attr("smaterial_id");
				tDom.attr("class","dm andm_"+smaterial_id);	
	        });
            if(page.splitImgs){
	        	page.splitImgs.each(function(){
		            var tDom = $(this);
					var id = tDom.attr("id");
					tDom.attr("class",id+" imgsplit");	
		        });
            }
            stopVideo(page);
            pageingLock = false;
            if(realPage.auto_play=='1'){
                var pageing_time = parseFloat(realPage.pageing_time);
                if(pageing_time>=0){
                    setTimeout(function(){
                    	if(!hasdaduan){
                            gotoPage(realPage,1,realPage.change_type,true);
                    	}
                    },pageing_time*1000);
                }
            }
            page.jdom[0].removeEventListener("webkitTransitionEnd",transitionEnd);
        }
		if(isAndroid){
			page.jdom[0].addEventListener("webkitTransitionEnd",transitionEnd);
        }else{
        	setTimeout(function(){
        		transitionEnd();
        	},time*900);
        }
	}
}
var rightWishs = null;
var thePageHasMusic = 0;

var isLongOrWidthSreenP = null;
function isLongOrWidthSreen(){
	if(isLongOrWidthSreenP){
		return isLongOrWidthSreenP;
	}else{
		var screenWidth1 = $("body").width();
		var screenHeight1 = $("body").height();
		if(screenWidth1/screenHeight1>0.634){
			isLongOrWidthSreenP = 2;
			return 2;
		}else{
			isLongOrWidthSreenP = 1;
			return 1;
		}
	}
}

var theBodycon = null;

function dealLazyImg(dom){
	if(theBodycon==null){
		theBodycon = $("body");
	}
	var $this = dom;
	var id = $this.attr("id");
	var img_css = "#"+id+"{";
	var lazy_url = $this.attr("lazy_url");
	var onerrorurl = $this.attr("onerrorurl");
	var st_video_mp4_url = $this.attr("st_video_mp4_url");
	var domtype = $this.attr("domtype");
	if(domtype=='img'){
		$this.attr("src",lazy_url);
		$this.attr("onerror","this.src='"+onerrorurl+"'");
		if(st_video_mp4_url&&st_video_mp4_url!=''){
			var prexsss = (make=='1')?"/nshow/us?url=http:":"";
			img_css = img_css + "-webkit-mask-image:url('"+prexsss+st_video_mp4_url+"');";
			theBodycon.append("<img src='"+st_video_mp4_url+"' onerror='this.src=\""+onerrorurl+"\"' style='display:none;'/>");
		}
	}else{
		$this.find("img").attr("src",lazy_url);
		if(isLongOrWidthSreen()==1){
			$this.css("background-size","cover");
		}else{
			$this.css("background-size","100% auto");
		}
		img_css = img_css + "background-image:url('"+lazy_url+"');";
		if(st_video_mp4_url&&st_video_mp4_url!=''){
			var prexsss = (make=='1')?"/nshow/us?url=http:":"";
			img_css = img_css + "-webkit-mask-image:url('"+prexsss+st_video_mp4_url+"');";
			theBodycon.append("<img src='"+st_video_mp4_url+"' style='display:none;'/>");
		}
	}
	img_css = img_css + "}\n";
	if(img_css.indexOf("image:url")!=-1){
		var hole_css = "<style type='text/css'>"+img_css+"</style>";
		$(hole_css).insertAfter(img_boss);
	}
	$this.removeAttr("lazy_url");
	$this.removeAttr("st_video_mp4_url");
	$this.removeAttr("st_img_o_url");
	$this.removeAttr("onerrorurl");
}

function playVideo(page,last_page_isauto){
	var isNeedHideAllbu = false;
	var prePage = page.prePage();
	var nextPage = page.nextPage();
	var nenextPage = nextPage.nextPage();
	if(nextPage.lazyimg){
		nextPage.lazyimg.each(function(){
			var $this = $(this);
			dealLazyImg($this);
		});
		nextPage.lazyimg = null;
	}
	if(nenextPage.lazyimg){
		nenextPage.lazyimg.each(function(){
			var $this = $(this);
			dealLazyImg($this);
		});
		nenextPage.lazyimg = null;
	}
	if(prePage.lazyimg){
		prePage.lazyimg.each(function(){
			var $this = $(this);
			dealLazyImg($this);
		});
		prePage.lazyimg = null;
	}
	if(page.interlude){
		page.interludeDiv.show();
		page.interlude.replay(function(){
			page.interludeDiv.hide();
		});
	}
	var lastVideos = page.videos;
	if(lastVideos){
        for(var i = 0;i < lastVideos.length;i++){
			var video = lastVideos[i];
			video.replay();
		}
	}
	var insideVideo = page.insideVideo;
	if(insideVideo){
		playInsideVideo(insideVideo,last_page_isauto);
	}
	var insideVideoPre = prePage.insideVideo;
	if(insideVideoPre){
		insideVideoPre.pause();
	}
	var insideVideoNext = nextPage.insideVideo;
	if(insideVideoNext){
		insideVideoNext.pause();
	}
	
	var lastImgs = page.imgs;
	if(lastImgs){
		for(var i = 0;i < lastImgs.length;i++){
			var imgs = lastImgs[i];
			imgs.play();
		}
	}
	var lastImgan = page.imgans;
	if(lastImgan){
		for(var i = 0;i < lastImgan.length;i++){
			var imgan = lastImgan[i];
			imgan.play();
		}
	}
	var lastWishs = page.wishes;
	if(lastWishs){
		rightWishs = lastWishs;
		for(var i = 0;i < lastWishs.length;i++){
			var wish = lastWishs[i];
			wish.play();
		}
		if(lastWishs.length>0){
			isNeedHideAllbu = true;
		}
	}
	var is_weiye = page.jdom.attr("is_weiye");
	if("1"==is_weiye){
		isNeedHideAllbu = true;
	}
	if(isNeedHideAllbu){
		allbuhide(1);
	}else{
		allbuhide(0);
	}
	if(page.play_music=='1'){
		if(playFlag==1){
            playOrParse();
        }
		var $musicPlayer = page.musicPlayer;
		var musicPlayer = $musicPlayer[0];
		var music_url = page.music_url;
		var music_loop = page.music_loop;
		if(musicPlayer.src!=music_url||musicPlayer.paused){
		    if(music_loop=='1'){
		    	musicPlayer.loop ='loop';
		    	$musicPlayer.attr('loop', 'loop')
		    }else{
		    	$musicPlayer.removeAttr('loop')
		    }
		    musicPlayer.pause();
		    if(music_url&&music_url!=''){
		    	if(music_url.indexOf('tsn.baidu.com/text2audio')!=-1){
		    		musicPlayer.src = music_url+"&tok="+bvid;
		    	}else{
		    		musicPlayer.src = music_url;
		    	}
		    	musicPlayer.play();
		    }
	    }
		thePageHasMusic = 1;
	}else{
		if(thePageHasMusic==1){
			var $musicPlayer = page.musicPlayer;
			var musicPlayer = $musicPlayer[0];
			musicPlayer.pause();
			musicPlayer.src = '';
			if(playFlag==0){
        		playOrParse();
        	}
			thePageHasMusic = 0;
		}
	}
	page.reDomFunc();
	if(changPageFunc){
		changPageFunc(page,prePage,nextPage);
	}
}
function stopVideo(page){
	if(page.interlude){
		page.interludeDiv.hide();
		page.interlude.stop();
	}
	var lastVideos = page.videos;
	if(lastVideos){
        for(var i = 0;i < lastVideos.length;i++){
			var video = lastVideos[i];
			video.stop();
		}
	}
	var lastImgs = page.imgs;
	if(lastImgs){
		for(var i = 0;i < lastImgs.length;i++){
			var imgs = lastImgs[i];
			imgs.stop();
		}
	}
	var lastImgan = page.imgans;
	if(lastImgan){
		for(var i = 0;i < lastImgan.length;i++){
			var imgan = lastImgan[i];
			imgan.stop();
		}
	}
	var lastWishs = page.wishes;
	if(lastWishs){
		for(var i = 0;i < lastWishs.length;i++){
			var wish = lastWishs[i];
			wish.stop();
		}
	}
}
var pageingParam = {
	"tit":{"notTit":false,"num_1":1,"num_2":0,"abs":2.8,"time":1.5},
	"tit2":{"notTit":false,"num_1":1,"num_2":0,"abs":2.8,"time":6},
	"tit100":{"notTit":false,"num_1":1,"num_2":0,"abs":2.8,"time":0.01},
	"tb":{"notTit":true,"translate":"translateY","num_1":1,"num_2":0,"abs":2.8},
	"tb1":{"notTit":true,"translate":"translateY","num_1":1,"num_2":0,"abs":2.8,"opacity":0.8},
	"lg1":{"notTit":true,"translate":"translateY","num_1":1,"num_2":0,"abs":2.8,
			"lg1":function(page,juli,type){
				if(type==0){
					page.css("-webkit-transition","none");
				}
				page.css("-webkit-transform","translateY("+(juli*-1)+"px)");
			},"lg":true},
	"lg11":{"notTit":true,"translate":"translateY","num_1":1,"num_2":0,"abs":2.8,"lg11":null,"lg":true,time:0.8,direct:-1},
	"lg12":{"notTit":true,"translate":"translateY","num_1":1,"num_2":0,"abs":2.8,"lg11":null,"lg":true,time:0.8,direct:1},
	"lr":{"notTit":true,"translate":"translateX","num_1":0,"num_2":1,"abs":1},
	"lr1":{"notTit":true,"translate":"translateX","num_1":0,"num_2":1,"abs":1,"opacity":0.8},
	"lg2":{"notTit":true,"translate":"translateX","num_1":0,"num_2":1,"abs":1,
			"lg2":function(page,juli,type){
				if(type==0){
					page.css("-webkit-transition","none");
				}
				page.css("-webkit-transform","translateX("+(juli*-1)+"px)");
			},"lg":true},
	"lg21":{"notTit":true,"translate":"translateX","num_1":0,"num_2":1,"abs":1,"lg2":null,"lg":true,time:0.8,direct:-1},
	"lg22":{"notTit":true,"translate":"translateX","num_1":0,"num_2":1,"abs":1,"lg2":null,"lg":true,time:0.8,direct:1},
	"roll1":{"notTit":true,"rotate":90,"num_1":0,"num_2":1,"abs":1,"lg2":null,"lg":true,time:0.8,origin1:'100% 100%',origin2:'0% 100%'},
	"roll2":{"notTit":true,"rotate":-90,"num_1":0,"num_2":1,"abs":1,"lg2":null,"lg":true,time:0.8,origin1:'0% 100%',origin2:'100% 100%'},
	"roll3":{"notTit":true,"rotate":-90,"num_1":0,"num_2":1,"abs":1,"lg2":null,"lg":true,time:0.8,origin1:'100% 0%',origin2:'0% 0%'},
	"roll4":{"notTit":true,"rotate":90,"num_1":0,"num_2":1,"abs":1,"lg2":null,"lg":true,time:0.8,origin1:'0% 0%',origin2:'100% 0%'}
};


function pauseAllVideo(){
	$(".auto_video").each(function(){
		var status = $(this).attr("tag");
		if(status=='playing'){
			$(this).click();
		}
	})
}

function playthisvideo(dom,smid){
	if(playFlag==1){
		if(isHo){
			hoBGM.pause();
		}else{
			$("#show_audio")[0].pause();
		}
		$("#musicPlay").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNzBmYzI1Ni05MTgyLWY4NDYtYjkzNi02MzJiM2QxMDc4OWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM2RTNBMzQ5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM2RTNBMzM5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDMxYmRhNDItYjQ5My02MDQyLWIzZWQtM2M1ZTEzNTAyMjM3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY3MGZjMjU2LTkxODItZjg0Ni1iOTM2LTYzMmIzZDEwNzg5YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuvO++YAAA3PSURBVHja7FwJUBVHGn4+uVRAuQ9BBQ8ONbqEwhMMiokluhpQltUyionGaIxHylgVKxhX13Utk7BRcde4xKSyxIN4gBdqSoPgivHCRbwIEAG5BUGQm/1+982r9tnzeO8xHHGnq/56Mz09093f6/7/7/+7Z7q1tLQo5CRdUsoQyIDKgMqAykkGVAZUBlROMqAyoDKgcpIBbd9k1IXaYgJxgNhBrCAWkF6qfGNVmQZIPaQaUgUph5RAilT5nZ66dXJwhAAbCHGD2FN7DHwOdaIYkg3Jgjz5fwPUCTIC4toGELWBmwtJgxS87IA6Q3whjh1UXyHkCuThywZoT8hoyKBOmomZkEuQmpcBUHdIgMq4aE3V1dVGhw8fds/IyHDNz893Ki0tdXjy5IlNXV1dr2dWy8Tkqbm5+SNra+siZ2fnAk9Pz9ypU6dmOzo61urQDjJaSb6+vlls5pUrV34zgBIlGwMZ2lrB6OjoESkpKT4PHjzwfvr0qaVe1MDEpNrFxeWun5/ftQ8++OAqzptbueUWjVYA29TlAUUjhX+daM7rkL7aykdGRgYAyImPHz92kkSv9OxZNmrUqJ8++eSTHy0tLRu1FCVjdRrtrZMaVMkBRePMcDi1ubnZTqlUch++a9euVw4ePBhSWVnJBRLTutjOzi7PysqqrE+fPpU4f0rWGyqhB8C3KC8vt4E66Cv2RwDY8uDg4MNr165N1dLcMshxtLm2ywKq0pPTUlNTPTFKlmAKfjNt2rRc4WJjY2O3BQsWvHXnzp2xmjdCL/46cuTIK5MmTbr1xhtv5OtS2fnz5x3Onj3rff369VeLiooGa17v379/2ueff74Xv2LGqBRyTEqnQEpASWdOBZivrFmzZnVNTY0N6bePP/74CwL14sWLdgB5KUaVM3sT9N+tGTNmnImIiLjdlsoPHDjgHhcXF5SVlfUqm9+jR4+KVatW7QoJCckRuZUo1QlIc1cDdDzE+8SJE66bNm1aVV9fL1jm6unTpx88cuTInKamJhNW34WGhsatWLHimpRTZO/evZ7ffffd7IqKChc2f/78+buWL19+Q+S2DEhyVwKUqFGQcHLs2DHXzZs3q0HVTAMHDryye/fuvb17925oL4qxcOHC8Js3bwayee+8886OJUuW/EfklrMqt7VNqfunn34qhT8+lZ4lZAwZMqTSwcEhAxbcF8bJmC0cEBBwdM+ePfvNzMyaFe2YoEbSCwsLK+7evTtCyLt27ZofjF26l5dXBecWGtH3VQGYTh2hRI8G8C74+/v/Fbyyj/rf6969Hnp0K2uoeIn0LYyNZ2ZmZv+ysjIHjPQe1FZjY+NaWP4Sd3f3HPwx9yZPntyqSwmj5BsbG7uIaUNdQkLCGnt7+zpOcdKzpzsTUDIw03gX3kKCxzOOR8QFQ6V57euvv/ZCZyeC4L+iU4TFyekOQD0PNnFdWzmon7GHDh2ar260s/Pt+Pj4KJHixyH5nTXlSUeZa2Z+//33g9DgcKYDGXAfe5JRIsEIfJVUAqkGup6dnd3rvffem5+YmBgKFuCga+VwS23T0tJ8YQjdQI2yXF1da0RmSi6mu+nDhw8pVKioqqqyA5ctGT9+PA848tTudsYIJVI9nXcB03ELaJOVMCIB4GpNQyWMVABthGm5DL8W7DOMjIxq8Ufcw9QsBLl/TE4CLLdlSUmJPfz8IXjOc38krjeC4/5j6dKlN8UaPHHixA1wJhxV5RvOnDmzSsQwJhga+msLoFMg/TQzt2zZMhp8MEI4x8j729tvv53Bs/6kExsaGsyes3C9epVNmDDhFHjpVTc3t2pexQDVNCYmZiQAeV2THkHT/F1MBZw7d84RHHmDcD527NiEL7/88hin6APIqY4ElIzEXAVnTeq11177M01FOsa0vn/8+PFt7HVtlAqe0o/o4A/gqE26NmTlypXBycnJv2fz1q1b95c333yTS+Tnzp0bAcs/WjUL6pKSklZyAip0/i/IU0O8G0PSIN6933777RABTErLli3bp1mGjBFN9W7dujVrxAESQacO6AMmpaioqONz5szZzeZt3bp1BegadyVg/fr1cYwrbLpt27ZRIrgYFLs1FFA3XiaMQ4BwDHpDsco8XrnLly+7Y2Y8VzdI+HgavYY0ZvXq1VfDwsL+KZxDjfQEgZ/FKwtDWAXjpSb3GKEB+vSxPQAVViefSzBC3XNyctR0x8/PL4V3c21trRLWXN1ZjNRnI5JUAKkCQ0H96KOPLnt4eFxkSHwQprYFryyoVpI6OlJa6n779m1eDNZBoUNQXApAqaIXphN8dXeaQsJ5eHg41zBgio1mffpFixbtJIsvBajR0dGxZO2F8x07dgTyyoEN3CInQzg/evSoN8++8AZOewBqKzKN1eEz0JyHw4cP57l3itTU1DHCMaZe+uLFi2+RTpUCVKJAw4YNS2bUyCiReGkTKJmaa8IBEdOXdh0BqDUvs6CgoC9D5LlBBhBrs6KiooEML7zAGiopQJ05c6Z62ldXV9umpKTY88q5uLj8qo40w70VeZxVRwDK1UvwPtRAgy4Vi/jozrC+6iBKUFBQlqb1byuoMIQPwG/VHtPVq1e5yzCDBg3KZ4Dvo09fpQa0l4gb2JsZoSUiI7Q3M+3Kvby8KnmUSldQQeydyU/HPRNzc3N7qrhli7W1dT7jBPTm3Qt180g41vS6WuurtmTI3iau5QNV6SEc29jYcLfCgAmojZaZmVkVr4wqaPKFQP4FUCmPrp06dcoFBtDv/v37w9noP3SzPwD+E7moeLZ6hMKlNRHRt+poE4xkd336KjWgxrxMTGX1szDluLFOWNYmphOidYuBCip0KD4+fh7vHgIXbSAfXcGqFU0HgtdGlGnRp6/tQexffJBS2cyMVqXIqKhhRqs1bWzQBqrm9MfU/+MLI8LIqBYzIgf0aztNd019bmFhwY1AgeKp2wgnQ2x/VXNHjNAG3j9HhkAIdJSXl5uLeCmlDOhmly5dsps0aVKBriOVnQXwxPJCQ0OPBAcH/8KG7fLz82mpWb13ql+/fmUiI9qUGQxNWvra7iO0XoTbVTCdshUJ6xVDv6kN0enTp1vdVaI5Uhk9/ZDWhzRjoHFxcV6MW9syYcIE7uoAjJiaEpmamlZ3JqDcyi0tLcuF48LCQnsRtdAyYMCAdOEcIzRQlwoFUFkvKCsry4dn/eHWqhcLnZyc7omtyWdmZvZlQoYVIlXXdASgXOvs6OhYwNAj0cBCSEjITyzxpviprqCCjt1hjaAmpaIl5OLiYrXjEBgY+JPY8zCL1LFc0KxiffoqNaDlvExfX997wjEFfeHOWYoAmkO7RJiRpjNxx7R/bpedJk89efLkeGYaV1EUiquz6uuVANRDOPfw8MjUp69SA1oi4vL9wgYc9u3b5yP2gI0bN+6Gv59va2ubDT14VteKQbWMGQrWoAkq9OVlJuiyR+w5GMlesPLqlYIZM2Zk6NNXbcmQiD2R3fm8iFNYWNhiYSsMjUIYnc0KCRP+tOV5eXnD6Hjo0KEXQO59NNeo8NtENEjb/qhZs2YtycnJ+Z3KuP0KvctrJwHzjULPfU+GWvki3oUpU6ZcEI4fPXrUn1xDKQFlaRNGdxnPTcVvd21gkosKMEcK5+PGjbsgUtSgN0sMJfbZvMyFCxfeJh9dON++ffsfpAQU09SY4b0NhgRU1q1bFyLMLlr5/PDDD/+tTx/bC9BMMS8iKCgogbH2noYGi0V0qBFjoOr1DahQHoylP2NIz4IyNYp4SJkdCSitBnLXiyIjI1PQSLVHZG9vXyMhoMYMoI36RqmSk5M92PMNGzacFKkqT2HAimdbffk0sQtfffXVFujTfZs2bdro5+dXJhWgcFdNmGhVg76hv4iIiFT8wVm0Z5TW7+3s7Or07Vt7WHk20Xq4ZO8c0csLP//8s7ewQYze+gBbKBkzZkzau+++mw51sh4c95mhW7BgQfT777+fxpvWvB0q7F4qWijUsvuP3m2KN7QPbX3Xk4hzcFuBpE1isbGxs8rLy100r0EPe6Wnpwfs37+/oK6uzpwZoY2GxFNV9za30ifDo25txILoSU5bHkAR9507d67kgckmesGB3f+EkdegT+hPx+WUHEUbdt5JFQ9NURi46Z/2GrHbDPXyLkDg9YlS6QBqvaovis4GlBqcZMiNUVFRYYZWCl+91S07eoKaJBZJ62hAn8U4FP/b+K9zKiwsNIN+9Da0QjgQOsUqdQQ1QyHB/nopAaVE6+E6v/WblpZmo2XpQRdOqnPbxUClN1YU/9sHelEqEKQElCwnRY4e6VLYzc2tsi2VwZfXy2HQBJW2MoKPEkU6o5DoHSWpASVXjuKVtEe9VTJPu+DAMXMNqcfCwqLIEIdBAJV2BsJLigwMDIxRtVnRJQFVgUouW4Iu0z88PPwHQ+qYPXt2nKHtI1ATExOXA8w9qrYqujSgKlCJgpCffEtbOYpO+fj4nNHn2SNGjDinbR+9DilDqVQeE95Eljp1iQ8QrF27djI46Uw23vnCP69UNvv7+8d/9tlnJw1sx2/+AwTPsRxFK5/IuHHjhlVMTMy4zMxMb3rthQIhMBz15ubmpYMHD86YN2/exTYEWp59IgNgvmDIfquACkn+iEs7JfkzQ+2UzFU6Vv4QVjsk9lNttNmLIktmCv6n2og7VqmcCPlTbS9zkr/OKAMqAyoDKicZUBlQGVA5yYDKgMqAykkGtJ3TfwUYAH8U9UAYqNInAAAAAElFTkSuQmCC");
		$("#musicPlay").css("-webkit-animation","none");
		playFlag = 0;
	}
	pauseAllVideo();
	$(dom).attr("tag","playing");
	$(dom).attr("onclick","pausethisvideo(this,"+smid+")");
	$(dom).animate({opacity:"0"},1000);
	//$(dom).css("opacity","0");
	$(".auto_video_"+smid)[0].play();
}
function pausethisvideo(dom,smid){
	if(playFlag==0){
		if(isHo){
			hoBGM.play();
		}else{
			$("#show_audio")[0].play();
		}
		$("#musicPlay").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNzBmYzI1Ni05MTgyLWY4NDYtYjkzNi02MzJiM2QxMDc4OWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjQzQzE2RUU5MjA1MTFFN0E4ODlDMTA3NjEyQkZBNjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjQzQzE2RUQ5MjA1MTFFN0E4ODlDMTA3NjEyQkZBNjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE1ZmI5MzctY2EzNS0zNDRlLWIzMDAtMWVlZDFlY2ZkM2ExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY3MGZjMjU2LTkxODItZjg0Ni1iOTM2LTYzMmIzZDEwNzg5YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PntHAkYAAA0lSURBVHja7FwJUBVHGn7cKIeCXCKI4IGYGC2kQCNgVDxKdj1AXSpWomioJLrGqwxb5ebAxCOJWpRauutdrouoeKJolJSGgOuBB0TxIkBE5OahyH3t19k3Uy10P94xD9Sdrvrrvenpme7+pvv/v//vnjFqbW1VyEm6ZCxDIAMqAyoDKicZUBlQGVA5yYDKgMqAykkG1LDJ9BVqiznEGeIIsYPYQKxU+WaqMo2QBkg1pAqihJRCilX5XZ6Mujg4QgDrD/GEOJH26Hgf0okSSC4kB/Li/w3Q3pBhEHc9QFQHbj4kA1L4pgPqCvGDuHRSfUWQdMjTNw3Q7pCRkAFdNBOzIVcgNW8CoF6QYJVxUZuqq6tNjx8/7pWVleVeUFDQu6yszPnFixe96uvrrf6wWubmtdbW1hX29vbFrq6uhYMHD86fMmVKrouLS50G7SBGK8XPzy+HzkxPT39tACWUbBTkrY4Kbtu2bVhaWprv48ePh9TW1tpqRQ3Mzavd3Nwe+Pv73/zss89u4Lilg0vuktEKYJtfJ0AJzZkI6aOu0JdffhkMIMc9e/astyR6pXv38oCAgJ+/+OKLn2xtbZvUFCXG6jxArX8dALWETIE48Aps3779nSNHjoQ9f/6cCSSmdYmjo+MTOzu78p49ez7HcS2x3lAJ3QC+jVKp7AV10If3IACsMjQ09Hh0dPRVNe0sh5yB1L3KgBI9+ScemE1NTUbz5s378P79+++2PQe9+Pvw4cPTx48ff3fSpEkFmlR26dIl5+Tk5CG3bt0aUVxcPLDteQ8Pj4xNmzbtwy/PGJVBTkvpFEgJqLFqZLqyTl6+fNkRU3EhRtVL56H/7k6bNu1CZGTkPX0qP3z4sFdCQkJITk7OCDq/W7dulcuWLdseFhaWx7mUUKokSMurBmggZAjrBDrq9cMPPyxrbm42p/VdeHh4wpIlS25KOUX27ds3+MCBA7MqKyvd6Py5c+duX7x48W3OZVmQ1FcJUEKNQlgnTp8+7f7111//nc7r379/+o4dO/b16NGj0VAUY/78+RGZmZlj6byPPvpo6yeffPIr55Jkldva5dEmKxXPbJdu375tt3r16r/RecHBwScPHTq005BgkrRnz574qVOn/ovO27Vr11/Bc/txLglW9aXLRyihR8xGjhkzZg0ss2igJkyYcHjdunU/dXRDom9hbAZnZ2d7lJeXOzc0NHQjbTUzM6uD5S/18vLKw4N5iPt16FLCKPnFxcVFCccmJib1iYmJK52cnOoZxYmePd+VgLqqrHq79CESPJ7RooINDDwVGxt7Rt3N9u7d64POjgPBf0ejCEvv3vcB6iUQ+lvqyq1du/bdY8eOzRUb7ep679SpU7Gc4qSNBboCYgL9pg+gREdZt808ePDgADQ4QlSwXl7pu3fvjufdJDc31+rTTz+d++OPP4aDBThrWjncUoeMjAy/pKQkT1CjHHd3dyY9CgoKyr9586bF06dPSahQUVVV5QguW4qHzAKOeGoPumKEElL9Z6YyCg5eX1NTYye4hpjCy3k3OXr0qCem5SL46zZ0vqmpaR1G0kNMzSKQ+2fGxsatsNy2paWlTvDzB0ENvPQgcb4JHPefCxcuzOTVNW7cuBg4Ey6q8o0XLlxYxtHlibqG/vSJ2A9jZa5fv36kACZJCxYs2MW7AaFTKB/9koWzsiqH7j0HXnrD09OzmnUdQLWA0RkOQCYK9KilpcUUeYvgPPyDpwLAg7evXLkyRlXeDMeTNm/efJrTt8LOHKHESMxhsYT33ntvDZmK5L+zs/OjM2fObOAxgKioqLWoX7wHPKWf0MGj4KjNmjZk6dKloampqVPpvFWrVq2bMWMGk8jPmTMn8sGDByNVs6A+JSVlKSOgQo7/DantLNo0gHXt/v37BwlgkrRo0SKu3ly+fPlSGky4m/GgNYe1AZMkYujef//9HXTe999/vwQjkLkS8NVXXyVQrrDFhg0bAji46BS71RVQT1YmjIPIR0FvSKzyCSfKNEbQZSp6dXzNmjUXddU9eDg3Zs+evVs4bmxs7A4CP5NVdtCgQVUwXiK5xwgN1qaPhgBUWJ18KUFvmuTl5Yl0x9/fP411cV1dnTGs+Uya+mzcuPGcvmT4888/v+bt7X1ZOIZVD8HUtmGVBdVKEaMjZWVe9+7dY8VgnRUaBMWlAJRU1G46nThxwotMIeE4IiKCaRgwxUbSPn1MTMw+qbyjbdu2xRFrLxxv3bp1LKsc2MBdEHwxwnTy5ElWDMKINXAMASgzNHft2jUxfAaa83To0KGVrHJXr14dJfzH1Lvj6+urlApQQoHefvttMcgBXz6AEy9tBiUTuSYcEJ6+dOwMQO1ZmYWFhX0oT4QZZACxtiwuLu5P8cJfpPbhp0+fLk574vampaU5scq5ubn9Lvwn7i3ndnadAShTL8H7EIEGXSrh+OiusL4mwnFISEiO1IDCED6Gzy96TDdu3GAuwwwYMKCAAr6nNn2VmthbcdzAHtQILeWM0B7UtFP6+Pg81wc8EHvX69ev90PdlnBdrxDXE9yy1d7evkCI4MMJ6MG6FmUrhP9tva6O+io1oEzLB6rSTfjfq1cv5lYYMAHRaFlaWlbpAuK5c+fcYAD9Hz16NJSO/kM3BwHg1cRFxb3FEQqX1pyjb8VoE4ykiTZ9lRpQM1Ymcf3EAmZmzOUEWNZmqhNa133gwIFBIPIrWOcIuGgD8dEVtFoxMjJitoVuI8q0atNXQ/nyijbBiRaAJIxWY86oqKFGqz3Z2ADfvUmLKe7frgOmpnW4b1FYWFgime5t9bmNjQ0zAgWKJ7YRHhtvf1VLZwDayHpyxBAASLKErFAqldYcL6WMUhGWV65ccRw/frzGQQiM8CbKE3sSHh5+IjQ09Dc6bFdQUECWmkUvrG/fvuWcEW1BDYZmNX01uJVv4HC7SqpTDpywXgn0m2iIzp8//5Y2FdNT2cPD4wFZH2obA01ISPChYgStcGvzWffKz88XKZGFhUV1VwLKrNzW1lYk6EVFRU4ctdDar1+/O8IxRuhYbSqmjQcsM9NgwK0Nodzah7w1+ezs7D5UyLCSU2VNZwDKtM4uLi6FFD3iBhag636miTeJn2paMfSeKaU7201TsoRcUlIiOg5jx479mXcvzKK+oqdib1+iTV+lBpTpKvr5+T0U/pOgL9w5Ww6geWSXiHCck5PjrssIBaDtjNnZs2cDqWlcRaJQTJ3V0GAMQL2FY29v72xt+io1oKUcl+83OuAQHx/vy7vBN998swP+foGDg0Mu9GCyFoCaqRuh0JfXhP9RUVHclQKMZB+MdkvheNq0aVna9FVqK09eEGhtG3Eiu92gr34VtsJAP5L9S5dYNwgICChLTk5erW3F9AjFw2tnMMh6ElzKGEKD1O2PgjEMopyQ3zmBnFZVXzvFyjMrmjx5shjsqKio8CCuoZR+Ou08mJubM/nrxIkTn6oDE9a9e15e3nDhePTo0b+oGTgNnQEoSbmszPnz598jPrpwvGXLlr9ICSimqRnFe3XaebJq1aowYXaRlc8VK1b8R5s+GgrQbJ4XERISkkhZ+8Fkb5NUgNLuKkao1qOHtAXGMogypMkcT61F1cdOA5SsBvLWi9LQSNEjcnJyqpEQULOOpry6lJqa6k0fx8TEnOUUfaLQYcVTX1+evAfUl3Vi586d6/fv3+8XGBj4yN/fv1wqQOGumlPRKq2nfGRk5NXMzMwRxNefNWtWvKOjY72avik6G1BC5Ml7QC4Mn73q22+/1XoVk7y8cP369SHCBjHy1gc4a+moUaMyPv744zvQmw0UoFpPefDNqqSkpO/IQiGu5wU+ihR6vDCmb7SJEOdQfUce2SQWFxc3U6lUurU9Bz3sc+fOneBDhw4V1tfXW1OANulanxowhT4pugpQQk/yFJztjJqktjvjeKntCw4YvYbYX5qn0GPnnT5GiU5pCh03/V+8eNFFEzBZCYA2Swxmg6oviq4GlESfUnS5MDY2draulcJXlxrQFF4krbMB/SPGofjfxn+NU1FRkSX04xBdK4QDIeWUz1JIsL9eSkBJIuvhGr/1m5GR0UvN0oMmnFSqtheq2q541QAllpNEjio0Kezp6anXErKDg4MUDgNp6wWFRO8oSQ0oSeQ1P7JHvUMyT7gqOGa+LpXY2NgUS+AwVCgM8GqiIT7iQly2RE2mf0RExFFdKoCXk6BnGwl5T4QvXyt15w31VRxCQYiffFddIRKd8vX1vaDNjYcNG3ZR3T56DQ3QGfImsiE6/kp8gCA6OnoCOOl0Ot7Z7skbG7cEBQWd2rhx41k9HvJr/QGCl1iOooNPZJA993v27BmdnZ09hLz2QgIhpqamDdbW1mUDBw7M+uCDDy7roTf/+EQGwGxnyF5XQIUkf8TFQEn+zJCBkrVKx8ofwjJAoj/VRjZ7kc2ulgr2p9oId6xScUn5U21vcpK/zigDKgMqAyonGVAZUBlQOcmAyoDKgMpJBtTA6b8CDACdL33/sr+q0wAAAABJRU5ErkJggg==");
		$("#musicPlay").css("-webkit-animation","menurotate 3s infinite linear");
		playFlag = 1;
	}
	$(dom).attr("tag","pause");
	$(dom).attr("onclick","playthisvideo(this,"+smid+")");
	$(dom).animate({opacity:"1"},1000);
	//$(dom).css("opacity","1");
	$(".auto_video_"+smid)[0].pause();
}


/*******************************video************************************/
var VideoSprite = function(dom,nloadFirst){
	var u = navigator.userAgent;
	this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	this.theCon = dom;
	this.pause = true;
	var theSpices = this.theCon.attr('st_video_auto').split(',');
	this.loop = parseInt(theSpices[0]);
	this.loopStep = 0;
	this.speed = parseInt(theSpices[1]);
	this.imgsLength = parseInt(theSpices[2]);
	this.imgPath = this.theCon.attr('st_video_img_url');
	this.isok = true;
	if(!this.imgPath||this.imgPath==''||this.imgPath=='undefined'||this.imgPath=='null'){
		this.isok = false;
	}
	this.imgMp4Path = this.theCon.attr('st_video_mp4_url');
	this.nloadFirst = nloadFirst;
	if(!this.imgMp4Path){
		this.imgMp4Path = '';
	}
	this.playType = parseInt(theSpices[3]);
	this.imgType = theSpices[4];
	if(theSpices.length>5){
		this.delay = parseInt(theSpices[5]);
	}else{
		this.delay = 0;
	}
	this.delayStep = 0;
	this.playTypeRight = this.playType;
	this.playTypePlus = this.playType;
	if(this.playType==3){
		this.playType = 1;
	}else if(this.playType==4){
		this.playType = 2;
		this.playTypePlus = 3;
	}
	this.imgsCache = new Array();
	var theThis = this;
	if(!this.isAndroid&&this.imgMp4Path!=''){
		
	}else{
		for(var i = 0;i<theThis.imgsLength;i++){
			var img = new Image();
			img.src = theThis.imgPath+i+"."+theThis.imgType;
			theThis.imgsCache.push(img);
		}
	}
	this.sWidth = this.theCon.width();
	this.sHeight = this.theCon.height();
	this.videoIndex = 0;
	if(this.playType==2){
		this.videoIndex = this.imgsLength-1;
	}
	this.videoStep = 0;
	this.theVideo = null;
	if(this.isAndroid){
		var canvas = $("<canvas></canvas>").appendTo(this.theCon)[0];
		canvas.style.width = this.sWidth+'px';
		canvas.style.height = this.sHeight+'px';
		canvas.width = this.sWidth*2;
		canvas.height = this.sHeight*2;
		this.theVideo = canvas.getContext("2d");
		var theVideoTemp = this.theVideo;
		this.imgsCache[0].addEventListener('load',function(){
			if(!nloadFirst){
				theVideoTemp.drawImage(this,0,0,canvas.width,canvas.height);
			}
		}, false);
	}else{
		var canvas = $("<canvas aria-hidden='false'></canvas>").appendTo(this.theCon)[0];
		canvas.style.width = this.sWidth+'px';
		canvas.style.height = this.sHeight+'px';
		canvas.width = this.sWidth*2;
		canvas.height = this.sHeight*2;
		this.theVideo = canvas.getContext("2d");
		var theVideoTemp = this.theVideo;
		if(this.imgMp4Path!=''){
			var sssssloop = "";
			if(this.loop=='0'){sssssloop = " loop";}
			this.theMp4Video = $("<video src='"+this.imgMp4Path+"' preload='auto' aria-hidden='true' playsinline webkit-playsinline "+sssssloop+" style='display:none;'></video>").appendTo(this.theCon)[0];
			var theTempMp4Video = this.theMp4Video;
			if(this.loop!='0'){
				theTempMp4Video.addEventListener("ended",function(){
					theVideoTemp.pause = true;
				});
			}
		}else{
			this.imgsCache[0].addEventListener('load',function(){
				if(!nloadFirst){
					theVideoTemp.drawImage(this,0,0,canvas.width,canvas.height);
				}
			}, false);
		}
	}
};
VideoSprite.prototype = {
	play:function(callBack){
		var theProto = this;
		if(theProto.isok){
			if(theProto.isAndroid==false&&theProto.imgMp4Path!=''){
				if(this.pause){
					this.pause = false;
					this.theMp4Video.play();
					window.requestFrame(myanimate);
					function myanimate(){
						theProto.theVideo.drawImage(theProto.theMp4Video,0,0,theProto.sWidth*2,theProto.sHeight*2);
						if(!theProto.pause){
							window.requestFrame(myanimate);
						}
					}
				}
			}else{
				if(this.pause){
					this.pause = false;
					window.requestFrame(usanimate);
					function usanimate(){
						if(theProto.delayStep>=theProto.delay){
							if(theProto.videoStep>=theProto.speed){
								theProto.theVideo.clearRect(0,0,theProto.sWidth*2,theProto.sHeight*2);
								theProto.theVideo.drawImage(theProto.imgsCache[theProto.videoIndex],0,0,theProto.sWidth*2,theProto.sHeight*2);
								if(theProto.playType==1){
									theProto.videoIndex++;
									if(theProto.videoIndex>=theProto.imgsLength){
										theProto.loopStep++;
										if(theProto.loop!=0&&theProto.loopStep>=theProto.loop){
											theProto.restop();
											theProto.loopStep = 0;
											theProto.videoIndex--;
											if(callBack){
												callBack(theProto);
											}
										}else{
											if(theProto.playTypePlus==3){
												theProto.videoIndex--;
												theProto.playType = 2;
											}else{
												theProto.videoIndex = 0;
											}
										}
									}
									theProto.videoStep = 0;
								}else if(theProto.playType==2){
									theProto.videoIndex--;
									if(theProto.videoIndex<=-1){
										theProto.loopStep++;
										if(theProto.loop!=0&&theProto.loopStep>=theProto.loop){
											theProto.restop();
											theProto.loopStep = 0;
											theProto.videoIndex++;
											if(callBack){
												callBack(theProto);
											}
										}else{
											if(theProto.playTypePlus==3){
												theProto.videoIndex++;
												theProto.playType = 1;
											}else{
												theProto.videoIndex = theProto.imgsLength-1;
											}
										}
									}
									theProto.videoStep = 0;
								}
							}
							theProto.videoStep++;
						}
						theProto.delayStep++;
						if(!theProto.pause){
							window.requestFrame(usanimate);
						}
					}
				}
			}
		}
	},
	restop:function(callBack){
		if(this.isok){
			this.pause = true;
			if(this.isAndroid==false&&this.imgMp4Path!=''){
				if((!this.theMp4Video.ended)||(!this.theMp4Video.paused)){
					this.theMp4Video.pause();
				}
			}
			if(callBack){
				callBack(this);
			}
		}
	},
	stop:function(callBack){
		if(this.isok){
			this.pause = true;
			if(this.isAndroid==false&&this.imgMp4Path!=''){
				if((!this.theMp4Video.ended)||(!this.theMp4Video.paused)){
					this.theMp4Video.pause();
				}
			}
			if(this.loop>=0&&!this.nloadFirst){
				var thePro = this;
				setTimeout(function(){
					thePro.theVideo.drawImage(thePro.imgsCache[0],0,0,thePro.sWidth*2,thePro.sHeight*2);
				},1800);
			}
			if(callBack){
				callBack(this);
			}
		}
	},
	replay:function(callBack){
		if(this.isok){
			var playTypeRight = this.playTypeRight;
			if(playTypeRight==1||playTypeRight==3){
				this.videoIndex = 0;
				this.playType = 1;
			}else{
				this.videoIndex = this.imgsLength-1;
				this.playType = 2;
			}
			this.videoStep = 0;
			this.delayStep = 0;
			this.loopStep = 0;
			if(this.isAndroid==false&&this.imgMp4Path!=''){
				this.theMp4Video.currentTime = 0;
			}
			this.play(callBack);
		}
	},
	goPlay:function(callBack){
		this.playType = 1;
		this.play(callBack);
	},
	backPlay:function(callBack){
		this.playType = 2;
		this.play(callBack);
	}
};
/*******************************flowleaf************************************/

function myFlowLeaf(flows){
	var timeD = 3;
	if(flows&&flows!='null'&&flows!=''&&typeof(flows)!='undefined'){
		if(flows.indexOf('-')!=-1){
			var mms = flows.split("*");
			for(var i = 0;i < mms.length; i++){
				var mm = mms[i].split("-");
				var downup = false;
				if(mm.length==3){
					if(mm[2]=='1'){
						downup = true;
					}
				}
				if(mm.length==4){
					timeD = parseInt(mm[3]);
				}
				if(mm[1]=='a'){
					$("body").flowLeaf(
							['https://s.hunlihu.com/static/flows/'+mm[0]+'1.png','https://s.hunlihu.com/static/flows/'+mm[0]+'2.png','https://s.hunlihu.com/static/flows/'+mm[0]+'3.png'],
							{nos:12,time:10,timeD:timeD,scale:0.3,notroll:false,U3D:false,downup:downup}
					);
				}else{
					$("#page"+mm[1]).flowLeaf(
							['https://s.hunlihu.com/static/flows/'+mm[0]+'1.png','https://s.hunlihu.com/static/flows/'+mm[0]+'2.png','https://s.hunlihu.com/static/flows/'+mm[0]+'3.png'],
							{nos:12,time:10,timeD:timeD,scale:0.3,notroll:false,U3D:false,downup:downup}
					);
				}
			}
		}else{
			$("body").flowLeaf(
					['https://s.hunlihu.com/static/flows/'+flows+'1.png','https://s.hunlihu.com/static/flows/'+flows+'2.png','https://s.hunlihu.com/static/flows/'+flows+'3.png'],
					{nos:8,time:10,timeD:3,notroll:false,U3D:false,downup:false}
			);
		}
	}
}
jQuery.fn.flowLeaf = function(imgs,data){
	if(data){
		var nos = data.nos;
		var time = data.time;
		var timeD = data.timeD;
		var U3D = data.U3D;
		var notroll = data.notroll;
		var downup = data.downup;
	}
	if(!nos)nos = 15;
	if(!time)time = 10;
	if(!timeD)timeD = 1;
	if(timeD>=time)timeD = time;
	if(!notroll)notroll = false;
	if(!U3D)U3D = false;
	if(notroll)U3D = false;
	if(!downup)downup = false;
	
	var imgLength = imgs.length;
	var imgIndex = 0;
	var domBiLiWidth = 50;
	var screenWidthReal = 980;
	var realSheBeiWidth = $("body").width();
	var realBili = realSheBeiWidth/screenWidthReal;
	domBiLiWidth = Math.round(domBiLiWidth*realBili);
	var nosIndex = 0;
	var container = this;
	if(U3D){
		$(container).css("-webkit-perspective","500");
	}
	var intervalID = 
		setInterval(function(){
			if(imgIndex==imgLength){imgIndex=0;}
			var leftRandom = Math.round(Math.random()*screenWidth);
			if(screenWidth-leftRandom<domBiLiWidth){
				leftRandom = leftRandom - domBiLiWidth;
			}
			var leftRandom2 = Math.round(Math.random()*screenWidth);
			if(screenWidth-leftRandom2<domBiLiWidth){
				leftRandom2 = leftRandom2 - domBiLiWidth;
			}
			var randomTime = Math.random()*(time-timeD)+timeD;
			
			var rotateBigin = "";
			var rotateStop = "";
			if(!notroll){
				rotateBigin = " rotate(0deg)";
				rotateStop = " rotate(720deg)";
			}
			if(U3D){
				rotateBigin = rotateBigin + " rotateX(0deg) rotateY(0deg)";
				rotateStop = rotateStop + " rotateX(720deg) rotateY(720deg)";
			}
			
			var topBegin = "-"+domBiLiWidth*2+"px";
			var topStop = (screenHeight-domBiLiWidth)+"px";
			if(downup){
				topBegin = screenHeight+domBiLiWidth+"px";
				topStop = "-"+domBiLiWidth+"px";
			}
			
			var conID = $(container).attr("id");
			$("head").append("<style type=\"text/css\">@-webkit-keyframes myflowUpDownK"+nosIndex+conID+imgs[imgIndex].replace('https://s.hunlihu.com/static/flows/','').replace('.png','')+"{"+
					"0%{-webkit-transform:translate("+leftRandom+"px,"+topBegin+")"+rotateBigin+";}"+
					"100%{-webkit-transform:translate("+leftRandom2+"px,"+topStop+")"+rotateStop+";}"+
					"} "+
					".myflowUpDown"+nosIndex+conID+imgs[imgIndex].replace('https://s.hunlihu.com/static/flows/','').replace('.png','')+"{"+
						"-webkit-animation: myflowUpDownK"+nosIndex+conID+imgs[imgIndex].replace('https://s.hunlihu.com/static/flows/','').replace('.png','')+" "+randomTime+"s infinite;-webkit-animation-timing-function:linear;-webkit-animation-fill-mode:backwards;-webkit-animation-delay:"+(nosIndex*0.3)+"s;"+
					"}"+
				"</style>");
			var img = $("<img class=\"myflowUpDown"+nosIndex+conID+imgs[imgIndex].replace('https://s.hunlihu.com/static/flows/','').replace('.png','')+"\" src=\""
						+imgs[imgIndex]+"\" style=\"z-index:2147483642;position:fixed;" +
						"-webkit-transform:translate("+leftRandom+"px,"+topBegin+");top:0;left:0;width:"+(domBiLiWidth+8)+"px;\">").prependTo(container);
			imgIndex++;
			nosIndex++;
			if(nosIndex==nos){
				clearInterval(intervalID);
			}
		},800);
};


/*******************************imgs seri************************************/
var theanimgsno = 0;
function dealImgsUrl(dom){
	var laz_y_imgs_url = dom.attr("laz_y_imgs_url");
	if(laz_y_imgs_url){
		dom[0].onload = function(){
			var left = (screenWidth-dom.width())/2;
			var top = (screenHeight-dom.height())/2;
			dom.css('left',left+"px");
			dom.css('top',top+"px");
        }
		dom.attr("src",laz_y_imgs_url);
		dom.removeAttr("laz_y_imgs_url");
	}
	dom.css('-webkit-animation','slidimg_'+theanimgsno+' 7.9s both');
	theanimgsno++;
	if(theanimgsno>5){
		theanimgsno = 0;
	}
}

var ImgsSprite = function(dom){
	this.theCon = dom;
	this.sWidth = this.theCon.width();
	this.sHeight = this.theCon.height();
	this.auto = false;
	
	var st_imgs_auto = this.theCon.attr("st_imgs_auto");
	
	if(!st_imgs_auto||st_imgs_auto==''){
		return;
	}
	var sss = st_imgs_auto.split(",");
	if(sss.length!=3){
		return;
	}
	this.changType = sss[2];
	this.changTime = parseFloat(sss[1]);
	if(sss[0]=='1'){
		this.auto = true;
	}else{
		dom.append("<div class=\"imgleft\" style=\"width:18px;height:30px;position:absolute;z-index:2147483639;margin-top:"+(dom.height()-30)/2+"px;margin-left:2px;background-image: url('img/left2.png');background-size:100% 100%;\"></div>");
		dom.append("<div class=\"imgright\" style=\"width:18px;height:30px;position:absolute;z-index:2147483639;margin-top:"+(dom.height()-30)/2+"px;margin-left:"+(dom.width()-18)+"px;background-image: url('img/right2.png');background-size:100% 100%;\"></div>");
	}
	var imgs = dom.find("img");
	imgs.css("z-index","1");
	if(this.changType=='autoplay'){
		imgs.hide();
	}
	if(imgs.length<2){
		return;
	}
	var firstImg = $(imgs[0]);
	var secondImg = $(imgs[1]);
	if(this.changType=='autoplay'){
		dealImgsUrl(firstImg);
	}
	if(!this.auto){
		if(this.changType=='change'){
			var lock = 0;
			imgs.on("swipeleft",function(){
				  if(lock==0){
					  lock = 1;
					  var tempImg = this;
					  $(this).css("-webkit-animation","slideImgLeft 0.4s both");
					  setTimeout(function(){
						  $(tempImg).css("-webkit-animation","");
						  dom.prepend($(tempImg));
						  lock = 0;
					  },400);
				  }
			});
			imgs.on("swiperight",function(){
				 if(lock==0){
					  lock = 1;
					  var tempImg = this;
					  $(this).css("-webkit-animation","slideImgRight 0.4s both");
					  setTimeout(function(){
						  $(tempImg).css("-webkit-animation","");
						  dom.prepend($(tempImg));
						  lock = 0;
					  },400);
				 }
			});
		}
	}else{
		if(this.changType=='change'){
			var htmls = "<div style='position:absolute;z-index:2147483639;margin-top:5px;margin-left:0px;width:100%;height:10px;'>";
			for(var i=0;i<imgs.length;i++){
				htmls = htmls + "<img class='rightradio' style='width:8px;height:8px;margin-left:5px;border-radius:100%;background-color:#999999;'/>"
			}
			htmls = htmls + "</div>";
			dom.append(htmls);
			var rightradio = dom.find(".rightradio");
			var rightradioIndex = 0;
			$(rightradio[rightradioIndex]).css("background-color","white");
			this.rightradio = rightradio;
		}
		firstImg.css("z-index","3");
		secondImg.css("z-index","2");
	}
	var imgsCache = new Array();
	imgs.each(function(){
		var timg = $(this);
		imgsCache.push(timg);
	});
	//TODO:注释掉该行可以保存时不报错 
//	this.imgsCache = imgsCache;
	this.index = 0;
	this.size = imgsCache.length;
	this.interId = null;
	this.rightImg = firstImg;
}
ImgsSprite.prototype = {
	play:function(){
		var $this = this;
		var auto = this.auto;
		var changType = this.changType;
		var changTime = this.changTime;
		if(auto){
			if(changType=='change'){
				var interId = setInterval(function(){
					var rightImg = $this.rightImg;
					var nextImg = $this.getNextImg();
					rightImg.css("z-index","3");
					nextImg.css("z-index","2");
					rightImg[0].addEventListener("webkitAnimationEnd",function(){
						nextImg.css("z-index","3");
						rightImg.css("z-index","1");
						rightImg.attr("class","sildeimg");
					});
					$this.rightradio.css("background-color","#999999");
					$($this.rightradio[$this.index]).css("background-color","white");
					rightImg.attr("class","sildeimg slideimgan_1");
					$this.rightImg = nextImg;
				},changTime*1000);
				this.interId = interId;
			}else if(changType=='play'){
				var interId = setInterval(function(){
					var rightImg = $this.rightImg;
					var nextImg = $this.getNextImg();
					nextImg.css("z-index","3");
					rightImg.css("z-index","1");
					$this.rightImg = nextImg;
				},changTime*1000);
				this.interId = interId;
			}else if(changType=='autoplay'){
				var rightImg = $this.rightImg;
				rightImg.show();
				var interId = setInterval(function(){
					rightImg = $this.rightImg;
					rightImg.hide();
					var nextImg = $this.getNextImg();
					dealImgsUrl(nextImg);
					nextImg.show();
					$this.rightImg = nextImg;
				},changTime*1000);
				this.interId = interId;
			}
		}
	},
	stop:function(){
		var interId = this.interId;
		if(interId){
			clearInterval(interId);
		}
	},
	getNextImg:function(){
		this.index = this.index + 1;
		if(this.index>=this.size){
			this.index = 0;
		}
		var index = this.index;
		return this.imgsCache[index];
	}
}
