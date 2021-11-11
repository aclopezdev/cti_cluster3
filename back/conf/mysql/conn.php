<?php

class MysqlDB
{
    private $_conf = null;
    public $_conn = null;

    function __construct($conf)
    {
        if($conf == null) return;

        $this->_conf = $conf;
    }

    function connect()
    {
        if($this->_conf == null) return;

        $this->_conn = new mysqli($this->_conf['host'], $this->_conf['user'], $this->_conf['pass']);
        var_dump($this->_conn);
    }
}

?>