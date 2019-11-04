<?php
    include_once('../db/fetch_houses.php');
    header('Content-Type: application/json');
    $houses = fetchAllHouses();
    if($houses == false){
        http_response_code(400);
        echo json_encode($houses);
    }
    http_response_code(200);
    echo json_encode($houses);
?>