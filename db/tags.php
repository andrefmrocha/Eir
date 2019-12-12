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

    function getPlaceType($tag){
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT id FROM PlaceType WHERE name = ?');
        $stmt->execute(array($tag));
        $id = $stmt->fetch();
        return $id['id']; 
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
        print_r($id);
        return $stmt->execute(array($house_id, $id));
    }

    function removeTag($house_id, $tag){
        $db = Database::instance()->db();
        $stmt = $db->prepare('SELECT id FROM Tag WHERE Tag.name = ?');
        $stmt->execute(array($tag));
        $id = $stmt->fetch()['id'];
                if($id == false){
            return false;
        }
        $stmt = $db->prepare('DELETE FROM PlaceTag WHERE place = ? AND tag = ?');
        return $stmt->execute(array($house_id, $id));
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
