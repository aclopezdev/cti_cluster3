<?php


include_once('conf/setup.php');
include_once('conf/mysql/conn.php');
include_once('conf/conf.php');


if(strtolower($cmd) == 'api')
{
    include_once('api');
    exit();
}


?>