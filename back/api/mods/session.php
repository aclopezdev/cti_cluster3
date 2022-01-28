<?php


$_mods['session'] = [
    'checker' => function($args, $data)
    {
        global $output;
        add_log('111111');

        $ip = get_user_ip();
        $browser = get_user_browser();
        $session = [];
        $id_query = '';
        if(isset($args['id']))
            $id_query = "`uid_user` LIKE '%".$args['id']."' AND ";

        $session = $data['mysql']->query("SELECT `uid`, `uid_user`, `token` FROM `user_login` WHERE ".$id_query." `ip` = '".$ip."' AND `browser` = '".$browser."' AND `date_crea` <= '".$data['datetime_now']."' AND `date_end` > '".$data['datetime_now']."' AND `status` = '1' ORDER BY `date_crea` DESC LIMIT 1;");
        $session = $data['mysql']->fetch2array($session);
        if(count($session) == 0)
        {
            $output['logged'] = false;
            $output['error'] = true;
            return;
        }

        $user = $data['mysql']->query("SELECT `uid`, `first_name`, `last_name`, `email`, `type` FROM `users` WHERE `uid` = '".$session['uid_user']."' AND `status` = '1';");
        $user = $data['mysql']->fetch2array($user);
        
        if(count($session) == 0)
        {
            $output['error'] = true;
            return;
        }

        $output['user'] = array(
            'logged' => true,
            'token' => $session['token'],
            'id' => substr($user['uid'], strlen($user['uid']) - 20, strlen($user['uid']) - 1),
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'email' => $user['email'],
            'USER-TYPE' => $user['type']
        );
    },
    'signup' => function($args, $data)
    {
        global $output;
        $uid = uuid();
        var_dump($uid);
        // $data['mysql']->query("SELECT * FROM `users` WHERE `email` = '".$args['user']."' AND `password` = '".$args['pass']."';");
    },
    'login' => function($args, $data)
    {
        global $output;

        $user = "SELECT `uid`, `first_name`, `last_name`, `email` FROM `users` WHERE `email` = '".$args['user']."' AND `password` = '".$args['pass']."' AND `status` = '1';";
        $user = $data['mysql']->query($user);
        $user = $data['mysql']->fetch2array($user);
        
        if(count($user) == 0)
        {
            $output['error'] = true;
            add_log('User does not exist or is banned, check your data and try again.');
            return;
        }

        $ip = get_user_ip();
        $browser = get_user_browser();

        $session = $data['mysql']->query("SELECT `uid`, `token` FROM `user_login` WHERE `uid_user` = '".$user['uid']."' AND  AND `status` = '1' AND `ip` = '".$ip."' AND `browser` = '".$browser."' AND `date_crea` <= '".$data['datetime_now']."' AND `date_end` > '".$data['datetime_now']."' ORDER BY `date_crea` DESC LIMIT 1;");
        $session = $data['mysql']->fetch2array($session);
        if(count($session) == 0)
        {
            $token = uuid();
            $date_end = date($data['datetime_format'], strtotime($data['datetime_now'].' + '.$data['session_days'].' days')); 
            $data['mysql']->query("INSERT INTO `user_login` (`uid`, `uid_user`, `token`, `ip`, `browser`, `date_crea`, `date_end`, `status`) VALUES ('".uuid()."', '".$user['uid']."', '".$token."', '".$ip."', '".$browser."', '".$data['datetime_now']."', '".$date_end."', '1');");
        }
    },
    'logout' => function($args, $data)
    {
        global $output;

        $ip = get_user_ip();
        $browser = get_user_browser();
        $session = [];
        $id_query = '';
        if(isset($args['id']))
            $id_query = "`uid_user` LIKE '%".$args['id']."' AND `token` = '".$args['token']."' AND ";

        $session = $data['mysql']->query("UPDATE `user_login` SET `status` = 0 WHERE ".$id_query." `ip` = '".$ip."' AND `browser` = '".$browser."' AND `date_crea` <= '".$data['datetime_now']."' AND `date_end` > '".$data['datetime_now']."' AND `status` = '1' ORDER BY `date_crea` DESC LIMIT 1;");

        $output['logged'] = false;
        $output['error'] = false;
    }
];


?>