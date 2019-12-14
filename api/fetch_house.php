<?php
    include_once('../db/location_houses.php');
    header('Content-Type: application/json');
    include_once('id_check.php');
    $house = getHousebyId($_GET['id']);
    $house['rating'] = getHouseRating($house);
    $house['tags'] = getHouseTag($house);
    $house['reviews'] = getHouseReviews($_GET['id']);
    $house['photos'] = getHousePhotos($house);
    $house['owner'] = getOwnerInfo($house['place_owner']);
    $house['type'] = getHouseType($_GET['id']);
    echo json_encode($house);
