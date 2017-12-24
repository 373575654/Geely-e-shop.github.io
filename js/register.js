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

	$("#phone").blur(e=>{
		var phone=$(e.target).val();
		if(phone){
			$.ajax({
				type:'POST',
				url:'data/routes/users/check_phone.php',
				data:{phone:phone},
				success:function(data){
					if(data.code<0){
						$("span.phone>img").attr("src","img/login/err.png");
						$("span.phone>i").html(data.msg);
					}else{
						$("span.phone>img").attr("src","img/login/ok.png");
						$("span.phone>i").html('');
					}
				},
				error:function(){
					alert('网络故障请检查！');
				}
			});
		}else{
			$("span.phone>img").attr("src","");
			$("span.phone>i").html('请输入注册手机号');
		}
	});
	$("#yzm").blur(e=>{
		var yzm=$(e.target).val();
		if(yzm){
			$.ajax({
				type:'POST',
				url:'data/routes/users/checkYzm.php',
				data:{yzm:yzm},
				success:function(data){
					if(data.code<0){
						$("span.yzma>img").attr("src","img/login/err.png");
						$("span.yzma>i").html(data.msg);
					}else{
						$("span.yzma>img").attr("src","img/login/ok.png");
						$("span.yzma>i").html('');
					}
				}
			});
		}else{
			$("span.yzma>img").attr("src","");
			$("span.yzma>i").html('请输入验证码');
		}
	});

	$("#email").blur(e=>{
		var email=$(e.target).val();
		var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		if(email){
			if(!emailReg.test(email)){
				$("span.umail>img").attr("src","img/login/err.png");
				$("span.umail>i").html('邮箱格式不正确');
			}else{
				$("span.umail>img").attr("src","img/login/ok.png");
				$("span.umail>i").html('');
			}
		}else{
			$("span.umail>img").attr("src","");
			$("span.umail>i").html('请输入邮箱');
		}
	});
	$("#upwd").blur(e=>{
		var upwd=$(e.target).val();
		var upwd_reg=/^[a-z0-9]{3,12}$/i;
		if(upwd){
			if(!upwd_reg.test(upwd)){
				$("span.upwd>img").attr("src","img/login/err.png");
				$("span.upwd>i").html('密码强度不够');
			}else{
				$("span.upwd>img").attr("src","img/login/ok.png");
				$("span.upwd>i").html('');
			}
		}else{
			$("span.upwd>img").attr("src","");
			$("span.upwd>i").html('请输入密码');
		}
	});
	$("div [name=upwd2]").blur(e=>{
		var cpwd=$(e.target).val();
		var upwd=$("#upwd").val();
		if(cpwd){
			if(cpwd==upwd){
				$("span.cpwd>img").attr("src","img/login/ok.png");
				$("span.cpwd>i").html('');
			}else{
				$("span.cpwd>img").attr("src","img/login/err.png");
				$("span.cpwd>i").html('两次密码不一致');
			}
		}
	});


	$("#form .submit-on").click(()=>{
		var phone=$("#phone").val();
		var yzm=$("#yzm").val();
		var upwd=$("#upwd").val();
		var email=$("#email").val();
		$.ajax({
			url:"data/routes/users/register.php",
			type:"POST",
			data:{phone:phone,upwd:upwd,yzm:yzm,email:email},
			success:function(data){
				//console.log(data);
				if(data.code==1){
					alert(data.msg);
					location="login.html";
				}
				else
					alert(data.msg);
			},
			error:function(){
					alert("网络故障，请检查！")
			}
    });
	});
	//验证码
	$("#setYzm").click(e=>{
		$.get("data/routes/users/code_gg.php")
			.then(()=>{
				$(e.target).attr("src","data/routes/users/code_gg.php");
		});
  	});
})