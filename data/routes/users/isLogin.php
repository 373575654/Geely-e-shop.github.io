<?php
	header("Content-Type:application/json");
	require("../../controllers/user.controller.php");
	echo json_encode(isLogin());