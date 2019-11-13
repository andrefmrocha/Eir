<?php
    include_once('../db/location_houses.php');
    header('Content-Type: application/json');
    $houses = getHousesByLocation($_POST);
    getHousesTags($houses);
    echo json_encode($houses);
?>