<?php


$_mods['invoices'] = [
    'invoices_list' => function($args, $data)
    {
        global $output;

        $invoices = "SELECT 
        `i`.`uid` as `INVOICE_ID`,
        `i`.`uid_client` as CLIENT_ID,
        CONCAT(`c`.`first_name`, ' ', `c`.`last_name`) as `CLIENT_NAME`,
        `i`.`status` as `STATUS`,
        `i`.`date_crea` as `SALE_DATE`
        FROM `sales` as `i`
        INNER JOIN `clients` as `c`
        WHERE `c`.`uid` = `i`.`uid_client`
        GROUP BY `i`.`uid`
        ORDER BY `i`.`date_crea` DESC;";

        $invoices = $data['mysql']->query($invoices);
        $invoices = $data['mysql']->fetch2buffer($invoices);

        $output['invoices'] = $invoices;
    },
    'add_invoice' => function($args, $data)
    {
        global $output;

        $client_uid = $args['client_id'];
        $coma = '';
        $insert = '';
        $uid = uuid();
        $total = 0;
        foreach($args['products'] as $prod)
        {
            $get_stock = "SELECT `stock` FROM `stock` WHERE `uid` = '".$prod['ID']."';";
            $get_stock = $data['mysql']->query($get_stock);
            $get_stock = $data['mysql']->fetch2array($get_stock);
            $new_stock = max(floatval($get_stock['stock']) - floatval($prod['count']), 0);

            if($new_stock == 0)
            {
                add_log('[ALERT]: '.$prod['ID']. ' - '. $prod['name'].' does not have available stock!');
                continue;
            }
            
            $update_stock = "UPDATE `stock` SET `stock` = '".$new_stock."' WHERE `uid` = '".$prod['ID']."';";
            $update_stock = $data['mysql']->query($update_stock);

            $invoice_uid = uuid();
            $total += floatval($prod['price']) * floatval($prod['count']);
            $insert .= $coma."('".$invoice_uid."', '".$uid."', '".$client_uid."', '".$prod['ID']."', '".$prod['count']."', '1', '".$data['datetime_now']."', '')";
            $coma = ',';

        }

        $sale = $data['mysql']->query("INSERT INTO `sales` (`uid`, `uid_client`, `total_price`, `status`, `date_crea`) VALUES ('".$uid."', '".$client_uid."', '".$total."', '1', '".$data['datetime_now']."')");

        $resp = false;
        if(trim($insert) != '' && $sale)
        {
            $add_incomes = "INSERT INTO `invoices` (`uid`, `uid_sale`, `uid_client`, `uid_product`, `amount`, `status`, `date_crea`, `user_crea`) VALUES ".$insert;
            $resp = $data['mysql']->query($add_incomes);
        }

        $output['error'] = !$resp;
    },
    'toggle_invoice' => function($args, $data)
    {
        global $output;

        $uid = $args['sale_id'];
        $status = "SELECT `status` FROM `sales` WHERE `uid` = '".$uid."';";
        $status = $data['mysql']->query($status);
        $status = $data['mysql']->fetch2array($status);

        $toggle = 1;
        if(intval($status['status']) == 1)
            $toggle = 0;
        
        $update = "UPDATE `sales` SET `status` = '".$toggle."' WHERE `uid` = '".$uid."';";
        $update = $data['mysql']->query($update);

        $update = "UPDATE `invoices` SET `status` = '".$toggle."' WHERE `uid_sale` = '".$uid."';";
        $update = $data['mysql']->query($update);

        $output['error'] =  false;
    },
    'view_invoice' => function($args, $data)
    {
        global $output;

        $uid = $args['sale_id'];
        $sales = "SELECT `s`.`uid` AS 'SALE-ID', `c`.`uid` AS 'CLIENT-ID', `s`.`total_price` AS 'TOTAL', `s`.`date_crea` AS 'DATE', `i`.`uid` AS 'INVOICE-ID', CONCAT(`c`.`first_name`, ' ', `c`.`last_name`) AS 'CLIENT-NAME', `i`.`amount` AS 'PROD-MOUNT', `p`.`name` as 'PROD-NAME', `p`.`desc` as 'PROD-DESC', `p`.`price` AS 'PROD-PRICE' FROM `sales` AS `s` INNER JOIN `clients` AS `c` ON `c`.`uid` = `s`.`uid_client` INNER JOIN `invoices` AS `i` ON `i`.`uid_sale` = `s`.`uid` INNER JOIN `stock` AS `p` ON `p`.`uid` = `i`.uid_product WHERE `s`.`uid` = '".$uid."';";
        $sales = $data['mysql']->query($sales);
        $sales = $data['mysql']->fetch2buffer($sales);

        $invoice = [];
        $prods = [];

        if(count($sales) > 0)
        {
            $invoice = [
                'ID' => $sales[0]['SALE-ID'],
                'CLIENT-ID' => $sales[0]['CLIENT-ID'],
                'CLIENT-NAME' => $sales[0]['CLIENT-NAME'],
                'SALE-DATE' => $sales[0]['DATE'],
                'INVOICE-ID' => $sales[0]['INVOICE-ID'],
                'TOTAL' => $sales[0]['TOTAL']
            ];
            foreach ($sales as $key => $value) 
            {
                $prod = [
                    'PROD-NAME' => $value['PROD-NAME'],
                    'PROD-DESC' => $value['PROD-DESC'],
                    'PROD-MOUNT' => $value['PROD-MOUNT'],
                    'PROD-PRICE' => $value['PROD-PRICE']
                ];
                array_push($prods, $prod);
            }
        }

        $output['sale'] = ['invoice' => $invoice, 'prods' => $prods];
    }
];


?>