<?php
    include_once('../db/connection.php');

    function storeNewUser($user, $hash){
        $db = Database::instance()->db();
        $stmt = $db->prepare('INSERT INTO User (
        email, password_hash, birth_date,
        country, full_name, bio) 
        VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute(array(
            $user['email'],
            $hash, 
            $user['birth_date'],
            $user['country'],
            $user['full_name'],
            $user['bio']
        ));
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

    function isUserRegistered($email){
        return getUser($email) != false;
    }


?>    