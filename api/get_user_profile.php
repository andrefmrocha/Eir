<?php
include_once('../db/user.php');

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo 'Bad Request. Please provide a user ID';
    return;
}

$user = getUserById($_GET['id']);

if (!$user || empty($user)) {
    http_response_code(404);
    echo 'User with id ' . $_GET['id'] . ' does not exist.';
    return;
}

header('Content-Type: application/json');
http_response_code(200);
echo json_encode(
    array_filter(
        $user,
        function ($key) {
            return in_array($key, ['photo', 'full_name', 'bio', 'country']);
        },
        ARRAY_FILTER_USE_KEY
    )
);
