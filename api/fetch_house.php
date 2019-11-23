<?php
    include_once('../db/location_houses.php');
    header('Content-Type: application/json');
    $house = getHousebyId($_GET['id']);
    $house['rating'] = getHouseRating($house);
    $house['tags'] = getHouseTag($house);
    $house['reviews'] = getHouseReviews($_GET['id']);
    $house['photos'] = getHousePhotos($house);
    echo json_encode($house);
