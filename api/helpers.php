<?php

function isEligible(){
    $required_values = ['house_id', 'date'];

    if (!isset($_SESSION['user'])) {
        http_response_code(401);
        echo 'Please login in!';
        return;
    }

    foreach ($required_values as $value) {
        if (!isset($_POST[$value])) {
            http_response_code(400);
            echo "Failed to key $value";
            die();
        }
    }

    $rentals = getRentalByPerson($_SESSION['user'], $_POST['house_id'], $_POST['date']);
    $rating = getUserHouseRating($_SESSION['user'], $_POST['house_id']);

    if ($rentals != false && $rating == false) {
        return true;
    } else {
        return false;
    }
}