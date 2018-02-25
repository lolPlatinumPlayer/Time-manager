<?php


//加上这句让php支持中文
header("content-type:text/html;charset=utf-8"); 
//连接数据库需要的各种信息
$db_server = 'localhost';
$db_username = 'fkqqnptb_root';
$db_password = '1122=33';
$db_type='mysql';
//连接的数据库名称
$db_name='fkqqnptb_small_blog'; 
$db_tsn="$db_type:host=$db_server;dbname=$db_name";

$conn = new PDO($db_tsn, $db_username, $db_password); 
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);// 设置 PDO 错误模式，用于抛出数据库异常

$receive_username=$_POST['username'];
$receive_password=$_POST['password'];

//从帐号数据表里提取该用户名的行
foreach ($conn->query("SELECT * from account WHERE username='$receive_username'") as $row) { 
	//$account[]=array('username'=>$row['username'],'password'=>$row['password']);
	$password_from_ds[]=$row['password'];
}

function verify(){
	global $password_from_ds,$receive_password;
	if(!isset($password_from_ds)){
		return '用户名不存在';
	}
	else if(count($password_from_ds)>1){
		return '数据库里有多个相同用户名，请联系站长进行调整';
	}
	else{
		if($password_from_ds[0]===$receive_password){
			return '密码正确';
		}else{
			return '密码错误';
		}
	}
}

$verify_account_result=verify();

//似乎没有关闭连接

?>