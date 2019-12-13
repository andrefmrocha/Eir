<?php
    include_once('session.php');
    include_once('../db/user.php');
    include_once('../db/location_houses.php');
    if (!isset($_SESSION['user'])) {
        http_response_code(401);
        echo 'No authentication found.';
        return;
    }

    header('Content-Type: application/json');
    $rentals = getUserRentals($_SESSION['user']);
    getHousesPhotos($rentals);
    http_response_code(200);
    echo json_encode($rentals);
    
