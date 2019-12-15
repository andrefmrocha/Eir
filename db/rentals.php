<?php
include_once('../db/connection.php');

function getRentals($date, $id)
{
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

function getRentalsHistory($id, $begin, $end)
{
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

function getUpcomingRentalsCount($house, $date)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
        SELECT COUNT(*)
        FROM Rental
        WHERE place = :id AND (checkin >= :date)
        ');
    $stmt->execute([
        ':id' => $house,
        ':date' => $date
    ]);
    return $stmt->fetch()['COUNT(*)'];
}

function addUpcomingRentalsCount(&$house)
{
    $id = $house['id'];
    $date = date('Y-m-d');
    $house['upcomingStays'] = getUpcomingRentalsCount($id, $date);
}

function addRental($house_id, $user_id, $checkin, $checkout)
{
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

function getHousesUpcomingStays(&$houses)
{
    foreach ($houses as &$house) {
        addUpcomingRentalsCount($house);
    }
}

function getRentalByPerson($id, $house_id, $date){
    $db = Database::instance()->db();
    $stmt = $db->prepare('SELECT * FROM Rental
    WHERE guest = :guest AND checkout < :date AND place = :place');
    $stmt->execute(array(
        ':guest' => $id,
        ':date' => $date,
        ':place' => $house_id
    ));
    return $stmt->fetch();
}

function getUserHouseRating($id, $house_id){
    $db = Database::instance()->db();
    $stmt = $db->prepare('SELECT *  FROM Rating
    WHERE place = :place AND user = :user');
    $stmt->execute(array(
        ':user' => $id,
        ':place' => $house_id
    ));
    return $stmt->fetch();
}

function addNewRating($id, $house_id, $rating, $comment){
    $db = Database::instance()->db();
    $stmt = $db->prepare('INSERT INTO Rating
    (place, rating, user, comment) VALUES(:place, :rating, :user, :comment)');
    $stmt->execute(array(
        ':user' => $id,
        ':place' => $house_id,
        ':rating' => $rating,
        ':comment' => $comment
    ));
    
    $stmt = $db->prepare('SELECT Rating.rating, Rating.comment, Rating.user, User.full_name, User.photo
    FROM Rating, User
    WHERE Rating.id = ? AND User.id = Rating.User');
    $stmt->execute(array($db->lastInsertId()));
    return $stmt->fetch();
}
