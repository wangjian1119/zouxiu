
           //配置IScroll
	    		var myScroll = new IScroll('#wrapper',{
					 horizontal:true,
					 vScrollbar : true, 
	    		 	 scrollbars: false,
	    		 	 
	    		 	 bounce:true,//到顶-底部之后反弹
	    		 	 click:true,
	    		 	 tap:true,
	    		 	 scrollX: true, 
					 scrollY: false,
					 mouseWheel: true,
	    		 	 probeType:2,//为了实现滚动中的状态的监听1 比较慢2比较快
				});
//				console.dir(myScroll.options);
				//阻止冒泡事件 此代码必须添加
				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				//---------------------------
				var myScroll = new IScroll('#wrapper1',{
					 horizontal:true,
					 vScrollbar : true,  
					 mouseWheel: false,
	    		 	 scrollbars: false,
	    		 	 //到顶-底部之后不反弹
	    		 	 bounce:true,
	    		 	 click:true,
	    		 	 tap:true,
	    		 	 probeType:2,//为了实现滚动中的状态的监听1 比较慢2比较快
				});
//				console.dir(myScroll.options);
				//阻止冒泡事件 此代码必须添加
				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				
				
	    	//-----上部分字体图标的ajax请求-----------------------------
	    	$.ajax({
	    		type:'GET',
	    		url:'http://datainfo.duapp.com/shopdata/getclass.php',
	    		success:function(data){
	    			
	    			var data=JSON.parse(data);
	    			console.log(data);
	    			$(data).each(function(i){
	    				
//					   console.log("获取商品的  classID "+data[1].classID);
	    				var font_li="<li class='font_li' ></li>";
	    				$(".scroller_uu").append(font_li);
	    				
	    				var font="<span class='font iconfont' classID='"+this.classID+"'>"+this.icon+"</span>";
	    				$(".font_li:last").append(font);
//	    				myScroll.refresh(); 
                       
                       if(i==0){
                       	$(".font").css("color","#fff");	
                       }

	    			})
	    			
	    			
	    		},
	    		error:function(XMLHttpRequest,textStatus,errorThrown){
	    			console.log("XMLHttpRequest=="+XMLHttpRequest);
	    			console.log("textStatus=="+XMLHttpRequest);
	    			console.log("errorThrown=="+errorThrown);
	    		}
	    		
	    	});  //ajax请求结束	
	    	
	    	//分类的点击事件
	    	$(document).on("click",".font",function(){
	    		
	    		            //先清空
	    		            $(".font").css("color","#00");
		    		        if($(".goodli")){
		    		           	 $(".goodli").remove();
		    		           }
	    		            //再变色
	    					$(this).css("color","#fff");
	    					
	    					
	    					//找编号
	    					var idx=$(this).attr("classID");
	    					
	    					var idxOb={ "classID":idx};
	    					console.log("字体图标编号 idx："+idx+" : "+"存入对象idxOb.classID "+idxOb.tmpIdx);
	    					//向服务器端请求
	    					$.ajax({
					    		type:'GET',
					    		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
					    		data:idxOb,//需要传的参数
					    		dataType:'JSONP',
					    		beforeSend:function(XMLHttpRequest){ 
						              
						              $(".scroller_uu1").html("<img class='loading2' src='img/4.gif' style='width: 80%;height: 40%; margin-left:5%;' />"); 
						         }, 
						    	success:function(data){
						    		
						    		$(".loading2").remove();
						    		
					    			if(data.length>0){
					    				$(data).each(function(){
					    				
					    				var  goodli="<li class='goodli'></li>";
					    				$(".scroller_uu1").append(goodli);
					    				
					    				
					    				//创建盒子
					    				var  goodBox="<div class='goodBox'></div>";
					    				$(".goodli:last").append(goodBox);
					    				//创建图片
					    				var goodImg="<img class='goodImg' src='"+this.goodsListImg+"' goodID='"+this.goodsID+"'/>"
					    				$(".goodBox:last").append(goodImg);
					    				
					    				 //商品名称
					    			    var goodName="<p class='goodName'>"+this.goodsName+"</p>"
					    			    $('.goodBox:last').append(goodName);
					    			  
					    			    //商品实际价格
					    			    if(this.discount!=0){
						    			   	 var goodmoney="<span class='goodmoney'>￥"+parseInt(this.price*(this.discount/10))+"</span>"
						    			     $('.goodBox:last').append(goodmoney);
					    			    }else{
					    			   	     var goodmoney="<span class='goodmoney'>￥"+this.price+"</span>"
						    			     $('.goodBox:last').append(goodmoney);
					    			    }
					    			    //商品原价格
					    			    var goodPrice="<span class='goodPrice'>"+this.price+"</span>"
					    			    $('.goodBox:last').append(goodPrice);
					    				
					    				
					    				
					    			})
					    			}else{
					    				$(".loading2").remove(); 
					    			  var  goodli="<li class='goodli' style='width: 100%;text-align: center;margin-left: -0.36rem;margin-top: 50px;'>此分类暂时无商品</li>";
					    			  $(".scroller_uu1").append(goodli);
					    			}
					    			
					    			
					    			
					    			
					    			
					    			
					    		},
					    		error:function(XMLHttpRequest,textStatus,errorThrown){
					    			console.log("XMLHttpRequest=="+XMLHttpRequest);
					    			console.log("textStatus=="+XMLHttpRequest);
					    			console.log("errorThrown=="+errorThrown);
					    		}
					    		
					    	});//ajax获取结束
	    					
	    					
	    					
	    				});//点击事件结束
	    	//页面初始化------------------------			
	    	
            var idxOb={ "classID":1};
	    					//向服务器端请求
	    					$.ajax({
					    		type:'GET',
					    		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
					    		data:idxOb,//需要传的参数
					    		dataType:'JSONP',
					    		beforeSend:function(XMLHttpRequest){ 
						              
						              $(".scroller_uu1").html("<img class='loading2' src='img/4.gif' style='width: 80%;height: 40%; margin-left:10px;' />"); 
						         }, 
						    	success:function(data){
						    		
						    		$(".loading2").remove(); 
//						    		console.log( "data类型"+typeof data);
//					    			console.log(data);
//					    			console.log("获取商品的  classID "+data[1].classID);
//					    			
					    			if(data.length>0){
					    				$(data).each(function(){
					    				
					    				var  goodli="<li class='goodli'></li>";
					    				$(".scroller_uu1").append(goodli);
					    				//创建盒子
					    				var  goodBox="<div class='goodBox'></div>";
					    				$(".goodli:last").append(goodBox);
					    				//创建图片
					    				var goodImg="<img class='goodImg' src='"+this.goodsListImg+"' goodID='"+this.goodsID+"'/>"
					    				$(".goodBox:last").append(goodImg);
					    				
					    				 //商品名称
					    			    var goodName="<p class='goodName'>"+this.goodsName+"</p>"
					    			    $('.goodBox:last').append(goodName);
					    			  
					    			    //商品实际价格
					    			    if(this.discount!=0){
						    			   	 var goodmoney="<span class='goodmoney'>￥"+parseInt(this.price*(this.discount/10))+"</span>"
						    			     $('.goodBox:last').append(goodmoney);
					    			    }else{
					    			   	     var goodmoney="<span class='goodmoney'>￥"+this.price+"</span>"
						    			     $('.goodBox:last').append(goodmoney);
					    			    }
					    			    //商品价格
					    			    var goodPrice="<span class='goodPrice'>"+this.price+"</span>"
					    			    $('.goodBox:last').append(goodPrice);
					    				
					    				
					    				
					    			})
					    			}else{
					    			  $(".loading2").remove(); 
					    			  var  goodli="<li class='goodli' style='width: 100%;text-align: center;margin-left: -0.36rem;margin-left:50px;'>此分类暂时无商品</li>";
					    			  $(".scroller_uu1").append(goodli);
					    			}
					    			
					    			
					    			
					    			
					    			
					    			
					    		},
					    		error:function(XMLHttpRequest,textStatus,errorThrown){
					    			console.log("XMLHttpRequest=="+XMLHttpRequest);
					    			console.log("textStatus=="+XMLHttpRequest);
					    			console.log("errorThrown=="+errorThrown);
					    		}
					    		
					    	});//ajax获取结束
		 //商品图片点击引入商品详情-------------------------------------
			$(document).on("tap",".goodImg",function(){

				var tmpGoodId = $(this).attr("goodId");
				
                window.location.href="shangpin.html?goodsID="+tmpGoodId+"";
                
			});		