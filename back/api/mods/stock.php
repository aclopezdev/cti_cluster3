<?php


$_mods['stock'] = [
    'get_stock' => function($args, $data)
    {
        global $output;

        // $stock = $data['mysql']->query("SELECT `s`.`uid` as `ID`, `s`.`name` as `Name`, CONCAT('$', `s`.`price`) as `Price`, `s`.`stock` as `Stock`, `s`.`status` as `Status`, `s`.`date_crea` as `Date creation`, CONCAT(`u`.`first_name`, ' ', `u`.`last_name`) AS `Creator` 
        // FROM `stock` as `s`
        // INNER JOIN `users` as `u`
        // WHERE `u`.`uid` = `s`.`uid`
        // ORDER BY `s`.`date_crea` DESC LIMIT 200;");
        $stock = $data['mysql']->query("SELECT `s`.`uid` as `ID`, `s`.`name` as `Name`, CONCAT('$', `s`.`price`) as `Price`, `s`.`stock` as `Stock`, `s`.`status` as `Status`, `s`.`date_crea` as `Date creation`, `user_crea` AS `Creator` 
        FROM `stock` as `s`
        WHERE 1
        ORDER BY `s`.`date_crea` DESC LIMIT 200;");
        $stock = $data['mysql']->fetch2buffer($stock);

        $output['stock'] = $stock;
    },
    'new_stock'=> function($args, $data)
    {
        global $output;

        $uid = uuid();
        $args['name'] = str_replace("'", "\"", $args['name']);
        $args['desc'] = str_replace("'", "\"", $args['desc']);  
        $resp = $data['mysql']->query("INSERT INTO `stock` (`uid`, `name`, `desc`, `price`, `stock`, `status`, `date_crea`) VALUES ('".$uid."', '".$args['name']."', '".$args['desc']."', '".$args['price']."', '".$args['stock']."', '1', '".$data['datetime_now']."');");
        
        $output['error'] = !$resp;
    },
    'get_stock_data'=> function($args, $data)
    {
        global $output;

        $stock = $data['mysql']->query("SELECT `s`.`uid` as `ID`, `s`.`name` as `Name`, `s`.`desc` as `Description`, `s`.`price` as `Price`, `s`.`stock` as `Stock`, `s`.`status` as `Status`, `s`.`date_crea` as `Date creation`, `user_crea` AS `Creator` 
        FROM `stock` as `s`
        WHERE `s`.`uid` = '".$args['id']."'
        ORDER BY `s`.`date_crea` DESC LIMIT 200;");
        $stock = $data['mysql']->fetch2array($stock);

        $output['stock'] = $stock;
    },
    'edit_stock'=> function($args, $data)
    {
        global $output;

        $args['name'] = str_replace("'", "\"", $args['name']);
        $args['desc'] = str_replace("'", "\"", $args['desc']);
        $resp = $data['mysql']->query("UPDATE `stock` SET `name` = '".$args['name']."', `desc` = '".$args['desc']."', `price` = '".$args['price']."', `stock` = '".$args['stock']."' WHERE `uid` = '".$args['id']."';");

        $output['error'] = !$resp;
    },
    'toggle_stock'=> function($args, $data)
    {
        global $output;

        $stock = $data['mysql']->query("SELECT `status` FROM `stock` WHERE `uid` = '".$args['id']."' LIMIT 1;");
        $stock = $data['mysql']->fetch2array($stock);
        
        $status = $stock['status'] === '1' ? 0 : 1;
        
        $resp = $data['mysql']->query("UPDATE `stock` SET `status` = '".$status."' WHERE `uid` = '".$args['id']."';");

        $output['error'] = !$resp;
    }
];


?>