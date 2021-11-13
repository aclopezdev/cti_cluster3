<?php

$input = isset($_POST['input']) ? json_decode($_POST['input'], true) : [];
$output = [
    'log' => array()
];
$_data = [];
$_cmds = [];



function add_log($txt)
{
    global $output;
    array_push($output['log'], $txt);
}

?>