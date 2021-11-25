<?php


$_mods['users'] = [
    'get_full_users' => function ($args, $data) {
        global $output;

        $users = $data['mysql']->query('SELECT `uid`, `first_name`, `last_name`, `email`, `status`, `date_crea` FROM `users` WHERE 1 ORDER BY `date_crea` DESC LIMIT 100;');
        $users = $data['mysql']->fetch2buffer($users);

        $output['users'] = $users;
    },
    'get_user_data' => function ($args, $data) {
        global $output;

        $users = $data['mysql']->query('SELECT `uid` as `ID`, `first_name`, `last_name`, `email`, `status`, `date_crea` FROM `users` WHERE `uid` = "' . $args['id'] . '" ORDER BY `date_crea` DESC LIMIT 100;');
        $users = $data['mysql']->fetch2buffer($users);

        $output['users'] = $users;
    },
    'new_user' => function ($args, $data) {
        global $output;

        $output['message'] = '';
    }
];
