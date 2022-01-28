<?php

class MysqlDB
{
    private $_conf = null;
    public $_conn = null;

    function __construct($conf)
    {
        if ($conf == null) return;

        $this->_conf = $conf;
    }

    function connect()
    {
        if ($this->_conf == null) return;

        $this->_conn = new mysqli($this->_conf['host'], $this->_conf['user'], $this->_conf['pass'], $this->_conf['db'], $this->_conf['port']);
        // var_dump($this->_conn);
    }

    function query($query)
    {
        if ($this->_conn == null) return;
        return mysqli_query($this->_conn, $query);
    }

    function fetch2array($data)
    {
        if (!$data) return [];
        $buffer = array();
        $fields = mysqli_fetch_fields($data);
        while ($row = mysqli_fetch_array($data)) {
            $row_buffer = array();
            foreach ($fields as $field)
                $row_buffer[$field->{'name'}] = $row[$field->{'name'}];
            array_push($buffer, $row_buffer);
        }
        return count($buffer) > 1 || count($buffer) == 0 ? $buffer : $buffer[0];
    }

    function fetch2buffer($data)
    {
        if (!$data) return [];
        $buffer = array();
        $fields = mysqli_fetch_fields($data);
        while ($row = mysqli_fetch_array($data)) {
            $row_buffer = array();
            foreach ($fields as $field)
                $row_buffer[$field->{'name'}] = $row[$field->{'name'}];
            array_push($buffer, $row_buffer);
        }
        return $buffer;
    }
}
