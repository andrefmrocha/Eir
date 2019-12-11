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

    function getTag($tag){
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT id FROM Tag WHERE PlaceType.name = ?');
        $stmt->execute(array($tag));
        return $stmt->fetch()['id']; 
    }

    function addNewTag($house_id, $tag){
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT id FROM Tag WHERE Tag.name = ?');
        $stmt->execute(array($tag));
        $id = $stmt->fetch()['id'];
        if($id == false){
            return false;
        }

        $stmt = $db->prepare('INSERT INTO PlaceTag (
            place, tag)
            VALUES (?, ?)');
        return $stmt->execute(array($house_id, $id));
    }

    function removeTag($house_id, $tag){
        $db = Database::instance()->db();
        $stmt = $db->prepare('DELETE FROM PlaceTag WHERE place = ?, tag = ?');
        return $stmt->execute(array($house_id, $tag));
    }

    function getAllTypes(){
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT * FROM PlaceType');
        $stmt->execute();
        $tags = $stmt->fetchAll();
        return array_map(function ($tag){
            return $tag["name"];
        }, $tags);
    }
