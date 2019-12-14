<?php
include_once('../db/location_houses.php');
header('Content-Type: application/json');
$houses = getHousesByLocation($_POST);
if (array_key_exists('type', $_POST))
    $houses = filterHousesByType($houses, $_POST['type']);
if (array_key_exists('max_price', $_POST))
    $houses = filterHousesByMaxPrice($houses, $_POST['max_price']);
if (array_key_exists('min_price', $_POST))
    $houses = filterHousesByMinPrice($houses, $_POST['min_price']);
if (array_key_exists('people', $_POST))
    $houses = filterHousesByMinGuests($houses, $_POST['people']);
getHousesRatings($houses);
if (array_key_exists('rating', $_POST))
    $houses = filterHousesByRating($houses, $_POST['rating']);
getHousesTags($houses);
if (array_key_exists('filters', $_POST))
    $houses = filterHousesByTag($houses, $_POST['filters']);
getHousesReservationCounts($houses);
getHousesPhotos($houses);
echo json_encode($houses);
