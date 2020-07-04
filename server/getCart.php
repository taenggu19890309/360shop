<?php
header("Content-Type: text/html;charset=utf-8");
/* 1、连接数据库 */
$db = mysqli_connect("127.0.0.1", "root", "", "shop");
mysqli_query($db,"SET NAMES utf8");
$user_id = $_REQUEST["user_id"];

/* 多表查询 */
$sql = "SELECT cart.*,goods.good_title,goods.good_src,cart.num,goods.good_price FROM cart , goods WHERE cart.good_id = goods.good_id AND user_id=$user_id";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);
?>