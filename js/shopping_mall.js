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

    $(document).ready(function(){
        var slideShow=$(".slideShow"),
            ul=slideShow.find("ul"),
            showNumber=slideShow.find(".showNav span"),
            oneWidth=slideShow.find("ul li").eq(0).width();
        var timer=null;
        var iNow=0;

        showNumber.on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            var index=$(this).index();
            iNow=index;
            ul.animate({
                "left":-oneWidth*iNow,
            })
        });

        function autoPlay(){
            timer=setInterval(function(){
                iNow++;
                if(iNow>showNumber.length-1){
                    iNow=0;
                }
                showNumber.eq(iNow).trigger("click");
            },2000);
        }
        autoPlay();
        slideShow.hover(
            function(){
                clearInterval(timer);
            },autoPlay
        );
    });
    //侧边菜单的展出
    $(".type-list>ul").on('mouseenter',"li",e=>{
        var $tar=$(e.target);
        var i=$tar.index();
        //console.log($(".hovershow>div:eq("+i+")").html());
        console.log(i);
        var $div=$(".hovershow>div:eq("+i+")");
        $div.removeClass("dn").siblings().addClass("dn");
        if(i>1){
           $div.css("marginTop",(38*(i-1))+'px');
        }
        $div.mouseenter(()=>{
            $div.removeClass("dn");
        });
        $div.mouseleave(()=>{
            $div.addClass("dn");
        });
    });
    $(".type-list>ul").on('mouseleave',"li",e=>{
        var $tar=$(e.target);
        var i=$tar.index();
        var $div=$(".hovershow>div:eq("+i+")");
        $div.addClass("dn").siblings().addClass("dn");
    });
});





