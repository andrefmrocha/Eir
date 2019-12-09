<?php
    include_once('../db/connection.php');

    function getAllTags(){
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT * FROM Tag');
        $stmt->execute();
        $tags = $stmt->fetchAll();
        return array_map(function ($tag){
            return $tag["name"];
        }, $tags);
    }
