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

function loadProduct(pno,pageSize,cname){
	//加载商品
	$.ajax({
		type:"GET",
		url:"data/routes/products/getProductList.php",
		data:{pno:pno,pageSize:pageSize,cname:cname},
		success:function(data){
			//console.log(data);
			var html="";
            var rows = data.data;
			for(var i=0;i<rows.length;i++){
                var obj = rows[i];
				//console.log(obj.fid);
				html+=`
				<li class="car-li lf clear">
					<a href="javascript:;">
						<img src="${obj.img}" alt="">
					</a>
					<p class="price">
						¥ <span>${obj.price} 起</span>
					</p>
					<a href="">${obj.cname}</a>
					<p style="height:21px;"></p>
					<a href="product_detail.html?fid=${obj.fid}" class="btn-order lf clear" >立即订购</a>
					<p class="rf clear">
						已订购：<span>${obj.sold_count}</span>台
					</p>
				</li>
			`;
			}
			$("#car-content").html(html);
            //5:动态创建分页条 1 2 【3】 4 5 最多5页
            var html = "";
			//上上一页
            if(data.pno-2>0){
                html += `<li><a href="#">${data.pno-2}</a></li>`;
            }
			//上一页
            if(data.pno-1>0){
                html += `<li><a href="#">${data.pno-1}</a></li>`;
            }
			//当前页
            html += `<li class="active"><a href="#">${data.pno}</a></li>`;
			//下一页
            if(data.pno+1<=data.pageCount){
                html += `<li><a href="#">${data.pno+1}</a></li>`;
            }
			//下下一页
            if(data.pno+2<=data.pageCount){
                html += `<li><a href="#">${data.pno+2}</a></li>`;
            }
            $("#pagination").html(html);
        },
		error:function(){
			alert("网络故障请重试！");
		}
	});
}
loadProduct(1,12,"");

//分页条点击事件
$("#pagination").on("click","li a",function(e){
    e.preventDefault();
    var pno = $(this).html();
	if($("#soldcar").is(".selected")){
		loadProductByCount(pno,12,"");
	}else if($("#soldprice").is(".selected")){
		loadProductByPrice(pno,12,"");
	}else{
		loadProduct(pno,12,"");
	}
});

//按照销量排行
function loadProductByCount(pno,pageSize,cname){
	$.ajax({
		type:"GET",
		url:"data/routes/products/getProductByCount.php",
		data:{pno:pno,pageSize:pageSize,cname:cname},
		success:function(data){
			console.log(data);
			var html="";
			var rows = data.data;
			for(var i=0;i<rows.length;i++){
				var obj = rows[i];
				html+=`
				<li class="car-li lf clear">
					<a href="javascript:;">
						<img src="${obj.img}" alt="">
					</a>
					<p class="price">
						¥ <span>${obj.price} 起</span>
					</p>
					<a href="">${obj.cname}</a>
					<p style="height:21px;"></p>
					<a href="product_detail.html?fid=${obj.fid}" class="btn-order lf clear" name="${obj.fid}">立即订购</a>
					<p class="rf clear">
						已订购：<span>${obj.sold_count}</span>台
					</p>
				</li>
			`;
			}
			$("#car-content").html(html);
			var html = "";
			if(data.pno-2>0){
				html += `<li><a href="#">${data.pno-2}</a></li>`;
			}
			if(data.pno-1>0){
				html += `<li><a href="#">${data.pno-1}</a></li>`;
			}
			html += `<li class="active"><a href="#">${data.pno}</a></li>`;
			if(data.pno+1<=data.pageCount){
				html += `<li><a href="#">${data.pno+1}</a></li>`;
			}
			if(data.pno+2<=data.pageCount){
				html += `<li><a href="#">${data.pno+2}</a></li>`;
			}
			$("#pagination").html(html);
		},
		error:function(){
			alert("网络故障请重试！");
		}
	});
}

//按照价格排行
function loadProductByPrice(pno,pageSize,cname){
	$.ajax({
		type:"GET",
		url:"data/routes/products/getProductByPrice.php",
		data:{pno:pno,pageSize:pageSize,cname:cname},
		success:function(data){
			console.log(data);
			var html="";
			var rows = data.data;
			for(var i=0;i<rows.length;i++){
				var obj = rows[i];
				html+=`
				<li class="car-li lf clear">
					<a href="javascript:;">
						<img src="${obj.img}" alt="">
					</a>
					<p class="price">
						¥ <span>${obj.price} 起</span>
					</p>
					<a href="">${obj.cname}</a>
					<p style="height:21px;"></p>
					<a href="product_detail.html?fid=${obj.fid}" class="btn-order lf clear" name="${obj.fid}" >立即订购</a>
					<p class="rf clear">
						已订购：<span>${obj.sold_count}</span>台
					</p>
				</li>
			`;
			}
			$("#car-content").html(html);
			var html = "";
			if(data.pno-2>0){
				html += `<li><a href="#">${data.pno-2}</a></li>`;
			}
			if(data.pno-1>0){
				html += `<li><a href="#">${data.pno-1}</a></li>`;
			}
			html += `<li class="active"><a href="#">${data.pno}</a></li>`;
			if(data.pno+1<=data.pageCount){
				html += `<li><a href="#">${data.pno+1}</a></li>`;
			}
			if(data.pno+2<=data.pageCount){
				html += `<li><a href="#">${data.pno+2}</a></li>`;
			}
			$("#pagination").html(html);
		},
		error:function(){
			alert("网络故障请重试！");
		}
	});
}

//获取不同种类的汽车
$("#typer").on("click","a",e=>{
	e.preventDefault();
	var $tar=$(e.target);
	//console.log($tar);
	$tar.addClass("selected").siblings().removeClass("selected");
	if($tar.html()!="全部"){
		var cname=$tar.html();
		//console.log(cname);
		loadProduct("","",cname);
	}else{
		var cname="";
		loadProduct(1,12,cname);
	}
});
$("#allcar").click(e=>{
	//alert("1");
	//$("#pagination").show();
	loadProduct(1,12,"");
});
//获取销量优先/价格优先的汽车
$("#orderby").on("click","a",e=>{
	e.preventDefault();
	var $tar=$(e.target);
	$(".row").show();
	$tar.addClass("selected").siblings().removeClass("selected");
	if($tar.html()=="销量"){
		loadProductByCount(1,12,"");
	}else if($tar.html()=="价格"){
		loadProductByPrice(1,12,"");
	}else if($tar.html()=="默认"){
		loadProduct(1,12,"");
	}
})


