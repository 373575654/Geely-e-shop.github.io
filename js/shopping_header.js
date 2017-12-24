$(()=>{
	function loadStatus(){
		//判断登录:
		var $login=$(".login-box");
		var $welcome=$(".welcome-box");
		$.get("data/routes/users/isLogin.php")
		.then(data=>{//data:{ok:1,uname:xxx}
			if(data.ok==1){
				$login.hide();
				$welcome.show();
				$("#phone4").html(data.phone.slice(7));
				$.ajax({
					type:'GET',
					url:"data/routes/users/getCount.php",
					success:function(response){
						//console.log(response);
						var sum=0;
						for(var c of response){
							sum+=parseInt(c.count);
						}
						$(".numcount").html(sum);
					},
					error:function(){
						alert("网络故障请检查！");
					}
				});
			}else{
				$login.show();
				$welcome.hide();
			}
		});
	}

	$("#header").load("shopping_header.html",()=>{
		loadStatus();
		//注销:
		$(".logout").click(()=>{
			$.get("data/routes/users/logout.php")
				.then(()=>location.reload());
		});
		$(".shop-car").click(e=>{
			console.log(1);
			if($(".welcome-box").is(":hidden")){
				alert("请登录！");
				location.href='login.html';
			}
			else{
				location.href="cart.html";
			}
		});
	});

	$(window).scroll(()=>{
		var scrollTop=$(window).scrollTop();
		//console.log(scrollTop);
		if(scrollTop>=1000)
			$(".head-top").addClass("fixed_nav");
		else
			$(".head-top").removeClass("fixed_nav");
	});
});



