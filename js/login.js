$(()=>{
	//城市切换
	$("#header").on("click","#changeCity",e=>{
        e.preventDefault();
        if($('#city_box').is(":hidden"))
            $('#city_box').css('display','block');
        else
            $('#city_box').css('display','none');
    });
    $("#header").on("click","#city_box a",e=>{
        e.preventDefault();
        var city=$(e.target).html();
        $('#changeCity').prev().html(city);
        $('#city_box').css('display','none');
    });

	var $txtPhone=$("form [name=phone]");
	$txtPhone.blur(e=>{
		var phone=$txtPhone.val();
		var phone_reg=/^1[35789]\d{9}$/;
		if(!phone_reg.test(phone)){
			$("span.phone>img").attr('src','img/login/err.png');
			$("span.phone>i").html('手机号格式错误');
		}else{
			$("span.phone>img").attr('src','img/login/ok.png');
			$("span.phone>i").html("手机号格式正确");
		}
	});
	var $txtPwd=$("form :password");
	$txtPwd.blur(e=>{
		var pwd=$txtPwd.val();
		var	pwd_reg=/^[a-z0-9]{3,12}$/i;
		if(!pwd_reg.test(pwd)){
			$("span.upwd>img").attr('src','img/login/err.png');
			$("span.upwd>i").html('密码格式不正确');
		}else{
			$("span.upwd>img").attr('src','img/login/ok.png');
			$("span.upwd>i").html('密码格式正确');
		}
	});

	$("#form>.submit").click(()=>{
		var $txtPhone=$("form [name=phone]");
		var $txtPwd=$("form :password");
		var phone=$txtPhone.val(),
			pwd=$txtPwd.val();
		$.ajax({
			url:"data/routes/users/login.php",
			type:"POST",
			data:{phone:phone,upwd:pwd},
			success:function(data){
				//console.log(data);
				if(data.code==0){
					console.log(1);
					//$("#phone>img").attr('src','img/login/ok.png');
					//$("#upwd>img").attr('src','img/login/ok.png');
					location="shopping_mall.html";
				}
				else
					$("p.error").css("display","block");
			},
			error:function(){
					alert("网络故障，请检查！")
			}
    });
	})
})