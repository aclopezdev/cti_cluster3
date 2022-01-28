<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
header("content-type: application/json");
header("Access-Control-Allow-Credentials",true);
header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept;");
header("Access-Control-Allow-Origin","*");
header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE");
// header("content-type: text/html; charset=UTF-8");
// header("content-type: application/x-www-form-urlencoded");

include_once('../conf/setup.php');
include_once('../conf/mysql/conn.php');
include_once('../conf/conf.php');
include_once('conf/tools.php');
include_once('conf/conf.php');

if(count($input) > 0)
{
    $_module = isset($input['mod']) ? $input['mod'] : null;
    $_cmd = isset($input['cmd']) ? $input['cmd'] : null;
    $_args = isset($input['args']) ? $input['args'] : []; 
    
    if($_module && $_cmd)
    {
        $mod = 'mods/'.$_module.'.php';
        if(file_exists($mod))
        {
            include_once($mod);
            if($_mods[$_module][$_cmd])
                $_mods[$_module][$_cmd]($_args, $_data);
        }
    }
}

die(json_encode($output));

?>