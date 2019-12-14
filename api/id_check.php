<?php
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo 'Missing ID!';
    return;
}