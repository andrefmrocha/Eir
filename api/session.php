<?php
    session_start();
    if(!isset($_SESSION['csrf'])){
        $_SESSION['csrf'] = uniqid();
    }