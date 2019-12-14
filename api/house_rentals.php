<?php
    include_once('session.php');
    include_once('../db/rentals.php');
    if(!isset($_POST['date']) || !isset($_POST['house_id'])){
        http_response_code(400);
        echo 'Missing body information';
        return;
    }

    
    $rentals = getRentals($_POST['date'], $_POST['house_id']);
    header('Content-Type: application/json');
    echo json_encode($rentals);