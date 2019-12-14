<?php
include_once('../db/connection.php');


function storeLocation($location){
    $db = Database::instance()->db();
    $stmt = $db->prepare('SELECT * FROM Region WHERE country = ? AND name = ?');
    $stmt->execute(array($location['country'], $location['region']));
    $region_id = $stmt->fetch();
    if($region_id == false){
        $stmt = $db->prepare('INSERT INTO Region (country, name) VALUES (?, ?)');
        $stmt->execute(array($location['country'], $location['region']));
        return createCity($location, $db->lastInsertId());
    }

    $stmt = $db->prepare('SELECT * FROM City WHERE region = ? AND name = ?');
    $stmt->execute(array($region_id['id'], $location['city']));

    $city_id = $stmt->fetch();

    if($city_id == false){
        return createCity($location, $region_id['id']);
    }
    return storeAddress($location, $city_id['id']);
}

function createCity($location, $id){
    $db = Database::instance()->db();
    $stmt = $db->prepare('INSERT INTO City (region, name) VALUES (?, ?)');
    $stmt->execute(array($id, $location['city']));
    return storeAddress($location, $db->lastInsertId());
}

function storeAddress($location, $id){
    $db = Database::instance()->db();
    $stmt = $db->prepare('SELECT * FROM PlaceLocation WHERE city = ? AND address = ? AND latitude = ? AND longitude = ?');
    $stmt->execute(array($id, $location['address'], $location['coords']['lat'], $location['coords']['lng']));

    $location_id = $stmt->fetch();
    if($location_id == false){
        $stmt = $db->prepare('INSERT INTO PlaceLocation (city, address, latitude, longitude) 
            VALUES (?, ?, ?, ?)');
        $stmt->execute(array($id, $location['address'], $location['coords']['lat'], $location['coords']['lng']));
        return $db->lastInsertId();
    }

    return $location_id['id'];
}