<?php
header("Content-Type: text/html;charset=utf-8");

$db = mysqli_connect("127.0.0.1", "root", "", "shop");
$sql = "SELECT * FROM goods LIMIT 0,60";
mysqli_query($db,"SET NAMES utf8");
$result = mysqli_query($db,$sql);
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
?>