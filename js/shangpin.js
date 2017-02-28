			var mySwiper;
		   //选项卡-----------------------------------------
		   $(".btn").on("click",function(){
		   	   //先清除
		   	   $(".btn").css("border-top","0px solid #E4366B")
		   	   	      .css("box-shadow","0px 0px 0px #333");
		   	   	      
		   	   $(".dvBox div").css("display","none");	  
		   	   
		   	   //后变化	      
		   	   $(this).css("border-top","4px solid #E4366B")
		   	   	      .css("box-shadow","1px 1px 5px #333");
		   	   	      
		   	   var idx= $(this).index();
//			
		   	   $(".dvBox div").eq(idx).css("display","block");
		   	   	
		   });
		   $(".s1").on("click",function(){
		   	   window.location.href='shouye.html';
		   })
		   
		   //获取地址栏goodID的方法-----------------------------------------------
		   function getUrlParam(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)($|&)");
				var strArr = window.location.search.substr(1).match(reg);
				if(strArr != null) return unescape(strArr[2]);
				return null;
			} 
			//获取地址栏上的goodsID
		    var dataOb={
	      		"goodsID":getUrlParam('goodsID'),
	        }
			console.log(dataOb.goodsID)
			
            //发送AJAX请求-----------------------------------------------
            $.ajax({
				type: 'GET',
				url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
				data:dataOb,
				dataType: 'JSONP',
				beforeSend: function(XMLHttpRequest) {

					$(".secendeLi").html("<img class='loading2' src='img/4.gif' />");
				},
				success: function(data) {
					
					$(".loading2").remove();
					
//					console.log(data);
//					console.log(typeof data);
//					console.log(data.length);
//					console.log(data[0].goodsBenUrl);
//					console.log(typeof data[0].goodsBenUrl);

					//便利返回的数组
					$(data).each(function(i, ob){
					
					    //创建图片
						var goodImg="<img src='"+this.goodsListImg+"'class='goodImg'>";
						$(".dv1").append(goodImg);
					   
					   //创建盒子
					   var box="<p class='box'></p>"
					   $(".dv1").append(box);
					   
					   //创建实际价格
					   if(this.discount != 0) {
							var goodmoney = "<span class='goodmoney'>￥" + parseInt(this.price * this.discount / 10) + "</span>"
							$('.box:last').append(goodmoney);
						} else {
							var goodmoney = "<span class='goodmoney'>￥" + this.price + "</span>"
							$('.box:last').append(goodmoney);
						}
					    //商品名称
						var goodName = "<p class='goodName'>" + this.goodsName + "</p>"
						$('.box:last').append(goodName);
	        			//内容盒子
	        			var neirong="<p class='neirong'></p>";
	        			$(".dv1").append(neirong);
	        			//市场价
	        			var shichangjia="<span class='shichangjia'>市场价  <del>" + this.price + "</del></span>"
	        			$(".neirong:last").append(shichangjia);
	        			
	        			//折扣
	        			var goodDiscount="<span class='goodDiscount'>" + this.discount + "折</span>"
	        			$(".neirong:last").append(goodDiscount);
	        			//购买量
	        			var gooodNum="<span class='gooodNum'>" + this.buynumber + "人购买</span>"
	        			$(".neirong:last").append(gooodNum);
					   
					   
					   
					   //=======详情===================
					    //创建图片
						var goodImg2="<img src='"+this.goodsListImg+"'class='goodImg2'>";
						$(".dv2").append(goodImg2);
//						
					   
					   	 var miaoshu2="<p class='miaoshu2' >"+this.detail+"</p>";
						$(".dv2").append(miaoshu2);
					 
					 //============商品实拍================
					 var dataImg=JSON.parse(this.goodsBenUrl);
						    console.log( dataImg)
					    $("#bb").click(function(){
					    	
							$(dataImg).each(function(i){
								 //2.创建盒子
								var banner_dv = "<section class='banner_dv swiper-slide'></section>";
								$('.swiper-wrapper').append(banner_dv);
								
								//3.创建详情图
								var banner = "<img class='banner' src='" + this + "'/>";
								$('.banner_dv:last').append(banner);
							})
							
							//配置Swiper
							mySwiper = new Swiper('.cusSwiper1', {
								autoHeight: true, //高度自适应
								//分页器
								pagination: '.swiper-pagination',
								//是否能循环
								loop: true,
								//自动播放
	//							autoplay: 2000,
								//每隔一秒轮播一张
								speed: 1000,
								//滑动后又可以自动轮播
								autoplayDisableOnInteraction: false,
		
							})
					    });
						
					});
                      
					

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("XMLHttpRequest==" + XMLHttpRequest);
					console.log("textStatus==" + XMLHttpRequest);
					console.log("errorThrown==" + errorThrown);
				},

			})