//加载页面内容
$(()=>{
    //城市切换与显示
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

    //汽车颜色和图片
    if(location.search!=""){
        var fid=location.search.slice(1).split("=")[1];
        var imgs=[];
        var cc_1='';
        var spec_1='';
        $.ajax({
            type:"GET",
            url:"data/routes/products/getProductColor.php",
            data:{fid:fid},
            success:function(output){
                var color=output.color,
                    cc=output.cc,
                    spec=output.spec,
                    inner=output.inner,
                    html1="",
                    html2="",
                    html3="",
                    html4="";
                for(var i=0;i<color.length;i++){
                    var obj=color[i];
                    imgs[i]=obj.md;
                    html1+=`
                        <li class="lf clear" data-target=${i}>
							<img src="${obj.sm}">
							<p>${obj.sm_desc}</p>
						</li>
                    `;
                }
                $("#car-out>ul").html(html1);
                $("#car-out>ul").children().first().addClass("on");
                $(".img").children().attr("src",imgs[0]);
                document.getElementById("largeDiv").style.backgroundImage="url("+imgs[0]+")";
                for(var c of cc){
                    html2+=`
                    <span class="lf clear">${c.cc}</span>
                  `;
                }
                $("#carList").html(html2);
                $("#carList").children().first().addClass("on");
                for(var s of spec ){
                    html3+=`
                    <span class="lf clear">${s.spec}</span>
                  `;
                }
                $("#carType").html(html3);
                $("#carType").children().first().addClass("on");
                for(var inn of inner){
                    html4+=`
                        <li>
                            <img src="${inn.inner}" alt="">
                            <p>${inn.inner_spec}</p>
					    </li>
                    `;
                }
                $("#carInner").html(html4);
                $("#carInner").children().first().addClass("on");
                //加载页面的价格
                cc_1=$("#carList").children().first().html();
                spec_1=$("#carType").children().first().html();
                //创建点击事件
                $("#car-out>ul").on("click","li",e=>{
                    var $tar=$(e.target);
                    var i=$tar.parent().data("target");
                    $tar.parent().addClass("on").siblings().removeClass("on");
                    $(".img").children().attr("src",imgs[i]);
                    document.getElementById("largeDiv").style.backgroundImage="url("+imgs[i]+")";
                });
                //放大镜效果
                var superMask=document.getElementById("supermask");
                var mask=document.getElementById("mask");
                var lgDiv=document.getElementById("largeDiv");
                superMask.onmouseover=e=>{
                    mask.style.display=lgDiv.style.display="block";
                    lgDiv.style.transitionProperty="zIndex";
                    lgDiv.style.transitionDuration="0.5s";
                    lgDiv.style.transitionTimingFunction="linear";
                    document.querySelector(".car-mask").style.zIndex=1000;
                    document.querySelector(".order-buy").style.marginTop="-111px";
                };
                superMask.onmouseout=e=>{
                    mask.style.display=lgDiv.style.display="none";
                    document.querySelector(".order-buy").style.marginTop="-393px";
                    document.querySelector(".order-buy").style.zIndex=1000;
                    document.querySelector(".car-mask").style.zIndex=-3;
                };
                var XSIZE=125;
                var YSIZE=70;
                superMask.onmousemove=e=>{
                    var x=e.offsetX,y=e.offsetY;
                    var top=y-YSIZE/2,left=x-XSIZE/2;
                    if(top<0) top=0;
                    else if(top>70) top=70;
                    if(left<0) left=0;
                    else if(left>125) left=125;
                    mask.style.cssText=
                        "display:block;top:"+top+"px;left:"+left+"px";
                    lgDiv.style.backgroundPosition= -2.6*left+"px "+(-2*top)+"px";
                };
                //加载价格
                $.ajax({
                    type:"POST",
                    url:"data/routes/products/getProductColor.php",
                    data:{fid:fid,cc:cc_1,spec:spec_1},
                    success:function(output){
                        $("p.intr-price").html(toThousands(output.one.price));
                        $("p.loan-price").html("￥"+toThousands(output.one.foregift));
                        $("p.all-price").html("￥"+toThousands(output.one.price));
                        //计算首付款/贷款/月付款金额
                        var cprice=output.one.price;
                        $("#first-payment").html("0 RMB");
                        $("#loan-payment").html(cprice+" RMB");
                        $("#month-payment").html(Math.round(cprice/12)+" RMB");
                        $("#radio").change(e=>{
                            //console.log(cprice);
                            var i=$(e.target).val();
                            var radio=$(e.target).children(":eq("+i+")").html();
                            //console.log(radio);
                            if(i>0){
                                var first=(parseFloat(radio)/100)*cprice;
                                console.log(first);
                                $("#first-payment").html(first+" RMB");
                                var loan=cprice-first;
                                $("#loan-payment").html(loan+" RMB");
                            }else if(i=0){
                                $("#first-payment").html("0 RMB");
                                $("#loan-payment").html(cprice+" RMB");
                            }
                        });
                        $("#loan").change(e=>{
                            var firstpay=$("#first-payment").html();
                            var total=parseInt(cprice)+parseInt(firstpay);
                            var i=$(e.target).val();
                            month=$(e.target).children(":eq("+i+")").html();
                            if(i>0){
                                var monthpay=Math.round(total/month);
                                $("#month-payment").html(monthpay+" RMB");
                            }
                        });
                        //立即购买的点击事件
                        $("#buy").click(e=>{
                            e.preventDefault();
                            var info=$(".order-pay>input.on").val();
                            //console.log(info);
                            var fid=location.search.slice(1).split("=")[1],
                                cc=$("#carList span.on").html(),
                                spec=$("#carType span.on").html();
                            $.ajax({
                                type:'GET',
                                url:"data/routes/products/getCarId.php",
                                data:{fid:fid,cc:cc,spec:spec},
                                success:function(obj){
                                    console.log(obj);
                                    $.get("data/routes/users/isLogin.php")
                                        .then(data=>{
                                            if(data.ok==1){
                                                location="product_order.html?cid="+obj.cid+"&way="+info;
                                                //console.log(obj.cid);
                                            }else{
                                                alert("请登录！");
                                                location="login.html";
                                            }
                                        });
                                },
                                error:function(){
                                    alert("网络故障请检查！");
                                }
                            });
                        });
                    },
                    error:function(){
                        alert("网络故障请检查！");
                    }
                });
            },
            error:function(){
                alert("网络故障请检查！");
            }
        });
        //细节大图
        $.ajax({
            type:"GET",
            url:"data/routes/products/getProductLg.php",
            data:{fid:fid},
            success:function(data){
                //console.log(data);
                var html="";
                for(var i=0;i<data.length;i++){
                    var obj=data[i];
                    html+=`
                    	<img src="${obj.lg}" class="floor">
                  `;
                }
                $(".cars-main>p.imgload").html(html);
                $(".tips>p>span").html(obj.fname);
                //电梯效果
                var $divLift=$("#lift"),
                    $floors=$(".floor");
                $(window).scroll(()=>{
                    var scrollTop=$(window).scrollTop();
                    var offsetTop=$(".imgload").offset().top;
                    if(offsetTop<=scrollTop+innerHeight/2)
                        $divLift.show();
                    else
                        $divLift.hide();
                });

                $divLift.on("click",".lift_item",function(){
                    var $li=$(this);
                    if($li.is(":first-child")){
                        var offsetTop=$floors.offset().top;
                        //console.log(offsetTop);
                        $("html,body").stop(true).animate({
                            scrollTop:
                                $("#header-top").is(".fixed_nav")?
                                offsetTop-100-400:offsetTop-100
                        },600);
                    }else if($li.is(":nth-child(2)")){
                        $("html,body").stop(true).animate({
                            scrollTop:2700
                        },600);
                    }
                    else if($li.is(":nth-child(3)")){
                        $("html,body").stop(true).animate({
                            scrollTop:8000
                        },600);
                    }else
                        $("html,body").stop(true).animate({
                            scrollTop:0
                        },600);
                })
            },
            error:function(){
                alert("网络故障请检查！");
            }
        });

        //获取不同全款与订金
        function loadPrice(){
            var cs=[];
            $("#carList").on("click","span",e=>{
                $(e.target).addClass("on").siblings().removeClass("on");
                var cc=$(e.target).html();
                cs["cc"]=cc;
                cs["spec"]=$("#carType>span.on").html();
                $.ajax({
                    type:"POST",
                    url:"data/routes/products/getProductColor.php",
                    data:{fid:fid,cc:cs.cc,spec:cs.spec},
                    success:function(output){
                        //console.log(output.money);
                        $("p.intr-price").html(toThousands(output.money.price));
                        $("p.loan-price").html("￥"+toThousands(output.money.foregift));
                        $("p.all-price").html("￥"+toThousands(output.money.price));
                        //计算首付款/贷款/月付款金额
                        var cprice=output.money.price;
                        $("#first-payment").html("0 RMB");
                        $("#loan-payment").html(cprice+" RMB");
                        $("#month-payment").html(Math.round(cprice/12)+" RMB");
                        $("#radio").change(e=>{
                            //console.log(cprice);
                            var i=$(e.target).val();
                            var radio=$(e.target).children(":eq("+i+")").html();
                            //console.log(radio);
                            if(i>0){
                                var first=(parseFloat(radio)/100)*cprice;
                                console.log(first);
                                $("#first-payment").html(first+" RMB");
                                var loan=cprice-first;
                                $("#loan-payment").html(loan+" RMB");
                            }else if(i=0){
                                $("#first-payment").html("0 RMB");
                                $("#loan-payment").html(cprice+" RMB");
                            }
                        });

                        $("#loan").change(e=>{
                            var firstpay=$("#first-payment").html();
                            var total=parseInt(cprice)+parseInt(firstpay);
                            var i=$(e.target).val();
                            month=$(e.target).children(":eq("+i+")").html();
                            if(i>0){
                                var monthpay=Math.round(total/month);
                                $("#month-payment").html(monthpay+" RMB");
                            }
                        });
                    },
                    error:function(){
                        alert("网络故障请检查！");
                    }
                });
            });
            $("#carType").on("click","span",e=>{
                $(e.target).addClass("on").siblings().removeClass("on");
                var spec=$(e.target).html();
                cs["spec"]=spec;
                cs["cc"]=$("#carList>span.on").html();
                $.ajax({
                    type:"POST",
                    url:"data/routes/products/getProductColor.php",
                    data:{fid:fid,cc:cs.cc,spec:cs.spec},
                    success:function(output){
                        //console.log(output.money);
                        $("p.intr-price").html(toThousands(output.money.price));
                        $("p.loan-price").html("￥"+toThousands(output.money.foregift));
                        $("p.all-price").html("￥"+toThousands(output.money.price));
                        //计算首付款/贷款/月付款金额
                        var cprice=output.money.price;
                        $("#first-payment").html("0 RMB");
                        $("#loan-payment").html(cprice+" RMB");
                        $("#month-payment").html(Math.round(cprice/12)+" RMB");
                        $("#radio").change(e=>{
                            //console.log(cprice);
                            var i=$(e.target).val();
                            var radio=$(e.target).children(":eq("+i+")").html();
                            //console.log(radio);
                            if(i>0){
                                var first=(parseFloat(radio)/100)*cprice;
                                console.log(first);
                                $("#first-payment").html(first+" RMB");
                                var loan=cprice-first;
                                $("#loan-payment").html(loan+" RMB");
                            }else if(i=0){
                                $("#first-payment").html("0 RMB");
                                $("#loan-payment").html(cprice+" RMB");
                            }
                        });

                        $("#loan").change(e=>{
                            var firstpay=$("#first-payment").html();
                            var total=parseInt(cprice)+parseInt(firstpay);
                            var i=$(e.target).val();
                            month=$(e.target).children(":eq("+i+")").html();
                            if(i>0){
                                var monthpay=Math.round(total/month);
                                $("#month-payment").html(monthpay+" RMB");
                            }
                        });
                    },
                    error:function(){
                        alert("网络故障请检查！");
                    }
                });
            });
        }
        loadPrice();
        //预付定金/全款
        $("#all-pay").click(e=>{
            var $tar=$(e.target);
            if($tar.is(".not")){
                $("#pre-pay").removeClass("on").addClass("not");
                $tar.addClass("on").removeClass("not");
                $(".paypre").css("display","none");
                $(".payall").css("display","block");
                $(".loan-price").css("display","none");
                $(".all-price").css("display","block");
            }
        });
        $("#pre-pay").click(e=>{
            var $tar=$(e.target);
            if($tar.is(".not")){
                $("#all-pay").removeClass("on").addClass("not");
                $tar.removeClass("not").addClass("on");
                $(".paypre").css("display","block");
                $(".payall").css("display","none");
                $(".loan-price").css("display","block");
                $(".all-price").css("display","none");
            }
        });
        //开关order-count
        $("#click-btn").click(e=>{
            $(e.target).toggleClass("on").parent().toggleClass("on");
            $(".order-count").toggleClass("on");
            $(".count-box").toggleClass("on");
            if($(e.target).is(".on"))
                $(e.target).html("收起计算器");
            else
                $(e.target).html("展开计算器");
        });
    }
    //将数字转化为千分位数字
    function toThousands(num){
        var num=(num||0).toString(),
            result="";
        while(num.length>3){
            result=','+num.slice(-3)+result;
            num=num.slice(0,num.length-3);
        }
        if(num){
            result=num+result;
        }
        return result;
    }
});








