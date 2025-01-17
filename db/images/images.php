<?php
    function storeUserPhoto(){
        if(count($_FILES) > 0 && isset($_FILES['photo'])){
            $original = imagecreatefromjpeg($_FILES['photo']['tmp_name']);
    
            $width = imagesx($original);
            $height = imagesy($original);
    
            $square = min($width, $height);
    
            $photo = imagecreatetruecolor(400, 400);
    
            imagecopyresized($photo, $original, 0, 0, ($width>$square)?($width-$square)/2:0, ($height>$square)?($height-$square)/2:0, 400, 400, $square, $square);
    
            $photo_id = uniqid();
            imagejpeg($photo, "../assets/user_photos/eir_$photo_id.jpg");
            return $photo_id;
        }

        echo 'No new photo found!\n';
        return false;
    }


    function storePlacesPhotos($house_id){
        foreach($_FILES['new_photos']['tmp_name'] as $photo){
            $original = imagecreatefromjpeg($photo);
    
            $width = imagesx($original);
            $height = imagesy($original);

            $photo = imagecreatetruecolor(1600, 900);
    
            imagecopyresized($photo, $original, 0, 0, 0, 0, 1600, 900, $width, $height);
    
            $photo_id = uniqid();
            imagejpeg($photo, "../assets/place_photos/eir_$photo_id.jpg");

            storeNewPhoto($house_id, $photo_id);
        }
    }

    function deletePlacePhotos($house_id, $photos){
        $removing_photos = json_decode($photos, true);
        foreach($removing_photos as $photo){
            unlink("../assets/place_photos/eir_$photo.jpg");
            deletePhoto($house_id, $photo);
        }
    }
    