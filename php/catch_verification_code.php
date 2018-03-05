<?php

/*
虽然本文件中从 验证码数据表 中获取手机号为指定手机号的行，用的是索引数组
不过本文件的算法如果没有时间差的话并不会产生索引数组长度大于1的情况
万一产生了，后续对于这写数据的读取也是以第一个值为标准
这种情况下也产生不了什么大问题
*/



//加上这句让php支持中文
header("content-type:text/html;charset=utf-8"); 
//支持本地测试的跨域返回数据
header("Access-Control-Allow-Origin: http://localhost:8080");
//为了操作时间不出现BUG，必须加上这一句 
date_default_timezone_set("Asia/Shanghai");




//连接数据库需要的各种信息
$db_server = 'localhost';
$db_username = 'root';
$db_password = 'root';
$db_type='mysql';
$db_name='fkqqnptb_small_blog'; 
$db_tsn="$db_type:host=$db_server;dbname=$db_name;charset=utf8";
  
$conn = new PDO($db_tsn, $db_username, $db_password);
$conn->setAttribute(PDO::ATTR_ERRMODE, false);

	
	
//默认情况下php给html返回json数据时如果php报错，则整个json将无法返回（返回给php还没测试）
//该函数在json情况下提供报错功能，但解析错误和致命错误无法报错，且会导致返回数据错误
function ErrorToJson($error_level,$error_message,
$error_file,$error_line){ 
	global $echo;
	$echo['err'][]=array('error_level'=>$error_level,//级别号
						  'error_message'=>$error_message,//错误信息
						  'error_file'=>$error_file,//错误文件位置
						  'error_line'=>$error_line);//错误行号
}
set_error_handler("ErrorToJson");



  


	
	
//获取前端发来的各信息
$receive_phone=$_POST['phone'];
$receive_password=$_POST['password'];
$receive_username=$_POST['username'];
//检验输入手机号格式是否符合要求
//若符合则进入后续代码
if(!preg_match("/^1[0-9]{10}$/",$receive_phone)){
	$echo['msg']='请输入正确手机号码';
}
//检测用户名是否符合要求
//这里正则中文不知道为什么成功了，来源网址https://zhidao.baidu.com/question/344567958.html
//其他地方的方法怎么都无法匹配中文
else if(!preg_match("/^[\x80-\xffA-Za-z0-9_]{1,14}$/",$receive_username)){
	$echo['msg']='用户名格式不符合要求。（用户名格式要求为：长度在14位字符以内，只能包含中文英文数字下划线）';
}

//检测密码是否符合要求
else if(!IsPasswordFormatRight($receive_password)){
	$echo['msg']='密码格式不符合要求。（密码格式要求为：6位至14位字母数字组合，区分大小写）';
	}
//如果帐号数据表中不存在与输入的相同的用户名或手机号
else if(!HaveSameUsernameOrPhone()){
	$echo['msg']='输入手机号格式符合要求，且帐号数据表中不存在与输入的相同的用户名或手机号';
	//生成随机验证码
	$verification_code=rand(100000,999999); 

	//查
	foreach ($conn->query("SELECT * from verification_code WHERE phone='$receive_phone'") as $row) {
		//获取 验证码数据表 中 “手机号”数据 与输入手机号相同的行的 “提交时间”数据
		$submit_time_of_verification_code[]=array('submit_time'=>$row['submit_time']); 
	}
	
	
	//如果该数据表中没有与输入手机号相同的 “手机号”数据 
	//则命令短信服务商发送验证码，并将该验证码相关信息放入数据表
	if(!isset($submit_time_of_verification_code)){
		$echo['msg']='验证码已发送，有效期为2分钟';
		$echo['log']='获取前该手机号验证码不存在'; 
		send_and_save_verification_code();
	}
	//如果 “提交时间”数据 过早
	//则将原来 验证码数据表 中关于这个手机号的验证码全部删除
	//再命令短信服务商发送验证码，并将该验证码相关信息放入数据表
	else if(IfSubmittimeTooEarly()){
		$echo['msg']='验证码已发送，有效期为2分钟';
		$echo['log']='获取前该手机号验证码存在，且已经过期'; 
		//删除原来残留的行
		$conn->query("DELETE FROM verification_code WHERE phone='$receive_phone'");
		send_and_save_verification_code();
	}
	//剩下的情况就是“验证码2分钟内已发送过”的情况
	//这种情况就提示用户无需重复获取
	else{
		$echo['msg']='验证码2分钟内已发送过，请勿重复获取';
		$echo['log']='获取前该手机号验证码存在，且未过期'; 
	} 
	
}//后面不需要留else给未知错误，因为最后一个else if是是非判断，且在不进入最后一个else if的情况也已经有了操作（信息提示）

$conn = null;//关闭连接
echo json_encode($echo);


//-----------------------------------以下为函数区域------------------------------------

//命令短信服务商发送验证码，并将该验证码相关信息放入数据表
function send_and_save_verification_code(){
	global $verification_code,$receive_phone,$receive_username,$receive_password,$conn,$echo;
	//------------------以下为将该验证码相关信息放入数据表-------------------
		
	//增
	$sql = "INSERT INTO verification_code (verification_code,phone,submit_time,username, password)
	VALUES ('$verification_code','$receive_phone',NOW(),'$receive_username','$receive_password')";
	$conn->exec($sql);
	
	/*
	关于定时自删的问题以后再考虑，目前已存放部分测试脚本在small_problem/delay_delete里
	有两个思路：
	1、改变php最大时间限制后用sleep()
	2、mysql定期检测过期数据并进行自删
	*/
}

//比较数据表中指定行的 “提交时间”数据 与现在的时间
//如果现在时间比提交时间大得超过30秒则返回true
//反之返回false
function IfSubmittimeTooEarly(){
	global $submit_time_of_verification_code,$echo;
	$db_time=$submit_time_of_verification_code[0]['submit_time'];
	$now_time=date("Y-m-d h:i:sa");
	$db_time_s=strtotime($db_time);
	$now_time_s=strtotime($now_time);
	if($now_time_s>$db_time_s+30){//测试用30秒。项目用120
		return true;
	}else{
		return false;
	}
}


//检查输入的用户名或手机号是否已经被注册
//都没被注册的话返回true
function HaveSameUsernameOrPhone(){
	global $conn,$echo,$receive_phone,$receive_username;
	//查
	foreach ($conn->query('SELECT phone,username from account') as $row) {
		if($receive_phone==$row['phone']){
			$echo['msg']='该手机号已被注册，请更换手机号进行注册';
			return true;
			break;
		}else if($receive_username==$row['username']){
			$echo['msg']='该用户名已被注册，请更换用户名进行注册';
			return true;
			break;
		}
	}
	return false;
}

//检测密码格式是否符合要求
function IsPasswordFormatRight($password){
	//要求：6位至14位字母数字组合，区分大小写
	//要求：6至14位、只能由字母和数字组成
	if(preg_match("/^[a-zA-Z0-9]{6,14}$/",$password)&&
	//要求：6至14位、不能全是数字
	!preg_match("/^[0-9]{6,14}$/",$password)&&
	//要求：6至14位、不能全是字母
	!preg_match("/^[a-zA-Z]{6,14}$/",$password)){
		return true;
	}else{
		return false;
	}
}



?>