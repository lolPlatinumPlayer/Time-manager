<?PHP
 
    require '../app_config.php'; 
    require_once('../SUBMAILAutoload.php');
       
    $submail=new MESSAGEXsend($message_configs);
    
    /*
     |必选参数
     |--------------------------------------------------------------------------
     |设置短信接收的11位手机号码
     |--------------------------------------------------------------------------
     */    
    $submail->setTo('18368492446');
    
    /*
     |必选参数
     |--------------------------------------------------------------------------
     |设置短信模板ID
     |--------------------------------------------------------------------------
     */    
    $submail->SetProject('Q4Daw3');
    
    /*
     |可选参数
     |--------------------------------------------------------------------------
     |添加文本变量
     |可多次调用
     |--------------------------------------------------------------------------
     */   
    $submail->AddVar('code','验证码验证码验证码验证码验证码验证码');
    $submail->AddVar('use','注册帐号注册帐号注册帐号注册帐号注册帐号注册帐号');
    
    /*
     |调用 xsend 方法发送短信
     |--------------------------------------------------------------------------
     */    
    $xsend=$submail->xsend();
    
    
    /*
     |打印服务器返回值
     |--------------------------------------------------------------------------
     */
    
    print_r($xsend);
