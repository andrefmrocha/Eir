<?php
    include_once('session.php');
    include_once('../db/location_houses.php');
    include_once('../db/rentals.php');

    if(!isset($_SESSION['user'])){
        http_response_code(401);
        echo 'Please login in!';
        return;
    }

    include_once('id_check.php');
    if(getHousebyIds($_GET['id'], $_SESSION['user']) == false){
        http_response_code(403);
        echo 'You dont have access to this page';
        return;
    }
    header('Content-Type: application/json');
    $house = getHousebyId($_GET['id']);
    $house['rating'] = getHouseRating($house);
    $house['tags'] = getHouseTag($house);
    $house['reviews'] = getHouseReviews($_GET['id']);
    $house['photos'] = getHousePhotos($house);
    $house['owner'] = getOwnerInfo($house['place_owner']);
    echo json_encode($house);