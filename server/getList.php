<?php

/* 1、连接数据库 */
$db = mysqli_connect("127.0.0.1", "root", "", "shop");
mysqli_query($db,"SET NAMES utf8");

$page = $_REQUEST["page"];  /* 0 1 2 3  */
$sort = $_REQUEST["sort"];

$limit = $page * 20;

if($sort == "active"){
  $sql = "SELECT * FROM goods Order BY good_id LIMIT $limit,20";
}elseif($sort == "price_sort"){
  $sql = "SELECT * FROM goods Order BY good_price ASC LIMIT $limit ,20";
} 

$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

/* 3、把数据转换为JSON数据返回 */
echo json_encode($data,true);
?>