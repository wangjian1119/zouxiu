$(".footer_a").on("click", function() {
				$(".footer_a").css("border-top", "4px solid #484850");
				$(this).css("border-top", "4px solid #E4366B");
			})
			$(".s1").on("click",function(){
		   	   window.location.href='myxiu.html';
		   })
			var tijiao = true;
			//账号登陆
			$(".zhanghao").blur(function() {

				if($(this).val()){
					if(!(/^[a-zA-Z0-9]{5}$/.test($(this).val()))) {
						$(".sz").html('');
						$(".sz").html('账号格式正确').css("color", "yellowgreen");
						tijiao = true;
						console.log(tijiao)

					} else {
						$(".sz").html('');
						$(".sz").html('*用户名格式错误');
						tijiao = false;
						console.log(tijiao)
					}
				} else {
					$(".sz").html('');
					$(".sz").html('*用户名不能为空');
					tijiao = false;
					console.log(tijiao)
				}

			});

			//密码验证1
			$(".mima").blur(function() {
				if(!$(this).val()) {
					$(".smi").html('');
					$(".smi").html('*密码不能为空');
					tijiao = false;
					console.log(tijiao)
				} else {
					$(".smi").html('');
					$(".smi").html('密码输入成功').css('color', "yellowgreen");
					tijiao = true;
					console.log(tijiao)
				}
			});
			if(localStorage.getItem("dataob")){
				var tmpuser=localStorage.getItem("dataob");
				tmpuser=JSON.parse(tmpuser);
				
				$(".zhanghao").val(tmpuser.userID);
				 $(".mima").val(tmpuser.password);
			}
			
			$(".jizhu").click(function(){
				
				var user = $(".zhanghao").val();
				var pwd = $(".mima").val();
				var dataJSON = {
							"status": "register",
							"userID": user,
							"password": pwd
						}
				
				var tmpuser = JSON.stringify(dataJSON);
				localStorage.setItem("dataob", tmpuser);
				
				
				
			});
			
			//{"status":"register","userID":"w1234666","pwd":123}

			$(".ff").submit(function(){

				var user = $(".zhanghao").val();
				var pwd = $(".mima").val();
				

				var btn_dv = "<div class='btn_dv'></div>";
				$(".container").append(btn_dv);
				var go_font = "<p class='go_font'><p>";
				$(".btn_dv").append(go_font);
				var go_btn = "<button class='go_btn'></button>";
				$(".btn_dv").append(go_btn);

//				alert(tijiao);
				if(tijiao) {
//					alert('向服务器提交')
						//创建对象
					var loginDataJSON = {
							"status": "login",
							"userID": user,
							"password": pwd
						}
						//向服务器端发送请求
					$.ajax({
						type: 'POST',
						url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
						data: loginDataJSON, //需要传的参数
						success: function(data) {
//							console.log("服务器端返回值"+data);
							if(data == 0){
								$(".go_font").html('用户名不存在');
								$(".go_btn").html('重新登陆');
								$(document).on('click', '.go_btn', function() {
									$(".btn_dv").remove();
								})
							}else if(data == 2) {

								$(".go_font").html('您的用户名密码不符');
								$(".go_btn").html('重新注册');
								$(document).on('click', '.go_btn', function() {
									$(".btn_dv").remove();
								})
								
							}else if(data){
								var tmpuser = JSON.stringify(loginDataJSON);
								localStorage.setItem("loginDataJSON", tmpuser);
//	    				        console.log("登陆成功 并 本地存储成功")
								$(".go_font").html('登陆成功');
								$(".go_btn").html('前往我的秀');
								$(document).on('click', '.go_btn', function() {
									window.location.href='myxiu.html'
								});
							}

						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("XMLHttpRequest==" + XMLHttpRequest);
							console.log("textStatus==" + XMLHttpRequest);
							console.log("errorThrown==" + errorThrown);
						}

					})

				} else {

					$(".go_font").html('您的信息填写格式有误，无法提交');
					$(".go_btn").html('继续填写');
					$(document).on('click', '.go_btn', function() {
						$(".btn_dv").remove();
					})

				}

				return false;

				//		   	   window.location.href='denglu.html';
			})