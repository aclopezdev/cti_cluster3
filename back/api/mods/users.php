<?php

$_mods['users'] = [
    'get_full_list' => function ($args, $data) {
        global $output;

        $users = $data['mysql']->query('SELECT `uid`, `first_name`, `last_name`, `email`, `status`, `date_crea` FROM `users` ORDER BY `date_crea` ASC;');
        $users = $data['mysql']->fetch2buffer($users);

        $output['users'] = $users;
    },
    'get_user_data' => function ($args, $data) {
        global $output;

        $users = $data['mysql']->query('SELECT `uid`, `first_name`, `last_name`, `email`, `status`, `date_crea` FROM `users` WHERE `uid` = "' . $args['id'] . '" ORDER BY `date_crea` ASC;');
        $users = $data['mysql']->fetch2buffer($users);

        $output['users'] = $users;
    },
    'new_user' => function ($args, $data) {
        global $output;

        $output['message'] = '';
    }
];
