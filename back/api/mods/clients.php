<?php


$_mods['clients'] = [
    'get_clients_list' => function($args, $data)
    {
        global $output;

        $clients = $data['mysql']->query('SELECT `uid` as `ID`, `first_name`, `last_name`, `address`, `phone`, `status`, `date_crea`, `user_crea` FROM `clients` WHERE 1 ORDER BY `date_crea` DESC LIMIT 200;');
        $clients = $data['mysql']->fetch2buffer($clients);

        $output['clients'] = $clients;
    },
    'add_new_client' => function($args, $data)
    {
        global $output;

        $uid = uuid();
        $resp = $data['mysql']->query("INSERT INTO `clients` (`uid`, `first_name`, `last_name`, `address`, `phone`, `status`, `date_crea`, `user_crea`) VALUES ('".$uid."', '".$args['first_name']."', '".$args['last_name']."', '".$args['address']."', '".$args['phone']."', '1', '".$data['datetime_now']."', '');");
        
        $output['error'] = !$resp;
    }
];


?>