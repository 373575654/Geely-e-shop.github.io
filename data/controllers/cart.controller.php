<?php
require_once("../../init.php");
function addToCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$cid=$_REQUEST["cid"];
	@$count=$_REQUEST["count"];
	@$yzm=$_REQUEST["yzm"];
	$yzmPattern='/^[a-zA-Z]{4}$/';
	@$price=$_REQUEST["price"];
	if(!preg_match($yzmPattern,$yzm)){
        echo '{"code":-2,"msg":"验证码格式不正确！"}';
        exit;
    }
    $code=$_SESSION["code"];
    if($code!==strtolower($yzm)){
        echo '{"code":-3,"msg":"验证码不正确！"}';
        exit;
    }
	if($uid){
		$sql="select iid,uid,cid,count,price1,is_checked from jl_shoppingcart_item where uid=$uid and cid=$cid";
		$result=mysqli_query($conn,$sql);
		if(count(mysqli_fetch_all($result,1)))
			$sql="update jl_shoppingcart_item set count=count+$count where uid=$uid and cid=$cid";
		else
			$sql="insert into jl_shoppingcart_item (uid,cid,count,price1) values ($uid,$cid,$count,$price)";
		$result=mysqli_query($conn,$sql);
		if($result){
		    echo '{"code":0,"msg":"添加成功！"}';
		}else{
		   echo  '{"code":-1,"msg":"添加失败！"}';
		}
	}
}

function updateCart(){
	global $conn;
	@$iid=$_REQUEST["iid"];
	@$count=$_REQUEST["count"];
	if($count==0)
		$sql="delete from jl_shoppingcart_item where iid=$iid";
	else
		$sql="update jl_shoppingcart_item set count=$count where iid=$iid";
	$result=mysqli_query($conn,$sql);
    if($result){
        echo '{"code":0,"msg":"更新数量成功！"}';
    }else{
       echo  '{"code":-1,"msg":"更新数量失败！"}';
    }
}

function loadCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="select iid,is_checked,s.cid,count,price1,fname,sm_desc,cc,spec,inner_spec from jl_shoppingcart_item s inner join jl_detail d on s.cid=d.cid where uid=$uid";
		$result=mysqli_query($conn,$sql);
        echo json_encode(mysqli_fetch_all($result,1));
	}else{
		echo json_encode([]);
	}
}


function clearCart(){
	global $conn;
	@$iid=$_REQUEST["iid"];
	if($iid){
		$sql="delete from jl_shoppingcart_item where iid=$iid";
		$result=mysqli_query($conn,$sql);
		if($result){
		   echo '{"code":0,"msg":"删除购物车该商品成功！"}';
		}else{
		   echo  '{"code":-1,"msg":"删除购物车该商品成功！"}';
		}
	}
}

function selectAll(){
	global $conn;
	@$chkAll=$_REQUEST["chkAll"];
	session_start();
	@$uid=$_SESSION["uid"];
	$sql="update jl_shoppingcart_item set is_checked=$chkAll where uid=$uid";
	$result=mysqli_query($conn,$sql);
    if($result){
        echo '{"code":0,"msg":"更新all is_checked成功！"}';
    }else{
       echo  '{"code":-1,"msg":"更新all is_checked失败！"}';
    }
}

function selectOne(){
	global $conn;
	@$chkOne=$_REQUEST["chkOne"];
	@$iid=$_REQUEST["iid"];
	$sql="update jl_shoppingcart_item set is_checked=$chkOne where iid=$iid";
	$result=mysqli_query($conn,$sql);
    if($result){
        echo '{"code":0,"msg":"更新one is_checked成功！"}';
    }else{
       echo  '{"code":-1,"msg":"更新one is_checked失败！"}';
    }
}
