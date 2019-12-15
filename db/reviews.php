<?php
include_once('../db/connection.php');

function getUserReviews($user)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
        SELECT DISTINCT Place.id as id, Place.title AS name, Rating.rating
        FROM Rating INNER JOIN Place
        ON Rating.place = Place.id
        WHERE Rating.user = :user
    ');
    $stmt->execute([':user' => $user]);
    return $stmt->fetchAll();
}
