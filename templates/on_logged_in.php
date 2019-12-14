<?php
    if(isset($_SESSION['user'])){
        header('Location: main_page.php');
        die();
    }
?>