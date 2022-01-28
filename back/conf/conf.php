<?php

$db_address = strpos($_SERVER['HTTP_HOST'], 'localhost') !== false ? $_remote_db : $_local_db2;
// $db_address = $_local_db2; 
// if(str_contains($_SERVER['HTTP_HOST'], 'localhost'))
// 	$db_address = $_remote_db;
$_conf['db'] = new MysqlDB($db_address);
$_conf['db']->connect();

?>