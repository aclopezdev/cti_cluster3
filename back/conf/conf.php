<?php

$_conf['db'] = new MysqlDB($_db_conf);
$_conf['db']->connect();

$cmd = $_REQUEST['cmd'];

?>