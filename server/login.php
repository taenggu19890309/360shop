<?php
$db = mysqli_connect("127.0.0.1", "root", "", "shop");

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

$sql = "SELECT * FROM user WHERE user_name='$username'" ;
$result = mysqli_query($db,$sql);

$data = array("status"=>"","data"=>array("msg"=>""));
if(mysqli_num_rows($result) == 0)
{
  $data["status"] = "error";
  $data["data"]["msg"] = "登录失败，用户名不存在";
}else{
  $sql2 = "SELECT * FROM user WHERE user_name='$username'";
  $result = mysqli_query($db,$sql2);
  $res = mysqli_fetch_all($result, MYSQLI_ASSOC);
  $pwd = $res[0]["user_pwd"];
  if($password !=  $pwd)
  {
    $data["status"] = "error";
    $data["data"]["msg"] = "登录失败，密码不正确！！！";
  }else
  {
    $userId = $res[0]["user_id"];
    $data["status"] = "success";
    $data["data"]["msg"] = "恭喜你，登录成功";
    $data["data"]["userId"] = $userId;
    $data["data"]["password"] = $password;
    $data["data"]["username"] = $username;
  }
}
echo json_encode($data,true);
