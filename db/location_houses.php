<?php
    include_once('../db/connection.php');
    function getHousesByLocation($location){
        $db = Database::instance()->db();
        $stmt = $db->prepare('
        SELECT title, photo, price_per_day, max_guest_number, Place.id, PlaceType.name
        FROM Place NATURAL JOIN City, Region, Rental, PlaceType
        WHERE City.name = ? AND Region.country = ? AND Region.id = City.region
        AND Rental.place = City.id AND ((checkin > ? AND checkout > ?) OR (checkin < ? AND checkout < ?) 
        AND Place.type = PlaceType.id);
        ');
        $stmt->execute(array(
            $location['city'],
            $location['country'],
            $location['checkin'],
            $location['checkin'],
            $location['checkout'],
            $location['checkout']));
        return $stmt->fetchAll();
    }

    function getTag($tag){
        return $tag['name'];
    }

    function getHousesTags(&$houses){
        foreach($houses as $key => $house){
            $db = Database::instance()->db();
            $stmt = $db->prepare('
                SELECT Tag.name
                FROM Place, PlaceTag, Tag
                WHERE Place.id = PlaceTag.place AND Tag.id = PlaceTag.tag AND Place.id = ?
            ');
            $stmt->execute(array($house['id']));
            $tags = array_map('getTag', $stmt->fetchAll());
            $houses[$key]['tags'] = $tags;
        }
    }
