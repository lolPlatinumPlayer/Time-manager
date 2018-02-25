<?php


//验证用户名密码是否正确
include 'verify_account.php'; 


$db_server = 'localhost';
$db_username = 'fkqqnptb_root';
$db_password = '1122=33';
$db_type='mysql';
$db_name='fkqqnptb_small_blog'; 
$db_tsn="$db_type:host=$db_server;dbname=$db_name";


$conn = new PDO($db_tsn, $db_username, $db_password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);// 设置 PDO 错误模式，用于抛出数据库异常




//帐号密码正确的话
//把个人时间记录信息从数据库提取出来，发送给前端
if($verify_account_result=='密码正确'){
foreach ($conn->query("SELECT * from time_record WHERE username='$receive_username'") as $row) {
	$planned_time=json_decode($row['planned_time']);
	$actual_time=json_decode($row['actual_time']);
	$begin_tracking_time=$row['begin_tracking_time'];
	$personal_time_record[]=array("planned_time"=>$planned_time,
								   "actual_time"=>$actual_time,
								   "begin_tracking_time"=>$begin_tracking_time);
}
$personal_time_record_json=json_encode($personal_time_record,JSON_UNESCAPED_UNICODE);
echo $personal_time_record_json;


}
$conn = null;

?>