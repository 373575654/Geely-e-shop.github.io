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
    if(location.search!="") {
        var url=location.search.slice(1).split("=")[1];
        var index1=url.indexOf('&');
        //console.log(index1);
        var cid = location.search.slice(1).split("=")[1].slice(0,index1);
        var way = decodeURI(location.search.slice(1).split("=")[2]);
        console.log(way);
        $.ajax({
            type: "GET",
            url: "data/routes/products/getCarOrderInfo.php",
            data: {cid: cid},
            success: function (output) {
                console.log(output);
                var html="";
                html+=`
                   <td width="484">
                       <img src="${output.data.md}" width="260" height="146" alt="" class="lf">
                       <p class="fz16 lf">${output.data.fname}</p>
                       <p class="lf" id="catagory">
                            颜色：<span>${output.data.sm_desc}</span>
                            &nbsp;&nbsp;排量：<span>${output.data.cc}</span><br>
                            型号：<span>${output.data.spec}</span>
                            &nbsp;&nbsp;内饰：<span>${output.data.inner_spec}</span>
                       </p>
                   </td>
                   <td class="xxtype">订金</td>
                   <td class="xprice1">元</td>
                   <td>1</td>
                   <td class="xprice2"><span>元</span></td>
               `;
                $("#loadinfo").html(html);
                $(".xprice3").html(output.data.foregift);
                $(".je1").attr("value",`订金 ￥${output.data.foregift}`);
                $(".je2").attr("value",`全款 ￥${output.data.price}`);
                //为订金和全款按钮绑定单击事件
                //一开始加载订金与全款
                if($(".je1").val().slice(0,2)==way){
                    $(".je1").addClass("on").siblings().removeClass("on");
                    $(".xxtype").html(way);
                    $(".xprice1").html(output.data.foregift);
                    $(".xprice2").html(output.data.foregift);
                    $(".xprice3").html(output.data.foregift);
                }

                if($(".je2").val().slice(0,2)==way){
                    $(".je2").addClass("on").siblings().removeClass("on");
                    $(".xxtype").html(way);
                    $(".xprice1").html(output.data.price);
                    $(".xprice2").html(output.data.price);
                    $(".xprice3").html(output.data.price);
                }

                $(".je2").click(e=>{
                    var $tar=$(e.target);
                    $tar.addClass("on").siblings().removeClass("on");
                    $(".xxtype").html("全款");
                    $(".xprice1").html(output.data.price);
                    $(".xprice2").html(output.data.price);
                    $(".xprice3").html(output.data.price);
                });
                $(".je1").click(e=>{
                    var $tar=$(e.target);
                    $tar.addClass("on").siblings().removeClass("on");
                    $(".xxtype").html("订金");
                    $(".xprice1").html(output.data.foregift);
                    $(".xprice2").html(output.data.foregift);
                    $(".xprice3").html(output.data.foregift);
                });
            },
            error: function () {
                alert("网络故障请检查！");
            }
        });
        //验证码
        $("#setYzm").click(e=>{
            $.get("data/routes/users/code_gg.php")
                .then(()=>{
                    $(e.target).attr("src","data/routes/users/code_gg.php");
                });
        });
        //确认订单事件
        $(".submit").click(e=>{
            e.preventDefault();
            var yzm=$(".yzm").val(),yzmReg=/^[a-z]{4}$/i;
            var price=$(".xprice3").html();
            var count=1;
            var name=$("#username").val();
            var scrollTop=$(window).scrollTop();
            if(!name){
                $("#username").addClass("error").next().css("display","block");
                $("html,body").stop(true).animate({
                    scrollTop:0
                },0);
            }

            if($("#jxs_name option:checked").text()=="请选择"){
                $("#jxs_name").next().css("display","block");
                $("html,body").stop(true).animate({
                    scrollTop:0
                },0);
            }
            if(!yzm){
                $(".yzm").next().css("display","block");
            }else{
                if(!yzmReg.test(yzm)){
                    $(".yzm").next().css("display","block").html("验证码格式错误");
                    $(".yzm").val('');
                    return;
                }
                $.ajax({
                    type:"POST",
                    url:"data/routes/cart/addToCart.php",
                    data:{cid:cid,count:count,yzm:yzm,price:price},
                    success:function(data){
                        if(data.code!=0)
                            $(".yzm").next().css("display","block").html(data.msg);
                        if(data.code==0){
                            location.href="cart.html";
                        }else{
                            $(".yzm").val('');
                        }
                    },
                    error:function(){
                        alert("网络故障请检查！");
                    }
                });
            }
        });
        //二级联动的加载
        var provinceList = [
            '北京市',
            '上海市',
            '浙江省',
            '江苏省'
        ];
        var cityList = [
            ['北京市'],
            ['上海市'],
            ['杭州市', '宁波市', '台州市', '舟山市'],
            ['苏州市','无锡市','南京市','南通市']
        ];
        var carmall=[
            [
                '北京北方瑞意达汽车销售服务有限公司',
                '北京庞大龙腾汽车销售服务有限公司',
                '北京中泽天盛销售服务有限公司'
            ],
            [
                '上海晋熙汽车销售服务有限公司',
                '上海万帮之星汽车销售服务有限公司',
                '上海富电汽车销售有限公司'
            ],
            [
                [
                    '杭州骏业汽车销售有限公司',
                    '杭州帝豪销售服务有限公司',
                    '杭州吉瑞汽车销售有限公司'
                ],
                [
                    '宁波帝豪汽车销售服务有限公司',
                    '宁波东耀汽车运输有限公司',
                    '宁波远景技术维修销售有限公司'
                ],
                [
                    '浙江日通汽车销售有限公司',
                    '台州创行新能源汽车销售有限公司',
                    '台州豪庭汽车销售服务有限公司'
                ],
                [
                    '舟山市卓然新能源科技有限公司',
                    '舟山市国臻汽车销售服务有限公司'
                ]
            ],
            [
                [
                    '苏州瑞高汽车服务有限公司',
                    '苏州翡翠新能源汽车有限公司',
                    '张家港市利馨汽车销售服务有限公司'
                ],
                [
                    '无锡市吉美汽车销售有限公司',
                    '无锡市华庭汽车销售服务有限公司',
                    '江阴市同元汽贸有限公司'
                ],
                [
                    '南京联润汽车销售有限公司',
                    '江苏冠宇汽车销售有限公司',
                    '江苏东泉汽车销售有限公司'
                ],
                [
                    '南通东昊汽车贸易有限公司',
                    '南通恒源汽车销售有限公司',
                    '南通赛路丰汽车销售服务有限公司'
                ]
            ]
        ];
        var $selProvs=$("#sl_name");
        var $selCts=$("#cty_name");
        var $selComs=$("#jxs_name");
        var html="";
        for(var p of provinceList){
            html+=`<option>${p}</option>`;
        }
        $selProvs.append(html);
        $selProvs.change(e=>{
            var i=$(e.target).prop("selectedIndex");
            $selCts.empty();
            html=`<option>-请选择具体市-</option>`;
            if(i>0){
                var cts=cityList[i-1];
                for(var c of cts){
                    html+=`<option>${c}</option>`;
                }
            }
            $selCts.html(html);
        });
        var proindex=0;
        $selProvs.change(e=>{
            var i=$(e.target).prop("selectedIndex");
            //console.log(i);
            $selComs.empty();
            html=`<option>-请选择具体经销商-</option>`;
            if(i>0){
                var coms=carmall[i-1];
                for(var c of coms){
                    html+=`<option>${c}</option>`;
                }
            }
            $selComs.html(html);
            proindex=i-1;
        });
        $selCts.change(e=>{
            var i=$(e.target).prop("selectedIndex");
            $selComs.empty();
            html=`<option>-请选择具体经销商-</option>`;
            console.log(i);
            if(proindex>1){
                var shops=carmall[proindex];
                for(var shop of shops[i-1]){
                    html+=`<option>${shop}</option>`;
                }
            }else{
                for(var shop of carmall[proindex]){
                    html+=`<option>${shop}</option>`;
                }
            }
            $selComs.html(html);
        });

        //输入框信息的onblur事件
        $("#username").blur(e=>{
            var uname=$(e.target).val();
            if(uname){
                $("#username").removeClass("error").next().css("display","none");
            }else{
                $("#username").addClass("error").next().css("display","block");
            }
        });
        $("#jxs_name").blur(e=>{
            var dian=$("#jxs_name option:checked").text();
            if(dian=="请选择"){
                $("#jxs_name").next().css("display","block");
            }else{
                $("#jxs_name").next().css("display","none");
            }
        });
        $(".yzm").blur(e=>{
            var yanzm=$(e.target).val();
            if(yanzm){
                $(".yzm").next().css("display","none");
            }else{
                $(".yzm").next().css("display","block");
            }
        });
    }
});