<?php



//加上这句让php支持中文
header("content-type:text/html;charset=utf-8"); 
include 'verify_account.php';
if($verify_account_result=='密码正确'){
	//接收前端传来的数据
	$planned_time=json_encode($_POST['planned_time'],JSON_UNESCAPED_UNICODE);
	$actual_time=json_encode($_POST['actual_time'],JSON_UNESCAPED_UNICODE);
	$begin_tracking_time=$_POST['begin_tracking_time'];
	
	$db_server = 'localhost';
	$db_username = 'fkqqnptb_root';
	$db_password = '1122=33';
	$db_type='mysql';
	$db_name='fkqqnptb_small_blog'; 
	$db_tsn="$db_type:host=$db_server;dbname=$db_name";

	$conn = new PDO($db_tsn, $db_username, $db_password); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);// 设置 PDO 错误模式，用于抛出数据库异常

	
	
	//上传时间记录至数据表
	$sql = "INSERT INTO time_record (`planned_time`,`actual_time`,`begin_tracking_time`, `username`, `date`)
    VALUES ( '$planned_time', '$actual_time', '$begin_tracking_time', '$receive_username', NOW())";
    $conn->exec($sql);
	
	
	
	//如果正常提交数据也没什么好返回的，就不用echo了
    
}
//如果帐号不正确则返回 验证帐号.php 返回的内容
//这个内容会告诉你帐号不正确的原因
else{
	echo $verify_account_result;
}

?>