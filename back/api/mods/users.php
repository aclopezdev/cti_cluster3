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

        $users = $data['mysql']->query('SELECT `uid` as `ID`, `first_name`, `last_name`, `email`, `status`, `date_crea`, `type` as `USER-TYPE` FROM `users` WHERE `uid` = "' . $args['id'] . '" ORDER BY `date_crea` DESC LIMIT 100;');
        $users = $data['mysql']->fetch2buffer($users);

        $output['users'] = $users;
    },
    'new_user' => function ($args, $data) {
        global $output;

        $email = $args['email'];
        $first_name = $args['first_name'];
        $last_name = $args['last_name'];
        $type = $args['type'];
        $password = $args['password'];

        $output['error'] = false;

        $user = "SELECT `uid` FROM `users` WHERE `email` = '".$email."' LIMIT 1;";
        $user = $data['mysql']->query($user);
        $user = $data['mysql']->fetch2buffer($user);

        if(count($user) > 0)
        {
            add_log('This user already exist. Change Email and tray again.');
            $output['error'] = true;
            return;
        }

        $uid = uuid();
        $insert = "INSERT INTO `users` (`uid`, `first_name`, `last_name`, `email`, `password`, `type`, `date_crea`, `status`) VALUES ('".$uid."', '".$first_name."', '".$last_name."', '".$email."', '".$password."', '".$type."', '".$data['datetime_now']."', '1');";
        $insert = $data['mysql']->query($insert);
    },
    'toggle_user' => function($args, $data)
    {
        global $output;
        $output['error'] = false;

        $uid = $args['id'];
        $user = "SELECT `status` FROM `users` WHERE `uid` = '".$uid."' LIMIT 1;";
        // add_log($user);
        $user = $data['mysql']->query($user);
        $user = $data['mysql']->fetch2array($user);

        if(!isset($user['status']))
        {
            add_log('This user does not exist.');
            $output['error'] = true;
            return;
        }

        $status = intval($user['status']);
        if($status == 1)
            $status = 0;
        else
            $status = 1;

        $update = "UPDATE `users` SET `status` = '".$status."' WHERE `uid` = '".$uid."' LIMIT 1;";
        $update = $data['mysql']->query($update);
    }
];
