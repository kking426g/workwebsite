<?php
session_start();

?>
<img id="captcha_one" src="output.php?namespace=form1">

<!-- ＋Math.random(); this.blur(); return false" -->
<form action="myout.php" method="post">
　輸入: <input type="text" name="userInput" />

　<input type="submit" value="送出">
</form>
<button onclick="document.getElementById('captcha_one').src = 'output.php?namespace=captcha_one&' + Math.random(); this.blur(); return false">重新整理</button>

<br/>
<img id="captcha_two" src= "output.php?namespace=form2">
<form action="myout2.php" method="post">
　輸入: <input type="text" name="userInput2" />
　<input type="submit" value="送出">
</form>
<button onclick="document.getElementById('captcha_two').src = 'output.php?namespace=captcha_two&' + Math.random(); this.blur(); return false">重新整理</button>
