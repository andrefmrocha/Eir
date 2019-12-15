<?php
    include_once('session.php');
    include_once('../db/rentals.php');
    include_once('../db/location_houses.php');
    include_once('csrf.php');


    if(!array_key_exists('house_id', $_POST) &&
       !array_key_exists('checkin', $_POST) &&
       !array_key_exists('checkout', $_POST)){
        http_response_code(400);
        echo 'Missing information!';
        return;
    }

    if(!isset($_SESSION['user'])){
        http_response_code(401);
        echo 'Not logged in!';
        return;
    }

    $id = $_POST['house_id'];
    $begin = $_POST['checkin'];
    $end = $_POST['checkout'];

    if(getHousebyId($id) == false){
        http_response_code(404);
        echo 'House not found!';
        return;
    }

    $rentals = getRentalsHistory($id, $begin, $end);

    if(count($rentals) != 0){
        http_response_code(406);
        echo 'A reservation on that date has been found!';
        return;
    }

    if(addRental($id, $_SESSION['user'], $begin, $end) == false){
        http_response_code(500);
        echo 'Internal Server error!';
        return;
    }

    http_response_code(201);
    echo 'Created!';

    