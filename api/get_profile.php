<?php
    include_once('session.php');
    include_once('../db/user.php');    

    if(!isset($_SESSION['user'])){
        http_response_code(401);
        echo 'No authentication found.';
        return;
    }

    header('Content-Type: application/json');
    $user = getUserById($_SESSION['user']);
    unset($user['password_hash']);
    unset($user['id']);
    http_response_code(200);
    echo json_encode($user);