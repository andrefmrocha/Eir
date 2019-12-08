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

    function getRentalsHistory($id, $begin, $end){
        $db = Database::instance()->db();
        $stmt = $db->prepare('
            SELECT checkin, checkout
            FROM Rental
            WHERE place = :id AND ((checkin <= :begin AND :begin < checkout) OR (:end > checkin AND :end <= checkout))
        ');
        $stmt->execute([
            ':id' => $id,
            ':begin' => $begin,
            ':end' => $end,
        ]);
        return $stmt->fetchAll();
    }

    function addRental($house_id, $user_id, $checkin, $checkout){
        $db = Database::instance()->db();
        $stmt = $db->prepare('INSERT INTO Rental(
            guest, place, checkin, checkout) VALUES(?, ?, ?, ?)');

        return $stmt->execute([
            $user_id,
            $house_id,
            $checkin,
            $checkout
        ]);
    }