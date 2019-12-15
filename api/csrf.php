<?php
    include_once('session.php');
    if(!isset($_POST['csrf'])  || $_SESSION['csrf'] != $_POST['csrf']){
        http_response_code(403);
        die();
    }