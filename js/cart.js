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
    //获取cart内容
    function loadCart(){
        $.ajax({
            type:'GET',
            url:"data/routes/cart/loadCart.php",
            success:function(data){
                //console.log(data);
                var html="";
                var $counts=$(".totalcount");
                var $totals=$(".totalprices");
                for(var obj of data){
                    html+=`
                        <tr class="information">
                            <td width="113">
                                <p class="cur one" style="margin-left:20px;">
                                    <span class="lf clear off"></span>
                                    <em style="display: inline-block;margin-left:8px;">选择</em>
                                </p>
                            </td>
                            <td>
                                <span style="display: inline-block;margin-left: 135px;">
                                ${obj.fname}/${obj.sm_desc}/${obj.cc}/${obj.spec}/${obj.inner_spec}
                                </span>
                            </td>
                            <td width="90">                      &nbsp;&nbsp;&nbsp;
                                <span>￥${obj.price1}</span>
                            </td>
                            <td width="250" class="num">
                                <div>
                                    <span class="reduce">&nbsp;-&nbsp;</span>
                                    <input type="text" value=${obj.count} data-iid="${obj.iid}">
                                    <span class="add">&nbsp;+&nbsp;</span>
                                </div>
                            </td>
                            <td width="90" class="oneprice">                    &nbsp;&nbsp;&nbsp;
                                <span>￥</span>
                                <span>${(obj.price1*obj.count)}</span>
                            </td>
                            <td width="146">
                                <a href="" class="btn-dele" style="display: inline-block;margin-left:60px;" data-iid="${obj.iid}">删除</a>
                            </td>
                        </tr>
                    `;
                }
                $("#tbody1").html(html);
                 //setTimeout(()=>{
                 //    getTotal();
                 //    chkAll()
                 //},100);
                //全选按钮的切换
                var $checkTop=$("p.all span");
                //console.log($checkTop);
                $checkTop.off("click").click(e=>{
                    if($(e.target).is(".off")){
                        $(e.target).removeClass("off").addClass("selectall");
                        $("p.one>span").removeClass("off").addClass("selectall");
                        $.post(
                            "data/routes/cart/selectAll.php",
                            "chkAll='1'"
                        ).then(data=>{
                            if(data.code=0){
                                loadCart();
                            }
                        });
                    }else{
                        $(e.target).removeClass("selectall").addClass("off");
                        $("p.one>span").removeClass("selectall").addClass("off");
                        $.post(
                            "data/routes/cart/selectAll.php",
                            "chkAll='0'"
                        ).then(()=>{
                            if(data.code=0){
                                loadCart();
                            }
                        });
                    }
                    //全选的总数与金额
                    getTotal();
                });
                $("#tbody1").off("click").on("click","p.one>span",e=>{
                    var $tar=$(e.target);
                    if($tar.is(".off")){
                        $tar.removeClass("off").addClass("selectall");
                        $.post(
                            "data/routes/cart/selectOne.php",
                            "chkOne=1&iid="+$tar.attr("alt")
                        ).then(data=>{
                            if(data.code=0){
                                loadCart();
                            }
                        });
                    }else{
                        $tar.removeClass("selectall").addClass("off");
                        $.post(
                            "data/routes/cart/selectOne.php",
                            "chkOne=1&iid="+$tar.attr("alt")
                        ).then(data=>{
                            if(data.code=0){
                                loadCart();
                            }
                        });
                    }
                    getTotal();
                }).on("click",".reduce,.add",e=> {
                        var $tar=$(e.target);
                        var $input=$tar.siblings("input");
                        var n=parseInt($input.val());
                        if ($tar.is(".add")){
                            n++;
                            $input.attr("value",n);
                        }
                        else{
                            n--;
                            if(n>0)
                                $input.attr("value",n);
                        }
                        if (n==0) {
                            if (confirm("是否继续删除?"))
                                $.get(
                                    "data/routes/cart/updateCart.php",
                                    "count=" + n + "&iid=" + $input.data("iid")
                                ).then(data => {
                                    if(data.code==0){
                                        loadCart();
                                    }
                                })
                        }else{
                            $.get(
                                "data/routes/cart/updateCart.php",
                                "count="+n+"&iid="+$input.data("iid")
                            ).then(data => {
                                if(data.code==0){
                                    loadCart();
                                }
                            })
                        }
                    }
                );
                function getTotal(){
                    var $rows=$(".information:has('.selectall')");
                    //console.log($rows);
                    var $inputs=$rows.find(".num input");
                    var $subs=$rows.find(".oneprice>:last-child");
                    var count=0;
                    var total=0;
                    for(var input of $inputs){
                        count+=parseInt($(input).val());
                    }
                    for(var sub of $subs){
                        total+=parseFloat($(sub).html());
                    }
                    $counts.html(count);
                    $totals.html(total);
                }

                $("#tbody1").on("click",".btn-dele",e=>{
                    e.preventDefault();
                    var $tar=$(e.target);
                    var iid=$tar.data("iid");
                    console.log(iid);
                    $.ajax({
                        type:"POST",
                        url:"data/routes/cart/clearCart.php",
                        data:{iid:iid},
                        success:function(data){
                            alert(data.msg);
                            loadCart();
                        },
                        error:function(){
                            alert("网络故障请重试！");
                        }
                    });
                });
            },
            error:function(){
                alert("网络故障请检查!");
            }
        });
    }
    //loadCart();
    $.get("data/routes/users/isLogin.php")
        .then(data=>{
            if(data.ok==0)
                location="login.html?back="+encodeURIComponent(location.href);
            loadCart();
    })
})