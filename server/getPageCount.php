<?php

$db = mysqli_connect("127.0.0.1", "root", "", "shop");

$size = 20;

$sql = "SELECT * FROM goods";
mysqli_query($db,"SET NAMES utf8");
$result = mysqli_query($db,$sql);

$total = mysqli_num_rows($result);

$num = ceil($total / $size);

echo $num;
?>