<?php
include_once('../db/location_houses.php');
include_once('../db/tags.php');
include_once('../db/location.php');
include_once('../db/images/images.php');
include_once('session.php');


$required_values = [
    'coords', 'description', 'max_guest_number', 'new_tags',
    'price', 'removing_photos', 'removing_tags', 'title', 'type'
];

$location_values = [
    'address', 'city', 'coords',
    'country', 'region'
];


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

$coords = json_decode($_POST['coords'], true);

foreach ($location_values as $value) {
    if (!isset($coords[$value])) {
        http_response_code(400);
        echo "Failed to key $value";
        die();
    }
}

if (isset($_POST['house_id'])) {
    $id = $_POST['house_id'];
    $house = getHousebyIds($id, $_SESSION['user']);
    if($house == false){
        http_response_code(403);
        echo 'You are not the owner of this house';
        die();
    }


    $type = getPlaceType($_POST['type']);
    $location = storeLocation($coords);
    updateHouse($_POST, $type, $location);
    
    $new_tags = json_decode($_POST['new_tags'], true);
    $removed_tags = json_decode($_POST['removing_tags'], true);
    foreach($new_tags as $tag) {
        addNewTag($id, $tag);
    }

    foreach($removed_tags as $tag) {
        removeTag($id, $tag);
    }

    storePlacesPhotos($_POST['house_id']);

    deletePlacePhotos($_POST['house_id'],$_POST['removing_photos']);
} else {
    $id = $_POST['house_id'];
    $house = getHousebyIds($id, $_SESSION['user']);
    $type = getPlaceType($_POST['type']);
    $location = storeLocation($coords);
    createHouse($_POST, $type, $location);

    $new_tags = json_decode($_POST['new_tags'], true);
    foreach ($new_tags as $tag) {
        addNewTag($id, $tag);
    }
    storePlacesPhotos($id);
}


