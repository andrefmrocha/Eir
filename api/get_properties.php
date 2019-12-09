<?php
include_once('session.php');
include_once('../db/user.php');
include_once('../db/location_houses.php');
include_once('../db/rentals.php');
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo 'No authentication found.';
    return;
}

header('Content-Type: application/json');
$properties = getProperties($_SESSION['user']);
getHousesUpcomingStays($properties);
getHousesPhotos($properties);
http_response_code(200);
echo json_encode($properties);
