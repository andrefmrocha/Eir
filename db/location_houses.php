<?php
include_once('../db/connection.php');
function getHousesByLocation($location)
{
    $db = Database::instance()->db();
    $query = '
        SELECT DISTINCT title, price_per_day, max_guest_number, Place.id, PlaceType.name AS type
        FROM Place INNER JOIN City, Region, Rental, PlaceType, PlaceLocation
        WHERE City.name = :city AND Region.country = :country
        AND Region.id = City.region
        AND City.id = PlaceLocation.city
        AND (
            (checkin > :checkin AND checkout > :checkin)
            OR (checkin < :checkout AND checkout < :checkout)
        AND Place.type = PlaceType.id AND Place.place_location = PlaceLocation.id);
        ';
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':city' => $location['city'],
        ':country' => $location['country'],
        ':checkin' => $location['checkin'],
        ':checkout' => $location['checkout']
    ]);
    return $stmt->fetchAll();
}

function filterHousesByType($houses, $types)
{
    $types = array_map(
        function ($type) {
            return trim($type);
        },
        explode(',', $types)
    );
    $filtered = array_filter(
        $houses,
        function ($house) use (&$types) {
            return in_array($house['type'], $types, true);
        }
    );
    return array_values($filtered);
}

function filterHousesByTag($houses, $tags)
{
    $tags = array_map(
        function ($tag) {
            return trim($tag);
        },
        explode(',', $tags)
    );
    $filtered = array_filter(
        $houses,
        function ($house) use ($tags) {
            $house_tags = $house['tags'];
            $map = array_map(
                function ($tag) use ($house_tags) {
                    return array_search($tag, $house_tags) !== false;
                },
                $tags
            );
            return array_reduce(
                $map,
                function ($acc, $val) {
                    return $acc && $val;
                },
                true
            );
        }
    );
    return array_values($filtered);
}

function filterHousesByMaxPrice($houses, $price)
{
    $filtered = array_filter(
        $houses,
        function ($house) use ($price) {
            return $house['price_per_day'] <= $price;
        }
    );
    return array_values($filtered);
}

function filterHousesByMinPrice($houses, $price)
{
    $filtered = array_filter(
        $houses,
        function ($house) use ($price) {
            return $house['price_per_day'] >= $price;
        }
    );
    return array_values($filtered);
}

function filterHousesByMinGuests($houses, $guests)
{
    $filtered = array_filter(
        $houses,
        function ($house) use ($guests) {
            return $house['max_guest_number'] >= $guests;
        }
    );
    return array_values($filtered);
}

function filterHousesByRating($houses, $ratings)
{
    $ratings = array_map(
        function ($rating) {
            return intval(trim($rating));
        },
        explode(',', $ratings)
    );
    foreach ($ratings as $rating) {
        error_log($rating);
    }
    $filtered = array_filter(
        $houses,
        function ($house) use (&$ratings) {
            return ($house['rating'] != 'N/A')
                && in_array(round($house['rating']), $ratings);
        }
    );
    return array_values($filtered);
}

function getHouseTag($house)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
                    SELECT Tag.name
                    FROM Place, PlaceTag, Tag
                    WHERE Place.id = PlaceTag.place AND Tag.id = PlaceTag.tag AND Place.id = :id
                ');
    $stmt->execute([
        ':id' => $house['id']
    ]);
    return $stmt->fetchAll(PDO::FETCH_COLUMN, 'name');
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
    $ratings = $stmt->fetchAll(PDO::FETCH_COLUMN, 'rating');
    $num_ratings = count($ratings);
    return $num_ratings > 0 ? array_sum($ratings) / count($ratings) : 'N/A';
}

function getHousesRatings(&$houses)
{
    foreach ($houses as $key => $house) {
        $houses[$key]['rating'] = getHouseRating($house);
    }
}

function getHouseReservationCount(&$house)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
                    SELECT COUNT(*)
                    FROM Place, Rental
                    WHERE Place.id = Rental.place AND Place.id = :id;
                ');
    $stmt->execute([
        ':id' => $house['id']
    ]);
    return $stmt->fetch()['COUNT(*)'];
}

function getHousesReservationCounts(&$houses)
{
    foreach ($houses as $key => $house) {
        $houses[$key]['reservation_count'] = getHouseReservationCount($house);
    }
}

function getHousebyId($id)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
            SELECT *
            FROM Place NATURAL JOIN City, Region
            WHERE Place.id = :id AND City.region = Region.id
        ');
    $stmt->execute([
        ':id' => 'id'
    ]);
    $house = $stmt->fetch();
    if ($house) {
        $house['id'] = $id;
    }
    return $house;
}

function getHouseReviews($id)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
            SELECT Rating.rating, Rating.comment, Rating.user, User.full_name, User.photo
            FROM
                Place, Rating INNER JOIN User
                ON Rating.user = User.id
            WHERE Place.id = :id AND Rating.place = Place.id
        ');
    $stmt->execute([
        ':id' => $id
    ]);
    return $stmt->fetchAll();
}

function getHousePhotos(&$house)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
            SELECT Photo.resource_id as photo_id
            FROM Place, PlacePhoto as Photo
            WHERE Place.id = :id AND Photo.place = Place.id
            ');
    $stmt->execute([
        ':id' => $house['id']
    ]);

    return $stmt->fetchAll(PDO::FETCH_COLUMN, 'photo_id');
}

function getHousesPhotos(&$houses)
{
    foreach ($houses as $key => $house) {
        $houses[$key]['photo'] = getHousePhotos($house)[0];
    }
}

function getOwnerInfo($owner_id)
{
    $db = Database::instance()->db();
    $stmt = $db->prepare('
        SELECT photo, full_name
        FROM User
        WHERE User.id = :id
    ');
    $stmt->execute([
        ':id' => $owner_id
    ]);
    return $stmt->fetch();
}
