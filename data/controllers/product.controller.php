<?php
require_once("../../init.php");
function getIndexCarousel(){
	global $conn;
	$sql="select * from jl_index_carousel";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}

function getProductList(){
	global $conn;
	@$cname=$_REQUEST["cname"];
	if(!$cname){
    	$cname="";
    }
	@$pno = $_REQUEST["pno"];
    if(!$pno){
     $pno = 1;
    }else{
     $pno = intval($_REQUEST["pno"]);
    }
    @$pageSize = $_REQUEST["pageSize"];
    if(!$pageSize){
     $pageSize = 12;
    }else{
     $pageSize = intval($_REQUEST["pageSize"]);
    }
    $offset = ($pno-1)*$pageSize;
    $sql="select * from jl_hot_car where cname like '%$cname%' LIMIT $offset,$pageSize";
    $result = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
    if(mysqli_error($conn)){
       echo mysqli_error($conn);
    }
    $sql = " SELECT count(*) FROM jl_hot_car where cname like '%$cname%'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_row($result);
    $pageCount = ceil($row[0]/$pageSize);
    $output = [
      "recordCount"=>$row[0],   //总记录数24
      "pageCount"=>$pageCount,  //总页数3
      "pno"=>$pno,              //当前页页码1
      "pageSize"=>$pageSize,    //当前页记录数8
      "data"=>$rows             //当前页内容[...]
    ];
    //9:将数据转换json发送
    echo json_encode($output);
}

function getProcuctByCount(){
	global $conn;
	@$cname=$_REQUEST["cname"];
	if(!$cname){
    		$cname="";
    }
    @$pno = $_REQUEST["pno"];
    if(!$pno){
     $pno = 1;
    }else{
     $pno = intval($_REQUEST["pno"]);
    }
    @$pageSize = $_REQUEST["pageSize"];
    if(!$pageSize){
     $pageSize = 12;
    }else{
     $pageSize = intval($_REQUEST["pageSize"]);
    }
    $offset = ($pno-1)*$pageSize;
	$sql="select * from jl_hot_car where cname like '%$cname%' order by sold_count DESC LIMIT $offset,$pageSize";
	$result=mysqli_query($conn,$sql);
	$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
    if(mysqli_error($conn)){
       echo mysqli_error($conn);
    }
	$sql = " SELECT count(*) FROM jl_hot_car";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_row($result);
    $pageCount = ceil($row[0]/$pageSize);
    $output = [
      "recordCount"=>$row[0],   //总记录数24
      "pageCount"=>$pageCount,  //总页数3
      "pno"=>$pno,              //当前页页码1
      "pageSize"=>$pageSize,    //当前页记录数8
      "data"=>$rows             //当前页内容[...]
    ];
    //9:将数据转换json发送
    echo json_encode($output);
}

function getProcuctByPrice(){
	global $conn;
	@$cname=$_REQUEST["cname"];
	if(!$cname){
		$cname="";
	}
	@$pno = $_REQUEST["pno"];
	if(!$pno){
         $pno = 1;
    }else{
     $pno = intval($_REQUEST["pno"]);
    }
    @$pageSize = $_REQUEST["pageSize"];
    if(!$pageSize){
     $pageSize = 12;
    }else{
     $pageSize = intval($_REQUEST["pageSize"]);
    }
    $offset = ($pno-1)*$pageSize;
	$sql="select * from jl_hot_car where cname like '%$cname%' order by price ASC LIMIT $offset,$pageSize";
	$result=mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
    if(mysqli_error($conn)){
       echo mysqli_error($conn);
    }
    $sql = " SELECT count(*) FROM jl_hot_car";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_row($result);
    $pageCount = ceil($row[0]/$pageSize);
    $output = [
      "recordCount"=>$row[0],   //总记录数24
      "pageCount"=>$pageCount,  //总页数3
      "pno"=>$pno,              //当前页页码1
      "pageSize"=>$pageSize,    //当前页记录数8
      "data"=>$rows             //当前页内容[...]
    ];
    //9:将数据转换json发送
    echo json_encode($output);
}

function getProductColor(){
    global $conn;
    session_start();
    @$fid=$_REQUEST["fid"];
    @$cc=$_REQUEST["cc"];
    @$spec=$_REQUEST["spec"];
    $sql="select sm,sm_desc,md FROM jl_detail where fid=$fid group by sm_desc";
    $result=mysqli_query($conn,$sql);
    $output["color"] = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql="select cc from jl_detail where fid=$fid GROUP by cc";
    $result=mysqli_query($conn,$sql);
    $output["cc"] = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql="SELECT spec FROM jl_detail WHERE fid=$fid group by spec";
    $result=mysqli_query($conn,$sql);
    $output["spec"] = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql="SELECT price,foregift FROM jl_detail WHERE fid=$fid and cc='$cc' and spec='$spec'";
    $result=mysqli_query($conn,$sql);
    $output["money"] = mysqli_fetch_assoc($result);
    $sql="select `inner`,`inner_spec` from jl_detail where fid=$fid GROUP by `inner`";
    $result=mysqli_query($conn,$sql);
    $output["inner"] = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql="SELECT price,foregift FROM jl_detail WHERE fid=$fid and cc='$cc' and spec='$spec' limit 1";
    $result=mysqli_query($conn,$sql);
    $output["one"] = mysqli_fetch_assoc($result);
    $sql="SELECT price,foregift FROM jl_detail WHERE fid=$fid and cc='$cc' group by price";
    $result=mysqli_query($conn,$sql);
    $output["cc_money"] = mysqli_fetch_assoc($result);
    if(mysqli_error($conn)){
       echo mysqli_error($conn);
    }
    echo json_encode($output);
}

function getProductLg(){
    global $conn;
    @$fid=$_REQUEST["fid"];
    $sql="select * FROM jl_car_family where fid=$fid";
    $result=mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
    if(mysqli_error($conn)){
       echo mysqli_error($conn);
    }
    echo json_encode($rows);
}

function getCarId(){
    global $conn;
    @$fid=$_REQUEST["fid"];
    @$cc=$_REQUEST["cc"];
    @$spec=$_REQUEST["spec"];
    $sql="select cid from jl_detail where fid=$fid and cc='$cc' and spec='$spec'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    echo json_encode($row);
}

function getCarOrderInfo(){
    global $conn;
    @$cid=$_REQUEST["cid"];
    $sql="select * from jl_detail where cid=$cid";
    $result=mysqli_query($conn,$sql);
    $output["data"] =mysqli_fetch_assoc($result);
    $sql="select f.fname from jl_car_family f,jl_detail d where f.fid=d.fid limit 1";
    $result=mysqli_query($conn,$sql);
    $output["fname"]=mysqli_fetch_assoc($result);
     if(mysqli_error($conn)){
           echo mysqli_error($conn);
     }
    echo json_encode($output);
}