<?php
    include_once('session.php');
    include_once('../db/user.php');

    if (!isset($_SESSION['user'])) {
        http_response_code(401);
        echo 'No authentication found.';
        return;
    }
    
    updateUser($_SESSION['user'], $_POST);
    http_response_code(200);
    echo "Success";