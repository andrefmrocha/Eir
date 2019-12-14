<?php
include_once('../db/user.php');
include_once('../db/reviews.php');
include_once('../db/location_houses.php');

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

$user['reviews'] = getUserReviews($_GET['id']);

getHousesPhotos($user['reviews']);


header('Content-Type: application/json');
http_response_code(200);
echo json_encode(
    array_filter(
        $user,
        function ($key) {
            return in_array($key, ['photo', 'full_name', 'bio', 'country', 'reviews']);
        },
        ARRAY_FILTER_USE_KEY
    )
);
