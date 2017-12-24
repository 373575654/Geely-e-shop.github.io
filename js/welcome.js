$(()=> {
	//首页广告轮播
	var $imgs = $("#banner-list"),
		$inds = $(".num"),
		LIWIDTH = 1349, INTERVAL = 500, WAIT = 3000,
		moved = 0, timer = null, canMove = true;
	$.get("data/routes/products/getIndexCarousel.php")
		.then(data=> {
			//console.log(data);
			var html = "";
			for (var c of data) {
				html += `
					<li>
						<a href="${c.href}"><img src="${c.img}"></a>
					</li>
				`;
			}
			html += `
				<li>
					<a href="${data[0].href}"><img src="${data[0].img}"></a>
				</li>
			`;
			$imgs.html(html).css("width", (data.length + 1) * LIWIDTH);
			$inds.html("<a></a>".repeat(data.length)).children().first().addClass("hover");

			function autoMove() {
				if (canMove) {
					if (moved == data.length) {
						moved = 0;
						$imgs.css("left", 0);
					}
					timer = setTimeout(()=> {
						move(1, autoMove);
					}, WAIT);
				}
			}

			autoMove();

			//设置悬浮停顿
			$(".indexBanner").hover(
				()=> {
					canMove = false;
					clearTimeout(timer);
					timer = null;
				},
				()=> {
					canMove = true;
					autoMove();
				}
			);

			//设置小点的点击事件
			$inds.on("click", "a", e=> {
				moved = $(e.target).index();
				$imgs.stop(true).animate({
					left: -LIWIDTH * moved
				}, INTERVAL);
				$inds.children(":eq(" + moved + ")").addClass("hover").siblings().removeClass("hover");
			});

			function move(dir, callback) {
				moved += dir;
				if (moved < data.length) {
					$inds.children(":eq(" + moved + ")").addClass("hover").siblings().removeClass("hover");
				} else {
					$inds.children(":eq(0)").addClass("hover").siblings().removeClass("hover");
				}
				$imgs.stop(true).animate({
					left: -LIWIDTH * moved
				}, INTERVAL, callback);
			}

			$(".indexBanner>[data-move=right]").click(()=> {
				if (moved == data.length) {
					moved = 0;
					$imgs.css("left", 0);
				}
				move(1);
			});

			$(".indexBanner>[data-move=left]").click(()=> {
				//如果是第一张
				if (moved == 0) {//就跳到最后一张
					moved = data.length;
					$imgs.css("left", -LIWIDTH * moved);
				}
				move(-1);
			})

		});
});


//新闻轮播
var speed = 20;
var tab =  document.querySelector(".more-content");
var tab1 = document.getElementById("demo1");
var tab2 = document.getElementById("demo2");
function Marquee() {
	if (tab2.offsetWidth - tab.scrollLeft <= 0)
		tab.scrollLeft -= tab1.offsetWidth;
	else {
		tab.scrollLeft++;
	}
}
var MyMar = setInterval(Marquee, speed);
tab.onmouseover = function () {
	clearInterval(MyMar)
};
tab.onmouseout = function () {
	MyMar = setInterval(Marquee, speed)
};