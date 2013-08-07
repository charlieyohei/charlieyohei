<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>practice04.php</title>
</head>

<body>
	<?php
		print ('お名前：'.htmlspecialchars($_GET['my_name'], ENT_QUOTES));
	?>
    <?php
		print ('メッセージ：'.htmlspecialchars($_GET['message'], ENT_QUOTES));
	?>
</body>
</html>