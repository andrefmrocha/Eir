<?php
include_once('../db/connection.php');
function getHousesByLocation($location)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
        SELECT DISTINCT title, price_per_day, max_guest_number, Place.id, PlaceType.name
        FROM Place NATURAL JOIN City, Region, Rental, PlaceType
        WHERE City.name = :city AND Region.country = :country AND Region.id = City.region
        AND Rental.place = City.id AND ((checkin > :checkin AND checkout > :checkin) 
        OR (checkin < :checkout AND checkout < :checkout))
        AND Place.type = PlaceType.id
        UNION
        SELECT DISTINCT title, price_per_day, max_guest_number, Place.id, PlaceType.name
        FROM Place NATURAL JOIN City, Region, Rental, PlaceType
        WHERE City.name = :city AND Region.country = :country AND Region.id = City.region
        AND NOT EXISTS (SELECT * from Rental as NRental where NRental.place = Place.id)
        AND Place.type = PlaceType.id
        ');
    $stmt->execute(array(
        ':city' => $location['city'],
        ':country' => $location['country'],
        ':checkin' => $location['checkin'],
        ':checkout' => $location['checkout'],
    ));
    return $stmt->fetchAll();
}

function getTag($tag)
{
    return $tag['name'];
}

function getRating($rating)
{
    return $rating['rating'];
}

function getHouseTag($house)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
                    SELECT Tag.name
                    FROM Place, PlaceTag, Tag
                    WHERE Place.id = PlaceTag.place AND Tag.id = PlaceTag.tag AND Place.id = ?
                ');
    $stmt->execute(array($house['id']));
    $tags = array_map('getTag', $stmt->fetchAll());
    return $tags;
}

function getHousesTags(&$houses)
{
    foreach ($houses as $key => $house) {
        $houses[$key]['tags'] = getHouseTag($house);
    }
}

function getHouseRating(&$house)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
                    SELECT rating
                    FROM Place, Rating
                    WHERE Place.id = Rating.place AND Place.id = ?;
                ');
    $stmt->execute(array($house['id']));
    $ratings = $stmt->fetchAll();
    if($ratings == false){
        return 'N/A';
    }
    
    $ratings = array_map('getRating', $ratings);
    $num_ratings = count($ratings);
    return $num_ratings > 0 ? array_sum($ratings) / count($ratings) : 'N/A';
}

function getHousesRatings(&$houses)
{
    foreach ($houses as $key => $house) {
        $houses[$key]['rating'] = getHouseRating($house);
    }
}

function getHousebyId($id)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
            SELECT DISTINCT *
            FROM Place, City, Region, PlaceLocation
            WHERE Place.id = ? AND City.region = Region.id AND Place.type AND PlaceLocation.id = Place.place_location AND
            PlaceLocation.city = City.id
        ');
    $stmt->execute(array($id));
    $house = $stmt->fetch();
    if ($house) {
        $house['id'] = $id;
    }
    return $house;
}

function getHousebyIds($house_id, $user_id){
    $db = Database::instance()->db();
    $stmt = $db->prepare('
            SELECT *
            FROM Place 
            WHERE Place.id = ? AND Place.place_owner = ?
        ');
    $stmt->execute(array($house_id, $user_id));
    return $stmt->fetch();
}

function getHouseReviews($id)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
            SELECT Rating.rating, Rating.comment, Rating.user, User.full_name, User.photo
            FROM
                Place, Rating INNER JOIN User 
                ON Rating.user = User.id
            WHERE Place.id = ? AND Rating.place = Place.id
        ');
    $stmt->execute(array($id));
    return $stmt->fetchAll();
}

function getHousePhotos(&$house)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
            SELECT Photo.resource_id as photo_id
            FROM Place, PlacePhoto as Photo
            WHERE Place.id = ? AND Photo.place = Place.id
            ');
    $stmt->execute(array($house['id']));
    return array_map(function ($photo) {
        return $photo['photo_id'];
    }, $stmt->fetchAll());
}

function getHousesPhotos(&$houses)
{
    foreach ($houses as $key => $house) {
        $houses[$key]['photo'] = getHousePhotos($house)[0];
    }
}

function getOwnerInfo($owner){
    $db = Database::instance()->db();
    $stmt = $db->prepare('
        SELECT photo, full_name
        FROM User
        WHERE User.id = ? 
    ');
    $stmt->execute(array($owner));
    return $stmt->fetch();
}

function getHouseType($id){
    $db = Database::instance()->db();
    $stmt = $db->prepare('
        SELECT PlaceType.name
        FROM Place, PlaceType
        WHERE Place.type = PlaceType.id AND Place.id = ?
    ');
    $stmt->execute(array($id));
    return $stmt->fetch()['name'];
}

function updateHouse($house, $type, $location){
    $db = Database::instance()->db();
    $stmt = $db->prepare('UPDATE Place
    SET title = :title, type = :type, price_per_day = :price,
    max_guest_number = :max_guest_number, description = :description, place_location = :location
    WHERE id = :id');

    return $stmt->execute([
        ':id' => $house['house_id'],
        ':title' => $house['title'],
        ':type' => $type,
        ':price' => $house['price'],
        ':max_guest_number' => $house['max_guest_number'],
        ':description' => $house['description'],
        ':location' => $location,
    ]);
}

function createHouse($house, $type, $location){
    $db = Database::instance()->db();
    $stmt = $db->prepare('INSERT INTO Place
    (title, type, price_per_day, max_guest_number, description, place_owner, place_location)
    VALUES (:title, :type, :price, :max_guest_number, :description, :place_owner, :place_location);');

    $stmt->execute([
        ':title' => $house['title'],
        ':type' => $type,
        ':price' => $house['price'],
        ':max_guest_number' => $house['max_guest_number'],
        ':description' => $house['description'],
        ':place_owner' => $_SESSION['user'],
        ':place_location' => $location
    ]);

    return $db->lastInsertId();
}

function storeNewPhoto($house_id, $photo){
    $db = Database::instance()->db();
    $stmt = $db->prepare('INSERT INTO PlacePhoto 
    (place, author, resource_id) VALUES(?, ?, ?)');
    return $stmt->execute(array($house_id, $_SESSION['user'], $photo));
}

function deletePhoto($house_id, $photo){
    $db = Database::instance()->db();
    $stmt = $db->prepare('DELETE FROM PlacePhoto WHERE place = ? AND resource_id = ?');
    return $stmt->execute(array($house_id, $photo));
}

