<?php
    include_once('../db/tags.php');
    header('Content-Type: application/json');
    echo json_encode(getAllTags());