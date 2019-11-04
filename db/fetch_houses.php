<?php
    include_once('../db/connection.php');

    function fetchAllHouses(){      
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT * FROM Place');
        $stmt->execute();
        return $stmt->fetchAll();
    }
?>