<?php
    include_once('../db/connection.php');
    
    function getRentals($date, $id){
        $db = Database::instance()->db();
        $begin = "$date-1";
        $end = "$date-31";
        $stmt = $db->prepare('
            SELECT checkin, checkout
            FROM Rental
            WHERE place = :id AND checkin >= :begin AND checkout <= :end
        ');

        $stmt->execute([
            ':id' => $id,
            ':begin' => $begin,
            ':end' => $end,
        ]);
        return $stmt->fetchAll();
    }