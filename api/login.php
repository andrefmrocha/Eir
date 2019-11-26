<?php
    include_once('session.php');
    header('Content-Type: application/text');
    include_once('../db/user.php');    
    $email = $_POST['email'];
    if(isset($_SESSION['user']) && $_SESSION['user'] != false){
        http_response_code(406);
        echo 'User is already logged in!';
        return;
    }

    $user = getUser($email);

    if($user == false){
       http_response_code(404);
       echo 'User not found!';
       return;
    }

    if(!password_verify($_POST['password'], $user['password_hash'])){
        http_response_code(401);
        echo 'Failed to login';
        return;
    }

    $_SESSION['user'] = $user['id'];
    http_response_code(200);
    echo 'Sucessfully logged in';

