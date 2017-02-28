
		   //清空本地存储~~~
		   localStorage.removeItem('cart');
		   
		   var ht="<div>";
	    	   ht+="<p id='pp1'>您的购物车什么都没有了~</p>";
	    	   ht+="</div>";
	    	   $(".container").append(ht);
		
		   $(".footer_a").on("click",function(){
		   	  $(".footer_a").css("border-top","4px solid #484850");
		   	   $(this).css("border-top","4px solid #E4366B");
		   })
		   
		   $(".s1").on("click",function(){
		   	   window.location.href='shouye.html';
		   })
		   
		   //1.获取用户名--------------------------------------------------------
		   var tmpUserOb=localStorage.getItem("loginDataJSON");
		   tmpUserOb = eval("("+tmpUserOb+")");
		   var user=tmpUserOb.userID;
		   var dataJSON={"userID":user};
		   
		    //2.从服务器端获取购物车信息------------------------------------------
		   $.ajax({
	    		type:'POST',
	    		url:'http://datainfo.duapp.com/shopdata/getCar.php',
	    		data:dataJSON,//需要传的参数
	    		dataType: 'JSONP',//数据格式
	    		success:function(data){
	    			if(data==0){
	    				var ht="<div>";
	    					ht+="<p id='pp1'>您的购物车什么都没有了~</p>";
	    				    ht+="</div>";
	    				$(".container").append(ht);    
	    			}else if(data){
	    				var money=0;
	    				var shu=0;
	    				
	    				var ht="<div class='zong'>";
		    				ht+="<span>商品数量<span class='sliang'></span></span>";
		    				ht+="<span>应付总额<span id='zongjia'></span>元</span>";
		    				ht+="</div>";
	    				   
	    				$(data).each(function(i){
	    					ht+="<div class='good_dv'>";
	    					ht+="<img class='goodImg' src='"+data[i].goodsListImg+"'/>";
	    					ht+="<div class='dv_right'>";
	    					ht+="<span class='iconfont shanchu' goodID='"+this.goodsID+"' >&#xe68d;</span>";
	    					ht+="<p class='goodName'>"+this.goodsName+"</p>";
	    					if(this.discount==0){
	    						ht+="<p class='goodMoney'>单价：<span>"+parseInt(this.price)+"<span></p>";
	    						   money+=parseInt(this.price);
	    					}else{
	    						ht+="<p class='goodMoney'>单价：<span>"+parseInt(this.price*(this.discount/10))+"</span></p>";
	    					       money+=parseInt(this.price*(this.discount/10));
	    					}
	    					
	    					ht+="<div class='shuliang'><span class='num' style='float:left;'>数量:</span><span class='jian'goodID='"+this.goodsID+"'>-</span><span id='num'>"+this.number+"</span><span class='jia'goodID='"+this.goodsID+"'>+</span></div>";
	    				    ht+="</div></div>";
	    				    shu+=parseInt(this.number);
	    				
	    				});
	    					$(".container").append(ht);
	    					
	    					money=parseInt($('#num').html())*money;
	    				    $("#zongjia").html(money);
	    				    $(".sliang").html(shu);
	    				    
	    			}
	    			
	    		   }
	    		})
		   
		   //删除事件------------------------------------------------------
		   $(document).on('click','.shanchu',function(){
		   	   
			   	var tmpGoodId=$(this).attr("goodID");
			   	    user=tmpUserOb.userID;
			   	    
			   	    var tmpJson={
	    					"goodsID":tmpGoodId,
	    					"userID":user,
	    					"number":0
	    				}
			   	    getMyAjax(tmpJson);
			   	  window.location.reload();
			   	  
		   })
		   //减少商品数量--------------------------
		    $(document).on('click','.jian',function(){
		   	    user=tmpUserOb.userID;
			   	var tmpGoodId=$(this).attr("goodID");
			   	var count=parseInt($(this).next('#num').html());
			   	    count=count-1;
			    $(this).next('#num').html(count)
			    
			    var tmpJson={"goodsID":tmpGoodId,"userID":user,"number":count}
			    getMyAjax(tmpJson);
			    
			    if(count<=0){
			    	$(this).parents('.good_dv').remove();
			    }
			    var money=parseInt($("#zongjia").html());
			    var shu=parseInt($(".sliang").html());
			    shu=shu-1;
			    money=money-parseInt($(this).parent().siblings('.goodMoney').children('span').html());
			    console.log($(this).parent().siblings('.goodMoney').children('span').html())
			   
			    if(money==0&&shu==0){
		   	          $(".zong").remove();
		          	    var ht="<div>";
	    					ht+="<p id='pp1'>您的购物车什么都没有了~</p>";
	    				    ht+="</div>";
	    				$(".container").append(ht); 
		         }
			    $("#zongjia").html(money);
	    	    $(".sliang").html(shu);
		   })
		    
		    //添加商品数量--------------------------
		    $(document).on('click','.jia',function(){
		   	    user=tmpUserOb.userID;
			   	var tmpGoodId=$(this).attr("goodID");
			   	var count=parseInt($(this).prev('#num').html());
			   	
			   	
			   	var tmpJson={"goodsID":tmpGoodId,"userID":user,"number":count}
			   	getMyAjax(tmpJson);
			    count++;
			   	$(this).siblings('#num').html(count);
			   	
			   	var money=parseInt($("#zongjia").html());
			    var shu=parseInt($(".sliang").html());
			    shu=shu+1;
			    money=money+parseInt($(this).parent().siblings('.goodMoney').children('span').html());
			    console.log($(this).parent().siblings('.goodMoney').children('span').html())
			   
			  
			    $("#zongjia").html(money);
	    	    $(".sliang").html(shu);
			   	
		   })
		   //判断页面上是否有商品-----------------
		   var money=parseInt($("#zongjia").html());
		   var shu=parseInt($(".sliang").html());
		   
		    
		   //购物车更新函数---------------------
			function getMyAjax(dataJSON){
				$.ajax({
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
			
		   
		   
			