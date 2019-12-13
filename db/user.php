<?php
    include_once('../db/connection.php');

    function storeNewUser($user, $hash){
        $db = Database::instance()->db();
        $stmt = $db->prepare('INSERT INTO User (
        email, password_hash, birth_date,
        country, full_name) 
        VALUES (?, ?, ?, ?, ?)');
        $stmt->execute(array(
            $user['email'],
            $hash, 
            $user['birth_date'],
            $user['country'],
            $user['full_name']
        ));
    }

    function updateUserWithPhoto($id, $user, $photo){
        if(!$photo){
            echo 'No photo found!';
            updateUser($id, $user);
        } else {
            echo 'Found photo!';
            $storedUser = getUserById($id);
            $password = isset($user['password']) ? password_hash($user['password'], PASSWORD_DEFAULT) : $storedUser['password_hash']; 
            $db = Database::instance()->db();
            $stmt = $db->prepare('UPDATE User 
            SET email = :email, birth_date = :birth_date,
            country = :country, full_name = :full_name, bio = :bio,
            photo = :photo, password_hash = :password_hash, photo = :photo
            WHERE id = :id');
            $stmt->execute([
                ':email' => $user['email'],
                ':birth_date' => $user['birth_date'],
                ':country' => $user['country'],
                ':full_name' => $user['full_name'],
                ':bio' => $user['description'],
                ':id' => $id,
                ':password_hash' => $password,
                ':photo' => $photo
            ]);
        }
    }


    function updateUser($id, $user){
        $storedUser = getUserById($id);
        $password = isset($user['password']) ? password_hash($user['password'], PASSWORD_DEFAULT) : $storedUser['password_hash']; 
        $db = Database::instance()->db();
        $stmt = $db->prepare('UPDATE User 
        SET email = :email, birth_date = :birth_date,
        country = :country, full_name = :full_name, bio = :bio,
        password_hash = :password_hash
        WHERE id = :id');
        $stmt->execute([
            ':email' => $user['email'],
            ':birth_date' => $user['birth_date'],
            ':country' => $user['country'],
            ':full_name' => $user['full_name'],
            ':bio' => $user['description'],
            ':id' => $id,
            ':password_hash' => $password,
        ]);
    }

    function getUser($email){
        $db = Database::instance()->db();
        $stmt = $db->prepare('
            SELECT *
            FROM User
            where email = ?
        ');
        
        $stmt->execute(array($email));

        return $stmt->fetch();
    }

    function getUserById($id){
        $db = Database::instance()->db();
        $stmt = $db->prepare('
            SELECT *
            FROM User
            where id = ?
        ');
        
        $stmt->execute(array($id));

        return $stmt->fetch();
    }

    function isUserRegistered($email){
        return getUser($email) != false;
    }

    function getUserRentals($id){
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT checkin, checkout, title, Place.id
        FROM Rental, Place
        WHERE Rental.guest = ? AND Place.id = Rental.place');
        $stmt->execute(array($id));
        return $stmt->fetchAll();
    }
