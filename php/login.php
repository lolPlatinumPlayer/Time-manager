<?php

//因为verify_account.php是给php文件引用的
//不是所有引用它的文件都要echo
//所以才会出现这个文件中的情况
include 'verify_account.php';
echo $verify_account_result;

?>