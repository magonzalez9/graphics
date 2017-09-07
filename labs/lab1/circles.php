<?php include('../../visual/header.php'); ?>
<script src="circle.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="css/main.css">

<h1>Generate a circle!</h1>
<canvas id="myCanvas" width="400" height="425" onclick="drawOnCanvas(event);" oncontextmenu="colorCircle(); return false; ">
Your browser does not support the HTML5 canvas tag.</canvas>

<p><b>Directions:</b> Click on the canvas to generate a circle with a random radius. Right click the canvas to give the generated circles some color</p>
<p id="circleDescription"></p>


<?php include('../../visual/footer.php');?>