<?php
include_once('session.php');
include_once('../db/rentals.php');
include_once('helpers.php');
header('Content-Type: application/json');


if(isEligible()){
    echo json_encode(array(
        'eligible' => true
    ));
} else {
    echo json_encode(array(
        'eligible' => false
    ));
}


