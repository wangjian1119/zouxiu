 var mySwiper;
		
			$(".footer_a").on("click", function() {
					$(".footer_a").css("border-top", "4px solid #484850");
					$(this).css("border-top", "4px solid #E4366B");
				})
			
			
	      //banner图-----------------------------------------------
			$.ajax({
				type: 'GET',
				url: 'http://datainfo.duapp.com/shopdata/getBanner.php',
				dataType: 'JSONP', //格式
				success: function(data) {
					
					//便利返回的数组
					$(data).each(function(i,ob){

						//1.转化代码串
						var srcArray = JSON.parse(data[i].goodsBenUrl);
						
						//2.创建盒子
						var banner_dv = "<div class='swiper-slide banner_dv'></div>";
						$('.swiper-wrapper').append(banner_dv);
						//3.创建banner图
						var banner = "<img class='banner' src='" + srcArray[0] + "' goodId='" + this.goodID + "'/>";
						$('.banner_dv:last').append(banner);

					});

					//配置Swiper
	    			 var mySwiper=new Swiper('.cusSwiper1',{
	    			 	    //分页器
						 	pagination:'.swiper-pagination',
						 	//是否能循环
						 	loop:true,
						 	//自动播放
						 	autoplay:3000,
						 	//每隔一秒轮播一张
						 	speed:1000,
						 	//滑动后又可以自动轮播
						 	autoplayDisableOnInteraction:false,
						 })


				}

			});
			$.ajax({
				type: 'GET',
				url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
				dataType: 'JSONP', //
				beforeSend: function(XMLHttpRequest) {

					$(".secendeLi").html("<img class='loading2' src='img/4.gif' />");
				},
				success: function(data) {
					
					$(".loading2").remove();
					
					console.log(data);
					console.log(typeof data);
					console.log(data.length);
					console.log(data[0]);

					//便利返回的数组
					$(data).each(function(i, ob) {

						//	    			 	
						var goodBox = "<div class='goodBox' goodId='" + this.goodsID + "'></div>";
						$('.secendeLi').append(goodBox);
						//3.创建商品图片
						var goodImg = "<img class='goodImg' src='" + this.goodsListImg + "' goodId='" + this.goodsID + "'/>";
						$('.goodBox:last').append(goodImg);
						//4.商品介绍盒子
						var goodDiv = "<div class='goodDiv' ></div>";
						$('.goodBox:last').append(goodDiv);
						//5.商品名称
						var goodName = "<p class='goodName'>" + this.goodsName + "</p>"
						$('.goodDiv:last').append(goodName);

						//7.商品实际价格
						if(this.discount != 0) {
							var goodmoney = "<span class='goodmoney'>￥" + parseInt(this.price * this.discount / 10) + "</span>"
							$('.goodDiv:last').append(goodmoney);
						} else {
							var goodmoney = "<span class='goodmoney'>￥" + this.price + "</span>"
							$('.goodDiv:last').append(goodmoney);
						}
						//6.商品价格
						var goodPrice = "<span class='goodPrice'>￥" + this.price + "</span>"
						$('.goodDiv:last').append(goodPrice);

						//8.商品折扣
						var goodDiscount = "<span class='goodDiscount'>" + this.discount + "折</span>"
						$('.goodDiv:last').append(goodDiscount);

						//9.购物车g
						var goodBtn = "<span class='goodBtn iconfont' goodId='"+this.goodsID+"' >&#xe61b;</span>";
						$('.goodDiv:last').append(goodBtn);

					});
					//配置IScroll
					var myScroll = new IScroll('#wrapper', {
						horizontal: true,
						vScrollbar: true,
						mouseWheel: false,
						scrollbars: false,
						//到顶-底部之后不反弹
						bounce: true,
						click: true,
						tap: true,
						probeType: 2, //为了实现滚动中的状态的监听1 比较慢2比较快
					});
					//				console.dir(myScroll.options);
					//阻止冒泡事件 此代码必须添加
					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("XMLHttpRequest==" + XMLHttpRequest);
					console.log("textStatus==" + XMLHttpRequest);
					console.log("errorThrown==" + errorThrown);
				},

			})
             
            //商品图片点击引入商品详情-------------------------------------
			$(document).on("tap",".goodImg",function(){

				var tmpGoodId = $(this).attr("goodId");
				
                window.location.href="shangpin.html?goodsID="+tmpGoodId+"";
                
			});
			//商品名称点击引入商品详情-------------------------------------
			$(document).on("tap",".goodName",function(){

				var tmpGoodId = $(this).attr("goodId");
				
                window.location.href="shangpin.html?goodsID="+tmpGoodId+"";
                
			});
			
			var count=1;
			//购物车点击事件-------------------------------------
			$(document).on("click",".goodBtn",function(){
              
				//先判断用户是否登陆
				if(!localStorage.getItem("loginDataJSON")){
				  
					var btn_dv = "<div class='btn_dv'></div>";
					$(".container").append(btn_dv);
					var go_font = "<p class='go_font'>您的账号未登陆,无法添加购物车<p>";
					$(".btn_dv").append(go_font);
					var go_btn = "<button class='go_btn'>去登陆</button>";
					$(".btn_dv").append(go_btn);
					
					$(document).on('click', '.go_btn', function(){
									window.location.href='denglu.html'
					});
					
				
				}
				
				//获取用户名
				var tmpUserOb=localStorage.getItem("loginDataJSON");
				tmpUserOb = eval("("+tmpUserOb+")");
				var user=tmpUserOb.userID;
				
				var tmpGoodId = $(this).attr("goodId");
				
				//2.将对象存入本地--------判断本地存储是否有内容
    			if(localStorage.getItem("cart")){
    				//从本地获取
    				var tmpArray = localStorage.getItem("cart");
    				var same=false;
    				//将字符串转换
    				tmpArray = eval("("+tmpArray+")");
    				
    				$(tmpArray).each(function(){
    					if(this.goodId==tmpGoodId){
    					   this.number=this.number+1;
    					   same=true;
    					   tmpJson={
		    					"goodsID":tmpGoodId,
		    					"userID":user,
		    					"number":this.number
		    				}
    					    getMyAjax(tmpJson);
	    				}
    				});
    				if (!same){
    					 
						 //创建新对象
	    				 var goodOb={"goodId":tmpGoodId,"number":1};
	    				 tmpArray.push(goodOb);
	    				 tmpJson={
	    					"goodsID":tmpGoodId,
	    					"userID":user,
	    					"number":1
    				     }
	    				 getMyAjax(tmpJson);
	    				 
    				}
    				
    				
    				//js代码转化为字符串  存入本地
    				tmpArray = JSON.stringify(tmpArray);
    				localStorage.setItem("cart",tmpArray);
//  				alert(localStorage.getItem("cart"))
    				
    				
			    	
    				
    				
    				
    			}else{
 
    				//创建数组
    				var tmpArray=[];
    				var goodOb={"goodId":tmpGoodId,"number":1};
    				tmpArray.push(goodOb);
    				//转化为字符串存入本地
    				tmpArray = JSON.stringify(tmpArray)
    				localStorage.setItem("cart",tmpArray);
    				
    				var tmpJson={
    					"goodsID":tmpGoodId,
    					"userID":user,
    					"number":1
    				}
    			   getMyAjax(tmpJson);
    			}
    			
    			
    			
    			
    			
    			
			});
			
			//购物车更新函数---------------------
			function getMyAjax(dataJSON){
				$.ajax({
//					alert("进去购物车更新函数-")
			    		type:'POST',
			    		url:'http://datainfo.duapp.com/shopdata/updatecar.php',
			    		data:dataJSON,//需要传的参数
			    		success:function(data){
			    			if(data==0){
			    				console.log("购物车更新失败");
			    			}else if(data==1){
			    				console.log("购物车更新成功");
			    			}
			    			
			    		},
			    		error:function(XMLHttpRequest,textStatus,errorThrown){
			    			console.log("XMLHttpRequest=="+XMLHttpRequest);
			    			console.log("textStatus=="+XMLHttpRequest);
			    			console.log("errorThrown=="+errorThrown);
			    		}
			    	})	
			}
			
			function getUrlParam(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)($|&)");
				var strArr = window.location.search.substr(1).match(reg);
				if(strArr != null) return unescape(strArr[2]);
				return null;
			}
			
			
			