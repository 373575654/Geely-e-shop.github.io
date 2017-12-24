SET NAMES UTF8;
DROP DATABASE IF EXISTS jili;
CREATE DATABASE jili CHARSET=UTF8;
USE jili;
CREATE TABLE jl_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	phone VARCHAR(16),
	upwd VARCHAR(32),	
	email VARCHAR(64)
);
INSERT INTO jl_user VALUES(01,'15618094186','1qaz2wsx','373575654@qq.com');
INSERT INTO jl_user VALUES(NULL,'18352866274','1qaz2wsx','4546546546@qq.com');
INSERT INTO jl_user VALUES(NULL,'15669263606','1qaz2wsx','8906456345@qq.com');


CREATE TABLE jl_index_carousel(
	cid int(11) PRIMARY KEY auto_increment,
	img varchar(128) default NULL,
	href varchar(128) default NULL
);

INSERT INTO jl_index_carousel VALUES(01,'img/geely/9c93bd48a68c60586814fd1c448b3125.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(02,'img/geely/8436e3b484292af090508553b9e94961.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(03,'img/geely/03fd265396176e87d98a749532ffd0a6.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(04,'img/geely/bd0ef7676bbc968d0bf88a232c50a313.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(05,'img/geely/f64386b9bd564e2dfe5f5beb62802568.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(06,'img/geely/295904b1f50787937405864a8c6d635d.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(07,'img/geely/3f6569ba112f066fce28ace8eede30c9.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(08,'img/geely/b8408b1043b35dc5dfeda129e28c21e9.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(09,'img/geely/a3ac01d506e3c2ade391ea7b50d9b4aa.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(10,'img/geely/19398b48c58acdd0331e627f0f5d818c.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(11,'img/geely/a6f36cf437c7a296bf2b88bb17f4f00e.jpg','shopping_mall.html');
INSERT INTO jl_index_carousel VALUES(12,'img/geely/a46c6873408f43c70d71e17e04d8be03.jpg','shopping_mall.html');

CREATE TABLE jl_hot_car(
	cid int(11) PRIMARY KEY auto_increment,
	fid int(11) NOT NULL,
	img varchar(128) default NULL,
	price int(16),
	cname varchar(64),
	sold_count int(11)
);
INSERT INTO jl_hot_car VALUES(NULL,1,'img/product_list/15030252811055rsqc5.jpg','119999','博越',4038);
INSERT INTO jl_hot_car VALUES(NULL,2,'img/product_list/150673221013514odwh.jpg','53900','远景X3',119);
INSERT INTO jl_hot_car VALUES(NULL,3,'img/product_list/15030251550422av2q3.jpg','119800','新博瑞',54);
INSERT INTO jl_hot_car VALUES(NULL,4,'img/product_list/150302516748976s8vh.jpg','69800','新帝豪百万款',110);
INSERT INTO jl_hot_car VALUES(NULL,5,'img/product_list/15030251794412mfk2m.jpg','87800','帝豪GS运动版',348);
INSERT INTO jl_hot_car VALUES(NULL,6,'img/product_list/15052849568504n93xm.jpg','82800','帝豪GS优雅版',95);
INSERT INTO jl_hot_car VALUES(NULL,7,'img/product_list/15030252627454e153y.jpg','58900','新远景',133);
INSERT INTO jl_hot_car VALUES(NULL,8,'img/product_list/15030252187824q8kiq.jpg','45900','远景X1',84);
INSERT INTO jl_hot_car VALUES(NULL,9,'img/product_list/1503025205749dseuv.jpg','81900','远景SUV',260);
INSERT INTO jl_hot_car VALUES(NULL,10,'img/product_list/1503025251023yxtwb.jpg','85800','帝豪GL',390);
INSERT INTO jl_hot_car VALUES(NULL,11,'img/product_list/15030252391688w3amd.jpg','47900','全新金刚',658);
INSERT INTO jl_hot_car VALUES(NULL,12,'img/product_list/14999961032671dcorx.jpg','195800','帝豪EV300',16);
INSERT INTO jl_hot_car VALUES(NULL,1,'img/product_list/15030252811055rsqc5.jpg','8999','博越',3238);
INSERT INTO jl_hot_car VALUES(NULL,2,'img/product_list/150673221013514odwh.jpg','49900','远景X3',1219);
INSERT INTO jl_hot_car VALUES(NULL,3,'img/product_list/15030251550422av2q3.jpg','109800','新博瑞',584);
INSERT INTO jl_hot_car VALUES(NULL,4,'img/product_list/150302516748976s8vh.jpg','67800','新帝豪百万款',90);
INSERT INTO jl_hot_car VALUES(NULL,5,'img/product_list/15030251794412mfk2m.jpg','77800','帝豪GS运动版',548);
INSERT INTO jl_hot_car VALUES(NULL,6,'img/product_list/15052849568504n93xm.jpg','10800','帝豪GS优雅版',195);
INSERT INTO jl_hot_car VALUES(NULL,7,'img/product_list/15030252627454e153y.jpg','48900','新远景',233);
INSERT INTO jl_hot_car VALUES(NULL,8,'img/product_list/15030252187824q8kiq.jpg','65800','远景X1',184);
INSERT INTO jl_hot_car VALUES(NULL,9,'img/product_list/1503025205749dseuv.jpg','92100','远景SUV',60);
INSERT INTO jl_hot_car VALUES(NULL,10,'img/product_list/1503025251023yxtwb.jpg','10200','帝豪GL',90);
INSERT INTO jl_hot_car VALUES(NULL,11,'img/product_list/15030252391688w3amd.jpg','68900','全新金刚',258);
INSERT INTO jl_hot_car VALUES(NULL,12,'img/product_list/14999961032671dcorx.jpg','155800','帝豪EV300',116);

CREATE TABLE jl_detail(
	cid int(11) PRIMARY KEY auto_increment, #汽车编号
	fid int(11) NOT NULL,                   #车名系列
	fname varchar(128) NOT NULL DEFAULT '',
	sm varchar(128) NOT NULL DEFAULT '',   #颜色点
	sm_desc varchar(64) NOT NULL DEFAULT '', #颜色描述
	md varchar(128) NOT NULL DEFAULT '',     #不同颜色车图
	cc varchar(128) NOT NULL DEFAULT '',     #汽车排量
	spec varchar(128) NOT NULL DEFAULT '',   #汽车型号
	`inner` varchar(128) NOT NULL DEFAULT '',  #汽车内饰
	inner_spec varchar(128) NOT NULL DEFAULT '', #汽车内饰描述
	price int(16),                                 #价格全额
	foregift int(16)                               #订金
);

INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027860682e1c76.png','汉白玉','img/product_detail/boyue/15000278669546wdst0.jpg','2.0L手动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',108800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027860682e1c76.png','汉白玉','img/product_detail/boyue/15000278669546wdst0.jpg','2.0L手动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',128800,15000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027860682e1c76.png','汉白玉','img/product_detail/boyue/15000278669546wdst0.jpg','1.8TD自动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',138800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027860682e1c76.png','汉白玉','img/product_detail/boyue/15000278669546wdst0.jpg','1.8TD自动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',148800,16000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027860682e1c76.png','汉白玉','img/product_detail/boyue/15000278669546wdst0.jpg','1.8TD自动四驱','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',158800,12000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027860682e1c76.png','汉白玉','img/product_detail/boyue/15000278669546wdst0.jpg','1.8TD自动四驱','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',168800,17000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000278280837pd4bl.png','墨玉黑','img/product_detail/boyue/15000278192882zn8x4.jpg','2.0L手动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',108800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000278280837pd4bl.png','墨玉黑','img/product_detail/boyue/15000278192882zn8x4.jpg','2.0L手动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',128800,15000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000278280837pd4bl.png','墨玉黑','img/product_detail/boyue/15000278192882zn8x4.jpg','1.8TD自动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',138800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000278280837pd4bl.png','墨玉黑','img/product_detail/boyue/15000278192882zn8x4.jpg','1.8TD自动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',148800,16000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000278280837pd4bl.png','墨玉黑','img/product_detail/boyue/15000278192882zn8x4.jpg','1.8TD自动四驱','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',158800,12000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000278280837pd4bl.png','墨玉黑','img/product_detail/boyue/15000278192882zn8x4.jpg','1.8TD自动四驱','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',168800,17000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027801861jog3n.png','珍珠银','img/product_detail/boyue/15000278103302rwci4.jpg','2.0L手动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',108800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027801861jog3n.png','珍珠银','img/product_detail/boyue/15000278103302rwci4.jpg','2.0L手动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',128800,15000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027801861jog3n.png','珍珠银','img/product_detail/boyue/15000278103302rwci4.jpg','1.8TD自动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',138800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027801861jog3n.png','珍珠银','img/product_detail/boyue/15000278103302rwci4.jpg','1.8TD自动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',148800,16000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027801861jog3n.png','珍珠银','img/product_detail/boyue/15000278103302rwci4.jpg','1.8TD自动四驱','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',158800,12000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027801861jog3n.png','珍珠银','img/product_detail/boyue/15000278103302rwci4.jpg','1.8TD自动四驱','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',168800,17000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027772943kx6iq.png','珊瑚红','img/product_detail/boyue/15000277634866c7tm9.jpg','2.0L手动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',108800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027772943kx6iq.png','珊瑚红','img/product_detail/boyue/15000277634866c7tm9.jpg','2.0L手动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',128800,15000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027772943kx6iq.png','珊瑚红','img/product_detail/boyue/15000277634866c7tm9.jpg','1.8TD自动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',138800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027772943kx6iq.png','珊瑚红','img/product_detail/boyue/15000277634866c7tm9.jpg','1.8TD自动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',148800,16000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027772943kx6iq.png','珊瑚红','img/product_detail/boyue/15000277634866c7tm9.jpg','1.8TD自动四驱','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',158800,12000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/1500027772943kx6iq.png','珊瑚红','img/product_detail/boyue/15000277634866c7tm9.jpg','1.8TD自动四驱','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',168800,17000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/150002774825115503y.png','玛瑙棕','img/product_detail/boyue/15000277543115myx79.jpg','2.0L手动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',108800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/150002774825115503y.png','玛瑙棕','img/product_detail/boyue/15000277543115myx79.jpg','2.0L手动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',128800,15000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/150002774825115503y.png','玛瑙棕','img/product_detail/boyue/15000277543115myx79.jpg','1.8TD自动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',138800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/150002774825115503y.png','玛瑙棕','img/product_detail/boyue/15000277543115myx79.jpg','1.8TD自动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',148800,16000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/150002774825115503y.png','玛瑙棕','img/product_detail/boyue/15000277543115myx79.jpg','1.8TD自动四驱','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',158800,12000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/150002774825115503y.png','玛瑙棕','img/product_detail/boyue/15000277543115myx79.jpg','1.8TD自动四驱','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',168800,17000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000277121988srhhz.png','钛铂金','img/product_detail/boyue/15000276999819wttc4.jpg','2.0L手动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',108800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000277121988srhhz.png','钛铂金','img/product_detail/boyue/15000276999819wttc4.jpg','2.0L手动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',128800,15000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000277121988srhhz.png','钛铂金','img/product_detail/boyue/15000276999819wttc4.jpg','1.8TD自动','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',138800,9999);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000277121988srhhz.png','钛铂金','img/product_detail/boyue/15000276999819wttc4.jpg','1.8TD自动','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',148800,16000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000277121988srhhz.png','钛铂金','img/product_detail/boyue/15000276999819wttc4.jpg','1.8TD自动四驱','智尚型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',158800,12000);
INSERT INTO jl_detail VALUES(NULL,1,'博越','img/product_detail/boyue/15000277121988srhhz.png','钛铂金','img/product_detail/boyue/15000276999819wttc4.jpg','1.8TD自动四驱','智联型','img/product_detail/boyue/150025312216056m2fk.png','炫黑运动内饰',168800,17000);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15020982937532isttu.png','钛晶灰','img/product_detail/yjx3/15020739381582bl1n.png','1.5L-5MT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',53900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15020982937532isttu.png','钛晶灰','img/product_detail/yjx3/15020739381582bl1n.png','1.5L-5MT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',57900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15020982937532isttu.png','钛晶灰','img/product_detail/yjx3/15020739381582bl1n.png','1.5L-4AT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',61900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15020982937532isttu.png','钛晶灰','img/product_detail/yjx3/15020739381582bl1n.png','1.5L-4AT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',65900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/150217779891073tia0.png','珊瑚红','img/product_detail/yjx3/15021777958646vx1hc.png','1.5L-5MT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',53900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/150217779891073tia0.png','珊瑚红','img/product_detail/yjx3/15021777958646vx1hc.png','1.5L-5MT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',57900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/150217779891073tia0.png','珊瑚红','img/product_detail/yjx3/15021777958646vx1hc.png','1.5L-4AT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',61900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/150217779891073tia0.png','珊瑚红','img/product_detail/yjx3/15021777958646vx1hc.png','1.5L-4AT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',65900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15021777841264b31pf.png','宝石蓝','img/product_detail/yjx3/15021777780803urmm3.png','1.5L-5MT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',53900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15021777841264b31pf.png','宝石蓝','img/product_detail/yjx3/15021777780803urmm3.png','1.5L-5MT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',57900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15021777841264b31pf.png','宝石蓝','img/product_detail/yjx3/15021777780803urmm3.png','1.5L-4AT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',61900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15021777841264b31pf.png','宝石蓝','img/product_detail/yjx3/15021777780803urmm3.png','1.5L-4AT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',65900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15020917198836g7x05.png','琥珀橙','img/product_detail/yjx3/15020739123637tyrrw.png','1.5L-5MT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',53900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15020917198836g7x05.png','琥珀橙','img/product_detail/yjx3/15020739123637tyrrw.png','1.5L-5MT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',57900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15020917198836g7x05.png','琥珀橙','img/product_detail/yjx3/15020739123637tyrrw.png','1.5L-4AT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',61900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15020917198836g7x05.png','琥珀橙','img/product_detail/yjx3/15020739123637tyrrw.png','1.5L-4AT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',65900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1502177811737h96fd.png','琉光金','img/product_detail/yjx3/15021778077615t1wpz.png','1.5L-5MT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',53900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1502177811737h96fd.png','琉光金','img/product_detail/yjx3/15021778077615t1wpz.png','1.5L-5MT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',57900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1502177811737h96fd.png','琉光金','img/product_detail/yjx3/15021778077615t1wpz.png','1.5L-4AT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',61900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1502177811737h96fd.png','琉光金','img/product_detail/yjx3/15021778077615t1wpz.png','1.5L-4AT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',65900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15021778248966c7ck8.png','冰晶白','img/product_detail/yjx3/150217782057847h2cv.png','1.5L-5MT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',53900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15021778248966c7ck8.png','冰晶白','img/product_detail/yjx3/150217782057847h2cv.png','1.5L-5MT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',57900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15021778248966c7ck8.png','冰晶白','img/product_detail/yjx3/150217782057847h2cv.png','1.5L-4AT','精英型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',61900,500);
INSERT INTO jl_detail VALUES(NULL,2,'远景X3','img/product_detail/yjx3/15021778248966c7ck8.png','冰晶白','img/product_detail/yjx3/150217782057847h2cv.png','1.5L-4AT','尊贵型','img/product_detail/yjx3/15020919971338stfoi.png','黑色',65900,500);

CREATE TABLE jl_car_family(
    pid int(11) PRIMARY KEY auto_increment,
	fid int(11),
	fname varchar(128) NOT NULL DEFAULT '',
	lg varchar(128) NOT NULL DEFAULT ''
);

INSERT INTO jl_car_family VALUES(NULL,1,'博越','img/product_detail/boyue/1508985590921215O8Pj.jpg');
INSERT INTO jl_car_family VALUES(NULL,1,'博越','img/product_detail/boyue/1508985595490929JexJ.jpg');
INSERT INTO jl_car_family VALUES(NULL,1,'博越','img/product_detail/boyue/1500028089727756Fq9J.jpg');
INSERT INTO jl_car_family VALUES(NULL,1,'博越','img/product_detail/boyue/1500028099864902IzgX.jpg');
INSERT INTO jl_car_family VALUES(NULL,1,'博越','img/product_detail/boyue/15000281131439589I72.jpg');
INSERT INTO jl_car_family VALUES(NULL,1,'博越','img/product_detail/boyue/1500028156407247Xgbd.jpg');
INSERT INTO jl_car_family VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1503638076716829jRYJ.jpg');
INSERT INTO jl_car_family VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1503637159261879.jpg');
INSERT INTO jl_car_family VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1503637160404847.jpg');
INSERT INTO jl_car_family VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1503637160350812.jpg');
INSERT INTO jl_car_family VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1503637161210456.jpg');
INSERT INTO jl_car_family VALUES(NULL,2,'远景X3','img/product_detail/yjx3/1503637161734073.jpg');


CREATE TABLE jl_shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  cid INT,
  `count` INT,
  price1 int(16),
  is_checked enum("0","1") DEFAULT '0'
);

INSERT INTO jl_shoppingcart_item VALUES(NULL,1,1,1,9999,'0');
INSERT INTO jl_shoppingcart_item VALUES(NULL,1,2,1,5000,'0');
INSERT INTO jl_shoppingcart_item VALUES(NULL,1,3,1,8900,'0');





