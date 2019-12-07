<?php
    include_once('session.php');
    include_once('../db/user.php');
    include_once('../db/images/images.php');

    if (!isset($_SESSION['user'])) {
        http_response_code(401);
        echo 'No authentication found.';
        return;
    }

    $photo = storeUserPhoto();
    
    updateUser($_SESSION['user'], $_POST, $photo);
    http_response_code(200);
    echo "Success";