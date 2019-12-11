<?php
include_once('../db/location_houses.php');
include_once('../db/tags.php');
include_once('../db/location.php');


$required_values = [
    'country', 'description', 'location', 'max_guest_number',
    'new_photos', 'new_tags', 'price', 'removing_photos', 'removing_tags', 'title', 'type'
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

if (!isset($_GET['house_id'])) {
    $id = $_GET['house_id'];
    $house = getHousebyIds($id, $_SESSION['user']);
    $type = getTag($_GET['type']);
    $location = storeLocation($_GET['coords']);
    updateHouse($_GET, $type, $location);
    
    foreach($_GET['new_tags'] as $tag) {
        addNewTag($id, $tag);
    }

    foreach($_GET['removing_tags'] as $tag) {
        removeTag($id, $tag);
    }

    storePlacesPhotos($_GET['house_id']);

    deletePlacePhotos($_GET['house_id'],$_GET['removing_photos']);
} else {
    $id = $_GET['house_id'];
    $house = getHousebyIds($id, $_SESSION['user']);
    $tag = getTag($_GET['type']);
    $location = storeLocation($_GET['coords']);
    createHouse($_GET, $tag, $location);

    foreach ($_GET['new_tags'] as $tag) {
        addNewTag($id, $tag);
    }
    storePlacesPhotos($_GET['id']);
}


