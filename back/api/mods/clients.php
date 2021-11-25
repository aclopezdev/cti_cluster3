<?php


$_mods['clients'] = [
    'get_clients_list' => function ($args, $data) {
        global $output;

        $clients = $data['mysql']->query('SELECT `uid` as `ID`, `first_name`, `last_name`, `address`, `phone`, `status`, `date_crea`, `user_crea` FROM `clients` WHERE 1 ORDER BY `date_crea` DESC LIMIT 200;');
        $clients = $data['mysql']->fetch2buffer($clients);

        $output['clients'] = $clients;
    },
    'add_new_client' => function ($args, $data) {
        global $output;

        $uid = uuid();
        $resp = $data['mysql']->query("INSERT INTO `clients` (`uid`, `first_name`, `last_name`, `address`, `phone`, `status`, `date_crea`, `user_crea`) VALUES ('" . $uid . "', '" . $args['first_name'] . "', '" . $args['last_name'] . "', '" . $args['address'] . "', '" . $args['phone'] . "', '1', '" . $data['datetime_now'] . "', '');");

        $output['error'] = !$resp;
    },
    'edit_client' => function ($args, $data) {
        global $output;

        $uid = uuid();
        $resp = $data['mysql']->query("UPDATE `clients` SET `first_name` = '" . $args['first_name'] . "', `last_name` = '" . $args['last_name'] . "', `address` = '" . $args['address'] . "', `phone` = '" . $args['phone'] . "' WHERE `uid` = '" . $args['id'] . "';");

        $output['error'] = !$resp;
    },
    'get_client' => function ($args, $data) {
        global $output;

        $clients = $data['mysql']->query("SELECT `uid` as `ID`, `first_name`, `last_name`, `address`, `phone`, `status`, `date_crea`, `user_crea` FROM `clients` WHERE `uid` = '" . $args['id'] . "' ORDER BY `date_crea` DESC LIMIT 1;");
        $clients = $data['mysql']->fetch2array($clients);

        $output['clients'] = $clients;
    },
    'toggle_client' => function ($args, $data) {
        global $output;

        $clients = $data['mysql']->query("SELECT `status` FROM `clients` WHERE `uid` = '" . $args['id'] . "' ORDER BY `date_crea` DESC LIMIT 1;");
        $clients = $data['mysql']->fetch2array($clients);

        $status = $clients['status'] === '1' ? 0 : 1;

        $resp = $data['mysql']->query("UPDATE `clients` SET `status` = '" . $status . "' WHERE `uid` = '" . $args['id'] . "';");

        $output['error'] = !$resp;
    },
    'find_client' => function ($args, $data) {
        global $output;

        $clients = $data['mysql']->query("SELECT `uid` as `ID`, `first_name`, `last_name`, `address`, `phone`, `status`, `date_crea`, `user_crea` FROM `clients` WHERE (`first_name` LIKE '%" . $args['txt'] . "%' OR `last_name` LIKE '%" . $args['txt'] . "%' OR `uid` LIKE '%" . $args['txt'] . "%') AND `status` = '1'  ORDER BY `date_crea` DESC;");
        $clients = $data['mysql']->fetch2buffer($clients);

        $output['clients'] = $clients;
    },
];
