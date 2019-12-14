<?php
    include_once('session.php');
    header('Content-Type: application/text');
    include_once('../db/user.php');    
    $email = $_POST['email'];

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        http_response_code(400);
        echo 'Invalid email!';
        return;
    }

    if(isUserRegistered($email)){
        http_response_code(403);
        echo 'User is already registered!';
        return;
    }

    $hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

    storeNewUser($_POST, $hash);
    http_response_code(201);
    echo 'Success!';
