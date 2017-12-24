<?php
require_once("../../init.php");
function register(){
    session_start();
	global $conn;
	@$phone=$_REQUEST["phone"];
	$phonePattern='/^1[35789]\d{9}$/';
	@$upwd=$_REQUEST["upwd"];
	$upwdPattern='/^[a-z0-9]{3,12}$/i';
	@$email=$_REQUEST["email"];
	@$yzm=$_REQUEST["yzm"];
	$yzmPattern='/^[a-zA-Z]{4}$/';
	if($phone&&$upwd&&$email&&$yzm){
	    if(!preg_match($phonePattern,$phone)){
            echo '{"code":-2,"msg":"手机格式不正确！"}';
            exit;
        }
        if(!preg_match($upwdPattern,$upwd)){
            echo '{"code":-3,"msg":"密码格式不正确！"}';
            exit;
        }
        if(!preg_match($yzmPattern,$yzm)){
            echo '{"code":-4,"msg":"验证码格式不正确！"}';
            exit;
        }
        $code=$_SESSION["code"];
        if($code!==strtolower($yzm)){
            echo '{"code":-5,"msg":"验证码不正确！"}';
            exit;
        }
		$sql="insert into jl_user (uid,phone,upwd,email) values (null,'$phone','$upwd','$email')";
		$result=mysqli_query($conn,$sql);
	}
	$rows=mysqli_affected_rows($conn);
	if($rows>0)
		echo '{"code":1,"msg":"注册成功！"}';
	else
		echo '{"code":-1,"msg":"注册失败！"}';
}

function checkPhone(){
	global $conn;
	@$phone=$_REQUEST["phone"];
	if($phone){
		$sql="select * from jl_user where phone='$phone'";
		$result=mysqli_query($conn,$sql);
		$users=mysqli_fetch_all($result,1);
		if(count($users)!=0)
			echo '{"code":-1,"msg":"该号码已被注册！"}';
		else
			echo '{"code":1,"msg":"手机号码注册成功！"}';
	}
}

function checkYzm(){
	global $conn;
	session_start();
	$code=$_SESSION["code"];
	@$yzm=$_REQUEST["yzm"];
	if($code!==strtolower($yzm)){
		echo '{"code":-5,"msg":"验证码不正确！"}';
	}else{
		echo '{"code":1,"msg":"验证码正确！"}';
	}
}


function login(){
	global $conn;
	@$phone=$_REQUEST["phone"];
	@$upwd=$_REQUEST["upwd"];
	$phone_pat='/^1[35789][0-9]{9}$/';
	$upwd_pat='/^[a-zA-Z0-9_]{3,12}$/';
	if($phone&&$upwd){
		if(!preg_match($phone_pat,$phone)){
      echo '{"code":-2,"msg":"手机号码格式不正确！"}';
      exit;
    }
    if(!preg_match($upwd_pat,$upwd)){
      echo '{"code":-3,"msg":"密码格式不正确！"}';
      exit;
    }
		$sql="select * from jl_user where phone='$phone' and binary upwd='$upwd'";
		$result=mysqli_query($conn,$sql);
		$user=mysqli_fetch_all($result,1);
		if(count($user)==0)
      echo '{"code":-1,"msg":"用户名或密码错误！"}';
    else{
			session_start();
			$_SESSION["uid"]=$user[0]["uid"];
      echo '{"code":0,"msg":"登录成功！"}';
		}
	}
}

function logout(){
	session_start();
	$_SESSION["uid"]=null;
}

function isLogin(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="select phone from jl_user where uid=$uid";
		$result=mysqli_query($conn,$sql);
		$user=mysqli_fetch_all($result,1);
		return ["ok"=>1,"phone"=>$user[0]["phone"]];
	}else
		return ["ok"=>0];
}

function getCount(){
	global $conn;
	session_start();
    @$uid=$_SESSION["uid"];
    if($uid){
    	$sql="select count from jl_shoppingcart_item where uid=$uid";
    	$result=mysqli_query($conn,$sql);
		$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
		echo json_encode($rows);
	}
}