<?php

$input = isset($_POST['input']) ? json_decode($_POST['input'], true) : [];
$output = [
    'log' => array(),
    'error' => false
];
$_data = [
    'mysql' => $_conf['db'],
    'output' => $output,
    'datetime_format' => 'Y-m-d H:i:s',
    'datetime_now' => date('Y-m-d H:i:s'),
    'timestamp_now' => time()
];
$_mods = [];


$session_conf = $_data['mysql']->query("SELECT `value` FROM `login_config` WHERE `name` = 'user_session_time';");
$session_conf = $_data['mysql']->fetch2array($session_conf);

$_data['session_days'] = $session_conf['value'];


function add_log($txt)
{
    global $output;
    array_push($output['log'], $txt);
}

?>