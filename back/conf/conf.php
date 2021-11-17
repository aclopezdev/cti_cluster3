<?php

// $_conf['db'] = new MysqlDB($_local_db);
$_conf['db'] = new MysqlDB($_remote_db);
$_conf['db']->connect();

?>