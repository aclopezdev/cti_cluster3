<?php


$_mods['stock'] = [
    'get_stock' => function($args, $data)
    {
        global $output;

        // $stock = $data['mysql']->query("SELECT `s`.`uid` as `ID`, `s`.`name` as `Name`, `s`.`desc` as `Description`, `s`.`price` as `Price`, `s`.`stock` as `Stock`, `s`.`status` as `Status`, `s`.`date_crea` as `Date creation`, CONCAT(`u`.`first_name`, ' ', `u`.`last_name`) AS `Creator` 
        // FROM `stock` as `s`
        // INNER JOIN `users` as `u`
        // WHERE `u`.`uid` = `s`.`uid`
        // ORDER BY `s`.`date_crea` DESC LIMIT 200;");
        $stock = $data['mysql']->query("SELECT `s`.`uid` as `ID`, `s`.`name` as `Name`, `s`.`desc` as `Description`, `s`.`price` as `Price`, `s`.`stock` as `Stock`, `s`.`status` as `Status`, `s`.`date_crea` as `Date creation`, `user_crea` AS `Creator` 
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
        $resp = $data['mysql']->query("INSERT INTO `stock` (`uid`, `name`, `desc`, `price`, `stock`, `status`, `date_crea`) VALUES ('".$uid."', '".$args['name']."', '".$args['desc']."', '".$args['price']."', '".$args['stock']."', '1', '".$data['datetime_now']."');");
        
        $output['error'] = !$resp;
    }
];


?>