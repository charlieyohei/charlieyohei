<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>よくわかるPHPの教科書</title>

</head>

<body style="background:#CCC;">

<h1>PHPの基本</h1>
	<h2>画面に文章を表示するp38</h2>
		<div>
			<?php
				print ('PHPを勉強中です！');
			?><br />
            <?php
				print ('PHPも勉強中です！');
			?><br />
        	<!-- なぜか改行ができない(ﾟдﾟ;) -->
        	<?php
				echo ("/n");
			?>
        		<?php
            		echo ('たにかわ ようへい');
				?><br />
			<p>
				<?php
        			print ('PHPだって勉強してるんです！');
				?><br />
    		</p>
			<a href="<?php print('0428.php');?>">
    			タグの属性にPHPを埋め込んでみた
    		</a>
        </div>

	<h2>画面にHTMLを表示するp42</h2>
		<div>
			<?php
				print ('<h2 style="font-size: 110% font-weght: bold;">画面にHTMLを表示する</h2>');
				print ('<p>PHPはHTMLの中に埋め込んで記述する事ができる。</p>');
				print ('<p>改行する時は、<br />brタグを記述する。</p>');
			?>
        </div>

	<h2>画面に現在時刻を表示する</h2>
		<div>
			<?php
				print ('現在は'.date('G時 i分 s秒').'です');
			?><br />
        	<?php
				print (date('G時 i分 s秒'));
			?><br />
        		<?php
					print (date('Y').'年＝年を４桁');
					print (date('y').'年＝年を下２桁');
				?><br />
            <?php
				print ('今日は'.date('Y年 n月 j日').'です');
			?>
        </div>
        
        
</body>
</html>