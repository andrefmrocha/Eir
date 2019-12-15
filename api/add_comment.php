<?php
include_once('session.php');
include_once('../db/rentals.php');
include_once('../db/location_houses.php');
include_once('helpers.php');

$required_values = ['rating', 'comment'];

foreach ($required_values as $value) {
    if (!isset($_POST[$value])) {
        http_response_code(400);
        echo "Failed to key $value";
        die();
    }
}

if(isEligible()){
    header('Content-Type: application/json');
    $rating = addNewRating($_SESSION['user'], $_POST['house_id'], $_POST['rating'], $_POST['comment']);
    $house = array('id' => $_POST['house_id']);
    $rating['rating'] = getHouseRating($house);

    echo json_encode($rating);
    
} else {
    http_response_code(403);
    echo 'Forbidden Access';
}